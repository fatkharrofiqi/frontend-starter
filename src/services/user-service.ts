import type { ApiResponse } from "@/dto/response"
import type { User, UserResponse, UserSearchParams } from "@/dto/user"
import { ApiService } from "@/utils/axios-instance"

export default class UserService {
  public static async getUsers(params?: UserSearchParams) {
    const searchParams = new URLSearchParams()
    
    if (params?.name) {
      searchParams.append('name', params.name)
    }
    if (params?.email) {
      searchParams.append('email', params.email)
    }
    if (params?.page !== undefined) {
      searchParams.append('page', params.page.toString())
    }
    if (params?.size !== undefined) {
      searchParams.append('size', params.size.toString())
    }
    
    const queryString = searchParams.toString()
    const url = queryString ? `users?${queryString}` : 'users'
    
    return await ApiService.get<ApiResponse<User[]>>(url)
  }

  public static async getUser(uuid: string) {
    return await ApiService.get<ApiResponse<UserResponse>>(`users/${uuid}`)
  }

  public static async createUser(
    userData: Omit<User, "uuid" | "created_at" | "updated_at">,
  ) {
    return await ApiService.post<ApiResponse<UserResponse>>("users", userData)
  }

  public static async updateUser(
    uuid: string,
    userData: Partial<Omit<User, "uuid" | "created_at" | "updated_at">>,
  ) {
    return await ApiService.put<ApiResponse<UserResponse>>(
      `users/${uuid}`,
      userData,
    )
  }

  public static async deleteUser(uuid: string) {
    return await ApiService.delete(`users/${uuid}`)
  }
}
