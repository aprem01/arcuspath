import { ShieldCheck, Heart, Star, GraduationCap } from "lucide-react";
import { TrustBadgeId } from "@/lib/types";

interface TrustBadgeProps {
  type: TrustBadgeId;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
}

// WCAG AA compliant colors (4.5:1 contrast ratio)
const badgeConfig = {
  verified: {
    label: "Verified",
    fullLabel: "Verified Provider",
    icon: ShieldCheck,
    // Dark green on light green - meets AA contrast
    bgColor: "bg-emerald-100",
    textColor: "text-emerald-800",
    description: "Identity and credentials verified by ArcusPath",
  },
  affirming: {
    label: "Affirming",
    fullLabel: "LGBTQIA+ Affirming",
    icon: Heart,
    // Dark purple on light purple - meets AA contrast
    bgColor: "bg-purple-100",
    textColor: "text-purple-800",
    description: "Demonstrated commitment to affirming care",
  },
  owned: {
    label: "LGBTQ+ Owned",
    fullLabel: "LGBTQIA+ Owned",
    icon: Star,
    // Dark pink on light pink - meets AA contrast
    bgColor: "bg-pink-100",
    textColor: "text-pink-800",
    description: "Business owned by LGBTQIA+ community member",
  },
  trained: {
    label: "Trained",
    fullLabel: "Competency Trained",
    icon: GraduationCap,
    // Dark blue on light blue - meets AA contrast
    bgColor: "bg-blue-100",
    textColor: "text-blue-800",
    description: "Completed LGBTQIA+ cultural competency training",
  },
};

const sizeClasses = {
  sm: "text-xs px-1.5 py-0.5 gap-1",
  md: "text-xs px-2 py-1 gap-1",
  lg: "text-sm px-3 py-1.5 gap-1.5",
};

const iconSizes = {
  sm: "w-3 h-3",
  md: "w-3.5 h-3.5",
  lg: "w-4 h-4",
};

export default function TrustBadge({
  type,
  showLabel = true,
  size = "md",
}: TrustBadgeProps) {
  const config = badgeConfig[type];
  const Icon = config.icon;

  return (
    <span
      className={`
        inline-flex items-center rounded-full font-medium
        ${config.bgColor} ${config.textColor} ${sizeClasses[size]}
      `}
      role="img"
      aria-label={`${config.fullLabel}: ${config.description}`}
    >
      <Icon className={iconSizes[size]} aria-hidden="true" />
      {showLabel && <span>{config.label}</span>}
    </span>
  );
}

export function TrustBadgeList({
  badges,
  showLabel = true,
  size = "md",
}: {
  badges: TrustBadgeId[];
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
}) {
  if (!badges || badges.length === 0) return null;

  return (
    <div
      className="flex flex-wrap gap-1.5"
      role="list"
      aria-label="Trust badges"
    >
      {badges.map((badge) => (
        <span key={badge} role="listitem">
          <TrustBadge type={badge} showLabel={showLabel} size={size} />
        </span>
      ))}
    </div>
  );
}
