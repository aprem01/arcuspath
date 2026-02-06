"use client";

import { useState, useEffect } from "react";
import { Heart, User, CheckCircle } from "lucide-react";

interface Vouch {
  id: string;
  relationship: string;
  comment: string | null;
  isAnonymous: boolean;
  isVerified: boolean;
  createdAt: string;
  user: {
    name: string | null;
    image: string | null;
  };
}

interface VouchListProps {
  providerId: string;
  initialCount?: number;
}

const RELATIONSHIP_LABELS: Record<string, string> = {
  client: "Client",
  colleague: "Colleague",
  community_member: "Community Member",
  family_friend: "Family/Friend",
};

export default function VouchList({
  providerId,
  initialCount = 0,
}: VouchListProps) {
  const [vouches, setVouches] = useState<Vouch[]>([]);
  const [total, setTotal] = useState(initialCount);
  const [isLoading, setIsLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const fetchVouches = async () => {
      try {
        const response = await fetch(`/api/providers/${providerId}/vouch`);
        const data = await response.json();
        if (data.vouches) {
          setVouches(data.vouches);
          setTotal(data.total);
        }
      } catch (error) {
        console.error("Failed to fetch vouches:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVouches();
  }, [providerId]);

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-20 bg-gray-100 rounded-lg"></div>
      </div>
    );
  }

  if (total === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <Heart className="w-8 h-8 mx-auto mb-2 text-gray-300" />
        <p>No vouches yet</p>
        <p className="text-sm">Be the first to vouch for this provider</p>
      </div>
    );
  }

  const displayedVouches = expanded ? vouches : vouches.slice(0, 3);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-pink-700">
        <Heart className="w-5 h-5 fill-current" />
        <span className="font-semibold">
          {total} Community Vouch{total !== 1 && "es"}
        </span>
      </div>

      <div className="space-y-3">
        {displayedVouches.map((vouch) => (
          <div
            key={vouch.id}
            className="p-4 bg-gray-50 rounded-xl border border-gray-100"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 flex-shrink-0">
                {vouch.user.image ? (
                  <img
                    src={vouch.user.image}
                    alt={vouch.user.name || "User"}
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <User className="w-5 h-5" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900">
                    {vouch.user.name || "Anonymous"}
                  </span>
                  {vouch.isVerified && (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  )}
                  <span className="text-sm text-gray-500">
                    {RELATIONSHIP_LABELS[vouch.relationship] || vouch.relationship}
                  </span>
                </div>
                {vouch.comment && (
                  <p className="text-gray-600 text-sm mt-1">{vouch.comment}</p>
                )}
                <p className="text-xs text-gray-400 mt-2">
                  {new Date(vouch.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {vouches.length > 3 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full py-2 text-sm text-purple-600 font-medium hover:text-purple-700"
        >
          {expanded ? "Show less" : `Show all ${total} vouches`}
        </button>
      )}
    </div>
  );
}
