import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import ReferralCodeCard from "@/components/referrals/ReferralCodeCard";
import ReferralStats from "@/components/referrals/ReferralStats";
import ReferralList from "@/components/referrals/ReferralList";
import { ArrowLeft, Gift } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Referrals | ArcusPath",
  description: "Share ArcusPath and earn rewards",
};

export default async function ReferralsPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/auth/signin?callbackUrl=/account/referrals");
  }

  // Get or create referral code
  let referralCode = await prisma.referralCode.findUnique({
    where: { userId: session.user.id },
    include: {
      referrals: {
        orderBy: { createdAt: "desc" },
        take: 20,
      },
    },
  });

  if (!referralCode) {
    // Generate a new code
    const code = generateReferralCode(session.user.name);
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link
          href="/account"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Account
        </Link>

        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-gradient-to-r from-purple-600 to-pink-500 rounded-xl">
            <Gift className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Referral Program</h1>
            <p className="text-gray-600">
              Invite friends and earn rewards when they join ArcusPath
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Referral Code Card */}
          <ReferralCodeCard code={referralCode.code} />

          {/* Stats */}
          <ReferralStats
            totalClicks={referralCode.totalClicks}
            totalReferrals={referralCode.totalReferrals}
            successfulReferrals={referralCode.successfulReferrals}
            rewardsEarned={Number(referralCode.rewardsEarned)}
          />

          {/* How it works */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">How It Works</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl font-bold text-purple-600">1</span>
                </div>
                <h4 className="font-medium text-gray-900 mb-1">Share Your Code</h4>
                <p className="text-sm text-gray-500">
                  Send your unique referral link to friends
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl font-bold text-purple-600">2</span>
                </div>
                <h4 className="font-medium text-gray-900 mb-1">They Sign Up</h4>
                <p className="text-sm text-gray-500">
                  Your friend creates an account using your link
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl font-bold text-purple-600">3</span>
                </div>
                <h4 className="font-medium text-gray-900 mb-1">Earn Rewards</h4>
                <p className="text-sm text-gray-500">
                  Get $10 when they become a verified provider
                </p>
              </div>
            </div>
          </div>

          {/* Referral List */}
          <ReferralList
            referrals={referralCode.referrals.map((r) => ({
              id: r.id,
              referredEmail: r.referredEmail,
              status: r.status,
              createdAt: r.createdAt.toISOString(),
              convertedAt: r.convertedAt?.toISOString() || null,
              rewardAmount: r.rewardAmount ? Number(r.rewardAmount) : null,
            }))}
          />
        </div>
      </div>
    </div>
  );
}

function generateReferralCode(name?: string | null): string {
  const prefix = name
    ? name.toUpperCase().replace(/[^A-Z]/g, "").slice(0, 4)
    : "REF";
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}${random}`;
}
