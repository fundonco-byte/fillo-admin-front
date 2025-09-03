"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Image as ImageIcon,
  AlertTriangle,
} from "lucide-react";

// 배너 타입
type BannerType = "main" | "event" | "promotion" | "notice";

// 배너 인터페이스
interface Banner {
  id: string;
  name: string;
  type: BannerType;
  imageUrl: string;
  isVisible: boolean;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
}

// 검색 조건 인터페이스
interface SearchFilters {
  keyword: string;
  type: BannerType | "";
  isVisible: boolean | "";
  startDate: string;
  endDate: string;
}

// 배너 타입 옵션
const bannerTypeOptions = [
  { value: "main", label: "메인 배너" },
  { value: "event", label: "이벤트 배너" },
  { value: "promotion", label: "프로모션 배너" },
  { value: "notice", label: "공지사항 배너" },
];

// 샘플 배너 데이터
const sampleBanners: Banner[] = [
  {
    id: "1",
    name: "신상품 출시 이벤트",
    type: "event",
    imageUrl: "/api/placeholder/400/200",
    isVisible: true,
    startDate: "2024-01-01",
    endDate: "2024-02-28",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    name: "메인 홈페이지 배너",
    type: "main",
    imageUrl: "/api/placeholder/400/200",
    isVisible: true,
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    createdAt: "2024-01-10T09:00:00Z",
    updatedAt: "2024-01-10T09:00:00Z",
  },
  {
    id: "3",
    name: "할인 프로모션",
    type: "promotion",
    imageUrl: "/api/placeholder/400/200",
    isVisible: false,
    startDate: "2024-03-01",
    endDate: "2024-03-31",
    createdAt: "2024-01-20T11:00:00Z",
    updatedAt: "2024-01-20T11:00:00Z",
  },
  {
    id: "4",
    name: "서비스 점검 공지",
    type: "notice",
    imageUrl: "/api/placeholder/400/200",
    isVisible: true,
    startDate: "2024-02-01",
    endDate: "2024-02-05",
    createdAt: "2024-01-25T12:00:00Z",
    updatedAt: "2024-01-25T12:00:00Z",
  },
];

