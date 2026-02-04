/**
 * AI Configuration Tests
 * Tests for AI feature configuration and natural language parsing
 */

import {
  aiConfig,
  isAIEnabled,
  isAIFeatureEnabled,
  parseNaturalLanguageQuery,
  queryPatterns,
  specialtyPatterns,
} from "@/lib/ai-config";

describe("AI Configuration", () => {
  describe("aiConfig", () => {
    it("should have valid structure", () => {
      expect(aiConfig).toHaveProperty("enabled");
      expect(aiConfig).toHaveProperty("features");
      expect(typeof aiConfig.enabled).toBe("boolean");
    });

    it("should have feature toggles", () => {
      expect(aiConfig.features).toHaveProperty("naturalLanguageSearch");
      expect(aiConfig.features).toHaveProperty("trustExplanations");
      expect(aiConfig.features).toHaveProperty("checklistGenerator");
    });
  });

  describe("isAIEnabled", () => {
    it("should return boolean", () => {
      const result = isAIEnabled();
      expect(typeof result).toBe("boolean");
    });
  });

  describe("isAIFeatureEnabled", () => {
    it("should return boolean for valid features", () => {
      const features: Array<keyof typeof aiConfig.features> = [
        "naturalLanguageSearch",
        "trustExplanations",
        "checklistGenerator",
      ];

      features.forEach((feature) => {
        const result = isAIFeatureEnabled(feature);
        expect(typeof result).toBe("boolean");
      });
    });

    it("should respect global AI enabled flag", () => {
      // When AI is disabled globally, features should be disabled
      if (!aiConfig.enabled) {
        expect(isAIFeatureEnabled("naturalLanguageSearch")).toBe(false);
        expect(isAIFeatureEnabled("trustExplanations")).toBe(false);
        expect(isAIFeatureEnabled("checklistGenerator")).toBe(false);
      }
    });
  });
});

describe("Query Patterns", () => {
  describe("queryPatterns", () => {
    it("should have patterns for main categories", () => {
      expect(queryPatterns).toHaveProperty("healthcare");
      expect(queryPatterns).toHaveProperty("legal");
      expect(queryPatterns).toHaveProperty("financial");
      expect(queryPatterns).toHaveProperty("career");
    });

    it("should have non-empty pattern arrays", () => {
      Object.values(queryPatterns).forEach((patterns) => {
        expect(Array.isArray(patterns)).toBe(true);
        expect(patterns.length).toBeGreaterThan(0);
      });
    });
  });

  describe("specialtyPatterns", () => {
    it("should have patterns for inclusive tags", () => {
      expect(specialtyPatterns).toHaveProperty("trans-affirming");
      expect(specialtyPatterns).toHaveProperty("hiv-informed");
      expect(specialtyPatterns).toHaveProperty("gender-affirming-care");
    });
  });
});

describe("Natural Language Query Parser", () => {
  describe("parseNaturalLanguageQuery", () => {
    it("should return object with optional fields", () => {
      const result = parseNaturalLanguageQuery("test query");
      expect(typeof result).toBe("object");
    });

    it("should detect healthcare queries", () => {
      const queries = [
        "I need a therapist",
        "looking for a doctor",
        "mental health support",
        "find a counselor",
      ];

      queries.forEach((query) => {
        const result = parseNaturalLanguageQuery(query);
        expect(result.category).toBe("healthcare");
      });
    });

    it("should detect legal queries", () => {
      const queries = [
        "I need a lawyer",
        "looking for an attorney",
        "name change help",
        "immigration lawyer",
      ];

      queries.forEach((query) => {
        const result = parseNaturalLanguageQuery(query);
        expect(result.category).toBe("legal");
      });
    });

    it("should detect financial queries", () => {
      const queries = [
        "financial advisor",
        "tax help",
        "accountant",
        "insurance agent",
      ];

      queries.forEach((query) => {
        const result = parseNaturalLanguageQuery(query);
        expect(result.category).toBe("financial");
      });
    });

    it("should detect career queries", () => {
      const queries = [
        "career coach",
        "job help",
        "resume review",
        "employment coach",
      ];

      queries.forEach((query) => {
        const result = parseNaturalLanguageQuery(query);
        expect(result.category).toBe("career");
      });
    });

    it("should detect trans-affirming specialty", () => {
      const queries = [
        "trans friendly therapist",
        "transgender doctor",
        "transition support",
      ];

      queries.forEach((query) => {
        const result = parseNaturalLanguageQuery(query);
        expect(result.tags).toContain("trans-affirming");
      });
    });

    it("should detect virtual preference", () => {
      const queries = [
        "virtual therapist",
        "online counseling",
        "remote appointment",
        "telehealth doctor",
      ];

      queries.forEach((query) => {
        const result = parseNaturalLanguageQuery(query);
        expect(result.virtual).toBe(true);
      });
    });

    it("should handle complex queries with multiple signals", () => {
      const result = parseNaturalLanguageQuery(
        "I need a trans-affirming therapist who does virtual appointments"
      );

      expect(result.category).toBe("healthcare");
      expect(result.tags).toContain("trans-affirming");
      expect(result.virtual).toBe(true);
    });

    it("should be case insensitive", () => {
      const lower = parseNaturalLanguageQuery("therapist");
      const upper = parseNaturalLanguageQuery("THERAPIST");
      const mixed = parseNaturalLanguageQuery("ThErApIsT");

      expect(lower.category).toBe("healthcare");
      expect(upper.category).toBe("healthcare");
      expect(mixed.category).toBe("healthcare");
    });

    it("should return empty result for unmatched queries", () => {
      const result = parseNaturalLanguageQuery("random unrelated text xyz");
      expect(result.category).toBeUndefined();
      expect(result.tags).toBeUndefined();
      expect(result.virtual).toBeUndefined();
    });
  });
});
