"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import Header from "./Header";

interface LayoutProps {
  children: React.ReactNode;
  title: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  const [activeMenuItem, setActiveMenuItem] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // 현재 경로에 따라 활성화된 메뉴 설정
  useEffect(() => {
    if (pathname === "/") {
      setActiveMenuItem("dashboard");
    } else if (pathname === "/categories") {
      setActiveMenuItem("categories");
    } else if (pathname.startsWith("/products")) {
      setActiveMenuItem("products");
    } else if (pathname.startsWith("/banners")) {
      setActiveMenuItem("banners");
    } else if (pathname.startsWith("/events")) {
      setActiveMenuItem("events");
    } else if (pathname.startsWith("/reviews")) {
      setActiveMenuItem("reviews");
    } else if (pathname.startsWith("/inquiries")) {
      setActiveMenuItem("inquiries");
    } else if (pathname.startsWith("/announcements")) {
      setActiveMenuItem("notices");
    } else if (pathname.startsWith("/faqs")) {
      setActiveMenuItem("faqs");
    } else if (pathname.startsWith("/customers")) {
      setActiveMenuItem("customers");
    }
    // 추후 다른 경로들도 추가할 수 있음
  }, [pathname]);

  const handleMenuItemClick = (itemId: string) => {
    setActiveMenuItem(itemId);

    // 라우팅 처리
    switch (itemId) {
      case "dashboard":
        router.push("/");
        break;
      case "categories":
        router.push("/categories");
        break;
      case "products":
        router.push("/products");
        break;
      case "banners":
        router.push("/banners");
        break;
      case "events":
        router.push("/events");
        break;
      case "reviews":
        router.push("/reviews");
        break;
      case "inquiries":
        router.push("/inquiries");
        break;
      case "notices":
        router.push("/announcements");
        break;
      case "faqs":
        router.push("/faqs");
        break;
      case "customers":
        router.push("/customers");
        break;
      // 추후 다른 메뉴들도 추가할 수 있음
      default:
        // 기본적으로는 아무것도 하지 않음
        break;
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        activeItem={activeMenuItem}
        onItemClick={handleMenuItemClick}
        isOpen={isSidebarOpen}
        onToggle={toggleSidebar}
      />

      {/* Main content area */}
      <div className="lg:ml-64 flex flex-col min-h-screen transition-all duration-300">
        {/* Header */}
        <Header title={title} onMenuToggle={toggleSidebar} />

        {/* Main content */}
        <main className="flex-1 p-4 lg:p-6 bg-gray-50 main-content">
          <div className="max-w-7xl mx-auto">
            <div className="animate-fade-in">{children}</div>
          </div>
        </main>
      </div>

      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Layout;
