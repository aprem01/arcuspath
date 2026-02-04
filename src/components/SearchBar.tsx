"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin } from "lucide-react";

interface SearchBarProps {
  initialQuery?: string;
  initialLocation?: string;
  variant?: "hero" | "compact";
}

export default function SearchBar({
  initialQuery = "",
  initialLocation = "",
  variant = "hero",
}: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [location, setLocation] = useState(initialLocation);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (location) params.set("location", location);
    router.push(`/search?${params.toString()}`);
  };

  if (variant === "compact") {
    return (
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search providers..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-arcus-purple focus:border-transparent text-sm"
            suppressHydrationWarning
          />
        </div>
        <button type="submit" className="btn-primary text-sm">
          Search
        </button>
      </form>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-lg p-2 md:p-3"
    >
      <div className="flex flex-col md:flex-row gap-2 md:gap-0">
        {/* Service Search */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="What service are you looking for?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 md:py-4 border-0 focus:ring-0 text-lg placeholder:text-slate-400 rounded-xl md:rounded-none md:rounded-l-xl"
            suppressHydrationWarning
          />
        </div>

        {/* Location */}
        <div className="relative flex-1 md:border-l border-slate-200">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="City, State or 'Virtual'"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full pl-12 pr-4 py-3 md:py-4 border-0 focus:ring-0 text-lg placeholder:text-slate-400 rounded-xl md:rounded-none"
            suppressHydrationWarning
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-arcus-purple hover:bg-purple-700 text-white font-semibold px-8 py-3 md:py-4 rounded-xl transition-colors text-lg"
        >
          Search
        </button>
      </div>
    </form>
  );
}
