"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface WeeklyChartProps {
  data: {
    day: string;
    sales: number;
    orders: number;
  }[];
}

const WeeklyChart: React.FC<WeeklyChartProps> = ({ data }) => {
  const formatTooltip = (value: number, name: string) => {
    const label = name === "sales" ? "매출" : "주문";
    const unit = name === "sales" ? "만원" : "건";
    return [`${value}${unit}`, label];
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-card animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900">주간 활동 현황</h3>
          <p className="text-sm text-gray-500">매출 및 주문 추이</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full shadow-sm"></div>
            <span className="text-sm font-medium text-gray-700">매출</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-cyan-400 rounded-full shadow-sm"></div>
            <span className="text-sm font-medium text-gray-700">주문</span>
          </div>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            barCategoryGap="20%"
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6b7280", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6b7280", fontSize: 12 }}
            />
            <Tooltip
              formatter={formatTooltip}
              labelStyle={{ color: "#374151" }}
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
            />
            <Bar
              dataKey="sales"
              fill="#3b82f6"
              radius={[4, 4, 0, 0]}
              name="sales"
            />
            <Bar
              dataKey="orders"
              fill="#22d3ee"
              radius={[4, 4, 0, 0]}
              name="orders"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WeeklyChart;
