"use client";

import Layout from "@/components/layout/Layout";
import BannerManagement from "@/components/banners/BannerManagement";

const BannersPage: React.FC = () => {
  return (
    <Layout title="배너 관리">
      <BannerManagement />
    </Layout>
  );
};

export default BannersPage;
