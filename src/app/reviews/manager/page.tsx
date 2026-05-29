import DashboardLayout from "@/components/layouts/DashboardLayout";

import ManagerReviewForm from "@/components/forms/ManagerReviewForm";

export default function ManagerReviewPage() {
  return (
    <DashboardLayout role="manager">
      <ManagerReviewForm />
    </DashboardLayout>
  );
}