import Layout from "@/components/layout/Layout";
import AnnouncementEditForm from "@/components/announcements/AnnouncementEditForm";

interface AnnouncementEditPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function AnnouncementEditPage({
  params,
}: AnnouncementEditPageProps) {
  const { id } = await params;

  return (
    <Layout title="공지사항 수정">
      <AnnouncementEditForm id={id} />
    </Layout>
  );
}
