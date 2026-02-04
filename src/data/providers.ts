import {
  Provider,
  TrustBadgeId,
  InclusiveTag,
  SortOption,
  SearchFilters,
  VerificationLevel,
} from "@/lib/types";

// =============================================================================
// PROVIDER DATA
// Privacy-first: No direct contact info exposed. All contact through relay.
// =============================================================================

export const providers: Provider[] = [
  // =========================================================================
  // HEALTHCARE PROVIDERS
  // =========================================================================
  {
    id: "1",
    name: "Dr. Maya Chen",
    businessName: "Spectrum Therapy & Wellness",
    categoryId: "healthcare",
    subcategory: "Therapy & Counseling",
    description:
      "Dr. Chen specializes in working with LGBTQIA+ individuals and couples, offering a warm, affirming space for healing and growth. With 12 years of experience, she focuses on identity exploration, relationship dynamics, anxiety, and depression. She uses an integrative approach combining CBT, narrative therapy, and mindfulness practices.",
    shortBio: "Affirming therapist specializing in LGBTQIA+ individuals and couples",
    location: {
      city: "San Francisco",
      state: "CA",
      virtual: true,
      serviceArea: ["Bay Area", "California (virtual)"],
    },
    contact: {
      hasEmail: true,
      hasPhone: true,
      hasWebsite: true,
      preferredMethod: "relay",
      responseTime: "Within 24 hours",
    },
    trust: {
      verification: {
        level: "arcus_verified",
        verifiedAt: "2024-06-15",
        expiresAt: "2025-06-15",
        verifiedBy: "arcuspath",
        method: "License verification, reference checks, affirming care assessment",
      },
      trustBadges: ["verified", "affirming", "owned"],
      inclusiveTags: ["trans-affirming", "nonbinary-affirming", "trauma-informed", "sliding-scale"],
      lgbtqOwned: true,
      affirmationStatement:
        "I believe everyone deserves a therapist who sees and celebrates their whole identity. My practice is built on the principle that affirming care is not just good ethics—it's good medicine.",
      communityEndorsements: 23,
      reportCount: 0,
    },
    status: "active",
    specialties: ["LGBTQIA+ Identity", "Couples Therapy", "Anxiety", "Depression", "Gender Identity"],
    languages: ["English", "Mandarin"],
    pronouns: "she/her",
    yearEstablished: 2012,
    trustBadges: ["verified", "affirming", "owned"],
    rating: 4.9,
    reviewCount: 87,
    createdAt: "2024-01-15",
    updatedAt: "2024-12-01",
  },
  {
    id: "2",
    name: "Dr. James Rodriguez",
    businessName: "Pride Primary Care",
    categoryId: "healthcare",
    subcategory: "Primary Care",
    description:
      "Board-certified internal medicine physician providing comprehensive primary care with expertise in LGBTQIA+ health. Services include preventive care, PrEP/PEP, hormone management, and chronic disease management. Committed to creating a judgment-free environment for all patients.",
    shortBio: "Primary care physician with LGBTQIA+ health expertise",
    location: {
      city: "Austin",
      state: "TX",
      virtual: false,
      serviceArea: ["Austin Metro Area"],
    },
    contact: {
      hasEmail: true,
      hasPhone: true,
      hasWebsite: true,
      preferredMethod: "relay",
      responseTime: "1-2 business days",
    },
    trust: {
      verification: {
        level: "credential",
        verifiedAt: "2024-08-20",
        expiresAt: "2025-08-20",
        verifiedBy: "arcuspath",
        method: "Medical license verification, board certification confirmed",
      },
      trustBadges: ["verified", "affirming", "trained"],
      inclusiveTags: ["hiv-informed", "prep-provider", "trans-affirming", "accepts-insurance"],
      lgbtqOwned: false,
      affirmationStatement:
        "Every patient deserves care that respects their identity. I've dedicated my practice to understanding LGBTQIA+ health needs and providing compassionate, comprehensive care.",
      communityEndorsements: 45,
      reportCount: 0,
    },
    status: "active",
    specialties: ["Primary Care", "PrEP/PEP", "Hormone Management", "Preventive Health"],
    languages: ["English", "Spanish"],
    pronouns: "he/him",
    yearEstablished: 2015,
    trustBadges: ["verified", "affirming", "trained"],
    rating: 4.8,
    reviewCount: 124,
    createdAt: "2024-02-10",
    updatedAt: "2024-11-15",
  },
  {
    id: "3",
    name: "Dr. Alex Kim",
    businessName: "True Self Medical",
    categoryId: "healthcare",
    subcategory: "Gender-Affirming Care",
    description:
      "Providing compassionate, informed gender-affirming care including hormone therapy, health monitoring, and surgical referrals. Dr. Kim works collaboratively with patients to support their transition journey with evidence-based medicine and whole-person care.",
    shortBio: "Gender-affirming care specialist supporting your journey",
    location: {
      city: "Seattle",
      state: "WA",
      virtual: true,
      serviceArea: ["Washington State", "Oregon (virtual)"],
    },
    contact: {
      hasEmail: true,
      hasPhone: true,
      hasWebsite: true,
      preferredMethod: "relay",
      responseTime: "Within 48 hours",
    },
    trust: {
      verification: {
        level: "arcus_verified",
        verifiedAt: "2024-05-10",
        expiresAt: "2025-05-10",
        verifiedBy: "arcuspath",
        method: "Full verification including WPATH certification review",
      },
      trustBadges: ["verified", "affirming", "owned", "trained"],
      inclusiveTags: [
        "trans-affirming",
        "nonbinary-affirming",
        "gender-affirming-care",
        "trauma-informed",
        "sliding-scale",
      ],
      lgbtqOwned: true,
      affirmationStatement:
        "As a nonbinary provider, I understand the importance of being seen and supported. My practice centers patient autonomy and informed consent in all gender-affirming care.",
      communityEndorsements: 67,
      reportCount: 0,
    },
    status: "active",
    specialties: ["Gender-Affirming Hormone Therapy", "Transition Support", "Preventive Care"],
    languages: ["English", "Korean"],
    pronouns: "they/them",
    yearEstablished: 2018,
    trustBadges: ["verified", "affirming", "owned", "trained"],
    rating: 5.0,
    reviewCount: 56,
    createdAt: "2024-01-20",
    updatedAt: "2024-12-05",
  },
  {
    id: "4",
    name: "Dr. Sarah Thompson",
    businessName: "Mindful Path Psychiatry",
    categoryId: "healthcare",
    subcategory: "Psychiatry",
    description:
      "Board-certified psychiatrist offering medication management and psychiatric evaluation for LGBTQIA+ adults. Specializes in anxiety, depression, ADHD, and trauma-related conditions. Believes in collaborative care that honors each patient's identity and experiences.",
    shortBio: "Affirming psychiatrist specializing in anxiety and mood disorders",
    location: {
      city: "Chicago",
      state: "IL",
      virtual: true,
      serviceArea: ["Illinois", "Nationwide (virtual)"],
    },
    contact: {
      hasEmail: true,
      hasPhone: false,
      hasWebsite: true,
      preferredMethod: "relay",
      responseTime: "2-3 business days",
    },
    trust: {
      verification: {
        level: "credential",
        verifiedAt: "2024-07-01",
        expiresAt: "2025-07-01",
        verifiedBy: "arcuspath",
        method: "Board certification and state license verified",
      },
      trustBadges: ["verified", "affirming", "trained"],
      inclusiveTags: ["trauma-informed", "neurodivergent-affirming", "accepts-insurance"],
      lgbtqOwned: false,
      affirmationStatement:
        "Mental health care should never require hiding who you are. I provide medication management in a space where your identity is respected and your experiences are believed.",
      communityEndorsements: 31,
      reportCount: 0,
    },
    status: "active",
    specialties: ["Medication Management", "Anxiety", "Depression", "ADHD", "Trauma"],
    languages: ["English"],
    pronouns: "she/her",
    yearEstablished: 2010,
    trustBadges: ["verified", "affirming", "trained"],
    rating: 4.7,
    reviewCount: 93,
    createdAt: "2024-03-05",
    updatedAt: "2024-10-20",
  },

  // =========================================================================
  // LEGAL PROVIDERS
  // =========================================================================
  {
    id: "5",
    name: "Jordan Williams, Esq.",
    businessName: "Rainbow Rights Law",
    categoryId: "legal",
    subcategory: "Family Law",
    description:
      "Dedicated family law attorney with extensive experience in LGBTQIA+ family matters including adoption, surrogacy, custody arrangements, and marriage. Passionate about helping families of all structures navigate the legal system with dignity and respect.",
    shortBio: "Family law attorney specializing in LGBTQIA+ families",
    location: {
      city: "New York",
      state: "NY",
      virtual: true,
      serviceArea: ["New York", "New Jersey", "Connecticut"],
    },
    contact: {
      hasEmail: true,
      hasPhone: true,
      hasWebsite: true,
      preferredMethod: "relay",
      responseTime: "Within 24 hours",
    },
    trust: {
      verification: {
        level: "arcus_verified",
        verifiedAt: "2024-04-15",
        expiresAt: "2025-04-15",
        verifiedBy: "arcuspath",
        method: "Bar admission verified, client references checked",
      },
      trustBadges: ["verified", "affirming", "owned"],
      inclusiveTags: ["lgbtq-families", "trans-affirming", "sliding-scale"],
      lgbtqOwned: true,
      affirmationStatement:
        "Every family deserves legal protection and recognition. I fight for LGBTQIA+ families because I know firsthand the barriers we face in building and protecting our chosen families.",
      communityEndorsements: 42,
      reportCount: 0,
    },
    status: "active",
    specialties: ["Adoption", "Surrogacy", "Custody", "Marriage", "Divorce"],
    languages: ["English"],
    pronouns: "they/them",
    yearEstablished: 2014,
    trustBadges: ["verified", "affirming", "owned"],
    rating: 4.9,
    reviewCount: 67,
    createdAt: "2024-02-01",
    updatedAt: "2024-11-30",
  },
  {
    id: "6",
    name: "Maria Santos, Esq.",
    businessName: "Identity Legal Services",
    categoryId: "legal",
    subcategory: "Name & Gender Changes",
    description:
      "Helping transgender and non-binary individuals navigate name and gender marker changes on all documents. Streamlined process with flat-fee pricing. Also assists with updating records across all government agencies and institutions.",
    shortBio: "Specializing in name and gender marker changes",
    location: {
      city: "Los Angeles",
      state: "CA",
      virtual: true,
      serviceArea: ["California"],
    },
    contact: {
      hasEmail: true,
      hasPhone: true,
      hasWebsite: true,
      preferredMethod: "relay",
      responseTime: "Same business day",
    },
    trust: {
      verification: {
        level: "credential",
        verifiedAt: "2024-09-01",
        expiresAt: "2025-09-01",
        verifiedBy: "arcuspath",
        method: "California Bar verified",
      },
      trustBadges: ["verified", "affirming", "trained"],
      inclusiveTags: ["trans-affirming", "nonbinary-affirming", "sliding-scale"],
      lgbtqOwned: false,
      affirmationStatement:
        "Your name and gender marker should reflect who you are. I make the legal process as simple and affirming as possible so you can focus on living authentically.",
      communityEndorsements: 89,
      reportCount: 0,
    },
    status: "active",
    specialties: ["Name Changes", "Gender Marker Changes", "Document Updates", "Court Petitions"],
    languages: ["English", "Spanish"],
    pronouns: "she/her",
    yearEstablished: 2016,
    trustBadges: ["verified", "affirming", "trained"],
    rating: 4.9,
    reviewCount: 142,
    createdAt: "2024-01-10",
    updatedAt: "2024-12-01",
  },
  {
    id: "7",
    name: "David Park, Esq.",
    businessName: "Park Immigration Law",
    categoryId: "legal",
    subcategory: "Immigration",
    description:
      "Immigration attorney experienced in LGBTQIA+ asylum cases, family-based immigration for same-sex couples, and visa applications. Understands the unique challenges facing LGBTQIA+ immigrants and provides compassionate, expert legal support.",
    shortBio: "Immigration attorney with LGBTQIA+ asylum expertise",
    location: {
      city: "San Francisco",
      state: "CA",
      virtual: true,
      serviceArea: ["California", "Nationwide"],
    },
    contact: {
      hasEmail: true,
      hasPhone: true,
      hasWebsite: true,
      preferredMethod: "relay",
      responseTime: "Within 48 hours",
    },
    trust: {
      verification: {
        level: "community",
        verifiedAt: "2024-06-01",
        expiresAt: "2025-06-01",
        verifiedBy: "community",
        method: "Bar verified, community endorsements",
      },
      trustBadges: ["verified", "affirming"],
      inclusiveTags: ["bipoc-affirming", "sliding-scale"],
      lgbtqOwned: false,
      affirmationStatement:
        "LGBTQIA+ immigrants face unique challenges. I provide legal support that understands the intersection of immigration status and queer identity.",
      communityEndorsements: 28,
      reportCount: 0,
    },
    status: "active",
    specialties: ["Asylum", "Family Immigration", "Visa Applications", "Green Cards"],
    languages: ["English", "Korean"],
    pronouns: "he/him",
    yearEstablished: 2011,
    trustBadges: ["verified", "affirming"],
    rating: 4.8,
    reviewCount: 89,
    createdAt: "2024-04-20",
    updatedAt: "2024-10-15",
  },

  // =========================================================================
  // FINANCIAL PROVIDERS
  // =========================================================================
  {
    id: "8",
    name: "Michael Johnson, CFP",
    businessName: "Pride Financial Planning",
    categoryId: "financial",
    subcategory: "Financial Planning",
    description:
      "Certified Financial Planner helping LGBTQIA+ individuals and couples build wealth, plan for the future, and navigate unique financial considerations. Specializes in retirement planning, investment management, and financial planning for same-sex couples.",
    shortBio: "Financial planner specializing in LGBTQIA+ wealth building",
    location: {
      city: "Denver",
      state: "CO",
      virtual: true,
      serviceArea: ["Colorado", "Nationwide (virtual)"],
    },
    contact: {
      hasEmail: true,
      hasPhone: true,
      hasWebsite: true,
      preferredMethod: "relay",
      responseTime: "Within 24 hours",
    },
    trust: {
      verification: {
        level: "credential",
        verifiedAt: "2024-03-15",
        expiresAt: "2025-03-15",
        verifiedBy: "arcuspath",
        method: "CFP certification verified",
      },
      trustBadges: ["verified", "affirming", "owned"],
      inclusiveTags: ["lgbtq-families", "elder-lgbtq"],
      lgbtqOwned: true,
      affirmationStatement:
        "Financial planning for LGBTQIA+ individuals requires understanding unique considerations—from chosen families to retirement in affirming communities. I'm here to help you build the future you deserve.",
      communityEndorsements: 34,
      reportCount: 0,
    },
    status: "active",
    specialties: ["Retirement Planning", "Investment Management", "Estate Planning", "Tax Strategy"],
    languages: ["English"],
    pronouns: "he/him",
    yearEstablished: 2009,
    trustBadges: ["verified", "affirming", "owned"],
    rating: 4.8,
    reviewCount: 78,
    createdAt: "2024-02-28",
    updatedAt: "2024-11-10",
  },
  {
    id: "9",
    name: "Lisa Chang, CPA",
    businessName: "Inclusive Tax Services",
    categoryId: "financial",
    subcategory: "Tax Services",
    description:
      "CPA providing tax preparation and planning for LGBTQIA+ individuals, couples, and small businesses. Expert knowledge of tax implications for married same-sex couples, domestic partnerships, and transgender-specific tax considerations.",
    shortBio: "CPA with expertise in LGBTQIA+ tax situations",
    location: {
      city: "Portland",
      state: "OR",
      virtual: true,
      serviceArea: ["Oregon", "Washington", "Nationwide (virtual)"],
    },
    contact: {
      hasEmail: true,
      hasPhone: false,
      hasWebsite: true,
      preferredMethod: "relay",
      responseTime: "1-2 business days",
    },
    trust: {
      verification: {
        level: "credential",
        verifiedAt: "2024-01-20",
        expiresAt: "2025-01-20",
        verifiedBy: "arcuspath",
        method: "CPA license verified",
      },
      trustBadges: ["verified", "affirming", "trained"],
      inclusiveTags: ["trans-affirming", "lgbtq-families"],
      lgbtqOwned: false,
      affirmationStatement:
        "Tax law has unique implications for LGBTQIA+ individuals and families. I stay current on all relevant regulations to maximize your benefits and minimize your burden.",
      communityEndorsements: 56,
      reportCount: 0,
    },
    status: "active",
    specialties: ["Tax Preparation", "Tax Planning", "Small Business Taxes", "IRS Resolution"],
    languages: ["English", "Cantonese"],
    pronouns: "she/her",
    yearEstablished: 2013,
    trustBadges: ["verified", "affirming", "trained"],
    rating: 4.9,
    reviewCount: 112,
    createdAt: "2024-01-05",
    updatedAt: "2024-12-02",
  },
  {
    id: "10",
    name: "Robert Martinez",
    businessName: "Unity Insurance Group",
    categoryId: "financial",
    subcategory: "Insurance",
    description:
      "Independent insurance broker helping LGBTQIA+ individuals and families find the right coverage. Specializes in health insurance navigation, life insurance for same-sex couples, and ensuring policies recognize chosen families.",
    shortBio: "Insurance broker ensuring coverage for all families",
    location: {
      city: "Miami",
      state: "FL",
      virtual: true,
      serviceArea: ["Florida", "Nationwide"],
    },
    contact: {
      hasEmail: true,
      hasPhone: true,
      hasWebsite: true,
      preferredMethod: "relay",
      responseTime: "Same business day",
    },
    trust: {
      verification: {
        level: "self",
        verifiedAt: "2024-08-01",
        expiresAt: null,
        verifiedBy: null,
        method: "Self-reported credentials",
      },
      trustBadges: ["verified", "affirming"],
      inclusiveTags: ["lgbtq-families", "hiv-informed"],
      lgbtqOwned: false,
      affirmationStatement:
        "Insurance should protect everyone equally. I work to find policies that recognize and protect LGBTQIA+ individuals and families without discrimination.",
      communityEndorsements: 12,
      reportCount: 0,
    },
    status: "active",
    specialties: ["Health Insurance", "Life Insurance", "Disability Insurance", "Long-term Care"],
    languages: ["English", "Spanish"],
    pronouns: "he/him",
    yearEstablished: 2017,
    trustBadges: ["verified", "affirming"],
    rating: 4.7,
    reviewCount: 54,
    createdAt: "2024-05-15",
    updatedAt: "2024-09-20",
  },

  // =========================================================================
  // CAREER PROVIDERS
  // =========================================================================
  {
    id: "11",
    name: "Taylor Brooks",
    businessName: "Authentic Career Coaching",
    categoryId: "career",
    subcategory: "Career Coaching",
    description:
      "Executive coach helping LGBTQIA+ professionals navigate career growth while staying true to themselves. Specializes in leadership development, career transitions, and managing identity in the workplace. Offers individual coaching and corporate workshops.",
    shortBio: "Career coach for LGBTQIA+ professionals",
    location: {
      city: "Boston",
      state: "MA",
      virtual: true,
      serviceArea: ["Nationwide (virtual)"],
    },
    contact: {
      hasEmail: true,
      hasPhone: false,
      hasWebsite: true,
      preferredMethod: "relay",
      responseTime: "Within 24 hours",
    },
    trust: {
      verification: {
        level: "community",
        verifiedAt: "2024-07-15",
        expiresAt: "2025-07-15",
        verifiedBy: "community",
        method: "ICF certification verified, community endorsements",
      },
      trustBadges: ["verified", "affirming", "owned"],
      inclusiveTags: ["trans-affirming", "bipoc-affirming", "neurodivergent-affirming"],
      lgbtqOwned: true,
      affirmationStatement:
        "You shouldn't have to choose between career success and authenticity. I help LGBTQIA+ professionals thrive by bringing their whole selves to work.",
      communityEndorsements: 38,
      reportCount: 0,
    },
    status: "active",
    specialties: ["Executive Coaching", "Career Transition", "Leadership Development", "Workplace Identity"],
    languages: ["English"],
    pronouns: "they/them",
    yearEstablished: 2016,
    trustBadges: ["verified", "affirming", "owned"],
    rating: 4.9,
    reviewCount: 63,
    createdAt: "2024-03-10",
    updatedAt: "2024-11-25",
  },
  {
    id: "12",
    name: "Amanda Foster",
    businessName: "Out & Proud Recruiting",
    categoryId: "career",
    subcategory: "LGBTQIA+ Recruiting",
    description:
      "Connecting LGBTQIA+ talent with affirming employers. Specializes in tech, finance, and creative industries. Works with both job seekers and companies committed to building diverse, inclusive teams.",
    shortBio: "Recruiting firm connecting talent with affirming employers",
    location: {
      city: "San Francisco",
      state: "CA",
      virtual: true,
      serviceArea: ["Nationwide"],
    },
    contact: {
      hasEmail: true,
      hasPhone: true,
      hasWebsite: true,
      preferredMethod: "relay",
      responseTime: "Within 48 hours",
    },
    trust: {
      verification: {
        level: "arcus_verified",
        verifiedAt: "2024-02-20",
        expiresAt: "2025-02-20",
        verifiedBy: "arcuspath",
        method: "Business verification, employer vetting process reviewed",
      },
      trustBadges: ["verified", "affirming", "owned"],
      inclusiveTags: ["trans-affirming", "bipoc-affirming"],
      lgbtqOwned: true,
      affirmationStatement:
        "Job searching while LGBTQIA+ can be stressful. We vet employers so you can focus on finding the right role, not worrying about discrimination.",
      communityEndorsements: 51,
      reportCount: 0,
    },
    status: "active",
    specialties: ["Tech Recruiting", "Finance Recruiting", "Creative Industries", "Executive Search"],
    languages: ["English"],
    pronouns: "she/her",
    yearEstablished: 2018,
    trustBadges: ["verified", "affirming", "owned"],
    rating: 4.8,
    reviewCount: 41,
    createdAt: "2024-01-25",
    updatedAt: "2024-10-30",
  },

  // =========================================================================
  // LIFESTYLE PROVIDERS
  // =========================================================================
  {
    id: "13",
    name: "Chris & Morgan Events",
    businessName: "Rainbow Celebrations",
    categoryId: "lifestyle",
    subcategory: "Wedding & Events",
    description:
      "Full-service wedding and event planning for LGBTQIA+ couples. From intimate ceremonies to grand celebrations, we create beautiful, personalized events that honor your love story. Extensive network of affirming vendors.",
    shortBio: "Wedding planners celebrating love in all forms",
    location: {
      city: "Atlanta",
      state: "GA",
      virtual: false,
      serviceArea: ["Georgia", "Southeast US"],
    },
    contact: {
      hasEmail: true,
      hasPhone: true,
      hasWebsite: true,
      preferredMethod: "relay",
      responseTime: "Within 24 hours",
    },
    trust: {
      verification: {
        level: "arcus_verified",
        verifiedAt: "2024-04-01",
        expiresAt: "2025-04-01",
        verifiedBy: "arcuspath",
        method: "Business verification, vendor network reviewed",
      },
      trustBadges: ["verified", "affirming", "owned"],
      inclusiveTags: ["lgbtq-families", "trans-affirming", "bipoc-affirming"],
      lgbtqOwned: true,
      affirmationStatement:
        "Every love story deserves a beautiful celebration. We create events where LGBTQIA+ couples and their families feel completely celebrated and safe.",
      communityEndorsements: 72,
      reportCount: 0,
    },
    status: "active",
    specialties: ["Wedding Planning", "Event Design", "Vendor Coordination", "Day-of Coordination"],
    languages: ["English"],
    pronouns: "they/them & she/her",
    yearEstablished: 2015,
    trustBadges: ["verified", "affirming", "owned"],
    rating: 5.0,
    reviewCount: 89,
    createdAt: "2024-02-15",
    updatedAt: "2024-12-01",
  },
  {
    id: "14",
    name: "Marcus Lee",
    businessName: "Pride Travel Adventures",
    categoryId: "lifestyle",
    subcategory: "Travel",
    description:
      "LGBTQIA+ travel specialist creating safe, welcoming travel experiences worldwide. Expert knowledge of LGBTQIA+-friendly destinations, accommodations, and experiences. Group trips and custom itineraries available.",
    shortBio: "Travel specialist for safe, affirming adventures",
    location: {
      city: "San Diego",
      state: "CA",
      virtual: true,
      serviceArea: ["Worldwide"],
    },
    contact: {
      hasEmail: true,
      hasPhone: true,
      hasWebsite: true,
      preferredMethod: "relay",
      responseTime: "Same business day",
    },
    trust: {
      verification: {
        level: "community",
        verifiedAt: "2024-05-20",
        expiresAt: "2025-05-20",
        verifiedBy: "community",
        method: "IATA certified, extensive community reviews",
      },
      trustBadges: ["verified", "affirming", "owned"],
      inclusiveTags: ["elder-lgbtq", "disability-affirming"],
      lgbtqOwned: true,
      affirmationStatement:
        "Travel should be joyful, not stressful. I research every destination to ensure LGBTQIA+ travelers can explore the world safely and authentically.",
      communityEndorsements: 83,
      reportCount: 0,
    },
    status: "active",
    specialties: ["Destination Weddings", "Group Travel", "LGBTQIA+ Events", "Custom Itineraries"],
    languages: ["English", "Spanish"],
    pronouns: "he/him",
    yearEstablished: 2014,
    trustBadges: ["verified", "affirming", "owned"],
    rating: 4.9,
    reviewCount: 156,
    createdAt: "2024-01-30",
    updatedAt: "2024-11-20",
  },
  {
    id: "15",
    name: "Sam Rivera",
    businessName: "True Colors Photography",
    categoryId: "lifestyle",
    subcategory: "Photography",
    description:
      "Documentary-style photographer capturing authentic moments for LGBTQIA+ weddings, families, and events. Known for making clients feel comfortable and creating images that tell your unique story.",
    shortBio: "Photographer capturing authentic LGBTQIA+ moments",
    location: {
      city: "Philadelphia",
      state: "PA",
      virtual: false,
      serviceArea: ["Pennsylvania", "New Jersey", "Delaware", "East Coast"],
    },
    contact: {
      hasEmail: true,
      hasPhone: false,
      hasWebsite: true,
      preferredMethod: "relay",
      responseTime: "Within 48 hours",
    },
    trust: {
      verification: {
        level: "community",
        verifiedAt: "2024-06-10",
        expiresAt: "2025-06-10",
        verifiedBy: "community",
        method: "Portfolio reviewed, community endorsements",
      },
      trustBadges: ["verified", "affirming", "owned"],
      inclusiveTags: ["trans-affirming", "lgbtq-families", "disability-affirming"],
      lgbtqOwned: true,
      affirmationStatement:
        "Every family deserves photos that capture their authentic joy. I create a comfortable, affirming environment so you can be fully yourselves in front of the camera.",
      communityEndorsements: 45,
      reportCount: 0,
    },
    status: "active",
    specialties: ["Wedding Photography", "Family Portraits", "Events", "Personal Branding"],
    languages: ["English"],
    pronouns: "they/them",
    yearEstablished: 2017,
    trustBadges: ["verified", "affirming", "owned"],
    rating: 4.9,
    reviewCount: 72,
    createdAt: "2024-03-20",
    updatedAt: "2024-10-25",
  },
  {
    id: "16",
    name: "Jessica & Kim Studio",
    businessName: "Affirm Fitness",
    categoryId: "lifestyle",
    subcategory: "Fitness & Wellness",
    description:
      "Body-positive, gender-affirming fitness studio offering personal training, group classes, and wellness coaching. Safe space for all bodies and identities to build strength and confidence.",
    shortBio: "Body-positive fitness for all identities",
    location: {
      city: "Austin",
      state: "TX",
      virtual: true,
      serviceArea: ["Austin", "Nationwide (virtual)"],
    },
    contact: {
      hasEmail: true,
      hasPhone: true,
      hasWebsite: true,
      preferredMethod: "relay",
      responseTime: "Within 24 hours",
    },
    trust: {
      verification: {
        level: "credential",
        verifiedAt: "2024-08-15",
        expiresAt: "2025-08-15",
        verifiedBy: "arcuspath",
        method: "Personal training certifications verified",
      },
      trustBadges: ["verified", "affirming", "owned", "trained"],
      inclusiveTags: [
        "trans-affirming",
        "nonbinary-affirming",
        "disability-affirming",
        "neurodivergent-affirming",
        "sliding-scale",
      ],
      lgbtqOwned: true,
      affirmationStatement:
        "Fitness should be about feeling good in your body, not conforming to someone else's standards. We create a space where every body is celebrated.",
      communityEndorsements: 61,
      reportCount: 0,
    },
    status: "active",
    specialties: ["Personal Training", "Group Fitness", "Wellness Coaching", "Nutrition"],
    languages: ["English", "Spanish"],
    pronouns: "she/her & she/her",
    yearEstablished: 2019,
    trustBadges: ["verified", "affirming", "owned", "trained"],
    rating: 4.8,
    reviewCount: 98,
    createdAt: "2024-04-05",
    updatedAt: "2024-11-15",
  },
];

