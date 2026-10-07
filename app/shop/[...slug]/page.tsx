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

export default function ShopDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug || [];

  // URL Slug 파싱
  // 1) /shop/1                  -> id: "1"
  // 2) /shop/seoul/gangnam/1    -> district: "gangnam", id: "1" (구 샵)
  // 3) /shop/seoul/gangnam/개포1동/1 -> district: "gangnam", dong: "개포1동", id: "1" (동 샵)
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

  return (
    <div className="bg-[#050505] text-gray-100 min-h-screen flex flex-col font-sans selection:bg-amber-500 selection:text-black pb-24">
      
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

      <main className="max-w-4xl mx-auto px-4 py-8 w-full flex-1 space-y-8">
        
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
            {/* 구 / 동 태그 노출 */}
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