import type { Metadata } from "next";
import "./globals.css";
import NavigationHeader from "./NavigationHeader";

const siteUrl = "https://homethera-metro.netlify.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  // 🎯 타이틀 템플릿 구조 (하위 페이지와 조화롭게 연결)
  title: {
    default: "서울·경기·인천 출장 케어 프라이빗 마사지 | 홈테라",
    template: "%s | 홈테라",
  },
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
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "서울·경기·인천 출장 케어 프라이빗 마사지 | 홈테라",
    description:
      "서울·경기·인천에서 홈테라 출장마사지를 살펴보세요. 프라이빗·스웨디시 타이 아로마 등 다양한 구성과 60·90·120분 코스의 시간·금액을 한눈에 확인할 수 있습니다.",
    url: siteUrl,
    siteName: "홈테라",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/banner.jpg",
        width: 1200,
        height: 630,
        alt: "홈테라 수도권 프라이빗 힐링 바디케어",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "서울·경기·인천 출장 케어 프라이빗 마사지 | 홈테라",
    description:
      "서울·경기·인천에서 홈테라 출장마사지를 살펴보세요. 프라이빗·스웨디시 타이 아로마 등 다양한 구성과 60·90·120분 코스의 시간·금액을 한눈에 확인할 수 있습니다.",
    images: ["/banner.jpg"],
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
  // 네이버 검색엔진이 브랜드와 사이트 대표 URL을 정확히 인식하도록 돕는 JSON-LD
  const siteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "홈테라",
    alternateName: "홈테라 출장마사지",
    url: siteUrl,
  };

  return (
    <html lang="ko">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }}
        />
      </head>
      <body>
        <NavigationHeader />
        {children}
      </body>
    </html>
  );
}