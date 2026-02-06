import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// POST - Submit a vouch
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: providerId } = await params;
    const body = await request.json();
    const { relationship, comment, isAnonymous } = body;

    // Validate relationship
    const validRelationships = [
      "client",
      "colleague",
      "community_member",
      "family_friend",
    ];
    if (!relationship || !validRelationships.includes(relationship)) {
      return NextResponse.json(
        { error: "Invalid relationship type" },
        { status: 400 }
      );
    }

    // Check if provider exists
    const provider = await prisma.provider.findUnique({
      where: { id: providerId },
    });

    if (!provider) {
      return NextResponse.json(
        { error: "Provider not found" },
        { status: 404 }
      );
    }

    // Check if user has already vouched
    const existingVouch = await prisma.vouch.findUnique({
      where: {
        providerId_userId: {
          providerId,
          userId: session.user.id,
        },
      },
    });

    if (existingVouch) {
      if (existingVouch.status === "ACTIVE") {
        return NextResponse.json(
          { error: "You have already vouched for this provider" },
          { status: 400 }
        );
      }

      // Reactivate removed vouch
      await prisma.vouch.update({
        where: { id: existingVouch.id },
        data: {
          relationship,
          comment: comment || null,
          isAnonymous: isAnonymous || false,
          status: "ACTIVE",
          updatedAt: new Date(),
        },
      });
    } else {
      // Create new vouch
      await prisma.vouch.create({
        data: {
          providerId,
          userId: session.user.id,
          relationship,
          comment: comment || null,
          isAnonymous: isAnonymous || false,
          status: "ACTIVE",
        },
      });
    }

    // Update provider's community endorsements count
    const vouchCount = await prisma.vouch.count({
      where: { providerId, status: "ACTIVE" },
    });

    await prisma.provider.update({
      where: { id: providerId },
      data: { communityEndorsements: vouchCount },
    });

    return NextResponse.json({
      success: true,
      message: "Vouch submitted successfully",
    });
  } catch (error) {
    console.error("Vouch submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit vouch" },
      { status: 500 }
    );
  }
}

// GET - Get vouches for a provider
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: providerId } = await params;

    const vouches = await prisma.vouch.findMany({
      where: {
        providerId,
        status: "ACTIVE",
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    // Process vouches to hide names for anonymous ones
    const processedVouches = vouches.map((vouch) => ({
      id: vouch.id,
      relationship: vouch.relationship,
      comment: vouch.comment,
      isAnonymous: vouch.isAnonymous,
      isVerified: vouch.isVerified,
      createdAt: vouch.createdAt,
      user: vouch.isAnonymous
        ? { name: "Anonymous", image: null }
        : { name: vouch.user.name, image: vouch.user.image },
    }));

    return NextResponse.json({
      vouches: processedVouches,
      total: vouches.length,
    });
  } catch (error) {
    console.error("Get vouches error:", error);
    return NextResponse.json(
      { error: "Failed to get vouches" },
      { status: 500 }
    );
  }
}

// DELETE - Remove a vouch
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: providerId } = await params;

    const vouch = await prisma.vouch.findUnique({
      where: {
        providerId_userId: {
          providerId,
          userId: session.user.id,
        },
      },
    });

    if (!vouch) {
      return NextResponse.json({ error: "Vouch not found" }, { status: 404 });
    }

    await prisma.vouch.update({
      where: { id: vouch.id },
      data: { status: "REMOVED" },
    });

    // Update provider's community endorsements count
    const vouchCount = await prisma.vouch.count({
      where: { providerId, status: "ACTIVE" },
    });

    await prisma.provider.update({
      where: { id: providerId },
      data: { communityEndorsements: vouchCount },
    });

    return NextResponse.json({
      success: true,
      message: "Vouch removed successfully",
    });
  } catch (error) {
    console.error("Remove vouch error:", error);
    return NextResponse.json(
      { error: "Failed to remove vouch" },
      { status: 500 }
    );
  }
}
