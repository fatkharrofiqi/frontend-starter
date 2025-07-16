import LoginPage from "@/pages/login"
import { createFileRoute, redirect } from "@tanstack/react-router"

export const Route = createFileRoute("/login/")({
  component: LoginPage,
  beforeLoad: ({ context: { auth } }) => {
    if (auth.isAuthenticated && !auth.isLoading) {
      throw redirect({
        to: window.location.search || "/dashboard",
      })
    }
  },
})
