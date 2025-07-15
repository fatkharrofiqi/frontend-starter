import { dummyUsers } from "@/models/user"
import { columns } from "./table/columns"
import { DataTable } from "./table/data-table"

export default function UserPage() {
  return (
    <div className="container mx-auto">
      <DataTable columns={columns} data={dummyUsers} />
    </div>
  )
}