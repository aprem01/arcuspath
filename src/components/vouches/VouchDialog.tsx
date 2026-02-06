"use client";

import { useState } from "react";
import { X, Heart } from "lucide-react";

interface VouchDialogProps {
  providerId: string;
  providerName: string;
  onClose: () => void;
  onSuccess: () => void;
}

const RELATIONSHIP_OPTIONS = [
  { value: "client", label: "I'm a current/past client" },
  { value: "colleague", label: "Professional colleague" },
  { value: "community_member", label: "Community member" },
  { value: "family_friend", label: "Family/Friend" },
];

export default function VouchDialog({
  providerId,
  providerName,
  onClose,
  onSuccess,
}: VouchDialogProps) {
  const [relationship, setRelationship] = useState("");
  const [comment, setComment] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!relationship) {
      setError("Please select your relationship to this provider");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`/api/providers/${providerId}/vouch`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          relationship,
          comment: comment.trim() || null,
          isAnonymous,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        onSuccess();
      } else {
        setError(data.error || "Failed to submit vouch");
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-pink-100 rounded-lg">
              <Heart className="w-5 h-5 text-pink-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">
              Vouch for {providerName}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <p className="text-gray-600 text-sm mb-6">
          Your vouch helps build trust in our community. Share your experience
          with this provider.
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Relationship */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              How do you know this provider? *
            </label>
            <div className="space-y-2">
              {RELATIONSHIP_OPTIONS.map((option) => (
                <label
                  key={option.value}
                  className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                    relationship === option.value
                      ? "border-pink-500 bg-pink-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="relationship"
                    value={option.value}
                    checked={relationship === option.value}
                    onChange={(e) => setRelationship(e.target.value)}
                    className="text-pink-600 focus:ring-pink-500"
                  />
                  <span className="text-gray-900">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Comment */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Share your experience{" "}
              <span className="text-gray-400">(optional)</span>
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              maxLength={500}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="What was your experience with this provider?"
            />
            <p className="text-xs text-gray-500 mt-1">{comment.length}/500</p>
          </div>

          {/* Anonymous */}
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
              className="w-5 h-5 text-pink-600 rounded focus:ring-pink-500"
            />
            <div>
              <span className="block text-sm font-medium text-gray-900">
                Post anonymously
              </span>
              <span className="block text-xs text-gray-500">
                Your name won't be shown publicly
              </span>
            </div>
          </label>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !relationship}
              className="flex-1 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-lg hover:opacity-90 disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Submit Vouch"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
