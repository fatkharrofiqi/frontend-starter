import { AuthProvider } from "@/components/auth-provider"
import { ThemeProvider } from "@/components/theme-provider"
import { Outlet, createRootRoute } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools"

export const Route = createRootRoute({
  component: () => (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AuthProvider>
          <Outlet />
          <TanStackRouterDevtools />
        </AuthProvider>
      </ThemeProvider>
    </>
  ),
})
