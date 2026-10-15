import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const SITE_URL = "https://homethera-metro.netlify.app";

interface PageProps {
  params: Promise<{
    region: string;
  }>;
}

// 권역별 메타 및 텍스트 큐레이션 데이터 (네이버 제목 40자, 설명 80자 이내 엄수)
const regionContentData: Record<
  string,
  {
    name: string;
    fullName: string;
    title: string;
    desc: string;
    heroSubtitle: string;
    districts: { key: string; name: string }[];
  }
> = {
  seoul: {
    name: "서울",
    fullName: "서울특별시",
    title: "서울 출장 방문 케어 마사지 | 구별 코스 안내 - 홈테라",
    desc: "홈테라 - 선입금 없는 후불제 서울출장마사지 안내. 서울 25개 자치구 일정과 공간에 맞춰 타이·스웨디시·아로마 코스와 가격을 확인하세요.",
    heroSubtitle: "서울특별시 25개 자치구별 페이지를 살펴보고 필요한 코스와 일정을 비교하세요.",
    districts: [
      { key: "gangnam", name: "강남" }, { key: "gangdong", name: "강동" }, { key: "gangbuk", name: "강북" },
      { key: "gangseo", name: "강서" }, { key: "gwanak", name: "관악" }, { key: "gwangjin", name: "광진" },
      { key: "guro", name: "구로" }, { key: "geumcheon", name: "금천" }, { key: "nowon", name: "노원" },
      { key: "dobong", name: "도봉" }, { key: "dongdaemun", name: "동대문" }, { key: "dongjak", name: "동작" },
      { key: "mapo", name: "마포" }, { key: "seodaemun", name: "서대문" }, { key: "seocho", name: "서초" },
      { key: "seongdong", name: "성동" }, { key: "seongbuk", name: "성북" }, { key: "songpa", name: "송파" },
      { key: "yangcheon", name: "양천" }, { key: "yeongdeungpo", name: "영등포" }, { key: "yongsan", name: "용산" },
      { key: "eunpyeong", name: "은평" }, { key: "jongno", name: "종로" }, { key: "jung", name: "중구" },
      { key: "jungnang", name: "중랑" },
    ],
  },
  gyeonggi: {
    name: "경기",
    fullName: "경기도",
    title: "경기 출장 방문 케어 마사지 | 지역별 이용 가이드 - 홈테라",
    desc: "홈테라 - 선입금 없는 후불제 경기출장마사지 안내. 경기도 일정과 공간에 맞춰 5가지 코스, 정찰제 가격 선택지와 방문 준비사항을 확인하세요.",
    heroSubtitle: "경기도의 31개 시·군·구별 페이지를 살펴보고 필요한 코스와 일정을 비교하세요.",
    districts: [
      { key: "gapyeong-gun", name: "가평" }, { key: "goyang-si", name: "고양" }, { key: "gwacheon-si", name: "과천" },
      { key: "gwangmyeong-si", name: "광명" }, { key: "gwangju-si", name: "광주" }, { key: "guri-si", name: "구리" },
      { key: "gunpo-si", name: "군포" }, { key: "gimpo-si", name: "김포" }, { key: "namyangju-si", name: "남양주" },
      { key: "dongducheon-si", name: "동두천" }, { key: "bucheon-si", name: "부천" }, { key: "seongnam-si", name: "성남" },
      { key: "suwon-si", name: "수원" }, { key: "siheung-si", name: "시흥" }, { key: "ansan-si", name: "안산" },
      { key: "anseong-si", name: "안성" }, { key: "anyang-si", name: "안양" }, { key: "yangju-si", name: "양주" },
      { key: "yangpyeong-gun", name: "양평" }, { key: "yeoju-si", name: "여주" }, { key: "yeoncheon-gun", name: "연천" },
      { key: "osan-si", name: "오산" }, { key: "yongin-si", name: "용인" }, { key: "uiwang-si", name: "의왕" },
      { key: "uijeongbu-si", name: "의정부" }, { key: "icheon-si", name: "이천" }, { key: "paju-si", name: "파주" },
      { key: "pyeongtaek-si", name: "평택" }, { key: "pocheon-si", name: "포천" }, { key: "hanam-si", name: "하남" },
      { key: "hwaseong-si", name: "화성" },
    ],
  },
  incheon: {
    name: "인천",
    fullName: "인천광역시",
    title: "인천 출장 방문 케어 마사지 | 구별 코스 안내 - 홈테라",
    desc: "홈테라 - 선입금 없는 후불제 인천출장마사지 안내. 인천 전역 일정과 공간에 맞춰 타이·스웨디시·아로마 코스와 가격을 확인하세요.",
    heroSubtitle: "인천광역시 10개 군·구별 페이지를 살펴보고 필요한 코스와 일정을 비교하세요.",
    districts: [
      { key: "ganghwa-gun", name: "강화" }, { key: "gyeyang-gu", name: "계양" }, { key: "namdong-gu", name: "남동" },
      { key: "dong-gu", name: "동구" }, { key: "michuhol-gu", name: "미추홀" }, { key: "bupyeong-gu", name: "부평" },
      { key: "seo-gu", name: "서구" }, { key: "yeonsu-gu", name: "연수" }, { key: "ongjin-gun", name: "옹진" },
      { key: "jung-gu", name: "중구" },
    ],
  },
};

