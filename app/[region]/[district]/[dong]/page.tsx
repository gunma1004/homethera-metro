import { Metadata } from "next";
import Link from "next/link";
import ClientTextMixer from "../ClientTextMixer";

const SITE_URL = "https://homethera-metro.netlify.app";

interface PageProps {
  params: Promise<{
    region: string;
    district: string;
    dong: string;
  }>;
}

function safeDecode(str: string): string {
  if (!str) return "";
  try {
    return decodeURIComponent(decodeURIComponent(str)).trim();
  } catch {
    try {
      return decodeURIComponent(str).trim();
    } catch {
      return str.trim();
    }
  }
}

// 🌟 40개의 출장마사지 타이틀 순환 패턴 (동이름 + 구이름)
const TITLE_PATTERNS = [
  (d: string, g: string) => `${d} 출장 타이아로마 마사지·홈타이 | ${g} 안마 업체 | 홈테라`,
  (d: string, g: string) => `${d} 출장 스포츠 마사지·홈타이 | ${g} 안마 업체 | 홈테라`,
  (d: string, g: string) => `${d} 출장 프리미엄타이 마사지·홈타이 | ${g} 안마 업체 | 홈테라`,
  (d: string, g: string) => `${d} 출장 릴렉스아로마 마사지·홈타이 | ${g} 안마 업체 | 홈테라`,
  (d: string, g: string) => `${d} 출장 고급스웨디시 마사지·홈타이 | ${g} 안마 업체 | 홈테라`,
  (d: string, g: string) => `${d} 출장 아로마테라피 마사지·홈타이 | ${g} 안마 업체 | 홈테라`,
  (d: string, g: string) => `${d} 출장 감성스웨디시 마사지·홈타이 | ${g} 안마 업체 | 홈테라`,
  (d: string, g: string) => `${d} 출장 전통타이 마사지·홈타이 | ${g} 안마 업체 | 홈테라`,
  (d: string, g: string) => `${d} 출장 딥티슈 마사지·홈타이 | ${g} 안마 업체 | 홈테라`,
  (d: string, g: string) => `${d} 출장 힐링아로마 마사지·홈타이 | ${g} 안마 업체 | 홈테라`,
  (d: string, g: string) => `${d} 출장 바디케어 마사지·홈타이 | ${g} 안마 업체 | 홈테라`,
  (d: string, g: string) => `${d} 출장 전신아로마 마사지·홈타이 | ${g} 안마 업체 | 홈테라`,
  (d: string, g: string) => `${d} 출장 정통타이 마사지·홈타이 | ${g} 안마 업체 | 홈테라`,
  (d: string, g: string) => `${d} 출장 로미로미 마사지·홈타이 | ${g} 안마 업체 | 홈테라`,
  (d: string, g: string) => `${d} 출장 힐링스웨디시 마사지·홈타이 | ${g} 안마 업체 | 홈테라`,
  (d: string, g: string) => `${d} 출장 맞춤타이 마사지·홈타이 | ${g} 안마 업체 | 홈테라`,
  (d: string, g: string) => `${d} 출장 순환아로마 마사지·홈타이 | ${g} 안마 업체 | 홈테라`,
  (d: string, g: string) => `${d} 출장 VIP스웨디시 마사지·홈타이 | ${g} 안마 업체 | 홈테라`,
  (d: string, g: string) => `${d} 출장 건식스포츠 마사지·홈타이 | ${g} 안마 업체 | 홈테라`,
  (d: string, g: string) => `${d} 출장 호텔식마사지 마사지·홈타이 | ${g} 안마 업체 | 홈테라`,
  (d: string, g: string) => `${d} 출장 힐링테라피 마사지·홈타이 | ${g} 안마 업체 | 홈테라`,
  (d: string, g: string) => `${d} 출장 황제아로마 마사지·홈타이 | ${g} 안마 업체 | 홈테라`,
  (d: string, g: string) => `${d} 출장 명품스웨디시 마사지·홈타이 | ${g} 안마 업체 | 홈테라`,
  (d: string, g: string) => `${d} 출장 피로회복 마사지·홈타이 | ${g} 안마 업체 | 홈테라`,
  (d: string, g: string) => `${d} 출장 허브아로마 마사지·홈타이 | ${g} 안마 업체 | 홈테라`,
  (d: string, g: string) => `${d} 출장 감성아로마 마사지·홈타이 | ${g} 안마 업체 | 홈테라`,
  (d: string, g: string) => `${d} 출장 소프트타이 마사지·홈타이 | ${g} 안마 업체 | 홈테라`,
  (d: string, g: string) => `${d} 출장 타이스포츠 마사지·홈타이 | ${g} 안마 업체 | 홈테라`,
  (d: string, g: string) => `${d} 출장 체형관리 마사지·홈타이 | ${g} 안마 업체 | 홈테라`,
  (d: string, g: string) => `${d} 출장 릴렉싱테라피 마사지·홈타이 | ${g} 안마 업체 | 홈테라`,
  (d: string, g: string) => `${d} 출장 스페셜아로마 마사지·홈타이 | ${g} 안마 업체 | 홈테라`,
  (d: string, g: string) => `${d} 출장 프리미엄스웨디시 마사지·홈타이 | ${g} 안마 업체 | 홈테라`,
  (d: string, g: string) => `${d} 출장 통증케어 마사지·홈타이 | ${g} 안마 업체 | 홈테라`,
  (d: string, g: string) => `${d} 출장 균형테라피 마사지·홈타이 | ${g} 안마 업체 | 홈테라`,
  (d: string, g: string) => `${d} 출장 웰니스마사지 마사지·홈타이 | ${g} 안마 업체 | 홈테라`,
  (d: string, g: string) => `${d} 출장 바디릴렉스 마사지·홈타이 | ${g} 안마 업체 | 홈테라`,
  (d: string, g: string) => `${d} 출장 시그니처마사지 마사지·홈타이 | ${g} 안마 업체 | 홈테라`,
  (d: string, g: string) => `${d} 출장 파워아로마 마사지·홈타이 | ${g} 안마 업체 | 홈테라`,
  (d: string, g: string) => `${d} 출장 디톡스테라피 마사지·홈타이 | ${g} 안마 업체 | 홈테라`,
  (d: string, g: string) => `${d} 출장 안심마사지 마사지·홈타이 | ${g} 안마 업체 | 홈테라`,
];

