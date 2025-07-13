"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import webConfig from '@/config/web.yaml'
import { WebConfigType } from '@/types/web'

const { brand } = (webConfig as WebConfigType)

export default function Home() {
  const [isYogaGlossaryDomain, setIsYogaGlossaryDomain] = useState(false);

  useEffect(() => {
    const hostname = window.location.hostname;
    setIsYogaGlossaryDomain(hostname.includes('idlt-yoga-glossary'));
  }, []);
  return (
    <main className="flex flex-col min-h-screen items-center justify-center bg-background text-foreground px-4">
      <div className="w-full max-w-md flex flex-col items-center gap-8 py-16">
        {isYogaGlossaryDomain ? (
          // idlt-apps-yoga-glossary.vercel.app 도메인일 때
          <>
            <div className="text-4xl font-extrabold tracking-tight text-primary mb-2">🧘‍♀️ {brand.name}</div>
            <div className="text-lg text-muted-foreground text-center mb-4">
              요가와 명상, 아사나, 신체, 철학 등<br />
              다양한 용어를 쉽고 빠르게!
            </div>
            <Link
              href="/yoga-glossary"
              className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-bold text-lg shadow hover:bg-primary/90 transition"
            >
              요가 용어집 바로가기
            </Link>
            <ul className="text-sm text-muted-foreground mt-6 space-y-1 text-center">
              <li>• 카테고리별 탐색, 빠른 검색</li>
              <li>• 현대적 UI/UX, 다크모드 지원</li>
              <li>• 모바일/PC 반응형</li>
            </ul>
          </>
        ) : (
          // 다른 도메인일 때
          <>
            <div className="text-4xl font-extrabold tracking-tight text-primary mb-2">🏠 {brand.name}</div>
            <div className="text-lg text-muted-foreground text-center mb-4">
              다양한 앱들을 제공하는<br />
              통합 플랫폼입니다
            </div>
            <div className="flex flex-col gap-4 w-full">
              <Link
                href="/yoga-glossary"
                className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-bold text-lg shadow hover:bg-primary/90 transition text-center"
              >
                🧘‍♀️ 요가 용어집
              </Link>
              {/* 추가 앱들을 여기에 추가할 수 있습니다 */}
            </div>
            <ul className="text-sm text-muted-foreground mt-6 space-y-1 text-center">
              <li>• 다양한 도구와 앱</li>
              <li>• 통합 관리 시스템</li>
              <li>• 모바일/PC 반응형</li>
            </ul>
          </>
        )}
        <footer className="w-full text-center text-xs text-muted-foreground border-t pt-6 mt-10">
          &copy; 2025 {brand.name}
        </footer>
      </div>
    </main>
  );
}
