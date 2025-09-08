"use client";

import { useParams } from "next/navigation";
import Layout from "@/components/layout/Layout";
import MemberEdit from "@/components/customers/MemberEdit";

const MemberEditPage: React.FC = () => {
  const params = useParams();
  const memberId = params.id as string;

  return (
    <Layout title="회원 정보 수정">
      <MemberEdit memberId={memberId} />
    </Layout>
  );
};

export default MemberEditPage;
