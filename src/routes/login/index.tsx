import { useAuthStore } from "@/hooks/stores/auth-store"
import LoginPage from "@/pages/login"
import { createFileRoute, redirect } from "@tanstack/react-router"

export const Route = createFileRoute("/login/")({
  component: LoginPage,
  beforeLoad: () => {
    const isAuthenticated = useAuthStore.getState().isAuthenticated
    const isLoading = useAuthStore.getState().isLoading
    // todo disini tidak reactive jadi setelah login dapet token gabakal bisa dicek lagi karena ga bisa rerender disnini
    console.log({
      isAuthenticated: isAuthenticated(),
      isLoadings: !isLoading,
    })
    if (isAuthenticated() && !isLoading) {
      throw redirect({
        to: "/dashboard",
        search: {
          redirect: window.location.pathname,
        },
      })
    }
  },
})
