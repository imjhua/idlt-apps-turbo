import { Table, TableBody, TableHeader, TableRow } from '@repo/ui/table'
import { CSSProperties, ReactNode } from 'react'

import { SubTitle } from '../Title'
import { TableRowCell, TableRowHeader, TableWrapper } from './SimpleTable'

export type RenderingColumn<T> = {
  header: ReactNode
  style?: CSSProperties
  cell: (props: { row: T; rowIndex: number }) => ReactNode
}

export type ScrollAreaProps = {
  className?: string
}

type RenderingTableProps<T> = {
  className?: string
  title?: string
  data: T[]
  columns: RenderingColumn<T>[]
  scroll?: ScrollAreaProps
}

export default function RenderingTable<T>({
  className,
  title,
  data,
  columns,
  scroll,
}: RenderingTableProps<T>) {
  return (
    <div className={className}>
      {title && <SubTitle>{title}</SubTitle>}
      <TableWrapper scroll={scroll}>
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col, index) => {
                return (
                  <TableRowHeader key={index} style={col.style}>
                    {col.header}
                  </TableRowHeader>
                )
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 && (
              <TableRow>
                <TableRowCell>데이터가 존재하지 않습니다.</TableRowCell>
              </TableRow>
            )}
            {data.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((col, colIndex) => (
                  <TableRowCell key={colIndex} style={col.style}>
                    {col.cell({ row, rowIndex })}
                  </TableRowCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableWrapper>
    </div>
  )
}
