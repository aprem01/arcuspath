import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  Heart,
  User,
  Flag,
  CheckCircle,
  XCircle,
  Eye,
  Clock,
  AlertTriangle,
} from "lucide-react";
import VouchModerationActions from "./VouchModerationActions";

export const metadata = {
  title: "Vouches | Admin - ArcusPath",
};

interface SearchParams {
  status?: string;
  page?: string;
}

export default async function AdminVouchesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const statusFilter = params.status || "all";
  const page = parseInt(params.page || "1");
  const perPage = 20;

  const where =
    statusFilter !== "all"
      ? { status: statusFilter as "ACTIVE" | "REMOVED" | "FLAGGED" }
      : {};

  const [vouches, total] = await Promise.all([
    prisma.vouch.findMany({
      where,
      include: {
        user: { select: { id: true, name: true, email: true, image: true } },
        provider: {
          select: { id: true, name: true, category: { select: { name: true } } },
        },
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * perPage,
      take: perPage,
    }),
    prisma.vouch.count({ where }),
  ]);

  const totalPages = Math.ceil(total / perPage);

  const statusCounts = await prisma.vouch.groupBy({
    by: ["status"],
    _count: true,
  });

  const counts: Record<string, number> = { all: total };
  statusCounts.forEach((s) => {
    counts[s.status] = s._count;
  });

  // Get flagged vouches count for alert
  const flaggedCount = counts.FLAGGED || 0;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Vouches</h1>
          <p className="text-gray-600">Moderate community vouches</p>
        </div>
        {flaggedCount > 0 && (
          <div className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-700 rounded-lg">
            <AlertTriangle className="w-4 h-4" />
            {flaggedCount} vouch{flaggedCount !== 1 && "es"} need review
          </div>
        )}
      </div>

      {/* Status Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { key: "all", label: "All", count: counts.all, icon: Heart },
          { key: "ACTIVE", label: "Active", count: counts.ACTIVE || 0, icon: CheckCircle },
          { key: "FLAGGED", label: "Flagged", count: counts.FLAGGED || 0, icon: Flag },
          { key: "REMOVED", label: "Removed", count: counts.REMOVED || 0, icon: XCircle },
        ].map((filter) => (
          <Link
            key={filter.key}
            href={`/admin/vouches?status=${filter.key}`}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              statusFilter === filter.key
                ? filter.key === "FLAGGED"
                  ? "bg-red-100 text-red-700"
                  : "bg-purple-100 text-purple-700"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <filter.icon className="w-4 h-4" />
            {filter.label} ({filter.count})
          </Link>
        ))}
      </div>

      {/* Vouches Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">
                  User
                </th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">
                  Provider
                </th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">
                  Relationship
                </th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">
                  Comment
                </th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">
                  Date
                </th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">
                  Status
                </th>
                <th className="text-right px-4 py-3 text-sm font-medium text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {vouches.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-gray-500">
                    <Heart className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                    <p>No vouches found</p>
                  </td>
                </tr>
              ) : (
                vouches.map((vouch) => (
                  <tr
                    key={vouch.id}
                    className={`hover:bg-gray-50 ${
                      vouch.status === "FLAGGED" ? "bg-red-50" : ""
                    }`}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {vouch.user.image ? (
                          <img
                            src={vouch.user.image}
                            alt=""
                            className="w-8 h-8 rounded-full"
                          />
                        ) : (
                          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-gray-400" />
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-gray-900 text-sm">
                            {vouch.isAnonymous ? "Anonymous" : vouch.user.name}
                          </p>
                          {!vouch.isAnonymous && (
                            <p className="text-xs text-gray-500">
                              {vouch.user.email}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/admin/providers/${vouch.provider.id}`}
                        className="text-purple-600 hover:underline text-sm"
                      >
                        {vouch.provider.name}
                      </Link>
                      <p className="text-xs text-gray-500">
                        {vouch.provider.category?.name}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {formatRelationship(vouch.relationship)}
                    </td>
                    <td className="px-4 py-3">
                      {vouch.comment ? (
                        <p className="text-sm text-gray-600 max-w-xs truncate">
                          "{vouch.comment}"
                        </p>
                      ) : (
                        <span className="text-sm text-gray-400">No comment</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {new Date(vouch.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={vouch.status} />
                    </td>
                    <td className="px-4 py-3">
                      <VouchModerationActions
                        vouchId={vouch.id}
                        currentStatus={vouch.status}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Showing {(page - 1) * perPage + 1} to{" "}
              {Math.min(page * perPage, total)} of {total} vouches
            </p>
            <div className="flex gap-2">
              {page > 1 && (
                <Link
                  href={`/admin/vouches?status=${statusFilter}&page=${page - 1}`}
                  className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Previous
                </Link>
              )}
              {page < totalPages && (
                <Link
                  href={`/admin/vouches?status=${statusFilter}&page=${page + 1}`}
                  className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Next
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const config: Record<string, { label: string; className: string }> = {
    ACTIVE: { label: "Active", className: "bg-green-100 text-green-700" },
    FLAGGED: { label: "Flagged", className: "bg-red-100 text-red-700" },
    REMOVED: { label: "Removed", className: "bg-gray-100 text-gray-700" },
  };

  const { label, className } = config[status] || config.ACTIVE;

  return (
    <span
      className={`inline-block px-2 py-1 rounded text-xs font-medium ${className}`}
    >
      {label}
    </span>
  );
}

function formatRelationship(relationship: string): string {
  const labels: Record<string, string> = {
    client: "Client",
    colleague: "Colleague",
    community_member: "Community",
    family_friend: "Family/Friend",
  };
  return labels[relationship] || relationship;
}
