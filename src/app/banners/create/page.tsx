"use client";

import Layout from "@/components/layout/Layout";
import BannerForm from "@/components/banners/BannerForm";

const CreateBannerPage: React.FC = () => {
  return (
    <Layout title="배너 생성">
      <BannerForm mode="create" />
    </Layout>
  );
};

export default CreateBannerPage;
