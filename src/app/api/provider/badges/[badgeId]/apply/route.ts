import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ badgeId: string }> }
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { badgeId } = await params;
    const body = await request.json();
    const { evidence } = body;

    // Get the provider
    const provider = await prisma.provider.findUnique({
      where: { userId: session.user.id },
    });

    if (!provider) {
      return NextResponse.json(
        { error: "Provider profile not found" },
        { status: 404 }
      );
    }

    // Check if badge exists
    const badge = await prisma.badge.findUnique({
      where: { id: badgeId },
    });

    if (!badge) {
      return NextResponse.json({ error: "Badge not found" }, { status: 404 });
    }

    // Check if already has this badge application
    const existingApplication = await prisma.providerBadge.findUnique({
      where: {
        providerId_badgeId: {
          providerId: provider.id,
          badgeId: badgeId,
        },
      },
    });

    if (existingApplication) {
      if (existingApplication.status === "APPROVED") {
        return NextResponse.json(
          { error: "You already have this badge" },
          { status: 400 }
        );
      }

      if (existingApplication.status === "PENDING") {
        return NextResponse.json(
          { error: "You already have a pending application for this badge" },
          { status: 400 }
        );
      }

      // Update existing rejected application
      await prisma.providerBadge.update({
        where: { id: existingApplication.id },
        data: {
          status: "PENDING",
          evidence: evidence || null,
          appliedAt: new Date(),
          reviewedAt: null,
          reviewedBy: null,
          reviewNotes: null,
        },
      });
    } else {
      // Create new application
      await prisma.providerBadge.create({
        data: {
          providerId: provider.id,
          badgeId: badgeId,
          status: "PENDING",
          evidence: evidence || null,
          appliedAt: new Date(),
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: "Badge application submitted successfully",
    });
  } catch (error) {
    console.error("Badge application error:", error);
    return NextResponse.json(
      { error: "Failed to submit badge application" },
      { status: 500 }
    );
  }
}
