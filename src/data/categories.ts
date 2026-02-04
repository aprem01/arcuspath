import {
  Category,
  TrustBadge,
  InclusiveTagInfo,
  VerificationLevel,
  ReportReason,
} from "@/lib/types";

// =============================================================================
// SERVICE CATEGORIES
// =============================================================================

export const categories: Category[] = [
  {
    id: "healthcare",
    name: "Healthcare",
    icon: "Heart",
    description: "Find affirming healthcare providers who understand your needs",
    subcategories: [
      "Therapy & Counseling",
      "Primary Care",
      "Gender-Affirming Care",
      "Mental Health",
      "Psychiatry",
      "Dental",
      "Dermatology",
      "HIV/STI Care",
      "Fertility & Family Planning",
    ],
    providerCount: 127,
  },
  {
    id: "legal",
    name: "Legal",
    icon: "Scale",
    description: "Legal professionals experienced with LGBTQIA+ matters",
    subcategories: [
      "Family Law",
      "Name & Gender Changes",
      "Immigration",
      "Employment Law",
      "Estate Planning",
      "Civil Rights",
      "Discrimination Cases",
    ],
    providerCount: 64,
  },
  {
    id: "financial",
    name: "Financial",
    icon: "Banknote",
    description: "Financial services that understand your unique needs",
    subcategories: [
      "Financial Planning",
      "Tax Services",
      "Insurance",
      "Banking",
      "Real Estate",
      "Retirement Planning",
      "Student Loan Assistance",
    ],
    providerCount: 89,
  },
  {
    id: "career",
    name: "Career",
    icon: "Briefcase",
    description: "Career support from professionals who get it",
    subcategories: [
      "Career Coaching",
      "Resume Services",
      "LGBTQIA+ Recruiting",
      "DEI Consulting",
      "Executive Coaching",
      "Interview Preparation",
    ],
    providerCount: 43,
  },
  {
    id: "lifestyle",
    name: "Lifestyle",
    icon: "Sparkles",
    description: "Life services in welcoming, affirming spaces",
    subcategories: [
      "Wedding & Events",
      "Travel",
      "Fitness & Wellness",
      "Beauty & Grooming",
      "Photography",
      "Personal Styling",
      "Pet Services",
    ],
    providerCount: 156,
  },
];

// =============================================================================
// TRUST BADGES
// =============================================================================

export const trustBadges: TrustBadge[] = [
  {
    id: "verified",
    name: "Verified Provider",
    description: "Identity and credentials verified through ArcusPath's multi-step process",
    icon: "ShieldCheck",
  },
  {
    id: "affirming",
    name: "LGBTQIA+ Affirming",
    description: "Demonstrated commitment to affirming, inclusive care through training or community feedback",
    icon: "Heart",
  },
  {
    id: "owned",
    name: "LGBTQIA+ Owned",
    description: "Business is owned by an LGBTQIA+ community member",
    icon: "Star",
  },
  {
    id: "trained",
    name: "Competency Trained",
    description: "Completed recognized LGBTQIA+ cultural competency training program",
    icon: "GraduationCap",
  },
];

// =============================================================================
// INCLUSIVE CARE TAGS
// =============================================================================