// 🌟 30개의 메타 디스크립션 순환 패턴 (동이름 출장마사지 키워드 우선 + 구이름)
const DESC_PATTERNS = [
  (d: string, g: string) => `${d} 출장 마사지·홈타이·안마. ${g} 일대 건식 6만원부터 심야할증 없이 방문. 투명한 가격과 100% 현장 후불제로 전문 관리사가 집과 호텔로 찾아갑니다.`,
  (d: string, g: string) => `${d} 출장 마사지·홈타이·안마. ${g} 전문 관리사 직접 방문. 건식 6만원부터 저녁 7시~새벽 5시 심야할증 없이 운영합니다. 코스와 이용 요금을 확인하세요.`,
  (d: string, g: string) => `${d} 출장마사지 및 스웨디시 전문 제휴처. ${g} 전 지역 선입금 없는 투명한 정찰제로 어디든 신속하게 연결해 드립니다. 아로마와 타이 코스 요금을 확인해 보세요.`,
  (d: string, g: string) => `${d} 홈타이 및 출장 안마 서비스 안내. ${g} 숙련된 테라피스트가 고객님이 계신 곳으로 직접 찾아갑니다. 합리적인 코스 요금과 상세 운영 시간을 확인하세요.`,
  (d: string, g: string) => `${d} 출장 아로마 및 스웨디시 힐링 케어. ${g} 일상의 피로를 말끔히 풀어주는 맞춤형 프로그램을 제공합니다. 전화·문자로 간편하게 예약하실 수 있습니다.`,
  (d: string, g: string) => `${d} 출장마사지·안마 정보 안내. ${g} 정직한 코스별 가격표와 실시간 예약 번호를 투명하게 공개합니다. 홈테라에서 편리하게 비교하고 예약하세요.`,
  (d: string, g: string) => `${d} 프리미엄 출장 홈케어 마사지. ${g} 지친 몸과 마음을 달래주는 1:1 맞춤 테라피를 자택이나 호텔에서 편안하게 받아보세요.`,
  (d: string, g: string) => `${d} 출장 타이마사지 및 스웨디시 제휴점. ${g} 빠른 방문이 가능한 실속형 코스와 프리미엄 코스를 홈테라에서 만나보세요.`,
  (d: string, g: string) => `${d} 출장 바디케어 힐링 서비스. ${g} 거품 없는 가격과 검증된 관리사들의 정성스러운 손길로 완벽한 휴식을 선사합니다.`,
  (d: string, g: string) => `${d} 출장 마사지사 방문 서비스. ${g} 타이, 아로마, 스웨디시 전 코스 요금을 비교하고 원하는 시간대에 직접 예약하세요.`,
  (d: string, g: string) => `${d} 출장 안마 및 홈타이 추천 제휴점. ${g} 늦은 시간에도 심야할증 없이 이용 가능한 정직한 제휴 업소 정보를 제공합니다.`,
  (d: string, g: string) => `${d} 출장마사지 실시간 제휴 정보. ${g} 뭉친 근육을 시원하게 풀어주는 전문 테라피스트의 방문 케어를 경험해 보세요.`,
  (d: string, g: string) => `${d} 맞춤형 출장 스웨디시 & 아로마. ${g} 프라이빗한 공간에서 누리는 고품격 릴렉싱 테라피 코스와 가격을 확인하세요.`,
  (d: string, g: string) => `${d} 출장 마사지·안마 샵 안내. ${g} 신속 방문과 투명한 정찰제로 고객 만족도가 높은 추천 제휴점 안내입니다.`,
  (d: string, g: string) => `${d} 홈타이 출장 마사지 예약 센터. ${g} 집이나 숙소에서 편안하게 즐기는 힐링 테라피 프로그램과 상세 요금을 살펴보세요.`,
  (d: string, g: string) => `${d} 전문 출장 아로마 마사지. ${g} 고객님을 위한 1:1 맞춤 바디 릴렉싱 코스 및 실시간 전화 예약 안내.`,
  (d: string, g: string) => `${d} 출장 스웨디시 마사지 가이드. ${g} 부드러운 오일 터칭과 림프 순환 케어로 일상의 피로를 가볍게 비워보세요.`,
  (d: string, g: string) => `${d} 출장 타이 마사지 추천. ${g} 어디서나 부르면 바로 달려가는 신속 방문 홈케어 프로그램과 요금표.`,
  (d: string, g: string) => `${d} 힐링 출장 마사지 플랫폼. ${g} 코스별 소요 시간과 투명한 가격 정보를 한눈에 비교하세요.`,
  (d: string, g: string) => `${d} 출장 안마·홈타이 서비스. ${g} 검증된 실력파 관리사들의 정성 어린 맞춤 테라피로 몸과 마음의 안정을 되찾으세요.`,
  (d: string, g: string) => `${d} 출장 마사지 종합 안내. ${g} 가장 인기 있는 스웨디시 및 아로마 제휴 코스를 홈테라에서 확인하세요.`,
  (d: string, g: string) => `${d} 프리미엄 출장 웰니스 테라피. ${g} 번거로운 이동 없이 계신 곳에서 편리하게 마사지를 받으세요.`,
  (d: string, g: string) => `${d} 출장 마사지·안마 정보. ${g} 친절한 상담과 신속한 방문으로 최상의 힐링 만족도를 드립니다.`,
  (d: string, g: string) => `${d} 홈타이 출장 마사지 큐레이션. ${g} 투명한 정찰제 가격과 상세 코스 안내로 안심하고 이용하실 수 있습니다.`,
  (d: string, g: string) => `${d} 출장 아로마 마사지 추천. ${g} 천연 오일 케어와 힐링 프로그램 가격을 비교해 보세요.`,
  (d: string, g: string) => `${d} 출장 스웨디시 감성 테라피. ${g} 빠른 방문 보장과 정직한 안내를 홈테라에서 만나보세요.`,
  (d: string, g: string) => `${d} 출장 마사지·홈타이 예약 센터. ${g} 24시 제휴 정보와 맞춤형 바디케어 솔루션을 제공합니다.`,
  (d: string, g: string) => `${d} 전문 출장 안마 서비스. ${g} 검증된 파트너샵의 상세 코스 요금과 전화 연결 서비스를 제공합니다.`,
  (d: string, g: string) => `${d} 출장 릴렉스 마사지 안내. ${g} 쌓인 피로를 말끔히 해소해 주는 1:1 맞춤 방문 테라피를 확인하세요.`,
  (d: string, g: string) => `${d} 출장 마사지·스웨디시 총정리. ${g} 투명한 가격표와 이용 시간을 확인하고 직접 예약하세요.`,
];