// 5대 방문 케어 코스 규격
const serviceCourses = [
  {
    title: "스웨디시 케어",
    desc: "지역 이동 시간을 확인한 뒤 무리 없는 예약 순서를 안내합니다. 부드러운 리듬을 중심으로 컨디션을 살피는 기본 코스입니다.",
    prices: [
      { time: "60분", price: "90,000원" },
      { time: "90분", price: "120,000원" },
      { time: "120분", price: "150,000원" },
    ],
  },
  {
    title: "아로마 릴랙스",
    desc: "복잡하게 옵션을 늘어놓기보다 필요한 시간과 코스를 먼저 정리합니다. 은은한 오일과 긴 호흡으로 긴장을 차분히 정돈합니다.",
    prices: [
      { time: "60분", price: "80,000원" },
      { time: "90분", price: "110,000원" },
      { time: "120분", price: "140,000원" },
    ],
  },
  {
    title: "타이 스트레칭",
    desc: "일정과 이동 동선을 함께 살펴 대기 시간을 최소화합니다. 가벼운 관절 이완과 전신 스트레칭을 순서대로 진행합니다.",
    prices: [
      { time: "60분", price: "70,000원" },
      { time: "90분", price: "100,000원" },
      { time: "120분", price: "130,000원" },
    ],
  },
  {
    title: "포커스 오일 케어",
    desc: "집중이 필요한 피로 부위를 먼저 확인하는 맞춤형 오일 코스입니다. 희망 부위와 피하고 싶은 부위를 사전에 조율합니다.",
    prices: [
      { time: "60분", price: "90,000원" },
      { time: "90분", price: "120,000원" },
    ],
  },
  {
    title: "딥 릴랙스",
    desc: "처음 이용하는 분도 순서를 이해하기 쉽도록 핵심만 안내합니다. 여유 있는 시간 배분으로 깊은 숙면과 휴식에 집중합니다.",
    prices: [
      { time: "60분", price: "90,000원" },
      { time: "90분", price: "130,000원" },
      { time: "120분", price: "160,000원" },
    ],
  },
];

// 네이버 Yeti 로봇 전용 메타데이터 생성
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const regionKey = resolvedParams.region?.toLowerCase();
  const info = regionContentData[regionKey];

  if (!info) return {};

  const canonicalUrl = `${SITE_URL}/${regionKey}/`;

  return {
    title: { absolute: info.title },
    description: info.desc,
    alternates: { canonical: canonicalUrl },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
      },
    },
    other: {
      // 🌟 레퍼런스의 네이버 검색로봇(Yeti) 전용 메타 태그 완벽 이식
      Yeti: "index,follow,max-image-preview:large",
    },
    openGraph: {
      type: "website",
      locale: "ko_KR",
      url: canonicalUrl,
      siteName: "홈테라",
      title: info.title,
      description: info.desc,
      images: [
        {
          url: `${SITE_URL}/banner.jpg`,
          width: 1200,
          height: 630,
          alt: `${info.name} 출장 방문 케어 마사지`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: info.title,
      description: info.desc,
      images: [`${SITE_URL}/banner.jpg`],
    },
  };
}

