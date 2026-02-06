import { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, Shield, Users, Star, Clock, FileCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Become a Provider | ArcusPath",
  description:
    "Join ArcusPath as an LGBTQIA+ affirming provider. Connect with community members seeking trusted services.",
};

const benefits = [
  {
    icon: Users,
    title: "Connect with Community",
    description:
      "Reach LGBTQIA+ individuals actively seeking affirming providers like you.",
  },
  {
    icon: Shield,
    title: "Build Trust",
    description:
      "Earn verified badges and community vouches that showcase your commitment to affirming care.",
  },
  {
    icon: Star,
    title: "Stand Out",
    description:
      "Differentiate yourself with a profile that highlights your LGBTQIA+ competencies and training.",
  },
];

const steps = [
  {
    number: 1,
    title: "Basic Information",
    description: "Tell us about yourself and your practice",
  },
  {
    number: 2,
    title: "Location & Service Area",
    description: "Where and how you provide services",
  },
  {
    number: 3,
    title: "Credentials",
    description: "Upload your licenses and certifications",
  },
  {
    number: 4,
    title: "Trust Profile",
    description: "Share your commitment to affirming care",
  },
  {
    number: 5,
    title: "Review & Submit",
    description: "Review your application and submit",
  },
];

const requirements = [
  "Valid professional license or business registration",
  "Commitment to LGBTQIA+ affirming practices",
  "Professional liability insurance (where applicable)",
  "Willingness to complete our verification process",
];

export default function ProviderApplyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full text-purple-700 text-sm font-medium mb-6">
            <Shield className="w-4 h-4" />
            Trusted Provider Network
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Join ArcusPath as a{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              Trusted Provider
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Connect with LGBTQIA+ community members seeking affirming,
            professional services. Build your practice while making a real
            difference.
          </p>
          <Link
            href="/provider/apply/step/1"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity text-lg"
          >
            Start Your Application
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
          <p className="mt-4 text-sm text-gray-500 flex items-center justify-center gap-2">
            <Clock className="w-4 h-4" />
            Takes about 10-15 minutes to complete
          </p>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Why Join ArcusPath?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 text-center"
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-purple-600 to-pink-500 rounded-2xl flex items-center justify-center">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Application Steps Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
            Application Process
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Our simple 5-step process makes it easy to join. Complete at your
            own pace - your progress is automatically saved.
          </p>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {steps.map((step, index) => (
                <div
                  key={step.number}
                  className="flex items-start gap-4 bg-white rounded-xl p-6 shadow-sm"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                    {step.number}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{step.title}</h3>
                    <p className="text-gray-600 text-sm">{step.description}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden sm:block w-8 h-8 text-gray-300">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Requirements Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
              Requirements
            </h2>
            <p className="text-gray-600 text-center mb-8">
              To ensure the highest quality for our community, we require the
              following:
            </p>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8">
              <ul className="space-y-4">
                {requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-3xl p-12 text-center text-white">
            <FileCheck className="w-16 h-16 mx-auto mb-6 opacity-90" />
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Join hundreds of providers who are making a difference in the
              LGBTQIA+ community. Your expertise is needed.
            </p>
            <Link
              href="/provider/apply/step/1"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors text-lg"
            >
              Begin Application
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Already have an account */}
      <div className="pb-16 text-center">
        <p className="text-gray-600">
          Already have a provider account?{" "}
          <Link
            href="/auth/signin"
            className="text-purple-600 font-semibold hover:underline"
          >
            Sign in to your dashboard
          </Link>
        </p>
      </div>
    </div>
  );
}