// 🌿 동별 맞춤형 정보성 칼럼 생성기
function getDynamicWellnessInsight(locationName: string, seed: number) {
  const insightGroups = [
    {
      subtitle: `${locationName} 맞춤형 바디 밸런스 회복 및 근막 이완 웰니스 인사이트`,
      sec1Title: "1. 좌식 근무와 목·어깨 연부조직 긴장의 생체역학적 원인",
      sec1Text: [
        `${locationName} 일대에서 사무 업무나 이동이 잦은 현대인들은 하루의 상당 시간을 고정된 자세로 보내며 상체 근골격계에 지속적인 부하를 받습니다. 특히 시선이 아래로 향하거나 턱을 앞으로 내미는 자세는 경추 굴곡근을 약화시키고 상부 승모근과 견갑거근에 비정상적인 장력을 발생시킵니다.`,
        `이러한 만성 근막 긴장을 완화하려면 체온을 적정 수준으로 끌어올려 모세혈관을 확장하고, 결을 따라 섬세한 수기 압을 가해 단축된 근막을 넓게 펴주는 이완 과정이 필요합니다.`
      ],
      sec2Title: "2. 신체 상태에 따른 수기 스트레칭과 오일 테라피의 기능적 차이",
      sec2Text: [
        `테라피를 선택할 때는 당일의 피로 부위와 컨디션에 맞추어 관리 기법을 결정하는 것이 안전하고 효과적입니다. 오일을 사용하지 않는 건식 타이 케어는 수동적 전신 스트레칭과 지압을 결합하여 굳어있던 관절의 가동 범위를 확장하는 데 탁월합니다.`
      ],
      sec3Title: "3. 독립된 프라이빗 공간에서 누리는 심리적 안정과 숙면 유도",
      sec3Text: [
        `자택이나 호텔 객실 등 독립된 1인 사적 공간에서 진행되는 프라이빗 홈케어는 외부 소음과 시선이 완전히 차단되어 부교감신경계를 빠르게 활성화합니다. 세션 종료 후에도 번거로운 귀가 이동 없이 곧바로 아늑한 침상에서 숙면으로 이어질 수 있습니다.`
      ],
      sec4Title: "4. 안전하고 투명한 정찰제 및 후불 이용 에티켓",
      sec4Text: [
        `${locationName} 일대에서 웰니스 서비스를 이용하실 때는 소비자의 안전과 권익을 보장하는 정찰제 원칙을 확인하시는 것이 바람직합니다. 신뢰할 수 있는 제휴 파트너는 예약 명목의 불법 선입금을 일절 요구하지 않습니다.`
      ]
    }
  ];
  return insightGroups[seed % insightGroups.length];
}

