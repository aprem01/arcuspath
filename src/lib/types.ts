export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  subcategories: string[];
  providerCount: number;
}

export interface TrustBadge {
  id: "verified" | "affirming" | "owned" | "trained";
  name: string;
  description: string;
}

export interface Provider {
  id: string;
  name: string;
  businessName?: string;
  categoryId: string;
  subcategory: string;
  description: string;
  shortBio: string;
  location: {
    city: string;
    state: string;
    virtual: boolean;
  };
  trustBadges: TrustBadge["id"][];
  specialties: string[];
  languages: string[];
  pronouns?: string;
  yearEstablished: number;
  website?: string;
  phone?: string;
  email?: string;
  image?: string;
  rating?: number;
  reviewCount?: number;
}

export interface SearchFilters {
  query?: string;
  category?: string;
  subcategory?: string;
  location?: string;
  virtual?: boolean;
  badges?: TrustBadge["id"][];
}

export interface SearchResult {
  providers: Provider[];
  total: number;
  filters: SearchFilters;
}
