"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Upload,
  Save,
  Eye,
  EyeOff,
  Calendar,
  Image as ImageIcon,
  X,
  AlertCircle,
} from "lucide-react";

// 배너 타입
type BannerType = "main" | "event" | "promotion" | "notice";

// 배너 폼 데이터 인터페이스
interface BannerFormData {
  name: string;
  type: BannerType;
  imageUrl: string;
  imageFile?: File;
  startDate: string;
  endDate: string;
  isVisible: boolean;
  description?: string;
}

// 배너 폼 Props
interface BannerFormProps {
  mode: "create" | "edit";
  bannerId?: string;
  initialData?: BannerFormData;
}

// 배너 타입 옵션
const bannerTypeOptions = [
  {
    value: "main",
    label: "메인 배너",
    description: "홈페이지 메인에 노출되는 배너",
  },
  {
    value: "event",
    label: "이벤트 배너",
    description: "이벤트 페이지에 노출되는 배너",
  },
  {
    value: "promotion",
    label: "프로모션 배너",
    description: "할인 및 프로모션 안내 배너",
  },
  {
    value: "notice",
    label: "공지사항 배너",
    description: "공지사항 및 안내 배너",
  },
];

// 샘플 배너 데이터 (수정 모드에서 사용)
const sampleBannerData: { [key: string]: BannerFormData } = {
  "1": {
    name: "신상품 출시 이벤트",
    type: "event",
    imageUrl: "/api/placeholder/400/200",
    startDate: "2024-01-01",
    endDate: "2024-02-28",
    isVisible: true,
    description: "신상품 출시를 기념하는 이벤트 배너입니다.",
  },
  "2": {
    name: "메인 홈페이지 배너",
    type: "main",
    imageUrl: "/api/placeholder/400/200",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    isVisible: true,
    description: "메인 홈페이지에 노출되는 배너입니다.",
  },
  "3": {
    name: "할인 프로모션",
    type: "promotion",
    imageUrl: "/api/placeholder/400/200",
    startDate: "2024-03-01",
    endDate: "2024-03-31",
    isVisible: false,
    description: "특가 할인 프로모션 배너입니다.",
  },
  "4": {
    name: "서비스 점검 공지",
    type: "notice",
    imageUrl: "/api/placeholder/400/200",
    startDate: "2024-02-01",
    endDate: "2024-02-05",
    isVisible: true,
    description: "서비스 점검 안내 배너입니다.",
  },
};

