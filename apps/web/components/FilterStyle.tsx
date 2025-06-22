import React, { ReactNode } from 'react'

type FilterStyleProps = {
  children: ReactNode
}

export const FilterStyle = ({ children }: FilterStyleProps) => {
  return <div className="flex flex-wrap items-start gap-2 [&_label]:w-[190px]">{children}</div>
}

type FilterItemStyleProps = {
  children: ReactNode
}

export const FilterItemStyle = ({ children }: FilterItemStyleProps) => {
  return <div className="flex flex-col gap-3 pt-1">{children}</div>
}
