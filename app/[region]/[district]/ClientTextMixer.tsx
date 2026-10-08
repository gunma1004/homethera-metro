"use client";

import { useEffect, useState } from "react";

// 지역명과 자연스럽게 결합될 홈테라 타깃 롱테일 문구 리스트 (오타 수정 및 보강)
const MIXED_TEMPLATES = [
  "{loc} 프라이빗 출장 & 홈케어 마사지 안내 | 홈테라",
  "{loc} 타이 · 아로마 · 스웨디시 25분 빠른 출장 힐링",
  "{loc} 선입금 없는 100% 안심 후불제 방문 테라피",
  "{loc} 호텔 · 자택 맞춤 1:1 프라이빗 피로회복 케어",
  "{loc} 심야 24시 실시간 예약 가능 홈케어 서비스",
  "{loc} 프리미엄 전신 릴렉싱 & 안심 방문 케어 가이드",
  "{loc} 뭉친 근육과 일상 피로를 푸는 맞춤 테라피 솔루션",
  "{loc} 검증된 베테랑 힐러의 정성 어린 1:1 방문 힐링",
];

export default function ClientTextMixer({ locationText }: { locationText: string }) {
  const cleanLocation = locationText ? locationText.trim() : "수도권 전지역";

  // 지역명 글자 합 기반 결정론적 초기 텍스트 설정 (깜빡임 최소화)
  const getInitialText = (loc: string) => {
    const charSum = loc.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const template = MIXED_TEMPLATES[charSum % MIXED_TEMPLATES.length];
    return template.replace("{loc}", loc);
  };

  const [keywordText, setKeywordText] = useState(() => getInitialText(cleanLocation));

  useEffect(() => {
    setKeywordText(getInitialText(cleanLocation));
  }, [cleanLocation]);

  return (
    <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-2xl text-center shadow-[0_4px_15px_rgba(245,158,11,0.08)]">
      <p className="text-xs md:text-sm font-bold text-amber-300 tracking-wide">
        ✨ {keywordText}
      </p>
    </div>
  );
}