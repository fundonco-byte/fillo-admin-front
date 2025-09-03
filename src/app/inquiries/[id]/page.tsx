"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Trash2 } from "lucide-react";
import Link from "next/link";
import Layout from "@/components/layout/Layout";
import AnswerForm from "@/components/inquiries/AnswerForm";

interface Inquiry {
  id: number;
  title: string;
  content: string;
  memberId: string;
  memberNickname: string;
  isSecret: boolean;
  createdDate: string;
  answer?: {
    content: string;
    images?: string[];
    createdDate: string;
  };
}

interface InquiryDetailPageProps {
  params: {
    id: string;
  };
}

const mockInquiries: Record<number, Inquiry> = {
  1: {
    id: 1,
    title: "배송 관련 문의드립니다.",
    content:
      "안녕하세요. 어제 주문한 상품의 배송 일정이 궁금합니다. 언제쯤 받을 수 있을까요?",
    memberId: "user123",
    memberNickname: "홍길동",
    isSecret: false,
    createdDate: "2024-01-15 10:30:00",
    answer: {
      content:
        "안녕하세요. 문의해주셔서 감사합니다. 고객님의 주문 상품은 내일 오후에 배송 예정입니다.",
      images: [],
      createdDate: "2024-01-16 09:15:00",
    },
  },
  2: {
    id: 2,
    title: "상품 교환 가능한가요?",
    content:
      "구매한 상품의 사이즈가 맞지 않아서 교환하고 싶습니다. 교환 정책이 어떻게 되나요?",
    memberId: "customer456",
    memberNickname: "김영희",
    isSecret: true,
    createdDate: "2024-01-14 15:45:00",
  },
  3: {
    id: 3,
    title: "결제 취소 요청드립니다.",
    content:
      "실수로 중복 주문을 했습니다. 하나는 취소하고 싶은데 어떻게 해야 하나요?",
    memberId: "buyer789",
    memberNickname: "이철수",
    isSecret: false,
    createdDate: "2024-01-13 11:20:00",
    answer: {
      content:
        "중복 주문 건에 대해 확인해드렸습니다. 최근 주문 건은 취소 처리해드렸으며, 결제 취소는 3-5일 내에 완료됩니다.",
      images: ["https://via.placeholder.com/300x200"],
      createdDate: "2024-01-13 14:30:00",
    },
  },
};

const InquiryDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const inquiryId = parseInt(params.id as string);

  const [inquiry, setInquiry] = useState<Inquiry | null>(null);
  const [showAnswerForm, setShowAnswerForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const inquiryData = mockInquiries[inquiryId];
    if (inquiryData) {
      setInquiry(inquiryData);
      setShowAnswerForm(!inquiryData.answer);
    }
  }, [inquiryId]);

  const handleSubmitAnswer = async (content: string, images: File[]) => {
    // 실제 구현에서는 서버에 답변을 전송하는 로직이 여기에 위치
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        if (inquiry) {
          const updatedInquiry = {
            ...inquiry,
            answer: {
              content,
              images: images.map(
                (_, index) =>
                  `https://via.placeholder.com/300x200?text=Image${index + 1}`
              ),
              createdDate: new Date()
                .toISOString()
                .replace("T", " ")
                .slice(0, 19),
            },
          };

          setInquiry(updatedInquiry);
          setShowAnswerForm(false);
          alert("답변이 등록되었습니다.");
        }
        resolve();
      }, 1000); // 1초 지연으로 네트워크 요청 시뮬레이션
    });
  };

  const handleDelete = () => {
    if (confirm("정말로 이 문의를 삭제하시겠습니까?")) {
      alert("문의가 삭제되었습니다.");
      router.push("/inquiries");
    }
  };

  if (!inquiry) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">문의를 찾을 수 없습니다.</div>
      </div>
    );
  }

  return (
    <Layout title="문의 상세">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link
              href="/inquiries"
              className="text-gray-600 hover:text-gray-800 flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              문의 목록으로
            </Link>
          </div>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            문의 삭제
          </button>
        </div>

        {/* Inquiry Details */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="border-b border-gray-200 pb-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-semibold text-gray-900">
                {inquiry.title}
              </h2>
              <div className="flex gap-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    inquiry.isSecret
                      ? "bg-red-100 text-red-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {inquiry.isSecret ? "비밀 문의" : "일반 문의"}
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    inquiry.answer
                      ? "bg-blue-100 text-blue-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {inquiry.answer ? "답변완료" : "답변대기"}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
              <div>
                <span className="font-medium">회원 ID:</span> {inquiry.memberId}
              </div>
              <div>
                <span className="font-medium">회원 닉네임:</span>{" "}
                {inquiry.memberNickname}
              </div>
              <div>
                <span className="font-medium">문의 일자:</span>{" "}
                {inquiry.createdDate}
              </div>
              <div>
                <span className="font-medium">답변 일자:</span>{" "}
                {inquiry.answer?.createdDate || "-"}
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-2">문의 내용</h3>
            <div className="bg-gray-50 rounded-md p-4 text-gray-700 whitespace-pre-wrap">
              {inquiry.content}
            </div>
          </div>
        </div>

        {/* Answer Section */}
        {inquiry.answer && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <h3 className="font-medium text-gray-900 mb-4">답변 내용</h3>
            <div className="bg-blue-50 rounded-md p-4 mb-4">
              <div className="text-gray-700 whitespace-pre-wrap mb-3">
                {inquiry.answer.content}
              </div>

              {inquiry.answer.images && inquiry.answer.images.length > 0 && (
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-2">
                    첨부 이미지
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {inquiry.answer.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`답변 이미지 ${index + 1}`}
                        className="w-full h-32 object-cover rounded-md border border-gray-200"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="text-sm text-gray-500">
              답변 일시: {inquiry.answer.createdDate}
            </div>
          </div>
        )}

        {/* Answer Form */}
        {showAnswerForm && (
          <AnswerForm
            onSubmit={handleSubmitAnswer}
            onCancel={() => setShowAnswerForm(false)}
          />
        )}

        {/* Add Answer Button for answered inquiries */}
        {!showAnswerForm && inquiry.answer && (
          <div className="flex justify-center">
            <button
              onClick={() => setShowAnswerForm(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              답변 수정
            </button>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                문의 삭제 확인
              </h3>
              <p className="text-gray-600 mb-6">
                정말로 이 문의를 삭제하시겠습니까?
                <br />
                <span className="text-red-600 font-medium">
                  삭제된 문의는 복구할 수 없습니다.
                </span>
              </p>
              <div className="flex gap-3">
                <button
                  onClick={handleDelete}
                  className="flex-1 bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition-colors"
                >
                  삭제
                </button>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-400 transition-colors"
                >
                  취소
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default InquiryDetailPage;
