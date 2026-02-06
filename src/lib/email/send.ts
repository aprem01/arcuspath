import { sendEmail, emailTemplates } from "./index";
import { prisma } from "@/lib/prisma";

// Send application submitted email
export async function sendApplicationSubmittedEmail(
  email: string,
  providerName: string
) {
  const template = emailTemplates.applicationSubmitted(providerName);
  return sendEmail({
    to: email,
    subject: template.subject,
    html: template.html,
  });
}

// Send application approved email
export async function sendApplicationApprovedEmail(
  email: string,
  providerName: string
) {
  const template = emailTemplates.applicationApproved(providerName);
  return sendEmail({
    to: email,
    subject: template.subject,
    html: template.html,
  });
}

// Send application rejected email
export async function sendApplicationRejectedEmail(
  email: string,
  providerName: string,
  reason: string
) {
  const template = emailTemplates.applicationRejected(providerName, reason);
  return sendEmail({
    to: email,
    subject: template.subject,
    html: template.html,
  });
}

// Send badge approved email
export async function sendBadgeApprovedEmail(
  email: string,
  providerName: string,
  badgeName: string
) {
  const template = emailTemplates.badgeApproved(providerName, badgeName);
  return sendEmail({
    to: email,
    subject: template.subject,
    html: template.html,
  });
}

// Send new vouch notification email
export async function sendNewVouchEmail(providerId: string, relationship: string) {
  const provider = await prisma.provider.findUnique({
    where: { id: providerId },
    include: { user: { select: { email: true } } },
  });

  if (!provider?.user?.email) return;

  const relationshipLabels: Record<string, string> = {
    client: "Client",
    colleague: "Colleague",
    community_member: "Community Member",
    family_friend: "Family/Friend",
  };

  const template = emailTemplates.newVouch(
    provider.name,
    relationshipLabels[relationship] || relationship
  );

  return sendEmail({
    to: provider.user.email,
    subject: template.subject,
    html: template.html,
  });
}

// Send referral completed email
export async function sendReferralCompletedEmail(
  userId: string,
  rewardAmount: number
) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { email: true, name: true },
  });

  if (!user?.email) return;

  const template = emailTemplates.referralCompleted(
    user.name || "there",
    rewardAmount
  );

  return sendEmail({
    to: user.email,
    subject: template.subject,
    html: template.html,
  });
}

// Send welcome email
export async function sendWelcomeEmail(email: string, name: string) {
  const template = emailTemplates.welcome(name || "there");
  return sendEmail({
    to: email,
    subject: template.subject,
    html: template.html,
  });
}

// Notify admins of new application
export async function notifyAdminsOfNewApplication(
  providerName: string,
  applicationId: string
) {
  const admins = await prisma.user.findMany({
    where: { role: { in: ["ADMIN", "SUPER_ADMIN"] } },
    select: { email: true },
  });

  if (admins.length === 0) return;

  const adminEmails = admins.map((a) => a.email).filter(Boolean) as string[];

  return sendEmail({
    to: adminEmails,
    subject: `New Provider Application: ${providerName}`,
    html: `
      <h2>New Provider Application</h2>
      <p>A new provider application has been submitted for review.</p>
      <p><strong>Provider:</strong> ${providerName}</p>
      <p><a href="${process.env.NEXT_PUBLIC_APP_URL || "https://arcuspath.com"}/admin/applications/${applicationId}">Review Application</a></p>
    `,
  });
}
