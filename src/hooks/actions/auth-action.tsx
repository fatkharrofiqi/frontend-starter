import type { LoginPayload } from "@/dto/auth"
import AuthService from "@/services/auth-service"
import { useMutation } from "@tanstack/react-query"
import { useAuthStore } from "../stores/auth-store"

export function useAuthAction() {
  const { setAccessToken, clearAuth, setLoading } = useAuthStore()

  const login = useMutation({
    mutationFn: async ({ email, password }: LoginPayload) => {
      setLoading(true)
      return await AuthService.login(email, password)
    },
    onSuccess: ({ data }) => {
      setAccessToken(data.access_token)
      setLoading(false)
    },
    onError: (_) => {
      setAccessToken(null)
      setLoading(false)
    },
  })

  const logout = useMutation({
    mutationFn: async () => {
      return await AuthService.logout()
    },
    onSuccess: () => {
      clearAuth()
    },
    onError: (error) => {
      console.log({ error })
    },
  })

  const refreshToken = useMutation({
    mutationFn: async () => {
      return await AuthService.refreshToken()
    },
    onSuccess: ({ data }) => {
      setAccessToken(data.access_token)
      setLoading(false)
    },
    onError: (_) => {
      setAccessToken(null)
      setLoading(false)
    },
  })

  return {
    login,
    logout,
    refreshToken,
  }
}
