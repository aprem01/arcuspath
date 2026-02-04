"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, Search, ArrowRight, Info } from "lucide-react";
import { isAIEnabled, parseNaturalLanguageQuery } from "@/lib/ai-config";

interface AISearchAssistantProps {
  className?: string;
}

export default function AISearchAssistant({ className = "" }: AISearchAssistantProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [suggestion, setSuggestion] = useState<{
    category?: string;
    tags?: string[];
    virtual?: boolean;
    explanation?: string;
  } | null>(null);

  const aiEnabled = isAIEnabled();

  const handleSearch = async () => {
    if (!query.trim()) return;

    setIsProcessing(true);
    setSuggestion(null);

    try {
      // Parse the natural language query
      const parsed = parseNaturalLanguageQuery(query);

      // Build search URL
      const params = new URLSearchParams();
      params.set("q", query);

      if (parsed.category) {
        params.set("category", parsed.category);
      }
      if (parsed.tags && parsed.tags.length > 0) {
        params.set("tags", parsed.tags.join(","));
      }
      if (parsed.virtual) {
        params.set("virtual", "true");
      }

      // Show suggestion before navigating
      if (parsed.category || parsed.tags?.length) {
        setSuggestion({
          ...parsed,
          explanation: buildExplanation(parsed),
        });

        // Wait a moment for user to see the suggestion
        await new Promise((resolve) => setTimeout(resolve, 800));
      }

      router.push(`/search?${params.toString()}`);
    } catch (error) {
      // Fallback to simple search
      router.push(`/search?q=${encodeURIComponent(query)}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={`card p-6 ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 rounded-lg bg-gradient-arcus">
          <Sparkles className="w-5 h-5 text-white" aria-hidden="true" />
        </div>
        <div>
          <h3 className="font-semibold text-slate-900">Ask ArcusPath</h3>
          <p className="text-sm text-slate-500">
            Describe what you&apos;re looking for in your own words
          </p>
        </div>
      </div>

      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder='Try: "I need a trans-affirming therapist who does virtual appointments"'
          className="w-full px-4 py-3 pr-12 border border-slate-300 rounded-lg focus:ring-2 focus:ring-arcus-purple focus:border-arcus-purple"
          aria-label="Natural language search"
        />
        <button
          onClick={handleSearch}
          disabled={isProcessing || !query.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-arcus-purple hover:bg-purple-50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Search"
        >
          {isProcessing ? (
            <div className="w-5 h-5 border-2 border-arcus-purple border-t-transparent rounded-full animate-spin" />
          ) : (
            <Search className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Suggestion Display */}
      {suggestion && (
        <div className="mt-4 p-3 bg-purple-50 rounded-lg animate-fade-in">
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 text-arcus-purple mt-0.5 flex-shrink-0" aria-hidden="true" />
            <div className="text-sm">
              <p className="text-purple-800 font-medium">
                {suggestion.explanation}
              </p>
              <p className="text-purple-600 mt-1">Searching now...</p>
            </div>
          </div>
        </div>
      )}

      {/* Example Queries */}
      <div className="mt-4">
        <p className="text-xs text-slate-500 mb-2">Try asking:</p>
        <div className="flex flex-wrap gap-2">
          {[
            "Find a trans-friendly therapist",
            "LGBT family lawyer near me",
            "Financial advisor for same-sex couples",
          ].map((example) => (
            <button
              key={example}
              onClick={() => setQuery(example)}
              className="text-xs px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full transition-colors"
            >
              {example}
            </button>
          ))}
        </div>
      </div>

      {/* AI Status Indicator */}
      {!aiEnabled && (
        <p className="mt-4 text-xs text-slate-400 flex items-center gap-1">
          <span className="w-2 h-2 bg-slate-300 rounded-full" aria-hidden="true" />
          Using smart keyword matching
        </p>
      )}
    </div>
  );
}

function buildExplanation(parsed: {
  category?: string;
  tags?: string[];
  virtual?: boolean;
}): string {
  const parts: string[] = [];

  if (parsed.category) {
    const categoryNames: Record<string, string> = {
      healthcare: "Healthcare",
      legal: "Legal",
      financial: "Financial",
      career: "Career",
      lifestyle: "Lifestyle",
    };
    parts.push(`Looking in ${categoryNames[parsed.category] || parsed.category}`);
  }

  if (parsed.tags && parsed.tags.length > 0) {
    const tagNames: Record<string, string> = {
      "trans-affirming": "trans-affirming",
      "hiv-informed": "HIV-informed",
      "prep-provider": "PrEP providers",
      "gender-affirming-care": "gender-affirming care",
      "lgbtq-families": "LGBTQ+ family-friendly",
      "elder-lgbtq": "elder-friendly",
      "youth-lgbtq": "youth-friendly",
    };
    const tagLabels = parsed.tags.map((t) => tagNames[t] || t);
    parts.push(`with ${tagLabels.join(", ")} specialists`);
  }

  if (parsed.virtual) {
    parts.push("offering virtual appointments");
  }

  return parts.length > 0
    ? parts.join(" ")
    : "Searching all providers...";
}
