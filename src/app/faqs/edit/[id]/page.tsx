import Layout from "@/components/layout/Layout";
import FAQEditClient from "./FAQEditClient";

interface FAQEditPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function FAQEditPage({ params }: FAQEditPageProps) {
  const { id } = await params;

  return (
    <Layout title="FAQ 수정">
      <FAQEditClient faqId={parseInt(id)} />
    </Layout>
  );
}