// =============================================================================
// SEARCH & FILTER FUNCTIONS
// =============================================================================

export function getProviderById(id: string): Provider | undefined {
  return providers.find((p) => p.id === id);
}

export function getProvidersByCategory(categoryId: string): Provider[] {
  return providers.filter((p) => p.categoryId === categoryId && p.status === "active");
}

/**
 * Calculate trust score for sorting
 * Higher score = more trusted
 */
function calculateTrustScore(provider: Provider): number {
  let score = 0;

  // Verification level (0-4 points)
  const levelScores: Record<VerificationLevel, number> = {
    none: 0,
    self: 1,
    credential: 2,
    community: 3,
    arcus_verified: 4,
  };
  score += levelScores[provider.trust.verification.level] * 10;

  // Trust badges (2 points each)
  score += provider.trust.trustBadges.length * 2;

  // LGBTQ+ owned bonus (3 points)
  if (provider.trust.lgbtqOwned) score += 3;

  // Community endorsements (0.1 points each, max 5)
  score += Math.min(provider.trust.communityEndorsements * 0.1, 5);

  // Rating bonus (up to 5 points)
  if (provider.rating) score += provider.rating;

  // Penalty for reports
  score -= provider.trust.reportCount * 5;

  return score;
}

/**
 * Sort providers by specified option
 */
