"use client";

import { useState, useReducer } from "react";
import { Search, Eye, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

// Types
interface Inquiry {
  id: number;
  title: string;
  memberId: string;
  memberNickname: string;
  isSecret: boolean;
  isAnswered: boolean;
  createdDate: string;
  answeredDate?: string;
}

interface SearchFilters {
  title: string;
  isSecret: string;
  isAnswered: string;
}

interface InquiryState {
  inquiries: Inquiry[];
  filteredInquiries: Inquiry[];
  currentPage: number;
  isLoading: boolean;
  error: string | null;
}

// Action types
type InquiryAction =
  | { type: "SET_INQUIRIES"; payload: Inquiry[] }
  | { type: "FILTER_INQUIRIES"; payload: Inquiry[] }
  | { type: "DELETE_INQUIRY"; payload: number }
  | { type: "SET_PAGE"; payload: number }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null };

// Reducer
const inquiryReducer = (
  state: InquiryState,
  action: InquiryAction
): InquiryState => {
  switch (action.type) {
    case "SET_INQUIRIES":
      return { ...state, inquiries: action.payload };
    case "FILTER_INQUIRIES":
      return { ...state, filteredInquiries: action.payload, currentPage: 1 };
    case "DELETE_INQUIRY":
      const updatedInquiries = state.inquiries.filter(
        (inquiry) => inquiry.id !== action.payload
      );
      const updatedFiltered = state.filteredInquiries.filter(
        (inquiry) => inquiry.id !== action.payload
      );
      return {
        ...state,
        inquiries: updatedInquiries,
        filteredInquiries: updatedFiltered,
      };
    case "SET_PAGE":
      return { ...state, currentPage: action.payload };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

// Custom hook for form input
const useFormInput = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setValue(e.target.value);
  };

  const reset = () => setValue(initialValue);

  return { value, onChange: handleChange, reset };
};

