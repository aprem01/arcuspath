import { Resend } from "resend";

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = process.env.FROM_EMAIL || "ArcusPath <noreply@arcuspath.com>";

export interface SendEmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail(options: SendEmailOptions) {
  if (!process.env.RESEND_API_KEY) {
    console.log("Email would be sent:", options);
    return { success: true, message: "Email skipped (no API key)" };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: Array.isArray(options.to) ? options.to : [options.to],
      subject: options.subject,
      html: options.html,
      text: options.text,
    });

    if (error) {
      console.error("Email send error:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Email send exception:", error);
    return { success: false, error };
  }
}

// Email templates
export const emailTemplates = {
  // Application submitted
  applicationSubmitted: (providerName: string) => ({
    subject: "Application Received - ArcusPath",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #374151; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { text-align: center; padding: 20px 0; }
            .logo { font-size: 24px; font-weight: bold; background: linear-gradient(to right, #9333ea, #ec4899); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
            .content { background: #f9fafb; border-radius: 12px; padding: 24px; margin: 20px 0; }
            .button { display: inline-block; background: linear-gradient(to right, #9333ea, #ec4899); color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; }
            .footer { text-align: center; color: #9ca3af; font-size: 14px; padding-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">ArcusPath</div>
            </div>
            <div class="content">
              <h2>Application Received!</h2>
              <p>Hi ${providerName},</p>
              <p>Thank you for submitting your provider application to ArcusPath. We're excited to potentially welcome you to our community of LGBTQIA+-affirming professionals!</p>
              <p>Our team will review your application and typically respond within 3-5 business days. We may reach out if we need any additional information.</p>
              <p>In the meantime, you can check your application status in your provider dashboard.</p>
              <p style="text-align: center; margin-top: 24px;">
                <a href="${process.env.NEXT_PUBLIC_APP_URL || "https://arcuspath.com"}/provider/dashboard" class="button">View Dashboard</a>
              </p>
            </div>
            <div class="footer">
              <p>Questions? Reply to this email or contact us at support@arcuspath.com</p>
              <p>&copy; ${new Date().getFullYear()} ArcusPath. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `,
  }),

  // Application approved
  applicationApproved: (providerName: string) => ({
    subject: "Congratulations! Your Application is Approved - ArcusPath",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #374151; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { text-align: center; padding: 20px 0; }
            .logo { font-size: 24px; font-weight: bold; background: linear-gradient(to right, #9333ea, #ec4899); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
            .content { background: #f9fafb; border-radius: 12px; padding: 24px; margin: 20px 0; }
            .success-icon { font-size: 48px; text-align: center; }
            .button { display: inline-block; background: linear-gradient(to right, #9333ea, #ec4899); color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; }
            .footer { text-align: center; color: #9ca3af; font-size: 14px; padding-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">ArcusPath</div>
            </div>
            <div class="content">
              <div class="success-icon">🎉</div>
              <h2 style="text-align: center;">Welcome to ArcusPath!</h2>
              <p>Hi ${providerName},</p>
              <p>Great news! Your provider application has been approved. You're now officially part of the ArcusPath community of LGBTQIA+-affirming professionals.</p>
              <h3>Next Steps:</h3>
              <ul>
                <li>Complete your profile to make it easier for clients to find you</li>
                <li>Apply for trust badges to build credibility</li>
                <li>Share your profile with your network</li>
              </ul>
              <p style="text-align: center; margin-top: 24px;">
                <a href="${process.env.NEXT_PUBLIC_APP_URL || "https://arcuspath.com"}/provider/dashboard" class="button">Complete Your Profile</a>
              </p>
            </div>
            <div class="footer">
              <p>Welcome to the community!</p>
              <p>&copy; ${new Date().getFullYear()} ArcusPath. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `,
  }),

  // Application rejected
  applicationRejected: (providerName: string, reason: string) => ({
    subject: "Application Update - ArcusPath",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #374151; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { text-align: center; padding: 20px 0; }
            .logo { font-size: 24px; font-weight: bold; background: linear-gradient(to right, #9333ea, #ec4899); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
            .content { background: #f9fafb; border-radius: 12px; padding: 24px; margin: 20px 0; }
            .reason-box { background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 16px; margin: 16px 0; }
            .footer { text-align: center; color: #9ca3af; font-size: 14px; padding-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">ArcusPath</div>
            </div>
            <div class="content">
              <h2>Application Update</h2>
              <p>Hi ${providerName},</p>
              <p>Thank you for your interest in joining ArcusPath. After reviewing your application, we're unable to approve it at this time.</p>
              <div class="reason-box">
                <strong>Reason:</strong>
                <p>${reason}</p>
              </div>
              <p>If you believe this decision was made in error or if you have additional information to share, please reply to this email and we'll be happy to reconsider.</p>
              <p>We appreciate your interest in our community and wish you the best.</p>
            </div>
            <div class="footer">
              <p>Questions? Reply to this email or contact us at support@arcuspath.com</p>
              <p>&copy; ${new Date().getFullYear()} ArcusPath. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `,
  }),

  // Badge approved
  badgeApproved: (providerName: string, badgeName: string) => ({
    subject: `Badge Earned: ${badgeName} - ArcusPath`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #374151; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { text-align: center; padding: 20px 0; }
            .logo { font-size: 24px; font-weight: bold; background: linear-gradient(to right, #9333ea, #ec4899); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
            .content { background: #f9fafb; border-radius: 12px; padding: 24px; margin: 20px 0; }
            .badge-icon { font-size: 48px; text-align: center; }
            .badge-name { font-size: 20px; font-weight: bold; text-align: center; color: #9333ea; }
            .button { display: inline-block; background: linear-gradient(to right, #9333ea, #ec4899); color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; }
            .footer { text-align: center; color: #9ca3af; font-size: 14px; padding-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">ArcusPath</div>
            </div>
            <div class="content">
              <div class="badge-icon">🛡️</div>
              <p class="badge-name">${badgeName}</p>
              <h2 style="text-align: center;">Congratulations!</h2>
              <p>Hi ${providerName},</p>
              <p>Your application for the <strong>${badgeName}</strong> badge has been approved! This badge is now displayed on your provider profile, helping potential clients identify your commitment to the LGBTQIA+ community.</p>
              <p style="text-align: center; margin-top: 24px;">
                <a href="${process.env.NEXT_PUBLIC_APP_URL || "https://arcuspath.com"}/provider/dashboard/badges" class="button">View Your Badges</a>
              </p>
            </div>
            <div class="footer">
              <p>&copy; ${new Date().getFullYear()} ArcusPath. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `,
  }),

  // New vouch received
  newVouch: (providerName: string, relationship: string) => ({
    subject: "You Received a New Community Vouch! - ArcusPath",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #374151; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { text-align: center; padding: 20px 0; }
            .logo { font-size: 24px; font-weight: bold; background: linear-gradient(to right, #9333ea, #ec4899); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
            .content { background: #f9fafb; border-radius: 12px; padding: 24px; margin: 20px 0; }
            .heart-icon { font-size: 48px; text-align: center; }
            .button { display: inline-block; background: linear-gradient(to right, #9333ea, #ec4899); color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; }
            .footer { text-align: center; color: #9ca3af; font-size: 14px; padding-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">ArcusPath</div>
            </div>
            <div class="content">
              <div class="heart-icon">💜</div>
              <h2 style="text-align: center;">New Community Vouch!</h2>
              <p>Hi ${providerName},</p>
              <p>Someone in the community just vouched for you! A <strong>${relationship}</strong> has endorsed your services on ArcusPath.</p>
              <p>Community vouches help build trust and make it easier for new clients to find you. Thank you for being a valued member of the ArcusPath community!</p>
              <p style="text-align: center; margin-top: 24px;">
                <a href="${process.env.NEXT_PUBLIC_APP_URL || "https://arcuspath.com"}/provider/dashboard/vouches" class="button">View Your Vouches</a>
              </p>
            </div>
            <div class="footer">
              <p>&copy; ${new Date().getFullYear()} ArcusPath. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `,
  }),

  // Referral completed
  referralCompleted: (userName: string, rewardAmount: number) => ({
    subject: "You Earned a Referral Reward! - ArcusPath",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #374151; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { text-align: center; padding: 20px 0; }
            .logo { font-size: 24px; font-weight: bold; background: linear-gradient(to right, #9333ea, #ec4899); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
            .content { background: #f9fafb; border-radius: 12px; padding: 24px; margin: 20px 0; }
            .reward-box { background: linear-gradient(to right, #9333ea, #ec4899); color: white; border-radius: 12px; padding: 24px; text-align: center; margin: 20px 0; }
            .reward-amount { font-size: 36px; font-weight: bold; }
            .button { display: inline-block; background: white; color: #9333ea; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; }
            .footer { text-align: center; color: #9ca3af; font-size: 14px; padding-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">ArcusPath</div>
            </div>
            <div class="content">
              <h2 style="text-align: center;">Referral Reward Earned!</h2>
              <p>Hi ${userName},</p>
              <p>Great news! Someone you referred has become a verified provider on ArcusPath. As a thank you for growing our community, you've earned a reward!</p>
              <div class="reward-box">
                <p>You Earned</p>
                <p class="reward-amount">$${rewardAmount.toFixed(2)}</p>
              </div>
              <p style="text-align: center;">
                <a href="${process.env.NEXT_PUBLIC_APP_URL || "https://arcuspath.com"}/account/referrals" class="button">View Referral Dashboard</a>
              </p>
              <p style="margin-top: 24px;">Keep sharing your referral code to earn more rewards!</p>
            </div>
            <div class="footer">
              <p>Thank you for helping grow the ArcusPath community!</p>
              <p>&copy; ${new Date().getFullYear()} ArcusPath. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `,
  }),

  // Welcome email
  welcome: (userName: string) => ({
    subject: "Welcome to ArcusPath!",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #374151; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { text-align: center; padding: 20px 0; }
            .logo { font-size: 24px; font-weight: bold; background: linear-gradient(to right, #9333ea, #ec4899); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
            .content { background: #f9fafb; border-radius: 12px; padding: 24px; margin: 20px 0; }
            .rainbow { height: 4px; background: linear-gradient(to right, #ef4444, #f97316, #eab308, #22c55e, #3b82f6, #8b5cf6); }
            .button { display: inline-block; background: linear-gradient(to right, #9333ea, #ec4899); color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; }
            .footer { text-align: center; color: #9ca3af; font-size: 14px; padding-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">ArcusPath</div>
            </div>
            <div class="rainbow"></div>
            <div class="content">
              <h2>Welcome to ArcusPath!</h2>
              <p>Hi ${userName},</p>
              <p>Thank you for joining ArcusPath, your trusted resource for finding LGBTQIA+-affirming professionals in healthcare, legal, financial, career, and lifestyle services.</p>
              <h3>What you can do:</h3>
              <ul>
                <li><strong>Search Providers</strong> - Find affirming professionals in your area</li>
                <li><strong>Vouch for Providers</strong> - Help build trust by vouching for providers you know</li>
                <li><strong>Become a Provider</strong> - Join our network of affirming professionals</li>
                <li><strong>Refer Friends</strong> - Share ArcusPath and earn rewards</li>
              </ul>
              <p style="text-align: center; margin-top: 24px;">
                <a href="${process.env.NEXT_PUBLIC_APP_URL || "https://arcuspath.com"}/search" class="button">Start Exploring</a>
              </p>
            </div>
            <div class="footer">
              <p>Welcome to the community!</p>
              <p>&copy; ${new Date().getFullYear()} ArcusPath. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `,
  }),
};
