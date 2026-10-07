import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "서울·경기·인천 프리미엄 출장 케어 서비스 안내 | 홈테라",
  description:
    "서울·경기·인천에서 홈테라 출장마사지를 살펴보세요. 프라이빗·스웨디시 타이 아로마 등 다양한 구성과 60·90·120분 코스의 시간·금액을 한눈에 확인할 수 있습니다.",
  keywords: [
    "출장마사지 서비스",
    "홈타이 코스",
    "아로마 테라피",
    "스웨디시 케어",
    "방문 바디케어",
    "홈테라",
  ],
  alternates: {
    canonical: "https://homethera-metro.netlify.app/services",
  },
  openGraph: {
    title: "서울·경기·인천 프리미엄 출장 케어 서비스 안내 | 홈테라",
    description:
      "서울·경기·인천에서 홈테라 출장마사지를 살펴보세요. 프라이빗·스웨디시 타이 아로마 등 다양한 구성과 60·90·120분 코스의 시간·금액을 한눈에 확인할 수 있습니다.",
    url: "https://homethera-metro.netlify.app/services",
    siteName: "홈테라",
    locale: "ko_KR",
    type: "website",
  },
};

const serviceList = [
  {
    num: "01",
    name: "타이마사지 (건식)",
    price: "60,000원부터",
    tag: "전신 스트레칭",
    desc: "전신의 경직된 근육과 피로가 누적된 관절을 시원하게 늘려주는 정통 스트레칭 중심의 건식 릴렉싱 프로그램입니다.",
    target: "평소 운동 부족이거나 뻐근한 결림을 빠르게 풀고 싶으신 분",
  },
  {
    num: "02",
    name: "아로마마사지",
    price: "70,000원부터",
    tag: "천연 오일 & 보습",
    desc: "최고급 천연 아로마 오일을 사용하여 피부 마찰 없이 부드럽게 혈액순환과 심신 안정을 돕는 릴렉싱 코스입니다.",
    target: "강한 압보다 부드러운 이완과 숙면을 원하시는 분",
  },
  {
    num: "03",
    name: "힐링마사지",
    price: "100,000원부터",
    tag: "인기 시그니처",
    desc: "건식 테라피의 시원함과 아로마의 유연한 터치감을 균형 있게 결합하여 온몸의 긴장을 사르르 녹여주는 맞춤형 힐링 코스입니다.",
    target: "전신 이완과 림프 순환을 동시에 누리고 싶으신 분",
  },
  {
    num: "04",
    name: "스페셜마사지",
    price: "110,000원부터",
    tag: "집중 풀케어",
    desc: "목, 승모근, 허리, 하체 등 피로가 집중된 특정 부위를 정밀하게 관리해 전신 활력을 되찾아주는 프리미엄 프로그램입니다.",
    target: "만성적인 특정 부위 피로감으로 깊은 관리가 필요하신 분",
  },
  {
    num: "05",
    name: "감성 스웨디시",
    price: "140,000원부터",
    tag: "최고급 VIP 케어",
    desc: "따뜻한 오일 롤링 테크닉으로 림프선을 섬세하게 순환시켜 지친 몸과 마음에 품격 있는 쉼을 선사하는 럭셔리 케어입니다.",
    target: "프라이빗한 공간에서 최고 수준의 감성 힐링을 원하시는 분",
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-[#050505] text-gray-100 min-h-screen py-10 px-4 selection:bg-amber-500 selection:text-black">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* 상단 타이틀 */}
        <div className="text-center space-y-3">
          <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">
            PREMIUM CARE SERVICE
          </span>
          <h1 className="text-3xl md:text-4xl font-black text-white">
            홈테라 코스별 서비스 안내
          </h1>
          <p className="text-xs md:text-sm text-gray-400 max-w-xl mx-auto leading-relaxed">
            고객님의 당일 컨디션과 선호하는 케어 스타일에 맞춘 최상의 1:1 방문 프로그램. 
            서울·경기·인천 전 권역 어디서든 25분 내 신속하게 찾아갑니다.
          </p>
        </div>

        {/* 서비스 특징 3단 요약 배너 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#121214] border border-amber-500/20 p-5 rounded-2xl text-center space-y-1 shadow">
            <span className="text-lg">🛡️</span>
            <h4 className="text-xs font-black text-amber-400">100% 안심 후불제</h4>
            <p className="text-[11px] text-gray-400">도착 전 선입금 요구 0원</p>
          </div>
          <div className="bg-[#121214] border border-amber-500/20 p-5 rounded-2xl text-center space-y-1 shadow">
            <span className="text-lg">⏱️</span>
            <h4 className="text-xs font-black text-amber-400">25분 내외 빠른 방문</h4>
            <p className="text-[11px] text-gray-400">수도권 전지역 거점 배치</p>
          </div>
          <div className="bg-[#121214] border border-amber-500/20 p-5 rounded-2xl text-center space-y-1 shadow">
            <span className="text-lg">✨</span>
            <h4 className="text-xs font-black text-amber-400">베테랑 테라피스트</h4>
            <p className="text-[11px] text-gray-400">철저한 위생 &amp; 검증된 실력</p>
          </div>
        </div>

        {/* 5대 코스 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {serviceList.map((srv, idx) => (
            <div
              key={idx}
              className="bg-[#121214] border border-white/10 hover:border-amber-500/40 p-6 rounded-3xl space-y-4 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-amber-400 text-xl font-black">{srv.num}</span>
                  <span className="text-[10px] bg-amber-500/10 text-amber-300 border border-amber-500/20 px-2 py-0.5 rounded-md font-medium">
                    {srv.tag}
                  </span>
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-white">{srv.name}</h3>
                  <span className="text-xs font-black text-amber-400">{srv.price}</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {srv.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-white/5 space-y-1">
                <span className="text-[11px] font-bold text-gray-400">추천 대상:</span>
                <p className="text-[11px] text-gray-500 leading-relaxed">{srv.target}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 예약 바로가기 박스 */}
        <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30 p-6 rounded-3xl text-center space-y-4">
          <h3 className="text-lg font-black text-white">
            원하시는 코스를 정하셨나요?
          </h3>
          <p className="text-xs text-gray-400">
            시간과 코스를 선택하신 뒤 전화로 문의하시면 가장 가까운 전문 관리사를 빠르게 매칭해 드립니다.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/prices"
              className="bg-amber-500 hover:bg-amber-400 text-black text-xs font-black px-5 py-2.5 rounded-xl transition-all shadow"
            >
              상세 요금표 확인하기
            </Link>
            <a
              href="tel:0507-1280-3360"
              className="bg-neutral-900 hover:bg-neutral-800 text-white border border-white/10 text-xs font-bold px-5 py-2.5 rounded-xl transition-all"
            >
              📞 24시 전화 바로 예약
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}