const BannerForm: React.FC<BannerFormProps> = ({
  mode,
  bannerId,
  initialData,
}) => {
  const router = useRouter();
  const [formData, setFormData] = useState<BannerFormData>({
    name: "",
    type: "main",
    imageUrl: "",
    startDate: "",
    endDate: "",
    isVisible: true,
    description: "",
  });
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [dragActive, setDragActive] = useState(false);

  // 초기 데이터 설정
  useEffect(() => {
    if (mode === "edit" && bannerId) {
      const bannerData = sampleBannerData[bannerId];
      if (bannerData) {
        setFormData(bannerData);
        setImagePreview(bannerData.imageUrl);
      }
    } else if (initialData) {
      setFormData(initialData);
      setImagePreview(initialData.imageUrl);
    }
  }, [mode, bannerId, initialData]);

  // 폼 데이터 변경 핸들러
  const handleChange = (
    key: keyof BannerFormData,
    value: string | boolean | File | null
  ) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));

    // 에러 초기화
    if (errors[key]) {
      setErrors((prev) => ({
        ...prev,
        [key]: "",
      }));
    }
  };

  // 이미지 업로드 핸들러
  const handleImageUpload = (file: File) => {
    if (file) {
      // 파일 타입 검증
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
      ];
      if (!allowedTypes.includes(file.type)) {
        setErrors((prev) => ({
          ...prev,
          imageFile: "JPG, PNG, GIF, WebP 파일만 업로드 가능합니다.",
        }));
        return;
      }

      // 파일 크기 검증 (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          imageFile: "파일 크기는 5MB 이하여야 합니다.",
        }));
        return;
      }

      // 파일 미리보기
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      setFormData((prev) => ({
        ...prev,
        imageFile: file,
        imageUrl: "",
      }));

      // 에러 초기화
      setErrors((prev) => ({
        ...prev,
        imageFile: "",
      }));
    }
  };

  // 파일 입력 핸들러
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  // 드래그 앤 드롭 핸들러
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  // 이미지 제거 핸들러
  const handleRemoveImage = () => {
    setFormData((prev) => ({
      ...prev,
      imageFile: undefined,
      imageUrl: "",
    }));
    setImagePreview("");
  };

  // 폼 검증
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = "배너명을 입력해주세요.";
    }

    if (!formData.type) {
      newErrors.type = "배너 타입을 선택해주세요.";
    }

    if (!formData.imageUrl && !formData.imageFile) {
      newErrors.imageFile = "배너 이미지를 업로드해주세요.";
    }

    if (!formData.startDate) {
      newErrors.startDate = "시작 날짜를 선택해주세요.";
    }

    if (!formData.endDate) {
      newErrors.endDate = "종료 날짜를 선택해주세요.";
    }

    if (formData.startDate && formData.endDate) {
      if (new Date(formData.startDate) > new Date(formData.endDate)) {
        newErrors.endDate = "종료 날짜는 시작 날짜보다 늦어야 합니다.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // 여기에 실제 API 호출 로직을 추가합니다.
      await new Promise((resolve) => setTimeout(resolve, 1000)); // 시뮬레이션

      console.log("배너 데이터:", formData);

      // 성공 후 목록 페이지로 이동
      router.push("/banners");
    } catch (error) {
      console.error("배너 저장 실패:", error);
      setErrors((prev) => ({
        ...prev,
        submit: "배너 저장에 실패했습니다. 다시 시도해주세요.",
      }));
    } finally {
      setIsLoading(false);
    }
  };

  // 뒤로 가기 핸들러
  const handleGoBack = () => {
    router.push("/banners");
  };

  // 배너 타입 정보 가져오기
  const getBannerTypeInfo = (type: BannerType) => {
    return bannerTypeOptions.find((option) => option.value === type);
  };

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleGoBack}
            className="inline-flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {mode === "create" ? "배너 생성" : "배너 수정"}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {mode === "create"
                ? "새로운 배너를 생성합니다."
                : "배너 정보를 수정합니다."}
            </p>
          </div>
        </div>
      </div>

      {/* 폼 */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 좌측 폼 영역 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 기본 정보 */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                기본 정보
              </h2>

              <div className="space-y-4">
                {/* 배너명 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    배너명 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder="배너명을 입력하세요"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                  )}
                </div>

                {/* 배너 타입 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    배너 타입 <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) =>
                      handleChange("type", e.target.value as BannerType)
                    }
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.type ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    {bannerTypeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {formData.type && (
                    <p className="mt-1 text-sm text-gray-500">
                      {getBannerTypeInfo(formData.type)?.description}
                    </p>
                  )}
                  {errors.type && (
                    <p className="mt-1 text-sm text-red-500">{errors.type}</p>
                  )}
                </div>

                {/* 설명 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    설명
                  </label>
                  <textarea
                    value={formData.description || ""}
                    onChange={(e) =>
                      handleChange("description", e.target.value)
                    }
                    placeholder="배너에 대한 설명을 입력하세요"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* 이미지 업로드 */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                배너 이미지
              </h2>

              <div className="space-y-4">
                {/* 이미지 미리보기 */}
                {imagePreview && (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="배너 미리보기"
                      className="w-full max-w-lg h-48 object-cover rounded-lg border border-gray-300"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* 드래그 앤 드롭 영역 */}
                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                    dragActive
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <div className="space-y-2">
                    <ImageIcon className="w-10 h-10 mx-auto text-gray-400" />
                    <div className="text-sm text-gray-600">
                      <label className="cursor-pointer">
                        <span className="text-blue-600 font-medium">
                          클릭하여 파일 선택
                        </span>
                        <span className="text-gray-500">
                          {" "}
                          또는 드래그하여 업로드
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileInput}
                          className="hidden"
                        />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">
                      JPG, PNG, GIF, WebP 파일 (최대 5MB)
                    </p>
                  </div>
                </div>

                {errors.imageFile && (
                  <p className="text-sm text-red-500">{errors.imageFile}</p>
                )}
              </div>
            </div>

            {/* 게시 기간 */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                게시 기간
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 시작 날짜 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    시작 날짜 <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) =>
                        handleChange("startDate", e.target.value)
                      }
                      className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.startDate ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                  </div>
                  {errors.startDate && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.startDate}
                    </p>
                  )}
                </div>

                {/* 종료 날짜 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    종료 날짜 <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => handleChange("endDate", e.target.value)}
                      className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.endDate ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                  </div>
                  {errors.endDate && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.endDate}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 우측 설정 영역 */}
          <div className="space-y-6">
            {/* 배너 상태 */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                배너 상태
              </h2>

              <div className="space-y-4">
                {/* 노출 여부 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    노출 여부
                  </label>
                  <div className="flex items-center space-x-3">
                    <button
                      type="button"
                      onClick={() =>
                        handleChange("isVisible", !formData.isVisible)
                      }
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        formData.isVisible ? "bg-blue-600" : "bg-gray-200"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          formData.isVisible ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                    <span className="text-sm text-gray-700">
                      {formData.isVisible ? (
                        <span className="flex items-center text-green-600">
                          <Eye className="w-4 h-4 mr-1" />
                          노출
                        </span>
                      ) : (
                        <span className="flex items-center text-gray-500">
                          <EyeOff className="w-4 h-4 mr-1" />
                          비노출
                        </span>
                      )}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    {formData.isVisible
                      ? "배너가 사용자에게 노출됩니다."
                      : "배너가 사용자에게 노출되지 않습니다."}
                  </p>
                </div>
              </div>
            </div>

            {/* 저장 버튼 */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="space-y-4">
                {errors.submit && (
                  <div className="flex items-center p-3 text-red-700 bg-red-50 rounded-lg">
                    <AlertCircle className="w-5 h-5 mr-2" />
                    <span className="text-sm">{errors.submit}</span>
                  </div>
                )}

                <div className="flex flex-col space-y-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        저장 중...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        {mode === "create" ? "배너 생성" : "변경사항 저장"}
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleGoBack}
                    className="w-full inline-flex items-center justify-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    취소
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BannerForm;