// Search Form Component
const InquirySearchForm: React.FC<{
  onSearch: (filters: SearchFilters) => void;
}> = ({ onSearch }) => {
  const titleInput = useFormInput("");
  const secretSelect = useFormInput("all");
  const answeredSelect = useFormInput("all");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      title: titleInput.value,
      isSecret: secretSelect.value,
      isAnswered: answeredSelect.value,
    });
  };

  const handleReset = () => {
    titleInput.reset();
    secretSelect.reset();
    answeredSelect.reset();
    onSearch({
      title: "",
      isSecret: "all",
      isAnswered: "all",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">문의 검색</h2>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              문의 제목 검색
            </label>
            <input
              type="text"
              value={titleInput.value}
              onChange={titleInput.onChange}
              placeholder="문의 제목을 입력하세요"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              비밀 문의 여부
            </label>
            <select
              value={secretSelect.value}
              onChange={secretSelect.onChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">전체</option>
              <option value="true">비밀 문의</option>
              <option value="false">일반 문의</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              답변 여부
            </label>
            <select
              value={answeredSelect.value}
              onChange={answeredSelect.onChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">전체</option>
              <option value="true">답변 완료</option>
              <option value="false">답변 대기</option>
            </select>
          </div>

          <div className="flex items-end gap-2">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              검색
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
            >
              초기화
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

// Inquiry Table Row Component
const InquiryTableRow: React.FC<{
  inquiry: Inquiry;
  onDelete: (id: number) => void;
}> = ({ inquiry, onDelete }) => {
  const handleDelete = () => {
    if (confirm("정말로 이 문의를 삭제하시겠습니까?")) {
      onDelete(inquiry.id);
    }
  };

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
      <td className="py-3 px-4 text-gray-900">
        {String(inquiry.id).padStart(2, "0")}.
      </td>
      <td className="py-3 px-4">
        <Link
          href={`/inquiries/${inquiry.id}`}
          className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer transition-colors"
        >
          {inquiry.title}
        </Link>
      </td>
      <td className="py-3 px-4 text-gray-900">{inquiry.memberId}</td>
      <td className="py-3 px-4 text-gray-900">{inquiry.memberNickname}</td>
      <td className="py-3 px-4 text-gray-900">{inquiry.createdDate}</td>
      <td className="py-3 px-4">
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium transition-colors ${
            inquiry.isSecret
              ? "bg-red-100 text-red-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {inquiry.isSecret ? "비밀" : "일반"}
        </span>
      </td>
      <td className="py-3 px-4">
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium transition-colors ${
            inquiry.isAnswered
              ? "bg-blue-100 text-blue-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {inquiry.isAnswered ? "답변완료" : "답변대기"}
        </span>
      </td>
      <td className="py-3 px-4 text-gray-900">{inquiry.answeredDate || "-"}</td>
      <td className="py-3 px-4">
        <div className="flex gap-2">
          <Link
            href={`/inquiries/${inquiry.id}`}
            className="text-blue-600 hover:text-blue-800 p-1 rounded transition-colors"
            title="조회"
          >
            <Eye className="w-4 h-4" />
          </Link>
          <button
            onClick={handleDelete}
            className="text-red-600 hover:text-red-800 p-1 rounded transition-colors"
            title="삭제"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
};

// Pagination Component
const Pagination: React.FC<{
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  itemsPerPage: number;
}> = ({ currentPage, totalPages, onPageChange, totalItems, itemsPerPage }) => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  return (
    <div className="flex items-center justify-between mt-6">
      <div className="text-sm text-gray-600">
        총 {totalItems}개 중 {startIndex + 1}-{endIndex}개 표시
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => onPageChange(i + 1)}
            className={`px-3 py-2 border rounded-md transition-colors ${
              currentPage === i + 1
                ? "bg-blue-600 text-white border-blue-600"
                : "border-gray-300 hover:bg-gray-50"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// Main Component
const InquiryManagement: React.FC = () => {
  const mockInquiries: Inquiry[] = [
    {
      id: 1,
      title: "배송 관련 문의드립니다.",
      memberId: "user123",
      memberNickname: "홍길동",
      isSecret: false,
      isAnswered: true,
      createdDate: "2024-01-15",
      answeredDate: "2024-01-16",
    },
    {
      id: 2,
      title: "상품 교환 가능한가요?",
      memberId: "customer456",
      memberNickname: "김영희",
      isSecret: true,
      isAnswered: false,
      createdDate: "2024-01-14",
    },
    {
      id: 3,
      title: "결제 취소 요청드립니다.",
      memberId: "buyer789",
      memberNickname: "이철수",
      isSecret: false,
      isAnswered: true,
      createdDate: "2024-01-13",
      answeredDate: "2024-01-13",
    },
    {
      id: 4,
      title: "쿠폰 사용 관련 문의",
      memberId: "shopper321",
      memberNickname: "박미영",
      isSecret: true,
      isAnswered: false,
      createdDate: "2024-01-12",
    },
    {
      id: 5,
      title: "회원정보 수정 방법 문의",
      memberId: "member654",
      memberNickname: "최민수",
      isSecret: false,
      isAnswered: true,
      createdDate: "2024-01-11",
      answeredDate: "2024-01-12",
    },
  ];

  const [state, dispatch] = useReducer(inquiryReducer, {
    inquiries: mockInquiries,
    filteredInquiries: mockInquiries,
    currentPage: 1,
    isLoading: false,
    error: null,
  });

  const itemsPerPage = 10;

  // Filter inquiries based on search criteria
  const handleSearch = (filters: SearchFilters) => {
    let filtered = state.inquiries;

    if (filters.title) {
      filtered = filtered.filter((inquiry) =>
        inquiry.title.toLowerCase().includes(filters.title.toLowerCase())
      );
    }

    if (filters.isSecret !== "all") {
      filtered = filtered.filter(
        (inquiry) => inquiry.isSecret === (filters.isSecret === "true")
      );
    }

    if (filters.isAnswered !== "all") {
      filtered = filtered.filter(
        (inquiry) => inquiry.isAnswered === (filters.isAnswered === "true")
      );
    }

    dispatch({ type: "FILTER_INQUIRIES", payload: filtered });
  };

  const handleDelete = (id: number) => {
    dispatch({ type: "DELETE_INQUIRY", payload: id });
  };

  const handlePageChange = (page: number) => {
    dispatch({ type: "SET_PAGE", payload: page });
  };

  const totalPages = Math.ceil(state.filteredInquiries.length / itemsPerPage);
  const startIndex = (state.currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentInquiries = state.filteredInquiries.slice(startIndex, endIndex);

  if (state.isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">로딩 중...</div>
      </div>
    );
  }

  return (
    <div>
        {/* Search Section */}
        <InquirySearchForm onSearch={handleSearch} />

        {/* Error Display */}
        {state.error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
            <div className="text-red-800">{state.error}</div>
          </div>
        )}

        {/* Inquiries Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              문의 목록
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      문의 ID
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      문의 제목
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      회원 ID
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      회원 닉네임
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      문의 일자
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      비밀 문의
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      답변 여부
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      답변 일자
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      액션
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentInquiries.map((inquiry) => (
                    <InquiryTableRow
                      key={inquiry.id}
                      inquiry={inquiry}
                      onDelete={handleDelete}
                    />
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={state.currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                totalItems={state.filteredInquiries.length}
                itemsPerPage={itemsPerPage}
              />
            )}
          </div>
        </div>
    </div>
  );
};

export default InquiryManagement;
