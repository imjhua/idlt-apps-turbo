"use client";

import { Accordion, AccordionContent,AccordionItem, AccordionTrigger } from "@repo/ui/accordion";
import Link from "next/link";
import { useState } from "react";

import webConfig from '@/config/web.yaml'
import { WebConfigType } from '@/types/web'

import { Badge } from "../../components/Badge";
import animal from "../../data/terms/animal.json";
import asanaFlow from "../../data/terms/asana-flow.json";
import bandha from "../../data/terms/bandha.json";
import basic from "../../data/terms/basic.json";
import body from "../../data/terms/body.json";
import chakra from "../../data/terms/chakra.json";
import etc from "../../data/terms/etc.json";
import number from "../../data/terms/number.json";


const { brand } = (webConfig as WebConfigType)

interface Term {
  name: string;
  desc: string;
  extra?: string;
  color?: string;
}

interface Category {
  category: string;
  tag: string;
  terms: Term[];
}

// 각 terms.json import 후, Category[] 형태로 변환
const animalCategory = [{ category: '동물', tag: 'animal', terms: animal }];
const asanaFlowCategory = [{ category: '방향', tag: 'asana-flow', terms: asanaFlow }];
const bandhaCategory = [{ category: '반다', tag: 'bandha', terms: bandha }];
const basicCategory = [{ category: '기본', tag: 'basic', terms: basic }];
const chakraCategory = [{ category: '차크라', tag: 'chakra', terms: chakra }];
const bodyCategory = [{ category: '신체', tag: 'body', terms: body }];
const numberCategory = [{ category: '숫자', tag: 'number', terms: number }];
const etcCategory = [{ category: '기타', tag: 'etc', terms: etc }];

const allCategories: Category[] = [
  ...numberCategory,
  ...bodyCategory,
  ...etcCategory,
  ...animalCategory,
  ...chakraCategory,
  ...basicCategory,
  ...asanaFlowCategory,
  ...bandhaCategory,
];

export default function Page() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string | null>(null);

  let displayTerms: (Term & { category: string })[] = [];
  if (selected === null) {
    displayTerms = allCategories
      .flatMap(cat => cat.terms.map(term => ({ ...term, category: cat.category })))
      .filter(item => item.name.toLowerCase().includes(query.toLowerCase()))
      .sort((a, b) => a.name.localeCompare(b.name, 'ko-KR'));
  } else {
    displayTerms = allCategories
      .filter(cat => cat.category === selected)
      .flatMap(cat => cat.terms.map(term => ({ ...term, category: cat.category })))
      .filter(item => item.name.toLowerCase().includes(query.toLowerCase()))
      .sort((a, b) => {
        if (selected === '숫자' || selected === '차크라') return 0;
        return a.name.localeCompare(b.name, 'ko-KR');
      });
  }

  return (
    <main className="flex flex-col min-h-screen bg-background text-foreground items-center px-0">
      <div className="w-full flex flex-col items-center gap-2 mb-6 px-0">
        <div className="text-muted-foreground text-sm text-center mb-4 w-full">
          요가와 명상, 아사나, 신체, 철학 등 다양한 용어를 한눈에!<br />
          카테고리별로 탐색하거나, 검색으로 빠르게 찾아보세요.
        </div>
        {/* 카테고리 탭 */}
        <div className="flex flex-wrap gap-2 justify-center mb-2 w-full px-2">
          <button
            className={`px-3 py-1 rounded-full border text-sm font-bold transition w-auto ${selected === null ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-primary/10'}`}
            onClick={() => setSelected(null)}
          >전체</button>
          {[...allCategories]
            .sort((a, b) => a.category.localeCompare(b.category, 'ko-KR'))
            .map((cat) => (
              <button
                key={cat.category}
                className={`px-3 py-1 rounded-full border text-sm font-bold transition w-auto ${selected === cat.category ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-primary/10'}`}
                onClick={() => setSelected(cat.category)}
              >{cat.category}</button>
            ))}
        </div>
        {/* 검색 */}
        <div className="w-full flex items-center gap-2 px-2">
          <input
            className="w-full px-3 py-2 rounded border border-border bg-card text-base focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
            placeholder="검색..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <span className="text-xs text-muted-foreground whitespace-nowrap">
            {displayTerms.length}개
          </span>
        </div>
      </div>
      <div className="w-full flex-1 flex flex-col px-0">
        {displayTerms.length === 0 ? (
          <div className="text-center text-gray-400 py-16">검색 결과가 없습니다.</div>
        ) : (
          <Accordion type="multiple" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full px-0">
            {displayTerms.map((item, i) => (
              <AccordionItem key={i} value={item.name} className="rounded-xl border mb-2 bg-card w-full">
                <AccordionTrigger className="px-4 py-3 gap-2 no-underline focus:no-underline hover:no-underline overflow-hidden">
                  <div className="flex items-center min-w-0 w-full justify-between">
                    <div className="flex items-center min-w-0">
                      <span className="truncate max-w-[90%]">{item.name}</span>
                      <Badge category={item.category} className="px-2 py-0.5 text-xs shrink-0 ml-2">{item.category}</Badge>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <div className="text-sm whitespace-pre-line mb-1">{item.desc}</div>
                  {item.extra && (
                    <div className="mt-2 text-xs text-muted-foreground whitespace-pre-line">{item.extra}</div>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>
      <footer className="w-full mt-10 text-center text-xs text-muted-foreground border-t pt-6 pb-6">
        <Link href="/" className="underline">홈으로</Link> | &copy; 2025 {brand.name}
      </footer>
    </main>
  );
} 