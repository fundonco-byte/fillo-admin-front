"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Star, Calendar, User, Package, Image } from "lucide-react";
import Layout from "@/components/layout/Layout";

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

const mockReviews: Review[] = [
  {
    id: "1",
    title: "정말 좋은 상품입니다",
    product: "플라워 블라우스",
    rating: 5,
    content:
      "재질이 좋고 핏이 완벽해요. 추천합니다! 색상도 사진과 동일하고 착용감이 너무 편합니다. 다른 색상도 구매 예정입니다.",
    author: "김민지",
    date: "2024-01-15",
    image: "/api/placeholder/300/200",
  },
  {
    id: "2",
    title: "만족스러운 구매",
    product: "레이스 원피스",
    rating: 4,
    content:
      "디자인이 예쁘고 품질도 좋습니다. 다만 사이즈가 조금 작아서 한 치수 큰 것으로 주문하시는 것을 추천합니다.",
    author: "이서연",
    date: "2024-01-14",
    image: "/api/placeholder/300/200",
  },
  {
    id: "3",
    title: "배송이 빨랐어요",
    product: "캐쥬얼 팬츠",
    rating: 4,
    content:
      "주문 후 바로 받았습니다. 감사합니다. 팬츠 핏이 좋고 신축성이 있어서 활동하기 편합니다.",
    author: "박지영",
    date: "2024-01-13",
  },
  {
    id: "4",
    title: "색상이 마음에 들어요",
    product: "니트 카디건",
    rating: 5,
    content:
      "사진과 실제 색상이 동일해서 만족합니다. 니트가 부드럽고 따뜻해서 겨울에 입기 좋습니다.",
    author: "정수진",
    date: "2024-01-12",
  },
  {
    id: "5",
    title: "사이즈가 약간 커요",
    product: "슬림 스커트",
    rating: 3,
    content:
      "사이즈가 생각보다 큽니다. 참고하세요. 그래도 디자인은 예쁘고 원단도 괜찮습니다.",
    author: "최은영",
    date: "2024-01-11",
  },
];

export default function ReviewDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [review, setReview] = useState<Review | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const reviewId = params.id as string;

    // 실제 API 호출 대신 mock 데이터 사용
    const foundReview = mockReviews.find((r) => r.id === reviewId);

    setTimeout(() => {
      setReview(foundReview || null);
      setLoading(false);
    }, 300);
  }, [params.id]);

  const handleBackClick = () => {
    router.push("/reviews");
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-6 h-6 ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  if (loading) {
    return (
      <Layout title="리뷰 상세">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  if (!review) {
    return (
      <Layout title="리뷰 상세">
        <div className="p-6">
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              리뷰를 찾을 수 없습니다
            </h2>
            <p className="text-gray-600 mb-6">
              요청하신 리뷰가 존재하지 않거나 삭제되었습니다.
            </p>
            <button
              onClick={handleBackClick}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <ArrowLeft className="w-4 h-4" />
              리뷰 목록으로 돌아가기
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="리뷰 상세">
      <div className="p-6 max-w-4xl mx-auto">
        {/* 헤더 */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={handleBackClick}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            리뷰 목록으로 돌아가기
          </button>
        </div>

        {/* 리뷰 상세 정보 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* 리뷰 헤더 */}
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                  {review.title}
                </h1>
                <div className="flex items-center gap-2 mb-2">
                  {renderStars(review.rating)}
                  <span className="text-lg font-medium text-gray-700">
                    {review.rating}.0
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 리뷰 정보 */}
          <div className="p-6 space-y-6">
            {/* 기본 정보 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Package className="w-5 h-5 text-gray-500" />
                  <div>
                    <span className="text-sm font-medium text-gray-700">
                      제품명:
                    </span>
                    <p className="text-gray-900">{review.product}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-gray-500" />
                  <div>
                    <span className="text-sm font-medium text-gray-700">
                      작성자:
                    </span>
                    <p className="text-gray-900">{review.author}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <div>
                    <span className="text-sm font-medium text-gray-700">
                      작성일:
                    </span>
                    <p className="text-gray-900">{review.date}</p>
                  </div>
                </div>
              </div>

              {/* 별점 표시 */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  별점 정보
                </h3>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    {renderStars(review.rating)}
                  </div>
                  <span className="text-2xl font-bold text-gray-900">
                    {review.rating}.0
                  </span>
                  <span className="text-sm text-gray-600">/ 5.0</span>
                </div>
              </div>
            </div>

            {/* 리뷰 내용 */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                리뷰 내용
              </h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-900 leading-relaxed whitespace-pre-wrap">
                  {review.content}
                </p>
              </div>
            </div>

            {/* 리뷰 이미지 */}
            {review.image && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center gap-2">
                  <Image className="w-5 h-5" />
                  리뷰 이미지
                </h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <img
                    src={review.image}
                    alt={`${review.title} 리뷰 이미지`}
                    className="max-w-full h-auto rounded-lg shadow-sm"
                  />
                </div>
              </div>
            )}

            {/* 추가 정보 */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                추가 정보
              </h3>
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">리뷰 ID:</span>
                    <span className="ml-2 text-gray-900">{review.id}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">상태:</span>
                    <span className="ml-2 text-green-600 font-medium">
                      게시 중
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">조회수:</span>
                    <span className="ml-2 text-gray-900">
                      {Math.floor(Math.random() * 100) + 10}회
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">추천수:</span>
                    <span className="ml-2 text-gray-900">
                      {Math.floor(Math.random() * 20) + 1}개
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
