import Link from "next/link";
import {
  Heart,
  Scale,
  Banknote,
  Briefcase,
  Sparkles,
  LucideIcon,
} from "lucide-react";
import { Category } from "@/lib/types";

const iconMap: Record<string, LucideIcon> = {
  Heart,
  Scale,
  Banknote,
  Briefcase,
  Sparkles,
};

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const Icon = iconMap[category.icon] || Heart;

  return (
    <Link
      href={`/search?category=${category.id}`}
      className="card p-6 group text-center"
    >
      <div className="w-14 h-14 rounded-2xl bg-arcus-purple/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-arcus-purple group-hover:scale-110 transition-all">
        <Icon className="w-7 h-7 text-arcus-purple group-hover:text-white transition-colors" />
      </div>
      <h3 className="font-semibold text-lg text-slate-900 mb-2">
        {category.name}
      </h3>
      <p className="text-sm text-slate-600 mb-3">{category.description}</p>
      <p className="text-xs text-arcus-purple font-medium">
        {category.providerCount} providers
      </p>
    </Link>
  );
}

export function CategoryList({ categories }: { categories: Category[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  );
}
