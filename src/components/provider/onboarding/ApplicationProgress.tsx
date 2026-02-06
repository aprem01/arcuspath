"use client";

import { CheckCircle } from "lucide-react";

interface Step {
  number: number;
  title: string;
}

const steps: Step[] = [
  { number: 1, title: "Basic Info" },
  { number: 2, title: "Location" },
  { number: 3, title: "Credentials" },
  { number: 4, title: "Trust Profile" },
  { number: 5, title: "Review" },
];

interface ApplicationProgressProps {
  currentStep: number;
}

export default function ApplicationProgress({
  currentStep,
}: ApplicationProgressProps) {
  return (
    <div className="w-full">
      {/* Mobile: Simple progress bar */}
      <div className="sm:hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            Step {currentStep} of {steps.length}
          </span>
          <span className="text-sm text-gray-500">
            {steps[currentStep - 1]?.title}
          </span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-600 to-pink-500 transition-all duration-300"
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Desktop: Step indicators */}
      <div className="hidden sm:block">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const isCompleted = step.number < currentStep;
            const isCurrent = step.number === currentStep;

            return (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div
                    className={`
                      w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all
                      ${
                        isCompleted
                          ? "bg-green-500 text-white"
                          : isCurrent
                          ? "bg-gradient-to-br from-purple-600 to-pink-500 text-white"
                          : "bg-gray-200 text-gray-500"
                      }
                    `}
                  >
                    {isCompleted ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      step.number
                    )}
                  </div>
                  <span
                    className={`mt-2 text-xs font-medium ${
                      isCurrent ? "text-purple-600" : "text-gray-500"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-2 rounded transition-all ${
                      isCompleted
                        ? "bg-green-500"
                        : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
