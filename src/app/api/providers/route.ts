import { NextRequest, NextResponse } from "next/server";
import { searchProviders } from "@/data/providers";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const query = searchParams.get("q") || undefined;
  const category = searchParams.get("category") || undefined;
  const subcategory = searchParams.get("subcategory") || undefined;
  const location = searchParams.get("location") || undefined;
  const badges = searchParams.get("badges")?.split(",") || undefined;

  const providers = searchProviders(query, category, subcategory, location, badges);

  return NextResponse.json({
    providers,
    total: providers.length,
    filters: { query, category, subcategory, location, badges },
  });
}
