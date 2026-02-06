"use client";

import { useState } from "react";
import { Copy, Check, Share2 } from "lucide-react";

interface ReferralCodeCardProps {
  code: string;
  baseUrl?: string;
}

export default function ReferralCodeCard({
  code,
  baseUrl = typeof window !== "undefined" ? window.location.origin : "",
}: ReferralCodeCardProps) {
  const [copied, setCopied] = useState(false);
  const referralUrl = `${baseUrl}?ref=${code}`;

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Join ArcusPath",
          text: "Find LGBTQIA+-affirming professionals on ArcusPath!",
          url: referralUrl,
        });
      } catch (err) {
        // User cancelled share
      }
    } else {
      copyToClipboard(referralUrl);
    }
  };

  return (
    <div className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-2xl p-6 text-white">
      <h3 className="text-lg font-semibold mb-2">Your Referral Code</h3>
      <p className="text-white/80 text-sm mb-4">
        Share this code with friends to earn rewards when they sign up!
      </p>

      <div className="bg-white/20 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold tracking-wider">{code}</span>
          <button
            onClick={() => copyToClipboard(code)}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            title="Copy code"
          >
            {copied ? (
              <Check className="w-5 h-5" />
            ) : (
              <Copy className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => copyToClipboard(referralUrl)}
          className="flex-1 flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 rounded-lg py-2.5 transition-colors"
        >
          <Copy className="w-4 h-4" />
          Copy Link
        </button>
        <button
          onClick={handleShare}
          className="flex-1 flex items-center justify-center gap-2 bg-white hover:bg-white/90 text-purple-600 rounded-lg py-2.5 font-medium transition-colors"
        >
          <Share2 className="w-4 h-4" />
          Share
        </button>
      </div>
    </div>
  );
}
