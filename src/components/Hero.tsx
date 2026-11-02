import InquiryButton from "./InquiryButton";

export default function Hero() {
  return (
    <section id="top" className="relative h-[640px] md:h-[720px] overflow-hidden bg-[#1b1f29]">
      <video
        src="/assets/vid-handshake.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: "center 35%", filter: "saturate(1.03) contrast(1.02)" }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(100deg, rgba(12,14,20,.88) 0%, rgba(14,16,24,.6) 48%, rgba(14,16,24,.15) 100%)",
        }}
      />

      <div className="relative h-full mx-auto max-w-[1280px] px-6 flex flex-col justify-center">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-3 mb-8">
          <span className="flex items-center gap-3">
            {/* 다크 배경용 심볼 (inc-lockup-dark 색상) */}
            <svg
              width="44"
              height="44"
              viewBox="0 0 100 100"
              role="img"
              aria-label="굿모닝아이앤씨 심볼"
            >
              <circle
                cx="50"
                cy="50"
                r="32"
                fill="none"
                stroke="#5FA98A"
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray="162 39"
                transform="rotate(35 50 50)"
              />
              <line
                x1="40"
                y1="50"
                x2="78"
                y2="50"
                stroke="#CBA258"
                strokeWidth="11"
                strokeLinecap="round"
              />
              <path d="M74 40 L92 50 L74 60 Z" fill="#CBA258" />
            </svg>
            <span className="flex flex-col leading-none">
              <span className="font-bold text-[14px] tracking-[.02em]">
                <span className="text-[#5FA98A]">good</span>
                <span className="text-[#8FC9AF]">morning</span>
              </span>
              <span className="font-black text-[18px] text-cream tracking-[-.02em] mt-[2px]">
                INC<span className="text-gold">.</span>
              </span>
            </span>
          </span>
          <span className="inline-flex items-center border border-gold/60 text-gold font-semibold text-[13px] px-4 py-[8px] rounded-full tracking-[.08em]">
            SINCE 2002
          </span>
        </div>
        <h1 className="m-0 mb-6 font-bold text-white text-[36px] md:text-[52px] leading-[1.25] tracking-[-.025em]">
          인력부터 시설까지,
          <br />
          하나의 파트너로
          <br />
          모두 해결하세요
        </h1>
        <p className="m-0 mb-10 text-white/85 text-[17px] md:text-[18px] leading-[1.7] max-w-[480px]">
          24년간 쌓아온 운영 노하우로, 귀사가 본업에만 집중할 수 있도록
          모든 현장을 책임집니다.
        </p>
        <div className="flex flex-wrap gap-3.5">
          <InquiryButton className="bg-brand text-white font-bold text-[16px] px-[30px] py-[17px] rounded-full hover:bg-brand-dark transition-colors cursor-pointer">
            견적 요청하기 →
          </InquiryButton>
          <a
            href="#services"
            className="border border-white/45 text-white font-semibold text-[16px] px-[30px] py-[17px] rounded-full hover:bg-white/10 transition-colors"
          >
            사업 영역 보기
          </a>
        </div>
      </div>
    </section>
  );
}
