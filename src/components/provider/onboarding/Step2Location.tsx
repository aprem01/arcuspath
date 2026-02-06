"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Plus, X } from "lucide-react";

const US_STATES = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY", "DC"
];

const schema = z.object({
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  zipCode: z.string().optional(),
  virtual: z.boolean(),
  serviceArea: z.array(z.string()).optional(),
});

export type Step2Data = z.infer<typeof schema>;

interface Step2LocationProps {
  data: Partial<Step2Data>;
  onNext: (data: Step2Data) => void;
  onBack: () => void;
}

export default function Step2Location({
  data,
  onNext,
  onBack,
}: Step2LocationProps) {
  const [newServiceArea, setNewServiceArea] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<Step2Data>({
    resolver: zodResolver(schema),
    defaultValues: {
      ...data,
      virtual: data.virtual ?? false,
      serviceArea: data.serviceArea ?? [],
    },
  });

  const virtual = watch("virtual");
  const serviceArea = watch("serviceArea") || [];

  const addServiceArea = () => {
    if (newServiceArea.trim() && !serviceArea.includes(newServiceArea.trim())) {
      setValue("serviceArea", [...serviceArea, newServiceArea.trim()]);
      setNewServiceArea("");
    }
  };

  const removeServiceArea = (area: string) => {
    setValue(
      "serviceArea",
      serviceArea.filter((a) => a !== area)
    );
  };

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">
            Where do you provide services?
          </h2>
          <p className="text-gray-600 text-sm">
            Help clients find you by specifying your location and service area.
          </p>
        </div>

        {/* Primary Location */}
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="sm:col-span-1">
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              City <span className="text-red-500">*</span>
            </label>
            <input
              id="city"
              type="text"
              {...register("city")}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="San Francisco"
            />
            {errors.city && (
              <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="state"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              State <span className="text-red-500">*</span>
            </label>
            <select
              id="state"
              {...register("state")}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">Select</option>
              {US_STATES.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
            {errors.state && (
              <p className="mt-1 text-sm text-red-600">{errors.state.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="zipCode"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              ZIP Code <span className="text-gray-400">(optional)</span>
            </label>
            <input
              id="zipCode"
              type="text"
              {...register("zipCode")}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="94102"
            />
          </div>
        </div>

        {/* Virtual Services */}
        <div className="border-t pt-6">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              {...register("virtual")}
              className="mt-1 w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
            />
            <div>
              <span className="block font-medium text-gray-900">
                I offer virtual/telehealth services
              </span>
              <span className="block text-sm text-gray-600">
                Check this if you provide services via video call, phone, or online
              </span>
            </div>
          </label>
        </div>

        {/* Service Area */}
        <div className="border-t pt-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Service Area <span className="text-gray-400">(optional)</span>
          </label>
          <p className="text-xs text-gray-500 mb-3">
            {virtual
              ? "List states or regions where you're licensed to provide virtual services"
              : "List areas where you provide in-person services (e.g., 'Bay Area', 'Los Angeles County')"}
          </p>

          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={newServiceArea}
              onChange={(e) => setNewServiceArea(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addServiceArea();
                }
              }}
              className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder={virtual ? "California" : "Bay Area"}
            />
            <button
              type="button"
              onClick={addServiceArea}
              className="px-4 py-2.5 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          {serviceArea.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {serviceArea.map((area) => (
                <span
                  key={area}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                >
                  {area}
                  <button
                    type="button"
                    onClick={() => removeServiceArea(area)}
                    className="hover:text-purple-900"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {isSubmitting ? "Saving..." : "Next: Credentials"}
        </button>
      </div>
    </form>
  );
}
