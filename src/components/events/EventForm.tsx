"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  Upload,
  Eye,
  EyeOff,
  Save,
  Calendar,
  FileText,
  Image,
} from "lucide-react";

interface EventData {
  id?: string;
  title: string;
  content: string;
  imageUrl: string;
  startDate: string;
  endDate: string;
  isVisible: boolean;
}

interface EventFormProps {
  initialData?: EventData;
  mode: "create" | "edit";
}

const EventForm: React.FC<EventFormProps> = ({ initialData, mode }) => {
  const router = useRouter();
  const [formData, setFormData] = useState<EventData>({
    title: initialData?.title || "",
    content: initialData?.content || "",
    imageUrl: initialData?.imageUrl || "",
    startDate: initialData?.startDate || "",
    endDate: initialData?.endDate || "",
    isVisible: initialData?.isVisible || true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleVisibilityToggle = () => {
    setFormData((prev) => ({
      ...prev,
      isVisible: !prev.isVisible,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 실제 구현에서는 API 호출
      console.log("Form data:", formData);

      // 성공 시 이벤트 관리 페이지로 이동
      router.push("/events");
    } catch (error) {
      console.error("Error saving event:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* 헤더 */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={handleGoBack}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronLeft size={20} />
          뒤로가기
        </button>
        <h1 className="text-2xl font-bold text-gray-800">
          {mode === "create" ? "새 이벤트 등록" : "이벤트 수정"}
        </h1>
      </div>

      {/* 폼 */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-md p-6"
      >
        {/* 이벤트 제목 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            이벤트 제목 *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="이벤트 제목을 입력하세요"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* 이벤트 내용 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <FileText className="inline mr-2" size={16} />
            이벤트 내용 *
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            placeholder="이벤트 내용을 입력하세요"
            rows={5}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            required
          />
        </div>

        {/* 이벤트 이미지 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Image className="inline mr-2" size={16} />
            이벤트 이미지
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-600 mb-2">
              클릭하여 이미지를 업로드하거나 파일을 드래그하세요
            </p>
            <p className="text-gray-400 text-sm">
              JPG, PNG, GIF 파일만 지원됩니다 (최대 5MB)
            </p>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors"
            >
              파일 선택
            </label>
          </div>
          {formData.imageUrl && (
            <div className="mt-4">
              <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                이미지 미리보기
              </div>
            </div>
          )}
        </div>

        {/* 이벤트 기간 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Calendar className="inline mr-2" size={16} />
            이벤트 기간 *
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">시작일</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">종료일</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
        </div>

        {/* 노출 여부 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            노출 여부
          </label>
          <button
            type="button"
            onClick={handleVisibilityToggle}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
              formData.isVisible
                ? "bg-green-50 border-green-200 text-green-700"
                : "bg-red-50 border-red-200 text-red-700"
            }`}
          >
            {formData.isVisible ? (
              <>
                <Eye size={16} />
                노출
              </>
            ) : (
              <>
                <EyeOff size={16} />
                비노출
              </>
            )}
          </button>
        </div>

        {/* 제출 버튼 */}
        <div className="flex gap-3 justify-end pt-4 border-t">
          <button
            type="button"
            onClick={handleGoBack}
            className="px-6 py-2 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
          >
            취소
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save size={16} />
            {isSubmitting ? "저장 중..." : mode === "create" ? "등록" : "수정"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;
