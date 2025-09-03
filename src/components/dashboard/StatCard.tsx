"use client";

import { LucideIcon } from "lucide-react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  changeType: "increase" | "decrease";
  icon: LucideIcon;
  color: "blue" | "green" | "purple" | "pink" | "yellow" | "orange";
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  color,
}) => {
  const colorClasses = {
    blue: {
      bg: "bg-blue-50",
      text: "text-blue-600",
      icon: "bg-blue-100 text-blue-600",
    },
    green: {
      bg: "bg-green-50",
      text: "text-green-600",
      icon: "bg-green-100 text-green-600",
    },
    purple: {
      bg: "bg-purple-50",
      text: "text-purple-600",
      icon: "bg-purple-100 text-purple-600",
    },
    pink: {
      bg: "bg-pink-50",
      text: "text-pink-600",
      icon: "bg-pink-100 text-pink-600",
    },
    yellow: {
      bg: "bg-yellow-50",
      text: "text-yellow-600",
      icon: "bg-yellow-100 text-yellow-600",
    },
    orange: {
      bg: "bg-orange-50",
      text: "text-orange-600",
      icon: "bg-orange-100 text-orange-600",
    },
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-card hover:shadow-soft transition-all duration-300 hover:-translate-y-1 animate-scale-in">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl ${colorClasses[color].icon}`}>
          <Icon size={24} />
        </div>
        <div className="flex items-center space-x-1">
          {changeType === "increase" ? (
            <TrendingUp size={16} className="text-green-500" />
          ) : (
            <TrendingDown size={16} className="text-red-500" />
          )}
          <span
            className={`text-sm font-semibold ${
              changeType === "increase" ? "text-green-500" : "text-red-500"
            }`}
          >
            {changeType === "increase" ? "+" : "-"}
            {change}
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
          {title}
        </h3>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-xs text-gray-500">지난 주 대비</p>
      </div>
    </div>
  );
};

export default StatCard;
