"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";

export const SECTORS = [
  "생산 도급 운영 관리",
  "물류 · 유통 위탁 운영",
  "인력 파견 · HR 아웃소싱",
  "빌딩 · 시설 유지 관리",
  "보안 · 시설 경비",
  "미화 · 위생 관리",
  "기타 / 복합 문의",
];

type Ctx = { open: (sector?: string) => void };
const InquiryContext = createContext<Ctx>({ open: () => {} });
export const useInquiry = () => useContext(InquiryContext);

type Status = "idle" | "sending" | "done" | "error";

const inputCls =
  "w-full rounded-xl border border-border bg-white px-4 py-3 text-[15px] text-navy outline-none transition-colors placeholder:text-muted-2 focus:border-brand";

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[13px] font-semibold text-navy">
        {label}
        {required && <span className="ml-0.5 text-[#c0392b]">*</span>}
      </span>
      {children}
    </label>
  );
}

function InquiryModal({
  sector,
  onClose,
}: {
  sector: string;
  onClose: () => void;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "접수에 실패했습니다.");
      setStatus("done");
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error
          ? err.message
          : "접수에 실패했습니다. 잠시 후 다시 시도해 주세요."
      );
    }
  }

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-label="견적 · 문의 접수"
    >
      <div
        className="absolute inset-0 bg-navy/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative max-h-[92vh] w-full max-w-[560px] overflow-y-auto rounded-3xl bg-white shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-border px-7 py-6 md:px-9">
          <div>
            <div className="text-[12px] font-semibold tracking-[.08em] text-brand">
              CONTACT
            </div>
            <h2 className="m-0 mt-1 text-[22px] font-bold tracking-[-.02em] text-navy">
              견적 · 문의 접수
            </h2>
            <p className="m-0 mt-1.5 text-[13px] text-muted">
              남겨주신 내용은 담당자가 확인 후 영업일 기준 1일 이내 연락드립니다.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-bg text-[16px] font-bold text-navy transition-colors hover:bg-border"
          >
            ✕
          </button>
        </div>

        {status === "done" ? (
          <div className="px-7 py-14 text-center md:px-9">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-accent-green-bg text-[26px] text-green">
              ✓
            </div>
            <div className="text-[20px] font-bold text-navy">
              문의가 접수되었습니다
            </div>
            <p className="m-0 mt-3 text-[14px] leading-[1.7] text-muted">
              빠르게 확인하여 연락드리겠습니다.
              <br />
              급하신 경우 041-551-5111 로 전화 주세요.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-8 rounded-full bg-brand px-8 py-3.5 text-[15px] font-bold text-white transition-colors hover:bg-brand-dark"
            >
              닫기
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4 px-7 py-6 md:px-9">
            {/* 스팸 방지용 숨김 필드 */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="회사명" required>
                <input
                  name="company"
                  required
                  maxLength={80}
                  className={inputCls}
                  placeholder="(주)굿모닝"
                />
              </Field>
              <Field label="담당자명" required>
                <input
                  name="name"
                  required
                  maxLength={40}
                  className={inputCls}
                  placeholder="홍길동"
                />
              </Field>
              <Field label="연락처" required>
                <input
                  name="phone"
                  type="tel"
                  required
                  maxLength={30}
                  className={inputCls}
                  placeholder="010-0000-0000"
                />
              </Field>
              <Field label="이메일" required>
                <input
                  name="email"
                  type="email"
                  required
                  maxLength={100}
                  className={inputCls}
                  placeholder="name@company.com"
                />
              </Field>
            </div>
            <Field label="문의 분야" required>
              <select
                name="sector"
                defaultValue={sector}
                className={inputCls}
                required
              >
                {SECTORS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="문의 내용" required>
              <textarea
                name="message"
                required
                rows={5}
                maxLength={2000}
                className={`${inputCls} resize-none`}
                placeholder="필요 인원, 근무 장소, 희망 시작일 등을 자유롭게 적어주세요."
              />
            </Field>
            <label className="flex items-start gap-2.5 text-[13px] leading-[1.6] text-muted">
              <input
                type="checkbox"
                name="agree"
                value="동의"
                required
                className="mt-[3px] h-4 w-4 accent-[#00543a]"
              />
              <span>
                문의 응대를 위한 개인정보(회사명·성명·연락처·이메일) 수집 및
                이용에 동의합니다. 수집 정보는 문의 처리 목적으로만 사용됩니다.
              </span>
            </label>
            {status === "error" && (
              <p className="m-0 rounded-xl bg-[#fdecea] px-4 py-3 text-[13px] text-[#a93226]">
                {error} 급하신 경우 041-551-5111 또는 goodos@goodos.co.kr 로
                연락 주세요.
              </p>
            )}
            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full rounded-full bg-brand py-4 text-[16px] font-bold text-white transition-colors hover:bg-brand-dark disabled:opacity-60"
            >
              {status === "sending" ? "접수 중..." : "문의 접수하기"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function InquiryProvider({ children }: { children: ReactNode }) {
  const [sector, setSector] = useState<string | null>(null);
  const open = useCallback((s?: string) => setSector(s ?? SECTORS[0]), []);
  const close = useCallback(() => setSector(null), []);

  return (
    <InquiryContext.Provider value={{ open }}>
      {children}
      {sector !== null && <InquiryModal key={sector} sector={sector} onClose={close} />}
    </InquiryContext.Provider>
  );
}
