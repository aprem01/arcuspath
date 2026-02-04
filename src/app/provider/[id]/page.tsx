import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import {
  MapPin,
  Video,
  Star,
  Clock,
  ChevronLeft,
  Users,
  Calendar,
  MessageCircle,
} from "lucide-react";
import { getProviderById, providers, getFeaturedProviders } from "@/data/providers";
import { categories, getVerificationInfo } from "@/data/categories";
import { TrustBadgeList } from "@/components/TrustBadge";
import ProviderCard from "@/components/ProviderCard";
import VerificationBadge from "@/components/trust/VerificationBadge";
import { InclusiveTagList } from "@/components/trust/InclusiveTagBadge";
import ProviderActions from "./ProviderActions";

export function generateStaticParams() {
  return providers.map((provider) => ({
    id: provider.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const provider = getProviderById(id);

  if (!provider) {
    return { title: "Provider Not Found - ArcusPath" };
  }

  return {
    title: `${provider.name} - ${provider.subcategory} | ArcusPath`,
    description: provider.shortBio,
    openGraph: {
      title: `${provider.name} - ${provider.subcategory}`,
      description: provider.shortBio,
    },
  };
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
  const verificationInfo = getVerificationInfo(provider.trust.verification.level);

  // Get related providers (same category, different provider)
  const relatedProviders = providers
    .filter(
      (p) =>
        p.categoryId === provider.categoryId &&
        p.id !== provider.id &&
        p.status === "active"
    )
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Link */}
      <Link
        href="/search"
        className="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-arcus-purple mb-6 focus-visible:underline"
      >
        <ChevronLeft className="w-4 h-4" aria-hidden="true" />
        Back to search
      </Link>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header Card */}
          <article className="card p-6">
            <div className="flex flex-col sm:flex-row gap-6">
              {/* Avatar */}
              <div
                className="w-24 h-24 rounded-2xl bg-gradient-arcus flex items-center justify-center flex-shrink-0"
                aria-hidden="true"
              >
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
                      <Star
                        className="w-5 h-5 text-amber-400 fill-amber-400"
                        aria-hidden="true"
                      />
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
                  <span className="text-slate-400 mx-2" aria-hidden="true">
                    /
                  </span>
                  <span className="text-slate-600">{provider.subcategory}</span>
                </div>

                {/* Trust Badges */}
                <div className="mt-4">
                  <TrustBadgeList badges={provider.trustBadges} size="md" />
                </div>

                {/* Location & Meta */}
                <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-600">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" aria-hidden="true" />
                    {provider.location.city}, {provider.location.state}
                  </span>
                  {provider.location.virtual && (
                    <span className="flex items-center gap-1 text-arcus-teal">
                      <Video className="w-4 h-4" aria-hidden="true" />
                      Virtual available
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" aria-hidden="true" />
                    Est. {provider.yearEstablished}
                  </span>
                </div>
              </div>
            </div>
          </article>

          {/* Verification & Trust Section */}
          <section className="card p-6" aria-labelledby="trust-heading">
            <h2
              id="trust-heading"
              className="text-xl font-semibold text-slate-900 mb-4"
            >
              Trust & Verification
            </h2>

            <div className="space-y-4">
              {/* Verification Level */}
              <div className="flex items-start gap-4">
                <VerificationBadge
                  level={provider.trust.verification.level}
                  verifiedAt={provider.trust.verification.verifiedAt}
                  method={provider.trust.verification.method}
                  showDetails
                  size="lg"
                />
              </div>

              {/* Community Endorsements */}
              {provider.trust.communityEndorsements > 0 && (
                <div className="flex items-center gap-2 text-slate-600">
                  <Users className="w-5 h-5 text-purple-600" aria-hidden="true" />
                  <span>
                    <strong>{provider.trust.communityEndorsements}</strong> community
                    endorsements
                  </span>
                </div>
              )}

              {/* LGBTQ+ Owned */}
              {provider.trust.lgbtqOwned && (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-pink-50 text-pink-800 rounded-full text-sm font-medium">
                  <Star className="w-4 h-4" aria-hidden="true" />
                  LGBTQIA+ Owned Business
                </div>
              )}
            </div>

            {/* Inclusive Care Tags */}
            {provider.trust.inclusiveTags.length > 0 && (
              <div className="mt-6 pt-6 border-t border-slate-100">
                <h3 className="text-sm font-medium text-slate-900 mb-3">
                  Inclusive Care Specializations
                </h3>
                <InclusiveTagList tags={provider.trust.inclusiveTags} size="md" />
              </div>
            )}
          </section>

          {/* Affirmation Statement */}
          {provider.trust.affirmationStatement && (
            <section className="card p-6" aria-labelledby="affirmation-heading">
              <h2
                id="affirmation-heading"
                className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2"
              >
                <MessageCircle className="w-5 h-5 text-arcus-purple" aria-hidden="true" />
                Commitment to Affirming Care
              </h2>
              <blockquote className="text-slate-600 leading-relaxed italic border-l-4 border-arcus-purple pl-4">
                &ldquo;{provider.trust.affirmationStatement}&rdquo;
              </blockquote>
            </section>
          )}

          {/* About */}
          <section className="card p-6" aria-labelledby="about-heading">
            <h2
              id="about-heading"
              className="text-xl font-semibold text-slate-900 mb-4"
            >
              About
            </h2>
            <p className="text-slate-600 leading-relaxed">{provider.description}</p>
          </section>

          {/* Specialties */}
          <section className="card p-6" aria-labelledby="specialties-heading">
            <h2
              id="specialties-heading"
              className="text-xl font-semibold text-slate-900 mb-4"
            >
              Specialties
            </h2>
            <ul className="flex flex-wrap gap-2" role="list">
              {provider.specialties.map((specialty) => (
                <li key={specialty}>
                  <span className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-full text-sm">
                    {specialty}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* Languages */}
          {provider.languages.length > 0 && (
            <section className="card p-6" aria-labelledby="languages-heading">
              <h2
                id="languages-heading"
                className="text-xl font-semibold text-slate-900 mb-4"
              >
                Languages
              </h2>
              <ul className="flex flex-wrap gap-2" role="list">
                {provider.languages.map((language) => (
                  <li key={language}>
                    <span className="px-3 py-1.5 bg-blue-50 text-blue-800 rounded-full text-sm">
                      {language}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-1">
          {/* Contact Card - Uses Client Component for dialogs */}
          <ProviderActions provider={provider} />
        </aside>
      </div>

      {/* Related Providers */}
      {relatedProviders.length > 0 && (
        <section className="mt-12" aria-labelledby="related-heading">
          <h2
            id="related-heading"
            className="text-2xl font-bold text-slate-900 mb-6"
          >
            More {category?.name} Providers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProviders.map((p) => (
              <ProviderCard key={p.id} provider={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
