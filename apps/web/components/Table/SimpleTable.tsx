import { ScrollArea } from '@repo/ui/scroll-area'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@repo/ui/table'
import { CSSProperties, ReactNode } from 'react'

import { cn } from '@/lib/utils'

import { SubTitle } from '../Title'

type Title = string
type ClassName = string
type SimpleTableProps<T> = {
  title?: string
  data: T[]
  columns: [Extract<keyof T, string>, Title?, ClassName?][]
  customHeader?: ReactNode
  customFooter?: ReactNode
}

export default function SimpleTable<T>({
  title,
  data,
  columns,
  customHeader,
  customFooter,
}: SimpleTableProps<T>) {
  return (
    <div>
      {title && <SubTitle>{title}</SubTitle>}
      <TableWrapper>
        <Table>
          <TableHeader>
            {customHeader ? (
              customHeader
            ) : (
              <TableRow>
                {columns.map(([key, name, className = ''], index) => {
                  return (
                    <TableRowHeader key={index} className={className}>
                      {name || key}
                    </TableRowHeader>
                  )
                })}
              </TableRow>
            )}
          </TableHeader>
          <TableBody>
            {data.map((rowData, index) => (
              <TableRow key={index}>
                {columns.map(([key, , className = '']) => {
                  return (
                    <TableRowCell key={key} className={className}>
                      {rowData[key as keyof T] as ReactNode}
                    </TableRowCell>
                  )
                })}
              </TableRow>
            ))}
          </TableBody>
          {customFooter && <TableFooter className="font-regular">{customFooter}</TableFooter>}
        </Table>
      </TableWrapper>
    </div>
  )
}

export type ScrollAreaProps = {
  className?: string
}

export function TableWrapper({
  children,
  scroll,
}: {
  children: ReactNode
  scroll?: ScrollAreaProps
}) {
  if (scroll) {
    return (
      <div className="border border-tweb-neutral5 rounded-lg overflow-hidden">
        <ScrollArea className={scroll.className}>{children}</ScrollArea>
      </div>
    )
  } else {
    return <div className="border rounded-lg overflow-hidden">{children}</div>
  }
}

export function TableRowHeader({
  className,
  style,
  children,
}: {
  className?: string
  style?: CSSProperties
  children: ReactNode
}) {
  return (
    <TableHead style={style} className={cn('font-regular px-4 py-0', className)}>
      {children}
    </TableHead>
  )
}

export function TableRowCell({
  className,
  style,
  children,
}: {
  className?: string
  style?: CSSProperties
  children: ReactNode
}) {
  return (
    <TableCell style={style} className={cn('px-4 py-2', className)}>
      {children}
    </TableCell>
  )
}
