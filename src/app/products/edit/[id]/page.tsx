import Layout from "@/components/layout/Layout";
import ProductEditClient from "./ProductEditClient";

interface EditProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditProductPage({
  params,
}: EditProductPageProps) {
  const { id } = await params;

  return (
    <Layout title="상품 수정">
      <ProductEditClient productId={id} />
    </Layout>
  );
}
