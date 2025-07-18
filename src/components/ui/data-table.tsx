import {
  type ColumnDef,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Skeleton } from "@/components/ui/skeleton"
import { useState } from "react"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  isLoading?: boolean
  error?: Error | string | null
  errorTitle?: string
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading = false,
  error = null,
  errorTitle = "Error Loading Data",
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
    manualPagination: true,
    manualFiltering: true,
  })

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {isLoading ? (
            <TableRow>
              {Array(columns.length)
                .fill(0)
                .map((_, index) => (
                  <TableHead
                    key={index}
                    className="h-12 px-4 text-left align-middle font-medium text-muted-foreground"
                  >
                    <Skeleton className="h-4 w-16" />
                  </TableHead>
                ))}
            </TableRow>
          ) : (
            table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))
          )}
        </TableHeader>
        <TableBody>
          {isLoading ? (
            // Skeleton loading
            Array(5)
              .fill(0)
              .map((_, index) => (
                <TableRow
                  key={index}
                  className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                >
                  {Array(columns.length)
                    .fill(0)
                    .map((_, cellIndex) => (
                      <TableCell key={cellIndex} className="p-4 align-middle">
                        {cellIndex === 2 ? (
                          <div className="flex flex-wrap gap-1">
                            <Skeleton className="h-6 w-16 rounded-full" />
                            <Skeleton className="h-6 w-12 rounded-full" />
                          </div>
                        ) : (
                          <Skeleton
                            className={`h-4 w-${cellIndex === 0 ? "24" : cellIndex === 1 ? "32" : "20"}`}
                          />
                        )}
                      </TableCell>
                    ))}
                </TableRow>
              ))
          ) : error ? (
            // Error message
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center p-4"
              >
                <div className="flex flex-col items-center justify-center text-center">
                  <h3 className="text-lg font-semibold text-destructive mb-2">
                    {errorTitle}
                  </h3>
                  <p className="text-muted-foreground">
                    {error instanceof Error ? error.message : String(error)}
                  </p>
                </div>
              </TableCell>
            </TableRow>
          ) : table.getRowModel().rows?.length ? (
            // Data rows
            table
              .getRowModel()
              .rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
          ) : (
            // No results
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
