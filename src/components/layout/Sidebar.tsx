"use client";

import {
  Home,
  ShoppingCart,
  Package,
  Users,
  Boxes,
  BarChart3,
  Megaphone,
  Settings,
  X,
  ChevronRight,
} from "lucide-react";
import { clsx } from "clsx";

interface SidebarProps {
  activeItem: string;
  onItemClick: (item: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const menuItems = [
  { id: "dashboard", label: "대시보드", icon: Home },
  // { id: "orders", label: "주문 관리", icon: ShoppingCart },
  // { id: "categories", label: "카테고리 관리", icon: Package },
  // { id: "products", label: "상품 관리", icon: Package },
  // { id: "banners", label: "배너 관리", icon: Package },
  // { id: "coupons", label: "쿠폰 관리", icon: Package },
  // { id: "events", label: "이벤트 관리", icon: Package },
  { id: "customers", label: "회원 관리", icon: Users },
  // { id: "reviews", label: "리뷰 관리", icon: Users },
  // { id: "inventory", label: "재고 관리", icon: Boxes },
  // { id: "orders-payments", label: "주문/결제 관리", icon: Boxes },
  // { id: "orders-cancel", label: "주문취소 관리", icon: Boxes },
  // { id: "notices", label: "공지사항 관리", icon: Boxes },
  // { id: "inquiries", label: "문의 관리", icon: Boxes },
  // { id: "faqs", label: "FAQ 관리", icon: Boxes },
  // { id: "analytics", label: "매출 분석", icon: BarChart3 },
  // { id: "marketing", label: "마케팅", icon: Megaphone },
  { id: "settings", label: "설정", icon: Settings },
];

const Sidebar: React.FC<SidebarProps> = ({
  activeItem,
  onItemClick,
  isOpen,
  onToggle,
}) => {
  const handleItemClick = (itemId: string) => {
    onItemClick(itemId);
    // 모바일에서는 메뉴 선택 시 사이드바 닫기
    if (window.innerWidth < 1024) {
      onToggle();
    }
  };

  return (
    <div
      className={clsx(
        "fixed left-0 top-0 h-full w-64 bg-white shadow-lg z-50 transition-transform duration-300 ease-in-out flex flex-col",
        "lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-100 flex-shrink-0">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-sm">
            <span className="text-white font-bold text-lg">F</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Fillo</h1>
            <p className="text-xs text-gray-500">Admin Dashboard</p>
          </div>
        </div>

        {/* Close button - mobile only */}
        <button
          onClick={onToggle}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X size={20} className="text-gray-500" />
        </button>
      </div>

      {/* Menu Items - Scrollable */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;

          return (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className={clsx(
                "w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-all duration-200 group",
                isActive
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <div className="flex items-center space-x-3">
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </div>
              <ChevronRight
                size={16}
                className={clsx(
                  "transition-transform duration-200",
                  isActive
                    ? "text-white"
                    : "text-gray-400 group-hover:text-gray-600"
                )}
              />
            </button>
          );
        })}
      </nav>

      {/* User Profile - Fixed at bottom */}
      <div className="p-4 border-t border-gray-100 flex-shrink-0">
        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
          <div className="w-10 h-10 bg-gradient-secondary rounded-full flex items-center justify-center shadow-sm">
            <span className="text-white font-bold text-sm">A</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-900">관리자</p>
            <p className="text-xs text-gray-500">admin@fillo.com</p>
          </div>
          <ChevronRight size={16} className="text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
