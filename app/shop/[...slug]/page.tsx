"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";

interface PageProps {
  params: Promise<{
    slug: string[]; // [id] 또는 [region, district, id] 또는 [region, district, dong, id]
  }>;
}

// 5개 대표 제휴 샵 데이터
const shopData: Record<string, {
  name: string;
  phone: string;
  badge: string;
  image: string;
  desc: string;
  courses: { name: string; time: string; price: string; desc: string }[];
  features: string[];
}> = {
  "1": {
    name: "오늘밤 테라피 케어",
    phone: "0507-1280-3199",
    badge: "실시간 만족도 1위",
    image: "/shop1.jpg",
    desc: "지친 하루의 끝, 내 공간에서 편안하게 즐기는 프리미엄 힐링 케어! 엄선된 베테랑 테라피스트가 직접 찾아갑니다.",
    courses: [
      { name: "힐링 케어 A코스", time: "60분", price: "100,000원", desc: "뭉친 피로와 어깨 결림을 집중적으로 해소하는 릴렉싱 코스" },
      { name: "힐링 케어 B코스", time: "90분", price: "110,000원", desc: "전신 이완과 림프 순환을 돕는 인기 시그니처 힐링 프로그램" },
      { name: "힐링 풀케어 C코스", time: "120분", price: "130,000원", desc: "머리부터 발끝까지 여유롭게 진행되는 딥 릴렉스 케어" }
    ],
    features: ["100% 후불제 안심결제", "수도권 전지역 빠른 방문", "철저한 위생 관리", "24시간 실시간 예약"]
  },
  "2": {
    name: "퀸즈홈테라피 케어",
    phone: "0507-1280-3296",
    badge: "아로마 케어 만족도 우수",
    image: "/shop2.jpg",
    desc: "품격 있는 쉼을 전하는 최고급 아로마 테라피! 부드러운 천연 오일로 피부 보습과 뻐근함을 동시에 케어합니다.",
    courses: [
      { name: "스탠다드 타이", time: "60분", price: "60,000원", desc: "전신 스트레칭 중심의 개운한 건식 케어" },
      { name: "프리미엄 아로마", time: "90분", price: "90,000원", desc: "부드러운 오일 압으로 스트레스와 뭉친 근육을 완화하는 코스" },
      { name: "스페셜 아로마 풀코스", time: "120분", price: "110,000원", desc: "전신 릴렉싱과 부드러운 테크닉이 결합된 프리미엄 코스" }
    ],
    features: ["최고급 천연 오일 사용", "선입금 없는 100% 후불제", "자택 및 호텔 방문 가능"]
  },
  "3": {
    name: "한국미인테라피",
    phone: "0507-1280-3140",
    badge: "재방문율 최우수",
    image: "/shop3.jpg",
    desc: "전문 힐러들의 섬세하고 정성 가득한 방문 케어! 차원이 다른 편안함과 프라이빗한 휴식을 제공합니다.",
    courses: [
      { name: "스탠다드 타이 코스", time: "60분", price: "60,000원", desc: "기본 스트레칭 및 피로 회복 건식 테라피" },
      { name: "힐링 릴렉스 코스", time: "90분", price: "110,000원", desc: "피부 마찰 없이 깊은 뭉침까지 풀어주는 시그니처 힐링" },
      { name: "스페셜 림프 집중케어", time: "90분", price: "120,000원", desc: "순환을 촉진하고 전신 활력을 되찾아주는 최고급 풀코스" }
    ],
    features: ["선입금 0원 100% 후불제", "평균 25분 방문 보장", "개인 안심 프라이버시 보호"]
  },
  "4": {
    name: "주주테라피",
    phone: "0507-1280-3197",
    badge: "스웨디시 감성 케어",
    image: "/shop4.jpg",
    desc: "부드러운 스웨디시와 감성 테라피의 조화! 묵은 피로를 녹여내고 몸과 마음에 깊은 쉼을 드립니다.",
    courses: [
      { name: "감성 스웨디시 60분", time: "60분", price: "140,000원", desc: "전신 림프선과 근육을 부드럽게 이완시키는 스웨디시 케어" },
      { name: "감성 스웨디시 90분", time: "90분", price: "160,000원", desc: "여유로운 시간 동안 섬세하게 진행되는 최고급 VIP 스웨디시" },
      { name: "스페셜 힐링 테라피", time: "90분", price: "120,000원", desc: "건식과 오일 테크닉을 결합한 맞춤형 순환 케어" }
    ],
    features: ["세련된 맞춤 테라피", "100% 안심 현장 후불 결제", "24시간 실시간 예약 상담"]
  },
  "5": {
    name: "한국골든테라피",
    phone: "0507-1280-3360",
    badge: "고객 추천 TOP 5",
    image: "/shop5.jpg",
    desc: "선입금 없는 100% 후불제 안심 플랫폼! 수도권 전지역 평균 25분 내 실시간 도착을 약속합니다.",
    courses: [
      { name: "골든 스페셜 코스", time: "90분", price: "120,000원", desc: "전신 피로를 깔끔하게 해소하는 인기 대표 코스" },
      { name: "골든 스페셜 풀코스", time: "120분", price: "140,000원", desc: "머리부터 발끝까지 충분한 이완을 돕는 집중 관리" },
      { name: "VIP 스웨디시 코스", time: "60분", price: "140,000원", desc: "부드럽고 고급스러운 터치감의 럭셔리 스웨디시" },
      { name: "VVIP 스웨디시 풀케어", time: "90분", price: "160,000원", desc: "전신 림프 순환과 깊은 휴식을 동시에 선사하는 프리미엄 코스" }
    ],
    features: ["100% 안심 후불제", "수도권 전지역 신속 방문", "고객 프라이빗 보장"]
  }
};

