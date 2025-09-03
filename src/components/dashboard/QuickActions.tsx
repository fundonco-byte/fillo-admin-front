"use client";

import {
  Plus,
  Package,
  Users,
  BarChart3,
  Settings,
  ArrowRight,
} from "lucide-react";

interface QuickActionsProps {
  onActionClick: (action: string) => void;
}

const quickActions = [
  {
    id: "add-product",
    label: "상품 추가",
    description: "새로운 상품 등록",
    icon: Package,
    color: "bg-blue-500",
    hoverColor: "hover:bg-blue-600",
  },
  {
    id: "new-customer",
    label: "고객 등록",
    description: "신규 고객 추가",
    icon: Users,
    color: "bg-green-500",
    hoverColor: "hover:bg-green-600",
  },
  {
    id: "view-analytics",
    label: "분석 보기",
    description: "매출 분석 확인",
    icon: BarChart3,
    color: "bg-purple-500",
    hoverColor: "hover:bg-purple-600",
  },
  {
    id: "settings",
    label: "설정",
    description: "시스템 설정",
    icon: Settings,
    color: "bg-gray-500",
    hoverColor: "hover:bg-gray-600",
  },
];

const QuickActions: React.FC<QuickActionsProps> = ({ onActionClick }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-card animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900">빠른 액션</h3>
          <p className="text-sm text-gray-500">자주 사용하는 기능</p>
        </div>
        <Plus size={20} className="text-gray-400" />
      </div>

      <div className="grid grid-cols-1 gap-4">
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              onClick={() => onActionClick(action.id)}
              className="flex items-center p-4 rounded-lg border-2 border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all duration-200 group text-left"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div
                className={`p-3 rounded-xl ${action.color} ${action.hoverColor} transition-colors duration-200 shadow-sm`}
              >
                <Icon size={20} className="text-white" />
              </div>
              <div className="ml-4 flex-1">
                <h4 className="font-semibold text-gray-900 group-hover:text-gray-800">
                  {action.label}
                </h4>
                <p className="text-sm text-gray-500 group-hover:text-gray-600">
                  {action.description}
                </p>
              </div>
              <ArrowRight
                size={16}
                className="text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-200"
              />
            </button>
          );
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100">
        <button className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors duration-200">
          <Plus size={16} />
          <span className="font-medium">더 많은 작업</span>
        </button>
      </div>
    </div>
  );
};

export default QuickActions;
