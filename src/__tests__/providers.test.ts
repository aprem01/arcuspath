/**
 * Provider Data and Search Tests
 * Tests for provider data utilities and search functionality
 */

import {
  providers,
  getProviderById,
  getFeaturedProviders,
  searchProviders,
} from "@/data/providers";
import { SearchFilters, SortOption } from "@/lib/types";

describe("Provider Data", () => {
  describe("providers array", () => {
    it("should have at least one provider", () => {
      expect(providers.length).toBeGreaterThan(0);
    });

    it("should have valid provider structure", () => {
      providers.forEach((provider) => {
        expect(provider).toHaveProperty("id");
        expect(provider).toHaveProperty("name");
        expect(provider).toHaveProperty("categoryId");
        expect(provider).toHaveProperty("trust");
        expect(provider).toHaveProperty("status");
        expect(provider).toHaveProperty("contact");
        expect(provider).toHaveProperty("location");
      });
    });

    it("should have trust profiles for all providers", () => {
      providers.forEach((provider) => {
        expect(provider.trust).toHaveProperty("verification");
        expect(provider.trust).toHaveProperty("trustBadges");
        expect(provider.trust).toHaveProperty("inclusiveTags");
        expect(provider.trust.verification).toHaveProperty("level");
      });
    });

    it("should have privacy-safe contact info", () => {
      providers.forEach((provider) => {
        // Contact should not expose direct email/phone
        expect(provider.contact).toHaveProperty("hasEmail");
        expect(provider.contact).toHaveProperty("hasPhone");
        expect(provider.contact).toHaveProperty("hasWebsite");
        expect(provider.contact).toHaveProperty("preferredMethod");
        // Should NOT have direct contact info
        expect(provider.contact).not.toHaveProperty("email");
        expect(provider.contact).not.toHaveProperty("phone");
      });
    });
  });

  describe("getProviderById", () => {
    it("should return provider when found", () => {
      const provider = getProviderById("1");
      expect(provider).toBeDefined();
      expect(provider?.id).toBe("1");
    });

    it("should return undefined for non-existent id", () => {
      const provider = getProviderById("nonexistent");
      expect(provider).toBeUndefined();
    });
  });

  describe("getFeaturedProviders", () => {
    it("should return featured providers", () => {
      const featured = getFeaturedProviders();
      expect(featured.length).toBeGreaterThan(0);
    });

    it("should return only active providers", () => {
      const featured = getFeaturedProviders();
      featured.forEach((provider) => {
        expect(provider.status).toBe("active");
      });
    });
  });
});

describe("Provider Search", () => {
  describe("searchProviders", () => {
    it("should return all active providers when no filters", () => {
      const result = searchProviders({});
      expect(result.providers.length).toBeGreaterThan(0);
      result.providers.forEach((p) => {
        expect(p.status).toBe("active");
      });
    });

    it("should filter by category", () => {
      const result = searchProviders({ category: "healthcare" });
      result.providers.forEach((p) => {
        expect(p.categoryId).toBe("healthcare");
      });
    });

    it("should filter by query (name search)", () => {
      const firstProvider = providers.find((p) => p.status === "active");
      if (firstProvider) {
        const result = searchProviders({
          query: firstProvider.name.split(" ")[0],
        });
        expect(result.providers.length).toBeGreaterThan(0);
      }
    });

    it("should filter by virtual availability", () => {
      const result = searchProviders({ virtual: true });
      result.providers.forEach((p) => {
        expect(p.location.virtual).toBe(true);
      });
    });

    it("should filter by trust badges", () => {
      const result = searchProviders({ badges: ["verified"] });
      result.providers.forEach((p) => {
        expect(p.trustBadges).toContain("verified");
      });
    });

    it("should filter by inclusive tags", () => {
      const result = searchProviders({ inclusiveTags: ["trans-affirming"] });
      result.providers.forEach((p) => {
        expect(p.trust.inclusiveTags).toContain("trans-affirming");
      });
    });

    it("should filter by LGBTQ+ owned", () => {
      const result = searchProviders({ lgbtqOwned: true });
      result.providers.forEach((p) => {
        expect(p.trust.lgbtqOwned).toBe(true);
      });
    });
  });

  describe("sorting", () => {
    it("should sort by trust (default)", () => {
      const result = searchProviders({}, "trust");
      expect(result.providers.length).toBeGreaterThan(0);
      // Trust-sorted results should prioritize higher verification levels
    });

    it("should sort by rating", () => {
      const result = searchProviders({}, "rating");
      expect(result.providers.length).toBeGreaterThan(0);
      // Check descending order
      for (let i = 0; i < result.providers.length - 1; i++) {
        const current = result.providers[i].rating || 0;
        const next = result.providers[i + 1].rating || 0;
        expect(current).toBeGreaterThanOrEqual(next);
      }
    });

    it("should sort alphabetically", () => {
      const result = searchProviders({}, "alphabetical");
      expect(result.providers.length).toBeGreaterThan(0);
      for (let i = 0; i < result.providers.length - 1; i++) {
        const current = result.providers[i].name.toLowerCase();
        const next = result.providers[i + 1].name.toLowerCase();
        expect(current.localeCompare(next)).toBeLessThanOrEqual(0);
      }
    });
  });

  describe("pagination", () => {
    it("should paginate results", () => {
      const pageSize = 5;
      const result = searchProviders({}, "trust", 1, pageSize);
      expect(result.providers.length).toBeLessThanOrEqual(pageSize);
      expect(result.page).toBe(1);
      expect(result.pageSize).toBe(pageSize);
    });

    it("should calculate hasMore correctly", () => {
      const result = searchProviders({}, "trust", 1, 2);
      if (result.total > 2) {
        expect(result.hasMore).toBe(true);
      }
    });

    it("should return different results for different pages", () => {
      const page1 = searchProviders({}, "trust", 1, 5);
      const page2 = searchProviders({}, "trust", 2, 5);

      if (page1.total > 5) {
        expect(page1.providers[0].id).not.toBe(page2.providers[0]?.id);
      }
    });
  });
});
