"use client";

import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { LogIn, User, Lock, AlertCircle } from "lucide-react";
import Image from "next/image";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = login(username, password);
    if (!isValid) {
      setShowError(true);
      // 3초 후 에러 메시지 자동 숨김
      setTimeout(() => setShowError(false), 3000);
    }
  };

  const handleCloseError = () => {
    setShowError(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      {/* 에러 다이얼로그 */}
      {showError && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full mx-4 shadow-2xl">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-red-100 rounded-full">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                로그인 실패
              </h3>
            </div>
            <p className="text-gray-600 mb-6">
              존재하지 않는 관리자 계정입니다
            </p>
            <button
              onClick={handleCloseError}
              className="w-full bg-red-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-700 transition-colors duration-200"
            >
              확인
            </button>
          </div>
        </div>
      )}

      {/* 로그인 폼 */}
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* 로고 영역 */}
          <div className="text-center mb-8">
            <div className="inline-block mb-4">
              <Image
                src="/fillo-logo.svg"
                alt="Fillo Logo"
                width={80}
                height={80}
                className="mx-auto"
              />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Fillo</h1>
            <p className="text-gray-600">관리자 로그인</p>
          </div>

          {/* 로그인 폼 */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 아이디 입력 */}
            <div className="space-y-2">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                관리자 아이디
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200"
                  placeholder="관리자 아이디를 입력하세요"
                  required
                />
              </div>
            </div>

            {/* 비밀번호 입력 */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                비밀번호
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200"
                  placeholder="비밀번호를 입력하세요"
                  required
                />
              </div>
            </div>

            {/* 로그인 버튼 */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <LogIn className="w-5 h-5" />
              <span>로그인</span>
            </button>
          </form>

          {/* 하단 텍스트 */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              스포츠 팬덤 모임 플랫폼 관리자 시스템
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
