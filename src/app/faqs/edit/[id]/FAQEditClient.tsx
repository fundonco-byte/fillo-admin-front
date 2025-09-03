"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Upload, X, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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

interface FormData {
  title: string;
  content: string;
  category: string;
  mediaFiles: File[];
  existingMediaFiles: string[];
}

// 더미 데이터 (실제로는 API에서 가져옴)
const mockFAQs: FAQ[] = [
  {
    id: 1,
    title: "제품 반품은 어떻게 하나요?",
    content:
      "제품 반품은 구매일로부터 7일 이내에 가능합니다.\n\n반품 절차:\n1. 고객센터 연락 (1588-1234)\n2. 반품 사유 및 주문번호 알려주기\n3. 택배 수거 일정 조율\n4. 상품 포장 후 반품 완료\n\n※ 주의사항: 상품 개봉 및 사용 흔적이 있는 경우 반품이 불가능할 수 있습니다.",
    category: "제품",
    mediaFiles: ["return-guide.jpg", "return-process.pdf"],
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15",
  },
  {
    id: 2,
    title: "배송 기간은 얼마나 걸리나요?",
    content:
      "배송 기간은 주문 확인 후 다음과 같습니다:\n\n• 일반 배송: 2-3일 (평일 기준)\n• 익일 배송: 다음날 18시 이전 (오후 2시 이전 주문시)\n• 도서/산간 지역: 추가 1-2일 소요\n\n배송 조회는 주문 완료 후 발송된 운송장 번호로 확인 가능합니다.",
    category: "서비스",
    mediaFiles: [],
    createdAt: "2024-01-14",
    updatedAt: "2024-01-14",
  },
  {
    id: 3,
    title: "회원가입 혜택은 무엇인가요?",
    content:
      "회원가입 시 다음과 같은 혜택을 받으실 수 있습니다:\n\n🎁 즉시 혜택:\n• 5% 할인 쿠폰 (3만원 이상 구매시)\n• 무료배송 쿠폰 (첫 구매시)\n\n💎 등급별 혜택:\n• 실버: 구매금액의 1% 적립\n• 골드: 구매금액의 2% 적립 + 생일 쿠폰\n• 플래티넘: 구매금액의 3% 적립 + 무료배송 + 우선 상담\n\n더 자세한 내용은 마이페이지에서 확인하세요!",
    category: "서비스",
    mediaFiles: ["membership-benefits.png"],
    createdAt: "2024-01-13",
    updatedAt: "2024-01-13",
  },
  {
    id: 4,
    title: "결제 오류가 발생했습니다",
    content:
      "결제 오류가 발생한 경우 다음 사항을 확인해주세요:\n\n🔍 일반적인 해결 방법:\n1. 인터넷 연결 상태 확인\n2. 브라우저 새로고침 후 재시도\n3. 다른 결제 수단으로 변경\n4. 카드 한도 및 잔액 확인\n\n💳 카드 관련 오류:\n• 카드사 승인 거부: 카드사 고객센터 문의\n• 해외 결제 차단: 카드사에서 해제 요청\n• 온라인 결제 차단: 인터넷뱅킹에서 설정 변경\n\n그래도 해결되지 않으면 고객센터(1588-1234)로 연락주시면 신속히 처리해드립니다.",
    category: "제품",
    mediaFiles: [],
    createdAt: "2024-01-12",
    updatedAt: "2024-01-12",
  },
  {
    id: 5,
    title: "상품 문의는 어떻게 하나요?",
    content:
      "상품 문의는 다음과 같은 방법으로 가능합니다:\n\n📱 온라인 문의:\n• 상품 상세페이지 → '상품 문의' 버튼 클릭\n• 1:1 문의하기 (로그인 필요)\n• 카카오톡 상담 (평일 9시-18시)\n\n📞 전화 문의:\n• 고객센터: 1588-1234\n• 운영시간: 평일 9시-18시 (점심시간 12-13시 제외)\n• 주말/공휴일: 휴무\n\n답변은 평일 기준 24시간 이내에 드립니다.",
    category: "서비스",
    mediaFiles: ["contact-guide.jpg"],
    createdAt: "2024-01-11",
    updatedAt: "2024-01-11",
  },
];

interface FAQEditClientProps {
  faqId: number;
}

