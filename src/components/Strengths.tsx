import Image from "next/image";

const POINTS = [
  {
    title: "23년 축적된 현장 노하우",
    desc: "2002년 설립 이후 제조·물류·경비·시설 전 영역에서 쌓아온 운영 경험으로 예측 가능한 결과를 만듭니다.",
  },
  {
    title: "자체 2만 명 인재 DB",
    desc: "직무별 검증된 인재 풀을 자체 보유해, 결원 발생 시에도 빠르게 대체 인력을 투입합니다.",
  },
  {
    title: "ISO 9001 품질경영 인증",
    desc: "표준화된 품질 관리 프로세스와 정기 성과 리포팅으로 운영 상태를 투명하게 공유합니다.",
  },
  {
    title: "시설경비업 정식 허가",
    desc: "경비·미화·시설관리 전 영역에 필요한 인허가를 갖추고 24시간 통합 관리 체계를 운영합니다.",
  },
];

export default function Strengths() {
  return (
    <section id="strengths" className="bg-cream py-14 md:py-20">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="grid md:grid-cols-2 gap-14 items-center">
          <div>
            <div className="font-semibold text-brand text-[14px] tracking-[.04em] mb-4">
              WHY GOODMORNING I&amp;C
            </div>
            <h2 className="m-0 mb-10 font-bold text-navy text-[28px] md:text-[36px] leading-[1.3] tracking-[-.02em]">
              현장 운영의 리스크를
              <br />
              가장 잘 아는 파트너
            </h2>
            <div className="flex flex-col gap-8">
              {POINTS.map((p) => (
                <div key={p.title} className="flex gap-5">
                  <span className="w-2 h-2 rounded-full bg-brand mt-2.5 shrink-0" />
                  <div>
                    <div className="font-bold text-navy text-[17px] mb-2">
                      {p.title}
                    </div>
                    <div className="text-muted text-[15px] leading-[1.7]">
                      {p.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="relative rounded-2xl overflow-hidden aspect-[3/4] row-span-2">
              <Image
                src="/assets/photo-team.jpg"
                alt="굿모닝아이앤씨 현장 팀"
                fill
                sizes="(max-width: 768px) 50vw, 300px"
                className="object-cover"
              />
            </div>
            <div className="relative rounded-2xl overflow-hidden aspect-square">
              <Image
                src="/assets/photo-office.jpg"
                alt="굿모닝아이앤씨 오피스"
                fill
                sizes="(max-width: 768px) 50vw, 300px"
                className="object-cover"
              />
            </div>
            <div className="relative rounded-2xl overflow-hidden aspect-square">
              <Image
                src="/assets/photo-desk.jpg"
                alt="굿모닝아이앤씨 업무 환경"
                fill
                sizes="(max-width: 768px) 50vw, 300px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
