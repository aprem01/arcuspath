import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// Badge definitions
const badges = [
  {
    slug: "verified",
    name: "Verified Provider",
    description:
      "Identity and credentials verified through ArcusPath's multi-step process",
    icon: "ShieldCheck",
    color: "emerald",
    requirements: JSON.stringify([
      "Valid professional license",
      "Identity verification",
      "Background check clearance",
    ]),
    evidenceRequired: true,
    displayOrder: 1,
  },
  {
    slug: "affirming",
    name: "LGBTQIA+ Affirming",
    description:
      "Demonstrated commitment to affirming, inclusive care through training or community feedback",
    icon: "Heart",
    color: "purple",
    requirements: JSON.stringify([
      "Completed LGBTQIA+ competency training",
      "Positive community feedback",
      "Affirming care policies",
    ]),
    evidenceRequired: true,
    displayOrder: 2,
  },
  {
    slug: "owned",
    name: "LGBTQIA+ Owned",
    description: "Business is owned by an LGBTQIA+ community member",
    icon: "Star",
    color: "pink",
    requirements: JSON.stringify([
      "Ownership verification",
      "Community member attestation",
    ]),
    evidenceRequired: true,
    displayOrder: 3,
  },
  {
    slug: "trained",
    name: "Competency Trained",
    description:
      "Completed recognized LGBTQIA+ cultural competency training program",
    icon: "GraduationCap",
    color: "blue",
    requirements: JSON.stringify([
      "Certificate of completion",
      "Training program verification",
    ]),
    evidenceRequired: true,
    displayOrder: 4,
  },
];

// Category definitions
const categories = [
  {
    slug: "healthcare",
    name: "Healthcare",
    icon: "Heart",
    description: "Medical professionals committed to affirming care",
    subcategories: JSON.stringify([
      "Primary Care",
      "Mental Health",
      "Specialists",
      "Gender-Affirming Care",
      "Sexual Health",
      "Dentistry",
      "Alternative Medicine",
    ]),
    displayOrder: 1,
  },
  {
    slug: "legal",
    name: "Legal",
    icon: "Scale",
    description: "Legal experts understanding LGBTQIA+ specific needs",
    subcategories: JSON.stringify([
      "Family Law",
      "Immigration",
      "Employment",
      "Name/Gender Marker Changes",
      "Estate Planning",
      "Civil Rights",
      "Criminal Defense",
    ]),
    displayOrder: 2,
  },
  {
    slug: "financial",
    name: "Financial",
    icon: "DollarSign",
    description: "Financial advisors for unique life circumstances",
    subcategories: JSON.stringify([
      "Financial Planning",
      "Tax Services",
      "Insurance",
      "Retirement Planning",
      "Estate Planning",
      "Business Services",
    ]),
    displayOrder: 3,
  },
  {
    slug: "career",
    name: "Career",
    icon: "Briefcase",
    description: "Career support in inclusive environments",
    subcategories: JSON.stringify([
      "Career Coaching",
      "Resume Services",
      "Recruiting",
      "Executive Coaching",
      "Entrepreneurship",
    ]),
    displayOrder: 4,
  },
  {
    slug: "lifestyle",
    name: "Lifestyle",
    icon: "Sparkles",
    description: "Services celebrating authentic living",
    subcategories: JSON.stringify([
      "Events & Weddings",
      "Travel",
      "Real Estate",
      "Photography",
      "Fitness & Wellness",
      "Personal Services",
    ]),
    displayOrder: 5,
  },
];

