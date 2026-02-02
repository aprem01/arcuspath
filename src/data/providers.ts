import { Provider } from "@/lib/types";

export const providers: Provider[] = [
  // Healthcare Providers
  {
    id: "1",
    name: "Dr. Maya Chen",
    businessName: "Spectrum Therapy & Wellness",
    categoryId: "healthcare",
    subcategory: "Therapy & Counseling",
    description: "Dr. Chen specializes in working with LGBTQIA+ individuals and couples, offering a warm, affirming space for healing and growth. With 12 years of experience, she focuses on identity exploration, relationship dynamics, anxiety, and depression. She uses an integrative approach combining CBT, narrative therapy, and mindfulness practices.",
    shortBio: "Affirming therapist specializing in LGBTQIA+ individuals and couples",
    location: { city: "San Francisco", state: "CA", virtual: true },
    trustBadges: ["verified", "affirming", "owned"],
    specialties: ["LGBTQIA+ Identity", "Couples Therapy", "Anxiety", "Depression", "Gender Identity"],
    languages: ["English", "Mandarin"],
    pronouns: "she/her",
    yearEstablished: 2012,
    website: "https://spectrumtherapy.example.com",
    rating: 4.9,
    reviewCount: 87,
  },
  {
    id: "2",
    name: "Dr. James Rodriguez",
    businessName: "Pride Primary Care",
    categoryId: "healthcare",
    subcategory: "Primary Care",
    description: "Board-certified internal medicine physician providing comprehensive primary care with expertise in LGBTQIA+ health. Services include preventive care, PrEP/PEP, hormone management, and chronic disease management. Committed to creating a judgment-free environment for all patients.",
    shortBio: "Primary care physician with LGBTQIA+ health expertise",
    location: { city: "Austin", state: "TX", virtual: false },
    trustBadges: ["verified", "affirming", "trained"],
    specialties: ["Primary Care", "PrEP/PEP", "Hormone Management", "Preventive Health"],
    languages: ["English", "Spanish"],
    pronouns: "he/him",
    yearEstablished: 2015,
    rating: 4.8,
    reviewCount: 124,
  },
  {
    id: "3",
    name: "Dr. Alex Kim",
    businessName: "True Self Medical",
    categoryId: "healthcare",
    subcategory: "Gender-Affirming Care",
    description: "Providing compassionate, informed gender-affirming care including hormone therapy, health monitoring, and surgical referrals. Dr. Kim works collaboratively with patients to support their transition journey with evidence-based medicine and whole-person care.",
    shortBio: "Gender-affirming care specialist supporting your journey",
    location: { city: "Seattle", state: "WA", virtual: true },
    trustBadges: ["verified", "affirming", "owned", "trained"],
    specialties: ["Gender-Affirming Hormone Therapy", "Transition Support", "Preventive Care"],
    languages: ["English", "Korean"],
    pronouns: "they/them",
    yearEstablished: 2018,
    rating: 5.0,
    reviewCount: 56,
  },
  {
    id: "4",
    name: "Dr. Sarah Thompson",
    businessName: "Mindful Path Psychiatry",
    categoryId: "healthcare",
    subcategory: "Psychiatry",
    description: "Board-certified psychiatrist offering medication management and psychiatric evaluation for LGBTQIA+ adults. Specializes in anxiety, depression, ADHD, and trauma-related conditions. Believes in collaborative care that honors each patient's identity and experiences.",
    shortBio: "Affirming psychiatrist specializing in anxiety and mood disorders",
    location: { city: "Chicago", state: "IL", virtual: true },
    trustBadges: ["verified", "affirming", "trained"],
    specialties: ["Medication Management", "Anxiety", "Depression", "ADHD", "Trauma"],
    languages: ["English"],
    pronouns: "she/her",
    yearEstablished: 2010,
    rating: 4.7,
    reviewCount: 93,
  },

  // Legal Providers
  {
    id: "5",
    name: "Jordan Williams, Esq.",
    businessName: "Rainbow Rights Law",
    categoryId: "legal",
    subcategory: "Family Law",
    description: "Dedicated family law attorney with extensive experience in LGBTQIA+ family matters including adoption, surrogacy, custody arrangements, and marriage. Passionate about helping families of all structures navigate the legal system with dignity and respect.",
    shortBio: "Family law attorney specializing in LGBTQIA+ families",
    location: { city: "New York", state: "NY", virtual: true },
    trustBadges: ["verified", "affirming", "owned"],
    specialties: ["Adoption", "Surrogacy", "Custody", "Marriage", "Divorce"],
    languages: ["English"],
    pronouns: "they/them",
    yearEstablished: 2014,
    rating: 4.9,
    reviewCount: 67,
  },
  {
    id: "6",
    name: "Maria Santos, Esq.",
    businessName: "Identity Legal Services",
    categoryId: "legal",
    subcategory: "Name & Gender Changes",
    description: "Helping transgender and non-binary individuals navigate name and gender marker changes on all documents. Streamlined process with flat-fee pricing. Also assists with updating records across all government agencies and institutions.",
    shortBio: "Specializing in name and gender marker changes",
    location: { city: "Los Angeles", state: "CA", virtual: true },
    trustBadges: ["verified", "affirming", "trained"],
    specialties: ["Name Changes", "Gender Marker Changes", "Document Updates", "Court Petitions"],
    languages: ["English", "Spanish"],
    pronouns: "she/her",
    yearEstablished: 2016,
    rating: 4.9,
    reviewCount: 142,
  },
  {
    id: "7",
    name: "David Park, Esq.",
    businessName: "Park Immigration Law",
    categoryId: "legal",
    subcategory: "Immigration",
    description: "Immigration attorney experienced in LGBTQIA+ asylum cases, family-based immigration for same-sex couples, and visa applications. Understands the unique challenges facing LGBTQIA+ immigrants and provides compassionate, expert legal support.",
    shortBio: "Immigration attorney with LGBTQIA+ asylum expertise",
    location: { city: "San Francisco", state: "CA", virtual: true },
    trustBadges: ["verified", "affirming"],
    specialties: ["Asylum", "Family Immigration", "Visa Applications", "Green Cards"],
    languages: ["English", "Korean"],
    pronouns: "he/him",
    yearEstablished: 2011,
    rating: 4.8,
    reviewCount: 89,
  },

  // Financial Providers
  {
    id: "8",
    name: "Michael Johnson, CFP",
    businessName: "Pride Financial Planning",
    categoryId: "financial",
    subcategory: "Financial Planning",
    description: "Certified Financial Planner helping LGBTQIA+ individuals and couples build wealth, plan for the future, and navigate unique financial considerations. Specializes in retirement planning, investment management, and financial planning for same-sex couples.",
    shortBio: "Financial planner specializing in LGBTQIA+ wealth building",
    location: { city: "Denver", state: "CO", virtual: true },
    trustBadges: ["verified", "affirming", "owned"],
    specialties: ["Retirement Planning", "Investment Management", "Estate Planning", "Tax Strategy"],
    languages: ["English"],
    pronouns: "he/him",
    yearEstablished: 2009,
    rating: 4.8,
    reviewCount: 78,
  },
  {
    id: "9",
    name: "Lisa Chang, CPA",
    businessName: "Inclusive Tax Services",
    categoryId: "financial",
    subcategory: "Tax Services",
    description: "CPA providing tax preparation and planning for LGBTQIA+ individuals, couples, and small businesses. Expert knowledge of tax implications for married same-sex couples, domestic partnerships, and transgender-specific tax considerations.",
    shortBio: "CPA with expertise in LGBTQIA+ tax situations",
    location: { city: "Portland", state: "OR", virtual: true },
    trustBadges: ["verified", "affirming", "trained"],
    specialties: ["Tax Preparation", "Tax Planning", "Small Business Taxes", "IRS Resolution"],
    languages: ["English", "Cantonese"],
    pronouns: "she/her",
    yearEstablished: 2013,
    rating: 4.9,
    reviewCount: 112,
  },
  {
    id: "10",
    name: "Robert Martinez",
    businessName: "Unity Insurance Group",
    categoryId: "financial",
    subcategory: "Insurance",
    description: "Independent insurance broker helping LGBTQIA+ individuals and families find the right coverage. Specializes in health insurance navigation, life insurance for same-sex couples, and ensuring policies recognize chosen families.",
    shortBio: "Insurance broker ensuring coverage for all families",
    location: { city: "Miami", state: "FL", virtual: true },
    trustBadges: ["verified", "affirming"],
    specialties: ["Health Insurance", "Life Insurance", "Disability Insurance", "Long-term Care"],
    languages: ["English", "Spanish"],
    pronouns: "he/him",
    yearEstablished: 2017,
    rating: 4.7,
    reviewCount: 54,
  },

  // Career Providers
  {
    id: "11",
    name: "Taylor Brooks",
    businessName: "Authentic Career Coaching",
    categoryId: "career",
    subcategory: "Career Coaching",
    description: "Executive coach helping LGBTQIA+ professionals navigate career growth while staying true to themselves. Specializes in leadership development, career transitions, and managing identity in the workplace. Offers individual coaching and corporate workshops.",
    shortBio: "Career coach for LGBTQIA+ professionals",
    location: { city: "Boston", state: "MA", virtual: true },
    trustBadges: ["verified", "affirming", "owned"],
    specialties: ["Executive Coaching", "Career Transition", "Leadership Development", "Workplace Identity"],
    languages: ["English"],
    pronouns: "they/them",
    yearEstablished: 2016,
    rating: 4.9,
    reviewCount: 63,
  },
  {
    id: "12",
    name: "Amanda Foster",
    businessName: "Out & Proud Recruiting",
    categoryId: "career",
    subcategory: "LGBTQIA+ Recruiting",
    description: "Connecting LGBTQIA+ talent with affirming employers. Specializes in tech, finance, and creative industries. Works with both job seekers and companies committed to building diverse, inclusive teams.",
    shortBio: "Recruiting firm connecting talent with affirming employers",
    location: { city: "San Francisco", state: "CA", virtual: true },
    trustBadges: ["verified", "affirming", "owned"],
    specialties: ["Tech Recruiting", "Finance Recruiting", "Creative Industries", "Executive Search"],
    languages: ["English"],
    pronouns: "she/her",
    yearEstablished: 2018,
    rating: 4.8,
    reviewCount: 41,
  },

  // Lifestyle Providers
  {
    id: "13",
    name: "Chris & Morgan Events",
    businessName: "Rainbow Celebrations",
    categoryId: "lifestyle",
    subcategory: "Wedding & Events",
    description: "Full-service wedding and event planning for LGBTQIA+ couples. From intimate ceremonies to grand celebrations, we create beautiful, personalized events that honor your love story. Extensive network of affirming vendors.",
    shortBio: "Wedding planners celebrating love in all forms",
    location: { city: "Atlanta", state: "GA", virtual: false },
    trustBadges: ["verified", "affirming", "owned"],
    specialties: ["Wedding Planning", "Event Design", "Vendor Coordination", "Day-of Coordination"],
    languages: ["English"],
    pronouns: "they/them & she/her",
    yearEstablished: 2015,
    rating: 5.0,
    reviewCount: 89,
  },
  {
    id: "14",
    name: "Marcus Lee",
    businessName: "Pride Travel Adventures",
    categoryId: "lifestyle",
    subcategory: "Travel",
    description: "LGBTQIA+ travel specialist creating safe, welcoming travel experiences worldwide. Expert knowledge of LGBTQIA+-friendly destinations, accommodations, and experiences. Group trips and custom itineraries available.",
    shortBio: "Travel specialist for safe, affirming adventures",
    location: { city: "San Diego", state: "CA", virtual: true },
    trustBadges: ["verified", "affirming", "owned"],
    specialties: ["Destination Weddings", "Group Travel", "LGBTQIA+ Events", "Custom Itineraries"],
    languages: ["English", "Spanish"],
    pronouns: "he/him",
    yearEstablished: 2014,
    rating: 4.9,
    reviewCount: 156,
  },
  {
    id: "15",
    name: "Sam Rivera",
    businessName: "True Colors Photography",
    categoryId: "lifestyle",
    subcategory: "Photography",
    description: "Documentary-style photographer capturing authentic moments for LGBTQIA+ weddings, families, and events. Known for making clients feel comfortable and creating images that tell your unique story.",
    shortBio: "Photographer capturing authentic LGBTQIA+ moments",
    location: { city: "Philadelphia", state: "PA", virtual: false },
    trustBadges: ["verified", "affirming", "owned"],
    specialties: ["Wedding Photography", "Family Portraits", "Events", "Personal Branding"],
    languages: ["English"],
    pronouns: "they/them",
    yearEstablished: 2017,
    rating: 4.9,
    reviewCount: 72,
  },
  {
    id: "16",
    name: "Jessica & Kim Studio",
    businessName: "Affirm Fitness",
    categoryId: "lifestyle",
    subcategory: "Fitness & Wellness",
    description: "Body-positive, gender-affirming fitness studio offering personal training, group classes, and wellness coaching. Safe space for all bodies and identities to build strength and confidence.",
    shortBio: "Body-positive fitness for all identities",
    location: { city: "Austin", state: "TX", virtual: true },
    trustBadges: ["verified", "affirming", "owned", "trained"],
    specialties: ["Personal Training", "Group Fitness", "Wellness Coaching", "Nutrition"],
    languages: ["English", "Spanish"],
    pronouns: "she/her & she/her",
    yearEstablished: 2019,
    rating: 4.8,
    reviewCount: 98,
  },
];

export function getProviderById(id: string): Provider | undefined {
  return providers.find((p) => p.id === id);
}

export function getProvidersByCategory(categoryId: string): Provider[] {
  return providers.filter((p) => p.categoryId === categoryId);
}

export function searchProviders(
  query?: string,
  categoryId?: string,
  subcategory?: string,
  location?: string,
  badges?: string[]
): Provider[] {
  let results = [...providers];

  if (query) {
    const q = query.toLowerCase();
    results = results.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.businessName?.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.specialties.some((s) => s.toLowerCase().includes(q))
    );
  }

  if (categoryId) {
    results = results.filter((p) => p.categoryId === categoryId);
  }

  if (subcategory) {
    results = results.filter((p) => p.subcategory === subcategory);
  }

  if (location) {
    const loc = location.toLowerCase();
    results = results.filter(
      (p) =>
        p.location.city.toLowerCase().includes(loc) ||
        p.location.state.toLowerCase().includes(loc)
    );
  }

  if (badges && badges.length > 0) {
    results = results.filter((p) =>
      badges.some((badge) => p.trustBadges.includes(badge as any))
    );
  }

  return results;
}
