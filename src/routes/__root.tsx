import { ThemeProvider } from "@/components/theme-provider"
import { Outlet, createRootRoute } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools"

export const Route = createRootRoute({
  component: () => (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Outlet />
        <TanStackRouterDevtools />
      </ThemeProvider>
    </>
  ),
})