const BannerManagement: React.FC = () => {
  const router = useRouter();
  const [banners, setBanners] = useState<Banner[]>(sampleBanners);
  const [filteredBanners, setFilteredBanners] =
    useState<Banner[]>(sampleBanners);
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    keyword: "",
    type: "",
    isVisible: "",
    startDate: "",
    endDate: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const itemsPerPage = 10;

  // 검색 및 필터링 함수
  const applyFilters = () => {
    let filtered = banners;

    // 키워드 검색
    if (searchFilters.keyword) {
      filtered = filtered.filter((banner) =>
        banner.name.toLowerCase().includes(searchFilters.keyword.toLowerCase())
      );
    }

    // 배너 타입 필터
    if (searchFilters.type) {
      filtered = filtered.filter(
        (banner) => banner.type === searchFilters.type
      );
    }

    // 노출 여부 필터
    if (searchFilters.isVisible !== "") {
      filtered = filtered.filter(
        (banner) => banner.isVisible === searchFilters.isVisible
      );
    }

    // 게시 기간 필터
    if (searchFilters.startDate) {
      filtered = filtered.filter(
        (banner) => banner.startDate >= searchFilters.startDate
      );
    }

    if (searchFilters.endDate) {
      filtered = filtered.filter(
        (banner) => banner.endDate <= searchFilters.endDate
      );
    }

    setFilteredBanners(filtered);
    setCurrentPage(1);
  };

  // 검색 필터 변경 핸들러
  const handleFilterChange = (
    key: keyof SearchFilters,
    value: string | boolean
  ) => {
    setSearchFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // 검색 실행
  const handleSearch = () => {
    applyFilters();
  };

  // 필터 초기화
  const handleResetFilters = () => {
    setSearchFilters({
      keyword: "",
      type: "",
      isVisible: "",
      startDate: "",
      endDate: "",
    });
    setFilteredBanners(banners);
    setCurrentPage(1);
  };

  // 배너 생성 페이지로 이동
  const handleCreateBanner = () => {
    router.push("/banners/create");
  };

  // 배너 수정 페이지로 이동
  const handleEditBanner = (bannerId: string) => {
    router.push(`/banners/edit/${bannerId}`);
  };

  // 배너 삭제 확인 모달
  const handleDeleteConfirm = (bannerId: string) => {
    setDeleteConfirm(bannerId);
  };

  // 배너 삭제 실행
  const handleDeleteBanner = (bannerId: string) => {
    setBanners((prev) => prev.filter((banner) => banner.id !== bannerId));
    setFilteredBanners((prev) =>
      prev.filter((banner) => banner.id !== bannerId)
    );
    setDeleteConfirm(null);
  };

  // 배너 노출 여부 토글
  const handleToggleVisibility = (bannerId: string) => {
    setBanners((prev) =>
      prev.map((banner) =>
        banner.id === bannerId
          ? { ...banner, isVisible: !banner.isVisible }
          : banner
      )
    );
    setFilteredBanners((prev) =>
      prev.map((banner) =>
        banner.id === bannerId
          ? { ...banner, isVisible: !banner.isVisible }
          : banner
      )
    );
  };

  // 페이지네이션 계산
  const totalPages = Math.ceil(filteredBanners.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBanners = filteredBanners.slice(startIndex, endIndex);

  // 페이지 변경
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // 배너 타입 라벨 가져오기
  const getBannerTypeLabel = (type: BannerType) => {
    return (
      bannerTypeOptions.find((option) => option.value === type)?.label || type
    );
  };

  // 날짜 포맷팅
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ko-KR");
  };

  // 배너 상태 확인 (활성/비활성)
  const getBannerStatus = (banner: Banner) => {
    const now = new Date();
    const start = new Date(banner.startDate);
    const end = new Date(banner.endDate);

    if (now < start) return "scheduled";
    if (now > end) return "expired";
    return "active";
  };

  useEffect(() => {
    applyFilters();
  }, []);

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">배너 관리</h1>
          <p className="text-sm text-gray-500 mt-1">
            총 {filteredBanners.length}개의 배너
          </p>
        </div>
        <button
          onClick={handleCreateBanner}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          배너 생성
        </button>
      </div>

      {/* 검색 및 필터 섹션 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* 검색창 */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="배너명으로 검색..."
                value={searchFilters.keyword}
                onChange={(e) => handleFilterChange("keyword", e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* 필터 버튼 */}
          <div className="flex gap-2">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Filter className="w-4 h-4 mr-2" />
              필터
            </button>
            <button
              onClick={handleSearch}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              검색
            </button>
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              초기화
            </button>
          </div>
        </div>

        {/* 필터 옵션 */}
        {isFilterOpen && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* 배너 타입 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  배너 타입
                </label>
                <select
                  value={searchFilters.type}
                  onChange={(e) => handleFilterChange("type", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">전체</option>
                  {bannerTypeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* 노출 여부 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  노출 여부
                </label>
                <select
                  value={searchFilters.isVisible.toString()}
                  onChange={(e) =>
                    handleFilterChange(
                      "isVisible",
                      e.target.value === "" ? "" : e.target.value === "true"
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">전체</option>
                  <option value="true">노출</option>
                  <option value="false">비노출</option>
                </select>
              </div>

              {/* 시작 날짜 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  시작 날짜
                </label>
                <input
                  type="date"
                  value={searchFilters.startDate}
                  onChange={(e) =>
                    handleFilterChange("startDate", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* 종료 날짜 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  종료 날짜
                </label>
                <input
                  type="date"
                  value={searchFilters.endDate}
                  onChange={(e) =>
                    handleFilterChange("endDate", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 배너 리스트 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  배너
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  타입
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  게시 기간
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  상태
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  노출
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  작업
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentBanners.map((banner) => {
                const status = getBannerStatus(banner);
                return (
                  <tr key={banner.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-16 w-24">
                          <img
                            className="h-16 w-24 rounded-lg object-cover"
                            src={banner.imageUrl}
                            alt={banner.name}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {banner.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {formatDate(banner.createdAt)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                        {getBannerTypeLabel(banner.type)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                        {formatDate(banner.startDate)} -{" "}
                        {formatDate(banner.endDate)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          status === "active"
                            ? "bg-green-100 text-green-800"
                            : status === "scheduled"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {status === "active"
                          ? "활성"
                          : status === "scheduled"
                          ? "예정"
                          : "만료"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleToggleVisibility(banner.id)}
                        className={`inline-flex items-center p-1 rounded-full transition-colors ${
                          banner.isVisible
                            ? "bg-green-100 text-green-600 hover:bg-green-200"
                            : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                        }`}
                      >
                        {banner.isVisible ? (
                          <Eye className="w-4 h-4" />
                        ) : (
                          <EyeOff className="w-4 h-4" />
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEditBanner(banner.id)}
                          className="inline-flex items-center p-1 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteConfirm(banner.id)}
                          className="inline-flex items-center p-1 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                {startIndex + 1}-{Math.min(endIndex, filteredBanners.length)} of{" "}
                {filteredBanners.length} 결과
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-1 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                        currentPage === page
                          ? "bg-blue-600 text-white"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-1 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 삭제 확인 모달 */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center mb-4">
              <AlertTriangle className="w-6 h-6 text-red-500 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">
                배너 삭제 확인
              </h3>
            </div>
            <p className="text-gray-600 mb-6">
              선택한 배너를 삭제하시겠습니까? 이 작업은 취소할 수 없습니다.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                취소
              </button>
              <button
                onClick={() => handleDeleteBanner(deleteConfirm)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
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

export default BannerManagement;
