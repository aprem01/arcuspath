import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  ArrowLeft,
  User,
  MapPin,
  Shield,
  Heart,
  FileText,
  Globe,
  Phone,
  Mail,
  Calendar,
  ExternalLink,
} from "lucide-react";
import ProviderAdminActions from "./ProviderAdminActions";

export const metadata = {
  title: "Provider Details | Admin - ArcusPath",
};

interface Props {
  params: Promise<{ id: string }>;
}

export default async function AdminProviderDetailPage({ params }: Props) {
  const { id } = await params;

  const provider = await prisma.provider.findUnique({
    where: { id },
    include: {
      user: { select: { id: true, name: true, email: true, image: true } },
      category: true,
      credentials: true,
      badges: { include: { badge: true } },
      vouches: {
        where: { status: "ACTIVE" },
        include: { user: { select: { name: true } } },
        take: 10,
        orderBy: { createdAt: "desc" },
      },
      application: true,
    },
  });

  if (!provider) {
    notFound();
  }

  return (
    <div>
      <Link
        href="/admin/providers"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Providers
      </Link>

      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          {provider.image ? (
            <img
              src={provider.image}
              alt=""
              className="w-16 h-16 rounded-full"
            />
          ) : (
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-gray-400" />
            </div>
          )}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{provider.name}</h1>
            <p className="text-gray-600">{provider.category?.name}</p>
          </div>
        </div>
        <ProviderAdminActions
          providerId={provider.id}
          currentStatus={provider.status}
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Info */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-semibold text-gray-900 mb-4">
              Contact Information
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-gray-900">{provider.email || "-"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="text-gray-900">{provider.phone || "-"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Website</p>
                  {provider.website ? (
                    <a
                      href={provider.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-600 hover:underline inline-flex items-center gap-1"
                    >
                      {provider.website}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <p className="text-gray-900">-</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="text-gray-900">
                    {provider.city && provider.state
                      ? `${provider.city}, ${provider.state}`
                      : provider.virtual
                      ? "Virtual Only"
                      : "-"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          {provider.description && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="font-semibold text-gray-900 mb-4">About</h2>
              <p className="text-gray-600 whitespace-pre-wrap">
                {provider.description}
              </p>
            </div>
          )}

          {/* Credentials */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-900">Credentials</h2>
              <span className="text-sm text-gray-500">
                {provider.credentials.length} total
              </span>
            </div>
            {provider.credentials.length === 0 ? (
              <p className="text-gray-500">No credentials on file</p>
            ) : (
              <div className="space-y-3">
                {provider.credentials.map((cred) => (
                  <div
                    key={cred.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900">{cred.name}</p>
                        <p className="text-sm text-gray-500">
                          {cred.type}
                          {cred.licenseNumber && ` • ${cred.licenseNumber}`}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        cred.status === "VERIFIED"
                          ? "bg-green-100 text-green-700"
                          : cred.status === "REJECTED"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {cred.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Badges */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-900">Trust Badges</h2>
              <Link
                href="/admin/badges"
                className="text-sm text-purple-600 hover:underline"
              >
                Manage Badges
              </Link>
            </div>
            {provider.badges.length === 0 ? (
              <p className="text-gray-500">No badges applied</p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {provider.badges.map((pb) => (
                  <div
                    key={pb.id}
                    className={`p-3 rounded-lg border ${
                      pb.status === "APPROVED"
                        ? "bg-green-50 border-green-200"
                        : pb.status === "REJECTED"
                        ? "bg-red-50 border-red-200"
                        : "bg-yellow-50 border-yellow-200"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Shield className="w-4 h-4" />
                      <span className="font-medium text-sm">
                        {pb.badge.name}
                      </span>
                    </div>
                    <span
                      className={`text-xs ${
                        pb.status === "APPROVED"
                          ? "text-green-600"
                          : pb.status === "REJECTED"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {pb.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Vouches */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                <Heart className="w-5 h-5 text-pink-500" />
                Community Vouches ({provider.communityEndorsements})
              </h2>
            </div>
            {provider.vouches.length === 0 ? (
              <p className="text-gray-500">No vouches yet</p>
            ) : (
              <div className="space-y-3">
                {provider.vouches.map((vouch) => (
                  <div key={vouch.id} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-gray-900">
                        {vouch.isAnonymous ? "Anonymous" : vouch.user.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(vouch.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">{vouch.relationship}</p>
                    {vouch.comment && (
                      <p className="text-sm text-gray-600 mt-2">
                        "{vouch.comment}"
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Quick Stats</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Status</span>
                <StatusBadge status={provider.status} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Credentials</span>
                <span className="font-medium">{provider.credentials.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Badges</span>
                <span className="font-medium">
                  {provider.badges.filter((b) => b.status === "APPROVED").length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Vouches</span>
                <span className="font-medium">
                  {provider.communityEndorsements}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Virtual Services</span>
                <span className="font-medium">
                  {provider.virtual ? "Yes" : "No"}
                </span>
              </div>
            </div>
          </div>

          {/* Account Info */}
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Account Owner</h3>
            <div className="flex items-center gap-3">
              {provider.user?.image ? (
                <img
                  src={provider.user.image}
                  alt=""
                  className="w-10 h-10 rounded-full"
                />
              ) : (
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-gray-400" />
                </div>
              )}
              <div>
                <p className="font-medium text-gray-900">{provider.user?.name || "No account"}</p>
                <p className="text-sm text-gray-500">{provider.user?.email || "-"}</p>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Timeline</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-gray-500">Created:</span>
                <span className="text-gray-900">
                  {new Date(provider.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-gray-500">Updated:</span>
                <span className="text-gray-900">
                  {new Date(provider.updatedAt).toLocaleDateString()}
                </span>
              </div>
              {provider.yearEstablished && (
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-500">Established:</span>
                  <span className="text-gray-900">
                    {provider.yearEstablished}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Public Profile Link */}
          <Link
            href={`/provider/${provider.id}`}
            target="_blank"
            className="block w-full text-center px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
          >
            View Public Profile
          </Link>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    ACTIVE: "bg-green-100 text-green-700",
    APPROVED: "bg-blue-100 text-blue-700",
    PENDING_REVIEW: "bg-yellow-100 text-yellow-700",
    SUSPENDED: "bg-red-100 text-red-700",
    DRAFT: "bg-gray-100 text-gray-700",
  };

  return (
    <span
      className={`px-2 py-1 rounded text-xs font-medium ${
        colors[status] || colors.DRAFT
      }`}
    >
      {status.replace("_", " ")}
    </span>
  );
}
