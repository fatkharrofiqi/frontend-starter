import { useAuthAction } from "@/hooks/actions/auth-action"
import { useAuthStore } from "@/hooks/stores/auth-store"
import { createContext, useContext, useEffect, useRef, useState } from "react"
import { Loading } from "./ui/loading"

// Create the auth context
export interface AuthContextType {
  isAuthenticated: boolean
  isInitialLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const refreshOnceRef = useRef(false)
  const { refreshToken } = useAuthAction()
  const { isAuthenticated } = useAuthStore()

  useEffect(() => {
    const refresh = async () => {
      refreshOnceRef.current = true
      try {
        await refreshToken.mutateAsync()
      } finally {
        setIsInitialLoading(false)
      }
    }

    if (!refreshOnceRef.current) {
      refresh()
    }
  }, [])

  // Only show loading screen during initial token refresh / refresh browser
  if (isInitialLoading) {
    return <Loading fullScreen />
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: isAuthenticated(),
        isInitialLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
