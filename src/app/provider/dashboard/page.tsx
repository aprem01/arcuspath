import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  User,
  Shield,
  FileText,
  Users,
  Share2,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

export default async function ProviderDashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/signin?callbackUrl=/provider/dashboard");
  }

  // Get provider data
  const provider = await prisma.provider.findUnique({
    where: { userId: session.user.id },
    include: {
      application: true,
      badges: {
        include: { badge: true },
      },
      vouches: {
        where: { status: "ACTIVE" },
      },
      credentials: true,
    },
  });

  if (!provider) {
    // No provider profile yet
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-12">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-purple-100 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-purple-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Welcome to ArcusPath
            </h1>
            <p className="text-gray-600 mb-8">
              You don&apos;t have a provider profile yet. Apply to become a
              verified provider and connect with the LGBTQIA+ community.
            </p>
            <Link
              href="/provider/apply"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-lg hover:opacity-90"
            >
              Apply as Provider
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const statusConfig: Record<
    string,
    { color: string; bg: string; icon: React.ReactNode; text: string }
  > = {
    DRAFT: {
      color: "text-gray-600",
      bg: "bg-gray-100",
      icon: <Clock className="w-5 h-5" />,
      text: "Draft",
    },
    PENDING_REVIEW: {
      color: "text-yellow-700",
      bg: "bg-yellow-100",
      icon: <Clock className="w-5 h-5" />,
      text: "Pending Review",
    },
    APPROVED: {
      color: "text-blue-700",
      bg: "bg-blue-100",
      icon: <CheckCircle className="w-5 h-5" />,
      text: "Approved",
    },
    ACTIVE: {
      color: "text-green-700",
      bg: "bg-green-100",
      icon: <CheckCircle className="w-5 h-5" />,
      text: "Active",
    },
    SUSPENDED: {
      color: "text-red-700",
      bg: "bg-red-100",
      icon: <AlertCircle className="w-5 h-5" />,
      text: "Suspended",
    },
    CHANGES_REQUESTED: {
      color: "text-orange-700",
      bg: "bg-orange-100",
      icon: <AlertCircle className="w-5 h-5" />,
      text: "Changes Requested",
    },
  };

  const status = statusConfig[provider.status] || statusConfig.DRAFT;
  const approvedBadges = provider.badges.filter((b) => b.status === "APPROVED");
  const pendingBadges = provider.badges.filter((b) => b.status === "PENDING");

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Provider Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Manage your profile, badges, and vouches
          </p>
        </div>

        {/* Status Card */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
                {provider.name.charAt(0)}
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {provider.name}
                </h2>
                {provider.businessName && (
                  <p className="text-gray-600">{provider.businessName}</p>
                )}
                <div
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium mt-2 ${status.bg} ${status.color}`}
                >
                  {status.icon}
                  {status.text}
                </div>
              </div>
            </div>
            <Link
              href={`/provider/${provider.id}`}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              View Public Profile
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Link
            href="/provider/dashboard/badges"
            className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-xl">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {approvedBadges.length}
                </p>
                <p className="text-sm text-gray-600">Verified Badges</p>
              </div>
            </div>
            {pendingBadges.length > 0 && (
              <p className="mt-3 text-sm text-yellow-600">
                {pendingBadges.length} pending approval
              </p>
            )}
          </Link>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {provider.vouches.length}
                </p>
                <p className="text-sm text-gray-600">Community Vouches</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {provider.credentials.length}
                </p>
                <p className="text-sm text-gray-600">Credentials</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-pink-100 rounded-xl">
                <Share2 className="w-6 h-6 text-pink-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">0</p>
                <p className="text-sm text-gray-600">Referrals</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/provider/dashboard/badges"
              className="p-4 border border-gray-200 rounded-xl hover:border-purple-400 hover:bg-purple-50 transition-colors"
            >
              <Shield className="w-6 h-6 text-purple-600 mb-2" />
              <p className="font-medium text-gray-900">Apply for Badges</p>
              <p className="text-sm text-gray-600">Get verified trust badges</p>
            </Link>
            <Link
              href="/provider/dashboard/profile"
              className="p-4 border border-gray-200 rounded-xl hover:border-purple-400 hover:bg-purple-50 transition-colors"
            >
              <User className="w-6 h-6 text-purple-600 mb-2" />
              <p className="font-medium text-gray-900">Edit Profile</p>
              <p className="text-sm text-gray-600">Update your information</p>
            </Link>
            <Link
              href="/provider/dashboard/credentials"
              className="p-4 border border-gray-200 rounded-xl hover:border-purple-400 hover:bg-purple-50 transition-colors"
            >
              <FileText className="w-6 h-6 text-purple-600 mb-2" />
              <p className="font-medium text-gray-900">Manage Credentials</p>
              <p className="text-sm text-gray-600">Upload certifications</p>
            </Link>
            <Link
              href="/provider/dashboard/referrals"
              className="p-4 border border-gray-200 rounded-xl hover:border-purple-400 hover:bg-purple-50 transition-colors"
            >
              <Share2 className="w-6 h-6 text-purple-600 mb-2" />
              <p className="font-medium text-gray-900">Referral Program</p>
              <p className="text-sm text-gray-600">Invite other providers</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
