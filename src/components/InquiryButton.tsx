"use client";

import type { ReactNode } from "react";
import { useInquiry } from "./InquiryProvider";

export default function InquiryButton({
  className,
  children,
  sector,
  onClick,
}: {
  className?: string;
  children: ReactNode;
  sector?: string;
  onClick?: () => void;
}) {
  const { open } = useInquiry();
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        onClick?.();
        open(sector);
      }}
    >
      {children}
    </button>
  );
}
