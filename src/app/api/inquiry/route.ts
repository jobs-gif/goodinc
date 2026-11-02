const MAX_LEN = 2000;
const FIELDS = ["company", "name", "phone", "email", "sector", "message"] as const;

const clean = (v: unknown, max = MAX_LEN) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return Response.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  // 숨김 필드가 채워져 있으면 봇으로 보고 성공처럼 응답만 하고 버립니다.
  if (clean(body.website)) return Response.json({ ok: true });

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
