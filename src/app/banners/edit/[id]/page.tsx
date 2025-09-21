import Layout from "@/components/layout/DynamicLayout";
import BannerForm from "@/components/banners/BannerForm";

interface EditBannerPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditBannerPage({ params }: EditBannerPageProps) {
  const { id } = await params;

  return (
    <Layout title="배너 수정">
      <BannerForm mode="edit" bannerId={id} />
    </Layout>
  );
}
