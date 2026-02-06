import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// POST - Track a referral click/signup
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code, action, email, userId } = body;

    if (!code) {
      return NextResponse.json(
        { error: "Referral code is required" },
        { status: 400 }
      );
    }

    // Find the referral code
    const referralCode = await prisma.referralCode.findUnique({
      where: { code },
      include: { user: true },
    });

    if (!referralCode || !referralCode.isActive) {
      return NextResponse.json(
        { error: "Invalid or inactive referral code" },
        { status: 400 }
      );
    }

    // Track click
    if (action === "click") {
      await prisma.referralCode.update({
        where: { id: referralCode.id },
        data: { totalClicks: { increment: 1 } },
      });

      return NextResponse.json({ success: true, action: "click_tracked" });
    }

    // Track signup
    if (action === "signup" && (email || userId)) {
      // Check if this email/user already has a referral
      const existingReferral = await prisma.referral.findFirst({
        where: {
          OR: [
            email ? { referredEmail: email } : {},
            userId ? { referredUserId: userId } : {},
          ].filter((o) => Object.keys(o).length > 0),
        },
      });

      if (existingReferral) {
        return NextResponse.json({
          success: false,
          message: "Already referred",
        });
      }

      // Create referral record
      await prisma.referral.create({
        data: {
          referralCodeId: referralCode.id,
          referringUserId: referralCode.userId,
          referredEmail: email || null,
          referredUserId: userId || null,
          status: userId ? "SIGNED_UP" : "PENDING",
          convertedAt: userId ? new Date() : null,
        },
      });

      // Update stats
      await prisma.referralCode.update({
        where: { id: referralCode.id },
        data: {
          totalReferrals: { increment: 1 },
          successfulReferrals: userId ? { increment: 1 } : undefined,
        },
      });

      return NextResponse.json({ success: true, action: "signup_tracked" });
    }

    // Mark referral as completed (e.g., provider approved)
    if (action === "complete" && userId) {
      const referral = await prisma.referral.findFirst({
        where: { referredUserId: userId },
      });

      if (referral && referral.status !== "COMPLETED") {
        await prisma.referral.update({
          where: { id: referral.id },
          data: {
            status: "COMPLETED",
            convertedAt: new Date(),
            rewardAmount: 10.0, // Example reward amount
          },
        });

        // Update referral code stats
        await prisma.referralCode.update({
          where: { id: referral.referralCodeId },
          data: {
            successfulReferrals: { increment: 1 },
            rewardsEarned: { increment: 10.0 },
          },
        });
      }

      return NextResponse.json({ success: true, action: "completed" });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Referral tracking error:", error);
    return NextResponse.json(
      { error: "Failed to track referral" },
      { status: 500 }
    );
  }
}

// GET - Get referral info by code (public)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json(
      { error: "Code is required" },
      { status: 400 }
    );
  }

  try {
    const referralCode = await prisma.referralCode.findUnique({
      where: { code },
      include: {
        user: {
          select: { name: true },
        },
      },
    });

    if (!referralCode || !referralCode.isActive) {
      return NextResponse.json({ valid: false });
    }

    return NextResponse.json({
      valid: true,
      referrerName: referralCode.user.name,
    });
  } catch (error) {
    console.error("Get referral error:", error);
    return NextResponse.json(
      { error: "Failed to validate code" },
      { status: 500 }
    );
  }
}
