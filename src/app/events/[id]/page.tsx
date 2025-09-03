"use client";

import React from "react";
import { useParams } from "next/navigation";
import Layout from "@/components/layout/Layout";
import { ChevronLeft, Eye, EyeOff, Calendar, FileText } from "lucide-react";

export default function EventDetailPage() {
  const params = useParams();
  const id = params.id as string;

  // 실제 구현에서는 ID로 이벤트 데이터를 가져옴
  const eventData = {
    id: id,
    title: "2024 신년 맞이 특별 할인 이벤트",
    content:
      "신년을 맞아 전 상품 20% 할인 이벤트를 진행합니다. 이번 기회를 놓치지 마세요!",
    imageUrl: "/event-sample.jpg",
    startDate: "2024-01-01",
    endDate: "2024-01-31",
    isVisible: true,
    createdAt: "2023-12-15",
    updatedAt: "2023-12-20",
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <Layout title="이벤트 상세">
      <div className="p-6 max-w-4xl mx-auto">
        {/* 헤더 */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={handleGoBack}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft size={20} />
            뒤로가기
          </button>
          <h1 className="text-2xl font-bold text-gray-800">이벤트 상세</h1>
        </div>

        {/* 이벤트 정보 카드 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          {/* 이벤트 제목 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              이벤트 제목
            </label>
            <div className="p-3 bg-gray-50 rounded-lg border">
              <p className="text-gray-800">{eventData.title}</p>
            </div>
          </div>

          {/* 이벤트 내용 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FileText className="inline mr-2" size={16} />
              이벤트 내용
            </label>
            <div className="p-3 bg-gray-50 rounded-lg border min-h-[100px]">
              <p className="text-gray-800 whitespace-pre-wrap">
                {eventData.content}
              </p>
            </div>
          </div>

          {/* 이벤트 이미지 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              이벤트 이미지
            </label>
            <div className="p-3 bg-gray-50 rounded-lg border">
              <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                이미지 미리보기
              </div>
            </div>
          </div>

          {/* 이벤트 기간 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="inline mr-2" size={16} />
              이벤트 기간
            </label>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-xs text-gray-500 mb-1">
                  시작일
                </label>
                <div className="p-3 bg-gray-50 rounded-lg border">
                  <p className="text-gray-800">{eventData.startDate}</p>
                </div>
              </div>
              <div className="flex-1">
                <label className="block text-xs text-gray-500 mb-1">
                  종료일
                </label>
                <div className="p-3 bg-gray-50 rounded-lg border">
                  <p className="text-gray-800">{eventData.endDate}</p>
                </div>
              </div>
            </div>
          </div>

          {/* 노출 여부 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              노출 여부
            </label>
            <div className="p-3 bg-gray-50 rounded-lg border">
              <div className="flex items-center gap-2">
                {eventData.isVisible ? (
                  <>
                    <Eye className="text-green-600" size={16} />
                    <span className="text-green-600 font-medium">노출</span>
                  </>
                ) : (
                  <>
                    <EyeOff className="text-red-600" size={16} />
                    <span className="text-red-600 font-medium">비노출</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* 생성/수정 정보 */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div>
              <label className="block text-xs text-gray-500 mb-1">생성일</label>
              <p className="text-gray-800">{eventData.createdAt}</p>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">수정일</label>
              <p className="text-gray-800">{eventData.updatedAt}</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
