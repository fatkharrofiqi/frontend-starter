import { AuthLayout } from "@/components/layout/auth"
import { Loading } from "@/components/ui/loading"
import { createFileRoute, redirect } from "@tanstack/react-router"

export const Route = createFileRoute("/_auth")({
  component: () => <AuthLayout />,
  pendingComponent: () => <Loading fullScreen />,
  beforeLoad: ({ context: { auth } }) => {
    if (!auth.isAuthenticated && !auth.isInitialLoading) {
      throw redirect({
        to: "/login",
        search: {
          from: window.location.pathname,
        },
      })
    }
  },
})
