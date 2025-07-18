import { DataTable } from "@/components/ui/data-table"
import { Pagination } from "@/components/ui/pagination"
import type { UserSearchParams } from "@/dto/user"
import { useUserAction } from "@/hooks/actions/user-action"
import { SearchForm } from "@/pages/user/form/search-form"
import { useState } from "react"
import { columns } from "./columns"

interface UserTableProps {
  initialSearchParams?: UserSearchParams
}

const searchFields = [
  {
    key: "name",
    label: "Name",
    placeholder: "Search by name...",
  },
  {
    key: "email",
    label: "Email",
    placeholder: "Search by email...",
  },
]

export function UserTable({
  initialSearchParams = { page: 1, size: 10 },
}: UserTableProps) {
  const { getUsers } = useUserAction()
  const [searchParams, setSearchParams] =
    useState<UserSearchParams>(initialSearchParams)

  const { data: response, isLoading, error } = getUsers(searchParams)
  const users = response?.data || []
  const paging = response?.paging

  const handleSearch = (searchValues: Record<string, string>) => {
    setSearchParams({
      ...searchParams,
      name: searchValues.name || undefined,
      email: searchValues.email || undefined,
      page: 1, // Reset to first page when searching
    })
  }

  const handleClearSearch = () => {
    setSearchParams({ page: 1, size: searchParams.size })
  }

  const handlePageChange = (newPage: number) => {
    setSearchParams({
      ...searchParams,
      page: newPage,
    })
  }

  const handlePageSizeChange = (newSize: number) => {
    setSearchParams({
      ...searchParams,
      size: newSize,
      page: 1, // Reset to first page when changing size
    })
  }

  return (
    <div>
      <SearchForm
        fields={searchFields}
        onSearch={handleSearch}
        onClear={handleClearSearch}
        initialValues={{
          name: searchParams.name || "",
          email: searchParams.email || "",
        }}
      />

      <DataTable
        columns={columns}
        data={users}
        isLoading={isLoading}
        error={error}
        errorTitle="Error Loading Users"
      />

      {paging && !isLoading && !error && (
        <Pagination
          paging={paging}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      )}
    </div>
  )
}
