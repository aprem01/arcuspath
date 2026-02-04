import Link from "next/link";
import { Metadata } from "next";
import {
  Heart,
  Scale,
  PiggyBank,
  Briefcase,
  Sparkles,
  Clock,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Shield,
} from "lucide-react";
import { educationTopics, getAllEducationCategories } from "@/data/education";

export const metadata: Metadata = {
  title: "ArcusPath 360 - Your Guide to Affirming Services | ArcusPath",
  description:
    "Free educational resources to help LGBTQIA+ individuals navigate healthcare, legal, financial, and career services with confidence.",
};

const categoryIcons = {
  healthcare: Heart,
  legal: Scale,
  financial: PiggyBank,
  career: Briefcase,
  general: Sparkles,
  lifestyle: Sparkles,
};

export default function ArcusPath360Page() {
  const categories = getAllEducationCategories();

  // Group topics by category
  const topicsByCategory = categories.map((category) => ({
    ...category,
    topics: educationTopics.filter((t) => t.category === category.id),
    Icon: categoryIcons[category.id] || Sparkles,
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <header className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium mb-6">
          <BookOpen className="w-4 h-4" aria-hidden="true" />
          Free Educational Resources
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
          ArcusPath{" "}
          <span className="bg-gradient-arcus bg-clip-text text-transparent">
            360
          </span>
        </h1>

        <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
          Your comprehensive guide to navigating affirming services. Get the
          knowledge and confidence you need to access healthcare, legal, financial,
          and career services that respect and support your identity.
        </p>

        {/* Key Benefits */}
        <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" aria-hidden="true" />
            <span>Expert-reviewed content</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-emerald-600" aria-hidden="true" />
            <span>Privacy-first approach</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-emerald-600" aria-hidden="true" />
            <span>Practical checklists</span>
          </div>
        </div>
      </header>

      {/* Category Sections */}
      <div className="space-y-16">
        {topicsByCategory.map((category) => {
          const Icon = category.Icon;

          return (
            <section key={category.id} aria-labelledby={`${category.id}-heading`}>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-gradient-arcus">
                  <Icon className="w-6 h-6 text-white" aria-hidden="true" />
                </div>
                <div>
                  <h2
                    id={`${category.id}-heading`}
                    className="text-2xl font-bold text-slate-900"
                  >
                    {category.name}
                  </h2>
                  <p className="text-slate-600">{category.description}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.topics.map((topic) => (
                  <Link
                    key={topic.id}
                    href={`/360/${topic.slug}`}
                    className="card p-6 hover:shadow-lg hover:border-purple-200 transition-all group"
                  >
                    <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-arcus-purple transition-colors">
                      {topic.title}
                    </h3>

                    <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                      {topic.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1 text-sm text-slate-500">
                        <Clock className="w-4 h-4" aria-hidden="true" />
                        {topic.readTime} min read
                      </span>

                      {topic.checklist && topic.checklist.length > 0 && (
                        <span className="flex items-center gap-1 text-sm text-emerald-600">
                          <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                          {topic.checklist.length}-step checklist
                        </span>
                      )}
                    </div>

                    <div className="mt-4 pt-4 border-t border-slate-100 flex items-center text-arcus-purple font-medium text-sm group-hover:gap-2 transition-all">
                      Read guide
                      <ArrowRight
                        className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                        aria-hidden="true"
                      />
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* CTA Section */}
      <section className="mt-20 text-center">
        <div className="card p-8 md:p-12 bg-gradient-to-br from-purple-50 to-teal-50">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            Ready to Find Affirming Providers?
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto mb-8">
            Now that you know what to look for, search our verified directory of
            LGBTQIA+ affirming healthcare providers, attorneys, financial advisors,
            and more.
          </p>
          <Link
            href="/search"
            className="btn-primary inline-flex items-center gap-2 text-lg px-8 py-3"
          >
            Explore Providers
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* Trust Statement */}
      <footer className="mt-16 text-center">
        <p className="text-sm text-slate-500 max-w-2xl mx-auto">
          ArcusPath 360 content is created by LGBTQIA+ community members and experts.
          Information is for educational purposes and does not constitute legal,
          medical, or financial advice. Always consult with qualified professionals
          for your specific situation.
        </p>
      </footer>
    </div>
  );
}
