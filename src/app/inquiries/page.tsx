"use client";

import Layout from "@/components/layout/DynamicLayout";
import InquiryManagement from "../../components/inquiries/InquiryManagement";

const InquiriesPage = () => {
  return (
    <Layout title="문의 관리">
      <InquiryManagement />
    </Layout>
  );
};

export default InquiriesPage;
