import { ReactNode } from 'react'

import colorConfig from '@/config/color.yaml'
import { cn } from '@/lib/utils'
import type { ColorConfigType } from '@/types/color'

type BadgeProps = {
  className?: string
  children: ReactNode
  category?: string
}

export function Badge({ className, children, category }: BadgeProps) {
  const color = category ? (colorConfig as ColorConfigType).categoryStatus[category] : undefined;
  
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full h-xsmall px-[10px] text-caption1 font-bold',
        'px-2 py-0.5',
        color?.background,
        color?.text,
        className,
      )}
    >
      {children}
    </span>
  )
}
