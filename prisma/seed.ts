import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Seed Categories
  const categories = [
    {
      slug: "healthcare",
      name: "Healthcare",
      icon: "Stethoscope",
      description: "Medical professionals, therapists, and wellness providers",
      subcategories: JSON.stringify([
        "Primary Care",
        "Mental Health",
        "Dental",
        "Specialty Care",
        "Physical Therapy",
        "Wellness",
      ]),
      displayOrder: 1,
    },
    {
      slug: "legal",
      name: "Legal",
      icon: "Scale",
      description: "Attorneys, legal aid, and advocacy services",
      subcategories: JSON.stringify([
        "Family Law",
        "Immigration",
        "Employment",
        "Civil Rights",
        "Estate Planning",
        "Name Change",
      ]),
      displayOrder: 2,
    },
    {
      slug: "financial",
      name: "Financial",
      icon: "DollarSign",
      description: "Financial advisors, accountants, and insurance",
      subcategories: JSON.stringify([
        "Financial Planning",
        "Tax Services",
        "Insurance",
        "Banking",
        "Investment",
        "Benefits",
      ]),
      displayOrder: 3,
    },
    {
      slug: "career",
      name: "Career",
      icon: "Briefcase",
      description: "Career coaches, recruiters, and professional development",
      subcategories: JSON.stringify([
        "Career Coaching",
        "Recruiting",
        "Resume Services",
        "Interview Prep",
        "Networking",
        "Training",
      ]),
      displayOrder: 4,
    },
    {
      slug: "lifestyle",
      name: "Lifestyle",
      icon: "Heart",
      description: "Personal services, events, and community resources",
      subcategories: JSON.stringify([
        "Real Estate",
        "Travel",
        "Events",
        "Personal Services",
        "Community",
        "Fitness",
      ]),
      displayOrder: 5,
    },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: category,
      create: category,
    });
  }
  console.log("Categories seeded");

  // Seed Badges
  const badges = [
    {
      slug: "verified",
      name: "Verified Provider",
      description: "Credentials have been verified by ArcusPath",
      icon: "BadgeCheck",
      color: "#22c55e",
      requirements: JSON.stringify([
        "Valid professional license or certification",
        "Identity verification",
        "Background check (where applicable)",
      ]),
      evidenceRequired: true,
      displayOrder: 1,
    },
    {
      slug: "affirming",
      name: "Affirming Care",
      description: "Completed LGBTQIA+ affirming care training",
      icon: "Heart",
      color: "#ec4899",
      requirements: JSON.stringify([
        "Completed approved affirming care training",
        "Certificate or documentation of training",
        "Commitment to ongoing education",
      ]),
      evidenceRequired: true,
      displayOrder: 2,
    },
    {
      slug: "owned",
      name: "LGBTQIA+ Owned",
      description: "Business is owned by LGBTQIA+ individual(s)",
      icon: "Rainbow",
      color: "#8b5cf6",
      requirements: JSON.stringify([
        "Self-attestation of LGBTQIA+ ownership",
        "Majority ownership by LGBTQIA+ individuals",
      ]),
      evidenceRequired: false,
      displayOrder: 3,
    },
    {
      slug: "trained",
      name: "Ally Trained",
      description: "Staff have completed ally training",
      icon: "Users",
      color: "#3b82f6",
      requirements: JSON.stringify([
        "Staff completed ally training program",
        "Ongoing DEI education commitment",
        "Inclusive policies in place",
      ]),
      evidenceRequired: true,
      displayOrder: 4,
    },
  ];

  for (const badge of badges) {
    await prisma.badge.upsert({
      where: { slug: badge.slug },
      update: badge,
      create: badge,
    });
  }
  console.log("Badges seeded");

  // Seed Inclusive Tags
  const inclusiveTags = [
    { slug: "trans-friendly", name: "Trans-Friendly" },
    { slug: "nonbinary-affirming", name: "Nonbinary Affirming" },
    { slug: "bilingual-spanish", name: "Bilingual (Spanish)" },
    { slug: "sliding-scale", name: "Sliding Scale Fees" },
    { slug: "accepts-medicaid", name: "Accepts Medicaid" },
    { slug: "telehealth", name: "Telehealth Available" },
    { slug: "wheelchair-accessible", name: "Wheelchair Accessible" },
    { slug: "hiv-specialized", name: "HIV Specialized Care" },
    { slug: "youth-services", name: "Youth Services" },
    { slug: "senior-services", name: "Senior Services" },
    { slug: "family-services", name: "Family Services" },
    { slug: "gender-affirming", name: "Gender-Affirming Care" },
  ];

  for (const tag of inclusiveTags) {
    await prisma.inclusiveTag.upsert({
      where: { slug: tag.slug },
      update: tag,
      create: tag,
    });
  }
  console.log("Inclusive tags seeded");

  // Seed Admin User
  const hashedPassword = await bcrypt.hash("admin123", 10);
  await prisma.user.upsert({
    where: { email: "admin@arcuspath.com" },
    update: { role: "ADMIN" },
    create: {
      email: "admin@arcuspath.com",
      name: "Admin User",
      password: hashedPassword,
      role: "ADMIN",
    },
  });
  console.log("Admin user seeded: admin@arcuspath.com / admin123");

  // Seed Sample Providers
  const healthcareCategory = await prisma.category.findUnique({
    where: { slug: "healthcare" },
  });

  if (healthcareCategory) {
    const sampleProviders = [
      {
        name: "Dr. Sarah Chen",
        businessName: "Inclusive Health Partners",
        categoryId: healthcareCategory.id,
        subcategory: "Primary Care",
        description:
          "Providing compassionate, affirming primary care to the LGBTQIA+ community for over 15 years.",
        city: "San Francisco",
        state: "CA",
        zipCode: "94102",
        virtual: true,
        email: "contact@inclusivehealthpartners.com",
        status: "ACTIVE",
        lgbtqOwned: true,
        verificationLevel: "credential",
        communityEndorsements: 12,
      },
      {
        name: "Alex Rivera, LMFT",
        businessName: "Spectrum Therapy",
        categoryId: healthcareCategory.id,
        subcategory: "Mental Health",
        description:
          "Licensed therapist specializing in LGBTQIA+ mental health, gender identity, and relationship counseling.",
        city: "Los Angeles",
        state: "CA",
        zipCode: "90028",
        virtual: true,
        email: "alex@spectrumtherapy.com",
        status: "ACTIVE",
        lgbtqOwned: true,
        verificationLevel: "community",
        communityEndorsements: 8,
      },
    ];

    for (const provider of sampleProviders) {
      const existing = await prisma.provider.findFirst({
        where: { email: provider.email },
      });
      if (!existing) {
        await prisma.provider.create({ data: provider });
      }
    }
    console.log("Sample providers seeded");
  }

  console.log("Database seeding complete!");
}

main()
  .catch((e) => {
    console.error("Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.\$disconnect();
  });
