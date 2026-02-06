import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  Users,
  Shield,
  FileText,
  MessageSquare,
  TrendingUp,
  Clock,
} from "lucide-react";

export default async function AdminDashboardPage() {
  // Fetch stats
  const [
    totalProviders,
    pendingApplications,
    pendingBadges,
    totalVouches,
    activeProviders,
    recentProviders,
  ] = await Promise.all([
    prisma.provider.count(),
    prisma.providerApplication.count({ where: { status: "SUBMITTED" } }),
    prisma.providerBadge.count({ where: { status: "PENDING" } }),
    prisma.vouch.count({ where: { status: "ACTIVE" } }),
    prisma.provider.count({ where: { status: "ACTIVE" } }),
    prisma.provider.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        categoryId: true,
        status: true,
        createdAt: true,
      },
    }),
  ]);

  const stats = [
    {
      label: "Total Providers",
      value: totalProviders,
      icon: Users,
      color: "blue",
    },
    {
      label: "Active Providers",
      value: activeProviders,
      icon: TrendingUp,
      color: "green",
    },
    {
      label: "Pending Applications",
      value: pendingApplications,
      icon: FileText,
      color: "yellow",
      href: "/admin/applications",
    },
    {
      label: "Pending Badges",
      value: pendingBadges,
      icon: Shield,
      color: "purple",
      href: "/admin/badges",
    },
    {
      label: "Community Vouches",
      value: totalVouches,
      icon: MessageSquare,
      color: "pink",
    },
  ];

  const colorClasses: Record<string, { bg: string; text: string }> = {
    blue: { bg: "bg-blue-100", text: "text-blue-600" },
    green: { bg: "bg-green-100", text: "text-green-600" },
    yellow: { bg: "bg-yellow-100", text: "text-yellow-600" },
    purple: { bg: "bg-purple-100", text: "text-purple-600" },
    pink: { bg: "bg-pink-100", text: "text-pink-600" },
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Welcome to the ArcusPath admin portal
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        {stats.map((stat) => {
          const colors = colorClasses[stat.color];
          const content = (
            <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${colors.bg}`}>
                  <stat.icon className={`w-6 h-6 ${colors.text}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              </div>
            </div>
          );

          return stat.href ? (
            <Link key={stat.label} href={stat.href}>
              {content}
            </Link>
          ) : (
            <div key={stat.label}>{content}</div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Pending Items */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Needs Attention
          </h2>
          <div className="space-y-4">
            {pendingApplications > 0 && (
              <Link
                href="/admin/applications"
                className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-yellow-600" />
                  <span className="font-medium text-gray-900">
                    {pendingApplications} pending application
                    {pendingApplications !== 1 && "s"}
                  </span>
                </div>
                <span className="text-yellow-600 text-sm">Review &rarr;</span>
              </Link>
            )}
            {pendingBadges > 0 && (
              <Link
                href="/admin/badges"
                className="flex items-center justify-between p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-purple-600" />
                  <span className="font-medium text-gray-900">
                    {pendingBadges} pending badge request
                    {pendingBadges !== 1 && "s"}
                  </span>
                </div>
                <span className="text-purple-600 text-sm">Review &rarr;</span>
              </Link>
            )}
            {pendingApplications === 0 && pendingBadges === 0 && (
              <p className="text-gray-500 text-center py-4">
                All caught up! No pending items.
              </p>
            )}
          </div>
        </div>

        {/* Recent Providers */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Providers
          </h2>
          <div className="space-y-3">
            {recentProviders.map((provider) => (
              <Link
                key={provider.id}
                href={`/admin/providers/${provider.id}`}
                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-500 rounded-lg flex items-center justify-center text-white font-medium">
                    {provider.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{provider.name}</p>
                    <p className="text-sm text-gray-500 capitalize">
                      {provider.categoryId}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  {new Date(provider.createdAt).toLocaleDateString()}
                </div>
              </Link>
            ))}
            {recentProviders.length === 0 && (
              <p className="text-gray-500 text-center py-4">
                No providers yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