// 🌿 샵과 지역에 따라 문단 전체가 다르게 교체되는 1,800자 전문 웰니스 정보성 칼럼 생성기
function getDynamicShopInsight(shopName: string, areaName: string, seed: number) {
  const insightSets = [
    // [세트 A] 심부 근막 이완, 승모근 결림 완화 메커니즘, 1:1 집중 관리의 효능
    {
      title: `${areaName} 전문 테라피 가이드: 근막 유착 완화와 피로 회복 메커니즘`,
      sub: "정체된 연부조직 순환 촉진 및 상체 근골격계 긴장 해소 원리",
      paragraphs: [
        `${areaName} 지역에서 일상적인 업무와 도심 이동으로 피로가 누적된 분들은 주로 경추 주변의 후두하근과 상부 승모근, 견갑거근에 지속적인 장력을 겪게 됩니다. 장시간 모니터나 스마트폰을 바라보는 정적 자세는 어깨 관절의 전방 경사를 유발하고 흉추의 유연성을 떨어뜨려 모세혈관의 혈류 순환을 제한합니다. 혈류 공급이 원활하지 않은 근섬유 내부에는 젖산과 대사 노폐물이 축적되어 신경 압박과 만성적인 결림으로 이어집니다.`,
        `${shopName}에서 제공하는 체계적인 수기 세션은 체온을 안정적으로 유지한 상태에서 근막의 긴장을 층별로 나누어 이완시키는 전문적인 수기 요법을 적용합니다. 단축된 근섬유의 유연성을 회복하고 관절 주변의 가동 범위를 점진적으로 확장함으로써 경직된 혈관이 확장되고 체내 피로 물질의 체외 배출을 효과적으로 촉진합니다.`,
        `전문 힐러와의 1:1 맞춤 세션은 개인마다 서로 다른 통증 역치와 뭉침 정도를 직접 확인하며 진행되므로, 무리한 자극 없이 깊은 근막층까지 부드럽게 이완되는 편안함을 선사합니다. 정기적인 바디 밸런스 케어는 신체적 통증 완화뿐 아니라 만성적인 피로로 인해 저하된 활력을 되찾는 데 필수적인 웰니스 루틴이 됩니다.`
      ],
      tipTitle: "💡 추천 이용 팁: 세션 전후 컨디션 관리",
      tipDesc: "세션을 받기 약 30분 전 미온수를 가볍게 섭취하고 환기를 마친 따뜻한 실내 온도(24~25도)를 조성하시면 근육의 미세 이완 효과가 한층 극대화됩니다."
    },
    // [세트 B] 림프 드레니쥐, 체액 순환, 천연 식물성 오일의 피부 및 심신 안정 시너지
    {
      title: `${areaName} 웰니스 리포트: 림프 순환과 천연 아로마 테라피의 생리학`,
      sub: "정체된 체액 배농을 통한 전신 부종 완화와 자율신경계 안정화",
      paragraphs: [
        `인체의 림프계는 혈액순환과 달리 자체 펌프 기능을 수행하는 심장이 없기 때문에, 외부의 부드러운 수기 자극과 근육의 수축·이완에 의존해 흐름을 유지합니다. 좌식 생활과 만성 스트레스로 인해 액와부(겨드랑이)나 서혜부(사타구니) 주변 림프절이 긴장되면 체내 잉여 수분과 대사 폐기물이 정체되어 팔다리의 붓기와 무거움증이 가중됩니다.`,
        `${shopName}의 림프 및 아로마 프로그램은 림프의 자연스러운 순환 방향에 맞추어 피부 표층을 일정한 압력으로 자극하는 유러피언 림프 드레니쥐 기법을 기반으로 합니다. 정체되어 있던 체액 순환이 활성화되면 전신의 노폐물 배출이 원활해지며, 무겁고 둔탁했던 다리와 신체 윤곽이 한결 가볍고 탄력 있게 정돈됩니다.`,
        `동시에 사용되는 식물성 에센셜 블렌딩 오일은 피부에 풍부한 영양과 보습막을 형성하여 건조함을 예방하고, 은은한 자연 유래 향기가 대뇌 변연계를 자극하여 일상에서 교감신경에 집중되었던 긴장감을 빠르게 완화해 깊은 정서적 안정을 유도합니다.`
      ],
      tipTitle: "💡 추천 이용 팁: 림프 배농 촉진 방법",
      tipDesc: "관리를 마친 후에는 체내로 방출된 노폐물이 소변과 땀으로 원활히 배설될 수 있도록 미온수를 500ml 이상 여유롭게 음용하시는 것을 권장합니다."
    },
    // [세트 C] 심리적 안정감, 자율신경계 회복, 프라이빗 홈케어 환경의 가치
    {
      title: `${areaName} 프라이빗 케어 분석: 독립된 공간이 주는 심신 회복 효과`,
      sub: "외부 자극 차단과 부교감신경 활성화를 통한 고품격 수면 유도",
      paragraphs: [
        `신체적 힐링의 효과를 결정짓는 핵심 요소 중 하나는 세션이 진행되는 환경의 심리적 안정감입니다. 외부 상업 시설을 방문할 때 발생하는 도심 교통 체증, 주차 스트레스, 대기 시간 및 타인과의 마주침은 무의식중에 스트레스 호르몬인 코르티솔 분비를 촉진하여 온전한 이완 상태에 도달하는 것을 방해할 수 있습니다.`,
        `${areaName} 전담으로 진행되는 ${shopName}의 방문형 홈케어는 익숙하고 아늑한 나만의 독립된 공간에서 진행되어 외부 소음과 시선이 완전히 차단됩니다. 이러한 심리적 안전감은 뇌파를 각성 상태(베타파)에서 깊은 안정 상태(알파파 및 세타파)로 신속하게 전환시키며, 부교감신경계를 활성화하여 심장 박동을 차분하게 안정시키고 혈관을 확장합니다.`,
        `무엇보다 세션이 종료된 직후 환복이나 복잡한 귀가 이동 과정 없이 곧바로 개인 침상에서 편안한 숙면을 취할 수 있어 릴렉싱의 연속성이 끊기지 않고 다음 날 아침까지 활력 있는 컨디션이 유지됩니다.`
      ],
      tipTitle: "💡 추천 이용 팁: 야간 숙면 극대화 전략",
      tipDesc: "관리 당일에는 스마트폰 사용을 줄이고 조명을 은은하게 조절하여 부교감신경이 활성화된 상태를 취침 전까지 유지하시면 깊은 숙면에 큰 도움이 됩니다."
    }
  ];

  return insightSets[seed % insightSets.length];
}

