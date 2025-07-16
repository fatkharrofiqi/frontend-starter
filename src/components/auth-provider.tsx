import { useAuthAction } from "@/hooks/actions/auth-action"
import { useAuthStore } from "@/hooks/stores/auth-store"
import { createContext, useContext, useEffect, useRef } from "react"
import { Loading } from "./ui/loading"

// Create the auth context
export interface AuthContextType {
  isAuthenticated: boolean
  isLoading: boolean
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
  const {
    refreshToken: { mutate: refreshTokenMutate },
  } = useAuthAction()
  const { isLoading, isAuthenticated } = useAuthStore()
  const refreshOnceRef = useRef(false)

  useEffect(() => {
    const refresh = () => {
      refreshOnceRef.current = true
      refreshTokenMutate()
    }

    if (!refreshOnceRef.current) {
      refresh()
    }
  }, [])

  if (isLoading) {
    return <Loading fullScreen />
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: isAuthenticated(),
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
