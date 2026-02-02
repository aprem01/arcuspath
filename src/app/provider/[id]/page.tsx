import { notFound } from "next/navigation";
import Link from "next/link";
import {
  MapPin,
  Video,
  Star,
  Globe,
  Phone,
  Mail,
  Clock,
  ChevronLeft,
  ExternalLink,
} from "lucide-react";
import { getProviderById, providers } from "@/data/providers";
import { categories } from "@/data/categories";
import { TrustBadgeList } from "@/components/TrustBadge";
import ProviderCard from "@/components/ProviderCard";

export function generateStaticParams() {
  return providers.map((provider) => ({
    id: provider.id,
  }));
}

export default async function ProviderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const provider = getProviderById(id);

  if (!provider) {
    notFound();
  }

  const category = categories.find((c) => c.id === provider.categoryId);

  // Get related providers (same category, different provider)
  const relatedProviders = providers
    .filter((p) => p.categoryId === provider.categoryId && p.id !== provider.id)
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Link */}
      <Link
        href="/search"
        className="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-arcus-purple mb-6"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to search
      </Link>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Header Card */}
          <div className="card p-6 mb-6">
            <div className="flex flex-col sm:flex-row gap-6">
              {/* Avatar */}
              <div className="w-24 h-24 rounded-2xl bg-gradient-arcus flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-3xl">
                  {provider.name.charAt(0)}
                </span>
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h1 className="text-2xl font-bold text-slate-900">
                      {provider.name}
                    </h1>
                    {provider.businessName && (
                      <p className="text-lg text-slate-600">
                        {provider.businessName}
                      </p>
                    )}
                    {provider.pronouns && (
                      <p className="text-sm text-slate-500">
                        Pronouns: {provider.pronouns}
                      </p>
                    )}
                  </div>

                  {provider.rating && (
                    <div className="flex items-center gap-1 text-lg">
                      <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                      <span className="font-semibold">{provider.rating}</span>
                      <span className="text-slate-500 text-sm">
                        ({provider.reviewCount} reviews)
                      </span>
                    </div>
                  )}
                </div>

                <div className="mt-2">
                  <Link
                    href={`/search?category=${provider.categoryId}`}
                    className="text-arcus-purple hover:text-purple-700 font-medium"
                  >
                    {category?.name}
                  </Link>
                  <span className="text-slate-400 mx-2">/</span>
                  <span className="text-slate-600">{provider.subcategory}</span>
                </div>

                <div className="mt-4">
                  <TrustBadgeList badges={provider.trustBadges} size="md" />
                </div>

                <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-600">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {provider.location.city}, {provider.location.state}
                  </span>
                  {provider.location.virtual && (
                    <span className="flex items-center gap-1 text-arcus-teal">
                      <Video className="w-4 h-4" />
                      Virtual appointments available
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    Est. {provider.yearEstablished}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* About */}
          <div className="card p-6 mb-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">About</h2>
            <p className="text-slate-600 leading-relaxed">
              {provider.description}
            </p>
          </div>

          {/* Specialties */}
          <div className="card p-6 mb-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">
              Specialties
            </h2>
            <div className="flex flex-wrap gap-2">
              {provider.specialties.map((specialty) => (
                <span
                  key={specialty}
                  className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-full text-sm"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>

          {/* Languages */}
          {provider.languages.length > 0 && (
            <div className="card p-6 mb-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">
                Languages
              </h2>
              <div className="flex flex-wrap gap-2">
                {provider.languages.map((language) => (
                  <span
                    key={language}
                    className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm"
                  >
                    {language}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          {/* Contact Card */}
          <div className="card p-6 mb-6 sticky top-24">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">
              Contact
            </h2>

            <div className="space-y-4">
              <button className="btn-primary w-full text-lg py-3">
                Request Appointment
              </button>

              {provider.website && (
                <a
                  href={provider.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-600 hover:text-arcus-purple"
                >
                  <Globe className="w-5 h-5" />
                  <span>Visit Website</span>
                  <ExternalLink className="w-4 h-4 ml-auto" />
                </a>
              )}

              {provider.phone && (
                <a
                  href={`tel:${provider.phone}`}
                  className="flex items-center gap-2 text-slate-600 hover:text-arcus-purple"
                >
                  <Phone className="w-5 h-5" />
                  <span>{provider.phone}</span>
                </a>
              )}

              {provider.email && (
                <a
                  href={`mailto:${provider.email}`}
                  className="flex items-center gap-2 text-slate-600 hover:text-arcus-purple"
                >
                  <Mail className="w-5 h-5" />
                  <span>{provider.email}</span>
                </a>
              )}
            </div>

            <hr className="my-6" />

            <div className="text-sm text-slate-500">
              <p className="mb-2">
                <strong className="text-slate-700">Location:</strong>
              </p>
              <p>
                {provider.location.city}, {provider.location.state}
              </p>
              {provider.location.virtual && (
                <p className="text-arcus-teal mt-1">
                  Virtual appointments available
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Providers */}
      {relatedProviders.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            More {category?.name} Providers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProviders.map((p) => (
              <ProviderCard key={p.id} provider={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
