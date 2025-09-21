import Layout from "@/components/layout/DynamicLayout";
import EventForm from "@/components/events/EventForm";

export default function EventCreatePage() {
  return (
    <Layout title="이벤트 생성">
      <EventForm mode="create" />
    </Layout>
  );
}
