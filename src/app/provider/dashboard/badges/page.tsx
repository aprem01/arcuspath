import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import BadgeApplicationClient from "./BadgeApplicationClient";

export default async function ProviderBadgesPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/signin?callbackUrl=/provider/dashboard/badges");
  }

  // Get provider with their badges
  const provider = await prisma.provider.findUnique({
    where: { userId: session.user.id },
    include: {
      badges: {
        include: { badge: true },
      },
    },
  });

  if (!provider) {
    redirect("/provider/apply");
  }

  // Get all available badges
  const allBadges = await prisma.badge.findMany({
    where: { isActive: true },
    orderBy: { displayOrder: "asc" },
  });

  // Map provider badges for easy lookup
  const providerBadgeMap = new Map(
    provider.badges.map((pb) => [pb.badgeId, pb])
  );

  // Combine badge info with provider's application status
  const badgesWithStatus = allBadges.map((badge) => {
    const providerBadge = providerBadgeMap.get(badge.id);
    return {
      ...badge,
      applicationStatus: providerBadge?.status || null,
      grantedAt: providerBadge?.grantedAt,
      expiresAt: providerBadge?.expiresAt,
      evidence: providerBadge?.evidence,
      reviewNotes: providerBadge?.reviewNotes,
    };
  });

  return (
    <BadgeApplicationClient
      providerId={provider.id}
      badges={badgesWithStatus}
      lgbtqOwned={provider.lgbtqOwned}
    />
  );
}
