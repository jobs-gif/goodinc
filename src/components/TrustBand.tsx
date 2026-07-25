import Image from "next/image";

const STATS = [
  { value: "320", unit: "명", label: "전문 인력" },
  { value: "121", unit: "억", label: "2024년 매출" },
  { value: "ISO", unit: "9001", label: "품질경영 인증" },
];

export default function TrustBand() {
  return (
    <section id="about" className="mx-auto max-w-[1280px] px-6 pt-14 pb-8 md:pt-20 md:pb-10">
      <div className="grid md:grid-cols-[1fr_1.05fr] rounded-[28px] overflow-hidden shadow-[0_1px_3px_rgba(14,27,42,.08)] bg-white">
        <div
          className="p-8 md:p-14 flex flex-col justify-center"
          style={{
            background: "linear-gradient(160deg, #FBFAF7 0%, #EFEDE4 100%)",
          }}
        >
          <div className="inline-flex self-start items-center gap-2 bg-accent-bg text-brand font-semibold text-[14px] px-4 py-[9px] rounded-full mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-brand inline-block" />
            23년 검증된 종합 아웃소싱 파트너
          </div>
          <h2 className="m-0 mb-5 font-bold text-navy text-[26px] md:text-[34px] lg:text-[40px] leading-[1.32] tracking-[-.02em] whitespace-nowrap">
            현장을 아는 사람들이
            <br />
            <span className="text-brand">결과로 증명</span>합니다
          </h2>
          <p className="m-0 mb-9 text-muted text-[16px] md:text-[17px] leading-[1.7] max-w-[420px]">
            제조·물류·경비·시설 전 영역, 270명의 전문 인력과 자체 2만 명
            인재 DB로 귀사의 인력 리스크를 원천 차단합니다.
          </p>
          <div className="flex gap-8 md:gap-10 flex-wrap">
            {STATS.map((stat, i) => (
              <div key={stat.label} className="flex items-center gap-8 md:gap-10">
                {i > 0 && <div className="w-px self-stretch bg-border" />}
                <div>
                  <div className="font-bold text-navy text-[30px] md:text-[38px] leading-none">
                    {stat.value}
                    <span className="text-gold text-[16px] md:text-[18px] ml-[3px]">
                      {stat.unit}
                    </span>
                  </div>
                  <div className="font-medium text-muted-2 text-[13px] md:text-[14px] mt-[9px]">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative p-4 md:p-6 grid grid-cols-2 grid-rows-2 gap-4 bg-[#EFEEE8] min-h-[320px] md:min-h-0">
          <div className="relative row-span-2 rounded-2xl overflow-hidden bg-[#dfe1e8]">
            <Image
              src="/assets/cat-building.jpg"
              alt="빌딩 시설 관리"
              fill
              sizes="(max-width: 768px) 50vw, 320px"
              className="object-cover"
              style={{ objectPosition: "center 35%" }}
            />
          </div>
          <div className="relative rounded-2xl overflow-hidden bg-[#dfe1e8]">
            <Image
              src="/assets/cat-factory.jpg"
              alt="생산 도급 운영"
              fill
              sizes="(max-width: 768px) 50vw, 320px"
              className="object-cover"
            />
          </div>
          <div className="relative rounded-2xl overflow-hidden bg-[#dfe1e8]">
            <Image
              src="/assets/cat-logistics.jpg"
              alt="물류 위탁 운영"
              fill
              sizes="(max-width: 768px) 50vw, 320px"
              className="object-cover"
              style={{ objectPosition: "center 40%" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
