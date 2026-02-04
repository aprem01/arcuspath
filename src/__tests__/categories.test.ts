/**
 * Categories and Trust Data Tests
 * Tests for category data, trust badges, verification levels, and inclusive tags
 */

import {
  categories,
  getCategoryById,
  trustBadges,
  inclusiveTags,
  verificationLevels,
  reportReasons,
  getInclusiveTagById,
  getVerificationInfo,
} from "@/data/categories";

describe("Categories", () => {
  describe("categories array", () => {
    it("should have categories", () => {
      expect(categories.length).toBeGreaterThan(0);
    });

    it("should have valid category structure", () => {
      categories.forEach((category) => {
        expect(category).toHaveProperty("id");
        expect(category).toHaveProperty("name");
        expect(category).toHaveProperty("icon");
        expect(category).toHaveProperty("description");
        expect(category).toHaveProperty("subcategories");
      });
    });

    it("should have unique IDs", () => {
      const ids = categories.map((c) => c.id);
      const uniqueIds = new Set(ids);
      expect(ids.length).toBe(uniqueIds.size);
    });

    it("should include expected categories", () => {
      const ids = categories.map((c) => c.id);
      expect(ids).toContain("healthcare");
      expect(ids).toContain("legal");
      expect(ids).toContain("financial");
      expect(ids).toContain("career");
      expect(ids).toContain("lifestyle");
    });

    it("should have subcategories", () => {
      categories.forEach((category) => {
        expect(Array.isArray(category.subcategories)).toBe(true);
        expect(category.subcategories.length).toBeGreaterThan(0);
      });
    });
  });

  describe("getCategoryById", () => {
    it("should return category when found", () => {
      const category = getCategoryById("healthcare");
      expect(category).toBeDefined();
      expect(category?.id).toBe("healthcare");
    });

    it("should return undefined for non-existent ID", () => {
      const category = getCategoryById("nonexistent");
      expect(category).toBeUndefined();
    });
  });
});

describe("Trust Badges", () => {
  describe("trustBadges array", () => {
    it("should have trust badges", () => {
      expect(trustBadges.length).toBeGreaterThan(0);
    });

    it("should have valid badge structure", () => {
      trustBadges.forEach((badge) => {
        expect(badge).toHaveProperty("id");
        expect(badge).toHaveProperty("name");
        expect(badge).toHaveProperty("description");
      });
    });

    it("should include expected badges", () => {
      const ids = trustBadges.map((b) => b.id);
      expect(ids).toContain("verified");
      expect(ids).toContain("affirming");
    });
  });
});

describe("Inclusive Tags", () => {
  describe("inclusiveTags array", () => {
    it("should have inclusive tags", () => {
      expect(inclusiveTags.length).toBeGreaterThan(0);
    });

    it("should have valid tag structure", () => {
      inclusiveTags.forEach((tag) => {
        expect(tag).toHaveProperty("id");
        expect(tag).toHaveProperty("name");
        expect(tag).toHaveProperty("description");
        expect(tag).toHaveProperty("category");
      });
    });

    it("should have valid categories", () => {
      const validCategories = ["identity", "health", "accessibility", "financial"];
      inclusiveTags.forEach((tag) => {
        expect(validCategories).toContain(tag.category);
      });
    });

    it("should include trans-affirming tag", () => {
      const transTag = inclusiveTags.find((t) => t.id === "trans-affirming");
      expect(transTag).toBeDefined();
    });
  });

  describe("getInclusiveTagById", () => {
    it("should return tag when found", () => {
      const tag = getInclusiveTagById("trans-affirming");
      expect(tag).toBeDefined();
      expect(tag?.id).toBe("trans-affirming");
    });

    it("should return undefined for non-existent ID", () => {
      const tag = getInclusiveTagById("nonexistent-tag" as any);
      expect(tag).toBeUndefined();
    });
  });
});

describe("Verification Levels", () => {
  describe("verificationLevels array", () => {
    it("should have verification levels", () => {
      expect(verificationLevels.length).toBeGreaterThan(0);
    });

    it("should have valid structure", () => {
      verificationLevels.forEach((level) => {
        expect(level).toHaveProperty("level");
        expect(level).toHaveProperty("name");
        expect(level).toHaveProperty("description");
        expect(level).toHaveProperty("trustScore");
      });
    });

    it("should have trust scores in valid range", () => {
      verificationLevels.forEach((level) => {
        expect(level.trustScore).toBeGreaterThanOrEqual(0);
        expect(level.trustScore).toBeLessThanOrEqual(4);
      });
    });

    it("should include expected levels", () => {
      const levels = verificationLevels.map((v) => v.level);
      expect(levels).toContain("none");
      expect(levels).toContain("self");
      expect(levels).toContain("credential");
      expect(levels).toContain("community");
      expect(levels).toContain("arcus_verified");
    });

    it("should have ascending trust scores", () => {
      // arcus_verified should have highest trust score
      const arcusLevel = verificationLevels.find(
        (v) => v.level === "arcus_verified"
      );
      const noneLevel = verificationLevels.find((v) => v.level === "none");

      expect(arcusLevel?.trustScore).toBeGreaterThan(noneLevel?.trustScore || 0);
    });
  });

  describe("getVerificationInfo", () => {
    it("should return info for valid levels", () => {
      const info = getVerificationInfo("arcus_verified");
      expect(info).toBeDefined();
      expect(info?.level).toBe("arcus_verified");
    });

    it("should return undefined for invalid level", () => {
      const info = getVerificationInfo("invalid" as any);
      expect(info).toBeUndefined();
    });
  });
});

describe("Report Reasons", () => {
  describe("reportReasons array", () => {
    it("should have report reasons", () => {
      expect(reportReasons.length).toBeGreaterThan(0);
    });

    it("should have valid structure", () => {
      reportReasons.forEach((reason) => {
        expect(reason).toHaveProperty("id");
        expect(reason).toHaveProperty("label");
        expect(reason).toHaveProperty("description");
      });
    });

    it("should include expected reasons", () => {
      const ids = reportReasons.map((r) => r.id);
      expect(ids).toContain("discrimination");
      expect(ids).toContain("harassment");
      expect(ids).toContain("misrepresentation");
      expect(ids).toContain("other");
    });
  });
});