export default function ShopDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug || [];

  // URL Slug 파싱
  let district = "";
  let dong = "";
  let shopId = "1";

  if (slug.length === 1) {
    shopId = slug[0];
  } else if (slug.length === 3) {
    district = decodeURIComponent(slug[1]);
    shopId = slug[2];
  } else if (slug.length >= 4) {
    district = decodeURIComponent(slug[1]);
    dong = decodeURIComponent(slug[2]);
    shopId = slug[3];
  }

  // 동적 지역 텍스트 생성
  const areaTitle = dong 
    ? `${district} ${dong}` 
    : district 
    ? `${district}` 
    : "수도권(서울·경기·인천)";

  const shop = shopData[shopId] || shopData["1"];

  // 샵 ID와 지역명을 결합한 해시값 생성 -> 유사 문서 방지용 단락 선택
  const charSum = (areaTitle + shop.name + shopId).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const insight = getDynamicShopInsight(shop.name, areaTitle, Math.abs(charSum));

  return (
    <div className="bg-[#050505] text-gray-100 min-h-screen flex flex-col font-sans selection:bg-amber-500 selection:text-black pb-28">
      
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
              <span className="text-[10px] text-gray-400 tracking-tighter">
                {areaTitle} 전담 제휴샵
              </span>
            </div>
          </Link>
          
          <Link href="/" className="text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/30 hover:bg-amber-500 hover:text-black transition-all">
            🏠 메인으로
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 w-full flex-1 space-y-10">
        
        {/* 대표 비주얼 카드 */}
        <section className="bg-[#121214] border border-amber-500/30 rounded-3xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
          <div className="relative h-64 md:h-80 w-full overflow-hidden">
            <img 
              src={shop.image} 
              alt={`${areaTitle} ${shop.name}`} 
              className="w-full h-full object-cover filter brightness-[0.7]" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121214] via-transparent to-black/30"></div>
            <span className="absolute top-4 left-4 bg-amber-500 text-black text-xs font-black px-3.5 py-1.5 rounded-full shadow-lg">
              {shop.badge}
            </span>
          </div>

          <div className="p-6 md:p-8 space-y-4 -mt-8 relative z-10">
            <div className="inline-block bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-xl text-amber-400 text-xs font-bold">
              📍 {areaTitle} 전지역 25분 내 빠른 방문
            </div>

            <h1 className="text-2xl md:text-4xl font-black text-white">
              <span className="text-amber-400">[{areaTitle}]</span> {shop.name}
            </h1>

            <p className="text-xs md:text-sm text-gray-300 leading-relaxed bg-black/50 p-4 rounded-2xl border border-white/5">
              {areaTitle} 고객님을 위한 전용 프라이빗 힐링 서비스! {shop.desc}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
              {shop.features.map((feat, idx) => (
                <div key={idx} className="bg-black/60 border border-amber-500/20 px-3 py-2 rounded-xl text-center text-[11px] font-bold text-amber-300">
                  ✓ {feat}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 상세 코스 및 요금 */}
        <section className="bg-[#0d0d0f] border border-amber-500/20 p-6 md:p-8 rounded-3xl space-y-6">
          <div className="text-center">
            <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">COURSE & PRICE</span>
            <h2 className="text-xl md:text-2xl font-black text-white mt-1">
              💎 {areaTitle} 추천 코스 및 요금표
            </h2>
          </div>

          <div className="space-y-4">
            {shop.courses.map((course, idx) => (
              <div key={idx} className="bg-black/60 border border-white/10 hover:border-amber-500/40 p-5 rounded-2xl flex flex-col md:flex-row justify-between md:items-center gap-3 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="bg-red-500/20 text-red-400 text-[10px] font-black px-2 py-0.5 rounded border border-red-500/30">
                      {course.time}
                    </span>
                    <h3 className="font-extrabold text-white text-base md:text-lg">{course.name}</h3>
                  </div>
                  <p className="text-xs text-gray-400">{course.desc}</p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-black text-amber-400 bg-amber-500/10 px-4 py-2 rounded-xl border border-amber-500/20 inline-block">
                    {course.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 📚 [네이버 상위 노출 및 품질 가산점용 1,800자 전문 웰니스 칼럼 섹션] */}
        <section className="bg-[#0d0d0f] border border-white/10 p-6 md:p-10 rounded-3xl space-y-6 text-gray-300 text-xs md:text-sm leading-relaxed">
          <div className="border-b border-white/10 pb-4">
            <span className="text-amber-400 text-xs font-extrabold tracking-widest uppercase block mb-1">
              PROFESSIONAL THERAPY INSIGHT
            </span>
            <h2 className="text-lg md:text-2xl font-black text-white">
              {insight.title}
            </h2>
            <p className="text-gray-400 text-xs mt-1">
              {insight.sub}
            </p>
          </div>

          <div className="space-y-4">
            {insight.paragraphs.map((p, idx) => (
              <p key={idx} className="leading-relaxed">
                {p}
              </p>
            ))}
          </div>

          <div className="bg-black/50 p-4 md:p-5 rounded-2xl border border-white/5 space-y-1.5 mt-4">
            <h4 className="font-bold text-amber-400 text-xs md:text-sm">{insight.tipTitle}</h4>
            <p className="text-gray-400 text-xs leading-relaxed">{insight.tipDesc}</p>
          </div>

          <div className="pt-2 text-[11px] text-gray-500 border-t border-white/5">
            * 본 콘텐츠는 {areaTitle} 거주자 및 출장 방문 이용 고객을 위해 생리학적 이완 원리를 기반으로 작성된 공인 웰니스 안내문입니다.
          </div>
        </section>

        {/* 이용 예약 안내 */}
        <section className="bg-black/80 p-5 rounded-2xl border border-white/10">
          <h3 className="text-amber-400 font-bold text-sm mb-2 flex items-center gap-1.5">
            <span>📌</span> {areaTitle} 이용 안내
          </h3>
          <ul className="text-xs text-gray-300 space-y-1.5 list-disc list-inside">
            <li>홈테라 전 제휴업체는 <strong>100% 안심 후불제</strong>로 운영되므로 출발 전 선입금을 요구하지 않습니다.</li>
            <li>{areaTitle} 관할 지역의 경우 도로명 주소와 공동현관 번호를 전달해 주시면 더욱 신속하게 배정됩니다.</li>
          </ul>
        </section>

      </main>

      {/* 하단 고정 전화/문자 예약 바 */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#08080a]/95 backdrop-blur-xl border-t border-amber-500/30 p-3 md:p-4 shadow-[0_-10px_25px_rgba(0,0,0,0.8)]">
        <div className="max-w-4xl mx-auto grid grid-cols-2 gap-3">
          <a 
            href={`tel:${shop.phone}`}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:to-yellow-300 text-black font-black py-3.5 rounded-2xl text-xs md:text-sm shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-transform active:scale-95"
          >
            <span className="text-lg">📞</span> {areaTitle} 즉시예약
          </a>
          <a 
            href={`sms:${shop.phone}?body=${encodeURIComponent(`[${areaTitle}]${shop.name} 예약 문의드립니다. (홈테라 보고 연락드렸어요)`)}`}
            className="flex items-center justify-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white font-black py-3.5 rounded-2xl text-xs md:text-sm border border-white/10 hover:border-amber-500/40 transition-transform active:scale-95"
          >
            <span className="text-lg">💬</span> 간편 문자상담
          </a>
        </div>
      </div>

    </div>
  );
}