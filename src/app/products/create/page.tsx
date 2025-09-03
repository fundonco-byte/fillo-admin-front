"use client";

import Layout from "@/components/layout/Layout";
import ProductForm from "@/components/products/ProductForm";

const CreateProductPage: React.FC = () => {
  return (
    <Layout title="상품 생성">
      <ProductForm mode="create" />
    </Layout>
  );
};

export default CreateProductPage;
