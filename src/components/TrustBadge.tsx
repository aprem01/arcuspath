import { ShieldCheck, Heart, Star, GraduationCap } from "lucide-react";

interface TrustBadgeProps {
  type: "verified" | "affirming" | "owned" | "trained";
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
}

const badgeConfig = {
  verified: {
    label: "Verified",
    fullLabel: "Verified Provider",
    icon: ShieldCheck,
    className: "badge-verified",
    description: "Identity and credentials verified",
  },
  affirming: {
    label: "Affirming",
    fullLabel: "LGBTQIA+ Affirming",
    icon: Heart,
    className: "badge-affirming",
    description: "Demonstrated affirming care",
  },
  owned: {
    label: "LGBTQIA+ Owned",
    fullLabel: "LGBTQIA+ Owned",
    icon: Star,
    className: "badge-owned",
    description: "Community-owned business",
  },
  trained: {
    label: "Trained",
    fullLabel: "Competency Trained",
    icon: GraduationCap,
    className: "badge-trained",
    description: "Completed competency training",
  },
};

const sizeClasses = {
  sm: "text-xs px-1.5 py-0.5",
  md: "text-xs px-2 py-1",
  lg: "text-sm px-3 py-1.5",
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
      className={`badge ${config.className} ${sizeClasses[size]}`}
      title={config.description}
    >
      <Icon className={iconSizes[size]} />
      {showLabel && <span>{config.label}</span>}
    </span>
  );
}

export function TrustBadgeList({
  badges,
  showLabel = true,
  size = "md",
}: {
  badges: TrustBadgeProps["type"][];
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {badges.map((badge) => (
        <TrustBadge key={badge} type={badge} showLabel={showLabel} size={size} />
      ))}
    </div>
  );
}
