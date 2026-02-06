"use client";

import { Users, MousePointer, CheckCircle, DollarSign } from "lucide-react";

interface ReferralStatsProps {
  totalClicks: number;
  totalReferrals: number;
  successfulReferrals: number;
  rewardsEarned: number;
}

export default function ReferralStats({
  totalClicks,
  totalReferrals,
  successfulReferrals,
  rewardsEarned,
}: ReferralStatsProps) {
  const stats = [
    {
      label: "Link Clicks",
      value: totalClicks,
      icon: MousePointer,
      color: "bg-blue-100 text-blue-600",
    },
    {
      label: "Sign Ups",
      value: totalReferrals,
      icon: Users,
      color: "bg-purple-100 text-purple-600",
    },
    {
      label: "Completed",
      value: successfulReferrals,
      icon: CheckCircle,
      color: "bg-green-100 text-green-600",
    },
    {
      label: "Rewards Earned",
      value: `$${rewardsEarned.toFixed(2)}`,
      icon: DollarSign,
      color: "bg-yellow-100 text-yellow-600",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white rounded-xl border border-gray-200 p-4"
        >
          <div
            className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center mb-3`}
          >
            <stat.icon className="w-5 h-5" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          <p className="text-sm text-gray-500">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
