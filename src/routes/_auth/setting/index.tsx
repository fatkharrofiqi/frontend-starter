import { Link, createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_auth/setting/")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Settings</h3>
        <p className="text-sm text-muted-foreground">
          Manage your application settings and preferences.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border p-4 hover:bg-accent">
          <h4 className="text-md font-medium">Roles</h4>
          <p className="text-sm text-muted-foreground">
            Manage user roles and permissions
          </p>
          <Link
            to="/setting/role"
            className="text-sm text-primary hover:underline mt-2 inline-block"
          >
            View roles →
          </Link>
        </div>
        <div className="rounded-lg border p-4 hover:bg-accent">
          <h4 className="text-md font-medium">Permissions</h4>
          <p className="text-sm text-muted-foreground">
            Configure system permissions
          </p>
          <Link
            to="/setting/permission"
            className="text-sm text-primary hover:underline mt-2 inline-block"
          >
            View permissions →
          </Link>
        </div>
      </div>
    </div>
  )
}
