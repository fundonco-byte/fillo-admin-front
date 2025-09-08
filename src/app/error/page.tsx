"use client";

import React from "react";
import { AlertTriangle, Home, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const ErrorPage: React.FC = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* 에러 아이콘 */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6">
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>

          {/* 에러 메시지 */}
          <h1 className="text-2xl font-bold text-gray-900 mb-4">접근 오류</h1>

          <p className="text-gray-600 mb-8 leading-relaxed">
            잘못된 접근입니다.
            <br />
            로그인 정보를 확인하거나
            <br />
            관리자에게 문의해주세요.
          </p>

          {/* 액션 버튼들 */}
          <div className="space-y-3">
            <button
              onClick={handleGoBack}
              className="w-full bg-gray-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-700 transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>이전 페이지</span>
            </button>

            <button
              onClick={handleGoHome}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <Home className="w-5 h-5" />
              <span>로그인 페이지</span>
            </button>
          </div>

          {/* 문의 정보 */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              문제가 지속되면 시스템 관리자에게 문의하세요
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
