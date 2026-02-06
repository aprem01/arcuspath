"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle, ShieldCheck, Heart, Star, GraduationCap } from "lucide-react";

const INCLUSIVE_TAGS = [
  { slug: "trans-affirming", name: "Trans Affirming", description: "Experienced with transgender clients" },
  { slug: "nonbinary-affirming", name: "Nonbinary Affirming", description: "Supportive of nonbinary identities" },
  { slug: "hiv-informed", name: "HIV Informed", description: "Knowledgeable about HIV care" },
  { slug: "prep-provider", name: "PrEP Provider", description: "Can prescribe/discuss PrEP" },
  { slug: "gender-affirming-care", name: "Gender Affirming Care", description: "Provides gender-affirming services" },
  { slug: "lgbtq-families", name: "LGBTQ+ Families", description: "Experience with LGBTQ+ family issues" },
  { slug: "elder-lgbtq", name: "Elder LGBTQ+", description: "Specialized in older LGBTQ+ clients" },
  { slug: "youth-lgbtq", name: "Youth LGBTQ+", description: "Experience with LGBTQ+ youth" },
  { slug: "bipoc-affirming", name: "BIPOC Affirming", description: "Culturally competent with BIPOC clients" },
  { slug: "disability-affirming", name: "Disability Affirming", description: "Accessible and disability-aware" },
  { slug: "neurodivergent-affirming", name: "Neurodivergent Affirming", description: "Experience with neurodivergent clients" },
  { slug: "trauma-informed", name: "Trauma Informed", description: "Uses trauma-informed approach" },
  { slug: "sliding-scale", name: "Sliding Scale", description: "Offers income-based pricing" },
  { slug: "accepts-insurance", name: "Accepts Insurance", description: "Takes insurance plans" },
];

const BADGES = [
  {
    slug: "verified",
    name: "Verified Provider",
    description: "Identity and credentials verified by ArcusPath",
    icon: ShieldCheck,
    color: "emerald",
    note: "Granted after credential review",
    selectable: false,
  },
  {
    slug: "affirming",
    name: "LGBTQIA+ Affirming",
    description: "Demonstrated commitment to affirming care",
    icon: Heart,
    color: "purple",
    note: "Apply with evidence of affirming practices",
    selectable: true,
  },
  {
    slug: "owned",
    name: "LGBTQIA+ Owned",
    description: "Business owned by LGBTQIA+ community member",
    icon: Star,
    color: "pink",
    note: "Self-attestation with verification",
    selectable: true,
  },
  {
    slug: "trained",
    name: "Competency Trained",
    description: "Completed LGBTQIA+ cultural competency training",
    icon: GraduationCap,
    color: "blue",
    note: "Provide training certificate",
    selectable: true,
  },
];

const schema = z.object({
  lgbtqOwned: z.boolean(),
  affirmationStatement: z
    .string()
    .min(50, "Statement must be at least 50 characters")
    .max(500, "Statement must be less than 500 characters"),
});

export type Step4Data = z.infer<typeof schema> & {
  inclusiveTags: string[];
  requestedBadges: string[];
};

interface Step4TrustProfileProps {
  data: Partial<Step4Data>;
  onNext: (data: Step4Data) => void;
  onBack: () => void;
}

