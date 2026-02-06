"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Flag, CheckCircle, XCircle, MoreHorizontal, Loader2 } from "lucide-react";

interface Props {
  vouchId: string;
  currentStatus: string;
}

export default function VouchModerationActions({ vouchId, currentStatus }: Props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const handleAction = async (action: string) => {
    setIsLoading(true);
    setShowMenu(false);

    try {
      const response = await fetch(`/api/admin/vouches/${vouchId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });

      if (response.ok) {
        router.refresh();
      } else {
        const data = await response.json();
        alert(data.error || "Failed to update vouch");
      }
    } catch (error) {
      alert("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-end">
        <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="relative flex justify-end">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <MoreHorizontal className="w-4 h-4 text-gray-500" />
      </button>

      {showMenu && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setShowMenu(false)}
          />
          <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-lg border border-gray-200 shadow-lg z-20">
            <div className="py-1">
              {currentStatus !== "ACTIVE" && (
                <button
                  onClick={() => handleAction("approve")}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Approve
                </button>
              )}
              {currentStatus !== "FLAGGED" && (
                <button
                  onClick={() => handleAction("flag")}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-yellow-600 hover:bg-yellow-50"
                >
                  <Flag className="w-4 h-4" />
                  Flag for Review
                </button>
              )}
              {currentStatus !== "REMOVED" && (
                <button
                  onClick={() => handleAction("remove")}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <XCircle className="w-4 h-4" />
                  Remove
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
