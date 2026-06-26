export interface ApiErrorResponse {
  message?: string
}

export interface ApiMessageResponse {
  message: string
}

export interface Credentials {
  username: string
  password: string
}

export interface SessionCheckResponse {
  valid: boolean
}
