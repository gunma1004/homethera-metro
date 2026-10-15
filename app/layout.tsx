// app/layout.tsx
import type { Metadata, Viewport } from "next";
import "./globals.css";
import NavigationHeader from "./NavigationHeader";

const siteUrl = "https://homethera-metro.netlify.app";

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "서울·경기·인천 출장 프라이빗 마사지 케어｜홈테라",
    template: "%s | 홈테라",
  },
  description:
    "서울·경기·인천 출장마사지 홈테라 안내. 타이·스웨디시·아로마 코스와 가격표를 투명하게 정리했습니다. 예약은 업체에 직접 하시면 됩니다.",
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
  alternates: { canonical: siteUrl },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: { icon: "/logo.png", apple: "/logo.png" },
  openGraph: {
    title: "서울·경기·인천 출장 프라이빗 마사지 케어｜홈테라",
    description:
      "서울·경기·인천 출장마사지 홈테라 안내. 타이·스웨디시·아로마 코스와 가격표를 투명하게 정리했습니다. 예약은 업체에 직접 하시면 됩니다.",
    url: siteUrl,
    siteName: "홈테라",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/banner.jpg",
        width: 1200,
        height: 630,
        alt: "홈테라 - 서울 경기 인천 출장 프라이빗 마사지",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "서울·경기·인천 출장 프라이빗 마사지 케어｜홈테라",
    description:
      "서울·경기·인천 출장마사지 홈테라 안내. 타이·스웨디시·아로마 코스와 가격표를 투명하게 정리했습니다. 예약은 업체에 직접 하시면 됩니다.",
    images: ["/banner.jpg"],
  },
  other: {
    "naver-site-verification": "da6cf22a36106dbe67da1d318805a178ae012af4",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "홈테라",
      alternateName: ["홈테라 출장마사지", "수도권 홈테라"],
      description: "서울·경기·인천 출장 프라이빗 마사지 코스 및 요금 안내 플랫폼",
      inLanguage: "ko-KR",
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": ["HealthAndBeautyBusiness", "LocalBusiness"],
      "@id": `${siteUrl}/#organization`,
      name: "홈테라",
      url: siteUrl,
      logo: { "@type": "ImageObject", url: `${siteUrl}/logo.png` },
      image: `${siteUrl}/banner.jpg`,
      description: "서울, 경기, 인천 전 지역 출장마사지 및 프라이빗 바디케어 정보 안내",
      telephone: "0507-1280-3360",
      priceRange: "60,000원~180,000원",
      currenciesAccepted: "KRW",
      paymentAccepted: "Cash, Credit Card",
      areaServed: [
        { "@type": "AdministrativeArea", name: "서울특별시" },
        { "@type": "AdministrativeArea", name: "경기도" },
        { "@type": "AdministrativeArea", name: "인천광역시" },
      ],
      address: {
        "@type": "PostalAddress",
        addressRegion: "서울특별시",
        addressCountry: "KR",
      },
    },
  ],
};

// 🌟 올바른 RootLayout 선언
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#050505] text-gray-100 antialiased" suppressHydrationWarning>
        <NavigationHeader />
        {children}
      </body>
    </html>
  );
}