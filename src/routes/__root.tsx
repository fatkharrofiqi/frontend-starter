import type { AuthContextType } from "@/components/auth-provider"
import { ThemeProvider } from "@/components/theme-provider"
import { Loading } from "@/components/ui/loading"
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools"

interface MyRouterContext {
  auth: AuthContextType
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Outlet />
        <TanStackRouterDevtools />
      </ThemeProvider>
    </>
  ),
  pendingComponent: () => <Loading fullScreen />,
})
