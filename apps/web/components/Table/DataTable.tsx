'use client';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@repo/ui/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@repo/ui/table';
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import { useQueryState } from 'nuqs';
import { Fragment, ReactNode, useEffect, useState } from 'react';

import useQueryParamsInput from '@/hooks/useQueryParamsInput';
import { cn } from '@/lib/utils';

export { type ColumnDef };

type DataTableProps<T> = {
  uniqueKey?: string;
  data: T[];
  columns: ColumnDef<T>[];
  filterKey?: Extract<keyof T, string> | '';
  onRowClick?: (id: string | undefined) => void;
  multipleCheck?: boolean;
  accordionRow?: boolean;
  totalDataCount?: number;
  totalPageCount?: number;
  pageIndex?: number;
  pageSize?: number;
  onPaginnation?: (pagination: PaginationState) => void;
};

const PAGE_ITEMS = [10, 20, 50, 100];
export const DEFAULT_PAGE_SIZE = PAGE_ITEMS[2]!;
export default function DataTable<T>({
  uniqueKey = 'id',
  data,
  columns,
  filterKey = '',
  onRowClick,
  multipleCheck = false,
  accordionRow = false,
  onPaginnation,
  totalDataCount,
  totalPageCount,
  pageIndex = 0,
  pageSize = DEFAULT_PAGE_SIZE,
}: DataTableProps<T>) {
  const [pageIndexQuery, setPageIndexQuery] = useQueryState('pageIndex', {
    defaultValue: String(pageIndex),
  });
  const [pageSizeQuery, setPageSizeQuery] = useQueryState('pageSize', {
    defaultValue: String(pageSize),
  });

  const [filterValue, renderInput] = useQueryParamsInput({
    key: filterKey,
    placeholder: `Filter ${filterKey as string}...`,
  });

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState<Record<number, boolean>>({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getExpandedRowModel: getExpandedRowModel(),
    getRowCanExpand: () => true,
    ...(totalPageCount
      ? {
          manualPagination: true,
          pageCount: totalPageCount,
          onPaginationChange: (updater) => {
            const nextPagination =
              typeof updater === 'function'
                ? updater({ pageIndex: Number(pageIndexQuery), pageSize: Number(pageSizeQuery) })
                : updater;

            if (onPaginnation) {
              onPaginnation(nextPagination);
            }
          },
          state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
            pagination: {
              pageIndex: Number(pageIndexQuery),
              pageSize: Number(pageSizeQuery),
            },
          },
        }
      : {
          state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
          },
        }),
  });

  useEffect(() => {
    if (totalPageCount) {
      return;
    }
    table.setPageSize(Number(pageSizeQuery));
  }, [totalPageCount, table, pageIndexQuery, pageSizeQuery]);

  useEffect(() => {
    if (Object.keys(rowSelection).length === 0 || !onRowClick) {
      return;
    }

    const id = Object.keys(rowSelection)[0];
    onRowClick(id);
  }, [rowSelection, onRowClick]);

  useEffect(() => {
    if (filterKey) {
      table.getColumn(filterKey as string)?.setFilterValue(filterValue);
    }
  }, [table, filterKey, filterValue]);

  const getJumpPage = (direction: 'left' | 'right') => {
    const totalPages = table.getPageCount();
    const currentPage = table.getState().pagination.pageIndex;
    const pageSize = 2;

    const pagesToJump = pageSize;

    if (direction === 'left') {
      return Math.max(1, currentPage - pagesToJump);
    }

    return Math.min(totalPages, currentPage + pagesToJump);
  };

  const renderPageNumbers = () => {
    const totalPages = table.getPageCount();

    const { pageIndex, pageSize } = table.getState().pagination;
    if (totalPages < pageIndex * pageSize) {
      setPageIndexQuery(String(0));
      return [0];
    }

    const pages = [];
    const maxPageSlotsToShow = 5;

    if (totalPages <= maxPageSlotsToShow) {
      for (let i = 0; i <= totalPages - 1; i++) {
        pages.push(i);
      }
    } else {
      const leftBound = Math.max(1, pageIndex - 1);
      const rightBound = Math.min(totalPages - 2, pageIndex + 1);

      pages.push(0);
      if (leftBound > 1) {
        pages.push('left-ellipsis');
      }

      for (let i = leftBound; i <= rightBound; i++) {
        pages.push(i);
      }

      if (rightBound < totalPages - 2) {
        pages.push('right-ellipsis');
      }
      pages.push(totalPages - 1);
    }

    return pages;
  };

  return (
    <>
      {filterKey && renderInput()}
      <div className="rounded-lg border mb-6">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="py-2 [&>th:first-child]:pl-4">
                {headerGroup.headers.map((header) => {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  const style = (header.column.columnDef.meta as any)?.style;

                  return (
                    <TableHead
                      key={header.id}
                      className="font-regular"
                      style={{ width: `${header.getSize()}px`, ...style }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <Fragment key={row.id}>
                  <TableRow
                    className={cn(
                      onRowClick && ['cursor-pointer', 'hover:bg-muted'],
                      '[&>td:first-child]:pl-4',
                    )}
                    data-state={onRowClick && row.getIsSelected() && 'selected'}
                    onClick={() => {
                      if (!onRowClick) {
                        return;
                      }

                      if (accordionRow) {
                        row.getToggleExpandedHandler()();
                      }

                      if (!multipleCheck) {
                        if (Object.prototype.hasOwnProperty.call(rowSelection, row.id)) {
                          setRowSelection({});
                        } else {
                          const id = row.getValue<string>(uniqueKey) || row.id;
                          setRowSelection({ [id]: true });
                        }
                        return;
                      }

                      setRowSelection((state) => {
                        if (Object.prototype.hasOwnProperty.call(state, row.id)) {
                          const newState = { ...state };
                          delete newState[Number(row.id)];
                          return newState;
                        }

                        return {
                          ...state,
                          [row.id]: true,
                        };
                      });
                    }}
                  >
                    {row.getVisibleCells().map((cell) => {
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      const style = (cell.column.columnDef.meta as any)?.style;

                      return (
                        <TableCell key={cell.id} style={style}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                  {row.getIsExpanded() && (
                    <TableRow className="bg-muted/50">
                      <TableCell colSpan={columns.length}>
                        <div className="p-2 text-muted-foreground text-sm">{row.id}</div>
                      </TableCell>
                    </TableRow>
                  )}
                </Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-12">
                  검색 결과가 없습니다
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className={cn('flex items-center justify-between', data.length === 0 && 'hidden')}>
        <>
          <div className="flex w-[300px] items-center px-2">
            {totalPageCount ? (
              <>
                {Number(pageIndexQuery) * Number(pageSizeQuery) + +data.length} / {totalDataCount}
              </>
            ) : (
              <>
                {Math.min(
                  data.length,
                  (table.getState().pagination.pageIndex + 1) *
                    table.getState().pagination.pageSize,
                )}{' '}
                / {data.length}
              </>
            )}
          </div>
          <Pagination className="[&_*]:font-regular">
            <PaginationContent className="cursor-pointer">
              <PaginationItem>
                <PaginationPrevious
                  className={cn(
                    table.getState().pagination.pageIndex === 0 && [
                      '[&_*]:text-tweb-neutral3',
                      'hover:bg-transparent',
                    ],
                  )}
                  onClick={() => {
                    if (table.getState().pagination.pageIndex === 0) {
                      return;
                    }

                    setPageIndexQuery(String(Number(pageIndexQuery) - 1));
                    table.previousPage();
                  }}
                />
              </PaginationItem>
              {renderPageNumbers().map((page, index) => {
                const { pageIndex } = table.getState().pagination;

                if (typeof page === 'number') {
                  return (
                    <PaginationItem key={index}>
                      <PaginationLink
                        onClick={() => {
                          setPageIndexQuery(String(page));
                          table.setPageIndex(page);
                        }}
                        isActive={pageIndex === page}
                      >
                        {page + 1}
                      </PaginationLink>
                    </PaginationItem>
                  );
                }

                return (
                  <PaginationItem key={index}>
                    <PaginationEllipsis
                      onClick={() => {
                        const pageIndex = getJumpPage(page === 'left-ellipsis' ? 'left' : 'right');
                        setPageIndexQuery(String(pageIndex));

                        table.setPageIndex(pageIndex);
                      }}
                    />
                  </PaginationItem>
                );
              })}
              <PaginationItem>
                <PaginationNext
                  className={cn(
                    table.getState().pagination.pageIndex + 1 === table.getPageCount() && [
                      '[&_*]:text-tweb-neutral3',
                      'hover:bg-transparent',
                    ],
                  )}
                  onClick={() => {
                    if (table.getState().pagination.pageIndex + 1 === table.getPageCount()) {
                      return;
                    }
                    setPageIndexQuery(String(pageIndexQuery + 1));
                    table.nextPage();
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
          <div className="flex w-[300px] items-center justify-end space-x-2">
            페이지당 항목 수
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                setPageSizeQuery(value);
                table.setPageSize(Number(value));
              }}
            >
              <SelectTrigger className="h-8 w-[70px] ml-2">
                <SelectValue placeholder={table.getState().pagination.pageSize} />
              </SelectTrigger>
              <SelectContent side="top">
                {PAGE_ITEMS.map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </>
      </div>
    </>
  );
}

type DataTableWrapperProps = {
  searchButton?: ReactNode;
  children: ReactNode;
};

export function DataTableWrapper({ searchButton, children }: DataTableWrapperProps) {
  return (
    <div className="w-full">
      {searchButton ? (
        <div className="relative">
          <div className="absolute -top-16 right-0 [&>button]:w-full">{searchButton}</div>
          {children}
        </div>
      ) : (
        <>{children}</>
      )}
    </div>
  );
}
