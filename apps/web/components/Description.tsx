import { ReactNode } from 'react'

type DescriptionProps = {
  title?: string
  titleElement?: ReactNode
  items: {
    label: string
    value: ReactNode | string
  }[]
  className?: string
}
export function Description({ className, title, titleElement, items }: DescriptionProps) {
  return (
    <div className={className}>
      <div className="flex">
        {title && <div className="text-body1 font-bold mt-2 mb-3">{title}</div>}
        {titleElement && <>{titleElement}</>}
      </div>
      <ul>
        {items.map(({ label, value }, index) => {
          return (
            <li key={index} className="flex h-11 font-[20px] py-[10px]">
              <div className="w-[136px] group-data-[state=open]:w-[116px] flex-none">{label}</div>
              <div className="flex-1">{value || '-'}</div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
