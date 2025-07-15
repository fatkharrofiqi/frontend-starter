import { useAuthAction } from "@/hooks/actions/auth-action"
import { useAuthStore } from "@/hooks/stores/auth-store"
import { useEffect } from "react"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const {
    refreshToken: { mutate },
  } = useAuthAction()
  const { isLoading } = useAuthStore()

  useEffect(() => {
    const refresh = () => {
      mutate()
    }

    refresh()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
      </div>
    )
  }

  return <>{children}</>
}
