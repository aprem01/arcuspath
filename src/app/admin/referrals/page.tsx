import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  Users,
  MousePointer,
  CheckCircle,
  DollarSign,
  User,
  Clock,
  TrendingUp,
} from "lucide-react";

export const metadata = {
  title: "Referrals | Admin - ArcusPath",
};

interface SearchParams {
  status?: string;
  page?: string;
}

export default async function AdminReferralsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const statusFilter = params.status || "all";
  const page = parseInt(params.page || "1");
  const perPage = 20;

  // Get referral stats
  const [totalCodes, totalReferrals, completedReferrals, totalRewards] =
    await Promise.all([
      prisma.referralCode.count(),
      prisma.referral.count(),
      prisma.referral.count({ where: { status: "COMPLETED" } }),
      prisma.referral.aggregate({
        _sum: { rewardAmount: true },
        where: { status: "COMPLETED" },
      }),
    ]);

  // Get top referrers
  const topReferrers = await prisma.referralCode.findMany({
    where: { totalReferrals: { gt: 0 } },
    include: {
      user: { select: { id: true, name: true, email: true, image: true } },
    },
    orderBy: { successfulReferrals: "desc" },
    take: 10,
  });

  // Get recent referrals
  const where = statusFilter !== "all" ? { status: statusFilter } : {};

  const [referrals, referralTotal] = await Promise.all([
    prisma.referral.findMany({
      where,
      include: {
        referralCode: {
          include: {
            user: { select: { name: true, email: true } },
          },
        },
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * perPage,
      take: perPage,
    }),
    prisma.referral.count({ where }),
  ]);

  const totalPages = Math.ceil(referralTotal / perPage);

  const statusCounts = await prisma.referral.groupBy({
    by: ["status"],
    _count: true,
  });

  const counts: Record<string, number> = { all: referralTotal };
  statusCounts.forEach((s) => {
    counts[s.status] = s._count;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Referrals</h1>
          <p className="text-gray-600">Track and manage the referral program</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard
          icon={<Users className="w-5 h-5" />}
          label="Active Referrers"
          value={totalCodes}
          color="bg-blue-100 text-blue-600"
        />
        <StatCard
          icon={<MousePointer className="w-5 h-5" />}
          label="Total Referrals"
          value={totalReferrals}
          color="bg-purple-100 text-purple-600"
        />
        <StatCard
          icon={<CheckCircle className="w-5 h-5" />}
          label="Completed"
          value={completedReferrals}
          color="bg-green-100 text-green-600"
        />
        <StatCard
          icon={<DollarSign className="w-5 h-5" />}
          label="Rewards Paid"
          value={`$${Number(totalRewards._sum.rewardAmount || 0).toFixed(2)}`}
          color="bg-yellow-100 text-yellow-600"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Referrals Table */}
        <div className="lg:col-span-2">
          {/* Status Filters */}
          <div className="flex flex-wrap gap-2 mb-4">
            {[
              { key: "all", label: "All" },
              { key: "PENDING", label: "Pending" },
              { key: "SIGNED_UP", label: "Signed Up" },
              { key: "COMPLETED", label: "Completed" },
              { key: "EXPIRED", label: "Expired" },
            ].map((filter) => (
              <Link
                key={filter.key}
                href={`/admin/referrals?status=${filter.key}`}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  statusFilter === filter.key
                    ? "bg-purple-100 text-purple-700"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {filter.label} ({counts[filter.key] || 0})
              </Link>
            ))}
          </div>

          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
              <h3 className="font-semibold text-gray-900">Recent Referrals</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left px-4 py-2 text-sm font-medium text-gray-500">
                      Referred
                    </th>
                    <th className="text-left px-4 py-2 text-sm font-medium text-gray-500">
                      Referrer
                    </th>
                    <th className="text-left px-4 py-2 text-sm font-medium text-gray-500">
                      Status
                    </th>
                    <th className="text-left px-4 py-2 text-sm font-medium text-gray-500">
                      Reward
                    </th>
                    <th className="text-left px-4 py-2 text-sm font-medium text-gray-500">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {referrals.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-4 py-8 text-center text-gray-500"
                      >
                        No referrals found
                      </td>
                    </tr>
                  ) : (
                    referrals.map((referral) => (
                      <tr key={referral.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <p className="text-sm text-gray-900">
                            {referral.referredEmail
                              ? maskEmail(referral.referredEmail)
                              : "Anonymous"}
                          </p>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm text-gray-900">
                            {referral.referralCode.user.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {referral.referralCode.code}
                          </p>
                        </td>
                        <td className="px-4 py-3">
                          <StatusBadge status={referral.status} />
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {referral.rewardAmount ? (
                            <span className="text-green-600 font-medium">
                              ${Number(referral.rewardAmount).toFixed(2)}
                            </span>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-500">
                          {new Date(referral.createdAt).toLocaleDateString()}
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
                  Page {page} of {totalPages}
                </p>
                <div className="flex gap-2">
                  {page > 1 && (
                    <Link
                      href={`/admin/referrals?status=${statusFilter}&page=${
                        page - 1
                      }`}
                      className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Previous
                    </Link>
                  )}
                  {page < totalPages && (
                    <Link
                      href={`/admin/referrals?status=${statusFilter}&page=${
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

        {/* Top Referrers Sidebar */}
        <div>
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 bg-gray-50 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-purple-500" />
              <h3 className="font-semibold text-gray-900">Top Referrers</h3>
            </div>
            <div className="divide-y divide-gray-100">
              {topReferrers.length === 0 ? (
                <div className="px-4 py-8 text-center text-gray-500">
                  No referrers yet
                </div>
              ) : (
                topReferrers.map((referrer, index) => (
                  <div
                    key={referrer.id}
                    className="px-4 py-3 flex items-center gap-3"
                  >
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        index === 0
                          ? "bg-yellow-100 text-yellow-700"
                          : index === 1
                          ? "bg-gray-200 text-gray-700"
                          : index === 2
                          ? "bg-orange-100 text-orange-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {index + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 text-sm truncate">
                        {referrer.user.name}
                      </p>
                      <p className="text-xs text-gray-500">{referrer.code}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-purple-600">
                        {referrer.successfulReferrals}
                      </p>
                      <p className="text-xs text-gray-500">completed</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="mt-4 bg-white rounded-xl border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Conversion Rate</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Referrals → Signups</span>
                <span className="font-medium">
                  {totalReferrals > 0
                    ? (
                        ((counts.SIGNED_UP || 0) + (counts.COMPLETED || 0)) /
                        totalReferrals *
                        100
                      ).toFixed(1)
                    : 0}
                  %
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Signups → Completed</span>
                <span className="font-medium">
                  {(counts.SIGNED_UP || 0) + (counts.COMPLETED || 0) > 0
                    ? (
                        (counts.COMPLETED || 0) /
                        ((counts.SIGNED_UP || 0) + (counts.COMPLETED || 0)) *
                        100
                      ).toFixed(1)
                    : 0}
                  %
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <div className={`w-10 h-10 ${color} rounded-lg flex items-center justify-center mb-3`}>
        {icon}
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const config: Record<string, { label: string; className: string }> = {
    PENDING: { label: "Pending", className: "bg-yellow-100 text-yellow-700" },
    SIGNED_UP: { label: "Signed Up", className: "bg-blue-100 text-blue-700" },
    COMPLETED: { label: "Completed", className: "bg-green-100 text-green-700" },
    EXPIRED: { label: "Expired", className: "bg-gray-100 text-gray-700" },
  };

  const { label, className } = config[status] || config.PENDING;

  return (
    <span
      className={`inline-block px-2 py-1 rounded text-xs font-medium ${className}`}
    >
      {label}
    </span>
  );
}

function maskEmail(email: string): string {
  const [localPart, domain] = email.split("@");
  if (!domain) return email;
  const masked =
    localPart.slice(0, 2) + "***" + (localPart.length > 2 ? localPart.slice(-1) : "");
  return `${masked}@${domain}`;
}