export default function Step4TrustProfile({
  data,
  onNext,
  onBack,
}: Step4TrustProfileProps) {
  const [inclusiveTags, setInclusiveTags] = useState<string[]>(
    data.inclusiveTags || []
  );
  const [requestedBadges, setRequestedBadges] = useState<string[]>(
    data.requestedBadges || []
  );

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      lgbtqOwned: data.lgbtqOwned || false,
      affirmationStatement: data.affirmationStatement || "",
    },
  });

  const affirmationStatement = watch("affirmationStatement") || "";
  const lgbtqOwned = watch("lgbtqOwned");

  const toggleTag = (slug: string) => {
    if (inclusiveTags.includes(slug)) {
      setInclusiveTags(inclusiveTags.filter((t) => t !== slug));
    } else {
      setInclusiveTags([...inclusiveTags, slug]);
    }
  };

  const toggleBadge = (slug: string) => {
    if (requestedBadges.includes(slug)) {
      setRequestedBadges(requestedBadges.filter((b) => b !== slug));
    } else {
      setRequestedBadges([...requestedBadges, slug]);
    }
  };

  const onSubmit = (formData: z.infer<typeof schema>) => {
    // Auto-add owned badge if lgbtqOwned is true
    let badges = [...requestedBadges];
    if (formData.lgbtqOwned && !badges.includes("owned")) {
      badges.push("owned");
    } else if (!formData.lgbtqOwned) {
      badges = badges.filter((b) => b !== "owned");
    }

    onNext({
      ...formData,
      inclusiveTags,
      requestedBadges: badges,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* LGBTQ+ Owned */}
      <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">
            Build Your Trust Profile
          </h2>
          <p className="text-gray-600 text-sm">
            Help clients understand your commitment to affirming care.
          </p>
        </div>

        <div className="border-b pb-6">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              {...register("lgbtqOwned")}
              className="mt-1 w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
            />
            <div>
              <span className="block font-medium text-gray-900">
                My business is LGBTQIA+ owned
              </span>
              <span className="block text-sm text-gray-600">
                Check this if you or a co-owner identifies as LGBTQIA+
              </span>
            </div>
          </label>
        </div>

        {/* Affirmation Statement */}
        <div>
          <label
            htmlFor="affirmationStatement"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Your Affirming Care Statement <span className="text-red-500">*</span>
          </label>
          <p className="text-xs text-gray-500 mb-2">
            Share your personal commitment to providing affirming, inclusive
            services. This will be displayed on your profile.
          </p>
          <textarea
            id="affirmationStatement"
            {...register("affirmationStatement")}
            rows={4}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="e.g., 'I believe every person deserves to be seen, heard, and celebrated for who they truly are. My practice is a safe space where you can be your authentic self.'"
          />
          <div className="mt-1 flex justify-between">
            {errors.affirmationStatement && (
              <p className="text-sm text-red-600">
                {errors.affirmationStatement.message}
              </p>
            )}
            <p
              className={`text-xs ${
                affirmationStatement.length > 500 ? "text-red-600" : "text-gray-500"
              } ml-auto`}
            >
              {affirmationStatement.length}/500
            </p>
          </div>
        </div>
      </div>

      {/* Inclusive Care Tags */}
      <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">
            Inclusive Care Specializations
          </h2>
          <p className="text-gray-600 text-sm">
            Select all that apply to help clients find providers who meet their
            specific needs.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          {INCLUSIVE_TAGS.map((tag) => (
            <button
              key={tag.slug}
              type="button"
              onClick={() => toggleTag(tag.slug)}
              className={`p-3 rounded-lg border-2 text-left transition-all ${
                inclusiveTags.includes(tag.slug)
                  ? "border-purple-500 bg-purple-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-start gap-2">
                <div
                  className={`mt-0.5 ${
                    inclusiveTags.includes(tag.slug)
                      ? "text-purple-600"
                      : "text-gray-300"
                  }`}
                >
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <span className="block font-medium text-gray-900 text-sm">
                    {tag.name}
                  </span>
                  <span className="block text-xs text-gray-500">
                    {tag.description}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Trust Badges */}
      <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">Trust Badges</h2>
          <p className="text-gray-600 text-sm">
            Request badges to display on your profile. Some badges are granted
            automatically, others require verification.
          </p>
        </div>

        <div className="space-y-3">
          {BADGES.map((badge) => {
            const Icon = badge.icon;
            const isSelected = requestedBadges.includes(badge.slug);
            const isAutoSelected = badge.slug === "owned" && lgbtqOwned;

            return (
              <div
                key={badge.slug}
                className={`p-4 rounded-xl border-2 transition-all ${
                  isSelected || isAutoSelected
                    ? "border-purple-500 bg-purple-50"
                    : badge.selectable
                    ? "border-gray-200 hover:border-gray-300"
                    : "border-gray-100 bg-gray-50"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`p-2 rounded-lg ${
                      badge.color === "emerald"
                        ? "bg-emerald-100"
                        : badge.color === "purple"
                        ? "bg-purple-100"
                        : badge.color === "pink"
                        ? "bg-pink-100"
                        : "bg-blue-100"
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 ${
                        badge.color === "emerald"
                          ? "text-emerald-600"
                          : badge.color === "purple"
                          ? "text-purple-600"
                          : badge.color === "pink"
                          ? "text-pink-600"
                          : "text-blue-600"
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">
                        {badge.name}
                      </span>
                      {badge.selectable && badge.slug !== "owned" && (
                        <button
                          type="button"
                          onClick={() => toggleBadge(badge.slug)}
                          className={`px-3 py-1 text-sm font-medium rounded-full transition-colors ${
                            isSelected
                              ? "bg-purple-600 text-white"
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          }`}
                        >
                          {isSelected ? "Requested" : "Request"}
                        </button>
                      )}
                      {badge.slug === "owned" && lgbtqOwned && (
                        <span className="px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-700">
                          Auto-applied
                        </span>
                      )}
                      {!badge.selectable && badge.slug !== "owned" && (
                        <span className="text-xs text-gray-500">
                          After review
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {badge.description}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{badge.note}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50"
        >
          Back
        </button>
        <button
          type="submit"
          className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-lg hover:opacity-90"
        >
          Next: Review
        </button>
      </div>
    </form>
  );
}
