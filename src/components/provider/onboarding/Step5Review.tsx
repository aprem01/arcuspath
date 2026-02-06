"use client";

import { useState } from "react";
import {
  CheckCircle,
  MapPin,
  Globe,
  FileText,
  Shield,
  Tag,
  AlertCircle,
} from "lucide-react";
import type { Step1Data } from "./Step1BasicInfo";
import type { Step2Data } from "./Step2Location";
import type { Step3Data } from "./Step3Credentials";
import type { Step4Data } from "./Step4TrustProfile";

interface AllData {
  step1: Step1Data;
  step2: Step2Data;
  step3: Step3Data;
  step4: Step4Data;
}

interface Step5ReviewProps {
  data: AllData;
  onSubmit: () => Promise<void>;
  onBack: () => void;
  onEdit: (step: number) => void;
}

export default function Step5Review({
  data,
  onSubmit,
  onBack,
  onEdit,
}: Step5ReviewProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!agreed) {
      setError("Please agree to the terms to submit your application");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await onSubmit();
    } catch (err) {
      setError("Failed to submit application. Please try again.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const Section = ({
    title,
    step,
    children,
  }: {
    title: string;
    step: number;
    children: React.ReactNode;
  }) => (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <button
          type="button"
          onClick={() => onEdit(step)}
          className="text-sm text-purple-600 hover:text-purple-700 font-medium"
        >
          Edit
        </button>
      </div>
      {children}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-1">
          Review Your Application
        </h2>
        <p className="text-gray-600 text-sm">
          Please review all information before submitting. You can edit any
          section by clicking the Edit button.
        </p>
      </div>

      {/* Basic Info */}
      <Section title="Basic Information" step={1}>
        <div className="space-y-3">
          <div>
            <span className="text-sm text-gray-500">Name</span>
            <p className="font-medium text-gray-900">{data.step1.name}</p>
          </div>
          {data.step1.businessName && (
            <div>
              <span className="text-sm text-gray-500">Business Name</span>
              <p className="font-medium text-gray-900">
                {data.step1.businessName}
              </p>
            </div>
          )}
          {data.step1.pronouns && (
            <div>
              <span className="text-sm text-gray-500">Pronouns</span>
              <p className="font-medium text-gray-900">{data.step1.pronouns}</p>
            </div>
          )}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-sm text-gray-500">Category</span>
              <p className="font-medium text-gray-900 capitalize">
                {data.step1.categoryId}
              </p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Subcategory</span>
              <p className="font-medium text-gray-900">
                {data.step1.subcategory}
              </p>
            </div>
          </div>
          <div>
            <span className="text-sm text-gray-500">Short Bio</span>
            <p className="text-gray-700">{data.step1.shortBio}</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">Full Description</span>
            <p className="text-gray-700 whitespace-pre-wrap">
              {data.step1.description}
            </p>
          </div>
        </div>
      </Section>

      {/* Location */}
      <Section title="Location & Service Area" step={2}>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900">
              {data.step2.city}, {data.step2.state}
              {data.step2.zipCode && ` ${data.step2.zipCode}`}
            </span>
          </div>
          {data.step2.virtual && (
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-purple-500" />
              <span className="text-purple-700">
                Offers virtual/telehealth services
              </span>
            </div>
          )}
          {data.step2.serviceArea && data.step2.serviceArea.length > 0 && (
            <div>
              <span className="text-sm text-gray-500">Service Area</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {data.step2.serviceArea.map((area) => (
                  <span
                    key={area}
                    className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </Section>

      {/* Credentials */}
      <Section title="Credentials & Expertise" step={3}>
        <div className="space-y-4">
          {data.step3.credentials.length > 0 ? (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-500">Credentials</span>
              </div>
              <div className="space-y-2">
                {data.step3.credentials.map((cred) => (
                  <div
                    key={cred.id}
                    className="p-3 bg-gray-50 rounded-lg text-sm"
                  >
                    <p className="font-medium text-gray-900">{cred.name}</p>
                    <p className="text-gray-600">
                      {cred.issuingBody}
                      {cred.licenseNumber && ` • #${cred.licenseNumber}`}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No credentials added</p>
          )}

          {data.step3.specialties.length > 0 && (
            <div>
              <span className="text-sm text-gray-500">Specialties</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {data.step3.specialties.map((spec) => (
                  <span
                    key={spec}
                    className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-sm"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div>
            <span className="text-sm text-gray-500">Languages</span>
            <p className="text-gray-900">{data.step3.languages.join(", ")}</p>
          </div>
        </div>
      </Section>

      {/* Trust Profile */}
      <Section title="Trust Profile" step={4}>
        <div className="space-y-4">
          {data.step4.lgbtqOwned && (
            <div className="flex items-center gap-2 text-pink-700">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">LGBTQIA+ Owned Business</span>
            </div>
          )}

          <div>
            <span className="text-sm text-gray-500">Affirming Care Statement</span>
            <p className="text-gray-700 mt-1 italic">
              &ldquo;{data.step4.affirmationStatement}&rdquo;
            </p>
          </div>

          {data.step4.inclusiveTags.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Tag className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-500">Inclusive Care Tags</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {data.step4.inclusiveTags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-green-100 text-green-700 rounded text-sm"
                  >
                    {tag.replace(/-/g, " ")}
                  </span>
                ))}
              </div>
            </div>
          )}

          {data.step4.requestedBadges.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-500">Requested Badges</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {data.step4.requestedBadges.map((badge) => (
                  <span
                    key={badge}
                    className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm capitalize"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </Section>

      {/* Agreement */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-1 w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
          />
          <div className="text-sm text-gray-600">
            I confirm that all information provided is accurate and true. I agree
            to ArcusPath&apos;s{" "}
            <a
              href="/terms"
              className="text-purple-600 hover:underline"
              target="_blank"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="/privacy"
              className="text-purple-600 hover:underline"
              target="_blank"
            >
              Privacy Policy
            </a>
            . I understand that my application will be reviewed and I may be
            contacted for additional verification.
          </div>
        </label>
      </div>

      {/* Error message */}
      {error && (
        <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          <AlertCircle className="w-5 h-5" />
          <span>{error}</span>
        </div>
      )}

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
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting || !agreed}
          className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Submitting..." : "Submit Application"}
        </button>
      </div>
    </div>
  );
}
