"use client";

import { useState } from "react";
import Link from "next/link";

export default function NavigationHeader() {
  const [isRegionOpen, setIsRegionOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#050505]/90 backdrop-blur-xl border-b border-amber-500/20 px-4 py-3 shadow-[0_4px_20px_rgba(245,158,11,0.1)]">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        
        {/* 로고 영역 */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <img 
            src="/logo.png" 
            alt="홈테라 로고" 
            className="w-9 h-9 rounded-xl object-cover border border-amber-500/40 group-hover:scale-105 transition-transform" 
          />
          <span className="text-lg font-black tracking-wider bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
            홈테라
          </span>
        </Link>

        {/* 카테고리 네비게이션 메뉴 */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-bold text-gray-300">
          
          {/* 1. 서비스 */}
          <Link href="/services" className="hover:text-amber-400 transition-colors flex items-center gap-1">
            서비스
          </Link>

          {/* 2. 가격안내 */}
          <Link href="/prices" className="hover:text-amber-400 transition-colors flex items-center gap-1">
            가격안내
          </Link>

          {/* 3. 지역여행 */}
          <Link href="/travel" className="hover:text-amber-400 transition-colors flex items-center gap-1">
            지역여행
          </Link>

          {/* 4. 맛집·숙소 */}
          <Link href="/places" className="hover:text-amber-400 transition-colors flex items-center gap-1">
            맛집·숙소
          </Link>

          {/* 5. 수도권 지역안내 (드롭다운) */}
          <div 
            className="relative cursor-pointer py-2"
            onMouseEnter={() => setIsRegionOpen(true)}
            onMouseLeave={() => setIsRegionOpen(false)}
          >
            <button className="hover:text-amber-400 transition-colors flex items-center gap-1 text-xs font-bold text-gray-300">
              수도권 지역
              <span className="text-[10px] text-amber-400">▼</span>
            </button>

            {isRegionOpen && (
              <div className="absolute top-full left-0 w-36 bg-[#121214] border border-amber-500/30 rounded-2xl shadow-2xl py-2 space-y-1 text-xs z-50">
                <Link href="/seoul/서울특별시" className="block px-4 py-2 hover:bg-amber-500/10 hover:text-amber-400">
                  📍 서울 지역
                </Link>
                <Link href="/gyeonggi/경기도" className="block px-4 py-2 hover:bg-amber-500/10 hover:text-amber-400">
                  📍 경기 지역
                </Link>
                <Link href="/incheon/인천광역시" className="block px-4 py-2 hover:bg-amber-500/10 hover:text-amber-400">
                  📍 인천 지역
                </Link>
              </div>
            )}
          </div>

          {/* 6. 후기 */}
          <Link href="/reviews" className="text-amber-400 font-extrabold hover:text-yellow-300 transition-colors flex items-center gap-1 bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/30">
            <span>💬</span> 생생후기
          </Link>

        </nav>

        {/* 우측 전화 CTA (제휴 대표 번호 연결) */}
        <a 
          href="tel:0507-1280-3360"
          className="bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-extrabold text-xs px-3.5 py-2 rounded-xl shadow transition-all active:scale-95"
        >
          📞 빠른 문의
        </a>
      </div>
    </header>
  );
}