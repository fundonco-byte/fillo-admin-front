"use client";

import Layout from "@/components/layout/Layout";
import ProductManagement from "@/components/products/ProductManagement";

const ProductsPage: React.FC = () => {
  return (
    <Layout title="상품 관리">
      <ProductManagement />
    </Layout>
  );
};

export default ProductsPage;
