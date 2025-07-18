import { Badge } from "@/components/ui/badge"
import type { User } from "@/dto/user"
import type { ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "roles",
    header: "Roles",
    cell: ({ row }) => {
      const roles = row.getValue("roles") as User["roles"]
      return (
        <div className="flex flex-wrap gap-1">
          {roles?.map((role) => (
            <Badge key={role.name} variant="secondary">
              {role.name}
            </Badge>
          ))}
        </div>
      )
    },
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => {
      const timestamp = row.getValue("created_at") as number
      return new Date(timestamp * 1000).toLocaleDateString()
    },
  },
]
