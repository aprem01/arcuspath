import { prisma } from "@/lib/prisma";
import BadgeReviewClient from "./BadgeReviewClient";

export default async function AdminBadgesPage() {
  // Get all pending badge requests with provider info
  const pendingBadges = await prisma.providerBadge.findMany({
    where: { status: "PENDING" },
    include: {
      provider: {
        select: {
          id: true,
          name: true,
          businessName: true,
          categoryId: true,
          lgbtqOwned: true,
        },
      },
      badge: true,
    },
    orderBy: { appliedAt: "asc" },
  });

  // Get recent approved/rejected badges
  const recentBadges = await prisma.providerBadge.findMany({
    where: {
      status: { in: ["APPROVED", "REJECTED"] },
      reviewedAt: { not: null },
    },
    include: {
      provider: {
        select: {
          id: true,
          name: true,
        },
      },
      badge: true,
    },
    orderBy: { reviewedAt: "desc" },
    take: 10,
  });

  return (
    <BadgeReviewClient
      pendingBadges={pendingBadges.map((pb) => ({
        id: pb.id,
        providerId: pb.providerId,
        providerName: pb.provider.name,
        providerBusiness: pb.provider.businessName,
        providerCategory: pb.provider.categoryId,
        lgbtqOwned: pb.provider.lgbtqOwned,
        badgeId: pb.badgeId,
        badgeName: pb.badge.name,
        badgeSlug: pb.badge.slug,
        evidence: pb.evidence,
        appliedAt: pb.appliedAt,
      }))}
      recentBadges={recentBadges.map((pb) => ({
        id: pb.id,
        providerName: pb.provider.name,
        badgeName: pb.badge.name,
        status: pb.status,
        reviewedAt: pb.reviewedAt,
      }))}
    />
  );
}
