"use client";

import Link from "next/link";
import webConfig from '@/config/web.yaml'
import { WebConfigType } from '@/types/web'

const { brand } = (webConfig as WebConfigType)

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen items-center justify-center bg-background text-foreground px-4">
      <div className="w-full max-w-md flex flex-col items-center gap-8 py-16">
        <div className="text-4xl font-extrabold tracking-tight text-primary mb-2">🧘‍♀️ {brand}</div>
        <div className="text-lg text-muted-foreground text-center mb-4">
          요가와 명상, 아사나, 신체, 철학 등<br />
          다양한 용어를 쉽고 빠르게!
        </div>
        <Link
          href="/glossary"
          className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-bold text-lg shadow hover:bg-primary/90 transition"
        >
          요가 용어집 바로가기
        </Link>
        <ul className="text-sm text-muted-foreground mt-6 space-y-1 text-center">
          <li>• 카테고리별 탐색, 빠른 검색</li>
          <li>• 현대적 UI/UX, 다크모드 지원</li>
          <li>• 모바일/PC 반응형</li>
        </ul>
        <footer className="w-full text-center text-xs text-muted-foreground border-t pt-6 mt-10">
          &copy; 2025 {brand}
        </footer>
      </div>
    </main>
  );
}
