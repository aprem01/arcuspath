import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is admin
    if (
      session.user.role !== "ADMIN" &&
      session.user.role !== "SUPER_ADMIN"
    ) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id } = await params;
    const body = await request.json();
    const { action, notes } = body;

    if (!action || !["approve", "reject"].includes(action)) {
      return NextResponse.json(
        { error: "Invalid action. Must be 'approve' or 'reject'" },
        { status: 400 }
      );
    }

    // Get the badge application
    const providerBadge = await prisma.providerBadge.findUnique({
      where: { id },
      include: { badge: true },
    });

    if (!providerBadge) {
      return NextResponse.json(
        { error: "Badge application not found" },
        { status: 404 }
      );
    }

    if (providerBadge.status !== "PENDING") {
      return NextResponse.json(
        { error: "Badge application has already been reviewed" },
        { status: 400 }
      );
    }

    // Update the badge application
    const updatedBadge = await prisma.providerBadge.update({
      where: { id },
      data: {
        status: action === "approve" ? "APPROVED" : "REJECTED",
        reviewedAt: new Date(),
        reviewedBy: session.user.id,
        reviewNotes: notes || null,
        grantedAt: action === "approve" ? new Date() : null,
        // Set expiration to 1 year for approved badges
        expiresAt:
          action === "approve"
            ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
            : null,
      },
    });

    // If approved, update provider's community endorsements count
    if (action === "approve") {
      await prisma.provider.update({
        where: { id: providerBadge.providerId },
        data: {
          communityEndorsements: { increment: 1 },
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: `Badge ${action === "approve" ? "approved" : "rejected"} successfully`,
      badge: updatedBadge,
    });
  } catch (error) {
    console.error("Badge review error:", error);
    return NextResponse.json(
      { error: "Failed to review badge" },
      { status: 500 }
    );
  }
}
