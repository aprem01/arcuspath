import { Category } from "@/lib/types";

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
    ],
    providerCount: 156,
  },
];

export const trustBadges = [
  {
    id: "verified" as const,
    name: "Verified Provider",
    description: "Identity and credentials have been verified by ArcusPath",
  },
  {
    id: "affirming" as const,
    name: "LGBTQIA+ Affirming",
    description: "Demonstrated commitment to affirming, inclusive care",
  },
  {
    id: "owned" as const,
    name: "LGBTQIA+ Owned",
    description: "Business is owned by an LGBTQIA+ community member",
  },
  {
    id: "trained" as const,
    name: "Competency Trained",
    description: "Completed LGBTQIA+ cultural competency training",
  },
];
