"use client";

import { useState } from "react";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface Event {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  startDate: string;
  endDate: string;
  isVisible: boolean;
  createdAt: string;
  updatedAt: string;
}

const EventManagement = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchStartDate, setSearchStartDate] = useState("");
  const [searchEndDate, setSearchEndDate] = useState("");
  const [searchVisible, setSearchVisible] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const itemsPerPage = 10;

  // 샘플 이벤트 데이터
  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      title: "2024 신년 맞이 특별 할인 이벤트",
      content: "신년을 맞아 전 상품 20% 할인 이벤트를 진행합니다.",
      imageUrl: "/event1.jpg",
      startDate: "2024-01-01",
      endDate: "2024-01-31",
      isVisible: true,
      createdAt: "2023-12-15",
      updatedAt: "2023-12-20",
    },
    {
      id: "2",
      title: "봄맞이 신상품 출시 기념 이벤트",
      content: "새로운 봄 컬렉션 출시를 기념하여 특별한 이벤트를 진행합니다.",
      imageUrl: "/event2.jpg",
      startDate: "2024-03-01",
      endDate: "2024-03-31",
      isVisible: true,
      createdAt: "2024-02-15",
      updatedAt: "2024-02-20",
    },
    {
      id: "3",
      title: "여름 세일 이벤트",
      content: "더위를 날려줄 시원한 여름 세일 이벤트입니다.",
      imageUrl: "/event3.jpg",
      startDate: "2024-06-01",
      endDate: "2024-06-30",
      isVisible: false,
      createdAt: "2024-05-15",
      updatedAt: "2024-05-20",
    },
  ]);

  // 검색 필터링
  const filteredEvents = events.filter((event) => {
    const matchesTitle = event.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesDateRange =
      (!searchStartDate || event.startDate >= searchStartDate) &&
      (!searchEndDate || event.endDate <= searchEndDate);
    const matchesVisible =
      searchVisible === "all" ||
      (searchVisible === "visible" && event.isVisible) ||
      (searchVisible === "hidden" && !event.isVisible);

    return matchesTitle && matchesDateRange && matchesVisible;
  });

  // 페이지네이션
  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEvents = filteredEvents.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleSearch = () => {
    setCurrentPage(1);
  };

  const handleResetSearch = () => {
    setSearchTerm("");
    setSearchStartDate("");
    setSearchEndDate("");
    setSearchVisible("all");
    setCurrentPage(1);
  };

  const handleEventClick = (id: string) => {
    router.push(`/events/${id}`);
  };

  const handleEditClick = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/events/edit/${id}`);
  };

  const handleDeleteClick = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedEventId(id);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedEventId) {
      setEvents(events.filter((event) => event.id !== selectedEventId));
      setShowDeleteModal(false);
      setSelectedEventId(null);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setSelectedEventId(null);
  };

  return (
    <div className="p-6">
      {/* 헤더 */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">이벤트 관리</h1>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          onClick={() => router.push("/events/create")}
        >
          <Plus size={20} />새 이벤트 등록
        </button>
      </div>

      {/* 검색 필터 */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">검색 조건</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              이벤트 명
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="이벤트 명을 입력하세요"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              시작일
            </label>
            <input
              type="date"
              value={searchStartDate}
              onChange={(e) => setSearchStartDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              종료일
            </label>
            <input
              type="date"
              value={searchEndDate}
              onChange={(e) => setSearchEndDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              노출 여부
            </label>
            <select
              value={searchVisible}
              onChange={(e) => setSearchVisible(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">전체</option>
              <option value="visible">노출</option>
              <option value="hidden">비노출</option>
            </select>
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <button
            onClick={handleSearch}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Search size={16} />
            검색
          </button>
          <button
            onClick={handleResetSearch}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            초기화
          </button>
        </div>
      </div>

      {/* 이벤트 리스트 */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  이벤트 제목
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  이벤트 기간
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  노출 여부
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  수정일
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  액션
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedEvents.map((event) => (
                <tr
                  key={event.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleEventClick(event.id)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {event.title}
                    </div>
                    <div className="text-sm text-gray-500 truncate max-w-xs">
                      {event.content}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-gray-400" />
                      <span className="text-sm text-gray-900">
                        {event.startDate} ~ {event.endDate}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {event.isVisible ? (
                        <>
                          <Eye className="text-green-600" size={16} />
                          <span className="text-sm text-green-600 font-medium">
                            노출
                          </span>
                        </>
                      ) : (
                        <>
                          <EyeOff className="text-red-600" size={16} />
                          <span className="text-sm text-red-600 font-medium">
                            비노출
                          </span>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {event.updatedAt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => handleEditClick(event.id, e)}
                        className="text-blue-600 hover:text-blue-800 p-1 rounded"
                        title="수정"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={(e) => handleDeleteClick(event.id, e)}
                        className="text-red-600 hover:text-red-800 p-1 rounded"
                        title="삭제"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-3 bg-gray-50 border-t">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700">
                총 {filteredEvents.length}개 항목 중 {startIndex + 1}-
                {Math.min(startIndex + itemsPerPage, filteredEvents.length)}개
                표시
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center gap-1 px-3 py-1 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={16} />
                이전
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 text-sm rounded ${
                      currentPage === page
                        ? "bg-blue-600 text-white"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1 px-3 py-1 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                다음
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 삭제 확인 모달 */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              이벤트 삭제
            </h3>
            <p className="text-gray-600 mb-6">
              선택한 이벤트를 삭제하시겠습니까?
              <br />
              삭제된 이벤트는 복구할 수 없습니다.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={handleDeleteCancel}
                className="px-4 py-2 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                취소
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventManagement;