// Inclusive tag definitions
const inclusiveTags = [
  { slug: "trans-affirming", name: "Trans Affirming" },
  { slug: "nonbinary-affirming", name: "Nonbinary Affirming" },
  { slug: "hiv-informed", name: "HIV Informed" },
  { slug: "prep-provider", name: "PrEP Provider" },
  { slug: "gender-affirming-care", name: "Gender Affirming Care" },
  { slug: "lgbtq-families", name: "LGBTQ+ Families" },
  { slug: "elder-lgbtq", name: "Elder LGBTQ+" },
  { slug: "youth-lgbtq", name: "Youth LGBTQ+" },
  { slug: "bipoc-affirming", name: "BIPOC Affirming" },
  { slug: "disability-affirming", name: "Disability Affirming" },
  { slug: "neurodivergent-affirming", name: "Neurodivergent Affirming" },
  { slug: "trauma-informed", name: "Trauma Informed" },
  { slug: "sliding-scale", name: "Sliding Scale" },
  { slug: "accepts-insurance", name: "Accepts Insurance" },
];

// Sample providers (migrated from static data)
const providers = [
  {
    name: "Dr. Maya Chen",
    businessName: "Affirming Mental Health Associates",
    categoryId: "healthcare",
    subcategory: "Mental Health",
    description:
      "Dr. Maya Chen specializes in working with LGBTQIA+ individuals, couples, and families. With over 15 years of experience, she provides affirming therapy for gender identity exploration, coming out support, relationship issues, and trauma recovery. Her practice is a safe space where you can be your authentic self.",
    shortBio:
      "Licensed psychologist specializing in LGBTQIA+ affirming therapy with 15+ years experience.",
    pronouns: "she/her",
    yearEstablished: 2009,
    city: "San Francisco",
    state: "CA",
    zipCode: "94102",
    virtual: true,
    serviceArea: JSON.stringify(["California", "Virtual nationwide"]),
    email: "contact@affirmingmh.com",
    preferredContact: "EMAIL",
    responseTime: "Within 24 hours",
    status: "ACTIVE",
    specialties: JSON.stringify([
      "Gender Identity",
      "Coming Out Support",
      "Couples Therapy",
      "Trauma Recovery",
      "Anxiety & Depression",
    ]),
    languages: JSON.stringify(["English", "Mandarin"]),
    verificationLevel: "arcus_verified",
    lgbtqOwned: true,
    affirmationStatement:
      "Every person deserves to be seen, heard, and celebrated for who they truly are.",
    communityEndorsements: 23,
    rating: 4.9,
    reviewCount: 47,
    badges: ["verified", "affirming", "owned"],
    tags: ["trans-affirming", "nonbinary-affirming", "trauma-informed", "sliding-scale"],
  },
  {
    name: "Dr. James Rodriguez",
    businessName: "Rainbow Health Primary Care",
    categoryId: "healthcare",
    subcategory: "Primary Care",
    description:
      "Comprehensive primary care with a focus on LGBTQIA+ health needs. We provide routine care, preventive services, hormone therapy management, and sexual health services in a judgment-free environment.",
    shortBio:
      "LGBTQIA+ focused primary care physician providing comprehensive, affirming healthcare.",
    pronouns: "he/him",
    yearEstablished: 2015,
    city: "Austin",
    state: "TX",
    zipCode: "78701",
    virtual: true,
    serviceArea: JSON.stringify(["Texas"]),
    email: "info@rainbowhealthpc.com",
    preferredContact: "EMAIL",
    responseTime: "Within 48 hours",
    status: "ACTIVE",
    specialties: JSON.stringify([
      "Primary Care",
      "Hormone Therapy",
      "Sexual Health",
      "Preventive Care",
      "HIV/PrEP",
    ]),
    languages: JSON.stringify(["English", "Spanish"]),
    verificationLevel: "arcus_verified",
    lgbtqOwned: false,
    affirmationStatement:
      "Healthcare should be accessible and affirming for everyone, regardless of identity.",
    communityEndorsements: 18,
    rating: 4.8,
    reviewCount: 35,
    badges: ["verified", "affirming", "trained"],
    tags: ["trans-affirming", "prep-provider", "hiv-informed", "accepts-insurance"],
  },
  {
    name: "Sarah Thompson, Esq.",
    businessName: "Pride Legal Services",
    categoryId: "legal",
    subcategory: "Family Law",
    description:
      "Dedicated family law practice serving LGBTQIA+ families. Services include adoption, surrogacy agreements, divorce and custody, name and gender marker changes, and estate planning.",
    shortBio:
      "Family law attorney specializing in LGBTQIA+ family formation and protection.",
    pronouns: "she/they",
    yearEstablished: 2012,
    city: "Chicago",
    state: "IL",
    zipCode: "60601",
    virtual: true,
    serviceArea: JSON.stringify(["Illinois", "Virtual consultations nationwide"]),
    email: "sarah@pridelegal.com",
    preferredContact: "EMAIL",
    responseTime: "Within 24 hours",
    status: "ACTIVE",
    specialties: JSON.stringify([
      "LGBTQ+ Adoption",
      "Surrogacy",
      "Divorce & Custody",
      "Name Changes",
      "Estate Planning",
    ]),
    languages: JSON.stringify(["English"]),
    verificationLevel: "arcus_verified",
    lgbtqOwned: true,
    affirmationStatement:
      "Every family deserves legal protection and recognition, no matter how it's formed.",
    communityEndorsements: 31,
    rating: 4.9,
    reviewCount: 52,
    badges: ["verified", "affirming", "owned"],
    tags: ["lgbtq-families", "trans-affirming", "nonbinary-affirming"],
  },
  {
    name: "Alex Kim",
    businessName: "Inclusive Financial Planning",
    categoryId: "financial",
    subcategory: "Financial Planning",
    description:
      "Comprehensive financial planning tailored to LGBTQIA+ individuals and couples. We understand the unique challenges and opportunities our community faces in building financial security.",
    shortBio:
      "Certified Financial Planner helping LGBTQIA+ individuals build secure financial futures.",
    pronouns: "they/them",
    yearEstablished: 2018,
    city: "Seattle",
    state: "WA",
    zipCode: "98101",
    virtual: true,
    serviceArea: JSON.stringify(["Washington", "Oregon", "Virtual nationwide"]),
    email: "alex@inclusivefp.com",
    preferredContact: "EMAIL",
    responseTime: "Within 48 hours",
    status: "ACTIVE",
    specialties: JSON.stringify([
      "Retirement Planning",
      "Investment Management",
      "Tax Planning",
      "Estate Planning",
      "Insurance",
    ]),
    languages: JSON.stringify(["English", "Korean"]),
    verificationLevel: "credential",
    lgbtqOwned: true,
    affirmationStatement:
      "Financial security is a form of self-care. Let me help you plan for the future you deserve.",
    communityEndorsements: 12,
    rating: 4.7,
    reviewCount: 28,
    badges: ["affirming", "owned"],
    tags: ["lgbtq-families", "elder-lgbtq", "sliding-scale"],
  },
  {
    name: "Jordan Davis",
    businessName: "Authentic Career Coaching",
    categoryId: "career",
    subcategory: "Career Coaching",
    description:
      "Career coaching designed to help LGBTQIA+ professionals thrive authentically. From job searching to leadership development, we support you in building a fulfilling career.",
    shortBio:
      "Executive career coach empowering LGBTQIA+ professionals to lead authentically.",
    pronouns: "he/they",
    yearEstablished: 2020,
    city: "New York",
    state: "NY",
    zipCode: "10001",
    virtual: true,
    serviceArea: JSON.stringify(["Virtual worldwide"]),
    email: "jordan@authenticcareer.co",
    preferredContact: "EMAIL",
    responseTime: "Within 24 hours",
    status: "ACTIVE",
    specialties: JSON.stringify([
      "Executive Coaching",
      "Career Transitions",
      "Leadership Development",
      "Interview Prep",
      "Salary Negotiation",
    ]),
    languages: JSON.stringify(["English"]),
    verificationLevel: "community",
    lgbtqOwned: true,
    affirmationStatement:
      "Your authentic self is your greatest professional asset.",
    communityEndorsements: 8,
    rating: 4.8,
    reviewCount: 19,
    badges: ["affirming", "owned", "trained"],
    tags: ["trans-affirming", "nonbinary-affirming", "bipoc-affirming"],
  },
  {
    name: "Chris & Morgan Events",
    businessName: "Pride Celebrations Event Planning",
    categoryId: "lifestyle",
    subcategory: "Events & Weddings",
    description:
      "Full-service wedding and event planning for LGBTQIA+ couples and celebrations. We create magical, inclusive events that honor your love story.",
    shortBio:
      "LGBTQIA+-owned event planning company creating beautiful, inclusive celebrations.",
    pronouns: null,
    yearEstablished: 2017,
    city: "Los Angeles",
    state: "CA",
    zipCode: "90001",
    virtual: false,
    serviceArea: JSON.stringify(["Southern California"]),
    email: "hello@pridecelebrations.com",
    preferredContact: "EMAIL",
    responseTime: "Within 48 hours",
    status: "ACTIVE",
    specialties: JSON.stringify([
      "Weddings",
      "Commitment Ceremonies",
      "Vow Renewals",
      "Pride Events",
      "Corporate Events",
    ]),
    languages: JSON.stringify(["English", "Spanish"]),
    verificationLevel: "arcus_verified",
    lgbtqOwned: true,
    affirmationStatement:
      "Love is love, and every celebration should reflect the unique beauty of your relationship.",
    communityEndorsements: 15,
    rating: 5.0,
    reviewCount: 24,
    badges: ["verified", "affirming", "owned"],
    tags: ["lgbtq-families", "bipoc-affirming"],
  },
];

