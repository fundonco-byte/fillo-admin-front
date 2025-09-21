import EventManagement from "@/components/events/EventManagement";
import Layout from "@/components/layout/DynamicLayout";

export default function EventsPage() {
  return (
    <Layout title="이벤트 관리">
      <EventManagement />
    </Layout>
  );
}
