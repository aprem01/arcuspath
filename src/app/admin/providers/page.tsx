import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  User,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Search,
  Filter,
  MapPin,
  Shield,
  Heart,
} from "lucide-react";

export const metadata = {
  title: "Providers | Admin - ArcusPath",
};

interface SearchParams {
  status?: string;
  category?: string;
  search?: string;
  page?: string;
}

export default async function AdminProvidersPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const statusFilter = params.status || "all";
  const categoryFilter = params.category || "all";
  const searchQuery = params.search || "";
  const page = parseInt(params.page || "1");
  const perPage = 20;

  const where: Record<string, unknown> = {};

  if (statusFilter !== "all") {
    where.status = statusFilter;
  }

  if (categoryFilter !== "all") {
    where.categoryId = categoryFilter;
  }

  if (searchQuery) {
    where.OR = [
      { name: { contains: searchQuery } },
      { email: { contains: searchQuery } },
      { city: { contains: searchQuery } },
    ];
  }

  const [providers, total, categories] = await Promise.all([
    prisma.provider.findMany({
      where,
      include: {
        user: { select: { name: true, email: true } },
        category: true,
        badges: { include: { badge: true } },
        _count: { select: { vouches: true } },
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * perPage,
      take: perPage,
    }),
    prisma.provider.count({ where }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  const totalPages = Math.ceil(total / perPage);

  const statusCounts = await prisma.provider.groupBy({
    by: ["status"],
    _count: true,
  });

  const counts: Record<string, number> = { all: total };
  statusCounts.forEach((s) => {
    counts[s.status] = s._count;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Providers</h1>
          <p className="text-gray-600">Manage all providers on ArcusPath</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <div className="flex flex-wrap gap-4">
          {/* Search */}
          <div className="flex-1 min-w-[200px]">
            <form method="GET" className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                name="search"
                defaultValue={searchQuery}
                placeholder="Search providers..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <input type="hidden" name="status" value={statusFilter} />
              <input type="hidden" name="category" value={categoryFilter} />
            </form>
          </div>

          {/* Status Filter */}
          <select
            defaultValue={statusFilter}
            onChange={(e) => {
              const url = new URL(window.location.href);
              url.searchParams.set("status", e.target.value);
              window.location.href = url.toString();
            }}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">All Status ({counts.all || 0})</option>
            <option value="ACTIVE">Active ({counts.ACTIVE || 0})</option>
            <option value="APPROVED">Approved ({counts.APPROVED || 0})</option>
            <option value="PENDING_REVIEW">Pending ({counts.PENDING_REVIEW || 0})</option>
            <option value="SUSPENDED">Suspended ({counts.SUSPENDED || 0})</option>
          </select>

          {/* Category Filter */}
          <select
            defaultValue={categoryFilter}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Providers Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">
                  Provider
                </th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">
                  Category
                </th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">
                  Location
                </th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">
                  Badges
                </th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">
                  Vouches
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
              {providers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-gray-500">
                    <User className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                    <p>No providers found</p>
                  </td>
                </tr>
              ) : (
                providers.map((provider) => (
                  <tr key={provider.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {provider.image ? (
                          <img
                            src={provider.image}
                            alt=""
                            className="w-10 h-10 rounded-full"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-gray-400" />
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-gray-900">
                            {provider.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {provider.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {provider.category?.name || "-"}
                    </td>
                    <td className="px-4 py-3">
                      {provider.city && provider.state ? (
                        <span className="inline-flex items-center gap-1 text-gray-600">
                          <MapPin className="w-3.5 h-3.5" />
                          {provider.city}, {provider.state}
                        </span>
                      ) : provider.virtual ? (
                        <span className="text-purple-600">Virtual Only</span>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        {provider.badges
                          .filter((b) => b.status === "APPROVED")
                          .slice(0, 3)
                          .map((b) => (
                            <span
                              key={b.id}
                              className="p-1 bg-purple-100 rounded"
                              title={b.badge.name}
                            >
                              <Shield className="w-3.5 h-3.5 text-purple-600" />
                            </span>
                          ))}
                        {provider.badges.filter((b) => b.status === "APPROVED")
                          .length > 3 && (
                          <span className="text-xs text-gray-500">
                            +
                            {provider.badges.filter(
                              (b) => b.status === "APPROVED"
                            ).length - 3}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1 text-pink-600">
                        <Heart className="w-3.5 h-3.5" />
                        {provider._count.vouches}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={provider.status} />
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        href={`/admin/providers/${provider.id}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        View
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
              {Math.min(page * perPage, total)} of {total} providers
            </p>
            <div className="flex gap-2">
              {page > 1 && (
                <Link
                  href={`/admin/providers?status=${statusFilter}&category=${categoryFilter}&search=${searchQuery}&page=${
                    page - 1
                  }`}
                  className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Previous
                </Link>
              )}
              {page < totalPages && (
                <Link
                  href={`/admin/providers?status=${statusFilter}&category=${categoryFilter}&search=${searchQuery}&page=${
                    page + 1
                  }`}
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
  const config: Record<
    string,
    { label: string; className: string; icon: React.ReactNode }
  > = {
    DRAFT: {
      label: "Draft",
      className: "bg-gray-100 text-gray-700",
      icon: <Clock className="w-3.5 h-3.5" />,
    },
    PENDING_REVIEW: {
      label: "Pending",
      className: "bg-yellow-100 text-yellow-700",
      icon: <Clock className="w-3.5 h-3.5" />,
    },
    APPROVED: {
      label: "Approved",
      className: "bg-blue-100 text-blue-700",
      icon: <CheckCircle className="w-3.5 h-3.5" />,
    },
    ACTIVE: {
      label: "Active",
      className: "bg-green-100 text-green-700",
      icon: <CheckCircle className="w-3.5 h-3.5" />,
    },
    SUSPENDED: {
      label: "Suspended",
      className: "bg-red-100 text-red-700",
      icon: <XCircle className="w-3.5 h-3.5" />,
    },
  };

  const { label, className, icon } = config[status] || config.DRAFT;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-sm font-medium ${className}`}
    >
      {icon}
      {label}
    </span>
  );
}