// 🌟 네이버 서치어드바이저 권장 40자 타이틀 / 80자 디스크립션 서버 생성
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const { region, district, dong } = resolvedParams;

  const districtName = safeDecode(district);
  const dongName = safeDecode(dong);

  const charSum = (dongName + districtName + region).split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const titleIndex = Math.abs(charSum) % TITLE_PATTERNS.length;
  const descIndex = Math.abs(charSum) % DESC_PATTERNS.length;

  const finalTitle = TITLE_PATTERNS[titleIndex](dongName, districtName);
  const finalDesc = DESC_PATTERNS[descIndex](dongName, districtName);

  const canonicalUrl = `${SITE_URL}/${region}/${encodeURIComponent(districtName)}/${encodeURIComponent(dongName)}`;

  return {
    title: { absolute: finalTitle },
    description: finalDesc,
    alternates: {
      canonical: canonicalUrl,
    },
    keywords: [
      `${dongName} 출장마사지`,
      `${districtName} 출장마사지`,
      `${dongName} 홈타이`,
      `${districtName} 안마`,
      "홈테라",
    ],
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
      title: finalTitle,
      description: finalDesc,
      url: canonicalUrl,
      siteName: "홈테라",
      locale: "ko_KR",
      type: "website",
      images: [
        {
          url: `${SITE_URL}/banner.jpg`,
          width: 1200,
          height: 630,
          alt: `${dongName} 출장마사지 - 홈테라`,
        },
      ],
    },
  };
}

