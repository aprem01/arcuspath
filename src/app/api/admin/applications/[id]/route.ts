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
    const { action, reason } = body;

    const application = await prisma.providerApplication.findUnique({
      where: { id },
      include: { provider: true },
    });

    if (!application) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 }
      );
    }

    if (application.status !== "SUBMITTED") {
      return NextResponse.json(
        { error: "Application is not pending review" },
        { status: 400 }
      );
    }

    if (action === "approve") {
      // Update application status
      await prisma.providerApplication.update({
        where: { id },
        data: {
          status: "APPROVED",
          reviewedBy: session.user.id,
        },
      });

      // Update provider status to APPROVED
      await prisma.provider.update({
        where: { id: application.providerId },
        data: { status: "APPROVED" },
      });

      // TODO: Send approval email notification

      return NextResponse.json({
        success: true,
        message: "Application approved",
      });
    }

    if (action === "reject") {
      if (!reason) {
        return NextResponse.json(
          { error: "Rejection reason is required" },
          { status: 400 }
        );
      }

      // Update application status
      await prisma.providerApplication.update({
        where: { id },
        data: {
          status: "REJECTED",
          reviewedBy: session.user.id,
          rejectionReason: reason,
        },
      });

      // Update provider status
      await prisma.provider.update({
        where: { id: application.providerId },
        data: { status: "SUSPENDED" },
      });

      // TODO: Send rejection email notification with reason

      return NextResponse.json({
        success: true,
        message: "Application rejected",
      });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Application review error:", error);
    return NextResponse.json(
      { error: "Failed to process application" },
      { status: 500 }
    );
  }
}
