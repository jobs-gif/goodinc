import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-dark text-white/70">
      <div className="mx-auto max-w-[1280px] px-6 py-14 grid gap-10 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Image
              src="/assets/logo/inc-mark.svg"
              alt="굿모닝아이앤씨"
              width={34}
              height={34}
            />
            <span className="flex flex-col leading-none">
              <span className="font-bold text-[13px] tracking-[.02em]">
                <span className="text-green-lt">good</span>
                <span className="text-green">morning</span>
              </span>
              <span className="font-black text-[17px] text-cream tracking-[-.02em] mt-[2px]">
                INC<span className="text-gold">.</span>
              </span>
            </span>
          </div>
          <p className="text-[13px] leading-[1.8] max-w-[360px]">
            생산·물류·인력·시설·보안·미화 전 영역 종합 아웃소싱 파트너.
            <br />
            23년 현장 운영 노하우와 자체 인재 DB로 함께합니다.
          </p>
        </div>

        <div>
          <div className="text-cream text-[13px] font-semibold tracking-[.04em] mb-4">
            사업 영역
          </div>
          <ul className="flex flex-col gap-2.5 text-[14px]">
            <li>생산 도급 운영 관리</li>
            <li>물류 · 유통 위탁 운영</li>
            <li>인력 파견 · HR 아웃소싱</li>
            <li>빌딩 · 시설 유지 관리</li>
            <li>보안 · 시설 경비</li>
            <li>미화 · 위생 관리</li>
          </ul>
        </div>

        <div>
          <div className="text-cream text-[13px] font-semibold tracking-[.04em] mb-4">
            연락처
          </div>
          <ul className="flex flex-col gap-2.5 text-[14px]">
            <li>전화 041-551-5111</li>
            <li>이메일 goodos@goodos.co.kr</li>
            <li>주소 충남 천안시 동남구 충절로 128, 102호</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-[1280px] px-6 py-6 text-[12px] text-white/40 flex flex-col sm:flex-row gap-2 sm:justify-between">
          <span>© 2026 GOODMORNING INC. All rights reserved.</span>
          <span>사업자등록번호 000-00-00000 (입력 예정)</span>
        </div>
      </div>
    </footer>
  );
}
