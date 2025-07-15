import type { LoginResponse } from "@/models/auth-model"
import type { ApiResponse } from "@/models/response-model"
import { ApiService } from "@/utils/axios-instance"

export default class AuthService {
  public static async login(email: string, password: string) {
    return await ApiService.post<ApiResponse<LoginResponse>>("/auth/login", {
      email,
      password,
    })
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
