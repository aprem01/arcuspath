import { NextRequest, NextResponse } from "next/server";
import { createReport, getAllReports, getReportStats } from "@/data/reports";
import { ReportReason } from "@/lib/types";

// Valid report reasons for validation
const VALID_REASONS: ReportReason[] = [
  "discrimination",
  "unsafe-practices",
  "false-credentials",
  "harassment",
  "privacy-violation",
  "misrepresentation",
  "other",
];

/**
 * POST /api/reports - Create a new report
 * Privacy-safe: Uses session ID, not user identity
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { providerId, reason, description } = body;

    // Validation
    if (!providerId || typeof providerId !== "string") {
      return NextResponse.json(
        { success: false, error: { code: "INVALID_PROVIDER", message: "Provider ID is required" } },
        { status: 400 }
      );
    }

    if (!reason || !VALID_REASONS.includes(reason)) {
      return NextResponse.json(
        { success: false, error: { code: "INVALID_REASON", message: "Valid report reason is required" } },
        { status: 400 }
      );
    }

    if (!description || typeof description !== "string" || description.trim().length < 10) {
      return NextResponse.json(
        {
          success: false,
          error: { code: "INVALID_DESCRIPTION", message: "Description must be at least 10 characters" },
        },
        { status: 400 }
      );
    }

    if (description.length > 2000) {
      return NextResponse.json(
        { success: false, error: { code: "DESCRIPTION_TOO_LONG", message: "Description must be under 2000 characters" } },
        { status: 400 }
      );
    }

    // Generate anonymous session ID from request
    // In production, use a proper session management system
    const sessionId =
      request.headers.get("x-session-id") ||
      `anon-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const report = createReport(providerId, reason, description.trim(), sessionId);

    return NextResponse.json({
      success: true,
      data: {
        id: report.id,
        status: report.status,
        message: "Thank you for your report. We take all reports seriously and will review this promptly.",
      },
    });
  } catch {
    return NextResponse.json(
      { success: false, error: { code: "SERVER_ERROR", message: "Failed to submit report" } },
      { status: 500 }
    );
  }
}

/**
 * GET /api/reports - Get reports (admin only - add auth in production)
 */
export async function GET(request: NextRequest) {
  // In production, add authentication check here
  const searchParams = request.nextUrl.searchParams;
  const status = searchParams.get("status") as any;
  const statsOnly = searchParams.get("stats") === "true";

  if (statsOnly) {
    return NextResponse.json({ success: true, data: getReportStats() });
  }

  const reports = getAllReports(status || undefined);
  return NextResponse.json({ success: true, data: reports });
}
