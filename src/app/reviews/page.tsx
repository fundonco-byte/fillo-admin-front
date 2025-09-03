"use client";

import Layout from "@/components/layout/Layout";
import { ReviewManagement } from "@/components/reviews/ReviewManagement";

export default function ReviewsPage() {
  return (
    <Layout title="리뷰 관리">
      <ReviewManagement />
    </Layout>
  );
}
