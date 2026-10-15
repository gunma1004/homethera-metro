import type { Metadata } from "next";
import MainClientUI from "./MainClientUI";

const SITE_URL = "https://homethera-metro.netlify.app";

// 🌟 네이버 서치어드바이저 수집 진단 100% 통과용 메인 메타데이터 (제목 31자 / 설명 76자)
export const metadata: Metadata = {
  title: {
    absolute: "서울·경기·인천 출장 프라이빗 마사지 케어｜홈테라",
  },
  description:
    "서울·경기·인천 홈테라 출장마사지 안내. 타이·스웨디시·아로마 코스와 가격표를 투명하게 정리했습니다. 예약은 업체에 직접 하시면 됩니다.",
  keywords: [
    "홈테라",
    "서울 출장마사지",
    "경기 출장마사지",
    "인천 출장마사지",
    "수도권 출장케어",
    "프라이빗 마사지",
    "스웨디시 추천",
    "타이마사지 가격",
  ],
  alternates: {
    canonical: SITE_URL,
  },
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
  openGraph: {
    title: "서울·경기·인천 출장 프라이빗 마사지 케어｜홈테라",
    description:
      "서울·경기·인천 홈테라 출장마사지 안내. 타이·스웨디시·아로마 코스와 가격표를 투명하게 정리했습니다. 예약은 업체에 직접 하시면 됩니다.",
    url: SITE_URL,
    siteName: "홈테라",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/banner.jpg`,
        width: 1200,
        height: 630,
        alt: "홈테라 수도권 프라이빗 힐링 바디케어",
      },
    ],
  },
};

export default function HomePage() {
  return <MainClientUI />;
}