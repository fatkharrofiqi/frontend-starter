import { useAuthStore } from "@/hooks/stores/auth-store"
import { Navigate, useRouter } from "@tanstack/react-router"

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore()
  const router = useRouter()
  const location = router.state.location.pathname

  // Redirect to login if not authenticated
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace search={{ from: location }} />
  }

  return <>{children}</>
}