export const inclusiveTags: InclusiveTagInfo[] = [
  // Identity-focused
  {
    id: "trans-affirming",
    name: "Trans Affirming",
    description: "Specifically trained and experienced in providing affirming care for transgender individuals",
    category: "identity",
  },
  {
    id: "nonbinary-affirming",
    name: "Nonbinary Affirming",
    description: "Understands and respects nonbinary identities, uses appropriate language and practices",
    category: "identity",
  },
  {
    id: "lgbtq-families",
    name: "LGBTQ+ Families",
    description: "Experience with diverse family structures including same-sex parents, chosen families, and more",
    category: "identity",
  },
  {
    id: "elder-lgbtq",
    name: "Elder LGBTQ+ Friendly",
    description: "Understands unique needs of older LGBTQIA+ individuals, including generational experiences",
    category: "identity",
  },
  {
    id: "youth-lgbtq",
    name: "Youth LGBTQ+ Friendly",
    description: "Safe and affirming services for LGBTQIA+ youth and their families",
    category: "identity",
  },
  {
    id: "bipoc-affirming",
    name: "BIPOC Affirming",
    description: "Culturally competent care that acknowledges intersectionality of race and LGBTQIA+ identity",
    category: "identity",
  },

  // Health-focused
  {
    id: "hiv-informed",
    name: "HIV Informed",
    description: "Knowledgeable about HIV care, prevention, and destigmatized support",
    category: "health",
  },
  {
    id: "prep-provider",
    name: "PrEP Provider",
    description: "Provides or supports access to PrEP (Pre-Exposure Prophylaxis) services",
    category: "health",
  },
  {
    id: "gender-affirming-care",
    name: "Gender-Affirming Care",
    description: "Offers hormone therapy, surgical referrals, or other gender-affirming medical care",
    category: "health",
  },
  {
    id: "trauma-informed",
    name: "Trauma-Informed",
    description: "Uses trauma-informed approaches, understanding LGBTQIA+ specific traumas",
    category: "health",
  },

  // Accessibility-focused
  {
    id: "disability-affirming",
    name: "Disability Affirming",
    description: "Accessible services for people with physical, sensory, or cognitive disabilities",
    category: "accessibility",
  },
  {
    id: "neurodivergent-affirming",
    name: "Neurodivergent Affirming",
    description: "Understanding and accommodating of autism, ADHD, and other neurodivergent conditions",
    category: "accessibility",
  },

  // Financial-focused
  {
    id: "sliding-scale",
    name: "Sliding Scale",
    description: "Offers sliding scale fees based on income",
    category: "financial",
  },
  {
    id: "accepts-insurance",
    name: "Accepts Insurance",
    description: "Accepts major insurance plans",
    category: "financial",
  },
];

// =============================================================================
// VERIFICATION LEVELS (Display info)
// =============================================================================

export const verificationLevels: {
  level: VerificationLevel;
  name: string;
  description: string;
  trustScore: number;
}[] = [
  {
    level: "none",
    name: "Not Verified",
    description: "This provider has not yet completed verification",
    trustScore: 0,
  },
  {
    level: "self",
    name: "Self-Reported",
    description: "Information provided by the provider, not independently verified",
    trustScore: 1,
  },
  {
    level: "credential",
    name: "Credentials Verified",
    description: "Professional licenses and credentials have been independently verified",
    trustScore: 2,
  },
  {
    level: "community",
    name: "Community Verified",
    description: "Verified through community reviews and endorsements",
    trustScore: 3,
  },
  {
    level: "arcus_verified",
    name: "ArcusPath Verified",
    description: "Completed full ArcusPath verification including credentials, references, and affirming care assessment",
    trustScore: 4,
  },
];

// =============================================================================
// REPORT REASONS
// =============================================================================

export const reportReasons: {
  id: ReportReason;
  label: string;
  description: string;
  severity: "low" | "medium" | "high" | "critical";
}[] = [
  {
    id: "discrimination",
    label: "Discrimination",
    description: "Provider discriminated against me based on my identity",
    severity: "critical",
  },
  {
    id: "unsafe-practices",
    label: "Unsafe Practices",
    description: "Provider engaged in practices that put my health or safety at risk",
    severity: "critical",
  },
  {
    id: "false-credentials",
    label: "False Credentials",
    description: "Provider's credentials or qualifications appear to be misrepresented",
    severity: "high",
  },
  {
    id: "harassment",
    label: "Harassment",
    description: "Provider engaged in harassment or inappropriate behavior",
    severity: "critical",
  },
  {
    id: "privacy-violation",
    label: "Privacy Violation",
    description: "Provider disclosed my information without consent or violated confidentiality",
    severity: "high",
  },
  {
    id: "misrepresentation",
    label: "Misrepresentation",
    description: "Provider's services or identity are significantly different than advertised",
    severity: "medium",
  },
  {
    id: "other",
    label: "Other Concern",
    description: "Another issue not covered above",
    severity: "low",
  },
];

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

export function getCategoryById(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}

export function getTrustBadgeById(id: string): TrustBadge | undefined {
  return trustBadges.find((b) => b.id === id);
}

export function getInclusiveTagById(id: string): InclusiveTagInfo | undefined {
  return inclusiveTags.find((t) => t.id === id);
}

export function getInclusiveTagsByCategory(
  category: InclusiveTagInfo["category"]
): InclusiveTagInfo[] {
  return inclusiveTags.filter((t) => t.category === category);
}

export function getVerificationInfo(level: VerificationLevel) {
  return verificationLevels.find((v) => v.level === level);
}
