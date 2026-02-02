import { NextResponse } from "next/server";
import { categories, trustBadges } from "@/data/categories";

export async function GET() {
  return NextResponse.json({
    categories,
    trustBadges,
  });
}
