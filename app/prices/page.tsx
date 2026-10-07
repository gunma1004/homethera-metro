import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "서울·경기·인천 출장 케어 코스별 투명 가격표 | 홈테라",
  description:
    "서울·경기·인천에서 홈테라 출장마사지를 살펴보세요. 프라이빗·스웨디시 타이 아로마 등 다양한 구성과 60·90·120분 코스의 시간·금액을 한눈에 확인할 수 있습니다.",
  keywords: [
    "출장마사지 가격",
    "홈타이 가격표",
    "스웨디시 요금",
    "아로마마사지 비용",
    "후불제 홈케어",
    "홈테라",
  ],
  alternates: {
    canonical: "https://homethera-metro.netlify.app/prices",
  },
  openGraph: {
    title: "서울·경기·인천 출장 케어 코스별 투명 가격표 | 홈테라",
    description:
      "서울·경기·인천에서 홈테라 출장마사지를 살펴보세요. 프라이빗·스웨디시 타이 아로마 등 다양한 구성과 60·90·120분 코스의 시간·금액을 한눈에 확인할 수 있습니다.",
    url: "https://homethera-metro.netlify.app/prices",
    siteName: "홈테라",
    locale: "ko_KR",
    type: "website",
  },
};

const fullPriceTable = [
  {
    course: "타이마사지",
    badge: "기본 건식",
    desc: "전신 스트레칭과 경직된 뭉침을 시원하게 풀어주는 기본 스트레칭 케어",
    prices: { m60: "60,000원", m90: "80,000원", m120: "100,000원" },
  },
  {
    course: "아로마마사지",
    badge: "피부 보습 & 릴렉싱",
    desc: "천연 아로마 오일의 부드러운 터치감으로 림프 순환과 부종 완화를 돕는 힐링 케어",
    prices: { m60: "70,000원", m90: "90,000원", m120: "110,000원" },
  },
  {
    course: "힐링마사지",
    badge: "시그니처 추천",
    desc: "건식 테라피와 부드러운 오일 케어의 장점을 결합한 1:1 맞춤 피로회복 코스",
    prices: { m60: "100,000원", m90: "110,000원", m120: "130,000원" },
  },
  {
    course: "스페셜마사지",
    badge: "집중 관리 풀케어",
    desc: "목, 승모근, 하체 등 피로 집중 부위를 깊이 있게 케어하는 VIP 프로그램",
    prices: { m60: "110,000원", m90: "120,000원", m120: "140,000원" },
  },
  {
    course: "스웨디시",
    badge: "감성 림프 테라피",
    desc: "따뜻한 프리미엄 오일로 림프선을 부드럽게 이완시키는 최고급 프라이빗 감성 케어",
    prices: { m60: "140,000원", m90: "160,000원", m120: "—" },
  },
];

