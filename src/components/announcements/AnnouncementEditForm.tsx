"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, X, Upload, Trash2, Eye, EyeOff } from "lucide-react";

interface Announcement {
  id: string;
  title: string;
  content: string;
  isVisible: boolean;
  mediaFiles: string[];
  createdAt: string;
  updatedAt: string;
}

interface AnnouncementEditFormProps {
  id: string;
}

const AnnouncementEditForm: React.FC<AnnouncementEditFormProps> = ({ id }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // 폼 데이터
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    isVisible: true,
    mediaFiles: [] as string[],
  });

  // 원본 데이터 (placeholder용)
  const [originalData, setOriginalData] = useState<Announcement | null>(null);

  useEffect(() => {
    // 샘플 데이터에서 해당 ID의 공지사항 찾기
    const sampleData: Announcement[] = [
      {
        id: "1",
        title: "시스템 점검 안내",
        content:
          "안녕하세요. 고객 여러분께 시스템 점검에 대해 안내드립니다.\n\n2024년 1월 15일 오전 2시부터 4시까지 시스템 점검이 진행될 예정입니다.\n\n점검 기간 동안 다음과 같은 서비스가 일시 중단됩니다:\n- 온라인 주문 서비스\n- 고객센터 온라인 상담\n- 모바일 앱 서비스\n\n점검 완료 후 서비스는 정상적으로 재개됩니다.\n고객 여러분께 불편을 끼쳐드려 죄송합니다.\n\n감사합니다.",
        isVisible: true,
        mediaFiles: ["system_maintenance.jpg"],
        createdAt: "2024-01-10",
        updatedAt: "2024-01-10",
      },
      {
        id: "2",
        title: "신제품 출시 공지",
        content:
          "새로운 제품이 출시되었습니다.\n\n이번에 출시된 제품은 다음과 같습니다:\n\n1. 프리미엄 헤드폰 시리즈\n2. 무선 이어버드 컬렉션\n3. 스마트 워치 라인업\n\n많은 관심과 사랑 부탁드립니다.\n자세한 정보는 제품 페이지에서 확인하실 수 있습니다.",
        isVisible: true,
        mediaFiles: [],
        createdAt: "2024-01-08",
        updatedAt: "2024-01-08",
      },
      {
        id: "3",
        title: "배송 지연 안내",
        content:
          "물류 센터 사정으로 인한 배송 지연에 대해 안내드립니다.\n\n현재 물류 센터의 시설 점검으로 인해 일부 지역의 배송이 1-2일 지연될 수 있습니다.\n\n영향을 받는 지역:\n- 서울 강남구, 서초구\n- 경기도 성남시, 용인시\n- 인천 연수구\n\n빠른 시일 내에 정상화되도록 최선을 다하겠습니다.\n고객 여러분의 양해 부탁드립니다.",
        isVisible: false,
        mediaFiles: ["delivery_notice.pdf"],
        createdAt: "2024-01-05",
        updatedAt: "2024-01-06",
      },
      {
        id: "4",
        title: "고객센터 운영시간 변경",
        content:
          "고객센터 운영시간이 다음과 같이 변경됩니다.\n\n변경 전: 평일 09:00 - 18:00\n변경 후: 평일 09:00 - 20:00\n\n토요일: 10:00 - 16:00 (신규 운영)\n일요일 및 공휴일: 휴무\n\n더 나은 서비스 제공을 위한 변경사항입니다.\n감사합니다.",
        isVisible: true,
        mediaFiles: [],
        createdAt: "2024-01-03",
        updatedAt: "2024-01-03",
      },
      {
        id: "5",
        title: "할인 이벤트 안내",
        content:
          "신년 특가 할인 이벤트를 진행합니다!\n\n이벤트 기간: 2024년 1월 1일 - 1월 31일\n할인 혜택: 전 품목 최대 50% 할인\n\n특별 혜택:\n- 첫 구매 고객: 추가 10% 할인\n- 회원 등급별 추가 혜택\n- 무료배송 (5만원 이상 구매시)\n\n이 기회를 놓치지 마세요!\n자세한 내용은 이벤트 페이지에서 확인하실 수 있습니다.",
        isVisible: false,
        mediaFiles: ["event_banner1.jpg", "event_banner2.jpg"],
        createdAt: "2024-01-01",
        updatedAt: "2024-01-02",
      },
    ];

    const foundAnnouncement = sampleData.find((item) => item.id === id);
    if (foundAnnouncement) {
      setOriginalData(foundAnnouncement);
      setFormData({
        title: foundAnnouncement.title,
        content: foundAnnouncement.content,
        isVisible: foundAnnouncement.isVisible,
        mediaFiles: [...foundAnnouncement.mediaFiles],
      });
    }
    setLoading(false);
  }, [id]);

  const handleInputChange = (
    field: string,
    value: string | boolean | string[]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    setSaving(true);

    // 실제로는 API 호출
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setSaving(false);
    router.push(`/announcements/${id}`);
  };

  const handleCancel = () => {
    router.push(`/announcements/${id}`);
  };

  const handleBack = () => {
    router.push("/announcements");
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files).map((file) => file.name);
      setFormData((prev) => ({
        ...prev,
        mediaFiles: [...prev.mediaFiles, ...newFiles],
      }));
    }
  };

  const handleRemoveFile = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      mediaFiles: prev.mediaFiles.filter((_, i) => i !== index),
    }));
  };

  if (loading) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">로딩 중...</div>
        </div>
      </div>
    );
  }

  if (!originalData) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            공지사항을 찾을 수 없습니다
          </h2>
          <p className="text-gray-600 mb-6">
            요청하신 공지사항이 존재하지 않거나 삭제되었습니다.
          </p>
          <button
            onClick={handleBack}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            목록으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* 헤더 */}
      <div className="mb-6">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          목록으로 돌아가기
        </button>
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-semibold text-gray-800 mb-2">
              공지사항 수정
            </h1>
            <div className="text-sm text-gray-600">
              ID: {originalData.id} | 생성일: {originalData.createdAt}
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <X className="h-4 w-4" />
              취소
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              <Save className="h-4 w-4" />
              {saving ? "저장 중..." : "저장"}
            </button>
          </div>
        </div>
      </div>

      {/* 폼 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">
            공지사항 정보 수정
          </h2>
        </div>

        <div className="p-6 space-y-6">
          {/* 제목 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              제목 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder={originalData.title}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            <div className="mt-1 text-xs text-gray-500">
              기존: {originalData.title}
            </div>
          </div>

          {/* 노출 여부 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              노출 여부 <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="isVisible"
                  checked={formData.isVisible === true}
                  onChange={() => handleInputChange("isVisible", true)}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="flex items-center gap-1">
                  <Eye className="h-4 w-4 text-green-600" />
                  노출
                </span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="isVisible"
                  checked={formData.isVisible === false}
                  onChange={() => handleInputChange("isVisible", false)}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="flex items-center gap-1">
                  <EyeOff className="h-4 w-4 text-red-600" />
                  숨김
                </span>
              </label>
            </div>
            <div className="mt-1 text-xs text-gray-500">
              기존: {originalData.isVisible ? "노출" : "숨김"}
            </div>
          </div>

          {/* 내용 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              내용 <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => handleInputChange("content", e.target.value)}
              placeholder={originalData.content}
              rows={12}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
              required
            />
            <div className="mt-1 text-xs text-gray-500">
              기존 내용의 첫 줄: {originalData.content.split("\n")[0]}...
            </div>
          </div>

          {/* 미디어 파일 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              첨부 파일
            </label>

            {/* 파일 업로드 */}
            <div className="mb-4">
              <label className="flex items-center justify-center w-full px-4 py-6 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                <div className="text-center">
                  <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                  <div className="text-sm text-gray-600">
                    <span className="font-medium text-blue-600">
                      파일을 선택
                    </span>
                    하거나 드래그하여 업로드
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    PNG, JPG, PDF 파일만 지원
                  </div>
                </div>
                <input
                  type="file"
                  multiple
                  accept=".png,.jpg,.jpeg,.pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* 현재 파일 목록 */}
            {formData.mediaFiles.length > 0 && (
              <div className="space-y-2">
                <div className="text-sm font-medium text-gray-700">
                  현재 첨부된 파일:
                </div>
                {formData.mediaFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-700">
                        {file}
                      </div>
                      <div className="text-xs text-gray-500">
                        {file.includes(".jpg") || file.includes(".png")
                          ? "이미지 파일"
                          : "문서 파일"}
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveFile(index)}
                      className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50"
                      title="파일 삭제"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* 기존 파일 정보 */}
            {originalData.mediaFiles.length > 0 && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <div className="text-sm font-medium text-blue-800 mb-2">
                  기존 첨부 파일:
                </div>
                <div className="text-sm text-blue-600">
                  {originalData.mediaFiles.join(", ")}
                </div>
              </div>
            )}
          </div>

          {/* 수정 정보 */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              원본 정보
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm font-medium text-gray-600 mb-1">
                  공지사항 ID
                </div>
                <div className="text-gray-800">{originalData.id}</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm font-medium text-gray-600 mb-1">
                  원본 노출 상태
                </div>
                <div className="text-gray-800">
                  {originalData.isVisible ? "노출됨" : "숨김"}
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm font-medium text-gray-600 mb-1">
                  생성 일시
                </div>
                <div className="text-gray-800">{originalData.createdAt}</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm font-medium text-gray-600 mb-1">
                  최종 수정 일시
                </div>
                <div className="text-gray-800">{originalData.updatedAt}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementEditForm;
