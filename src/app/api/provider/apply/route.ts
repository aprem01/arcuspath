import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { step1, step2, step3, step4 } = body;

    // Validate required fields
    if (!step1 || !step2 || !step3 || !step4) {
      return NextResponse.json(
        { error: "All steps must be completed" },
        { status: 400 }
      );
    }

    // Check if user is authenticated
    const session = await auth();
    const userId = session?.user?.id || null;

    // Create the provider
    const provider = await prisma.provider.create({
      data: {
        // Link to user if authenticated
        userId,

        // Step 1: Basic Info
        name: step1.name,
        businessName: step1.businessName || null,
        categoryId: step1.categoryId,
        subcategory: step1.subcategory,
        description: step1.description,
        shortBio: step1.shortBio,
        pronouns: step1.pronouns || null,
        yearEstablished: step1.yearEstablished || null,

        // Step 2: Location
        city: step2.city,
        state: step2.state,
        zipCode: step2.zipCode || null,
        virtual: step2.virtual || false,
        serviceArea: step2.serviceArea ? JSON.stringify(step2.serviceArea) : null,

        // Step 3: Credentials - stored separately
        specialties: JSON.stringify(step3.specialties || []),
        languages: JSON.stringify(step3.languages || []),

        // Step 4: Trust Profile
        lgbtqOwned: step4.lgbtqOwned || false,
        affirmationStatement: step4.affirmationStatement,
        verificationLevel: "self",

        // Status
        status: "PENDING_REVIEW",
      },
    });

    // Create credentials
    if (step3.credentials && step3.credentials.length > 0) {
      await prisma.credential.createMany({
        data: step3.credentials.map((cred: {
          type: string;
          name: string;
          issuingBody?: string;
          licenseNumber?: string;
          expiresAt?: string;
        }) => ({
          providerId: provider.id,
          type: cred.type,
          name: cred.name,
          issuingBody: cred.issuingBody || "",
          licenseNumber: cred.licenseNumber || null,
          expiresAt: cred.expiresAt ? new Date(cred.expiresAt) : null,
          status: "PENDING",
        })),
      });
    }

    // Create inclusive tags
    if (step4.inclusiveTags && step4.inclusiveTags.length > 0) {
      await prisma.providerInclusiveTag.createMany({
        data: step4.inclusiveTags.map((tagSlug: string) => ({
          providerId: provider.id,
          tagSlug,
        })),
      });
    }

    // Create badge requests
    if (step4.requestedBadges && step4.requestedBadges.length > 0) {
      // Get badge IDs
      const badges = await prisma.badge.findMany({
        where: { slug: { in: step4.requestedBadges } },
      });

      if (badges.length > 0) {
        await prisma.providerBadge.createMany({
          data: badges.map((badge) => ({
            providerId: provider.id,
            badgeId: badge.id,
            status: "PENDING",
          })),
        });
      }
    }

    // Create application record
    await prisma.providerApplication.create({
      data: {
        providerId: provider.id,
        currentStep: 5,
        status: "SUBMITTED",
        step1Data: JSON.stringify(step1),
        step2Data: JSON.stringify(step2),
        step3Data: JSON.stringify(step3),
        step4Data: JSON.stringify(step4),
        submittedAt: new Date(),
      },
    });

    // Update user role if authenticated
    if (userId) {
      await prisma.user.update({
        where: { id: userId },
        data: { role: "PROVIDER" },
      });
    }

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully",
      providerId: provider.id,
    });
  } catch (error) {
    console.error("Provider application error:", error);
    return NextResponse.json(
      { error: "Failed to submit application" },
      { status: 500 }
    );
  }
}

// Get application status
export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const provider = await prisma.provider.findUnique({
      where: { userId: session.user.id },
      include: {
        application: true,
        credentials: true,
        badges: {
          include: { badge: true },
        },
      },
    });

    if (!provider) {
      return NextResponse.json({
        hasApplication: false,
      });
    }

    return NextResponse.json({
      hasApplication: true,
      provider: {
        id: provider.id,
        name: provider.name,
        status: provider.status,
        application: provider.application,
        credentials: provider.credentials,
        badges: provider.badges,
      },
    });
  } catch (error) {
    console.error("Get application error:", error);
    return NextResponse.json(
      { error: "Failed to get application status" },
      { status: 500 }
    );
  }
}
