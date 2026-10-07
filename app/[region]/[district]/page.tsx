import { Metadata } from "next";
import Link from "next/link";
import ClientTextMixer from "./ClientTextMixer";

interface PageProps {
  params: Promise<{
    region: string;
    district: string;
  }>;
  searchParams: Promise<{
    dong?: string;
  }>;
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  
  const { region, district } = resolvedParams;
  const dongName = resolvedSearchParams.dong ? decodeURIComponent(resolvedSearchParams.dong) : "";
  const districtName = decodeURIComponent(district);
  const regionName = region === "seoul" ? "서울" : region === "incheon" ? "인천" : "경기";

  // 디스크립션 문두 전용: "시 구 동" (예: 서울 강남구 역삼1동 또는 서울 강남구)
  const fullLocationHeader = `${regionName} ${districtName} ${dongName}`.trim();

  // 타이틀 앞머리: 동이 있으면 동, 없으면 구
  const leadLocation = dongName || districtName;
  // 타이틀 끝쪽 구 표기: 동이 있을 때만 괄호 형태로 추가
  const tailDistrict = dongName ? ` (${districtName})` : "";

  // -------------------------------------------------------------
  // 🎯 50가지 패턴 연산
  // -------------------------------------------------------------
  const charSum = (fullLocationHeader + dongName + districtName).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const variantIndex = charSum % 50;

