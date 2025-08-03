import { Button } from "@/components/ui/button"
import type { UserSearchParams } from "@/dto/user"
import { Link } from "@tanstack/react-router"
import { PlusCircle } from "lucide-react"
import { useState } from "react"
import { UserTable } from "./table"

export default function UserPage() {
  const [searchParams] = useState<UserSearchParams>({
    page: 1,
    size: 10,
  })

  return (
    <div className="container mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Users</h1>
          <p className="text-muted-foreground">
            Manage and view all users in the system.
          </p>
        </div>
        <Button asChild>
          <Link
            to="/user/form"
            viewTransition={{ types: ["slide-right"] }}
            className="flex items-center gap-2"
          >
            <PlusCircle size={16} />
            Add User
          </Link>
        </Button>
      </div>

      <UserTable initialSearchParams={searchParams} />
    </div>
  )
}
