export interface LoginRequest {
  loginId: string;
  password: string;
}

export interface ApiResponse<T = any> {
  statusMessage: string;
  statusCode: string;
  data: T;
}

export interface AuthTokens {
  authorization?: string;
  refreshToken?: string;
}
