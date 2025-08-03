import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface PaginationInfo {
  page: number
  size: number
  total_item: number
  total_page: number
}

interface PaginationProps {
  paging: PaginationInfo
  onPageChange: (page: number) => void
  onPageSizeChange: (size: number) => void
  pageSizeOptions?: number[]
}

export function Pagination({
  paging,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [5, 10, 20, 50],
}: PaginationProps) {
  return (
    <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
      {/* Information about results count - hidden on mobile */}
      <div className="hidden md:flex md:items-center md:gap-2">
        <span className="text-sm text-muted-foreground">
          Showing {(paging.page - 1) * paging.size + 1} to{" "}
          {Math.min(paging.page * paging.size, paging.total_item)} of{" "}
          {paging.total_item} results
        </span>
      </div>

      {/* Pagination controls */}
      <div className="w-full md:w-auto flex flex-col md:flex-row md:items-center gap-2">
        {/* On mobile, display page info at the top */}
        <div className="flex justify-between items-center mb-2 md:hidden">
          <span className="text-sm text-muted-foreground">
            {paging.total_item} results
          </span>
          <span className="text-sm">
            Page {paging.page} of {paging.total_page}
          </span>
        </div>

        {/* Navigation controls and page size */}
        <div className="flex flex-col md:flex-row w-full md:w-auto md:items-center gap-2">
          {/* Navigation buttons */}
          <div className="flex w-full md:w-auto items-center gap-2">
            <Button
              onClick={() => onPageChange(paging.page - 1)}
              disabled={paging.page <= 1}
              variant="outline"
              size="default"
              className="flex-1 md:flex-none"
            >
              Previous
            </Button>

            <span className="hidden md:inline-block px-3 py-1 text-sm">
              Page {paging.page} of {paging.total_page}
            </span>

            <Button
              onClick={() => onPageChange(paging.page + 1)}
              disabled={paging.page >= paging.total_page}
              variant="outline"
              size="default"
              className="flex-1 md:flex-none"
            >
              Next
            </Button>
          </div>

          {/* Select for page size */}
          <Select
            value={paging.size.toString()}
            onValueChange={(value) => onPageSizeChange(Number(value))}
          >
            <SelectTrigger className="w-full md:w-[130px]" size="default">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {pageSizeOptions.map((size) => (
                <SelectItem key={size} value={size.toString()}>
                  {size} per page
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
