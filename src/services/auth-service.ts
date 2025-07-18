import type { LoginResponse, RegisterPayload } from "@/dto/auth"
import type { ApiResponse } from "@/dto/response"
import { ApiService } from "@/utils/axios-instance"

export default class AuthService {
  public static async login(email: string, password: string) {
    return await ApiService.post<ApiResponse<LoginResponse>>("/auth/login", {
      email,
      password,
    })
  }

  public static async register(payload: RegisterPayload) {
    return await ApiService.post<ApiResponse<LoginResponse>>(
      "/auth/register",
      payload,
    )
  }

  public static async logout() {
    return await ApiService.post("/auth/logout")
  }

  public static async refreshToken() {
    return await ApiService.post<ApiResponse<LoginResponse>>(
      "/auth/refresh-token",
    )
  }
}
