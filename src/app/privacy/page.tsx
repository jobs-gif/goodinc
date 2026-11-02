import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "개인정보처리방침 | 굿모닝아이앤씨",
  description: "굿모닝아이앤씨 홈페이지 문의 접수 시 수집하는 개인정보의 처리 방침입니다.",
};

const SECTIONS: { title: string; body: React.ReactNode }[] = [
  {
    title: "1. 수집하는 개인정보 항목",
    body: (
      <ul>
        <li>필수 항목: 회사명, 담당자 성명, 연락처, 이메일, 문의 분야, 문의 내용</li>
        <li>자동 수집 항목: 문의 접수 일시</li>
      </ul>
    ),
  },
  {
    title: "2. 수집 및 이용 목적",
    body: <p>견적 요청·사업 문의에 대한 확인, 상담 및 답변, 연락, 처리 결과 안내를 위해 이용합니다.</p>,
  },
  {
    title: "3. 보유 및 이용 기간",
    body: (
      <p>
        문의 처리 목적이 달성된 후 지체 없이 파기하는 것을 원칙으로 하며, 상담 이력 관리를 위해
        접수일로부터 최대 3년간 보관한 뒤 파기합니다. 관계 법령에 따라 보존이 필요한 경우에는 해당
        기간 동안 보관합니다.
      </p>
    ),
  },
  {
    title: "4. 개인정보의 제3자 제공",
    body: (
      <p>
        회사는 이용자의 개인정보를 제3자에게 제공하지 않습니다. 다만 법령에 근거가 있거나
        수사기관이 적법한 절차에 따라 요청하는 경우는 예외로 합니다.
      </p>
    ),
  },
  {
    title: "5. 개인정보 처리의 위탁 및 국외 이전",
    body: (
      <>
        <p>원활한 서비스 제공을 위해 아래와 같이 처리를 위탁하고 있습니다.</p>
        <ul>
          <li>
            Google LLC — 문의 내용의 저장(Google 스프레드시트)과 접수 알림 메일 발송(Gmail).
            이전 국가는 미국 등이며, 문의 접수 시점에 전송·저장됩니다.
          </li>
          <li>
            Vercel Inc. — 홈페이지 운영 및 문의 접수 요청의 전달(호스팅). 이전 국가는 미국
            등이며, 문의 접수 시점에 전송됩니다.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "6. 파기 절차 및 방법",
    body: (
      <p>
        보유 기간이 끝나거나 처리 목적이 달성된 개인정보는 지체 없이 파기합니다. 전자적 파일은
        복구할 수 없는 방법으로 삭제하고, 출력물은 분쇄하거나 소각합니다.
      </p>
    ),
  },
  {
    title: "7. 이용자의 권리와 행사 방법",
    body: (
      <p>
        이용자는 언제든지 자신의 개인정보에 대한 열람, 정정, 삭제, 처리 정지를 요청할 수
        있습니다. 아래 연락처로 요청해 주시면 지체 없이 조치하겠습니다. 동의를 거부할 권리가
        있으나, 거부하면 문의 접수가 제한됩니다.
      </p>
    ),
  },
  {
    title: "8. 개인정보의 안전성 확보 조치",
    body: (
      <ul>
        <li>홈페이지와 서버 사이 통신은 HTTPS로 암호화됩니다.</li>
        <li>접수된 정보는 권한이 있는 담당자만 열람할 수 있도록 접근을 제한합니다.</li>
        <li>비정상적인 반복 접수를 제한하는 장치를 운영합니다.</li>
      </ul>
    ),
  },
  {
    title: "9. 개인정보 보호 문의처",
    body: (
      <ul>
        <li>상호: 굿모닝아이앤씨 (사업자등록번호 337-88-03907)</li>
        <li>담당: 개인정보 보호 담당</li>
        <li>전화: 041-551-5111 / 010-3090-5356</li>
        <li>이메일: goodos@goodos.co.kr</li>
        <li>주소: 충청남도 아산시 음봉면 연암율금로 43-1</li>
      </ul>
    ),
  },
  {
    title: "10. 방침의 변경",
    body: (
      <p>
        이 방침은 2026년 11월 2일부터 적용됩니다. 내용이 변경되면 홈페이지를 통해 공지합니다.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <>
      <header className="border-b border-border bg-white">
        <div className="mx-auto flex max-w-[860px] items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/assets/logo/inc-mark.svg" alt="굿모닝아이앤씨" width={34} height={34} />
            <span className="flex flex-col leading-none">
              <span className="text-[13px] font-bold tracking-[.02em]">
                <span className="text-green-lt">good</span>
                <span className="text-green">morning</span>
              </span>
              <span className="mt-[2px] text-[17px] font-black tracking-[-.02em] text-navy">
                INC<span className="text-gold">.</span>
              </span>
            </span>
          </Link>
          <Link href="/" className="text-[14px] font-semibold text-brand hover:underline">
            ← 홈으로
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-[860px] px-6 py-12 md:py-16">
        <h1 className="m-0 mb-3 text-[28px] font-bold tracking-[-.02em] text-navy md:text-[34px]">
          개인정보처리방침
        </h1>
        <p className="m-0 mb-10 text-[15px] leading-[1.7] text-muted">
          굿모닝아이앤씨(이하 &ldquo;회사&rdquo;)는 홈페이지 문의 접수와 관련하여 이용자의
          개인정보를 소중히 다루며, 아래와 같이 처리합니다.
        </p>
        <div className="flex flex-col gap-9">
          {SECTIONS.map((s) => (
            <section key={s.title}>
              <h2 className="m-0 mb-3 text-[18px] font-bold text-navy">{s.title}</h2>
              <div className="policy text-[15px] leading-[1.8] text-muted">{s.body}</div>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
