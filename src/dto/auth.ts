export interface LoginResponse {
  access_token: string
}

export interface LogoutResponse {
  message: string
}

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  email: string
  password: string
  name: string
}
