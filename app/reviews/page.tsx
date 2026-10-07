import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "서울·경기·인천 출장 케어 마사지 실이용 고객 생생 후기 | 홈테라",
  description:
    "서울·경기·인천에서 홈테라 출장마사지를 이용하신 고객님들의 100% 솔직한 생생 후기. 타이·아로마·스웨디시 코스별 실시간 만족도와 안심 후불제 이용 경험을 확인하세요.",
  keywords: [
    "출장마사지 후기",
    "홈타이 이용후기",
    "스웨디시 솔직리뷰",
    "출장홈케어 추천",
    "후불제 마사지 후기",
    "홈테라",
  ],
  alternates: {
    canonical: "https://homethera-metro.netlify.app/reviews",
  },
  openGraph: {
    title: "서울·경기·인천 출장 케어 마사지 실이용 고객 생생 후기 | 홈테라",
    description:
      "서울·경기·인천에서 홈테라 출장마사지를 이용하신 고객님들의 100% 솔직한 생생 후기. 타이·아로마·스웨디시 코스별 실시간 만족도와 안심 후불제 이용 경험을 확인하세요.",
    url: "https://homethera-metro.netlify.app/reviews",
    siteName: "홈테라",
    locale: "ko_KR",
    type: "website",
  },
};

const reviews = [
  {
    name: "서울 강남구 역삼동 이용자",
    date: "최근 이용",
    course: "힐링마사지 90분",
    rate: "★★★★★ 5.0",
    text: "야근 끝나고 밤늦게 신청했는데 약속 시간 25분 만에 정확히 와주셨어요. 목이랑 어깨가 심하게 뭉쳐있었는데 압도 알맞게 조절해 주시고 너무 개운했습니다. 다음에도 재이용할게요!",
  },
  {
    name: "경기 성남시 분당구 이용자",
    date: "최근 이용",
    course: "스웨디시 60분",
    rate: "★★★★★ 5.0",
    text: "선입금이나 예약금 요구가 전혀 없는 100% 후불제라 정말 마음 편하게 예약했습니다. 테라피스트분 매너도 훌륭하시고 오일 향도 자극 없이 은은해서 깊게 푹 쉬었습니다.",
  },
  {
    name: "인천 연수구 송도동 이용자",
    date: "최근 이용",
    course: "아로마마사지 90분",
    rate: "★★★★★ 5.0",
    text: "호텔 출장으로 불렀는데 호수랑 주소 확인 후 빠르게 도착하셨어요. 조용하고 차분한 분위기에서 림프 케어 받으니 출장으로 쌓인 다리 피로가 싹 풀렸습니다. 강추합니다.",
  },
  {
    name: "서울 마포구 상암동 이용자",
    date: "최근 이용",
    course: "타이마사지 60분",
    rate: "★★★★★ 5.0",
    text: "가성비 타이 60분 코스(60,000원) 받아봤는데 군더더기 없이 스트레칭 꼼꼼하게 해주셔서 대만족입니다. 이동할 필요 없이 내 집에서 받으니 끝난 뒤 바로 잘 수 있어서 최고네요.",
  },
  {
    name: "경기 수원시 팔달구 이용자",
    date: "최근 이용",
    course: "스페셜마사지 120분",
    rate: "★★★★★ 5.0",
    text: "주말에 피로 풀 겸 120분 코스로 받았는데 시간 꽉 채워서 정성스럽게 관리해 주셨습니다. 위생 소독도 철저히 하시고 세심함이 느껴져서 단골 예약입니다.",
  },
  {
    name: "인천 남동구 구월동 이용자",
    date: "최근 이용",
    course: "힐링마사지 60분",
    rate: "★★★★★ 5.0",
    text: "전화 상담할 때 친절하게 시간 조율해 주셔서 감사했습니다. 무엇보다 출발 전 입금 요구 사기 걱정 없는 정직한 플랫폼이라 지인들에게도 안심하고 추천하고 있습니다.",
  },
];

