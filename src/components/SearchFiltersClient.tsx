"use client";

import { useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Filter, X, ArrowUpDown, Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import { TrustBadgeList } from "@/components/TrustBadge";
import AISearchAssistant from "@/components/AISearchAssistant";
import { categories, trustBadges } from "@/data/categories";
import { TrustBadgeId, SortOption } from "@/lib/types";

interface SearchFiltersClientProps {
  initialCategory: string;
  initialQuery: string;
  initialLocation: string;
  initialSort: SortOption;
  initialVirtual: boolean;
  initialBadges: TrustBadgeId[];
  initialSubcategory: string;
}

export default function SearchFiltersClient({
  initialCategory,
  initialSort,
  initialVirtual,
  initialBadges,
  initialSubcategory,
}: SearchFiltersClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [showFilters, setShowFilters] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);

  // Local state synced from URL params
  const [sortBy, setSortBy] = useState<SortOption>(initialSort);
  const [selectedBadges, setSelectedBadges] = useState<TrustBadgeId[]>(initialBadges);
  const [selectedSubcategory, setSelectedSubcategory] = useState(initialSubcategory);
  const [virtualOnly, setVirtualOnly] = useState(initialVirtual);

  const selectedCategory = categories.find((c) => c.id === initialCategory);

  // Update URL with new params (triggers server re-render)
  const updateSearchParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === "" || value === "false") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });

      router.push(`/search?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  const handleSortChange = (newSort: SortOption) => {
    setSortBy(newSort);
    updateSearchParams({ sort: newSort === "trust" ? null : newSort });
  };

  const handleCategoryChange = (categoryId: string) => {
    if (initialCategory === categoryId) {
      updateSearchParams({ category: null, subcategory: null });
    } else {
      updateSearchParams({ category: categoryId, subcategory: null });
    }
  };

  const handleSubcategoryChange = (subcategory: string) => {
    setSelectedSubcategory(subcategory);
    updateSearchParams({ subcategory: subcategory || null });
  };

  const handleBadgeToggle = (badge: TrustBadgeId) => {
    const newBadges = selectedBadges.includes(badge)
      ? selectedBadges.filter((b) => b !== badge)
      : [...selectedBadges, badge];
    setSelectedBadges(newBadges);
    updateSearchParams({ badges: newBadges.length > 0 ? newBadges.join(",") : null });
  };

  const handleVirtualToggle = (checked: boolean) => {
    setVirtualOnly(checked);
    updateSearchParams({ virtual: checked ? "true" : null });
  };

  const clearFilters = () => {
    setSelectedBadges([]);
    setSelectedSubcategory("");
    setVirtualOnly(false);
    updateSearchParams({
      badges: null,
      subcategory: null,
      virtual: null,
    });
  };

  const hasActiveFilters =
    selectedBadges.length > 0 || selectedSubcategory || virtualOnly;

  return (
    <div className="space-y-4">
      {/* AI Search Toggle */}
      <button
        onClick={() => setShowAIAssistant(!showAIAssistant)}
        className="flex items-center gap-2 text-sm text-arcus-purple hover:text-purple-700 transition-colors"
      >
        <Sparkles className="w-4 h-4" aria-hidden="true" />
        <span>Try natural language search</span>
        {showAIAssistant ? (
          <ChevronUp className="w-4 h-4" aria-hidden="true" />
        ) : (
          <ChevronDown className="w-4 h-4" aria-hidden="true" />
        )}
      </button>

      {showAIAssistant && (
        <div className="animate-slide-up">
          <AISearchAssistant />
        </div>
      )}

      {/* Sort Dropdown */}
      <div className="flex items-center gap-2 pb-4 border-b border-slate-200">
        <label
          htmlFor="sort-select"
          className="text-sm text-slate-600 flex items-center gap-1"
        >
          <ArrowUpDown className="w-4 h-4" aria-hidden="true" />
          Sort:
        </label>
        <select
          id="sort-select"
          value={sortBy}
          onChange={(e) => handleSortChange(e.target.value as SortOption)}
          className="flex-1 px-3 py-1.5 border border-slate-300 rounded-lg text-sm focus:ring-arcus-purple focus:border-arcus-purple"
        >
          <option value="trust">Most Trusted</option>
          <option value="rating">Highest Rated</option>
          <option value="newest">Newest</option>
          <option value="alphabetical">A-Z</option>
        </select>
      </div>

      {/* Mobile Filter Toggle */}
      <div className="lg:hidden">
        <button
          onClick={() => setShowFilters(true)}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-slate-300 rounded-lg text-sm"
        >
          <Filter className="w-4 h-4" />
          Filters
          {hasActiveFilters && (
            <span className="bg-arcus-purple text-white text-xs px-1.5 py-0.5 rounded-full">
              {selectedBadges.length +
                (selectedSubcategory ? 1 : 0) +
                (virtualOnly ? 1 : 0)}
            </span>
          )}
        </button>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 py-2">
          <span className="text-sm text-slate-600">Active:</span>
          {selectedBadges.length > 0 && (
            <TrustBadgeList badges={selectedBadges} size="sm" />
          )}
          {selectedSubcategory && (
            <span className="badge bg-slate-100 text-slate-700 text-xs">
              {selectedSubcategory}
              <button
                onClick={() => handleSubcategoryChange("")}
                className="ml-1"
                aria-label={`Remove ${selectedSubcategory} filter`}
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {virtualOnly && (
            <span className="badge bg-teal-100 text-teal-700 text-xs">
              Virtual
              <button
                onClick={() => handleVirtualToggle(false)}
                className="ml-1"
                aria-label="Remove virtual only filter"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>
      )}

      {/* Filters Panel */}
      <div
        className={`${
          showFilters
            ? "fixed inset-0 z-50 bg-white p-6 overflow-y-auto"
            : "hidden lg:block"
        }`}
        role="complementary"
        aria-label="Search filters"
      >
        {/* Mobile header */}
        <div className="flex justify-between items-center mb-6 lg:hidden">
          <h2 className="text-lg font-semibold">Filters</h2>
          <button onClick={() => setShowFilters(false)} aria-label="Close filters">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <h3 className="font-semibold text-slate-900 mb-3">Category</h3>
          <div className="space-y-2">
            {categories.map((cat) => (
              <label key={cat.id} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  checked={initialCategory === cat.id}
                  onChange={() => handleCategoryChange(cat.id)}
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
              onChange={(e) => handleSubcategoryChange(e.target.value)}
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
              <label key={badge.id} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedBadges.includes(badge.id)}
                  onChange={() => handleBadgeToggle(badge.id)}
                  className="text-arcus-purple focus:ring-arcus-purple rounded"
                />
                <span className="text-sm text-slate-700">{badge.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Virtual Only */}
        <div className="mb-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={virtualOnly}
              onChange={(e) => handleVirtualToggle(e.target.checked)}
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
          <button onClick={() => setShowFilters(false)} className="btn-primary w-full">
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