export default async function DongDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { region, district, dong } = resolvedParams;

  const districtName = safeDecode(district);
  const dongName = safeDecode(dong);
  const regionName = region === "seoul" ? "서울특별시" : region === "incheon" ? "인천광역시" : "경기도";

  const fullTitle = `${regionName} ${districtName} ${dongName}`;
  const charSum = (dongName + districtName + region).split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const titleIndex = Math.abs(charSum) % TITLE_PATTERNS.length;
  const descIndex = Math.abs(charSum) % DESC_PATTERNS.length;

  const finalTitle = TITLE_PATTERNS[titleIndex](dongName, districtName);
  const finalDesc = DESC_PATTERNS[descIndex](dongName, districtName);
  const insight = getDynamicWellnessInsight(dongName, Math.abs(charSum));

  const canonicalUrl = `${SITE_URL}/${region}/${encodeURIComponent(districtName)}/${encodeURIComponent(dongName)}`;

  // 🌟 네이버 & 구글 공용 구조화 데이터 스키마 (@graph 기반)
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["HealthAndBeautyBusiness", "LocalBusiness"],
        "@id": `${canonicalUrl}/#business`,
        name: finalTitle,
        description: finalDesc,
        url: canonicalUrl,
        telephone: "0507-1280-3360",
        image: `${SITE_URL}/banner.jpg`,
        priceRange: "60,000원~160,000원",
        currenciesAccepted: "KRW",
        paymentAccepted: "Cash, Credit Card",
        address: {
          "@type": "PostalAddress",
          streetAddress: dongName,
          addressLocality: districtName,
          addressRegion: regionName,
          addressCountry: "KR",
        },
        areaServed: {
          "@type": "AdministrativeArea",
          name: `${districtName} ${dongName}`,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}/#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "홈", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: `${districtName} 마사지`, item: `${SITE_URL}/${region}/${encodeURIComponent(districtName)}` },
          { "@type": "ListItem", position: 3, name: `${dongName} 마사지`, item: canonicalUrl },
        ],
      },
    ],
  };

  const localShops = [
    {
      id: 1,
      name: `🔥 ${fullTitle} 오늘밤 테라피 케어`,
      desc: "지친 일상에 맞춤형 피로회복 케어! 베테랑 테라피스트의 정성 어린 프라이빗 릴렉싱",
      phone: "0507-1280-3199",
      price: "타이 60,000원부터~",
      image: "/shop1.jpg"
    },
    {
      id: 2,
      name: `✨ ${fullTitle} 퀸즈홈테라피 케어`,
      desc: "최고급 천연 아로마 오일을 활용한 품격 있는 전신 바디 이완 케어 서비스",
      phone: "0507-1280-3296",
      price: "아로마 70,000원부터~",
      image: "/shop2.jpg"
    },
    {
      id: 3,
      name: `💎 ${fullTitle} 한국미인테라피`,
      desc: "재방문율 높은 안심 케어! 철저한 위생 관리와 럭셔리 스웨디시 프로그램 제공",
      phone: "0507-1280-3140",
      price: "힐링 100,000원부터~",
      image: "/shop3.jpg"
    },
    {
      id: 4,
      name: `🌟 ${fullTitle} 주주테라피`,
      desc: "감성 스웨디시 특화! 전문 힐러진의 맞춤형 VIP 체형 맞춤 피로회복 프로그램",
      phone: "0507-1280-3197",
      price: "스웨디시 140,000원부터~",
      image: "/shop4.jpg"
    },
    {
      id: 5,
      name: `👑 ${fullTitle} 한국골든테라피`,
      desc: "선입금 전혀 없는 100% 안심 후불제! 수도권 신속 방문 프라이빗 서비스",
      phone: "0507-1280-3360",
      price: "스페셜 110,000원부터~",
      image: "/shop5.jpg"
    }
  ];

  return (
    <div className="bg-[#050505] text-gray-100 min-h-screen flex flex-col font-sans selection:bg-amber-500 selection:text-black">
      
      {/* 검색로봇 수집용 구조화 데이터 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 상단 헤더 */}
      <header className="sticky top-0 z-50 bg-[#050505]/85 backdrop-blur-xl border-b border-amber-500/20 px-4 py-3.5 shadow-[0_4px_20px_rgba(245,158,11,0.1)]">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 group">
            <img 
              src="/logo.png" 
              alt="홈테라 로고" 
              className="w-10 h-10 rounded-xl object-cover border border-amber-500/40 shadow-[0_0_12px_rgba(245,158,11,0.4)]" 
            />
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-wider bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
                홈테라
              </span>
              <span className="text-[10px] text-gray-400 tracking-tighter">SEOUL · GYEONGGI · INCHEON</span>
            </div>
          </Link>
          
          <Link href={`/${region}/${encodeURIComponent(districtName)}`} className="text-xs font-bold text-amber-400 bg-amber-500/10 px-3.5 py-2 rounded-xl border border-amber-500/30 hover:bg-amber-500 hover:text-black transition-all shadow-inner flex items-center gap-1">
            <span>←</span> {districtName} 전체로 돌아가기
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 w-full flex-1 space-y-12">
        {/* 상단 지역 대표 배너 */}
        <section className="relative rounded-3xl overflow-hidden border border-amber-500/30 shadow-[0_0_40px_rgba(245,158,11,0.15)]">
          <img 
            src="/banner.jpg" 
            alt={`${fullTitle} 출장 릴렉싱 마사지`} 
            className="w-full h-56 md:h-72 object-cover filter brightness-[0.6]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-6 md:p-8">
            <span className="text-amber-400 text-xs font-black tracking-widest uppercase mb-1">
              {regionName} · {districtName} · {dongName}
            </span>
            <h1 className="text-xl md:text-3xl font-black text-white drop-shadow-md">
              {finalTitle}
            </h1>
            <p className="text-xs md:text-sm text-gray-300 mt-2 max-w-xl leading-relaxed">
              {finalDesc}
            </p>
          </div>
        </section>

        {/* 클라이언트 믹서 컴포넌트 연동 */}
        <ClientTextMixer region={region} district={districtName} dongName={dongName} />

        {/* 제휴업체 5개 카드리스트 */}
        <section className="space-y-6">
          <div className="text-center">
            <p className="text-xs text-amber-400 font-bold tracking-widest uppercase">RECOMMENDED HOME TAPE</p>
            <h2 className="text-xl md:text-2xl font-black text-white mt-1">
              {fullTitle} 추천 제휴업체 (총 5곳)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {localShops.map((lShop) => (
              <div key={lShop.id} className="bg-[#121214] border border-amber-500/20 hover:border-amber-500/60 rounded-2xl p-4 flex gap-4 items-center shadow-lg transition-all group relative">
                <Link 
                  href={`/shop/${region}/${encodeURIComponent(districtName)}/${encodeURIComponent(dongName)}/${lShop.id}`} 
                  className="absolute inset-0 z-10" 
                  aria-label={`${lShop.name} 상세페이지 보기`} 
                />
                <img 
                  src={lShop.image} 
                  alt={lShop.name} 
                  className="w-20 h-20 md:w-24 md:h-24 rounded-xl object-cover border border-white/10 group-hover:scale-105 transition-transform" 
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-extrabold text-sm md:text-base text-white truncate group-hover:text-amber-400 transition-colors">
                    {lShop.name}
                  </h3>
                  <p className="text-[11px] text-gray-400 mt-1 line-clamp-2">
                    {lShop.desc}
                  </p>
                  <div className="mt-2.5 flex items-center justify-between">
                    <span className="text-xs font-black text-amber-400">{lShop.price}</span>
                    <a 
                      href={`tel:${lShop.phone}`} 
                      className="bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-black font-black text-xs px-3.5 py-1.5 rounded-xl shadow transition-all relative z-20"
                    >
                      전화연결
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 📚 웰니스 인사이트 칼럼 */}
        <section className="bg-[#0c0c0e] p-6 sm:p-10 rounded-3xl border border-white/10 space-y-8 text-gray-300 leading-relaxed text-xs sm:text-sm">
          <div className="border-b border-white/10 pb-4">
            <span className="text-amber-400 font-extrabold text-xs tracking-widest block uppercase mb-1">
              HOMETHERA WELLNESS &amp; RECOVERY INSIGHT
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              {insight.subtitle}
            </h2>
          </div>
          <div className="space-y-3">
            <h3 className="text-base font-bold text-white">● {insight.sec1Title}</h3>
            {insight.sec1Text.map((p, idx) => <p key={idx}>{p}</p>)}
          </div>
          <div className="space-y-3">
            <h3 className="text-base font-bold text-white">● {insight.sec2Title}</h3>
            {insight.sec2Text.map((p, idx) => <p key={idx}>{p}</p>)}
          </div>
          <div className="space-y-3">
            <h3 className="text-base font-bold text-white">● {insight.sec3Title}</h3>
            {insight.sec3Text.map((p, idx) => <p key={idx}>{p}</p>)}
          </div>
          <div className="space-y-3">
            <h3 className="text-base font-bold text-white">● {insight.sec4Title}</h3>
            {insight.sec4Text.map((p, idx) => <p key={idx}>{p}</p>)}
          </div>
        </section>
      </main>

      <footer className="bg-[#030303] border-t border-white/10 py-10 text-center text-gray-500 text-xs mt-auto">
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <p className="text-gray-400 font-bold">홈테라는 건전하고 안전한 방문 힐링 바디케어 정보 안내 플랫폼입니다.</p>
          <p className="text-[11px] text-gray-600">COPYRIGHT &copy; 2026 홈테라 ALL RIGHTS RESERVED.</p>
        </div>
      </footer>
    </div>
  );
}