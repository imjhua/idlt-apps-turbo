'use client'

import { Button } from '@repo/ui/button'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { ReactNode } from 'react'

export default function GoToLink({ children, url }: { children: ReactNode, url: string }) {
  return (
    <Button variant="link" className="p-0 h-full justify-between min-w-[20px] gap-1" asChild>
      <Link href={url} target="_blank" rel="noreferrer">
        {children}
        <ChevronRight />
      </Link>
    </Button>
  )
}
