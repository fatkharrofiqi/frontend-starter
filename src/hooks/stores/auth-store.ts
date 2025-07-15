import { create } from "zustand"

export interface AuthState {
  accessToken: string | null
  isLoading: boolean
}

type AuthActionState = {
  setAccessToken: (accessToken: string | null) => void
  isAuthenticated: () => boolean
  clearAuth: () => void
  setLoading: (isLoading: boolean) => void
}

export const useAuthStore = create<AuthState & AuthActionState>((set, get) => ({
  accessToken: null,
  isLoading: true,
  setAccessToken: (accessToken: string | null) => {
    set({ accessToken })
  },
  isAuthenticated: () => {
    return get().accessToken !== null
  },
  setLoading: (isLoading: boolean) => {
    set({ isLoading })
  },
  clearAuth: () => {
    set({ accessToken: null, isLoading: false })
  },
}))
