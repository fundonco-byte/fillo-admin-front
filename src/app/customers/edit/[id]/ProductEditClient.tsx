"use client";

import { useState, useEffect } from "react";
import ProductForm, {
  ProductFormData,
} from "@/components/products/ProductForm";

// 샘플 상품 데이터 (실제로는 API에서 가져와야 함)
const sampleProductData = {
  "1": {
    name: "아이폰 15 Pro",
    price: 1500000,
    category: "전자제품",
    images: ["/api/placeholder/200/200"],
    detailImages: ["/api/placeholder/400/400"],
    shippingCost: 3000,
    isVisible: true,
    modelNumber: "A2848",
    hasOptions: true,
    options: [
      {
        id: "1",
        name: "색상",
        details: [
          { id: "1", name: "블루", price: 0 },
          { id: "2", name: "실버", price: 0 },
          { id: "3", name: "골드", price: 50000 },
        ],
      },
      {
        id: "2",
        name: "용량",
        details: [
          { id: "1", name: "128GB", price: 0 },
          { id: "2", name: "256GB", price: 100000 },
          { id: "3", name: "512GB", price: 300000 },
        ],
      },
    ],
    memo: "최신 아이폰 모델입니다.",
    isAvailable: true,
    stock: 25,
  },
  "2": {
    name: "삼성 갤럭시 S24",
    price: 1200000,
    category: "전자제품",
    images: ["/api/placeholder/200/200"],
    detailImages: ["/api/placeholder/400/400"],
    shippingCost: 3000,
    isVisible: true,
    modelNumber: "SM-S921",
    hasOptions: true,
    options: [
      {
        id: "1",
        name: "색상",
        details: [
          { id: "1", name: "블랙", price: 0 },
          { id: "2", name: "화이트", price: 0 },
          { id: "3", name: "퍼플", price: 0 },
        ],
      },
    ],
    memo: "최신 갤럭시 S24 모델입니다.",
    isAvailable: true,
    stock: 18,
  },
  "3": {
    name: "에어팟 프로 2세대",
    price: 350000,
    category: "전자제품",
    images: ["/api/placeholder/200/200"],
    detailImages: ["/api/placeholder/400/400"],
    shippingCost: 2500,
    isVisible: true,
    modelNumber: "MQD83",
    hasOptions: false,
    options: [],
    memo: "노이즈 캔슬링 기능이 있는 에어팟입니다.",
    isAvailable: true,
    stock: 45,
  },
  "4": {
    name: "맥북 에어 M3",
    price: 1800000,
    category: "전자제품",
    images: ["/api/placeholder/200/200"],
    detailImages: ["/api/placeholder/400/400"],
    shippingCost: 0,
    isVisible: false,
    modelNumber: "MBA15-M3",
    hasOptions: true,
    options: [
      {
        id: "1",
        name: "색상",
        details: [
          { id: "1", name: "실버", price: 0 },
          { id: "2", name: "스페이스 그레이", price: 0 },
          { id: "3", name: "골드", price: 0 },
        ],
      },
      {
        id: "2",
        name: "메모리",
        details: [
          { id: "1", name: "8GB", price: 0 },
          { id: "2", name: "16GB", price: 200000 },
          { id: "3", name: "24GB", price: 400000 },
        ],
      },
    ],
    memo: "M3 칩이 탑재된 최신 맥북 에어입니다.",
    isAvailable: true,
    stock: 12,
  },
  "5": {
    name: "아이패드 프로 12.9",
    price: 1300000,
    category: "전자제품",
    images: ["/api/placeholder/200/200"],
    detailImages: ["/api/placeholder/400/400"],
    shippingCost: 3000,
    isVisible: true,
    modelNumber: "MPHH3",
    hasOptions: true,
    options: [
      {
        id: "1",
        name: "용량",
        details: [
          { id: "1", name: "128GB", price: 0 },
          { id: "2", name: "256GB", price: 100000 },
          { id: "3", name: "512GB", price: 300000 },
          { id: "4", name: "1TB", price: 700000 },
        ],
      },
    ],
    memo: "12.9인치 아이패드 프로입니다.",
    isAvailable: true,
    stock: 30,
  },
};

interface ProductEditClientProps {
  productId: string;
}

const ProductEditClient: React.FC<ProductEditClientProps> = ({ productId }) => {
  const [productData, setProductData] = useState<ProductFormData | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 실제로는 API에서 상품 데이터를 가져와야 함
    const loadProductData = async () => {
      try {
        setIsLoading(true);

        // API 호출 시뮬레이션
        await new Promise((resolve) => setTimeout(resolve, 500));

        const data =
          sampleProductData[productId as keyof typeof sampleProductData];

        if (data) {
          setProductData(data);
        } else {
          setError("상품을 찾을 수 없습니다.");
        }
      } catch (err) {
        setError("상품 데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    if (productId) {
      loadProductData();
    }
  }, [productId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 text-lg mb-4">{error}</div>
        <button
          onClick={() => window.history.back()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          돌아가기
        </button>
      </div>
    );
  }

  return (
    <ProductForm mode="edit" productId={productId} initialData={productData} />
  );
};

export default ProductEditClient;
