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
    const { status } = body;

    const validStatuses = [
      "DRAFT",
      "PENDING_REVIEW",
      "APPROVED",
      "ACTIVE",
      "SUSPENDED",
    ];

    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const provider = await prisma.provider.findUnique({
      where: { id },
    });

    if (!provider) {
      return NextResponse.json(
        { error: "Provider not found" },
        { status: 404 }
      );
    }

    await prisma.provider.update({
      where: { id },
      data: { status },
    });

    // TODO: Send email notification about status change

    return NextResponse.json({
      success: true,
      message: `Provider status updated to ${status}`,
    });
  } catch (error) {
    console.error("Provider update error:", error);
    return NextResponse.json(
      { error: "Failed to update provider" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (session?.user?.role !== "SUPER_ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    // Soft delete - just suspend the provider
    await prisma.provider.update({
      where: { id },
      data: { status: "SUSPENDED" },
    });

    return NextResponse.json({
      success: true,
      message: "Provider suspended",
    });
  } catch (error) {
    console.error("Provider delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete provider" },
      { status: 500 }
    );
  }
}
