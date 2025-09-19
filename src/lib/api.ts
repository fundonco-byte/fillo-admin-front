"use client";

import { LoginRequest, ApiResponse, AuthTokens } from "@/types/auth";

const API_BASE_URL = "http://1.234.75.29:8094";

// 토큰 저장소
let authTokens: AuthTokens = {};

// 토큰 설정 함수
export const setAuthTokens = (tokens: AuthTokens) => {
  authTokens = tokens;

  // localStorage에도 저장
  if (typeof window !== "undefined") {
    if (tokens.authorization) {
      localStorage.setItem("authorization", tokens.authorization);
    }
    if (tokens.refreshToken) {
      localStorage.setItem("refreshToken", tokens.refreshToken);
    }
  }
};

// 토큰 제거 함수
export const clearAuthTokens = () => {
  authTokens = {};

  if (typeof window !== "undefined") {
    localStorage.removeItem("authorization");
    localStorage.removeItem("refreshToken");
  }
};

// 토큰 로드 함수
export const loadAuthTokens = () => {
  if (typeof window !== "undefined") {
    const authorization = localStorage.getItem("authorization");
    const refreshToken = localStorage.getItem("refreshToken");

    if (authorization || refreshToken) {
      authTokens = {
        authorization: authorization || undefined,
        refreshToken: refreshToken || undefined,
      };
    }
  }
};

// API 요청 헤더 생성
export const createHeaders = (includeAuth = true): Record<string, string> => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (includeAuth && authTokens.authorization) {
    headers["Authorization"] = authTokens.authorization;
  }

  if (includeAuth && authTokens.refreshToken) {
    headers["RefreshToken"] = authTokens.refreshToken;
  }

  return headers;
};

// 로그인 API
export const loginApi = async (
  loginData: LoginRequest
): Promise<{ response: ApiResponse; tokens: AuthTokens }> => {
  const response = await fetch(`${API_BASE_URL}/api/v1/admin/login`, {
    method: "POST",
    headers: createHeaders(false), // 로그인 시에는 인증 헤더 불필요
    body: JSON.stringify(loginData),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data: ApiResponse = await response.json();

  // 응답 헤더에서 토큰 추출
  const tokens: AuthTokens = {
    authorization: response.headers.get("Authorization") || undefined,
    refreshToken: response.headers.get("RefreshToken") || undefined,
  };

  return { response: data, tokens };
};

// 일반 API 요청 함수 (이후 다른 API 호출시 사용)
export const apiRequest = async <T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> => {
  // 토큰이 메모리에 없으면 localStorage에서 로드
  if (!authTokens.authorization && !authTokens.refreshToken) {
    loadAuthTokens();
  }

  const url = endpoint.startsWith("http")
    ? endpoint
    : `${API_BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...createHeaders(),
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(
        `HTTP error! status: ${response.status} - ${response.statusText}`
      );
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error(
        `서버가 JSON이 아닌 응답을 반환했습니다. Content-Type: ${contentType}`
      );
    }

    return response.json();
  } catch (error) {
    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new Error(
        "서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요."
      );
    }
    throw error;
  }
};

// 로그아웃 API
export const logoutApi = async (): Promise<ApiResponse> => {
  // 토큰이 메모리에 없으면 localStorage에서 로드
  if (!authTokens.authorization && !authTokens.refreshToken) {
    loadAuthTokens();
  }

  const response = await fetch(`${API_BASE_URL}/api/v1/admin/logout`, {
    method: "DELETE",
    headers: createHeaders(true), // 인증 헤더 포함
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data: ApiResponse = await response.json();
  return data;
};

// 토큰 상태 확인 함수 (디버깅용)
export const getAuthTokensStatus = () => {
  return {
    memoryTokens: authTokens,
    localStorageTokens:
      typeof window !== "undefined"
        ? {
            authorization: localStorage.getItem("authorization"),
            refreshToken: localStorage.getItem("refreshToken"),
          }
        : null,
  };
};
