import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "굿모닝아이앤씨 | GOODMORNING I&C",
  description:
    "제조·물류·경비·시설 전 영역, 23년 검증된 종합 아웃소싱 파트너 굿모닝아이앤씨. 320명 전문 인력과 2만 명 인재 DB로 귀사의 현장을 책임집니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
