"use client";

import { useParams } from "next/navigation";
import Layout from "@/components/layout/Layout";
import AnnouncementDetail from "@/components/announcements/AnnouncementDetail";

const AnnouncementDetailPage = () => {
  const params = useParams();
  const id = params.id as string;

  return (
    <Layout title="공지사항 상세">
      <AnnouncementDetail id={id} />
    </Layout>
  );
};

export default AnnouncementDetailPage;
