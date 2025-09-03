"use client";

import {
  ShoppingBag,
  CreditCard,
  Truck,
  ChevronRight,
  Clock,
} from "lucide-react";

interface Transaction {
  id: string;
  type: "order" | "refund" | "shipping";
  title: string;
  subtitle: string;
  amount: string;
  isPositive: boolean;
  date: string;
}

interface RecentTransactionsProps {
  transactions: Transaction[];
}

const RecentTransactions: React.FC<RecentTransactionsProps> = ({
  transactions,
}) => {
  const getIcon = (type: Transaction["type"]) => {
    switch (type) {
      case "order":
        return <ShoppingBag size={20} className="text-blue-600" />;
      case "refund":
        return <CreditCard size={20} className="text-orange-600" />;
      case "shipping":
        return <Truck size={20} className="text-green-600" />;
      default:
        return <ShoppingBag size={20} className="text-blue-600" />;
    }
  };

  const getIconBg = (type: Transaction["type"]) => {
    switch (type) {
      case "order":
        return "bg-blue-50 border-blue-100";
      case "refund":
        return "bg-orange-50 border-orange-100";
      case "shipping":
        return "bg-green-50 border-green-100";
      default:
        return "bg-blue-50 border-blue-100";
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-card animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900">최근 거래</h3>
          <p className="text-sm text-gray-500">실시간 거래 현황</p>
        </div>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1">
          <span>전체보기</span>
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="space-y-4">
        {transactions.map((transaction, index) => (
          <div
            key={transaction.id}
            className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div
              className={`p-3 rounded-xl border ${getIconBg(transaction.type)}`}
            >
              {getIcon(transaction.type)}
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 mb-1">
                {transaction.title}
              </h4>
              <p className="text-sm text-gray-500 flex items-center">
                {transaction.subtitle}
              </p>
              <div className="flex items-center space-x-2 mt-1">
                <Clock size={12} className="text-gray-400" />
                <span className="text-xs text-gray-400">
                  {transaction.date}
                </span>
              </div>
            </div>
            <div className="text-right">
              <p
                className={`font-bold text-lg ${
                  transaction.isPositive ? "text-green-600" : "text-red-600"
                }`}
              >
                {transaction.isPositive ? "+" : "-"}
                {transaction.amount}
              </p>
              <div
                className={`text-xs px-2 py-1 rounded-full ${
                  transaction.isPositive
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {transaction.isPositive ? "입금" : "출금"}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">총 거래 건수</span>
          <span className="font-semibold text-gray-900">
            {transactions.length}건
          </span>
        </div>
      </div>
    </div>
  );
};

export default RecentTransactions;
