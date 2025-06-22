import { ReactNode } from 'react'

import { cn } from '@/lib/utils'

type TitleProps = {
  children: ReactNode
}

export function Title({ children }: TitleProps) {
  return <h2 className="pb-5 text-display font-bold">{children}</h2>
}

export function SubTitle({ className, children }: { className?: string; children: ReactNode }) {
  return <h3 className={cn('text-body1 font-bold mt-2 mb-3', className)}>{children}</h3>
}
