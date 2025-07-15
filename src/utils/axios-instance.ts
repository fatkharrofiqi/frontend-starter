import { useAuthStore } from "@/hooks/stores/auth-store"
import AuthService from "@/services/auth-service"
import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios"

class AxiosService {
  private static instance: AxiosService | null = null // Singleton instance
  private axiosInstance: AxiosInstance // Axios instance

  private constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    })

    // Set up interceptors
    this.initializeRequestInterceptor()
    this.initializeResponseInterceptor()
  }

  /**
   * Method to get the singleton instance
   */
  public static getInstance(baseURL: string): AxiosService {
    if (!AxiosService.instance) {
      AxiosService.instance = new AxiosService(baseURL)
    }
    return AxiosService.instance
  }

  /**
   * Initialize request interceptor
   */
  private initializeRequestInterceptor(): void {
    this.axiosInstance.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        // Get token from auth store instead of hardcoded empty string
        const token = useAuthStore.getState().accessToken
        if (token) {
          config.headers.Accept = "application/json"
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      },
    )
  }

  /**
   * Initialize response interceptor
   */
  private initializeResponseInterceptor(): void {
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        return response
      },
      async (error) => {
        const originalRequest = error.config
        // If error is 401 and not a refresh token request and not already retried
        if (
          error.response?.status === 401 &&
          !originalRequest.url.includes("/auth/refresh-token") &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true

          try {
            // Try to refresh the token
            const { data } = await AuthService.refreshToken()
            useAuthStore.getState().setAccessToken(data.access_token)

            // Update the authorization header
            originalRequest.headers.Authorization = `Bearer ${data.access_token}`

            // Retry the original request
            return this.axiosInstance(originalRequest)
          } catch (refreshError) {
            // If refresh fails, logout and redirect to login
            useAuthStore.getState().clearAuth()
            return Promise.reject(refreshError)
          }
        }

        return Promise.reject(error)
      },
    )
  }

  /**
   * GET request
   */
  public get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.axiosInstance
      .get<T>(url, config)
      .then((response: AxiosResponse<T>) => response.data)
  }

  /**
   * GET request with api-token
   */
  public async getWithApiToken<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const apiToken = ""
    return this.axiosInstance
      .get<T>(url, {
        ...config,
        headers: {
          ...config?.headers,
          "x-api-token": apiToken,
        },
      })
      .then((response: AxiosResponse<T>) => response.data)
  }

  /**
   * POST request
   */
  public post<T>(
    url: string,
    data?: {},
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return this.axiosInstance
      .post<T>(url, data, {
        ...config,
        withCredentials: true,
      })
      .then((response: AxiosResponse<T>) => response.data)
  }

  /**
   * PUT request
   */
  public put<T>(
    url: string,
    data?: {},
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return this.axiosInstance
      .put<T>(url, data, config)
      .then((response: AxiosResponse<T>) => response.data)
  }

  /**
   * DELETE request
   */
  public delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.axiosInstance
      .delete<T>(url, config)
      .then((response: AxiosResponse<T>) => response.data)
  }
}

export const ApiService = AxiosService.getInstance(
  import.meta.env.VITE_APP_URL || "",
)
