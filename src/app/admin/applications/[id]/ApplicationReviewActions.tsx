"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

interface Props {
  applicationId: string;
  providerId: string;
  currentStatus: string;
}

export default function ApplicationReviewActions({
  applicationId,
  providerId,
  currentStatus,
}: Props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  const handleApprove = async () => {
    if (!confirm("Are you sure you want to approve this application?")) return;

    setIsLoading(true);
    try {
      const response = await fetch(`/api/admin/applications/${applicationId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "approve" }),
      });

      if (response.ok) {
        router.refresh();
      } else {
        const data = await response.json();
        alert(data.error || "Failed to approve application");
      }
    } catch (error) {
      alert("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReject = async () => {
    if (!rejectReason.trim()) {
      alert("Please provide a reason for rejection");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/admin/applications/${applicationId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reject", reason: rejectReason }),
      });

      if (response.ok) {
        setShowRejectModal(false);
        router.refresh();
      } else {
        const data = await response.json();
        alert(data.error || "Failed to reject application");
      }
    } catch (error) {
      alert("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  if (currentStatus === "APPROVED" || currentStatus === "REJECTED") {
    return (
      <div
        className={`px-4 py-2 rounded-lg font-medium ${
          currentStatus === "APPROVED"
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        {currentStatus === "APPROVED" ? "Approved" : "Rejected"}
      </div>
    );
  }

  if (currentStatus !== "SUBMITTED") {
    return (
      <div className="px-4 py-2 rounded-lg font-medium bg-gray-100 text-gray-600">
        Awaiting Submission
      </div>
    );
  }

  return (
    <>
      <div className="flex gap-3">
        <button
          onClick={() => setShowRejectModal(true)}
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 disabled:opacity-50"
        >
          <XCircle className="w-4 h-4" />
          Reject
        </button>
        <button
          onClick={handleApprove}
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <CheckCircle className="w-4 h-4" />
          )}
          Approve
        </button>
      </div>

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Reject Application
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Please provide a reason for rejecting this application. This will
              be sent to the applicant.
            </p>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Enter rejection reason..."
            />
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setShowRejectModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                disabled={isLoading || !rejectReason.trim()}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
              >
                {isLoading ? "Rejecting..." : "Reject Application"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
