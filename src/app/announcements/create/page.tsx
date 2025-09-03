"use client";

import Layout from "@/components/layout/Layout";
import AnnouncementCreateForm from "@/components/announcements/AnnouncementCreateForm";

const AnnouncementCreatePage = () => {
  return (
    <Layout title="공지사항 작성">
      <AnnouncementCreateForm />
    </Layout>
  );
};

export default AnnouncementCreatePage;
