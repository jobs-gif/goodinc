"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import InquiryButton from "./InquiryButton";
import { SECTORS } from "./InquiryProvider";

type Service = {
  no: string;
  image: string;
  video: string;
  objectPosition: string;
  title: string;
  desc: string;
  short: string;
  shortDesc: string;
  details: string[];
  detailNote: string;
};

const SERVICES: Service[] = [
  {
    no: "01",
    image: "/assets/cat-factory.jpg",
    video: "/assets/vid-factory.mp4",
    objectPosition: "center center",
    title: "생산 도급\n운영 관리",
    desc: "전자·기계·식품 등 맞춤형 제조 라인 도급",
    short: "생산 도급",
    shortDesc: "제조 라인 운영",
    details: [
      "산업별 맞춤형 제조 라인 도급 운영",
      "조립·포장·출하 전 공정 검사 및 QC 불량률 관리",
      "데이터 기반 공정 개선 및 월간 성과 리포팅",
    ],
    detailNote: "숙련된 현장 관리자가 상주하며 생산성은 높이고 품질 리스크는 낮춥니다.",
  },
  {
    no: "02",
    image: "/assets/cat-logistics.jpg",
    video: "/assets/vid-logistics.mp4",
    objectPosition: "center 40%",
    title: "물류 · 유통\n위탁 운영",
    desc: "물류센터부터 재고 관리까지 통합 운영",
    short: "물류 · 유통",
    shortDesc: "창고 · 위탁 운영",
    details: [
      "물류센터·허브창고 통합 위탁 운영",
      "입출고·피킹·패킹·검수 전 과정 및 WMS 실시간 재고 관리",
      "상하차·지게차 전문 인력, 성수기 탄력 인력 투입",
    ],
    detailNote: "정교한 물류 프로세스와 기동성 있는 인력 매칭으로 효율은 높이고 비용은 줄입니다.",
  },
  {
    no: "03",
    image: "/assets/cat-handshake.jpg",
    video: "/assets/vid-handshake.mp4",
    objectPosition: "center 35%",
    title: "인력 파견 ·\nHR 아웃소싱",
    desc: "24년 매칭 노하우, 준법 인사관리",
    short: "인력 파견",
    shortDesc: "HR 아웃소싱",
    details: [
      "사무·비서직, F&B·유통·고객서비스 인력 공급",
      "맞춤형 채용대행 및 인재 발굴",
      "인사·노무 준법 관리 및 파견 근로자 복리후생 케어",
    ],
    detailNote: "24년 매칭 노하우와 철저한 준법 관리로 가장 적합한 인적자원을 연결합니다.",
  },
  {
    no: "04",
    image: "/assets/cat-building.jpg",
    video: "/assets/vid-building.mp4",
    objectPosition: "center 30%",
    title: "빌딩 · 시설\n유지 관리",
    desc: "건물 환경 · 설비 통합 운영",
    short: "빌딩 · 시설",
    shortDesc: "설비 유지 관리",
    details: [
      "전기·소방·냉난방·수처리 설비 관리",
      "시설물 정기 점검 및 법정 안전 점검 대응",
      "주차 관리·안내 데스크 운영",
    ],
    detailNote: "설비 전문가와 관리 인력이 협업해 365일 안전하고 쾌적한 환경을 만듭니다.",
  },
  {
    no: "05",
    image: "/assets/security-guards-entrance.jpg",
    video: "/assets/security-center-video.mp4",
    objectPosition: "center center",
    title: "보안 · 시설\n경비",
    desc: "시설경비업 정식 허가, 24시간 모니터링",
    short: "보안 · 경비",
    shortDesc: "시설 경비",
    details: [
      "상주 경비 및 정기 순찰",
      "출입통제·방문객 관리",
      "비상상황 대응 매뉴얼 운영 (공동주택·집합건물 경비 위탁 포함)",
    ],
    detailNote: "빈틈없는 출입통제와 모니터링으로 고객사의 자산을 안전하게 지킵니다.",
  },
  {
    no: "06",
    image: "/assets/cat-cleaning.jpg",
    video: "/assets/vid-cleaning.mp4",
    objectPosition: "center center",
    title: "미화 · 위생\n관리",
    desc: "위생관리용역업 허가, 친환경 클리닝",
    short: "미화 · 위생",
    shortDesc: "위생 관리",
    details: [
      "오피스·상업시설 상시 미화",
      "분기별 특수 클리닝(바닥·외벽) 및 정기 소독·방역",
      "친환경 약품·전문 장비 사용, 실시간 청결도 점검",
    ],
    detailNote: "전문 교육을 받은 미화 인력이 위생 등급을 높이고 쾌적한 공간을 만듭니다.",
  },
];

