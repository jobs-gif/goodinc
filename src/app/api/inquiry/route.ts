const MAX_LEN = 2000;
const FIELDS = ["company", "name", "phone", "email", "sector", "message"] as const;

// 같은 IP의 반복 접수를 제한합니다. (서버 인스턴스별 메모리 기준의 보조 장치)
const WINDOWS = [
  { ms: 10 * 60 * 1000, max: 3 },
  { ms: 24 * 60 * 60 * 1000, max: 10 },
];
const hits = new Map<string, number[]>();
const MIN_FILL_MS = 3000;

function tooMany(ip: string) {
  const now = Date.now();
  const list = (hits.get(ip) ?? []).filter((t) => now - t < WINDOWS[1].ms);
  const limited = WINDOWS.some((w) => list.filter((t) => now - t < w.ms).length >= w.max);
  if (!limited) list.push(now);
  hits.set(ip, list);
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (now - v[v.length - 1] >= WINDOWS[1].ms) hits.delete(k);
  }
  return limited;
}

const clean = (v: unknown, max = MAX_LEN) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

export async function POST(request: Request) {
  if (Number(request.headers.get("content-length") ?? 0) > 20_000) {
    return Response.json({ error: "요청이 너무 큽니다." }, { status: 413 });
  }
  const ip =
    request.headers.get("x-real-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    "unknown";
  if (tooMany(ip)) {
    return Response.json(
      { error: "짧은 시간에 너무 많이 접수되었습니다. 잠시 후 다시 시도해 주세요." },
      { status: 429 }
    );
  }

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return Response.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  // 숨김 필드가 채워져 있으면 봇으로 보고 성공처럼 응답만 하고 버립니다.
  if (clean(body.website)) return Response.json({ ok: true });

  // 폼을 연 지 3초도 안 되어 제출되었거나 측정값이 없으면 자동 입력으로 보고 버립니다.
  const elapsed = Number(body.elapsed);
  if (!Number.isFinite(elapsed) || elapsed < MIN_FILL_MS) return Response.json({ ok: true });

  const data = Object.fromEntries(
    FIELDS.map((k) => [k, clean(body[k], k === "message" ? MAX_LEN : 120)])
  ) as Record<(typeof FIELDS)[number], string>;

  if (FIELDS.some((k) => !data[k])) {
    return Response.json({ error: "필수 항목을 모두 입력해 주세요." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return Response.json({ error: "이메일 형식을 확인해 주세요." }, { status: 400 });
  }
  if (clean(body.agree) !== "동의") {
    return Response.json({ error: "개인정보 수집에 동의해 주세요." }, { status: 400 });
  }

  const url = process.env.GOOGLE_SHEET_WEBHOOK_URL;
  if (!url) {
    console.error("GOOGLE_SHEET_WEBHOOK_URL is not set");
    return Response.json({ error: "문의 접수 설정이 아직 완료되지 않았습니다." }, { status: 503 });
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      // Apps Script 웹앱은 CORS 사전요청이 없는 text/plain 이 가장 안전합니다.
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({
        ...data,
        token: process.env.GOOGLE_SHEET_WEBHOOK_TOKEN ?? "",
        agreed: "동의",
        submittedAt: new Date().toISOString(),
      }),
      redirect: "follow",
    });
    const result = await res.json().catch(() => null);
    if (!res.ok || !result?.ok) throw new Error(result?.error || `status ${res.status}`);
    return Response.json({ ok: true });
  } catch (err) {
    console.error("inquiry forward failed", err);
    return Response.json({ error: "접수 중 오류가 발생했습니다." }, { status: 502 });
  }
}
