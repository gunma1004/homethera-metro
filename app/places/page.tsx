import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "서울·경기·인천 맛집 및 편안한 숙소 휴식 가이드 | 홈테라",
  description:
    "서울·경기·인천에서 홈테라 출장마사지와 함께 즐기는 주변 맛집 및 호텔·숙소 안내. 프라이빗 힐링 케어 전후로 방문하기 좋은 추천 장소를 확인하세요.",
  keywords: [
    "수도권 맛집",
    "서울 호캉스",
    "경기 숙소 추천",
    "인천 호텔",
    "출장 홈케어 연계",
    "홈테라",
  ],
  alternates: {
    canonical: "https://homethera-metro.netlify.app/places",
  },
  openGraph: {
    title: "서울·경기·인천 맛집 및 편안한 숙소 휴식 가이드 | 홈테라",
    description:
      "서울·경기·인천에서 홈테라 출장마사지와 함께 즐기는 주변 맛집 및 호텔·숙소 안내. 프라이빗 힐링 케어 전후로 방문하기 좋은 추천 장소를 확인하세요.",
    url: "https://homethera-metro.netlify.app/places",
    siteName: "홈테라",
    locale: "ko_KR",
    type: "website",
  },
};

const placeList = [
  {
    category: "호텔 & 스테이",
    tag: "호캉스 힐링",
    title: "강남 & 역삼 비즈니스 부티크 호텔 라운지",
    area: "서울 강남구 테헤란로",
    desc: "바쁜 비즈니스 출장 일정 후 아늑한 프라이빗 객실에서 조용하게 휴식을 취하며 1:1 방문 홈케어를 받기 최적화된 공간입니다.",
  },
  {
    category: "미식 핫플레이스",
    tag: "든든한 보양식",
    title: "성수 & 한남 감성 다이닝 & 한우 그릴 바",
    area: "서울 성동구 / 용산구",
    desc: "지친 하루의 기력을 북돋아주는 정갈한 미식 코스. 깔끔한 식사 후 나만의 공간에서 부드러운 아로마 테라피로 하루를 마감해보세요.",
  },
  {
    category: "호텔 & 스테이",
    tag: "도심 속 쉼터",
    title: "판교 & 분당 테크노밸리 프리미엄 스테이",
    area: "경기 성남시 분당구",
    desc: "쾌적한 룸 컨디션과 조용한 방음 환경을 갖춘 숙소로, 늦은 저녁 지친 몸을 맡기고 스웨디시 힐링을 누리기에 안성맞춤입니다.",
  },
  {
    category: "오션뷰 힐링",
    tag: "도심 근교 휴식",
    title: "송도 센트럴파크 뷰 레지던스 & 호텔",
    area: "인천 연수구 송도동",
    desc: "탁 트인 야경과 함께 서해 바람을 맞으며 온전한 재충전이 가능한 거점. 프라이빗 홈케어 서비스 방문이 매우 원활한 지역입니다.",
  },
  {
    category: "미식 핫플레이스",
    tag: "편안한 야간 다이닝",
    title: "수원 인계동 & 일산 라페스타 심야 맛집 거리",
    area: "경기 수원시 / 고양시",
    desc: "늦은 시간까지 정갈한 음식을 즐길 수 있는 수도권 대표 상권. 일정 후 숙소나 자택에서 편안하게 홈테라를 이용할 수 있습니다.",
  },
  {
    category: "호텔 & 스테이",
    tag: "공항 & 출장 연계",
    title: "영종도 & 구월 비즈니스 호텔존",
    area: "인천 중구 / 남동구",
    desc: "장거리 이동이나 출장으로 누적된 피로를 풀기 좋은 조용한 스테이. 체크인 후 바로 전화 상담으로 빠른 케어 예약이 가능합니다.",
  },
];

export default function PlacesPage() {
  return (
    <div className="bg-[#050505] text-gray-100 min-h-screen py-10 px-4 selection:bg-amber-500 selection:text-black">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* 상단 타이틀 */}
        <div className="text-center space-y-3">
          <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">
            METRO HOT PLACES & STAY
          </span>
          <h1 className="text-3xl md:text-4xl font-black text-white">
            내 주변 맛집 &amp; 편안한 휴식 공간
          </h1>
          <p className="text-xs md:text-sm text-gray-400 max-w-xl mx-auto leading-relaxed">
            서울·경기·인천 주요 거점 생활권의 미식 명소와 프라이빗 스테이 정보. 
            편안한 휴식 후 홈테라 1:1 방문 케어로 하루의 피로를 완성도 있게 풀어보세요.
          </p>
        </div>

        {/* 안내 배너 박스 */}
        <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30 p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-xs text-amber-400 font-bold">💡 호텔 &amp; 숙소 이용 팁</span>
            <p className="text-xs text-gray-300">
              호텔이나 레지던스 이용 시 예약 전 객실 호수와 정확한 도로명 주소를 전달해 주시면 더욱 신속한 방문이 가능합니다.
            </p>
          </div>
          <Link
            href="/"
            className="shrink-0 bg-amber-500 hover:bg-amber-400 text-black text-xs font-black px-4 py-2 rounded-xl transition-all"
          >
            홈케어 예약하기
          </Link>
        </div>

        {/* 큐레이션 리스트 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {placeList.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#121214] border border-white/10 hover:border-amber-500/40 p-6 rounded-3xl space-y-3 transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-bold text-gray-400 bg-black/60 px-2.5 py-1 rounded-lg border border-white/5">
                    {item.category}
                  </span>
                  <span className="text-[11px] font-bold text-amber-400">
                    {item.tag}
                  </span>
                </div>
                <h2 className="text-lg font-black text-white">{item.title}</h2>
                <p className="text-xs text-gray-400 font-medium">📍 {item.area}</p>
                <p className="text-xs text-gray-300 leading-relaxed pt-1">
                  {item.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px]">
                <span className="text-gray-500">홈테라 25분 내 신속 방문 권역</span>
                <Link
                  href="/"
                  className="text-amber-400 font-bold hover:underline"
                >
                  주변 제휴샵 찾기 &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* 하단 푸터 링크 박스 */}
        <div className="bg-[#0e0e10] border border-white/5 p-6 rounded-2xl text-center space-y-3">
          <p className="text-xs text-gray-400">
            서울·경기·인천 주요 역세권 및 거점 호텔, 오피스텔 제휴 정보는 정기적으로 검증 후 업데이트됩니다.
          </p>
          <div className="flex justify-center gap-4 text-xs font-bold text-amber-400 pt-1">
            <Link href="/services" className="hover:underline">서비스 소개</Link>
            <span>·</span>
            <Link href="/prices" className="hover:underline">코스 요금표</Link>
            <span>·</span>
            <Link href="/reviews" className="hover:underline">생생 후기</Link>
          </div>
        </div>

      </div>
    </div>
  );
}