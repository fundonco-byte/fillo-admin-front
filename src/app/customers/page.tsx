"use client";

import Layout from "@/components/layout/Layout";
import CustomerManagement from "@/components/customers/CustomerManagement";

const CustomersPage: React.FC = () => {
  return (
    <Layout title="회원 관리">
      <CustomerManagement />
    </Layout>
  );
};

export default CustomersPage;
