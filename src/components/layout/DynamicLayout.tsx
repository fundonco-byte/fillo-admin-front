"use client";

import dynamic from "next/dynamic";
import { ComponentType } from "react";

interface LayoutProps {
  children: React.ReactNode;
  title: string;
}

// Layout 컴포넌트를 dynamic import로 로드하여 SSR 문제 해결
const Layout = dynamic(() => import("./Layout"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-4 animate-pulse">
          <span className="text-xl font-bold text-white">F</span>
        </div>
        <p className="text-gray-600">로딩 중...</p>
      </div>
    </div>
  ),
}) as ComponentType<LayoutProps>;

export default Layout;
