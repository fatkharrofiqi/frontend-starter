import type { UserSearchParams } from "@/dto/user"
import { useState } from "react"
import { UserTable } from "./table"

export default function UserPage() {
  const [searchParams] = useState<UserSearchParams>({
    page: 1,
    size: 10,
  })

  return (
    <div className="container mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Users</h1>
        <p className="text-muted-foreground">
          Manage and view all users in the system.
        </p>
      </div>

      <UserTable initialSearchParams={searchParams} />
    </div>
  )
}
