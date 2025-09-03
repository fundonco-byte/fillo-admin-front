"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Upload, X, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Layout from "@/components/layout/Layout";

interface FormData {
  title: string;
  content: string;
  category: string;
  mediaFiles: File[];
}

export default function FAQCreatePage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    title: "",
    content: "",
    category: "",
    mediaFiles: [],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const removeFile = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      mediaFiles: prev.mediaFiles.filter((_, i) => i !== index),
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
      console.log("FAQ 생성:", formData);

      // 파일 업로드 시뮬레이션
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 성공 시 목록 페이지로 이동
      router.push("/faqs");
    } catch (error) {
      console.error("FAQ 생성 실패:", error);
      // 에러 처리
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout title="새 FAQ 생성">
      <div className="max-w-4xl mx-auto">
        {/* 헤더 */}
        <div className="mb-6">
          <Link href="/faqs">
            <Button variant="outline" className="mb-4">
              <ArrowLeft size={16} className="mr-2" />
              FAQ 목록으로 돌아가기
            </Button>
          </Link>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            새 FAQ 생성
          </h1>
          <p className="text-gray-600">새로운 자주 묻는 질문을 추가하세요</p>
        </div>

        {/* FAQ 생성 폼 */}
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

          {/* 미디어 파일 업로드 */}
          <div className="p-6 border-b">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              관련 미디어 파일
            </label>
            <div className="space-y-4">
              {/* 파일 업로드 버튼 */}
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-3 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">
                        클릭하여 파일 업로드
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

              {/* 업로드된 파일 목록 */}
              {formData.mediaFiles.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-700">
                    업로드된 파일
                  </h4>
                  <div className="space-y-2">
                    {formData.mediaFiles.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="flex-shrink-0">
                            <Upload size={16} className="text-gray-400" />
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
                          onClick={() => removeFile(index)}
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
              <Link href="/faqs">
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
                    생성 중...
                  </>
                ) : (
                  <>
                    <Save size={16} className="mr-2" />
                    FAQ 생성
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
}
