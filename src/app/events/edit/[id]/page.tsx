import Layout from "@/components/layout/Layout";
import EventForm from "@/components/events/EventForm";

interface EventEditPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EventEditPage({ params }: EventEditPageProps) {
  const { id } = await params;

  // 실제 구현에서는 ID로 이벤트 데이터를 가져옴
  const eventData = {
    id: id,
    title: "2024 신년 맞이 특별 할인 이벤트",
    content:
      "신년을 맞아 전 상품 20% 할인 이벤트를 진행합니다. 이번 기회를 놓치지 마세요!",
    imageUrl: "/event-sample.jpg",
    startDate: "2024-01-01",
    endDate: "2024-01-31",
    isVisible: true,
  };

  return (
    <Layout
      title="이벤트 수정"
      children={<EventForm initialData={eventData} mode="edit" />}
    />
  );
}
