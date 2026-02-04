"use client";

import { useState } from "react";
import {
  ShieldCheck,
  ShieldAlert,
  ShieldQuestion,
  Users,
  Award,
  Info,
  X,
} from "lucide-react";
import { VerificationLevel } from "@/lib/types";
import { verificationLevels } from "@/data/categories";

interface VerificationBadgeProps {
  level: VerificationLevel;
  verifiedAt?: string | null;
  method?: string | null;
  showDetails?: boolean;
  size?: "sm" | "md" | "lg";
}

const levelConfig: Record<
  VerificationLevel,
  {
    icon: typeof ShieldCheck;
    className: string;
    bgClass: string;
  }
> = {
  none: {
    icon: ShieldQuestion,
    className: "text-slate-400",
    bgClass: "bg-slate-100",
  },
  self: {
    icon: ShieldAlert,
    className: "text-amber-600",
    bgClass: "bg-amber-50",
  },
  credential: {
    icon: ShieldCheck,
    className: "text-blue-600",
    bgClass: "bg-blue-50",
  },
  community: {
    icon: Users,
    className: "text-purple-600",
    bgClass: "bg-purple-50",
  },
  arcus_verified: {
    icon: Award,
    className: "text-emerald-600",
    bgClass: "bg-emerald-50",
  },
};

const sizeClasses = {
  sm: "text-xs px-2 py-1",
  md: "text-sm px-3 py-1.5",
  lg: "text-base px-4 py-2",
};

const iconSizes = {
  sm: "w-3.5 h-3.5",
  md: "w-4 h-4",
  lg: "w-5 h-5",
};

export default function VerificationBadge({
  level,
  verifiedAt,
  method,
  showDetails = false,
  size = "md",
}: VerificationBadgeProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  const config = levelConfig[level];
  const levelInfo = verificationLevels.find((v) => v.level === level);
  const Icon = config.icon;

  const formattedDate = verifiedAt
    ? new Date(verifiedAt).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })
    : null;

  return (
    <div className="relative inline-block">
      <button
        type="button"
        className={`
          inline-flex items-center gap-1.5 rounded-full font-medium
          ${config.bgClass} ${config.className} ${sizeClasses[size]}
          hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-current
        `}
        onClick={() => setShowTooltip(!showTooltip)}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        aria-label={`Verification level: ${levelInfo?.name}. Click for details.`}
        aria-expanded={showTooltip}
      >
        <Icon className={iconSizes[size]} aria-hidden="true" />
        <span>{levelInfo?.name}</span>
        {showDetails && (
          <Info className={`${iconSizes[size]} opacity-60`} aria-hidden="true" />
        )}
      </button>

      {/* Tooltip/Popover */}
      {showTooltip && (
        <div
          role="tooltip"
          className="absolute z-50 bottom-full left-0 mb-2 w-72 p-4 bg-white rounded-lg shadow-lg border border-slate-200"
        >
          <button
            type="button"
            className="absolute top-2 right-2 text-slate-400 hover:text-slate-600 md:hidden"
            onClick={() => setShowTooltip(false)}
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          <h4 className="font-semibold text-slate-900 mb-1 flex items-center gap-2">
            <Icon className="w-4 h-4" aria-hidden="true" />
            {levelInfo?.name}
          </h4>

          <p className="text-sm text-slate-600 mb-3">{levelInfo?.description}</p>

          {formattedDate && (
            <p className="text-xs text-slate-500 mb-1">
              <strong>Verified:</strong> {formattedDate}
            </p>
          )}

          {method && (
            <p className="text-xs text-slate-500">
              <strong>Method:</strong> {method}
            </p>
          )}

          <div className="mt-3 pt-3 border-t border-slate-100">
            <p className="text-xs text-slate-400">
              Trust Score: {levelInfo?.trustScore}/4
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
