"use client";

import { Bell, Search, Settings, User, Menu, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useRef, useEffect } from "react";

interface HeaderProps {
  title: string;
  onMenuToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, onMenuToggle }) => {
  const { logout } = useAuth();
  const [showLogoutDropdown, setShowLogoutDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    try {
      await logout();
      setShowLogoutDropdown(false);
    } catch (error) {
      console.error("로그아웃 처리 중 오류:", error);
      setShowLogoutDropdown(false);
    }
  };

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowLogoutDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white shadow-card border-b border-gray-100 px-4 lg:px-6 py-4 sticky top-0 z-30">
      <div className="flex items-center justify-between">
        {/* Left side - Mobile menu + Title */}
        <div className="flex items-center space-x-4">
          {/* Mobile menu button */}
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu size={20} className="text-gray-600" />
          </button>

          <div>
            <h1 className="text-xl lg:text-2xl font-bold text-gray-900">
              {title}
            </h1>
            <p className="text-sm text-gray-500 hidden lg:block">
              {new Date().toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "long",
                day: "numeric",
                weekday: "long",
              })}
            </p>
          </div>
        </div>

        {/* Right side - Search and actions */}
        <div className="flex items-center space-x-3 lg:space-x-4">
          {/* Search bar */}
          <div className="relative hidden md:block">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="검색..."
              className="w-48 lg:w-64 pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 text-sm"
            />
          </div>

          {/* Search button for mobile */}
          <button className="md:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
            <Search size={20} />
          </button>

          {/* Notification button */}
          <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
              3
            </span>
          </button>

          {/* Settings button */}
          <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
            <Settings size={20} />
          </button>

          {/* Profile dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowLogoutDropdown(!showLogoutDropdown)}
              className="flex items-center space-x-2 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-sm">
                <User size={16} className="text-white" />
              </div>
              <span className="hidden lg:block text-sm font-medium text-gray-700">
                관리자
              </span>
            </button>

            {/* Logout dropdown */}
            {showLogoutDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <LogOut size={16} />
                  <span>로그아웃</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
