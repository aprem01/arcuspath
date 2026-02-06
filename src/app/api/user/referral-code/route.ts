import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// Generate a unique referral code
function generateReferralCode(name?: string | null): string {
  const prefix = name
    ? name.toUpperCase().replace(/[^A-Z]/g, "").slice(0, 4)
    : "REF";
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}${random}`;
}

// GET - Get or create referral code for current user
export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user already has a referral code
    let referralCode = await prisma.referralCode.findUnique({
      where: { userId: session.user.id },
      include: {
        referrals: {
          orderBy: { createdAt: "desc" },
          take: 10,
        },
      },
    });

    // Create one if doesn't exist
    if (!referralCode) {
      // Generate unique code
      let code = generateReferralCode(session.user.name);
      let attempts = 0;

      while (attempts < 10) {
        const existing = await prisma.referralCode.findUnique({
          where: { code },
        });
        if (!existing) break;
        code = generateReferralCode(session.user.name);
        attempts++;
      }

      referralCode = await prisma.referralCode.create({
        data: {
          userId: session.user.id,
          code,
        },
        include: {
          referrals: true,
        },
      });
    }

    return NextResponse.json({
      code: referralCode.code,
      stats: {
        totalClicks: referralCode.totalClicks,
        totalReferrals: referralCode.totalReferrals,
        successfulReferrals: referralCode.successfulReferrals,
        rewardsEarned: referralCode.rewardsEarned,
        rewardsPaid: referralCode.rewardsPaid,
      },
      recentReferrals: referralCode.referrals.map((r) => ({
        id: r.id,
        status: r.status,
        createdAt: r.createdAt,
        convertedAt: r.convertedAt,
      })),
      shareUrl: `${process.env.NEXTAUTH_URL || "https://arcuspath.vercel.app"}?ref=${referralCode.code}`,
    });
  } catch (error) {
    console.error("Get referral code error:", error);
    return NextResponse.json(
      { error: "Failed to get referral code" },
      { status: 500 }
    );
  }
}