function sortProviders(providers: Provider[], sort: SortOption): Provider[] {
  const sorted = [...providers];

  switch (sort) {
    case "trust":
      return sorted.sort((a, b) => calculateTrustScore(b) - calculateTrustScore(a));
    case "rating":
      return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    case "newest":
      return sorted.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    case "alphabetical":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "relevance":
    default:
      // For relevance, trust is the default
      return sorted.sort((a, b) => calculateTrustScore(b) - calculateTrustScore(a));
  }
}

/**
 * Search providers with enhanced filtering
 * Privacy-safe: Does not expose contact info
 */
export function searchProviders(
  filters: SearchFilters = {},
  sort: SortOption = "trust",
  page: number = 1,
  pageSize: number = 20
): {
  providers: Provider[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
} {
  let results = providers.filter((p) => p.status === "active");

  // Text search
  if (filters.query) {
    const q = filters.query.toLowerCase().trim();
    results = results.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.businessName?.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.specialties.some((s) => s.toLowerCase().includes(q)) ||
        p.trust.inclusiveTags.some((t) => t.toLowerCase().includes(q))
    );
  }

  // Category filter
  if (filters.category) {
    results = results.filter((p) => p.categoryId === filters.category);
  }

  // Subcategory filter
  if (filters.subcategory) {
    results = results.filter((p) => p.subcategory === filters.subcategory);
  }

  // Location filter
  if (filters.location) {
    const loc = filters.location.toLowerCase().trim();
    results = results.filter(
      (p) =>
        p.location.city.toLowerCase().includes(loc) ||
        p.location.state.toLowerCase().includes(loc) ||
        p.location.serviceArea?.some((a) => a.toLowerCase().includes(loc))
    );
  }

  // Virtual filter
  if (filters.virtual !== undefined) {
    results = results.filter((p) => p.location.virtual === filters.virtual);
  }

  // Trust badges filter
  if (filters.badges && filters.badges.length > 0) {
    results = results.filter((p) =>
      filters.badges!.some((badge) => p.trust.trustBadges.includes(badge))
    );
  }

  // Inclusive tags filter
  if (filters.inclusiveTags && filters.inclusiveTags.length > 0) {
    results = results.filter((p) =>
      filters.inclusiveTags!.some((tag) => p.trust.inclusiveTags.includes(tag))
    );
  }

  // Verification level filter
  if (filters.verificationLevel) {
    const levelOrder: VerificationLevel[] = [
      "none",
      "self",
      "credential",
      "community",
      "arcus_verified",
    ];
    const minLevelIndex = levelOrder.indexOf(filters.verificationLevel);
    results = results.filter(
      (p) => levelOrder.indexOf(p.trust.verification.level) >= minLevelIndex
    );
  }

  // LGBTQ+ owned filter
  if (filters.lgbtqOwned) {
    results = results.filter((p) => p.trust.lgbtqOwned);
  }

  // Sort results
  results = sortProviders(results, sort);

  // Pagination
  const total = results.length;
  const startIndex = (page - 1) * pageSize;
  const paginatedResults = results.slice(startIndex, startIndex + pageSize);

  return {
    providers: paginatedResults,
    total,
    page,
    pageSize,
    hasMore: startIndex + pageSize < total,
  };
}

/**
 * Get providers by inclusive tag
 */
export function getProvidersByInclusiveTag(tag: InclusiveTag): Provider[] {
  return providers.filter(
    (p) => p.status === "active" && p.trust.inclusiveTags.includes(tag)
  );
}

/**
 * Get featured providers (highest trust scores)
 */
export function getFeaturedProviders(limit: number = 4): Provider[] {
  return sortProviders(
    providers.filter((p) => p.status === "active"),
    "trust"
  ).slice(0, limit);
}