  // 1. 타이틀: {동/구} 출장 {단어} 마사지 ... {끝쪽 구} 업체 | 홈테라
  const titleVariants = [
    /* 0 */ `${leadLocation} 출장 릴렉싱 마사지 추천 및 24시 방문${tailDistrict} 업체 | 홈테라`,
    /* 1 */ `${leadLocation} 출장 프리미엄 마사지 100% 안심 후불제${tailDistrict} 업체 | 홈테라`,
    /* 2 */ `${leadLocation} 출장 홈 마사지 24시 전문 프라이빗 케어${tailDistrict} 업체 | 홈테라`,
    /* 3 */ `${leadLocation} 출장 힐링 마사지 제휴 코스 및 후불 예약${tailDistrict} 업체 | 홈테라`,
    /* 4 */ `${leadLocation} 출장 스웨디시 마사지 24시 빠른 방문${tailDistrict} 업체 | 홈테라`,
    /* 5 */ `${leadLocation} 출장 프라이빗 마사지 안심 후불 테라피${tailDistrict} 업체 | 홈테라`,
    /* 6 */ `${leadLocation} 출장 맞춤 마사지 신속 도착 정직한 케어${tailDistrict} 업체 | 홈테라`,
    /* 7 */ `${leadLocation} 출장 딥티슈 마사지 24시 예약 제휴 코스${tailDistrict} 업체 | 홈테라`,
    /* 8 */ `${leadLocation} 출장 아로마 마사지 1:1 맞춤 피로회복${tailDistrict} 업체 | 홈테라`,
    /* 9 */ `${leadLocation} 출장 힐링 마사지 추천 제휴 매장 모음${tailDistrict} 업체 | 홈테라`,
    /* 10 */ `${leadLocation} 출장 릴렉싱 마사지 코스 확인 후불 케어${tailDistrict} 업체 | 홈테라`,
    /* 11 */ `${leadLocation} 출장 프리미엄 마사지 25분 내 빠른 방문${tailDistrict} 업체 | 홈테라`,
    /* 12 */ `${leadLocation} 출장 홈 마사지 가이드 타이 & 아로마${tailDistrict} 업체 | 홈테라`,
    /* 13 */ `${leadLocation} 출장 프라이빗 마사지 24시 엄선 요금표${tailDistrict} 업체 | 홈테라`,
    /* 14 */ `${leadLocation} 출장 케어 마사지 잘하는 곳 안심 후불제${tailDistrict} 업체 | 홈테라`,
    /* 15 */ `${leadLocation} 출장 릴렉스 마사지 신속 전화 예약${tailDistrict} 업체 | 홈테라`,
    /* 16 */ `${leadLocation} 출장 베테랑 마사지 24시 1:1 방문 테라피${tailDistrict} 업체 | 홈테라`,
    /* 17 */ `${leadLocation} 출장 스웨디시 마사지 가이드 홈케어 안내${tailDistrict} 업체 | 홈테라`,
    /* 18 */ `${leadLocation} 출장 힐링 마사지 24시간 언제나 빠른 출동${tailDistrict} 업체 | 홈테라`,
    /* 19 */ `${leadLocation} 출장 맞춤형 마사지 선입금 없는 정직한${tailDistrict} 업체 | 홈테라`,
    /* 20 */ `${leadLocation} 출장 릴렉싱 마사지 전문 제휴 가이드${tailDistrict} 업체 | 홈테라`,
    /* 21 */ `${leadLocation} 출장 프리미엄 마사지 만족도 높은 24시${tailDistrict} 업체 | 홈테라`,
    /* 22 */ `${leadLocation} 출장 홈 마사지 제휴 코스 및 가격 안내${tailDistrict} 업체 | 홈테라`,
    /* 23 */ `${leadLocation} 출장 프라이빗 마사지 25분 빠른 도착${tailDistrict} 업체 | 홈테라`,
    /* 24 */ `${leadLocation} 출장 바디 마사지 프라이빗 케어 후불제${tailDistrict} 업체 | 홈테라`,
    /* 25 */ `${leadLocation} 출장 전신 마사지 추천 24시 안심 방문${tailDistrict} 업체 | 홈테라`,
    /* 26 */ `${leadLocation} 출장 아로마 마사지 타이 & 스웨디시${tailDistrict} 업체 | 홈테라`,
    /* 27 */ `${leadLocation} 출장 릴렉싱 마사지 예약 안내 100% 후불${tailDistrict} 업체 | 홈테라`,
    /* 28 */ `${leadLocation} 출장 프리미엄 마사지 친절 방문 피로회복${tailDistrict} 업체 | 홈테라`,
    /* 29 */ `${leadLocation} 출장 홈 마사지 신속 방문 24시 테라피${tailDistrict} 업체 | 홈테라`,
    /* 30 */ `${leadLocation} 출장 프라이빗 마사지 프리미엄 제휴 코스${tailDistrict} 업체 | 홈테라`,
    /* 31 */ `${leadLocation} 출장 힐링 마사지 내 주변 신속 방문${tailDistrict} 업체 | 홈테라`,
    /* 32 */ `${leadLocation} 출장 맞춤 마사지 24시간 후불 예약 방법${tailDistrict} 업체 | 홈테라`,
    /* 33 */ `${leadLocation} 출장 오일 마사지 정직하고 안전한 1:1${tailDistrict} 업체 | 홈테라`,
    /* 34 */ `${leadLocation} 출장 릴렉스 마사지 추천 매장 종합 가격${tailDistrict} 업체 | 홈테라`,
    /* 35 */ `${leadLocation} 출장 프리미엄 마사지 힐링 코스 가격표${tailDistrict} 업체 | 홈테라`,
    /* 36 */ `${leadLocation} 출장 홈 마사지 선입금 없는 24시 케어${tailDistrict} 업체 | 홈테라`,
    /* 37 */ `${leadLocation} 출장 프라이빗 마사지 베테랑 힐러 배정${tailDistrict} 업체 | 홈테라`,
    /* 38 */ `${leadLocation} 출장 케어 마사지 나만을 위한 프라이빗${tailDistrict} 업체 | 홈테라`,
    /* 39 */ `${leadLocation} 출장 바디 마사지 안심 후불제 24시${tailDistrict} 업체 | 홈테라`,
    /* 40 */ `${leadLocation} 출장 건식 마사지 오일 & 아로마 제휴${tailDistrict} 업체 | 홈테라`,
    /* 41 */ `${leadLocation} 출장 힐링 마사지 건전 방문 바디 서비스${tailDistrict} 업체 | 홈테라`,
    /* 42 */ `${leadLocation} 출장 릴렉싱 마사지 피로 풀리는 1:1${tailDistrict} 업체 | 홈테라`,
    /* 43 */ `${leadLocation} 출장 프리미엄 마사지 25분 내 빠른 쉼터${tailDistrict} 업체 | 홈테라`,
    /* 44 */ `${leadLocation} 출장 홈 마사지 엄선된 24시 제휴 매장${tailDistrict} 업체 | 홈테라`,
    /* 45 */ `${leadLocation} 출장 스웨디시 마사지 후불제 24시 전문${tailDistrict} 업체 | 홈테라`,
    /* 46 */ `${leadLocation} 출장 프라이빗 마사지 내 방에서 받는 힐링${tailDistrict} 업체 | 홈테라`,
    /* 47 */ `${leadLocation} 출장 전신 마사지 안심 후불 24시 정보${tailDistrict} 업체 | 홈테라`,
    /* 48 */ `${leadLocation} 출장 아로마 마사지 최고급 천연 오일${tailDistrict} 업체 | 홈테라`,
    /* 49 */ `${leadLocation} 출장 릴렉싱 마사지 신속 예약 코스 안내${tailDistrict} 업체 | 홈테라`
  ];

