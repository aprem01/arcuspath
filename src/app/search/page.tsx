import { Metadata } from "next";
import { Suspense } from "react";
import SearchBar from "@/components/SearchBar";
import ProviderCard from "@/components/ProviderCard";
import SearchFiltersClient from "@/components/SearchFiltersClient";
import { categories } from "@/data/categories";
import { searchProviders } from "@/data/providers";
import { SearchFilters, SortOption, TrustBadgeId, Provider } from "@/lib/types";

export const metadata: Metadata = {
  title: "Find Providers | ArcusPath",
  description:
    "Search for LGBTQIA+ affirming healthcare providers, attorneys, financial advisors, and more.",
};

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
    category?: string;
    subcategory?: string;
    location?: string;
    virtual?: string;
    badges?: string;
    sort?: string;
  }>;
}

// Server-side provider grid component
function ProviderGrid({ providers }: { providers: Provider[] }) {
  if (providers.length === 0) {
    return (
      <div className="text-center py-16" data-testid="no-results">
        <p className="text-lg text-slate-600 mb-4">
          No providers found matching your criteria.
        </p>
        <a href="/search" className="btn-secondary inline-block">
          Clear filters
        </a>
      </div>
    );
  }

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
      data-testid="provider-grid"
    >
      {providers.map((provider) => (
        <ProviderCard key={provider.id} provider={provider} />
      ))}
    </div>
  );
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  // Await searchParams (Next.js 15+ requirement)
  const params = await searchParams;

  // Parse search parameters server-side
  const query = params.q || "";
  const categoryId = params.category || "";
  const subcategory = params.subcategory || "";
  const location = params.location || "";
  const virtualOnly = params.virtual === "true";
  const badges = params.badges
    ? (params.badges.split(",") as TrustBadgeId[])
    : [];
  const sortBy = (params.sort as SortOption) || "trust";

  // Build filters and fetch results server-side
  const filters: SearchFilters = {};
  if (query) filters.query = query;
  if (categoryId) filters.category = categoryId;
  if (subcategory) filters.subcategory = subcategory;
  if (location) filters.location = location;
  if (badges.length > 0) filters.badges = badges;
  if (virtualOnly) filters.virtual = true;

  // Fetch results server-side - this runs on the server
  const { providers: results, total } = searchProviders(filters, sortBy);

  // Get selected category for title
  const selectedCategory = categories.find((c) => c.id === categoryId);

  // Build page title
  const pageTitle = selectedCategory
    ? `${selectedCategory.name} Providers`
    : query
      ? `Search results for "${query}"`
      : "All Providers";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search Header */}
      <div className="mb-6">
        <SearchBar
          initialQuery={query}
          initialLocation={location}
          variant="compact"
        />
      </div>

      {/* Page Title - rendered server-side */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{pageTitle}</h1>
          <p className="text-slate-600 mt-1" data-testid="results-count">
            {total} provider{total !== 1 ? "s" : ""} found
          </p>
        </div>
      </div>

      {/* Main Content with Sidebar */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar - Client Component for interactivity */}
        <div className="lg:w-64 lg:flex-shrink-0">
          <Suspense
            fallback={
              <div className="hidden lg:block w-64 space-y-6 animate-pulse">
                <div className="h-40 bg-slate-100 rounded-lg" />
                <div className="h-32 bg-slate-100 rounded-lg" />
              </div>
            }
          >
            <SearchFiltersClient
              initialCategory={categoryId}
              initialQuery={query}
              initialLocation={location}
              initialSort={sortBy}
              initialVirtual={virtualOnly}
              initialBadges={badges}
              initialSubcategory={subcategory}
            />
          </Suspense>
        </div>

        {/* Results - rendered server-side */}
        <div className="flex-1">
          <ProviderGrid providers={results} />
        </div>
      </div>
    </div>
  );
}
