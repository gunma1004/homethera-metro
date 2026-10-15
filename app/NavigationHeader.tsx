"use client";

import { useState } from "react";
import Link from "next/link";

export default function NavigationHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

        {/* 데스크톱 네비게이션: 서울, 경기, 인천 단독 페이지 직결 링크 */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-bold text-gray-300">
          <Link href="/seoul" className="hover:text-amber-400 transition-colors">
            서울
          </Link>
          <Link href="/gyeonggi" className="hover:text-amber-400 transition-colors">
            경기
          </Link>
          <Link href="/incheon" className="hover:text-amber-400 transition-colors">
            인천
          </Link>
          <Link href="/#courses" className="hover:text-amber-400 transition-colors">
            코스안내
          </Link>
        </nav>

        {/* 우측 전화 CTA & 모바일 햄버거 버튼 */}
        <div className="flex items-center gap-2.5">
          <a 
            href="tel:0507-1280-3360"
            className="bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-extrabold text-xs px-3.5 py-2 rounded-xl shadow transition-all active:scale-95"
          >
            📞 빠른 문의
          </a>

          {/* 모바일 햄버거 메뉴 토글 버튼 */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-amber-400 focus:outline-none"
            aria-label="메뉴 열기"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* 모바일 드롭다운 메뉴 (모바일 로봇 및 사용자 수집 지원) */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#0d0d10] border-t border-amber-500/20 px-4 py-3 mt-3 rounded-2xl space-y-2 text-xs font-bold text-gray-200">
          <Link 
            href="/seoul" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 px-3 rounded-lg hover:bg-amber-500/10 hover:text-amber-400 transition-colors"
          >
            📍 서울 마사지
          </Link>
          <Link 
            href="/gyeonggi" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 px-3 rounded-lg hover:bg-amber-500/10 hover:text-amber-400 transition-colors"
          >
            📍 경기 마사지
          </Link>
          <Link 
            href="/incheon" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 px-3 rounded-lg hover:bg-amber-500/10 hover:text-amber-400 transition-colors"
          >
            📍 인천 마사지
          </Link>
          <Link 
            href="/#courses" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 px-3 rounded-lg hover:bg-amber-500/10 hover:text-amber-400 transition-colors"
          >
            💎 코스안내
          </Link>
        </div>
      )}
    </header>
  );
}