export default async function RegionPage({ params }: PageProps) {
  const resolvedParams = await params;
  const regionKey = resolvedParams.region?.toLowerCase();
  const info = regionContentData[regionKey];

  if (!info) {
    notFound();
  }

  const currentUrl = `${SITE_URL}/${regionKey}/`;

  // 🌟 마리 테라피 레퍼런스 스타일 정통 WebPage 스키마
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${currentUrl}#webpage`,
        name: info.title,
        url: currentUrl,
        description: info.desc,
        inLanguage: "ko-KR",
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `${SITE_URL}/banner.jpg`,
          width: 1200,
          height: 630,
        },
        isPartOf: {
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
          name: "홈테라",
          url: SITE_URL,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${currentUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "홈", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: info.name, item: currentUrl },
        ],
      },
      {
        "@type": ["HealthAndBeautyBusiness", "LocalBusiness"],
        "@id": `${currentUrl}#localbusiness`,
        name: `홈테라 ${info.name} 방문 케어`,
        url: currentUrl,
        telephone: "0507-1280-3360",
        priceRange: "70,000원~160,000원",
        currenciesAccepted: "KRW",
        paymentAccepted: "Cash, Credit Card",
        address: {
          "@type": "PostalAddress",
          addressRegion: info.fullName,
          addressCountry: "KR",
        },
        areaServed: {
          "@type": "AdministrativeArea",
          name: info.fullName,
        },
      },
    ],
  };

  return (
    <div className="bg-[#050505] text-gray-100 min-h-screen flex flex-col font-sans selection:bg-amber-500 selection:text-black">
      {/* 정형 데이터 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 상단 서브 헤더 바 */}
      <div className="bg-[#0a0a0d] border-b border-white/5 py-2 px-4 text-[11px] text-gray-400">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <span>서울·경기·인천 지역별 방문 케어 안내</span>
          <div className="flex gap-4">
            <a href="#courses" className="hover:text-amber-400">코스 안내</a>
            <a href="#guide" className="hover:text-amber-400">이용 가이드</a>
            <a href="#faq" className="hover:text-amber-400">자주 묻는 질문</a>
          </div>
        </div>
      </div>

      <main className="flex-1 space-y-14">
        {/* 브레드크럼 */}
        <div className="max-w-5xl mx-auto px-4 pt-6 text-xs text-gray-400 flex items-center gap-2">
          <Link href="/" className="hover:text-amber-400">홈</Link>
          <span>›</span>
          <span className="text-amber-400 font-bold">{info.name}</span>
        </div>

        {/* 1. 히어로 밴드 섹션 */}
        <section className="max-w-5xl mx-auto px-4 text-center space-y-3">
          <p className="text-amber-400 font-black text-xs tracking-widest uppercase">REGIONAL DIRECTORY</p>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            {info.name} 출장 방문 케어 마사지
          </h1>
          <p className="text-gray-300 text-xs md:text-sm max-w-xl mx-auto leading-relaxed">
            {info.heroSubtitle}
          </p>
        </section>

        {/* 2. 방문 케어 5대 코스 카드 그리드 (레퍼런스 구조) */}
        <section className="max-w-5xl mx-auto px-4 space-y-6">
          <div className="border-b border-white/10 pb-4">
            <h2 className="text-xl md:text-2xl font-black text-white">{info.name} 지역 테라피 안내</h2>
            <p className="text-xs text-gray-400 mt-1">
              {info.name} 일정과 공간에 맞춰 5가지 코스를 한눈에 비교하실 수 있습니다.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
            {serviceCourses.map((c, idx) => (
              <article key={idx} className="bg-[#101014] border border-amber-500/20 hover:border-amber-400 rounded-2xl p-4 flex flex-col justify-between space-y-3 transition-all">
                <div className="space-y-1.5">
                  <span className="inline-block px-2 py-0.5 rounded text-[10px] font-black bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    COURSE 0{idx + 1}
                  </span>
                  <h3 className="font-extrabold text-white text-base">{c.title}</h3>
                  <p className="text-gray-400 text-xs line-clamp-3 leading-relaxed">{c.desc}</p>
                </div>
                <div className="border-t border-white/10 pt-2 flex justify-between items-center text-xs">
                  <span className="font-bold text-amber-400">{c.prices[0].time} {c.prices[0].price}</span>
                  <span className="text-[10px] text-gray-500">정찰가</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 3. 방문 케어 한눈에 보기 3단계 가이드 */}
        <section id="guide" className="max-w-5xl mx-auto px-4">
          <div className="bg-[#121216] border border-amber-500/30 p-6 md:p-8 rounded-3xl space-y-6">
            <div>
              <h2 className="text-lg md:text-xl font-black text-white">{info.name} 방문 케어 한눈에 보기</h2>
              <p className="text-xs text-gray-400 mt-1">주소와 일정, 코스를 먼저 정리하면 상담이 짧아집니다.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-black/60 p-4 rounded-2xl border border-white/5 space-y-1">
                <b className="text-amber-400 text-xs font-black block">01 지역·시간 확인</b>
                <p className="text-xs text-gray-300">{info.name} 주소와 희망 시작 시간을 먼저 확인합니다.</p>
              </div>
              <div className="bg-black/60 p-4 rounded-2xl border border-white/5 space-y-1">
                <b className="text-amber-400 text-xs font-black block">02 코스·강도 선택</b>
                <p className="text-xs text-gray-300">5개 코스와 시간별 가격 선택지를 비교합니다.</p>
              </div>
              <div className="bg-black/60 p-4 rounded-2xl border border-white/5 space-y-1">
                <b className="text-amber-400 text-xs font-black block">03 방문 준비</b>
                <p className="text-xs text-gray-300">출입 방법과 준비 공간을 상담에서 간단히 맞춥니다.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. 세부 지역 전수 앵커 그리드 (네이버 봇 크롤링 최적화 칩) */}
        <section className="max-w-5xl mx-auto px-4 space-y-6">
          <div className="border-b border-white/10 pb-4">
            <h2 className="text-xl md:text-2xl font-black text-white">{info.name} 세부 지역 바로가기</h2>
            <p className="text-xs text-gray-400 mt-1">각 지역 카드를 선택하면 독립된 안내 페이지로 이동합니다.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {info.districts.map((d) => (
              <Link
                key={d.key}
                href={`/${regionKey}/${encodeURIComponent(d.name)}`}
                className="bg-black/70 hover:bg-amber-500 hover:text-black border border-white/10 hover:border-amber-400 p-3 rounded-xl text-xs font-extrabold flex justify-between items-center transition-all group"
              >
                <span>{d.name}</span>
                <span className="text-amber-400 group-hover:text-black text-sm">→</span>
              </Link>
            ))}
          </div>
        </section>

        {/* 5. C-Rank/D.I.A. 충족용 심층 스토리 블록 */}
        <section className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <article className="bg-[#0f0f13] border border-white/5 p-6 rounded-2xl space-y-2">
            <h2 className="text-base font-bold text-white">{info.name} 주소와 이동 동선</h2>
            <p className="text-xs text-gray-400 leading-relaxed">
              {info.name} 안에서도 건물 출입 방식과 시간대에 따라 이동 시간이 달라집니다. 정확한 주소와 건물명을 먼저 알려 주면 방문 가능 시간을 더 현실적으로 안내할 수 있습니다. 도착 직전에 급히 공간을 정리하기보다 상담을 마친 뒤 수건과 편하게 누울 자리를 준비해 두는 편이 좋습니다.
            </p>
          </article>
          <article className="bg-[#0f0f13] border border-white/5 p-6 rounded-2xl space-y-2">
            <h2 className="text-base font-bold text-white">{info.name} 코스와 강도 선택</h2>
            <p className="text-xs text-gray-400 leading-relaxed">
              {info.name} 이용자는 긴 코스가 항상 더 적합하다고 생각하기보다 현재 컨디션과 남은 일정을 함께 살펴보는 것이 좋습니다. 처음에는 편안한 강도에서 시작하고, 집중이 필요한 부위와 피해야 할 자극을 구체적으로 말하면 과정이 자연스럽습니다.
            </p>
          </article>
          <article className="bg-[#0f0f13] border border-white/5 p-6 rounded-2xl space-y-2">
            <h2 className="text-base font-bold text-white">{info.name} 방문 전 준비</h2>
            <p className="text-xs text-gray-400 leading-relaxed">
              {info.name} 기준으로 당일 컨디션과 머무는 공간을 기준으로 준비사항을 간단히 맞춥니다. 오일 사용 여부와 샤워 가능 환경을 미리 말하면 현장 준비가 한결 수월합니다. 관리 공간은 넓을 필요보다 안전하게 움직일 수 있는 동선이 중요합니다.
            </p>
          </article>
          <article className="bg-[#0f0f13] border border-white/5 p-6 rounded-2xl space-y-2">
            <h2 className="text-base font-bold text-white">{info.name} 관리 뒤 마무리</h2>
            <p className="text-xs text-gray-400 leading-relaxed">
              {info.name} 방문 케어가 끝난 뒤에는 물을 천천히 마시고 몸이 가라앉을 시간을 남겨 두는 편이 좋습니다. 바로 장거리 이동이나 강한 운동을 계획하기보다 컨디션을 살핀 뒤 일상으로 돌아가세요. 다음 이용 때 참고할 수 있도록 편안했던 강도와 시간을 기억해 두면 선택이 쉬워집니다.
            </p>
          </article>
        </section>

        {/* 6. 코스와 가격 테이블 (레퍼런스 규격) */}
        <section id="courses" className="max-w-5xl mx-auto px-4 space-y-6">
          <div className="border-b border-white/10 pb-4">
            <h2 className="text-xl md:text-2xl font-black text-white">{info.name} 코스와 가격</h2>
            <p className="text-xs text-gray-400 mt-1">다섯 가지 코스를 모두 공개하고 시간별 선택지를 한 자리에서 비교합니다.</p>
          </div>

          <div className="space-y-3">
            {serviceCourses.map((c, idx) => (
              <div key={idx} className="bg-[#121216] border border-white/10 p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1 max-w-xl">
                  <h3 className="font-extrabold text-white text-base">{c.title}</h3>
                  <p className="text-xs text-gray-400">{info.name} 안내: {c.desc}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {c.prices.map((p, pIdx) => (
                    <span key={pIdx} className="bg-black/60 border border-amber-500/30 px-3 py-1.5 rounded-xl text-xs text-gray-300">
                      {p.time} <strong className="text-amber-400">{p.price}</strong>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 7. FAQ 아코디언 섹션 (<details> 시맨틱 태그) */}
        <section id="faq" className="max-w-5xl mx-auto px-4 space-y-6">
          <div className="border-b border-white/10 pb-4">
            <h2 className="text-xl md:text-2xl font-black text-white">{info.name} 자주 묻는 질문</h2>
            <p className="text-xs text-gray-400 mt-1">예약 전에 자주 확인하는 내용을 짧고 분명하게 정리했습니다.</p>
          </div>

          <div className="space-y-2.5">
            <details className="bg-[#101014] border border-white/5 rounded-2xl p-4 text-xs group">
              <summary className="font-bold text-gray-200 cursor-pointer list-none flex justify-between items-center">
                <span>Q. 예약 전에 무엇을 정하면 되나요?</span>
                <span className="text-amber-400">+</span>
              </summary>
              <p className="text-gray-400 mt-3 pt-3 border-t border-white/5 leading-relaxed">
                {info.name} 안내 기준으로 {info.name}의 정확한 주소, 희망 시작 시간, 코스 길이와 집중 부위를 정해 두면 됩니다.
              </p>
            </details>
            <details className="bg-[#101014] border border-white/5 rounded-2xl p-4 text-xs group">
              <summary className="font-bold text-gray-200 cursor-pointer list-none flex justify-between items-center">
                <span>Q. 선입금이 필요한가요?</span>
                <span className="text-amber-400">+</span>
              </summary>
              <p className="text-gray-400 mt-3 pt-3 border-t border-white/5 leading-relaxed">
                {info.name} 안내 기준으로 홈테라 운영 기준은 100% 현장 후불 방식입니다. 출발 전 선입금을 절대 요구하지 않습니다.
              </p>
            </details>
            <details className="bg-[#101014] border border-white/5 rounded-2xl p-4 text-xs group">
              <summary className="font-bold text-gray-200 cursor-pointer list-none flex justify-between items-center">
                <span>Q. 호텔이나 자택도 가능한가요?</span>
                <span className="text-amber-400">+</span>
              </summary>
              <p className="text-gray-400 mt-3 pt-3 border-t border-white/5 leading-relaxed">
                출입이 허용되는 공간인지 먼저 확인해야 합니다. 건물명과 공동현관 출입 방법을 미리 알려주시면 더욱 신속하게 진행됩니다.
              </p>
            </details>
            <details className="bg-[#101014] border border-white/5 rounded-2xl p-4 text-xs group">
              <summary className="font-bold text-gray-200 cursor-pointer list-none flex justify-between items-center">
                <span>Q. 강도는 현장에서 바꿀 수 있나요?</span>
                <span className="text-amber-400">+</span>
              </summary>
              <p className="text-gray-400 mt-3 pt-3 border-t border-white/5 leading-relaxed">
                가능 범위에서 유연하게 조절할 수 있습니다. 불편한 부위와 피해야 할 자극을 세션 시작 전에 매니저에게 말씀해 주세요.
              </p>
            </details>
          </div>
        </section>
      </main>

      {/* 하단 고정 전화 버튼 (레퍼런스 fixed-phone-cta) */}
      <a
        href="tel:0507-1280-3360"
        className="fixed bottom-5 right-5 z-50 bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-black text-sm px-5 py-3 rounded-full shadow-2xl flex items-center gap-2 hover:scale-105 active:scale-95 transition-all"
        aria-label="전화 상담"
      >
        <span>📞</span> 전화 상담
      </a>

      {/* 푸터 */}
      <footer className="bg-[#030303] border-t border-white/10 py-12 text-xs text-gray-500 mt-20">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <span className="font-black text-amber-400 text-sm block mb-2">홈테라</span>
            <p className="leading-relaxed">지역과 일정, 공간 조건을 차분히 확인한 뒤 이용 순서를 안내하는 서울·인천·경기 방문 케어 플랫폼입니다.</p>
          </div>
          <div>
            <b className="text-gray-300 block mb-2">지역 안내</b>
            <div className="flex flex-col gap-1.5">
              <Link href="/seoul" className="hover:text-amber-400">서울</Link>
              <Link href="/incheon" className="hover:text-amber-400">인천</Link>
              <Link href="/gyeonggi" className="hover:text-amber-400">경기</Link>
            </div>
          </div>
          <div>
            <b className="text-gray-300 block mb-2">이용 안내</b>
            <div className="flex flex-col gap-1.5">
              <a href="#courses" className="hover:text-amber-400">코스·가격</a>
              <a href="#faq" className="hover:text-amber-400">자주 묻는 질문</a>
              <a href="#guide" className="hover:text-amber-400">방문 절차</a>
            </div>
          </div>
        </div>
        <div className="max-w-5xl mx-auto px-4 pt-8 mt-8 border-t border-white/5 text-center text-gray-600">
          홈테라 지역 안내 · 실제 가능 시간과 방문 범위는 상담에서 확인해 주세요.
        </div>
      </footer>
    </div>
  );
}