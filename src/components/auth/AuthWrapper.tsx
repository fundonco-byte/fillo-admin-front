"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import LoginPage from "./LoginPage";

interface AuthWrapperProps {
  children: React.ReactNode;
}

// 인증이 필요하지 않은 페이지 경로들
const PUBLIC_ROUTES = ["/error"];

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    // 인증 상태 확인 후 로딩 상태 해제
    setIsLoading(false);
  }, [isAuthenticated]);

  // 현재 경로가 공개 라우트인지 확인
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  // 로딩 중에는 로딩 스피너 표시
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-4 animate-pulse">
            <span className="text-xl font-bold text-white">F</span>
          </div>
          <p className="text-gray-600">로딩 중...</p>
        </div>
      </div>
    );
  }

  // 공개 라우트인 경우 인증 없이 접근 허용
  if (isPublicRoute) {
    return <>{children}</>;
  }

  // 인증되지 않은 경우 로그인 페이지 표시
  if (!isAuthenticated) {
    return <LoginPage />;
  }

  // 인증된 경우 메인 컨텐츠 표시
  return <>{children}</>;
};

export default AuthWrapper;
