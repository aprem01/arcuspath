import SearchBar from "@/components/SearchBar";
import { CategoryList } from "@/components/CategoryCard";
import ProviderCard from "@/components/ProviderCard";
import { categories } from "@/data/categories";
import { providers } from "@/data/providers";
import { ShieldCheck, Heart, Users, Lock } from "lucide-react";

export default function Home() {
  // Get featured providers (top rated)
  const featuredProviders = [...providers]
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-arcus-purple via-arcus-blue to-arcus-teal">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Find Trusted Services
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-yellow-200">
                For Our Community
              </span>
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Discover verified, LGBTQIA+-affirming professionals in healthcare,
              legal, financial, career, and lifestyle services.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto">
            <SearchBar />
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-10 text-white/80 text-sm">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5" />
              <span>500+ Verified Providers</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5" />
              <span>All LGBTQIA+ Affirming</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5" />
              <span>Privacy First</span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Browse by Category
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Find the services you need from providers who understand and affirm
            your identity.
          </p>
        </div>
        <CategoryList categories={categories} />
      </section>

      {/* Trust Signals Section */}
      <section className="bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Built on Trust
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Every provider on ArcusPath meets our standards for inclusive,
              affirming service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-7 h-7 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Verified Providers</h3>
              <p className="text-sm text-slate-600">
                Every provider&apos;s identity and credentials are verified
                before listing.
              </p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center mx-auto mb-4">
                <Heart className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Affirming Care</h3>
              <p className="text-sm text-slate-600">
                All providers demonstrate commitment to LGBTQIA+-affirming
                practices.
              </p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-pink-100 flex items-center justify-center mx-auto mb-4">
                <Users className="w-7 h-7 text-pink-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Community Powered</h3>
              <p className="text-sm text-slate-600">
                Real reviews from community members help you make informed
                choices.
              </p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center mx-auto mb-4">
                <Lock className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Privacy Protected</h3>
              <p className="text-sm text-slate-600">
                Your privacy is paramount. We never share your data without
                consent.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Providers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              Featured Providers
            </h2>
            <p className="text-lg text-slate-600">
              Highly rated professionals trusted by our community
            </p>
          </div>
          <a
            href="/search"
            className="hidden md:inline-flex btn-secondary text-sm"
          >
            View All Providers
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProviders.map((provider) => (
            <ProviderCard key={provider.id} provider={provider} />
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <a href="/search" className="btn-secondary">
            View All Providers
          </a>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-arcus-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">
                Are You a Provider?
              </h2>
              <p className="text-lg text-slate-300 mb-6">
                Join ArcusPath to connect with LGBTQIA+ clients seeking your
                affirming services. Get verified, build trust, and grow your
                practice.
              </p>
              <button className="bg-white hover:bg-slate-100 text-arcus-purple font-semibold px-6 py-3 rounded-lg transition-colors">
                Join as a Provider
              </button>
            </div>

            <div className="bg-white/10 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-white mb-4">
                Provider Benefits
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-slate-300">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <span>Trust badges that demonstrate your commitment</span>
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <Users className="w-5 h-5 text-pink-400" />
                  <span>Access to clients specifically seeking affirming care</span>
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <Heart className="w-5 h-5 text-purple-400" />
                  <span>Be part of a mission-driven community</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
