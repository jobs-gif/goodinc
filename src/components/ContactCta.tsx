import InquiryButton from "./InquiryButton";

export default function ContactCta() {
  return (
    <section id="contact" className="mx-auto max-w-[1280px] px-6 py-14 md:py-20">
      <div
        className="relative rounded-[28px] overflow-hidden px-8 md:px-16 py-16 md:py-20 text-center"
        style={{
          background:
            "linear-gradient(135deg, #12241F 0%, #163029 60%, #1A3A2E 100%)",
        }}
      >
        <div className="inline-flex items-center gap-2 border border-gold/50 text-gold font-semibold text-[13px] px-4 py-[9px] rounded-full mb-8 tracking-[.06em]">
          CONTACT US
        </div>
        <h2 className="m-0 mb-6 font-bold text-white text-[26px] md:text-[38px] leading-[1.3] tracking-[-.02em]">
          현장 인력 문제, 지금 상담받아보세요
        </h2>
        <p className="m-0 mb-10 text-white/80 text-[16px] md:text-[17px] leading-[1.7] max-w-[560px] mx-auto">
          생산·물류·인력·시설·보안·미화 현장에 필요한 인력과 운영 체계를
          굿모닝아이앤씨가 함께 설계해 드립니다.
        </p>
        <div className="flex flex-wrap justify-center gap-3.5 mb-12">
          <InquiryButton className="bg-gold text-navy font-bold text-[16px] px-[30px] py-[17px] rounded-full hover:brightness-105 transition cursor-pointer">
            견적 · 문의 접수하기 →
          </InquiryButton>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 max-w-[720px] mx-auto text-left border-t border-white/15 pt-10">
          <div>
            <div className="text-gold/80 text-[12px] font-semibold tracking-[.06em] mb-2">
              전화
            </div>
            <div className="text-white text-[15px] font-medium">
              041-551-5111
            </div>
          </div>
          <div>
            <div className="text-gold/80 text-[12px] font-semibold tracking-[.06em] mb-2">
              이메일
            </div>
            <div className="text-white text-[15px] font-medium break-all">
              goodos@goodos.co.kr
            </div>
          </div>
          <div>
            <div className="text-gold/80 text-[12px] font-semibold tracking-[.06em] mb-2">
              주소
            </div>
            <div className="text-white text-[15px] font-medium">
              충남 천안시 동남구 충절로 128, 102호
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
