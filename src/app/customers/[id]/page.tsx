"use client";

import { useParams } from "next/navigation";
import Layout from "@/components/layout/Layout";
import MemberDetail from "@/components/customers/MemberDetail";

const MemberDetailPage: React.FC = () => {
  const params = useParams();
  const memberId = params.id as string;

  return (
    <Layout title="회원 상세정보">
      <MemberDetail memberId={memberId} />
    </Layout>
  );
};

export default MemberDetailPage;