export default function PricesPage() {
  return (
    <div className="bg-[#050505] text-gray-100 min-h-screen py-10 px-4 selection:bg-amber-500 selection:text-black">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* 상단 타이틀 */}
        <div className="text-center space-y-3">
          <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">
            COURSE &amp; PRICE GUIDE
          </span>
          <h1 className="text-3xl md:text-4xl font-black text-white">
            홈테라 표준 기준 요금표
          </h1>
          <p className="text-xs md:text-sm text-gray-400 max-w-xl mx-auto leading-relaxed">
            서울·경기·인천 100% 안심 후불제! 추가금 없는 정직한 코스별 시간 및 금액을 확인하세요.
          </p>
        </div>

        {/* 후불제 안심 배너 */}
        <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30 p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-xs text-amber-400 font-bold">🛡️ 선입금 0원 100% 후불 보장</span>
            <p className="text-xs text-gray-300">
              홈테라 제휴업체는 출발 전 예약금이나 보증금을 일절 요구하지 않습니다. 관리사 도착 후 결제하세요.
            </p>
          </div>
          <a
            href="tel:0507-1280-3360"
            className="shrink-0 bg-amber-500 hover:bg-amber-400 text-black text-xs font-black px-4 py-2 rounded-xl transition-all shadow"
          >
            📞 빠른 예약 문의
          </a>
        </div>

        {/* 종합 코스 요금표 테이블 */}
        <div className="bg-[#121214] border border-amber-500/30 rounded-3xl p-6 md:p-8 space-y-6 shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
          <div className="flex justify-between items-center border-b border-white/10 pb-4">
            <h2 className="text-lg font-black text-white">전체 코스별 시간·금액표</h2>
            <span className="text-[11px] text-gray-400">수도권 전지역 동일 기준</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-center text-xs md:text-sm border-collapse min-w-[500px]">
              <thead>
                <tr className="border-b border-white/10 text-gray-400">
                  <th className="py-3 px-3 text-left">코스명</th>
                  <th className="py-3 px-3">60분</th>
                  <th className="py-3 px-3">90분</th>
                  <th className="py-3 px-3">120분</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-gray-200">
                {fullPriceTable.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-3 text-left">
                      <div className="font-bold text-white flex items-center gap-2">
                        <span>{row.course}</span>
                        <span className="text-[10px] text-amber-400 font-normal bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                          {row.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-400 mt-0.5 line-clamp-1">{row.desc}</p>
                    </td>
                    <td className="py-4 px-3 text-amber-400 font-black">{row.prices.m60}</td>
                    <td className="py-4 px-3 text-amber-400 font-black">{row.prices.m90}</td>
                    <td className="py-4 px-3 text-amber-400 font-black">
                      {row.prices.m120 === "—" ? <span className="text-gray-600">—</span> : row.prices.m120}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 코스별 상세 설명 카드 */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-gray-300 pl-1">💡 나에게 맞는 프로그램 추천</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#101012] border border-white/10 p-5 rounded-2xl space-y-2">
              <span className="text-xs font-bold text-amber-400">몸이 뻐근하고 결릴 때</span>
              <h4 className="text-base font-bold text-white">타이마사지 / 힐링마사지</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                강한 압과 스트레칭으로 굳은 둔근과 척추 주변 근육을 풀고 싶으신 분들께 추천합니다. 
                60분 60,000원부터 실속 있게 시작할 수 있습니다.
              </p>
            </div>
            <div className="bg-[#101012] border border-white/10 p-5 rounded-2xl space-y-2">
              <span className="text-xs font-bold text-amber-400">스트레스와 깊은 이완이 필요할 때</span>
              <h4 className="text-base font-bold text-white">아로마마사지 / 감성 스웨디시</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                천연 오일을 바탕으로 부드러운 롤링 압을 선호하시거나 림프 순환을 원하시는 분께 적합합니다. 
                내 공간에서 소음 없이 온전한 휴식을 선사합니다.
              </p>
            </div>
          </div>
        </div>

        {/* 예약 전 주의사항 박스 */}
        <div className="bg-[#0e0e10] border border-white/5 p-6 rounded-2xl space-y-2 text-xs text-gray-400 leading-relaxed">
          <h4 className="font-bold text-gray-200 text-sm">📌 이용 및 예약 안내</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>표시된 요금은 방문 출장 기준 표준 가격표이며, 심야 할증이나 별도 선입금 요구가 없습니다.</li>
            <li>일부 외곽 이동 지역이나 주차 여건에 따라 일정이 조율될 수 있으므로 상담 시 미리 말씀해 주세요.</li>
            <li>예약 취소나 시간 변경은 테라피스트 출발 전 미리 연락 주시면 감사하겠습니다.</li>
          </ul>
        </div>

        {/* 하단 바로가기 링크 */}
        <div className="text-center pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors"
          >
            <span>📍 내 동네 제휴업체 찾으러 가기</span>
            <span>&rarr;</span>
          </Link>
        </div>

      </div>
    </div>
  );
}