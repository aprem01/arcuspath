import Link from "next/link";
import { MapPin, Video, Star } from "lucide-react";
import { Provider } from "@/lib/types";
import { TrustBadgeList } from "./TrustBadge";

interface ProviderCardProps {
  provider: Provider;
}

export default function ProviderCard({ provider }: ProviderCardProps) {
  return (
    <Link href={`/provider/${provider.id}`} className="card block group">
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className="w-16 h-16 rounded-full bg-gradient-arcus flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-xl">
              {provider.name.charAt(0)}
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg text-slate-900 group-hover:text-arcus-purple transition-colors truncate">
              {provider.name}
            </h3>
            {provider.businessName && (
              <p className="text-sm text-slate-600 truncate">
                {provider.businessName}
              </p>
            )}
            <p className="text-sm text-arcus-purple font-medium">
              {provider.subcategory}
            </p>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-3">
          <TrustBadgeList badges={provider.trustBadges} size="sm" />
        </div>

        {/* Bio */}
        <p className="mt-3 text-sm text-slate-600 line-clamp-2">
          {provider.shortBio}
        </p>

        {/* Location */}
        <div className="mt-3 flex items-center gap-3 text-sm text-slate-500">
          <span className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {provider.location.city}, {provider.location.state}
          </span>
          {provider.location.virtual && (
            <span className="flex items-center gap-1 text-arcus-teal">
              <Video className="w-4 h-4" />
              Virtual
            </span>
          )}
        </div>

        {/* Rating */}
        {provider.rating && (
          <div className="mt-3 flex items-center gap-1 text-sm">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span className="font-medium">{provider.rating}</span>
            <span className="text-slate-500">
              ({provider.reviewCount} reviews)
            </span>
          </div>
        )}

        {/* Specialties */}
        <div className="mt-3 flex flex-wrap gap-1">
          {provider.specialties.slice(0, 3).map((specialty) => (
            <span
              key={specialty}
              className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded-full"
            >
              {specialty}
            </span>
          ))}
          {provider.specialties.length > 3 && (
            <span className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded-full">
              +{provider.specialties.length - 3} more
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
