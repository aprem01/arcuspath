import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
// Fallback to static data if database not seeded
import { categories as staticCategories, trustBadges as staticTrustBadges } from "@/data/categories";

export async function GET() {
  try {
    // Try to get from database first
    const [dbCategories, dbBadges] = await Promise.all([
      prisma.category.findMany({
        orderBy: { displayOrder: "asc" },
      }),
      prisma.badge.findMany({
        where: { isActive: true },
        orderBy: { displayOrder: "asc" },
      }),
    ]);

    // If database has data, use it
    if (dbCategories.length > 0) {
      return NextResponse.json({
        categories: dbCategories.map((cat) => ({
          ...cat,
          subcategories: cat.subcategories, // Already JSON string
        })),
        trustBadges: dbBadges.map((badge) => ({
          id: badge.slug,
          name: badge.name,
          description: badge.description,
          icon: badge.icon,
        })),
      });
    }

    // Fall back to static data
    return NextResponse.json({
      categories: staticCategories,
      trustBadges: staticTrustBadges,
    });
  } catch (error) {
    console.error("Categories API error:", error);
    // Fall back to static data on error
    return NextResponse.json({
      categories: staticCategories,
      trustBadges: staticTrustBadges,
    });
  }
}