// Create admin user
async function createAdminUser() {
  const hashedPassword = await bcrypt.hash("admin123", 12);

  const admin = await prisma.user.upsert({
    where: { email: "admin@arcuspath.com" },
    update: {},
    create: {
      email: "admin@arcuspath.com",
      name: "Admin User",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log("Created admin user:", admin.email);
  return admin;
}

async function main() {
  console.log("Seeding database...");

  // Seed badges
  console.log("Seeding badges...");
  for (const badge of badges) {
    await prisma.badge.upsert({
      where: { slug: badge.slug },
      update: badge,
      create: badge,
    });
  }
  console.log(`Seeded ${badges.length} badges`);

  // Seed categories
  console.log("Seeding categories...");
  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: category,
      create: category,
    });
  }
  console.log(`Seeded ${categories.length} categories`);

  // Seed inclusive tags
  console.log("Seeding inclusive tags...");
  for (const tag of inclusiveTags) {
    await prisma.inclusiveTag.upsert({
      where: { slug: tag.slug },
      update: tag,
      create: tag,
    });
  }
  console.log(`Seeded ${inclusiveTags.length} inclusive tags`);

  // Create admin user
  await createAdminUser();

  // Seed providers
  console.log("Seeding providers...");
  for (const providerData of providers) {
    const { badges: badgeSlugs, tags: tagSlugs, ...data } = providerData;

    // Create provider
    const provider = await prisma.provider.create({
      data: {
        ...data,
        publishedAt: new Date(),
      },
    });

    // Get badge records and create provider badges
    for (const badgeSlug of badgeSlugs) {
      const badge = await prisma.badge.findUnique({
        where: { slug: badgeSlug },
      });
      if (badge) {
        await prisma.providerBadge.create({
          data: {
            providerId: provider.id,
            badgeId: badge.id,
            status: "APPROVED",
            grantedAt: new Date(),
          },
        });
      }
    }

    // Create provider inclusive tags
    for (const tagSlug of tagSlugs) {
      await prisma.providerInclusiveTag.create({
        data: {
          providerId: provider.id,
          tagSlug,
        },
      });
    }

    console.log(`Created provider: ${provider.name}`);
  }
  console.log(`Seeded ${providers.length} providers`);

  console.log("Database seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
