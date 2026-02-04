// =============================================================================
// ARCUSPATH TYPE DEFINITIONS
// Trust-first, privacy-first type system for LGBTQIA+ services marketplace
// =============================================================================

// -----------------------------------------------------------------------------
// CORE ENUMS & CONSTANTS
// -----------------------------------------------------------------------------

/** Verification levels - ordered by trust strength */
export type VerificationLevel =
  | "none"           // Not verified
  | "self"           // Self-reported, unverified
  | "credential"     // Credentials checked (license, certification)
  | "community"      // Community vouched/reviewed
  | "arcus_verified" // Full ArcusPath verification process

/** Inclusive care tags - specific affirming capabilities */
export type InclusiveTag =
  | "trans-affirming"
  | "nonbinary-affirming"
  | "hiv-informed"
  | "prep-provider"
  | "gender-affirming-care"
  | "lgbtq-families"
  | "elder-lgbtq"
  | "youth-lgbtq"
  | "bipoc-affirming"
  | "disability-affirming"
  | "neurodivergent-affirming"
  | "trauma-informed"
  | "sliding-scale"
  | "accepts-insurance"

/** Trust badge types */
export type TrustBadgeId = "verified" | "affirming" | "owned" | "trained";

/** Report status for moderation */
export type ReportStatus = "pending" | "reviewing" | "resolved" | "dismissed";

/** Report reasons */
export type ReportReason =
  | "discrimination"
  | "unsafe-practices"
  | "false-credentials"
  | "harassment"
  | "privacy-violation"
  | "misrepresentation"
  | "other"

/** Provider status */
export type ProviderStatus = "active" | "pending" | "suspended" | "removed";

/** Contact method types */
export type ContactMethod = "email" | "phone" | "website" | "relay";

// -----------------------------------------------------------------------------
// CATEGORY & TRUST BADGE TYPES
// -----------------------------------------------------------------------------

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  subcategories: string[];
  providerCount: number;
}

export interface TrustBadge {
  id: TrustBadgeId;
  name: string;
  description: string;
  icon?: string;
}

export interface InclusiveTagInfo {
  id: InclusiveTag;
  name: string;
  description: string;
  category: "identity" | "health" | "accessibility" | "financial";
}

// -----------------------------------------------------------------------------
// VERIFICATION & TRUST TYPES
// -----------------------------------------------------------------------------

export interface VerificationRecord {
  level: VerificationLevel;
  verifiedAt: string | null;        // ISO date
  expiresAt: string | null;         // ISO date - when reverification needed
  verifiedBy: string | null;        // "arcuspath" | "community" | null
  method: string | null;            // How verification was performed
  notes?: string;                   // Internal notes (not shown to users)
}

export interface TrustProfile {
  verification: VerificationRecord;
  trustBadges: TrustBadgeId[];
  inclusiveTags: InclusiveTag[];
  lgbtqOwned: boolean;
  affirmationStatement?: string;    // Provider's own statement of commitment
  communityEndorsements: number;    // Number of community vouches
  reportCount: number;              // Number of unresolved reports (internal)
}

// -----------------------------------------------------------------------------
// PROVIDER TYPES
// -----------------------------------------------------------------------------

export interface ProviderLocation {
  city: string;
  state: string;
  zipCode?: string;
  virtual: boolean;
  serviceArea?: string[];           // List of areas served
}

export interface ProviderContact {
  /** Contact is NEVER exposed directly - always use relay */
  hasEmail: boolean;
  hasPhone: boolean;
  hasWebsite: boolean;
  preferredMethod: ContactMethod;
  responseTime?: string;            // "Within 24 hours", "1-2 business days"
}

export interface Provider {
  id: string;
  name: string;
  businessName?: string;
  categoryId: string;
  subcategory: string;
  description: string;
  shortBio: string;
  location: ProviderLocation;
  contact: ProviderContact;

  // Trust & Safety
  trust: TrustProfile;
  status: ProviderStatus;

  // Professional info
  specialties: string[];
  languages: string[];
  pronouns?: string;
  yearEstablished: number;

  // Legacy badge support (derived from trust.trustBadges)
  trustBadges: TrustBadgeId[];

  // Ratings (community-driven)
  rating?: number;
  reviewCount?: number;

  // Internal
  createdAt: string;
  updatedAt: string;
}

// -----------------------------------------------------------------------------
// SEARCH & DISCOVERY TYPES
// -----------------------------------------------------------------------------

export interface SearchFilters {
  query?: string;
  category?: string;
  subcategory?: string;
  location?: string;
  virtual?: boolean;
  badges?: TrustBadgeId[];
  inclusiveTags?: InclusiveTag[];
  verificationLevel?: VerificationLevel;
  lgbtqOwned?: boolean;
}

export type SortOption =
  | "relevance"
  | "trust"           // Highest verification first
  | "rating"          // Highest rated first
  | "newest"          // Most recently added
  | "alphabetical"

export interface SearchResult {
  providers: Provider[];
  total: number;
  filters: SearchFilters;
  sort: SortOption;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// -----------------------------------------------------------------------------
// SAFETY & MODERATION TYPES
// -----------------------------------------------------------------------------

export interface Report {
  id: string;
  providerId: string;
  reason: ReportReason;
  description: string;
  status: ReportStatus;

  // Reporter info (anonymized)
  reporterSessionId: string;        // Anonymous session identifier

  // Timestamps
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;

  // Moderation
  moderatorNotes?: string;
  resolution?: string;
}

export interface ModerationAction {
  id: string;
  providerId: string;
  reportId?: string;
  action: "warning" | "suspend" | "remove" | "reinstate";
  reason: string;
  performedBy: string;
  performedAt: string;
}

// -----------------------------------------------------------------------------
// PRIVACY-SAFE CONTACT TYPES
// -----------------------------------------------------------------------------

export interface ContactRequest {
  id: string;
  providerId: string;

  // Anonymized requester info
  sessionId: string;

  // Message content (not stored long-term)
  subject: string;
  message: string;
  preferredContactMethod?: ContactMethod;

  // Status
  status: "pending" | "sent" | "responded" | "expired";
  createdAt: string;
  expiresAt: string;                // Auto-delete after expiry
}

// -----------------------------------------------------------------------------
// ARCUSPATH 360 EDUCATION TYPES
// -----------------------------------------------------------------------------

export interface EducationTopic {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: "healthcare" | "legal" | "financial" | "career" | "lifestyle" | "general";

  // Content
  content: string;                  // Markdown content
  checklist?: ChecklistItem[];

  // Related
  relatedTopics: string[];
  relatedCategories: string[];

  // Meta
  readTime: number;                 // Minutes
  lastUpdated: string;
}

export interface ChecklistItem {
  id: string;
  text: string;
  description?: string;
  resources?: { label: string; url: string }[];
}

// -----------------------------------------------------------------------------
// AI INTEGRATION TYPES (OPTIONAL LAYER)
// -----------------------------------------------------------------------------

export interface AIConfig {
  enabled: boolean;
  features: {
    naturalLanguageSearch: boolean;
    trustExplanations: boolean;
    checklistGenerator: boolean;
  };
}

export interface AISearchQuery {
  naturalLanguage: string;
  /** AI converts to structured filters - no PII should be sent */
  sanitized: boolean;
}

export interface AISearchResult {
  filters: SearchFilters;
  explanation?: string;
  confidence: number;
}

// -----------------------------------------------------------------------------
// UTILITY TYPES
// -----------------------------------------------------------------------------

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export interface PaginationParams {
  page: number;
  pageSize: number;
}

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}
