"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, X, Upload, Trash2, Eye, EyeOff } from "lucide-react";

const AnnouncementCreateForm = () => {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  // 폼 데이터
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    isVisible: true,
    mediaFiles: [] as string[],
  });

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
    if (!formData.title.trim() || !formData.content.trim()) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    setSaving(true);

    // 실제로는 API 호출
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setSaving(false);
    router.push("/announcements");
  };

  const handleCancel = () => {
    router.push("/announcements");
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
              새 공지사항 작성
            </h1>
            <div className="text-sm text-gray-600">
              새로운 공지사항을 작성합니다.
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
          <h2 className="text-xl font-semibold text-gray-800">공지사항 정보</h2>
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
              placeholder="공지사항 제목을 입력하세요"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
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
              노출을 선택하면 사용자에게 공지사항이 표시됩니다.
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
              placeholder="공지사항 내용을 입력하세요..."
              rows={12}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
              required
            />
            <div className="mt-1 text-xs text-gray-500">
              상세한 공지사항 내용을 작성해주세요. 줄바꿈은 자동으로 적용됩니다.
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
                    PNG, JPG, PDF 파일만 지원 (최대 10MB)
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
                  첨부된 파일:
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
          </div>

          {/* 미리보기 */}
          {(formData.title || formData.content) && (
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                미리보기
              </h3>
              <div className="bg-gray-50 rounded-lg p-4">
                {formData.title && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-semibold text-gray-800">
                        {formData.title}
                      </h4>
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full ${
                          formData.isVisible
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {formData.isVisible ? (
                          <>
                            <Eye className="h-3 w-3" />
                            노출
                          </>
                        ) : (
                          <>
                            <EyeOff className="h-3 w-3" />
                            숨김
                          </>
                        )}
                      </span>
                    </div>
                  </div>
                )}
                {formData.content && (
                  <div className="bg-white rounded p-3">
                    <pre className="whitespace-pre-wrap text-gray-700 text-sm leading-relaxed font-sans">
                      {formData.content}
                    </pre>
                  </div>
                )}
                {formData.mediaFiles.length > 0 && (
                  <div className="mt-3">
                    <div className="text-sm font-medium text-gray-600 mb-2">
                      첨부 파일:
                    </div>
                    <div className="text-sm text-gray-500">
                      {formData.mediaFiles.join(", ")}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnnouncementCreateForm;
