"use client";

import { InclusiveTag } from "@/lib/types";
import { inclusiveTags } from "@/data/categories";

interface InclusiveTagBadgeProps {
  tag: InclusiveTag;
  size?: "sm" | "md";
  showTooltip?: boolean;
}

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  identity: {
    bg: "bg-purple-50",
    text: "text-purple-700",
    border: "border-purple-200",
  },
  health: {
    bg: "bg-teal-50",
    text: "text-teal-700",
    border: "border-teal-200",
  },
  accessibility: {
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
  },
  financial: {
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
  },
};

const sizeClasses = {
  sm: "text-xs px-2 py-0.5",
  md: "text-sm px-2.5 py-1",
};

export default function InclusiveTagBadge({
  tag,
  size = "sm",
  showTooltip = true,
}: InclusiveTagBadgeProps) {
  const tagInfo = inclusiveTags.find((t) => t.id === tag);
  if (!tagInfo) return null;

  const colors = categoryColors[tagInfo.category] || categoryColors.identity;

  return (
    <span
      className={`
        inline-flex items-center rounded-full border font-medium
        ${colors.bg} ${colors.text} ${colors.border} ${sizeClasses[size]}
      `}
      title={showTooltip ? tagInfo.description : undefined}
      aria-label={`${tagInfo.name}: ${tagInfo.description}`}
    >
      {tagInfo.name}
    </span>
  );
}

export function InclusiveTagList({
  tags,
  limit = 5,
  size = "sm",
}: {
  tags: InclusiveTag[];
  limit?: number;
  size?: "sm" | "md";
}) {
  const displayTags = tags.slice(0, limit);
  const remaining = tags.length - limit;

  return (
    <div className="flex flex-wrap gap-1.5" role="list" aria-label="Inclusive care tags">
      {displayTags.map((tag) => (
        <span key={tag} role="listitem">
          <InclusiveTagBadge tag={tag} size={size} />
        </span>
      ))}
      {remaining > 0 && (
        <span
          className={`
            inline-flex items-center rounded-full bg-slate-100 text-slate-600
            ${sizeClasses[size]}
          `}
          aria-label={`${remaining} more tags`}
        >
          +{remaining} more
        </span>
      )}
    </div>
  );
}
