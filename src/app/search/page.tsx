"use client";

import { useSearchParams } from "next/navigation";
import { useState, useMemo, Suspense } from "react";
import { Filter, X, ArrowUpDown, Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import ProviderCard from "@/components/ProviderCard";
import { TrustBadgeList } from "@/components/TrustBadge";
import AISearchAssistant from "@/components/AISearchAssistant";
import { categories, trustBadges } from "@/data/categories";
import { searchProviders } from "@/data/providers";
import { TrustBadge, SearchFilters, SortOption } from "@/lib/types";

function SearchContent() {
  const searchParams = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);

  const query = searchParams.get("q") || "";
  const categoryId = searchParams.get("category") || "";
  const location = searchParams.get("location") || "";

  const [selectedBadges, setSelectedBadges] = useState<TrustBadge["id"][]>([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [virtualOnly, setVirtualOnly] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("trust");
  const [showAIAssistant, setShowAIAssistant] = useState(false);

  const selectedCategory = categories.find((c) => c.id === categoryId);

  const results = useMemo(() => {
    const filters: SearchFilters = {};

    if (query) filters.query = query;
    if (categoryId) filters.category = categoryId;
    if (selectedSubcategory) filters.subcategory = selectedSubcategory;
    if (location) filters.location = location;
    if (selectedBadges.length > 0) filters.badges = selectedBadges;
    if (virtualOnly) filters.virtual = true;

    const result = searchProviders(filters, sortBy);
    return result.providers;
  }, [query, categoryId, selectedSubcategory, location, selectedBadges, virtualOnly, sortBy]);

  const toggleBadge = (badge: TrustBadge["id"]) => {
    setSelectedBadges((prev) =>
      prev.includes(badge) ? prev.filter((b) => b !== badge) : [...prev, badge]
    );
  };

  const clearFilters = () => {
    setSelectedBadges([]);
    setSelectedSubcategory("");
    setVirtualOnly(false);
  };

  const hasActiveFilters =
    selectedBadges.length > 0 || selectedSubcategory || virtualOnly;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search Header */}
      <div className="mb-6">
        <SearchBar
          initialQuery={query}
          initialLocation={location}
          variant="compact"
        />

        {/* AI Search Toggle */}
        <button
          onClick={() => setShowAIAssistant(!showAIAssistant)}
          className="mt-3 flex items-center gap-2 text-sm text-arcus-purple hover:text-purple-700 transition-colors"
        >
          <Sparkles className="w-4 h-4" aria-hidden="true" />
          <span>Try natural language search</span>
          {showAIAssistant ? (
            <ChevronUp className="w-4 h-4" aria-hidden="true" />
          ) : (
            <ChevronDown className="w-4 h-4" aria-hidden="true" />
          )}
        </button>

        {/* AI Search Assistant */}
        {showAIAssistant && (
          <div className="mt-4 animate-slide-up">
            <AISearchAssistant />
          </div>
        )}
      </div>

      {/* Page Title */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            {selectedCategory
              ? `${selectedCategory.name} Providers`
              : query
              ? `Search results for "${query}"`
              : "All Providers"}
          </h1>
          <p className="text-slate-600 mt-1">
            {results.length} provider{results.length !== 1 ? "s" : ""} found
          </p>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <label htmlFor="sort-select" className="text-sm text-slate-600 flex items-center gap-1">
            <ArrowUpDown className="w-4 h-4" aria-hidden="true" />
            Sort by:
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="px-3 py-1.5 border border-slate-300 rounded-lg text-sm focus:ring-arcus-purple focus:border-arcus-purple"
          >
            <option value="trust">Most Trusted</option>
            <option value="rating">Highest Rated</option>
            <option value="newest">Newest</option>
            <option value="alphabetical">A-Z</option>
          </select>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Filters Sidebar */}
        <aside
          className={`${
            showFilters ? "fixed inset-0 z-50 bg-white p-6" : "hidden"
          } lg:block lg:relative lg:w-64 lg:flex-shrink-0`}
        >
          <div className="flex justify-between items-center mb-6 lg:hidden">
            <h2 className="text-lg font-semibold">Filters</h2>
            <button onClick={() => setShowFilters(false)}>
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Category Filter */}
          <div className="mb-6">
            <h3 className="font-semibold text-slate-900 mb-3">Category</h3>
            <div className="space-y-2">
              {categories.map((cat) => (
                <label key={cat.id} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="category"
                    checked={categoryId === cat.id}
                    onChange={() => {
                      const url = new URL(window.location.href);
                      if (categoryId === cat.id) {
                        url.searchParams.delete("category");
                      } else {
                        url.searchParams.set("category", cat.id);
                      }
                      window.location.href = url.toString();
                    }}
                    className="text-arcus-purple focus:ring-arcus-purple"
                  />
                  <span className="text-sm text-slate-700">{cat.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Subcategory Filter */}
          {selectedCategory && (
            <div className="mb-6">
              <h3 className="font-semibold text-slate-900 mb-3">Specialty</h3>
              <select
                value={selectedSubcategory}
                onChange={(e) => setSelectedSubcategory(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-arcus-purple focus:border-arcus-purple"
              >
                <option value="">All Specialties</option>
                {selectedCategory.subcategories.map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Trust Badges Filter */}
          <div className="mb-6">
            <h3 className="font-semibold text-slate-900 mb-3">Trust Badges</h3>
            <div className="space-y-2">
              {trustBadges.map((badge) => (
                <label key={badge.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedBadges.includes(badge.id)}
                    onChange={() => toggleBadge(badge.id)}
                    className="text-arcus-purple focus:ring-arcus-purple rounded"
                  />
                  <span className="text-sm text-slate-700">{badge.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Virtual Only */}
          <div className="mb-6">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={virtualOnly}
                onChange={(e) => setVirtualOnly(e.target.checked)}
                className="text-arcus-purple focus:ring-arcus-purple rounded"
              />
              <span className="text-sm text-slate-700">
                Virtual appointments available
              </span>
            </label>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-arcus-purple hover:text-purple-700"
            >
              Clear all filters
            </button>
          )}

          {/* Apply (Mobile) */}
          <div className="lg:hidden mt-8">
            <button
              onClick={() => setShowFilters(false)}
              className="btn-primary w-full"
            >
              Apply Filters
            </button>
          </div>
        </aside>

        {/* Results */}
        <div className="flex-1">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setShowFilters(true)}
              className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg text-sm"
            >
              <Filter className="w-4 h-4" />
              Filters
              {hasActiveFilters && (
                <span className="bg-arcus-purple text-white text-xs px-1.5 py-0.5 rounded-full">
                  {selectedBadges.length + (selectedSubcategory ? 1 : 0) + (virtualOnly ? 1 : 0)}
                </span>
              )}
            </button>
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="text-sm text-slate-600">Active filters:</span>
              {selectedBadges.length > 0 && (
                <TrustBadgeList badges={selectedBadges} size="sm" />
              )}
              {selectedSubcategory && (
                <span className="badge bg-slate-100 text-slate-700">
                  {selectedSubcategory}
                  <button
                    onClick={() => setSelectedSubcategory("")}
                    className="ml-1"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {virtualOnly && (
                <span className="badge bg-teal-100 text-teal-700">
                  Virtual Only
                  <button onClick={() => setVirtualOnly(false)} className="ml-1">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>
          )}

          {/* Provider Grid */}
          {results.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {results.map((provider) => (
                <ProviderCard key={provider.id} provider={provider} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-lg text-slate-600 mb-4">
                No providers found matching your criteria.
              </p>
              <button onClick={clearFilters} className="btn-secondary">
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-8">Loading...</div>}>
      <SearchContent />
    </Suspense>
  );
}
