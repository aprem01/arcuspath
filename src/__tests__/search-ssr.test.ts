/**
 * Search SSR Tests
 * Tests for server-side search filtering and parameter parsing
 */

import { searchProviders } from "@/data/providers";
import { SearchFilters, SortOption, TrustBadgeId } from "@/lib/types";

describe("Search SSR - URL Parameter Parsing", () => {
  describe("filter parsing", () => {
    it("should filter by category", () => {
      const result = searchProviders({ category: "healthcare" });
      result.providers.forEach((p) => {
        expect(p.categoryId).toBe("healthcare");
      });
    });

    it("should filter by query string", () => {
      const result = searchProviders({ query: "therapy" });
      // Should return results or empty array, but not error
      expect(Array.isArray(result.providers)).toBe(true);
    });

    it("should filter by virtual availability", () => {
      const result = searchProviders({ virtual: true });
      result.providers.forEach((p) => {
        expect(p.location.virtual).toBe(true);
      });
    });

    it("should filter by multiple badges", () => {
      const badges: TrustBadgeId[] = ["verified", "affirming"];
      const result = searchProviders({ badges });
      result.providers.forEach((p) => {
        const hasAllBadges = badges.every((b) => p.trustBadges.includes(b));
        expect(hasAllBadges).toBe(true);
      });
    });

    it("should combine multiple filters", () => {
      const filters: SearchFilters = {
        category: "healthcare",
        virtual: true,
        badges: ["verified"],
      };
      const result = searchProviders(filters);
      result.providers.forEach((p) => {
        expect(p.categoryId).toBe("healthcare");
        expect(p.location.virtual).toBe(true);
        expect(p.trustBadges).toContain("verified");
      });
    });
  });

  describe("sorting", () => {
    const sortOptions: SortOption[] = [
      "trust",
      "rating",
      "newest",
      "alphabetical",
    ];

    sortOptions.forEach((sort) => {
      it(`should sort by ${sort} without errors`, () => {
        const result = searchProviders({}, sort);
        expect(Array.isArray(result.providers)).toBe(true);
        expect(result.total).toBeGreaterThanOrEqual(0);
      });
    });

    it("should sort by rating in descending order", () => {
      const result = searchProviders({}, "rating");
      for (let i = 0; i < result.providers.length - 1; i++) {
        const current = result.providers[i].rating || 0;
        const next = result.providers[i + 1].rating || 0;
        expect(current).toBeGreaterThanOrEqual(next);
      }
    });

    it("should sort alphabetically in ascending order", () => {
      const result = searchProviders({}, "alphabetical");
      for (let i = 0; i < result.providers.length - 1; i++) {
        const current = result.providers[i].name.toLowerCase();
        const next = result.providers[i + 1].name.toLowerCase();
        expect(current.localeCompare(next)).toBeLessThanOrEqual(0);
      }
    });
  });

  describe("pagination", () => {
    it("should return correct page info", () => {
      const result = searchProviders({}, "trust", 1, 5);
      expect(result.page).toBe(1);
      expect(result.pageSize).toBe(5);
      expect(result.providers.length).toBeLessThanOrEqual(5);
    });

    it("should calculate hasMore correctly", () => {
      const result1 = searchProviders({}, "trust", 1, 100);
      expect(result1.hasMore).toBe(false); // Should have all results

      const result2 = searchProviders({}, "trust", 1, 2);
      if (result2.total > 2) {
        expect(result2.hasMore).toBe(true);
      }
    });

    it("should return correct total regardless of pagination", () => {
      const fullResult = searchProviders({});
      const paginatedResult = searchProviders({}, "trust", 1, 5);
      expect(paginatedResult.total).toBe(fullResult.total);
    });
  });

  describe("empty and edge cases", () => {
    it("should return empty array for non-matching query", () => {
      const result = searchProviders({ query: "xyznonexistent12345" });
      expect(result.providers.length).toBe(0);
      expect(result.total).toBe(0);
    });

    it("should handle empty filters object", () => {
      const result = searchProviders({});
      expect(result.providers.length).toBeGreaterThan(0);
    });

    it("should handle undefined sort gracefully", () => {
      const result = searchProviders({}, undefined as any);
      expect(Array.isArray(result.providers)).toBe(true);
    });
  });
});

describe("Search Results Structure", () => {
  it("should return providers with required fields for SSR rendering", () => {
    const result = searchProviders({});
    result.providers.forEach((p) => {
      // Required fields for ProviderCard
      expect(p.id).toBeDefined();
      expect(p.name).toBeDefined();
      expect(p.categoryId).toBeDefined();
      expect(p.location).toBeDefined();
      expect(p.location.city).toBeDefined();
      expect(p.location.state).toBeDefined();
      expect(p.trustBadges).toBeDefined();
      expect(Array.isArray(p.trustBadges)).toBe(true);
    });
  });

  it("should return total count for display", () => {
    const result = searchProviders({});
    expect(typeof result.total).toBe("number");
    expect(result.total).toBeGreaterThanOrEqual(0);
  });
});
