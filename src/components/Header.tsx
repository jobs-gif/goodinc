"use client";

import { useState } from "react";
import Image from "next/image";
import { useInquiry } from "./InquiryProvider";

const NAV_ITEMS = [
  { label: "회사 소개", href: "#about" },
  { label: "사업 영역", href: "#services" },
  { label: "왜 굿모닝아이앤씨", href: "#strengths" },
  { label: "오시는 길", href: "#contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const { open: openInquiry } = useInquiry();

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-border">
      <div className="mx-auto max-w-[1280px] px-6 h-[76px] flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3">
          <Image
            src="/assets/logo/inc-mark.svg"
            alt="굿모닝아이앤씨"
            width={40}
            height={40}
          />
          <span className="flex flex-col leading-none">
            <span className="font-bold text-[15px] tracking-[.02em]">
              <span className="text-brand">good</span>
              <span className="text-green">morning</span>
            </span>
            <span className="font-black text-[19px] text-navy tracking-[-.02em] mt-[2px]">
              INC<span className="text-gold">.</span>
            </span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-9">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[15px] font-medium text-navy/80 hover:text-brand transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => openInquiry()}
          className="hidden md:inline-flex items-center gap-2 bg-brand text-white font-bold text-[14px] px-6 py-3 rounded-full hover:bg-brand-dark transition-colors cursor-pointer"
        >
          견적 요청하기 →
        </button>

        <button
          aria-label="메뉴 열기"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden flex flex-col gap-[5px] p-2"
        >
          <span className="w-6 h-[2px] bg-navy" />
          <span className="w-6 h-[2px] bg-navy" />
          <span className="w-6 h-[2px] bg-navy" />
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-white px-6 py-5 flex flex-col gap-5">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="text-[15px] font-medium text-navy"
            >
              {item.label}
            </a>
          ))}
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              openInquiry();
            }}
            className="inline-flex items-center justify-center gap-2 bg-brand text-white font-bold text-[14px] px-6 py-3 rounded-full"
          >
            견적 요청하기 →
          </button>
        </div>
      )}
    </header>
  );
}
