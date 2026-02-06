import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  FileText,
  Filter,
} from "lucide-react";

export const metadata = {
  title: "Applications | Admin - ArcusPath",
};

interface SearchParams {
  status?: string;
  page?: string;
}

export default async function AdminApplicationsPage({
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
      ? { status: statusFilter as "IN_PROGRESS" | "SUBMITTED" | "APPROVED" | "REJECTED" }
      : {};

  const [applications, total] = await Promise.all([
    prisma.providerApplication.findMany({
      where,
      include: {
        provider: {
          include: {
            user: {
              select: { name: true, email: true },
            },
            category: true,
          },
        },
      },
      orderBy: { updatedAt: "desc" },
      skip: (page - 1) * perPage,
      take: perPage,
    }),
    prisma.providerApplication.count({ where }),
  ]);

  const totalPages = Math.ceil(total / perPage);

  const statusCounts = await prisma.providerApplication.groupBy({
    by: ["status"],
    _count: true,
  });

  const counts = {
    all: total,
    IN_PROGRESS: 0,
    SUBMITTED: 0,
    APPROVED: 0,
    REJECTED: 0,
  };
  statusCounts.forEach((s) => {
    counts[s.status as keyof typeof counts] = s._count;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Applications</h1>
          <p className="text-gray-600">Review and manage provider applications</p>
        </div>
      </div>

      {/* Status Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { key: "all", label: "All", count: counts.all },
          { key: "SUBMITTED", label: "Pending Review", count: counts.SUBMITTED },
          { key: "IN_PROGRESS", label: "In Progress", count: counts.IN_PROGRESS },
          { key: "APPROVED", label: "Approved", count: counts.APPROVED },
          { key: "REJECTED", label: "Rejected", count: counts.REJECTED },
        ].map((filter) => (
          <Link
            key={filter.key}
            href={`/admin/applications?status=${filter.key}`}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              statusFilter === filter.key
                ? "bg-purple-100 text-purple-700"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {filter.label} ({filter.count})
          </Link>
        ))}
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">
                  Applicant
                </th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">
                  Category
                </th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">
                  Step
                </th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">
                  Status
                </th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">
                  Submitted
                </th>
                <th className="text-right px-4 py-3 text-sm font-medium text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {applications.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-gray-500">
                    <FileText className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                    <p>No applications found</p>
                  </td>
                </tr>
              ) : (
                applications.map((app) => (
                  <tr key={app.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-gray-900">
                          {app.provider.name || app.provider.user.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {app.provider.user.email}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {app.provider.category?.name || "Not selected"}
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1 text-sm text-gray-600">
                        Step {app.currentStep}/5
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={app.status} />
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {app.submittedAt
                        ? new Date(app.submittedAt).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        href={`/admin/applications/${app.id}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        Review
                      </Link>
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
              {Math.min(page * perPage, total)} of {total} applications
            </p>
            <div className="flex gap-2">
              {page > 1 && (
                <Link
                  href={`/admin/applications?status=${statusFilter}&page=${page - 1}`}
                  className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Previous
                </Link>
              )}
              {page < totalPages && (
                <Link
                  href={`/admin/applications?status=${statusFilter}&page=${page + 1}`}
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
  const config: Record<string, { label: string; className: string; icon: React.ReactNode }> = {
    IN_PROGRESS: {
      label: "In Progress",
      className: "bg-gray-100 text-gray-700",
      icon: <Clock className="w-3.5 h-3.5" />,
    },
    SUBMITTED: {
      label: "Pending Review",
      className: "bg-yellow-100 text-yellow-700",
      icon: <Clock className="w-3.5 h-3.5" />,
    },
    APPROVED: {
      label: "Approved",
      className: "bg-green-100 text-green-700",
      icon: <CheckCircle className="w-3.5 h-3.5" />,
    },
    REJECTED: {
      label: "Rejected",
      className: "bg-red-100 text-red-700",
      icon: <XCircle className="w-3.5 h-3.5" />,
    },
  };

  const { label, className, icon } = config[status] || config.IN_PROGRESS;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-sm font-medium ${className}`}
    >
      {icon}
      {label}
    </span>
  );
}
