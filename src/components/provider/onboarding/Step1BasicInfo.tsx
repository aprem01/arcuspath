"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  businessName: z.string().optional(),
  categoryId: z.string().min(1, "Please select a category"),
  subcategory: z.string().min(1, "Please select a subcategory"),
  shortBio: z
    .string()
    .min(50, "Bio must be at least 50 characters")
    .max(200, "Bio must be less than 200 characters"),
  description: z
    .string()
    .min(100, "Description must be at least 100 characters")
    .max(2000, "Description must be less than 2000 characters"),
  pronouns: z.string().optional(),
  yearEstablished: z.number().min(1900).max(new Date().getFullYear()).optional(),
});

export type Step1Data = z.infer<typeof schema>;

interface Step1BasicInfoProps {
  data: Partial<Step1Data>;
  categories: Array<{
    slug: string;
    name: string;
    subcategories: string;
  }>;
  onNext: (data: Step1Data) => void;
}

export default function Step1BasicInfo({
  data,
  categories,
  onNext,
}: Step1BasicInfoProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<Step1Data>({
    resolver: zodResolver(schema),
    defaultValues: data,
  });

  const selectedCategory = watch("categoryId");
  const selectedCategoryData = categories.find((c) => c.slug === selectedCategory);
  const subcategories = selectedCategoryData
    ? JSON.parse(selectedCategoryData.subcategories)
    : [];

  const shortBio = watch("shortBio") || "";
  const description = watch("description") || "";

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">
            Tell us about yourself
          </h2>
          <p className="text-gray-600 text-sm">
            This information will appear on your public profile.
          </p>
        </div>

        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Your Name / Practice Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            {...register("name")}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Dr. Jane Smith"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        {/* Business Name */}
        <div>
          <label
            htmlFor="businessName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Business Name <span className="text-gray-400">(optional)</span>
          </label>
          <input
            id="businessName"
            type="text"
            {...register("businessName")}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Affirming Care Associates"
          />
        </div>

        {/* Pronouns */}
        <div>
          <label
            htmlFor="pronouns"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Pronouns <span className="text-gray-400">(optional)</span>
          </label>
          <input
            id="pronouns"
            type="text"
            {...register("pronouns")}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="she/her, he/him, they/them"
          />
        </div>

        {/* Category */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="categoryId"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Service Category <span className="text-red-500">*</span>
            </label>
            <select
              id="categoryId"
              {...register("categoryId")}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.slug} value={cat.slug}>
                  {cat.name}
                </option>
              ))}
            </select>
            {errors.categoryId && (
              <p className="mt-1 text-sm text-red-600">
                {errors.categoryId.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="subcategory"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Subcategory <span className="text-red-500">*</span>
            </label>
            <select
              id="subcategory"
              {...register("subcategory")}
              disabled={!selectedCategory}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100"
            >
              <option value="">Select a subcategory</option>
              {subcategories.map((sub: string) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
            {errors.subcategory && (
              <p className="mt-1 text-sm text-red-600">
                {errors.subcategory.message}
              </p>
            )}
          </div>
        </div>

        {/* Year Established */}
        <div>
          <label
            htmlFor="yearEstablished"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Year Established <span className="text-gray-400">(optional)</span>
          </label>
          <input
            id="yearEstablished"
            type="number"
            {...register("yearEstablished", { valueAsNumber: true })}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="2020"
            min="1900"
            max={new Date().getFullYear()}
          />
        </div>

        {/* Short Bio */}
        <div>
          <label
            htmlFor="shortBio"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Short Bio <span className="text-red-500">*</span>
          </label>
          <p className="text-xs text-gray-500 mb-2">
            A brief summary that appears in search results (50-200 characters)
          </p>
          <textarea
            id="shortBio"
            {...register("shortBio")}
            rows={2}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Licensed therapist specializing in LGBTQIA+ affirming care..."
          />
          <div className="mt-1 flex justify-between">
            {errors.shortBio && (
              <p className="text-sm text-red-600">{errors.shortBio.message}</p>
            )}
            <p
              className={`text-xs ${
                shortBio.length > 200 ? "text-red-600" : "text-gray-500"
              } ml-auto`}
            >
              {shortBio.length}/200
            </p>
          </div>
        </div>

        {/* Full Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Full Description <span className="text-red-500">*</span>
          </label>
          <p className="text-xs text-gray-500 mb-2">
            Detailed description of your services, approach, and what clients
            can expect (100-2000 characters)
          </p>
          <textarea
            id="description"
            {...register("description")}
            rows={6}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Tell potential clients about your background, approach, specializations, and what makes your practice affirming..."
          />
          <div className="mt-1 flex justify-between">
            {errors.description && (
              <p className="text-sm text-red-600">
                {errors.description.message}
              </p>
            )}
            <p
              className={`text-xs ${
                description.length > 2000 ? "text-red-600" : "text-gray-500"
              } ml-auto`}
            >
              {description.length}/2000
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {isSubmitting ? "Saving..." : "Next: Location"}
        </button>
      </div>
    </form>
  );
}
