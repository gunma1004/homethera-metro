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

// 🌿 구·동 지역명에 따라 본문 4개 단락과 주제가 완전히 다르게 교체되는 2,000자 정보성 칼럼 생성기
function getDynamicWellnessInsight(locationName: string, seed: number) {
  const insightGroups = [
    // [세트 A] 현대인 좌식 생활 / 경추·승모근 이완 / 건식 스트레칭 vs 오일 테라피 / 프라이빗 룸의 이점
    {
      subtitle: `${locationName} 맞춤형 바디 밸런스 회복 및 근막 이완 웰니스 인사이트`,
      sec1Title: "1. 좌식 근무와 목·어깨 연부조직 긴장의 생체역학적 원인",
      sec1Text: [
        `${locationName} 일대에서 사무 업무나 이동이 잦은 현대인들은 하루의 상당 시간을 고정된 자세로 보내며 상체 근골격계에 지속적인 부하를 받습니다. 특히 시선이 아래로 향하거나 턱을 앞으로 내미는 자세는 경추 굴곡근을 약화시키고 상부 승모근과 견갑거근에 비정상적인 장력을 발생시킵니다. 이로 인해 어깨 윗선이 단단하게 뭉치고 후두하근이 경직되어 머리가 무겁거나 눈의 피로감이 동반되기 쉽습니다.`,
        `이러한 만성 근막 긴장을 완화하려면 체온을 적정 수준으로 끌어올려 모세혈관을 확장하고, 결을 따라 섬세한 수기 압을 가해 단축된 근막을 넓게 펴주는 이완 과정이 필요합니다. 연부조직의 혈류량이 증가하면 축적된 젖산과 대사 노폐물이 배출되어 신체 본래의 가동 범위와 유연성을 부드럽게 되찾을 수 있습니다.`
      ],
      sec2Title: "2. 신체 상태에 따른 수기 스트레칭과 오일 테라피의 기능적 차이",
      sec2Text: [
        `테라피를 선택할 때는 당일의 피로 부위와 컨디션에 맞추어 관리 기법을 결정하는 것이 안전하고 효과적입니다.`,
        `오일을 사용하지 않는 건식 타이 케어는 수동적 전신 스트레칭과 지압을 결합하여 굳어있던 관절의 가동 범위를 확장하고 햄스트링, 이상근, 척추기립근 등 큰 근육 무리를 시원하게 신전시키는 데 탁월합니다. 반면 스웨디시 및 아로마 테라피는 식물성 베이스 오일을 매개체로 피부 마찰 저항을 줄이며 림프절을 자극하는 유러피언 기법입니다. 강한 압박 없이도 심신의 깊은 안정과 정서적 스트레스 완화, 붓기 관리를 동시에 누릴 수 있어 민감한 신체 상태에 최적화되어 있습니다.`
      ],
      sec3Title: "3. 독립된 프라이빗 공간에서 누리는 심리적 안정과 숙면 유도",
      sec3Text: [
        `테라피의 생리학적 효과를 온전히 누리기 위해서는 심리적 안정감이 뒷받침되어야 합니다. 외부 번화가 매장을 방문할 때 수반되는 이동 시간, 주차 스트레스, 대기 시간은 무의식중에 교감신경을 자극하여 코르티솔 분비를 촉진할 수 있습니다.`,
        `자택이나 호텔 객실 등 독립된 1인 사적 공간에서 진행되는 프라이빗 홈케어는 외부 소음과 시선이 완전히 차단되어 부교감신경계를 빠르게 활성화합니다. 세션 종료 후에도 번거로운 귀가 이동이나 환복 과정 없이 곧바로 아늑한 침상에서 깊은 수면으로 이어질 수 있어 피로 회복의 지속성이 매우 뛰어납니다.`
      ],
      sec4Title: "4. 안전하고 투명한 정찰제 및 후불 이용 에티켓",
      sec4Text: [
        `${locationName} 일대에서 웰니스 서비스를 이용하실 때는 소비자의 안전과 권익을 보장하는 정찰제 원칙을 확인하시는 것이 바람직합니다. 신뢰할 수 있는 제휴 파트너는 예약 명목의 불법 선입금을 일절 요구하지 않으며 투명한 현장 결제 기준을 엄격히 준수합니다.`,
        `또한 최근 관절 질환, 골절 병력, 임신 등의 상태가 있는 경우 세션 시작 전 담당 힐러에게 공유하여 맞춤 강도를 설정하는 것이 안전하고 건강한 힐링을 완성하는 방법입니다.`
      ]
    },
    // [세트 B] 자율신경계 불균형 / 림프 순환과 부종 완화 / 천연 에센셜 오일의 시너지 / 디톡스
    {
      subtitle: `${locationName} 일상 스트레스 완화와 전신 림프 순환 디톡스 가이드`,
      sec1Title: "1. 과중한 일상 스트레스와 자율신경계 불균형의 상관관계",
      sec1Text: [
        `${locationName} 도심 생활권에서 바쁜 스케줄을 소화하다 보면 신체의 교감신경이 지속적인 긴장 상태에 머물게 됩니다. 자율신경계의 밸런스가 무너지면 말초 혈관이 수축하여 손발이 차가워지고 근육이 무의식중에 긴장 상태를 유지하여 신체 전반의 에너지 회복 속도가 현저히 떨어집니다.`,
        `정성 어린 감성 터치와 일정한 리듬의 수기 테라피는 피부 감각 수용기를 안정적으로 자극하여 엔도르핀과 옥시토신 분비를 유도합니다. 뇌파가 각성 상태(베타파)에서 안정 상태(알파파)로 전환되면서 긴장되어 있던 중추신경계가 회복 국면으로 접어들고 자연스러운 신체 활력이 살아납니다.`
      ],
      sec2Title: "2. 부종 완화와 신진대사 촉진을 위한 림프 드레니쥐 기법",
      sec2Text: [
        `림프계는 체내 노폐물과 잉여 수분을 걸러내는 정화 통로이지만 심장과 같은 자체 박동 펌프가 없습니다. 장시간 서 있거나 앉아 있는 생활로 인해 서혜부(사타구니)와 액와부(겨드랑이) 주변 림프절이 굳어지면 흐름이 정체되어 하체 붓기와 무거움증이 유발됩니다.`,
        `림프 순환 테라피는 강한 지압을 지양하고 림프의 자연스러운 흐름 방향에 맞추어 피부층을 섬세하게 밀어 올리는 기법을 적용합니다. 정체되어 있던 체액이 원활하게 흡수 및 배출되면서 무겁고 둔탁했던 전신이 한결 가볍고 상쾌해지는 변화를 체감할 수 있습니다.`
      ],
      sec3Title: "3. 식물성 천연 아로마 블렌딩이 제공하는 다각적 이완 효과",
      sec3Text: [
        `에센셜 오일 테라피는 천연 식물 추출물의 유효 성분과 후각적 아로마콜로지 효과를 결합한 복합 힐링입니다. 실내에 은은하게 퍼지는 향기는 후각 신경을 통해 대뇌 변연계에 즉각 전달되어 감정적 불안과 긴장을 차분히 가라앉혀 줍니다.`,
        `동시에 호호바, 스위트 아몬드 등 고급 식물성 베이스 오일이 피부 표면에 촉촉한 보습막을 형성하여 건조한 환경으로부터 피부 장벽을 보호합니다. 뭉친 근육의 이완과 피부 영양 공급을 동시에 완성하는 핵심 비결입니다.`
      ],
      sec4Title: "4. 건강한 테라피를 위한 수분 섭취와 사후 관리",
      sec4Text: [
        `세션을 마친 직후에는 림프 순환을 통해 체내로 배출된 대사 노폐물이 원활하게 배설될 수 있도록 미온수를 충분히 섭취해 주는 것이 좋습니다.`,
        `관리 당일은 과도한 음주나 격렬한 운동을 지양하고 따뜻한 실내 환경에서 충분한 수면을 취함으로써 근육의 미세 이완 효과를 오랜 시간 안정적으로 유지하시기 바랍니다.`
      ]
    },
    // [세트 C] 보행 패턴과 골반 지지근 불균형 / 딥티슈 심부근막 / 시간 절약 방문 가치 / 에티켓
    {
      subtitle: `${locationName} 근골격계 정렬 회복을 위한 체계적 심부근막 릴렉싱 분석`,
      sec1Title: "1. 보행 패턴과 골반 주변 지지근의 비대칭적 하중 해소",
      sec1Text: [
        `${locationName} 일대에서 잦은 도보 이동이나 계단 이용을 반복하는 경우 골반을 지지하는 중둔근, 이상근, 장요근에 불균형한 하중이 가해지기 쉽습니다. 특히 한쪽 다리에 체중을 싣는 짝다리 습관이나 다리를 꼬는 자세는 골반의 미세한 뒤틀림을 일으켜 허리 하부와 허벅지 뒤쪽 햄스트링까지 연쇄적인 당김과 통증을 유발합니다.`,
        `체계적인 바디 컨디셔닝은 겉 근육만을 문지르는 것이 아니라 골반과 척추를 지지하는 심부 기립근을 정밀하게 짚어냅니다. 틀어진 좌우 대칭 균형을 바로잡아 보행 시 하체 피로도를 현저히 낮추고 상쾌한 신체 정렬을 완성합니다.`
      ],
      sec2Title: "2. 만성 피로의 원인인 속근육 매듭을 다루는 딥티슈 테라피",
      sec2Text: [
        `오랜 기간 축적된 만성적인 결림은 표층 근육 아래 위치한 심부 근막에 단단한 통증 유발점(트리거 포인트)이 자리 잡고 있기 때문입니다. 가벼운 터치만으로는 도달하기 어려운 이 부위는 전문적인 딥티슈 기법으로 다루어야 합니다.`,
        `체중을 실은 일정한 지속 압력을 심부 조직까지 서서히 전달하여 굳어있던 근막 유착을 분리하고 정상적인 탄력을 회복시킵니다. 세션 직후 뻐근했던 허리와 등줄기 전체가 시원하게 개방되는 개운함을 경험하실 수 있습니다.`
      ],
      sec3Title: "3. 방문형 프라이빗 서비스가 제공하는 스마트한 시간 절약",
      sec3Text: [
        `바쁜 현대인에게 이동 시간을 아끼는 것은 가장 현명한 자기 관리 방식 중 하나입니다. 번화가의 주차난을 겪거나 대기 시간을 기다리는 피로를 덜어내고, 내가 원하는 시간에 프라이빗한 관리를 누릴 수 있습니다.`,
        `누구의 방해도 받지 않는 독립된 공간에서 진행되는 세션은 물리적 에너지 소모 없이 온전히 관리 자체에만 집중할 수 있는 최적의 쉼터를 제공합니다.`
      ],
      sec4Title: "4. 투명한 요금 체계와 품격 있는 힐링 문화",
      sec4Text: [
        `홈테라는 공시된 정찰제 요금과 100% 현장 후불제 시스템을 기반으로 운영되어 이용자에게 어떠한 부당한 추가 요금도 청구하지 않습니다.`,
        `철저한 소독과 위생 관리를 검증된 전문 관리사와 함께 ${locationName} 전역 어디서나 품격 높은 프라이빗 바디케어를 안심하고 누려보시기 바랍니다.`
      ]
    }
  ];

  return insightGroups[seed % insightGroups.length];
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  
  const { region, district } = resolvedParams;
  const dongName = resolvedSearchParams.dong ? decodeURIComponent(resolvedSearchParams.dong) : "";
  const districtName = decodeURIComponent(district);
  const regionName = region === "seoul" ? "서울" : region === "incheon" ? "인천" : "경기";

  const fullLocationHeader = `${regionName} ${districtName} ${dongName}`.trim();
  const leadLocation = dongName || districtName;
  const tailDistrict = dongName ? ` (${districtName})` : "";

  const charSum = (fullLocationHeader + dongName + districtName).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const variantIndex = charSum % 50;

  const titleVariants = [
    `${leadLocation} 출장 릴렉싱 마사지 추천 및 24시 방문${tailDistrict} 업체 | 홈테라`,
    `${leadLocation} 출장 프리미엄 마사지 100% 안심 후불제${tailDistrict} 업체 | 홈테라`,
    `${leadLocation} 출장 홈 마사지 24시 전문 프라이빗 케어${tailDistrict} 업체 | 홈테라`,
    `${leadLocation} 출장 힐링 마사지 제휴 코스 및 후불 예약${tailDistrict} 업체 | 홈테라`,
    `${leadLocation} 출장 스웨디시 마사지 24시 빠른 방문${tailDistrict} 업체 | 홈테라`,
  ];

  const descriptionVariants = [
    `${fullLocationHeader} 출장마사지 25분 내 빠른 방문! 선입금 요청 절대 없는 100% 안심 후불제. 타이, 아로마, 스웨디시 제휴업체 코스 및 요금을 한눈에 확인하세요.`,
    `${fullLocationHeader} 출장마사지 안내. 프라이빗한 피로 회복을 위한 24시 방문 홈케어 가이드로 베테랑 테라피스트의 맞춤 힐링 케어를 제공합니다.`,
    `${fullLocationHeader} 출장마사지 예약 가이드. 전지역 신속 방문과 부담 없는 후불제 시스템, 정직한 60·90·120분 코스 정보를 홈테라에서 살펴보세요.`,
  ];

  const finalTitle = titleVariants[variantIndex % titleVariants.length];
  const finalDescription = descriptionVariants[variantIndex % descriptionVariants.length];

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

  const simpleLocation = dongName ? `${districtName} ${dongName}` : districtName;
  const charSum = (fullTitle + region).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const insight = getDynamicWellnessInsight(simpleLocation, Math.abs(charSum));

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
          
          <Link href={`/${region}/${encodeURIComponent(districtName)}`} className="text-xs font-bold text-amber-400 bg-amber-500/10 px-3.5 py-2 rounded-xl border border-amber-500/30 hover:bg-amber-500 hover:text-black transition-all shadow-inner flex items-center gap-1">
            <span>←</span> {districtName} 전체 보기
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
            {localShops.map((lShop) => {
              const shopDetailLink = dongName
                ? `/shop/${region}/${encodeURIComponent(districtName)}/${encodeURIComponent(dongName)}/${lShop.id}`
                : `/shop/${region}/${encodeURIComponent(districtName)}/${lShop.id}`;

              return (
                <div key={lShop.id} className="bg-[#121214] border border-amber-500/20 hover:border-amber-500/60 rounded-2xl p-4 flex gap-4 items-center shadow-lg transition-all group relative">
                  <Link 
                    href={shopDetailLink} 
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
              );
            })}
          </div>
        </section>

        {/* 📚 [네이버 상위 노출용 2,000자 전문 웰니스 인사이트 칼럼] */}
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
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="text-amber-400">●</span> {insight.sec1Title}
            </h3>
            {insight.sec1Text.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="text-amber-400">●</span> {insight.sec2Title}
            </h3>
            {insight.sec2Text.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="text-amber-400">●</span> {insight.sec3Title}
            </h3>
            {insight.sec3Text.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="text-amber-400">●</span> {insight.sec4Title}
            </h3>
            {insight.sec4Text.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        </section>
      </main>

      {/* 푸터 영역 */}
      <footer className="bg-[#030303] border-t border-white/10 py-10 text-center text-gray-500 text-xs mt-auto">
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <p className="text-gray-400 font-bold">홈테라는 건전하고 안전한 방문 힐링 바디케어 정보 안내 플랫폼입니다.</p>
          <p className="text-[11px] text-gray-600">COPYRIGHT &copy; 2026 홈테라 ALL RIGHTS RESERVED.</p>
        </div>
      </footer>
    </div>
  );
}