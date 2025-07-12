import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/setting/permission')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_auth/setting/permission"!</div>
}
