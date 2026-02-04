import { NextRequest, NextResponse } from "next/server";
import { searchProviders } from "@/data/providers";
import { SearchFilters, SortOption, TrustBadgeId, InclusiveTag, VerificationLevel } from "@/lib/types";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  // Build filters object
  const filters: SearchFilters = {};

  const query = searchParams.get("q");
  if (query) filters.query = query;

  const category = searchParams.get("category");
  if (category) filters.category = category;

  const subcategory = searchParams.get("subcategory");
  if (subcategory) filters.subcategory = subcategory;

  const location = searchParams.get("location");
  if (location) filters.location = location;

  const virtual = searchParams.get("virtual");
  if (virtual === "true") filters.virtual = true;

  const badges = searchParams.get("badges");
  if (badges) filters.badges = badges.split(",") as TrustBadgeId[];

  const tags = searchParams.get("tags");
  if (tags) filters.inclusiveTags = tags.split(",") as InclusiveTag[];

  const verificationLevel = searchParams.get("verificationLevel");
  if (verificationLevel) filters.verificationLevel = verificationLevel as VerificationLevel;

  const lgbtqOwned = searchParams.get("lgbtqOwned");
  if (lgbtqOwned === "true") filters.lgbtqOwned = true;

  // Get sort option (default to trust)
  const sort = (searchParams.get("sort") || "trust") as SortOption;

  // Get pagination
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = parseInt(searchParams.get("pageSize") || "20", 10);

  const result = searchProviders(filters, sort, page, pageSize);

  return NextResponse.json(result);
}