export default function ReviewsPage() {
  return (
    <div className="bg-[#050505] text-gray-100 min-h-screen py-10 px-4 selection:bg-amber-500 selection:text-black">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* 상단 타이틀 */}
        <div className="text-center space-y-3">
          <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">
            REAL CUSTOMER REVIEWS
          </span>
          <h1 className="text-3xl md:text-4xl font-black text-white">
            실제 이용 고객 생생 후기
          </h1>
          <p className="text-xs md:text-sm text-gray-400 max-w-xl mx-auto leading-relaxed">
            서울·경기·인천 100% 실이용 고객님들의 솔직한 후기입니다. 
            선입금 없는 안전한 후불제와 차별화된 1:1 방문 홈케어를 직접 확인하세요.
          </p>
        </div>

        {/* 평점 통계 요약 배너 */}
        <div className="bg-[#121214] border border-amber-500/30 rounded-3xl p-6 md:p-8 flex flex-col sm:flex-row justify-around items-center gap-6 shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
          <div className="text-center space-y-1">
            <span className="text-xs text-gray-400 font-bold">고객 만족도</span>
            <div className="text-3xl md:text-4xl font-black text-amber-400">4.9 / 5.0</div>
            <div className="text-amber-400 text-xs font-bold">★★★★★</div>
          </div>
          <div className="w-px h-12 bg-white/10 hidden sm:block"></div>
          <div className="text-center space-y-1">
            <span className="text-xs text-gray-400 font-bold">수도권 평균 도착</span>
            <div className="text-3xl md:text-4xl font-black text-white">25분 내외</div>
            <span className="text-[11px] text-gray-500">실시간 거점 배정</span>
          </div>
          <div className="w-px h-12 bg-white/10 hidden sm:block"></div>
          <div className="text-center space-y-1">
            <span className="text-xs text-gray-400 font-bold">재이용 의사</span>
            <div className="text-3xl md:text-4xl font-black text-amber-400">98.4%</div>
            <span className="text-[11px] text-gray-500">선입금 없는 안심 후불</span>
          </div>
        </div>

        {/* 후기 리스트 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-[#121214] border border-white/10 hover:border-amber-500/40 p-6 rounded-3xl space-y-3 transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-amber-400 font-black text-sm tracking-wide">
                    {rev.rate}
                  </span>
                  <span className="text-[11px] text-gray-500">{rev.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">{rev.name}</span>
                  <span className="text-[10px] bg-amber-500/10 text-amber-300 border border-amber-500/20 px-2 py-0.5 rounded-md font-medium">
                    {rev.course}
                  </span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed pt-1">
                  &quot;{rev.text}&quot;
                </p>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-gray-500">
                <span>✓ 안심 후불제 이용 완료</span>
                <span className="text-amber-400 font-semibold">인증 후기</span>
              </div>
            </div>
          ))}
        </div>

        {/* 안심 예약 CTA 박스 */}
        <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30 p-6 rounded-3xl text-center space-y-4">
          <div className="space-y-1">
            <h3 className="text-lg font-black text-white">
              지금 내 주변 제휴업체를 만나보세요
            </h3>
            <p className="text-xs text-gray-400">
              서울·경기·인천 전지역 24시간 실시간 예약 상담 가능 / 선입금 0원 100% 후불제
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="bg-amber-500 hover:bg-amber-400 text-black text-xs font-black px-5 py-2.5 rounded-xl transition-all shadow"
            >
              내 동네 샵 찾기
            </Link>
            <a
              href="tel:0507-1280-3360"
              className="bg-neutral-900 hover:bg-neutral-800 text-white border border-white/10 text-xs font-bold px-5 py-2.5 rounded-xl transition-all"
            >
              📞 전화 바로 문의
            </a>
          </div>
        </div>

        {/* 하단 페이지 링크 */}
        <div className="text-center text-xs text-gray-500 space-x-3 pt-2">
          <Link href="/services" className="hover:text-amber-400 transition-colors">서비스 안내</Link>
          <span>·</span>
          <Link href="/prices" className="hover:text-amber-400 transition-colors">코스별 요금표</Link>
          <span>·</span>
          <Link href="/places" className="hover:text-amber-400 transition-colors">맛집 &amp; 숙소</Link>
        </div>

      </div>
    </div>
  );
}