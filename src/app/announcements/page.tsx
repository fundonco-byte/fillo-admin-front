"use client";

import Layout from "@/components/layout/Layout";
import AnnouncementManagement from "@/components/announcements/AnnouncementManagement";

const AnnouncementsPage = () => {
  return (
    <Layout title="공지사항 관리">
      <AnnouncementManagement />
    </Layout>
  );
};

export default AnnouncementsPage;
