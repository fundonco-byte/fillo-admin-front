"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Edit,
  Trash2,
  Calendar,
  Tag,
  Image as ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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

export default function FAQDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [faq, setFaq] = useState<FAQ | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const faqId = parseInt(params.id as string);

  useEffect(() => {
    // 실제로는 API 호출
    const foundFaq = mockFAQs.find((f) => f.id === faqId);
    setFaq(foundFaq || null);
  }, [faqId]);

  const handleDelete = () => {
    // 실제로는 API 호출
    console.log("FAQ 삭제:", faqId);
    router.push("/faqs");
  };

  if (!faq) {
    return (
      <Layout title="FAQ 상세정보">
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
      </Layout>
    );
  }

  return (
    <Layout title="FAQ 상세정보">
      <div className="max-w-4xl mx-auto">
        {/* 헤더 */}
        <div className="mb-6">
          <Link href="/faqs">
            <Button variant="outline" className="mb-4">
              <ArrowLeft size={16} className="mr-2" />
              FAQ 목록으로 돌아가기
            </Button>
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                FAQ 상세정보
              </h1>
              <p className="text-gray-600">
                FAQ ID: {faq.id.toString().padStart(3, "0")}
              </p>
            </div>
            <div className="flex gap-2">
              <Link href={`/faqs/edit/${faq.id}`}>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Edit size={16} className="mr-2" />
                  수정
                </Button>
              </Link>
              <Button
                variant="destructive"
                onClick={() => setDeleteConfirm(true)}
              >
                <Trash2 size={16} className="mr-2" />
                삭제
              </Button>
            </div>
          </div>
        </div>

        {/* FAQ 상세 내용 */}
        <div className="bg-white rounded-lg shadow-sm border">
          {/* FAQ 제목 */}
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {faq.title}
            </h2>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Tag size={16} />
                <span>유형: {faq.category}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar size={16} />
                <span>생성일: {faq.createdAt}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar size={16} />
                <span>수정일: {faq.updatedAt}</span>
              </div>
            </div>
          </div>

          {/* FAQ 내용 */}
          <div className="p-6 border-b">
            <h3 className="text-lg font-medium text-gray-900 mb-3">FAQ 답변</h3>
            <div className="prose max-w-none">
              <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                {faq.content}
              </div>
            </div>
          </div>

          {/* 미디어 파일 */}
          {faq.mediaFiles && faq.mediaFiles.length > 0 && (
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                관련 미디어 파일
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {faq.mediaFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    <ImageIcon size={20} className="text-gray-400" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {file}
                      </p>
                      <p className="text-xs text-gray-500">첨부파일</p>
                    </div>
                    <Button variant="outline" size="sm">
                      다운로드
                    </Button>
                  </div>
                ))}
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
                <Button
                  variant="outline"
                  onClick={() => setDeleteConfirm(false)}
                >
                  취소
                </Button>
                <Button variant="destructive" onClick={handleDelete}>
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
