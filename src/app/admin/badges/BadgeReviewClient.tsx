"use client";

import { useState } from "react";
import {
  Shield,
  CheckCircle,
  XCircle,
  Clock,
  User,
  FileText,
} from "lucide-react";

interface PendingBadge {
  id: string;
  providerId: string;
  providerName: string;
  providerBusiness: string | null;
  providerCategory: string | null;
  lgbtqOwned: boolean;
  badgeId: string;
  badgeName: string;
  badgeSlug: string;
  evidence: string | null;
  appliedAt: Date;
}

interface RecentBadge {
  id: string;
  providerName: string;
  badgeName: string;
  status: string;
  reviewedAt: Date | null;
}

interface BadgeReviewClientProps {
  pendingBadges: PendingBadge[];
  recentBadges: RecentBadge[];
}

export default function BadgeReviewClient({
  pendingBadges: initialPendingBadges,
  recentBadges,
}: BadgeReviewClientProps) {
  const [pendingBadges, setPendingBadges] = useState(initialPendingBadges);
  const [selectedBadge, setSelectedBadge] = useState<PendingBadge | null>(null);
  const [reviewNotes, setReviewNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleReview = async (action: "approve" | "reject") => {
    if (!selectedBadge) return;

    setIsSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch(`/api/admin/badges/${selectedBadge.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action,
          notes: reviewNotes,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({
          type: "success",
          text: `Badge ${action === "approve" ? "approved" : "rejected"} successfully`,
        });
        // Remove from pending list
        setPendingBadges((prev) =>
          prev.filter((b) => b.id !== selectedBadge.id)
        );
        setSelectedBadge(null);
        setReviewNotes("");
      } else {
        setMessage({ type: "error", text: data.error || "Failed to review" });
      }
    } catch {
      setMessage({ type: "error", text: "An error occurred" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Badge Requests</h1>
        <p className="text-gray-600 mt-1">
          Review and approve badge applications from providers
        </p>
      </div>

      {/* Message */}
      {message && (
        <div
          className={`mb-6 p-4 rounded-lg ${
            message.type === "success"
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Pending Queue */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-4 border-b border-gray-200">
              <h2 className="font-semibold text-gray-900">
                Pending Requests ({pendingBadges.length})
              </h2>
            </div>
            <div className="divide-y divide-gray-100">
              {pendingBadges.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <Shield className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>No pending badge requests</p>
                </div>
              ) : (
                pendingBadges.map((badge) => (
                  <div
                    key={badge.id}
                    className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                      selectedBadge?.id === badge.id ? "bg-purple-50" : ""
                    }`}
                    onClick={() => setSelectedBadge(badge)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <Shield className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {badge.badgeName}
                          </p>
                          <p className="text-sm text-gray-600">
                            {badge.providerName}
                            {badge.providerBusiness &&
                              ` (${badge.providerBusiness})`}
                          </p>
                          {badge.providerCategory && (
                            <p className="text-xs text-gray-500 capitalize">
                              {badge.providerCategory}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Clock className="w-4 h-4" />
                        {new Date(badge.appliedAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Review Panel */}
        <div className="lg:col-span-1">
          {selectedBadge ? (
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
              <h3 className="font-semibold text-gray-900 mb-4">
                Review Application
              </h3>

              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-sm text-gray-500">Badge</p>
                  <p className="font-medium text-gray-900">
                    {selectedBadge.badgeName}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Provider</p>
                  <p className="font-medium text-gray-900">
                    {selectedBadge.providerName}
                  </p>
                  {selectedBadge.providerBusiness && (
                    <p className="text-sm text-gray-600">
                      {selectedBadge.providerBusiness}
                    </p>
                  )}
                </div>

                {selectedBadge.lgbtqOwned &&
                  selectedBadge.badgeSlug === "owned" && (
                    <div className="p-3 bg-pink-50 rounded-lg">
                      <p className="text-sm text-pink-700">
                        Provider indicated LGBTQIA+ ownership during
                        registration
                      </p>
                    </div>
                  )}

                {selectedBadge.evidence && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1">
                      Evidence Provided
                    </p>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">
                        {selectedBadge.evidence}
                      </p>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm text-gray-500 mb-1">
                    Review Notes (visible to provider)
                  </label>
                  <textarea
                    value={reviewNotes}
                    onChange={(e) => setReviewNotes(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Optional feedback..."
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleReview("reject")}
                  disabled={isSubmitting}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 disabled:opacity-50"
                >
                  <XCircle className="w-4 h-4" />
                  Reject
                </button>
                <button
                  onClick={() => handleReview("approve")}
                  disabled={isSubmitting}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                >
                  <CheckCircle className="w-4 h-4" />
                  Approve
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm p-6 text-center text-gray-500">
              <User className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>Select a request to review</p>
            </div>
          )}
        </div>
      </div>

      {/* Recent Activity */}
      {recentBadges.length > 0 && (
        <div className="mt-8">
          <h2 className="font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="bg-white rounded-xl shadow-sm divide-y divide-gray-100">
            {recentBadges.map((badge) => (
              <div
                key={badge.id}
                className="p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  {badge.status === "APPROVED" ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )}
                  <div>
                    <p className="font-medium text-gray-900">
                      {badge.badgeName}
                    </p>
                    <p className="text-sm text-gray-600">{badge.providerName}</p>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  {badge.reviewedAt &&
                    new Date(badge.reviewedAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