  // 2. 디스크립션: "{시} {구} {동} 출장마사지"로 시작
  const descriptionVariants = [
    /* 0 */ `${fullLocationHeader} 출장마사지 25분 내 빠른 방문! 선입금 요청 절대 없는 100% 안심 후불제. 타이, 아로마, 스웨디시 제휴업체 코스 및 요금을 한눈에 확인하세요.`,
    /* 1 */ `${fullLocationHeader} 출장마사지 안내. 프라이빗한 피로 회복을 위한 24시 방문 홈케어 가이드로 베테랑 테라피스트의 맞춤 힐링 케어를 제공합니다.`,
    /* 2 */ `${fullLocationHeader} 출장마사지 예약 가이드. 전지역 신속 방문과 부담 없는 후불제 시스템, 정직한 60·90·120분 코스 정보를 홈테라에서 살펴보세요.`,
    /* 3 */ `${fullLocationHeader} 출장마사지 & 바디케어. 스웨디시 및 아로마 릴렉싱 코스 구성과 투명한 가격, 빠른 전화 예약 상담을 확인하세요.`,
    /* 4 */ `${fullLocationHeader} 출장마사지 찾고 계신가요? 100% 후불제로 안심하고 내 공간에서 편안하게 즐기는 프라이빗 홈케어 전문 안내입니다.`,
    /* 5 */ `${fullLocationHeader} 출장마사지 24시 안내. 지친 일상의 피로를 날려줄 빠른 신속 방문과 베테랑 힐러진의 품격 있는 힐링 테라피를 만나보세요.`,
    /* 6 */ `${fullLocationHeader} 출장마사지 25분 도착 보장! 선입금 없는 정직한 후불제와 깔끔한 타이·아로마·스웨디시 바디케어 코스를 엄선하여 안내합니다.`,
    /* 7 */ `${fullLocationHeader} 출장마사지 제휴업체 모음. 24시간 언제든 편안한 개인 공간에서 이용하는 프리미엄 스웨디시 및 피로회복 케어.`,
    /* 8 */ `${fullLocationHeader} 출장마사지 믿을 수 있는 후불제 정보. 타이 60분 6만원, 아로마 90분 9만원 등 합리적인 코스 금액을 홈테라에서 비교해 보세요.`,
    /* 9 */ `${fullLocationHeader} 출장마사지 안심 서비스! 선입금 요구 없이 관리사 도착 후 결제하는 안전한 100% 후불제 시스템을 약속합니다.`,
    /* 10 */ `${fullLocationHeader} 출장마사지 및 방문 홈케어 종합 안내. 맞춤형 힐링 프로그램으로 뭉친 어깨와 다리 피로를 시원하게 풀어드립니다.`,
    /* 11 */ `${fullLocationHeader} 출장마사지 코스 및 이용 가격표 안내. 24시간 친절 상담과 신속한 방문으로 고객 만족도를 높여드립니다.`,
    /* 12 */ `${fullLocationHeader} 출장마사지 릴렉싱 케어. 프라이빗한 1:1 맞춤 관리로 지친 몸에 깊은 휴식과 활력을 되찾아 드립니다.`,
    /* 13 */ `${fullLocationHeader} 출장마사지 예약 가이드. 선입금 걱정 없는 안전한 100% 후불제 제휴업체 정보만 선별하여 안내해 드립니다.`,
    /* 14 */ `${fullLocationHeader} 출장마사지 신속 방문 케어. 타이, 아로마, 스웨디시 등 내 컨디션에 꼭 맞는 맞춤형 힐링 테라피 추천.`,
    /* 15 */ `${fullLocationHeader} 출장마사지 안심 이용 가이드. 예약금 요구 없는 정직한 후불 시스템으로 편안하게 자택 및 호텔에서 이용하세요.`,
    /* 16 */ `${fullLocationHeader} 출장마사지 전문 힐러 케어. 빠른 방문 도착 시간과 투명한 코스별 요금표 정보를 홈테라에서 확인하세요.`,
    /* 17 */ `${fullLocationHeader} 출장마사지 24시 방문 서비스. 쌓인 스트레스와 긴장된 근육을 부드럽게 이완시켜 드리는 힐링 타임.`,
    /* 18 */ `${fullLocationHeader} 출장마사지 엄선 제휴업체 정보. 선입금 0원, 검증된 1:1 방문 맞춤 케어 프로그램과 정직한 요금 안내.`,
    /* 19 */ `${fullLocationHeader} 출장마사지 25분 내 출동 서비스. 친절한 일정 조율과 신속한 도착으로 언제나 편안하게 이용하실 수 있습니다.`,
    /* 20 */ `${fullLocationHeader} 출장마사지 만족도 우수 후불 가이드. 전신 아로마 및 스웨디시 힐링 코스로 하루의 피로를 녹여보세요.`,
    /* 21 */ `${fullLocationHeader} 출장마사지 365일 연중무휴 24시 운영! 100% 후불 안심 예약 시스템으로 부담 없이 이용하세요.`,
    /* 22 */ `${fullLocationHeader} 출장마사지 홈테라 공식 정보 안내. 빠른 방문과 차별화된 프리미엄 홈케어 테라피를 만나보세요.`,
    /* 23 */ `${fullLocationHeader} 출장마사지 전문 가이드. 1:1 맞춤 피로회복 케어로 내 공간에서 쾌적하고 편안한 힐링 시간을 선물합니다.`,
    /* 24 */ `${fullLocationHeader} 출장마사지 신속 예약 지원. 선입금 없는 안심 후불제로 즐기는 럭셔리 스웨디시 & 아로마 프로그램.`,
    /* 25 */ `${fullLocationHeader} 출장마사지 24시 정보. 지친 몸에 활력을 더해줄 검증된 테라피스트의 다채로운 힐링 코스를 추천합니다.`,
    /* 26 */ `${fullLocationHeader} 출장마사지 가격 및 코스 상세 안내. 24시간 원하는 시간에 맞춰 방문하는 프라이빗 1:1 케어.`,
    /* 27 */ `${fullLocationHeader} 출장마사지 안심 후불제 추천! 출발 전 선입금을 요구하지 않는 정직한 업체 정보만 모아 안내합니다.`,
    /* 28 */ `${fullLocationHeader} 출장마사지 25분 신속 방문 케어. 뭉친 승모근과 하체 피로를 시원하고 상쾌하게 풀어드립니다.`,
    /* 29 */ `${fullLocationHeader} 출장마사지 최상의 제휴 안내. 정직한 서비스 마인드와 명확한 표준 요금 체계를 확인해 보세요.`,
    /* 30 */ `${fullLocationHeader} 출장마사지 타이, 아로마, 스웨디시 맞춤 케어! 이동할 필요 없이 편안한 장소에서 누리는 프라이빗 힐링.`,
    /* 31 */ `${fullLocationHeader} 출장마사지 100% 후불제 시스템. 빠른 방문과 친절한 서비스로 고객님을 정성껏 모십니다.`,
    /* 32 */ `${fullLocationHeader} 출장마사지 힐링 테라피 모음. 24시간 언제나 빠르게 이용할 수 있는 수도권 안심 방문 가이드.`,
    /* 33 */ `${fullLocationHeader} 출장마사지 전문 제휴업체 정보. 신속한 방문 서비스와 꼼꼼한 전신 이완 프로그램 요금을 안내합니다.`,
    /* 34 */ `${fullLocationHeader} 출장마사지 안심 이용 방법. 예약부터 관리사 도착까지 100% 후불제로 안전하게 진행됩니다.`,
    /* 35 */ `${fullLocationHeader} 출장마사지 베테랑 테라피스트 신속 배정. 아로마 및 스웨디시 코스로 일상의 활력을 되찾아 드립니다.`,
    /* 36 */ `${fullLocationHeader} 출장마사지 빠른 방문 보장. 사기 걱정 없는 100% 안심 후불제 시스템으로 언제든 편하게 이용하세요.`,
    /* 37 */ `${fullLocationHeader} 출장마사지 1:1 프라이빗 테라피 안내. 지친 일상 속 깊은 휴식과 릴렉싱을 제공하는 제휴 정보.`,
    /* 38 */ `${fullLocationHeader} 출장마사지 25분 빠른 출동 케어! 전신 근육 긴장 완화 및 심신 안정을 돕는 프리미엄 홈케어.`,
    /* 39 */ `${fullLocationHeader} 출장마사지 홈테라 엄선 제휴업체 모음. 깔끔하고 정직한 서비스 정보와 코스별 가격을 확인하세요.`,
    /* 40 */ `${fullLocationHeader} 출장마사지 타이 & 스웨디시 정보. 선입금 요구가 전혀 없는 안전한 후불제 매장만 투명하게 제공합니다.`,
    /* 41 */ `${fullLocationHeader} 출장마사지 24시간 예약 지원. 나만의 프라이빗한 장소에서 부담 없이 피로를 풀어보세요.`,
    /* 42 */ `${fullLocationHeader} 출장마사지 릴렉스 전문 가이드. 명확한 요금 체계와 베테랑 힐러의 깊이 있는 방문 케어 서비스.`,
    /* 43 */ `${fullLocationHeader} 출장마사지 전지역 24시 신속 방문. 최고급 아로마 오일 테라피로 지친 몸과 마음을 정성껏 다스려 드립니다.`,
    /* 44 */ `${fullLocationHeader} 출장마사지 제휴업체 실시간 가이드. 100% 후불 안전 거래와 깔끔한 서비스 구성.`,
    /* 45 */ `${fullLocationHeader} 출장마사지 빠른 예약 안내. 24시간 편한 시간에 맞춰 방문하는 1:1 맞춤 피로해소 프로그램.`,
    /* 46 */ `${fullLocationHeader} 출장마사지 추천 가이드! 선입금 없는 후불제로 마음 편히 이용할 수 있는 홈케어 바디케어.`,
    /* 47 */ `${fullLocationHeader} 출장마사지 신속 방문 시스템. 전문 테라피스트가 직접 방문하여 고품격 테라피를 선사합니다.`,
    /* 48 */ `${fullLocationHeader} 출장마사지 24시 방문 케어 완벽 정리. 코스별 시간·요금 및 간편 전화 연결 서비스를 제공합니다.`,
    /* 49 */ `${fullLocationHeader} 출장마사지 안심 이용 가이드. 100% 후불제 시스템과 정직한 제휴업체 정보로 만족도를 높여드립니다.`
  ];

