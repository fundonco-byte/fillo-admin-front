"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  loginApi,
  logoutApi,
  setAuthTokens,
  clearAuthTokens,
  loadAuthTokens,
} from "@/lib/api";
import { LoginRequest } from "@/types/auth";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  tokenExpiredAfterProcess: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = "fillo_admin_auth";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // 클라이언트 사이드에서만 실행
    if (typeof window !== "undefined") {
      // 페이지 로드 시 localStorage에서 인증 상태 확인
      const savedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
      if (savedAuth === "true") {
        setIsAuthenticated(true);
        // 저장된 토큰도 로드
        loadAuthTokens();
      }
    }
  }, []);

  const login = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    setIsLoading(true);

    try {
      const loginRequest: LoginRequest = {
        loginId: username,
        password: password,
      };

      const { response, tokens } = await loginApi(loginRequest);

      // 응답 검증: statusCode가 FO-200인지 확인
      if (response.statusCode === "FO-200") {
        // Authorization과 RefreshToken 헤더 존재 확인
        if (tokens.authorization && tokens.refreshToken) {
          // 토큰 저장
          setAuthTokens(tokens);

          // 인증 상태 업데이트
          setIsAuthenticated(true);
          if (typeof window !== "undefined") {
            localStorage.setItem(AUTH_STORAGE_KEY, "true");
          }

          // 대시보드로 리다이렉트
          router.push("/");

          return true;
        } else {
          // 토큰이 없으면 에러 페이지로 이동
          router.push("/error");
          return false;
        }
      } else {
        // statusCode가 FO-200이 아니면 에러 페이지로 이동
        router.push("/error");
        return false;
      }
    } catch (error) {
      console.error("로그인 에러:", error);
      // API 호출 실패시 에러 페이지로 이동
      router.push("/error");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);

      // 로그아웃 API 호출
      const response = await logoutApi();

      // 응답 검증: statusCode가 FO-200인지 확인
      if (response.statusCode === "FO-200") {
        // API 호출 성공 시 토큰 및 인증 상태 정리
        setIsAuthenticated(false);
        if (typeof window !== "undefined") {
          localStorage.removeItem(AUTH_STORAGE_KEY);
        }
        clearAuthTokens();

        // 관리자 로그인 페이지로 이동
        router.push("/");
      } else {
        // statusCode가 FO-200이 아닌 경우에도 클라이언트 정리 후 로그인 페이지로 이동
        console.warn("로그아웃 API 응답이 예상과 다릅니다:", response);
        setIsAuthenticated(false);
        if (typeof window !== "undefined") {
          localStorage.removeItem(AUTH_STORAGE_KEY);
        }
        clearAuthTokens();
        router.push("/");
      }
    } catch (error) {
      console.error("로그아웃 API 호출 실패:", error);

      // API 호출 실패시에도 클라이언트 정리 후 로그인 페이지로 이동
      setIsAuthenticated(false);
      if (typeof window !== "undefined") {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
      clearAuthTokens();
      router.push("/");
    } finally {
      setIsLoading(false);
    }
  };

  const tokenExpiredAfterProcess = async () => {
    setIsAuthenticated(false);

    // 로그아웃 API 호출
    await logoutApi();

    if (typeof window !== "undefined") {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }

    clearAuthTokens();
    router.push("/error");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        isLoading,
        tokenExpiredAfterProcess,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