function ServiceModal({
  service,
  onClose,
}: {
  service: Service;
  onClose: () => void;
}) {
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

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={`${service.short} 세부 사업내역`}
    >
      <div
        className="absolute inset-0 bg-navy/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl w-full max-w-[720px] max-h-[90vh] overflow-y-auto">
        <div className="relative h-[220px] md:h-[280px] bg-[#1a2420]">
          <video
            src={service.video}
            autoPlay
            muted
            loop
            playsInline
            poster={service.image}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: service.objectPosition }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(14,27,42,.1) 0%, rgba(14,27,42,.75) 100%)",
            }}
          />
          <button
            onClick={onClose}
            aria-label="닫기"
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 text-navy text-[18px] font-bold flex items-center justify-center hover:bg-white transition-colors"
          >
            ✕
          </button>
          <div className="absolute left-7 md:left-9 bottom-6 text-white">
            <div className="inline-block font-semibold text-[12px] tracking-[.04em] bg-white/25 backdrop-blur-sm px-3 py-[7px] rounded-full mb-3">
              {service.no}
            </div>
            <div className="font-bold text-[24px] md:text-[28px] leading-[1.25] whitespace-pre-line">
              {service.title}
            </div>
          </div>
        </div>

        <div className="p-7 md:p-9">
          <div className="font-semibold text-brand text-[13px] tracking-[.06em] mb-4">
            세부 사업 내역
          </div>
          <ul className="flex flex-col gap-3 mb-7">
            {service.details.map((d) => (
              <li key={d} className="flex items-start gap-3">
                <span className="w-[18px] h-[18px] rounded-full bg-accent-green-bg text-green text-[11px] font-bold flex items-center justify-center shrink-0 mt-[3px]">
                  ✓
                </span>
                <span className="text-navy text-[15px] leading-[1.6]">{d}</span>
              </li>
            ))}
          </ul>
          <p className="m-0 mb-7 text-muted text-[14px] leading-[1.7] bg-accent-bg rounded-xl px-5 py-4">
            {service.detailNote}
          </p>
          <InquiryButton
            sector={SECTORS[Number(service.no) - 1]}
            onClick={onClose}
            className="inline-flex items-center gap-2 bg-brand text-white font-bold text-[15px] px-7 py-3.5 rounded-full hover:bg-brand-dark transition-colors cursor-pointer"
          >
            이 분야 견적 문의하기 →
          </InquiryButton>
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  const [selected, setSelected] = useState<Service | null>(null);

  return (
    <section id="services" className="mx-auto max-w-[1280px] px-6 pt-8 pb-14 md:pt-10 md:pb-20">
      <div className="text-center mb-14">
        <div className="font-semibold text-brand text-[14px] tracking-[.04em] mb-4">
          BUSINESS AREA
        </div>
        <h2 className="m-0 font-bold text-navy text-[28px] md:text-[38px] tracking-[-.02em]">
          6대 핵심 사업 영역
        </h2>
        <p className="m-0 mt-4 text-muted text-[15px]">
          카드를 클릭하면 세부 사업 내역을 확인할 수 있습니다
        </p>
      </div>

      {/* detailed cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {SERVICES.map((s) => (
          <button
            key={s.no}
            type="button"
            onClick={() => setSelected(s)}
            className="relative rounded-[22px] overflow-hidden bg-[#cfd2da] aspect-[4/5] text-left cursor-pointer group"
          >
            <Image
              src={s.image}
              alt={s.short}
              fill
              sizes="(max-width: 768px) 100vw, 420px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              style={{ objectPosition: s.objectPosition }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(15,17,25,0) 40%, rgba(13,15,22,.86) 100%)",
              }}
            />
            <div className="absolute left-6 right-6 bottom-6 text-white">
              <div className="inline-block font-semibold text-[12px] tracking-[.04em] bg-white/20 backdrop-blur-sm px-3 py-[7px] rounded-full mb-3.5">
                {s.no}
              </div>
              <div className="font-bold text-[22px] md:text-[24px] leading-[1.3] tracking-[-.01em] whitespace-pre-line">
                {s.title}
              </div>
              <div className="font-normal text-[14px] leading-[1.5] text-white/85 mt-2.5">
                {s.desc}
              </div>
              <div className="inline-flex items-center gap-1.5 font-semibold text-[13px] text-white/90 mt-4 opacity-80 group-hover:opacity-100 transition-opacity">
                세부 내역 보기 →
              </div>
            </div>
          </button>
        ))}
      </div>

      {selected && (
        <ServiceModal service={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}