const FAQEditClient: React.FC<FAQEditClientProps> = ({ faqId }) => {
  const router = useRouter();
  const [faq, setFaq] = useState<FAQ | null>(null);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    content: "",
    category: "",
    mediaFiles: [],
    existingMediaFiles: [],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // 실제로는 API 호출
    const foundFaq = mockFAQs.find((f) => f.id === faqId);
    if (foundFaq) {
      setFaq(foundFaq);
      setFormData({
        title: foundFaq.title,
        content: foundFaq.content,
        category: foundFaq.category,
        mediaFiles: [],
        existingMediaFiles: foundFaq.mediaFiles,
      });
    }
  }, [faqId]);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // 에러 메시지 클리어
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setFormData((prev) => ({
      ...prev,
      mediaFiles: [...prev.mediaFiles, ...files],
    }));
  };

  const removeNewFile = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      mediaFiles: prev.mediaFiles.filter((_, i) => i !== index),
    }));
  };

  const removeExistingFile = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      existingMediaFiles: prev.existingMediaFiles.filter((_, i) => i !== index),
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "FAQ 제목을 입력해주세요.";
    }

    if (!formData.content.trim()) {
      newErrors.content = "FAQ 내용을 입력해주세요.";
    }

    if (!formData.category) {
      newErrors.category = "FAQ 유형을 선택해주세요.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // 실제로는 API 호출
      console.log("FAQ 수정:", formData);

      // 파일 업로드 시뮬레이션
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 성공 시 상세 페이지로 이동
      router.push(`/faqs/${faqId}`);
    } catch (error) {
      console.error("FAQ 수정 실패:", error);
      // 에러 처리
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!faq) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            FAQ를 찾을 수 없습니다
          </h2>
          <p className="text-gray-600 mb-4">
            요청하신 FAQ가 존재하지 않거나 삭제되었습니다.
          </p>
          <Link href="/faqs">
            <Button variant="outline">
              <ArrowLeft size={16} className="mr-2" />
              FAQ 목록으로 돌아가기
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* 헤더 */}
      <div className="mb-6">
        <Link href={`/faqs/${faqId}`}>
          <Button variant="outline" className="mb-4">
            <ArrowLeft size={16} className="mr-2" />
            FAQ 상세로 돌아가기
          </Button>
        </Link>
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">FAQ 수정</h1>
        <p className="text-gray-600">
          FAQ ID: {faq.id.toString().padStart(3, "0")}
        </p>
      </div>

      {/* FAQ 수정 폼 */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-sm border"
      >
        {/* FAQ 제목 */}
        <div className="p-6 border-b">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            FAQ 질문 제목 <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            value={formData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            placeholder="예: 제품 반품은 어떻게 하나요?"
            className={`w-full ${errors.title ? "border-red-300" : ""}`}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title}</p>
          )}
        </div>

        {/* FAQ 유형 */}
        <div className="p-6 border-b">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            FAQ 유형 <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.category}
            onChange={(e) => handleInputChange("category", e.target.value)}
            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.category ? "border-red-300" : ""
            }`}
          >
            <option value="">유형을 선택해주세요</option>
            <option value="제품">제품</option>
            <option value="서비스">서비스</option>
            <option value="배송">배송</option>
            <option value="결제">결제</option>
            <option value="회원">회원</option>
            <option value="기타">기타</option>
          </select>
          {errors.category && (
            <p className="mt-1 text-sm text-red-600">{errors.category}</p>
          )}
        </div>

        {/* FAQ 내용 */}
        <div className="p-6 border-b">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            FAQ 답변 내용 <span className="text-red-500">*</span>
          </label>
          <Textarea
            value={formData.content}
            onChange={(e) => handleInputChange("content", e.target.value)}
            placeholder="FAQ에 대한 상세한 답변을 입력해주세요..."
            rows={10}
            className={`w-full ${errors.content ? "border-red-300" : ""}`}
          />
          {errors.content && (
            <p className="mt-1 text-sm text-red-600">{errors.content}</p>
          )}
          <p className="mt-2 text-sm text-gray-500">
            답변은 고객이 이해하기 쉽도록 명확하고 친절하게 작성해주세요.
          </p>
        </div>

        {/* 미디어 파일 관리 */}
        <div className="p-6 border-b">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            관련 미디어 파일
          </label>
          <div className="space-y-4">
            {/* 기존 파일 목록 */}
            {formData.existingMediaFiles.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-700">기존 파일</h4>
                <div className="space-y-2">
                  {formData.existingMediaFiles.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <Upload size={16} className="text-blue-600" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {file}
                          </p>
                          <p className="text-xs text-gray-500">기존 첨부파일</p>
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeExistingFile(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <X size={16} />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 파일 업로드 버튼 */}
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-3 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">
                      클릭하여 새 파일 업로드
                    </span>{" "}
                    또는 드래그 앤 드롭
                  </p>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, PDF (최대 10MB)
                  </p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  multiple
                  accept="image/*,application/pdf"
                  onChange={handleFileUpload}
                />
              </label>
            </div>

            {/* 새로 업로드된 파일 목록 */}
            {formData.mediaFiles.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-700">
                  새로 업로드된 파일
                </h4>
                <div className="space-y-2">
                  {formData.mediaFiles.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <Upload size={16} className="text-green-600" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {file.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeNewFile(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <X size={16} />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 제출 버튼 */}
        <div className="p-6">
          <div className="flex gap-3 justify-end">
            <Link href={`/faqs/${faqId}`}>
              <Button type="button" variant="outline">
                취소
              </Button>
            </Link>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  수정 중...
                </>
              ) : (
                <>
                  <Save size={16} className="mr-2" />
                  FAQ 수정
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FAQEditClient;
