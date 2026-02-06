import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (
      !session?.user?.id ||
      (session.user.role !== "ADMIN" && session.user.role !== "SUPER_ADMIN")
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { action } = body;

    const vouch = await prisma.vouch.findUnique({
      where: { id },
      include: { provider: true },
    });

    if (!vouch) {
      return NextResponse.json({ error: "Vouch not found" }, { status: 404 });
    }

    let newStatus: string;
    switch (action) {
      case "approve":
        newStatus = "ACTIVE";
        break;
      case "flag":
        newStatus = "FLAGGED";
        break;
      case "remove":
        newStatus = "REMOVED";
        break;
      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    await prisma.vouch.update({
      where: { id },
      data: { status: newStatus },
    });

    // Update provider's community endorsements count
    const activeVouchCount = await prisma.vouch.count({
      where: {
        providerId: vouch.providerId,
        status: "ACTIVE",
      },
    });

    await prisma.provider.update({
      where: { id: vouch.providerId },
      data: { communityEndorsements: activeVouchCount },
    });

    return NextResponse.json({
      success: true,
      message: `Vouch ${action}d successfully`,
    });
  } catch (error) {
    console.error("Vouch moderation error:", error);
    return NextResponse.json(
      { error: "Failed to moderate vouch" },
      { status: 500 }
    );
  }
}
