import type { Metadata } from "next";
import "./globals.css";
import NavigationHeader from "./NavigationHeader";

export const metadata: Metadata = {
  // 사이트명이 뒤로 들어가는 타이틀 구조
  title: "서울·경기·인천 출장 케어 프라이빗 마사지 | 홈테라",
  description:
    "서울·경기·인천에서 홈테라 출장마사지를 살펴보세요. 프라이빗·스웨디시 타이 아로마 등 다양한 구성과 60·90·120분 코스의 시간·금액을 한눈에 확인할 수 있습니다.",
  keywords: [
    "홈테라",
    "서울 출장마사지",
    "경기 출장마사지",
    "인천 출장마사지",
    "수도권 출장케어",
    "프라이빗 마사지",
    "스웨디시",
    "타이마사지",
    "아로마 마사지",
  ],
  metadataBase: new URL("https://homethera-metro.netlify.app"),
  alternates: {
    canonical: "https://homethera-metro.netlify.app/",
  },
  openGraph: {
    title: "서울·경기·인천 출장 케어 프라이빗 마사지 | 홈테라",
    description:
      "서울·경기·인천에서 홈테라 출장마사지를 살펴보세요. 프라이빗·스웨디시 타이 아로마 등 다양한 구성과 60·90·120분 코스의 시간·금액을 한눈에 확인할 수 있습니다.",
    url: "https://homethera-metro.netlify.app/",
    siteName: "홈테라",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "서울·경기·인천 출장 케어 프라이빗 마사지 | 홈테라",
    description:
      "서울·경기·인천에서 홈테라 출장마사지를 살펴보세요. 프라이빗·스웨디시 타이 아로마 등 다양한 구성과 60·90·120분 코스의 시간·금액을 한눈에 확인할 수 있습니다.",
  },
  verification: {
    other: {
      "naver-site-verification": "da6cf22a36106dbe67da1d318805a178ae012af4",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <NavigationHeader />
        {children}
      </body>
    </html>
  );
}