  const finalTitle = titleVariants[variantIndex];
  const finalDescription = descriptionVariants[variantIndex];

  return {
    title: finalTitle,
    description: finalDescription,
    keywords: [
      `${fullLocationHeader} 출장마사지`,
      `${leadLocation} 출장 릴렉싱 마사지`,
      `${leadLocation} 출장 프리미엄 마사지`,
      `${fullLocationHeader} 방문 마사지`,
      `${fullLocationHeader} 스웨디시`,
      "후불제 출장마사지",
      "홈테라"
    ],
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      url: `https://homethera-metro.netlify.app/${region}/${encodeURIComponent(districtName)}${dongName ? `?dong=${encodeURIComponent(dongName)}` : ""}`,
      siteName: "홈테라",
      locale: "ko_KR",
      type: "website",
    },
  };
}

export default async function RegionalDetailPage({ params, searchParams }: PageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const { region, district } = resolvedParams;
  const dongName = resolvedSearchParams.dong ? decodeURIComponent(resolvedSearchParams.dong) : "";
  const districtName = decodeURIComponent(district);
  const regionName = region === "seoul" ? "서울특별시" : region === "incheon" ? "인천광역시" : "경기도";
  
  const fullTitle = dongName 
    ? `${regionName} ${districtName} (${dongName})` 
    : `${regionName} ${districtName}`;

  // 홈테라 5개 제휴업체 목록
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `${fullTitle} 출장 릴렉싱 마사지 & 홈케어 안내 - 홈테라`,
    "description": `${fullTitle} 지역 출장마사지, 방문 바디케어 및 힐링 테라피 제휴업체 정보 제공`,
    "url": `https://homethera-metro.netlify.app/${region}/${encodeURIComponent(districtName)}`,
    "telephone": "0507-1280-3360",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": districtName,
      "addressRegion": regionName,
      "addressCountry": "KR"
    }
  };

  return (
    <div className="bg-[#050505] text-gray-100 min-h-screen flex flex-col font-sans selection:bg-amber-500 selection:text-black">
      
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
              className="w-10 h-10 rounded-xl object-cover border border-amber-500/40 shadow-[0_0_12px_rgba(245,158,11,0.4)] group-hover:scale-105 transition-transform" 
            />
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-wider bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
                홈테라
              </span>
              <span className="text-[10px] text-gray-400 tracking-tighter">SEOUL · GYEONGGI · INCHEON</span>
            </div>
          </Link>
          
          <Link href="/" className="text-xs font-bold text-amber-400 bg-amber-500/10 px-3.5 py-2 rounded-xl border border-amber-500/30 hover:bg-amber-500 hover:text-black transition-all shadow-inner flex items-center gap-1">
            <span>🏠</span> 메인 홈으로
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 w-full flex-1 space-y-12">
        
        {/* 상단 지역 대표 배너 */}
        <section className="relative rounded-3xl overflow-hidden border border-amber-500/30 shadow-[0_0_40px_rgba(245,158,11,0.15)]">
          <img 
            src="/banner.jpg" 
            alt={`${fullTitle} 출장 릴렉싱 마사지 및 바디케어 안내`} 
            className="w-full h-56 md:h-72 object-cover filter brightness-[0.6]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-6 md:p-8">
            <span className="text-amber-400 text-xs font-black tracking-widest uppercase mb-1">
              {regionName.toUpperCase()} · LOCAL HEALING GUIDE
            </span>
            <h1 className="text-2xl md:text-4xl font-black text-white drop-shadow-md">
              {fullTitle} 출장 프리미엄 마사지 &amp; 홈케어 안내
            </h1>
            <p className="text-xs md:text-sm text-gray-300 mt-2 max-w-xl leading-relaxed">
              {fullTitle} 출장마사지를 찾는 고객님을 위한 24시 프라이빗 힐링 가이드입니다. 100% 안심 후불제와 맞춤 코스 요금을 확인해 보세요.
            </p>
          </div>
        </section>

        {/* 클라이언트 사이드 키워드 인젝션 영역 */}
        <ClientTextMixer locationText={fullTitle} />

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
                {/* 구 샵 / 동 샵 구조에 맞춘 링크 */}
                <Link 
                  href={`/shop/${region}/${encodeURIComponent(districtName)}${dongName ? `/${encodeURIComponent(dongName)}` : ""}/${lShop.id}`} 
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
                      className="bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-black font-black text-xs px-3.5 py-1.5 rounded-xl shadow transition-all transform active:scale-95 relative z-20"
                    >
                      전화연결
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 건강 칼럼 섹션 */}
        <section className="bg-[#0c0c0e] p-6 md:p-8 rounded-3xl border border-white/10 space-y-4">
          <h3 className="text-base md:text-lg font-bold text-amber-400 flex items-center gap-2">
            <span>🌿</span> {fullTitle} 힐링 바디케어 &amp; 스트레칭 건강 가이드
          </h3>
          <div className="text-xs text-gray-300 space-y-3 leading-relaxed">
            <p>
              현대 직장인들이 장시간 모니터를 보거나 이동 시 스마트폰을 지속적으로 사용할 경우, 승모근과 목 주변의 흉쇄유돌근이 경직되어 만성 두통이나 골반 불균형을 유발하기 쉽습니다. 주기적인 스트레칭과 전신 피로 해소 케어가 꼭 필요한 이유입니다.
            </p>
            <div className="bg-black/50 p-4 rounded-2xl border border-white/5 space-y-2">
              <h4 className="font-bold text-white text-xs">💡 나에게 맞는 테라피 프로그램 선택 기준</h4>
              <ul className="list-disc list-inside space-y-1.5 text-gray-400">
                <li><strong className="text-gray-200">건식 타이 케어:</strong> 둔근, 하체 근육, 견갑골 주위의 굳은 부위를 눌러 스트레칭 위주로 근육 긴장을 해소합니다. (60분 60,000원~)</li>
                <li><strong className="text-gray-200">천연 아로마 케어:</strong> 부드러운 오일 압을 이용해 림프 순환을 돕고 심신 안정 및 부종 완화에 탁월합니다. (60분 70,000원~)</li>
                <li><strong className="text-gray-200">감성 스웨디시 케어:</strong> 따뜻한 오일 롤링 테크닉으로 근막을 섬세하게 이완시키는 프리미엄 힐링 코스입니다. (60분 140,000원~)</li>
              </ul>
            </div>
            <p className="text-gray-400 text-[11px]">
              * 본 가이드는 {fullTitle} 주민 여러분의 건강한 피로 회복과 올바른 홈케어 정보 제공을 목적으로 작성되었습니다.
            </p>
          </div>
        </section>

        {/* 이용 방법 4단계 */}
        <section className="bg-[#0f0f12] p-6 md:p-8 rounded-3xl border border-amber-500/30 space-y-6">
          <div className="text-center">
            <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">SERVICE PROCESS</span>
            <h3 className="text-xl font-black text-white mt-1">{fullTitle} 서비스 이용 순서</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-black/60 p-4 rounded-2xl border border-white/5 text-center">
              <span className="text-xs text-amber-400 font-bold">STEP 1</span>
              <h4 className="font-bold text-white mt-1">위치 전달</h4>
              <p className="text-xs text-gray-400 mt-1">{fullTitle} 희망 장소를 알려줍니다.</p>
            </div>
            <div className="bg-black/60 p-4 rounded-2xl border border-white/5 text-center">
              <span className="text-xs text-amber-400 font-bold">STEP 2</span>
              <h4 className="font-bold text-white mt-1">시간 조율</h4>
              <p className="text-xs text-gray-400 mt-1">원하시는 방문 시간을 확인합니다.</p>
            </div>
            <div className="bg-black/60 p-4 rounded-2xl border border-white/5 text-center">
              <span className="text-xs text-amber-400 font-bold">STEP 3</span>
              <h4 className="font-bold text-white mt-1">코스 선택</h4>
              <p className="text-xs text-gray-400 mt-1">컨디션에 맞는 프로그램을 선택합니다.</p>
            </div>
            <div className="bg-black/60 p-4 rounded-2xl border border-white/5 text-center">
              <span className="text-xs text-amber-400 font-bold">STEP 4</span>
              <h4 className="font-bold text-white mt-1">케어 진행</h4>
              <p className="text-xs text-gray-400 mt-1">도착 후 100% 후불제로 이용합니다.</p>
            </div>
          </div>
        </section>

        {/* 자주 묻는 질문 (Q&A) */}
        <section className="space-y-4">
          <div className="text-center">
            <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">FAQ &amp; GUIDE</span>
            <h3 className="text-xl font-black text-white mt-1">{fullTitle} 자주 묻는 질문</h3>
          </div>
          <div className="space-y-3">
            <div className="bg-black/60 p-4 rounded-2xl border border-white/5 space-y-1.5">
              <div className="font-bold text-sm text-gray-200 flex items-center gap-2">
                <span className="text-amber-400">Q.</span> {fullTitle} 출장마사지 방문 소요 시간은 얼마나 되나요?
              </div>
              <p className="text-xs text-gray-400 pl-6 leading-relaxed">
                <span className="text-red-400 font-bold">A.</span> 주요 거점 기준 평균 20분~30분 내외로 신속한 방문이 가능합니다.
              </p>
            </div>
            <div className="bg-black/60 p-4 rounded-2xl border border-white/5 space-y-1.5">
              <div className="font-bold text-sm text-gray-200 flex items-center gap-2">
                <span className="text-amber-400">Q.</span> 예약금이나 선입금 요청이 있나요?
              </div>
              <p className="text-xs text-gray-400 pl-6 leading-relaxed">
                <span className="text-red-400 font-bold">A.</span> 홈테라 제휴업체는 100% 후불제로 운영되므로 출발 전 선입금을 절대 요구하지 않습니다.
              </p>
            </div>
          </div>
        </section>

      </main>

      {/* 푸터 영역 */}
      <footer className="bg-[#030303] border-t border-white/10 py-10 text-center text-gray-500 text-xs mt-auto">
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <div>
            <a 
              href="tel:0507-1280-3360" 
              className="inline-flex items-center gap-1.5 bg-neutral-900 hover:bg-neutral-800 text-amber-400 font-bold px-4 py-2 rounded-xl border border-amber-500/30 hover:border-amber-400 transition-all text-xs shadow-md"
            >
              <span>🤝</span> {fullTitle} 제휴 및 예약 문의 (0507-1280-3360)
            </a>
          </div>

          <p className="text-gray-400 font-bold">홈테라는 건전하고 안전한 방문 힐링 바디케어 정보 안내 플랫폼입니다.</p>
          <p className="text-[11px] text-gray-600">COPYRIGHT &copy; 2026 홈테라 ALL RIGHTS RESERVED.</p>
        </div>
      </footer>
    </div>
  );
}