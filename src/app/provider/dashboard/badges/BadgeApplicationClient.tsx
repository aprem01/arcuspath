"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Heart,
  Star,
  GraduationCap,
  CheckCircle,
  Clock,
  XCircle,
  ArrowLeft,
  AlertCircle,
} from "lucide-react";

interface Badge {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string | null;
  requirements: string | null;
  applicationStatus: string | null;
  grantedAt?: Date | null;
  expiresAt?: Date | null;
  evidence?: string | null;
  reviewNotes?: string | null;
}

interface BadgeApplicationClientProps {
  providerId: string;
  badges: Badge[];
  lgbtqOwned: boolean;
}

const iconMap: Record<string, React.ElementType> = {
  ShieldCheck,
  Heart,
  Star,
  GraduationCap,
};

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
  verified: {
    bg: "bg-emerald-100",
    text: "text-emerald-700",
    border: "border-emerald-200",
  },
  affirming: {
    bg: "bg-purple-100",
    text: "text-purple-700",
    border: "border-purple-200",
  },
  owned: { bg: "bg-pink-100", text: "text-pink-700", border: "border-pink-200" },
  trained: {
    bg: "bg-blue-100",
    text: "text-blue-700",
    border: "border-blue-200",
  },
};

export default function BadgeApplicationClient({
  providerId,
  badges,
  lgbtqOwned,
}: BadgeApplicationClientProps) {
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
  const [evidence, setEvidence] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleApply = async () => {
    if (!selectedBadge) return;

    setIsSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch(
        `/api/provider/badges/${selectedBadge.id}/apply`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ evidence }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: "success", text: "Badge application submitted!" });
        setSelectedBadge(null);
        setEvidence("");
        // Refresh the page to show updated status
        window.location.reload();
      } else {
        setMessage({ type: "error", text: data.error || "Failed to apply" });
      }
    } catch {
      setMessage({ type: "error", text: "An error occurred" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusBadge = (status: string | null) => {
    switch (status) {
      case "APPROVED":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
            <CheckCircle className="w-3 h-3" />
            Approved
          </span>
        );
      case "PENDING":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
            <Clock className="w-3 h-3" />
            Pending
          </span>
        );
      case "REJECTED":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
            <XCircle className="w-3 h-3" />
            Rejected
          </span>
        );
      case "EXPIRED":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
            <AlertCircle className="w-3 h-3" />
            Expired
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/provider/dashboard"
            className="inline-flex items-center gap-1 text-purple-600 hover:text-purple-700 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Trust Badges</h1>
          <p className="text-gray-600 mt-1">
            Apply for badges to showcase your commitment to affirming care
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

        {/* Badge Grid */}
        <div className="grid gap-6">
          {badges.map((badge) => {
            const Icon = iconMap[badge.icon || "ShieldCheck"] || ShieldCheck;
            const colors = colorMap[badge.slug] || colorMap.verified;
            const requirements = badge.requirements
              ? JSON.parse(badge.requirements)
              : [];
            const isOwned = badge.slug === "owned";
            const canApply =
              !badge.applicationStatus ||
              badge.applicationStatus === "REJECTED";

            return (
              <div
                key={badge.id}
                className={`bg-white rounded-2xl shadow-sm overflow-hidden border-2 ${
                  badge.applicationStatus === "APPROVED"
                    ? colors.border
                    : "border-transparent"
                }`}
              >
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl ${colors.bg}`}>
                      <Icon className={`w-8 h-8 ${colors.text}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {badge.name}
                        </h3>
                        {getStatusBadge(badge.applicationStatus)}
                      </div>
                      <p className="text-gray-600 mt-1">{badge.description}</p>

                      {/* Requirements */}
                      {requirements.length > 0 && (
                        <div className="mt-4">
                          <p className="text-sm font-medium text-gray-700 mb-2">
                            Requirements:
                          </p>
                          <ul className="space-y-1">
                            {requirements.map(
                              (req: string, index: number) => (
                                <li
                                  key={index}
                                  className="text-sm text-gray-600 flex items-start gap-2"
                                >
                                  <CheckCircle className="w-4 h-4 text-gray-400 mt-0.5" />
                                  {req}
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      )}

                      {/* Special note for LGBTQ+ Owned */}
                      {isOwned && lgbtqOwned && !badge.applicationStatus && (
                        <div className="mt-4 p-3 bg-pink-50 rounded-lg">
                          <p className="text-sm text-pink-700">
                            You indicated you&apos;re LGBTQIA+ owned during
                            registration. Apply below to get this badge verified.
                          </p>
                        </div>
                      )}

                      {/* Review Notes (if rejected) */}
                      {badge.applicationStatus === "REJECTED" &&
                        badge.reviewNotes && (
                          <div className="mt-4 p-3 bg-red-50 rounded-lg">
                            <p className="text-sm font-medium text-red-700 mb-1">
                              Feedback:
                            </p>
                            <p className="text-sm text-red-600">
                              {badge.reviewNotes}
                            </p>
                          </div>
                        )}

                      {/* Granted date */}
                      {badge.applicationStatus === "APPROVED" &&
                        badge.grantedAt && (
                          <p className="mt-4 text-sm text-gray-500">
                            Granted on{" "}
                            {new Date(badge.grantedAt).toLocaleDateString()}
                            {badge.expiresAt && (
                              <>
                                {" "}
                                • Expires{" "}
                                {new Date(badge.expiresAt).toLocaleDateString()}
                              </>
                            )}
                          </p>
                        )}

                      {/* Apply Button */}
                      {canApply && badge.slug !== "verified" && (
                        <button
                          onClick={() => setSelectedBadge(badge)}
                          className={`mt-4 px-4 py-2 rounded-lg font-medium transition-colors ${colors.bg} ${colors.text} hover:opacity-80`}
                        >
                          {badge.applicationStatus === "REJECTED"
                            ? "Re-apply"
                            : "Apply for Badge"}
                        </button>
                      )}

                      {badge.slug === "verified" && !badge.applicationStatus && (
                        <p className="mt-4 text-sm text-gray-500 italic">
                          This badge is granted automatically after credential
                          verification
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Application Modal */}
        {selectedBadge && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Apply for {selectedBadge.name}
              </h3>
              <p className="text-gray-600 mb-6">{selectedBadge.description}</p>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Evidence / Notes
                </label>
                <p className="text-xs text-gray-500 mb-2">
                  Describe how you meet the requirements. Include any relevant
                  certifications, training, or experience.
                </p>
                <textarea
                  value={evidence}
                  onChange={(e) => setEvidence(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="e.g., Completed GLMA LGBTQ+ Healthcare Equality Training in 2024..."
                />
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    setSelectedBadge(null);
                    setEvidence("");
                  }}
                  className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleApply}
                  disabled={isSubmitting || !evidence.trim()}
                  className="flex-1 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-lg hover:opacity-90 disabled:opacity-50"
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
