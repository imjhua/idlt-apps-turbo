import { notFound } from 'next/navigation';
import { GlossaryCard } from '../../../components/GlossaryCard';

interface Term {
  name: string;
  desc: string;
  extra?: string;
  category?: string;
}

const CATEGORY_META: Record<string, { badge: string; title: string }> = {
  basic: { badge: '기본', title: '쉽고 친근한 기본 용어' },
  animal: { badge: '동물', title: '자세에 영감을 준 동물들' },
  bandha: { badge: '반다', title: '몸의 중심을 조이는 반다' },
  chakra: { badge: '차크라', title: '에너지 흐름과 관련된 차크라' },
  'asana-flow': { badge: '방향', title: '아사나의 방향' },
  'number-body-etc': { badge: '기타', title: '숫자, 신체 부위 그리고 일반 용어' },
};

export default async function GlossaryCategoryPage({ params }: { params: { category: string } }) {
  const { category } = params;
  const meta = CATEGORY_META[category];
  if (!meta) return notFound();

  let terms: Term[] = [];
  try {
    if (category === 'number-body-etc') {
      const number = (await import(`../../../data/terms/number.json`)).default;
      const body = (await import(`../../../data/terms/body.json`)).default;
      const etc = (await import(`../../../data/terms/etc.json`)).default;
      terms = [...number, ...body, ...etc];
    } else {
      terms = (await import(`../../../data/terms/${category}.json`)).default;
    }
  } catch {
    return notFound();
  }

  return (
    <div className="p-4 pb-8 max-w-xl">
      <div className="mb-6 flex flex-col">
        <h1 className="text-xl font-bold">{meta.title}</h1>
      </div>
      <div className="space-y-6">
        {terms.map((term) => (
          <GlossaryCard
            key={term.name}
            name={term.name}
            desc={term.desc}
            extra={term.extra}
            badge={term.category}
          />
        ))}
      </div>
    </div>
  );
}