"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  CheckCircle,
  XCircle,
  MoreHorizontal,
  Ban,
  RefreshCw,
  Loader2,
} from "lucide-react";

interface Props {
  providerId: string;
  currentStatus: string;
}

export default function ProviderAdminActions({
  providerId,
  currentStatus,
}: Props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const handleStatusChange = async (newStatus: string) => {
    if (!confirm(`Are you sure you want to change the status to ${newStatus}?`))
      return;

    setIsLoading(true);
    setShowMenu(false);

    try {
      const response = await fetch(`/api/admin/providers/${providerId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        router.refresh();
      } else {
        const data = await response.json();
        alert(data.error || "Failed to update status");
      }
    } catch (error) {
      alert("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-2">
        {/* Quick Actions Based on Status */}
        {currentStatus === "APPROVED" && (
          <button
            onClick={() => handleStatusChange("ACTIVE")}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <CheckCircle className="w-4 h-4" />
            )}
            Activate
          </button>
        )}

        {currentStatus === "SUSPENDED" && (
          <button
            onClick={() => handleStatusChange("ACTIVE")}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4" />
            )}
            Reactivate
          </button>
        )}

        {/* More Actions Menu */}
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          <MoreHorizontal className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      {/* Dropdown Menu */}
      {showMenu && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setShowMenu(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg border border-gray-200 shadow-lg z-20">
            <div className="py-1">
              {currentStatus !== "ACTIVE" && (
                <button
                  onClick={() => handleStatusChange("ACTIVE")}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Set as Active
                </button>
              )}
              {currentStatus !== "APPROVED" && (
                <button
                  onClick={() => handleStatusChange("APPROVED")}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <CheckCircle className="w-4 h-4 text-blue-500" />
                  Set as Approved
                </button>
              )}
              {currentStatus !== "SUSPENDED" && (
                <button
                  onClick={() => handleStatusChange("SUSPENDED")}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <Ban className="w-4 h-4" />
                  Suspend Provider
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
