"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, Eye, Edit, Trash2, Plus } from "lucide-react";

interface Announcement {
  id: string;
  title: string;
  content: string;
  isVisible: boolean;
  mediaFiles: string[];
  createdAt: string;
  updatedAt: string;
}

const AnnouncementManagement = () => {
  const router = useRouter();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchVisibility, setSearchVisibility] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const itemsPerPage = 10;

  // 샘플 데이터
  useEffect(() => {
    const sampleData: Announcement[] = [
      {
        id: "1",
        title: "시스템 점검 안내",
        content: "2024년 1월 15일 오전 2시부터 4시까지 시스템 점검이 있습니다.",
        isVisible: true,
        mediaFiles: ["image1.jpg"],
        createdAt: "2024-01-10",
        updatedAt: "2024-01-10",
      },
      {
        id: "2",
        title: "신제품 출시 공지",
        content: "새로운 제품이 출시되었습니다. 많은 관심 부탁드립니다.",
        isVisible: true,
        mediaFiles: [],
        createdAt: "2024-01-08",
        updatedAt: "2024-01-08",
      },
      {
        id: "3",
        title: "배송 지연 안내",
        content: "물류 센터 사정으로 배송이 지연될 수 있습니다.",
        isVisible: false,
        mediaFiles: ["document1.pdf"],
        createdAt: "2024-01-05",
        updatedAt: "2024-01-06",
      },
      {
        id: "4",
        title: "고객센터 운영시간 변경",
        content: "고객센터 운영시간이 변경됩니다.",
        isVisible: true,
        mediaFiles: [],
        createdAt: "2024-01-03",
        updatedAt: "2024-01-03",
      },
      {
        id: "5",
        title: "할인 이벤트 안내",
        content: "신년 특가 할인 이벤트를 진행합니다.",
        isVisible: false,
        mediaFiles: ["banner1.jpg", "banner2.jpg"],
        createdAt: "2024-01-01",
        updatedAt: "2024-01-02",
      },
    ];
    setAnnouncements(sampleData);
  }, []);

  // 검색 필터링
  const filteredAnnouncements = announcements.filter((announcement) => {
    const matchesTitle = announcement.title
      .toLowerCase()
      .includes(searchTitle.toLowerCase());
    const matchesVisibility =
      searchVisibility === "all" ||
      (searchVisibility === "visible" && announcement.isVisible) ||
      (searchVisibility === "hidden" && !announcement.isVisible);

    return matchesTitle && matchesVisibility;
  });

  // 페이지네이션
  const totalPages = Math.ceil(filteredAnnouncements.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAnnouncements = filteredAnnouncements.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleSearch = () => {
    setCurrentPage(1);
  };

  const handleViewDetail = (id: string) => {
    router.push(`/announcements/${id}`);
  };

  const handleEdit = (id: string) => {
    router.push(`/announcements/edit/${id}`);
  };

  const handleDeleteConfirm = (id: string) => {
    setDeleteTargetId(id);
    setShowDeleteModal(true);
  };

  const handleDeleteExecute = () => {
    if (deleteTargetId) {
      setAnnouncements((prev) =>
        prev.filter((item) => item.id !== deleteTargetId)
      );
      setShowDeleteModal(false);
      setDeleteTargetId(null);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setDeleteTargetId(null);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* 헤더 */}
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800 mb-2">
          공지사항 관리
        </h1>
      </div>

      {/* 검색 섹션 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              제목 검색
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={searchTitle}
                onChange={(e) => setSearchTitle(e.target.value)}
                placeholder="공지사항 제목을 입력하세요"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              노출 여부
            </label>
            <select
              value={searchVisibility}
              onChange={(e) => setSearchVisibility(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">전체</option>
              <option value="visible">노출</option>
              <option value="hidden">숨김</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={handleSearch}
              className="w-full bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              검색
            </button>
          </div>
        </div>
      </div>

      {/* 테이블 섹션 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">
              공지사항 목록
            </h2>
            <button
              onClick={() => router.push("/announcements/create")}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-4 w-4" />새 공지사항
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  제목
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  등록일자
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  노출 여부
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  관리
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedAnnouncements.map((announcement) => (
                <tr key={announcement.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {announcement.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleViewDetail(announcement.id)}
                      className="text-sm text-blue-600 hover:text-blue-800 hover:underline font-medium"
                    >
                      {announcement.title}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {announcement.createdAt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        announcement.isVisible
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {announcement.isVisible ? "노출" : "숨김"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewDetail(announcement.id)}
                        className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50"
                        title="상세보기"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleEdit(announcement.id)}
                        className="text-green-600 hover:text-green-800 p-1 rounded hover:bg-green-50"
                        title="수정"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteConfirm(announcement.id)}
                        className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50"
                        title="삭제"
                      >
                        <Trash2 className="h-4 w-4" />
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
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                총 {filteredAnnouncements.length}개 중 {startIndex + 1}-
                {Math.min(
                  startIndex + itemsPerPage,
                  filteredAnnouncements.length
                )}
                개 표시
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  이전
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-1 border rounded text-sm ${
                        currentPage === page
                          ? "bg-blue-600 text-white border-blue-600"
                          : "border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  다음
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 삭제 확인 모달 */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              삭제 확인
            </h3>
            <p className="text-gray-600 mb-6">
              선택한 공지사항을 정말 삭제하시겠습니까?
              <br />
              삭제된 데이터는 복구할 수 없습니다.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleDeleteCancel}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                취소
              </button>
              <button
                onClick={handleDeleteExecute}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
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

export default AnnouncementManagement;
