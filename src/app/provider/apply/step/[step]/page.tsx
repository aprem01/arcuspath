"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ApplicationProgress from "@/components/provider/onboarding/ApplicationProgress";
import Step1BasicInfo, {
  type Step1Data,
} from "@/components/provider/onboarding/Step1BasicInfo";
import Step2Location, {
  type Step2Data,
} from "@/components/provider/onboarding/Step2Location";
import Step3Credentials, {
  type Step3Data,
} from "@/components/provider/onboarding/Step3Credentials";
import Step4TrustProfile, {
  type Step4Data,
} from "@/components/provider/onboarding/Step4TrustProfile";
import Step5Review from "@/components/provider/onboarding/Step5Review";

interface Category {
  slug: string;
  name: string;
  subcategories: string;
}

interface ApplicationData {
  step1?: Step1Data;
  step2?: Step2Data;
  step3?: Step3Data;
  step4?: Step4Data;
}

const STORAGE_KEY = "arcuspath-provider-application";

export default function ProviderApplyStepPage({
  params,
}: {
  params: Promise<{ step: string }>;
}) {
  const { step } = use(params);
  const router = useRouter();
  const currentStep = parseInt(step) || 1;

  const [data, setData] = useState<ApplicationData>({});
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Load saved data from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setData(JSON.parse(saved));
      } catch {
        // Invalid saved data, ignore
      }
    }
    setIsLoading(false);
  }, []);

  // Fetch categories
  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => {
        if (data.categories) {
          setCategories(data.categories);
        }
      })
      .catch(console.error);
  }, []);

  // Save data to localStorage whenever it changes
  const saveData = (newData: ApplicationData) => {
    setData(newData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
  };

  const handleStep1Next = (step1Data: Step1Data) => {
    saveData({ ...data, step1: step1Data });
    router.push("/provider/apply/step/2");
  };

  const handleStep2Next = (step2Data: Step2Data) => {
    saveData({ ...data, step2: step2Data });
    router.push("/provider/apply/step/3");
  };

  const handleStep3Next = (step3Data: Step3Data) => {
    saveData({ ...data, step3: step3Data });
    router.push("/provider/apply/step/4");
  };

  const handleStep4Next = (step4Data: Step4Data) => {
    saveData({ ...data, step4: step4Data });
    router.push("/provider/apply/step/5");
  };

  const handleBack = () => {
    router.push(`/provider/apply/step/${currentStep - 1}`);
  };

  const handleEdit = (step: number) => {
    router.push(`/provider/apply/step/${step}`);
  };

  const handleSubmit = async () => {
    // Submit to API
    const response = await fetch("/api/provider/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to submit application");
    }

    // Clear saved data
    localStorage.removeItem(STORAGE_KEY);
    setSubmitSuccess(true);
  };

  // Validate that previous steps are complete
  const canAccessStep = (step: number): boolean => {
    if (step === 1) return true;
    if (step === 2) return !!data.step1;
    if (step === 3) return !!data.step1 && !!data.step2;
    if (step === 4) return !!data.step1 && !!data.step2 && !!data.step3;
    if (step === 5)
      return !!data.step1 && !!data.step2 && !!data.step3 && !!data.step4;
    return false;
  };

  // Redirect if trying to access a step without completing previous ones
  useEffect(() => {
    if (!isLoading && !canAccessStep(currentStep)) {
      // Find the first incomplete step
      for (let i = 1; i <= 5; i++) {
        if (!canAccessStep(i)) {
          router.replace(`/provider/apply/step/${Math.max(1, i - 1)}`);
          break;
        }
      }
    }
  }, [currentStep, data, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-12">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
              <svg
                className="w-10 h-10 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Application Submitted!
            </h1>
            <p className="text-gray-600 mb-8">
              Thank you for applying to join ArcusPath. Our team will review your
              application and get back to you within 3-5 business days. You&apos;ll
              receive an email with next steps.
            </p>
            <div className="space-y-3">
              <Link
                href="/"
                className="block w-full py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-lg hover:opacity-90"
              >
                Return to Homepage
              </Link>
              <Link
                href="/auth/signin"
                className="block w-full py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50"
              >
                Sign in to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/provider/apply"
            className="text-sm text-purple-600 hover:text-purple-700 mb-4 inline-block"
          >
            &larr; Back to overview
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Provider Application
          </h1>
          <ApplicationProgress currentStep={currentStep} />
        </div>

        {/* Step Content */}
        {currentStep === 1 && (
          <Step1BasicInfo
            data={data.step1 || {}}
            categories={categories}
            onNext={handleStep1Next}
          />
        )}
        {currentStep === 2 && (
          <Step2Location
            data={data.step2 || {}}
            onNext={handleStep2Next}
            onBack={handleBack}
          />
        )}
        {currentStep === 3 && (
          <Step3Credentials
            data={data.step3 || {}}
            onNext={handleStep3Next}
            onBack={handleBack}
          />
        )}
        {currentStep === 4 && (
          <Step4TrustProfile
            data={data.step4 || {}}
            onNext={handleStep4Next}
            onBack={handleBack}
          />
        )}
        {currentStep === 5 && data.step1 && data.step2 && data.step3 && data.step4 && (
          <Step5Review
            data={{
              step1: data.step1,
              step2: data.step2,
              step3: data.step3,
              step4: data.step4,
            }}
            onSubmit={handleSubmit}
            onBack={handleBack}
            onEdit={handleEdit}
          />
        )}
      </div>
    </div>
  );
}
