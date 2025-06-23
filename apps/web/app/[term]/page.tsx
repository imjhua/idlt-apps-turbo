import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Badge } from '../../components/Badge'
import { Description } from '../../components/Description'
import { Title } from '../../components/Title'
import glossary from '../../data/glossary.json'

export default function TermDetail({ params }: { params: { term: string } }) {
  const decoded = decodeURIComponent(params.term)
  const item = glossary.find((g) => g.term === decoded)
  if (!item) return notFound()

  return (
    <main className="max-w-md mx-auto p-4">
      <Link href="/" className="text-primary text-sm mb-4 inline-block">← 홈으로</Link>
      <Title>
        {item.term} <Badge className="ml-2">{item.korean}</Badge>
        {item.sanskrit && <span className="ml-2 text-base text-gray-400">{item.sanskrit}</span>}
      </Title>
      <Description
        items={[
          { label: '정의', value: item.definition },
          item.etymology && { label: '어원', value: item.etymology },
        ].filter(Boolean) as { label: string; value: string }[]}
      />
    </main>
  )
} 