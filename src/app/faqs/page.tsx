"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Search, Edit, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Layout from "@/components/layout/Layout";

// FAQ 데이터 타입 정의
interface FAQ {
  id: number;
  title: string;
  content: string;
  category: string;
  mediaFiles: string[];
  createdAt: string;
  updatedAt: string;
}

// 더미 데이터
const mockFAQs: FAQ[] = [
  {
    id: 1,
    title: "제품 반품은 어떻게 하나요?",
    content: "제품 반품은 구매일로부터 7일 이내에 가능합니다...",
    category: "제품",
    mediaFiles: [],
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15",
  },
  {
    id: 2,
    title: "배송 기간은 얼마나 걸리나요?",
    content: "일반 배송은 2-3일, 익일 배송은 다음날 배송됩니다...",
    category: "서비스",
    mediaFiles: [],
    createdAt: "2024-01-14",
    updatedAt: "2024-01-14",
  },
  {
    id: 3,
    title: "회원가입 혜택은 무엇인가요?",
    content: "회원가입 시 5% 할인 쿠폰과 무료배송 혜택을 받으실 수 있습니다...",
    category: "서비스",
    mediaFiles: [],
    createdAt: "2024-01-13",
    updatedAt: "2024-01-13",
  },
  {
    id: 4,
    title: "결제 오류가 발생했습니다",
    content:
      "결제 오류가 발생한 경우 고객센터로 연락주시면 신속히 처리해드립니다...",
    category: "제품",
    mediaFiles: [],
    createdAt: "2024-01-12",
    updatedAt: "2024-01-12",
  },
  {
    id: 5,
    title: "상품 문의는 어떻게 하나요?",
    content: "상품 문의는 상품 상세페이지에서 가능합니다...",
    category: "서비스",
    mediaFiles: [],
    createdAt: "2024-01-11",
    updatedAt: "2024-01-11",
  },
];

export default function FAQManagementPage() {
  const [faqs, setFaqs] = useState<FAQ[]>(mockFAQs);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const itemsPerPage = 10;

  // 검색 및 필터링
  const filteredFAQs = faqs.filter((faq) => {
    const matchesSearch = faq.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory = !categoryFilter || faq.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // 페이지네이션
  const totalPages = Math.ceil(filteredFAQs.length / itemsPerPage);
  const paginatedFAQs = filteredFAQs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // FAQ 삭제 함수
  const handleDelete = (id: number) => {
    setFaqs(faqs.filter((faq) => faq.id !== id));
    setDeleteConfirm(null);
  };

  // 페이지 변경 함수
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Layout title="FAQ 관리">
      <div>
        {/* 헤더 */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">FAQ 관리</h1>
          <p className="text-gray-600">
            자주 묻는 질문을 관리하고 고객 지원을 개선하세요
          </p>
        </div>

      {/* 검색 및 필터 섹션 */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="FAQ 제목으로 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="w-48">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">모든 유형</option>
              <option value="제품">제품</option>
              <option value="서비스">서비스</option>
            </select>
          </div>
          <Link href="/faqs/create">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2">
              <Plus size={16} />
              FAQ 생성
            </Button>
          </Link>
        </div>
      </div>

      {/* FAQ 테이블 */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                  FAQ ID
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                  FAQ 질문 제목
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                  FAQ 등록 일자
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                  FAQ 유형
                </th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-600">
                  관리
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedFAQs.map((faq) => (
                <tr key={faq.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {faq.id.toString().padStart(2, "0")}.
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      href={`/faqs/${faq.id}`}
                      className="text-sm text-gray-900 hover:text-blue-600 cursor-pointer"
                    >
                      {faq.title}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {faq.createdAt}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {faq.category}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <Link href={`/faqs/${faq.id}`}>
                        <Button variant="outline" size="sm" className="p-2">
                          <Eye size={16} />
                        </Button>
                      </Link>
                      <Link href={`/faqs/edit/${faq.id}`}>
                        <Button variant="outline" size="sm" className="p-2">
                          <Edit size={16} />
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        className="p-2 text-red-600 hover:text-red-700"
                        onClick={() => setDeleteConfirm(faq.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                총 {filteredFAQs.length}개의 FAQ 중{" "}
                {(currentPage - 1) * itemsPerPage + 1}-
                {Math.min(currentPage * itemsPerPage, filteredFAQs.length)}개
                표시
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  이전
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePageChange(page)}
                      className="w-8"
                    >
                      {page}
                    </Button>
                  )
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  다음
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 삭제 확인 모달 */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              FAQ 삭제 확인
            </h3>
            <p className="text-gray-600 mb-6">
              이 FAQ를 삭제하시겠습니까? 삭제된 FAQ는 복구할 수 없습니다.
            </p>
            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={() => setDeleteConfirm(null)}>
                취소
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleDelete(deleteConfirm)}
              >
                삭제
              </Button>
            </div>
          </div>
        </div>
      )}
      </div>
    </Layout>
  );
}
