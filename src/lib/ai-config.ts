// =============================================================================
// AI CONFIGURATION
// Optional AI layer that gracefully degrades when unavailable
// =============================================================================

import { AIConfig } from "@/lib/types";

/**
 * AI Feature Configuration
 * Set enabled: false to completely disable AI features
 * Individual features can be toggled independently
 */
export const aiConfig: AIConfig = {
  enabled: false, // Set to true when AI backend is available
  features: {
    naturalLanguageSearch: false,
    trustExplanations: false,
    checklistGenerator: false,
  },
};

/**
 * Check if a specific AI feature is available
 */
export function isAIFeatureEnabled(
  feature: keyof AIConfig["features"]
): boolean {
  return aiConfig.enabled && aiConfig.features[feature];
}

/**
 * Check if any AI features are enabled
 */
export function isAIEnabled(): boolean {
  return aiConfig.enabled;
}

/**
 * Natural language query patterns to detect intent
 * Used for fallback when AI is not available
 */
export const queryPatterns = {
  healthcare: [
    "doctor",
    "therapist",
    "counselor",
    "mental health",
    "medical",
    "health",
    "dentist",
    "healthcare",
    "therapy",
    "psychiatrist",
    "psychologist",
  ],
  legal: [
    "lawyer",
    "attorney",
    "legal",
    "law",
    "immigration",
    "name change",
    "gender marker",
    "divorce",
    "custody",
  ],
  financial: [
    "financial",
    "money",
    "accountant",
    "tax",
    "insurance",
    "investment",
    "advisor",
    "planner",
  ],
  career: [
    "job",
    "career",
    "resume",
    "interview",
    "work",
    "employment",
    "coach",
    "mentor",
  ],
  lifestyle: [
    "wedding",
    "realtor",
    "housing",
    "fitness",
    "travel",
    "personal",
  ],
};

export const specialtyPatterns = {
  "trans-affirming": ["trans", "transgender", "transition", "gender affirming"],
  "hiv-informed": ["hiv", "aids", "prep"],
  "prep-provider": ["prep", "hiv prevention"],
  "gender-affirming-care": ["hormones", "hrt", "gender affirming", "transition"],
  "lgbtq-families": ["family", "adoption", "parenting", "children", "kids"],
  "elder-lgbtq": ["senior", "elder", "aging", "older"],
  "youth-lgbtq": ["youth", "teen", "young", "adolescent"],
};

/**
 * Simple rule-based query parser for fallback
 * Used when AI is not available
 */
export function parseNaturalLanguageQuery(query: string): {
  category?: string;
  tags?: string[];
  location?: string;
  virtual?: boolean;
} {
  const normalizedQuery = query.toLowerCase();
  const result: {
    category?: string;
    tags?: string[];
    location?: string;
    virtual?: boolean;
  } = {};

  // Detect category
  for (const [category, patterns] of Object.entries(queryPatterns)) {
    if (patterns.some((pattern) => normalizedQuery.includes(pattern))) {
      result.category = category;
      break;
    }
  }

  // Detect specialty tags
  const detectedTags: string[] = [];
  for (const [tag, patterns] of Object.entries(specialtyPatterns)) {
    if (patterns.some((pattern) => normalizedQuery.includes(pattern))) {
      detectedTags.push(tag);
    }
  }
  if (detectedTags.length > 0) {
    result.tags = detectedTags;
  }

  // Detect virtual preference
  if (
    normalizedQuery.includes("virtual") ||
    normalizedQuery.includes("online") ||
    normalizedQuery.includes("remote") ||
    normalizedQuery.includes("telehealth")
  ) {
    result.virtual = true;
  }

  return result;
}
