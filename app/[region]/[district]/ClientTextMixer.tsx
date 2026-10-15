interface ClientTextMixerProps {
  region?: string;
  district?: string;
  dongName?: string;
  locationText?: string;
}

// 🌟 네이버 타깃 롱테일 출장마사지 키워드 순환 템플릿
const MIXED_TEMPLATES = [
  "{loc} 출장 타이 마사지·홈타이 24시 방문 안내",
  "{loc} 출장 힐링 마사지·스웨디시 1:1 맞춤 케어",
  "{loc} 출장 릴렉스 마사지 및 전신 아로마 테라피",
  "{loc} 출장 안마 업체 추천 및 코스별 정찰제 요금표",
  "{loc} 출장 프리미엄 타이 마사지 25분 빠른 방문",
  "{loc} 출장 감성 스웨디시 및 안심 후불제 홈케어",
  "{loc} 출장 아로마 테라피·전신 피로회복 힐링 솔루션",
  "{loc} 출장 스포츠 마사지 및 뭉친 근막 집중 케어",
  "{loc} 출장 바디 릴렉싱 및 심야 24시 실시간 예약",
  "{loc} 출장 호텔식 마사지·자택 방문 프라이빗 케어",
  "{loc} 출장 맞춤 타이 마사지·선입금 없는 안심 방문",
  "{loc} 출장 스페셜 아로마 및 전문 힐러 1:1 방문 힐링",
];

export default function ClientTextMixer({
  region,
  district,
  dongName,
  locationText,
}: ClientTextMixerProps) {
  // 우선순위: locationText > (district + dongName) > district > 기본값
  const computedLocation =
    locationText || (dongName ? `${district} ${dongName}` : district) || "수도권 전지역";
  const cleanLocation = computedLocation.trim();

  // 지역명 문자열 해시 기반 결정론적 순환 선택 (서버 렌더링 시점 즉시 확정)
  const charSum = cleanLocation
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const selectedTemplate = MIXED_TEMPLATES[Math.abs(charSum) % MIXED_TEMPLATES.length];
  const keywordText = selectedTemplate.replace("{loc}", cleanLocation);

  return (
    <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-2xl text-center shadow-[0_4px_15px_rgba(245,158,11,0.08)]">
      <p className="text-xs md:text-sm font-extrabold text-amber-300 tracking-wide">
        ✨ {keywordText}
      </p>
    </div>
  );
}