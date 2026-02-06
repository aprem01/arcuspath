"use client";

import { User, Clock, CheckCircle, XCircle } from "lucide-react";

interface Referral {
  id: string;
  referredEmail: string | null;
  status: string;
  createdAt: string;
  convertedAt: string | null;
  rewardAmount: number | null;
}

interface ReferralListProps {
  referrals: Referral[];
}

const STATUS_CONFIG: Record<
  string,
  { label: string; color: string; icon: React.ComponentType<{ className?: string }> }
> = {
  PENDING: {
    label: "Pending",
    color: "bg-yellow-100 text-yellow-700",
    icon: Clock,
  },
  SIGNED_UP: {
    label: "Signed Up",
    color: "bg-blue-100 text-blue-700",
    icon: User,
  },
  COMPLETED: {
    label: "Completed",
    color: "bg-green-100 text-green-700",
    icon: CheckCircle,
  },
  EXPIRED: {
    label: "Expired",
    color: "bg-gray-100 text-gray-700",
    icon: XCircle,
  },
};

export default function ReferralList({ referrals }: ReferralListProps) {
  if (referrals.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-xl">
        <Users className="w-12 h-12 mx-auto text-gray-300 mb-3" />
        <p className="text-gray-500">No referrals yet</p>
        <p className="text-sm text-gray-400 mt-1">
          Share your code to start earning rewards!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
        <h3 className="font-semibold text-gray-900">Your Referrals</h3>
      </div>
      <div className="divide-y divide-gray-100">
        {referrals.map((referral) => {
          const statusConfig = STATUS_CONFIG[referral.status] || STATUS_CONFIG.PENDING;
          const StatusIcon = statusConfig.icon;

          return (
            <div
              key={referral.id}
              className="px-4 py-3 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {referral.referredEmail
                      ? maskEmail(referral.referredEmail)
                      : "Anonymous User"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(referral.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {referral.rewardAmount && (
                  <span className="text-green-600 font-medium">
                    +${referral.rewardAmount}
                  </span>
                )}
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-sm font-medium ${statusConfig.color}`}
                >
                  <StatusIcon className="w-3.5 h-3.5" />
                  {statusConfig.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function maskEmail(email: string): string {
  const [localPart, domain] = email.split("@");
  if (!domain) return email;
  const masked =
    localPart.slice(0, 2) + "***" + (localPart.length > 2 ? localPart.slice(-1) : "");
  return `${masked}@${domain}`;
}

function Users({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
