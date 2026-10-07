"use client";

import { useEffect, useState } from "react";

// 지역명과 자연스럽게 결합될 홈테라 타깃 롱테일 문구 리스트
const MIXED_TEMPLATES = [
  "{loc} 프라이빗 출장  & 홈케어 머서자 안내 | 홈테라",
  "{loc} 타이 · 아로마 · 스웨디시 25분 빠른 출장 힐링",
  "{loc} 선입금 없는 100% 안심 후불제 방문 테라피",
  "{loc} 호텔 · 자택 맞춤 1:1 프라이빗 피로회복 케어",
  "{loc} 심야 24시 실시간 예약 가능 홈케어 서비스",
];

export default function ClientTextMixer({ locationText }: { locationText: string }) {
  // 초기 렌더링(SSR/하이드레이션) 기본값
  const cleanLocation = locationText ? locationText.trim() : "수도권 전지역";
  const [keywordText, setKeywordText] = useState(`${cleanLocation} 전문 홈케어 바디 서비스 | 홈테라`);

  useEffect(() => {
    // 유저 진입 시 템플릿 중 하나를 무작위 선택하여 자연스럽게 조합
    const randomTemplate = MIXED_TEMPLATES[Math.floor(Math.random() * MIXED_TEMPLATES.length)];
    const mixed = randomTemplate.replace("{loc}", cleanLocation);
    setKeywordText(mixed);
  }, [cleanLocation]);

  return (
    <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-2xl text-center shadow-[0_4px_15px_rgba(245,158,11,0.08)]">
      <p className="text-xs md:text-sm font-bold text-amber-300 tracking-wide">
        ✨ {keywordText}
      </p>
    </div>
  );
}