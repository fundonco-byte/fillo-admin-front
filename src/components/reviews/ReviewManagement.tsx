"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Star,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Filter,
} from "lucide-react";

interface Review {
  id: string;
  title: string;
  product: string;
  rating: number;
  content: string;
  author: string;
  date: string;
  image?: string;
}

interface ReviewSearchFilters {
  title: string;
  product: string;
  rating: number;
}

const mockReviews: Review[] = [
  {
    id: "1",
    title: "정말 좋은 상품입니다",
    product: "플라워 블라우스",
    rating: 5,
    content: "재질이 좋고 핏이 완벽해요. 추천합니다!",
    author: "김민지",
    date: "2024-01-15",
    image: "/api/placeholder/50/50",
  },
  {
    id: "2",
    title: "만족스러운 구매",
    product: "레이스 원피스",
    rating: 4,
    content: "디자인이 예쁘고 품질도 좋습니다.",
    author: "이서연",
    date: "2024-01-14",
    image: "/api/placeholder/50/50",
  },
  {
    id: "3",
    title: "배송이 빨랐어요",
    product: "캐쥬얼 팬츠",
    rating: 4,
    content: "주문 후 바로 받았습니다. 감사합니다.",
    author: "박지영",
    date: "2024-01-13",
  },
  {
    id: "4",
    title: "색상이 마음에 들어요",
    product: "니트 카디건",
    rating: 5,
    content: "사진과 실제 색상이 동일해서 만족합니다.",
    author: "정수진",
    date: "2024-01-12",
  },
  {
    id: "5",
    title: "사이즈가 약간 커요",
    product: "슬림 스커트",
    rating: 3,
    content: "사이즈가 생각보다 큽니다. 참고하세요.",
    author: "최은영",
    date: "2024-01-11",
  },
];

const mockProducts = [
  "플라워 블라우스",
  "레이스 원피스",
  "캐쥬얼 팬츠",
  "니트 카디건",
  "슬림 스커트",
  "프린트 티셔츠",
  "데님 재킷",
  "맥시 드레스",
];

export const ReviewManagement: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [filteredReviews, setFilteredReviews] = useState<Review[]>(mockReviews);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [searchFilters, setSearchFilters] = useState<ReviewSearchFilters>({
    title: "",
    product: "",
    rating: 0,
  });

  const router = useRouter();
  const itemsPerPage = 10;

  // 검색 필터링
  useEffect(() => {
    let filtered = reviews;

    if (searchFilters.title) {
      filtered = filtered.filter((review) =>
        review.title.toLowerCase().includes(searchFilters.title.toLowerCase())
      );
    }

    if (searchFilters.product) {
      filtered = filtered.filter((review) =>
        review.product
          .toLowerCase()
          .includes(searchFilters.product.toLowerCase())
      );
    }

    if (searchFilters.rating > 0) {
      filtered = filtered.filter(
        (review) => review.rating === searchFilters.rating
      );
    }

    setFilteredReviews(filtered);
    setCurrentPage(1);
  }, [searchFilters, reviews]);

  // 페이지네이션
  const totalPages = Math.ceil(filteredReviews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentReviews = filteredReviews.slice(startIndex, endIndex);

  const handleSearch = (
    field: keyof ReviewSearchFilters,
    value: string | number
  ) => {
    setSearchFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDeleteClick = (review: Review) => {
    setSelectedReview(review);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (selectedReview) {
      setReviews((prev) =>
        prev.filter((review) => review.id !== selectedReview.id)
      );
      setShowDeleteModal(false);
      setSelectedReview(null);
    }
  };

  const handleReviewClick = (reviewId: string) => {
    router.push(`/reviews/${reviewId}`);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="p-6 space-y-6">
      {/* 헤더 */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">리뷰 관리</h1>
      </div>

      {/* 검색 필터 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-gray-500" />
          <h2 className="text-lg font-medium text-gray-900">검색 필터</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* 리뷰 제목 검색 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              리뷰 제목
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="리뷰 제목을 입력하세요"
                value={searchFilters.title}
                onChange={(e) => handleSearch("title", e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* 제품 검색 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              제품명
            </label>
            <select
              value={searchFilters.product}
              onChange={(e) => handleSearch("product", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent max-h-40 overflow-y-auto"
            >
              <option value="">전체 제품</option>
              {mockProducts.map((product) => (
                <option key={product} value={product}>
                  {product}
                </option>
              ))}
            </select>
          </div>

          {/* 별점 검색 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              별점
            </label>
            <select
              value={searchFilters.rating}
              onChange={(e) => handleSearch("rating", Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value={0}>전체 별점</option>
              <option value={5}>5점</option>
              <option value={4}>4점</option>
              <option value={3}>3점</option>
              <option value={2}>2점</option>
              <option value={1}>1점</option>
            </select>
          </div>
        </div>
      </div>

      {/* 리뷰 리스트 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  번호
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  리뷰 제목
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  제품명
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  별점
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  작성자
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  작성일
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  삭제
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentReviews.map((review, index) => (
                <tr
                  key={review.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleReviewClick(review.id)}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {startIndex + index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {review.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {review.product}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      {renderStars(review.rating)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {review.author}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {review.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteClick(review);
                      }}
                      className="text-red-600 hover:text-red-800 p-1 rounded-md hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 페이지네이션 */}
        <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <p className="text-sm text-gray-700">
                총 <span className="font-medium">{filteredReviews.length}</span>
                개의 리뷰
              </p>
            </div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                    currentPage === i + 1
                      ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                      : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                }
                disabled={currentPage === totalPages}
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* 삭제 확인 모달 */}
      {showDeleteModal && selectedReview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              리뷰 삭제
            </h2>
            <p className="text-gray-600 mb-6">
              &quot;{selectedReview.title}&quot; 리뷰를 삭제하시겠습니까?
              <br />
              <span className="text-red-600 font-medium">
                이 작업은 되돌릴 수 없습니다.
              </span>
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                취소
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700"
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
