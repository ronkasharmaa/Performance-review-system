import Sidebar from "@/components/dashboard/Sidebar";
import Navbar from "@/components/dashboard/Navbar";
import PeerReviewForm from "@/components/forms/PeerReviewForm";

export default function PeerReviewPage() {
  return (
    <div className="flex bg-black min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div className="p-6">
          <PeerReviewForm />
        </div>
      </div>
    </div>
  );
}