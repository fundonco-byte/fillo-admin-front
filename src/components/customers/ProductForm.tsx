"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Upload,
  Plus,
  X,
  Save,
  Eye,
  EyeOff,
  Package,
  Image as ImageIcon,
} from "lucide-react";

interface ProductOption {
  id: string;
  name: string;
  details: OptionDetail[];
}

interface OptionDetail {
  id: string;
  name: string;
  price: number;
}

export interface ProductFormData {
  name: string;
  price: number;
  category: string;
  images: string[];
  detailImages: string[];
  shippingCost: number;
  isVisible: boolean;
  modelNumber: string;
  hasOptions: boolean;
  options: ProductOption[];
  memo: string;
  isAvailable: boolean;
  stock: number;
}

interface ProductFormProps {
  mode: "create" | "edit";
  productId?: string;
  initialData?: ProductFormData;
}

const categories = ["전자제품", "의류", "가구", "도서", "스포츠"];

const ProductForm: React.FC<ProductFormProps> = ({
  mode,
  productId,
  initialData,
}) => {
  const router = useRouter();
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    price: 0,
    category: categories[0],
    images: [],
    detailImages: [],
    shippingCost: 0,
    isVisible: true,
    modelNumber: "",
    hasOptions: false,
    options: [],
    memo: "",
    isAvailable: true,
    stock: 0,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 수정 모드인 경우 초기 데이터 설정
  useEffect(() => {
    if (mode === "edit" && initialData) {
      setFormData(initialData);
    }
  }, [mode, initialData]);

  // 입력값 변경 핸들러
  const handleInputChange = (
    field: keyof ProductFormData,
    value: string | number | boolean | string[] | File[] | ProductOption[]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // 에러 클리어
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  // 이미지 업로드 핸들러
  const handleImageUpload = (
    type: "images" | "detailImages",
    files: FileList
  ) => {
    const newImages = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    setFormData((prev) => ({
      ...prev,
      [type]: [...prev[type], ...newImages],
    }));
  };

  // 이미지 삭제 핸들러
  const handleImageRemove = (
    type: "images" | "detailImages",
    index: number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index),
    }));
  };

  // 옵션 추가 핸들러
  const handleAddOption = () => {
    const newOption: ProductOption = {
      id: Date.now().toString(),
      name: "",
      details: [],
    };
    setFormData((prev) => ({
      ...prev,
      options: [...prev.options, newOption],
    }));
  };

  // 옵션 삭제 핸들러
  const handleRemoveOption = (optionId: string) => {
    setFormData((prev) => ({
      ...prev,
      options: prev.options.filter((option) => option.id !== optionId),
    }));
  };

  // 옵션 이름 변경 핸들러
  const handleOptionNameChange = (optionId: string, name: string) => {
    setFormData((prev) => ({
      ...prev,
      options: prev.options.map((option) =>
        option.id === optionId ? { ...option, name } : option
      ),
    }));
  };

  // 옵션 상세 추가 핸들러
  const handleAddOptionDetail = (optionId: string) => {
    const newDetail: OptionDetail = {
      id: Date.now().toString(),
      name: "",
      price: 0,
    };
    setFormData((prev) => ({
      ...prev,
      options: prev.options.map((option) =>
        option.id === optionId
          ? { ...option, details: [...option.details, newDetail] }
          : option
      ),
    }));
  };

  // 옵션 상세 삭제 핸들러
  const handleRemoveOptionDetail = (optionId: string, detailId: string) => {
    setFormData((prev) => ({
      ...prev,
      options: prev.options.map((option) =>
        option.id === optionId
          ? {
              ...option,
              details: option.details.filter(
                (detail) => detail.id !== detailId
              ),
            }
          : option
      ),
    }));
  };

  // 옵션 상세 변경 핸들러
  const handleOptionDetailChange = (
    optionId: string,
    detailId: string,
    field: keyof OptionDetail,
    value: string | number
  ) => {
    setFormData((prev) => ({
      ...prev,
      options: prev.options.map((option) =>
        option.id === optionId
          ? {
              ...option,
              details: option.details.map((detail) =>
                detail.id === detailId ? { ...detail, [field]: value } : detail
              ),
            }
          : option
      ),
    }));
  };

  // 폼 검증
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "상품명을 입력해주세요.";
    }

    if (formData.price <= 0) {
      newErrors.price = "가격은 0보다 큰 값이어야 합니다.";
    }

    if (formData.images.length === 0) {
      newErrors.images = "최소 1개의 상품 이미지를 업로드해주세요.";
    }

    if (formData.hasOptions && formData.options.length === 0) {
      newErrors.options = "옵션을 추가해주세요.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // API 호출 시뮬레이션
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 성공 처리
      router.push("/products");
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 가격 포맷팅
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ko-KR").format(price);
  };

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {mode === "create" ? "상품 생성" : "상품 수정"}
          </h1>
          <p className="text-gray-600 mt-1">
            {mode === "create"
              ? "새로운 상품을 생성하세요"
              : "상품 정보를 수정하세요"}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 기본 정보 */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            기본 정보
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 상품명 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                상품명 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="상품명을 입력하세요"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* 가격 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                가격 <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) =>
                  handleInputChange("price", parseInt(e.target.value) || 0)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="가격을 입력하세요"
                min="0"
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">{errors.price}</p>
              )}
            </div>

            {/* 카테고리 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                카테고리 <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleInputChange("category", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* 재고 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                재고 수량
              </label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) =>
                  handleInputChange("stock", parseInt(e.target.value) || 0)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="재고 수량을 입력하세요"
                min="0"
              />
            </div>

            {/* 모델 번호 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                모델 번호
              </label>
              <input
                type="text"
                value={formData.modelNumber}
                onChange={(e) =>
                  handleInputChange("modelNumber", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="모델 번호를 입력하세요"
              />
            </div>

            {/* 배송비 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                배송비
              </label>
              <input
                type="number"
                value={formData.shippingCost}
                onChange={(e) =>
                  handleInputChange(
                    "shippingCost",
                    parseInt(e.target.value) || 0
                  )
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="배송비를 입력하세요"
                min="0"
              />
            </div>
          </div>
        </div>

        {/* 상품 이미지 */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            상품 이미지
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                상품 메인 이미지 <span className="text-red-500">*</span>
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) =>
                    e.target.files &&
                    handleImageUpload("images", e.target.files)
                  }
                  className="hidden"
                  id="product-images"
                />
                <label
                  htmlFor="product-images"
                  className="flex flex-col items-center justify-center cursor-pointer"
                >
                  <ImageIcon size={48} className="text-gray-400 mb-2" />
                  <span className="text-sm text-gray-600">
                    이미지를 선택하거나 드래그하세요
                  </span>
                </label>
              </div>
              {errors.images && (
                <p className="text-red-500 text-sm mt-1">{errors.images}</p>
              )}

              {formData.images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image}
                        alt={`상품 이미지 ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => handleImageRemove("images", index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                상품 상세 이미지
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) =>
                    e.target.files &&
                    handleImageUpload("detailImages", e.target.files)
                  }
                  className="hidden"
                  id="detail-images"
                />
                <label
                  htmlFor="detail-images"
                  className="flex flex-col items-center justify-center cursor-pointer"
                >
                  <ImageIcon size={48} className="text-gray-400 mb-2" />
                  <span className="text-sm text-gray-600">
                    상세 이미지를 선택하거나 드래그하세요
                  </span>
                </label>
              </div>

              {formData.detailImages.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  {formData.detailImages.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image}
                        alt={`상세 이미지 ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => handleImageRemove("detailImages", index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 상품 옵션 */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            상품 옵션
          </h2>

          <div className="space-y-4">
            {/* 옵션 사용 여부 */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="hasOptions"
                checked={formData.hasOptions}
                onChange={(e) =>
                  handleInputChange("hasOptions", e.target.checked)
                }
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="hasOptions"
                className="text-sm font-medium text-gray-700"
              >
                상품 옵션 사용
              </label>
            </div>

            {formData.hasOptions && (
              <div className="space-y-4">
                {formData.options.map((option, optionIndex) => (
                  <div
                    key={option.id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <input
                        type="text"
                        value={option.name}
                        onChange={(e) =>
                          handleOptionNameChange(option.id, e.target.value)
                        }
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="옵션 이름 (예: 색상, 사이즈)"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveOption(option.id)}
                        className="ml-2 p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <X size={16} />
                      </button>
                    </div>

                    {/* 옵션 상세 */}
                    <div className="space-y-2">
                      {option.details.map((detail, detailIndex) => (
                        <div
                          key={detail.id}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="text"
                            value={detail.name}
                            onChange={(e) =>
                              handleOptionDetailChange(
                                option.id,
                                detail.id,
                                "name",
                                e.target.value
                              )
                            }
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="상세 옵션 이름"
                          />
                          <input
                            type="number"
                            value={detail.price}
                            onChange={(e) =>
                              handleOptionDetailChange(
                                option.id,
                                detail.id,
                                "price",
                                parseInt(e.target.value) || 0
                              )
                            }
                            className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="추가 가격"
                            min="0"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              handleRemoveOptionDetail(option.id, detail.id)
                            }
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => handleAddOptionDetail(option.id)}
                        className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
                      >
                        <Plus size={16} />
                        <span>상세 옵션 추가</span>
                      </button>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={handleAddOption}
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
                >
                  <Plus size={16} />
                  <span>옵션 추가</span>
                </button>

                {errors.options && (
                  <p className="text-red-500 text-sm">{errors.options}</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* 추가 설정 */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            추가 설정
          </h2>

          <div className="space-y-4">
            {/* 상품 노출 여부 */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isVisible"
                checked={formData.isVisible}
                onChange={(e) =>
                  handleInputChange("isVisible", e.target.checked)
                }
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="isVisible"
                className="text-sm font-medium text-gray-700"
              >
                상품 노출
              </label>
            </div>

            {/* 판매 가능 여부 */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isAvailable"
                checked={formData.isAvailable}
                onChange={(e) =>
                  handleInputChange("isAvailable", e.target.checked)
                }
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="isAvailable"
                className="text-sm font-medium text-gray-700"
              >
                판매 가능
              </label>
            </div>

            {/* 상품 관련 메모 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                상품 관련 메모
              </label>
              <textarea
                value={formData.memo}
                onChange={(e) => handleInputChange("memo", e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="상품에 대한 메모를 입력하세요..."
              />
            </div>
          </div>
        </div>

        {/* 제출 버튼 */}
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
          >
            취소
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            <Save size={16} />
            <span>
              {isSubmitting
                ? "저장 중..."
                : mode === "create"
                ? "상품 생성"
                : "상품 수정"}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
