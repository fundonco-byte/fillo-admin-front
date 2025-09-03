"use client";

import Layout from "@/components/layout/Layout";
import StatCard from "@/components/dashboard/StatCard";
import WeeklyChart from "@/components/dashboard/WeeklyChart";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import QuickActions from "@/components/dashboard/QuickActions";
import {
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  TrendingUp,
  TrendingDown,
  Star,
  AlertCircle,
} from "lucide-react";

// 샘플 데이터
const statsData = [
  {
    title: "총 매출",
    value: "₩24,850,000",
    change: "12.5",
    changeType: "increase" as const,
    icon: DollarSign,
    color: "blue" as const,
  },
  {
    title: "주문 수",
    value: "1,247",
    change: "8.3",
    changeType: "increase" as const,
    icon: ShoppingCart,
    color: "green" as const,
  },
  {
    title: "신규 고객",
    value: "342",
    change: "4.2",
    changeType: "increase" as const,
    icon: Users,
    color: "purple" as const,
  },
  {
    title: "재고 부족",
    value: "23",
    change: "2.1",
    changeType: "decrease" as const,
    icon: Package,
    color: "orange" as const,
  },
];

const weeklyData = [
  { day: "월", sales: 450, orders: 85 },
  { day: "화", sales: 320, orders: 62 },
  { day: "수", sales: 580, orders: 95 },
  { day: "목", sales: 490, orders: 78 },
  { day: "금", sales: 650, orders: 110 },
  { day: "토", sales: 720, orders: 125 },
  { day: "일", sales: 380, orders: 68 },
];

const recentTransactions = [
  {
    id: "1",
    type: "order" as const,
    title: "새 주문",
    subtitle: "여성 원피스 - 김지은",
    amount: "₩89,000",
    isPositive: true,
    date: "2분 전",
  },
  {
    id: "2",
    type: "refund" as const,
    title: "환불 처리",
    subtitle: "블라우스 - 박민정",
    amount: "₩45,000",
    isPositive: false,
    date: "15분 전",
  },
  {
    id: "3",
    type: "shipping" as const,
    title: "배송 완료",
    subtitle: "스커트 세트 - 이수진",
    amount: "₩125,000",
    isPositive: true,
    date: "1시간 전",
  },
  {
    id: "4",
    type: "order" as const,
    title: "새 주문",
    subtitle: "액세서리 - 최영희",
    amount: "₩32,000",
    isPositive: true,
    date: "2시간 전",
  },
  {
    id: "5",
    type: "order" as const,
    title: "새 주문",
    subtitle: "가을 재킷 - 정수연",
    amount: "₩156,000",
    isPositive: true,
    date: "3시간 전",
  },
];

export default function Home() {
  const handleQuickAction = (action: string) => {
    console.log(`Quick action clicked: ${action}`);
    // 실제 구현에서는 각 액션에 따른 처리 로직 추가
  };

  return (
    <Layout title="대시보드">
      <div className="space-y-6">
        {/* 상단 통계 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat, index) => (
            <div key={index} style={{ animationDelay: `${index * 0.1}s` }}>
              <StatCard {...stat} />
            </div>
          ))}
        </div>

        {/* 메인 대시보드 컨텐츠 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 주간 차트 */}
          <div className="lg:col-span-2">
            <WeeklyChart data={weeklyData} />
          </div>

          {/* 빠른 액션 */}
          <div>
            <QuickActions onActionClick={handleQuickAction} />
          </div>
        </div>

        {/* 하단 섹션 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 최근 거래 */}
          <RecentTransactions transactions={recentTransactions} />

          {/* 오늘의 요약 */}
          <div className="bg-white rounded-xl p-6 shadow-card animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900">오늘의 요약</h3>
                <p className="text-sm text-gray-500">주요 지표 현황</p>
              </div>
              <div className="p-2 bg-blue-50 rounded-lg">
                <TrendingUp size={20} className="text-blue-600" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-500 rounded-lg shadow-sm">
                    <ShoppingCart size={16} className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      오늘 주문
                    </p>
                    <p className="text-xs text-gray-500">어제 대비 +12%</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-blue-600">47건</p>
                  <p className="text-xs text-blue-500">+5건</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-500 rounded-lg shadow-sm">
                    <TrendingUp size={16} className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      매출 증가율
                    </p>
                    <p className="text-xs text-gray-500">지난 주 대비</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-600">+15.3%</p>
                  <p className="text-xs text-green-500">↗ 상승</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-500 rounded-lg shadow-sm">
                    <Users size={16} className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      신규 가입
                    </p>
                    <p className="text-xs text-gray-500">오늘 가입한 고객</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-purple-600">12명</p>
                  <p className="text-xs text-purple-500">+2명</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-orange-500 rounded-lg shadow-sm">
                    <AlertCircle size={16} className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      재고 알림
                    </p>
                    <p className="text-xs text-gray-500">재고 부족 상품</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-orange-600">23개</p>
                  <p className="text-xs text-orange-500">확인 필요</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Star size={16} className="text-yellow-500" />
                  <span className="text-sm font-medium text-gray-700">
                    평균 평점
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        className="text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-gray-900">4.8</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
