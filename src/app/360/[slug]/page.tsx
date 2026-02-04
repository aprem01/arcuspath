import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import {
  ChevronLeft,
  Clock,
  Calendar,
  CheckCircle2,
  Circle,
  ExternalLink,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import {
  educationTopics,
  getEducationTopicBySlug,
  getRelatedTopics,
} from "@/data/education";

export function generateStaticParams() {
  return educationTopics.map((topic) => ({
    slug: topic.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const topic = getEducationTopicBySlug(slug);

  if (!topic) {
    return { title: "Topic Not Found - ArcusPath 360" };
  }

  return {
    title: `${topic.title} | ArcusPath 360`,
    description: topic.description,
    openGraph: {
      title: topic.title,
      description: topic.description,
    },
  };
}

// Simple markdown-like rendering for the content
function renderContent(content: string) {
  const lines = content.trim().split("\n");
  const elements: React.ReactNode[] = [];
  let currentList: string[] = [];
  let listType: "ul" | "ol" | null = null;
  let key = 0;

  const flushList = () => {
    if (currentList.length > 0 && listType) {
      const ListTag = listType;
      elements.push(
        <ListTag
          key={key++}
          className={`${listType === "ul" ? "list-disc" : "list-decimal"} list-inside space-y-1 text-slate-600 mb-4 ml-4`}
        >
          {currentList.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ListTag>
      );
      currentList = [];
      listType = null;
    }
  };

  lines.forEach((line) => {
    const trimmed = line.trim();

    if (trimmed === "") {
      flushList();
      return;
    }

    // Headers
    if (trimmed.startsWith("## ")) {
      flushList();
      elements.push(
        <h2 key={key++} className="text-2xl font-bold text-slate-900 mt-8 mb-4">
          {trimmed.slice(3)}
        </h2>
      );
      return;
    }

    if (trimmed.startsWith("### ")) {
      flushList();
      elements.push(
        <h3 key={key++} className="text-xl font-semibold text-slate-900 mt-6 mb-3">
          {trimmed.slice(4)}
        </h3>
      );
      return;
    }

    // Lists
    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      if (listType !== "ul") {
        flushList();
        listType = "ul";
      }
      // Handle bold text in list items
      let text = trimmed.slice(2);
      text = text.replace(/\*\*([^*]+)\*\*/g, "$1");
      currentList.push(text);
      return;
    }

    if (/^\d+\.\s/.test(trimmed)) {
      if (listType !== "ol") {
        flushList();
        listType = "ol";
      }
      currentList.push(trimmed.replace(/^\d+\.\s/, ""));
      return;
    }

    // Regular paragraph
    flushList();
    // Handle bold and remove markdown formatting
    let text = trimmed.replace(/\*\*([^*]+)\*\*/g, "$1");
    elements.push(
      <p key={key++} className="text-slate-600 leading-relaxed mb-4">
        {text}
      </p>
    );
  });

  flushList();

  return elements;
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const topic = getEducationTopicBySlug(slug);

  if (!topic) {
    notFound();
  }

  const relatedTopics = getRelatedTopics(topic.id);

  const categoryLabels: Record<string, string> = {
    healthcare: "Healthcare",
    legal: "Legal",
    financial: "Financial",
    career: "Career",
    general: "Life & Wellness",
    lifestyle: "Lifestyle",
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Link */}
      <Link
        href="/360"
        className="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-arcus-purple mb-6 focus-visible:underline"
      >
        <ChevronLeft className="w-4 h-4" aria-hidden="true" />
        Back to ArcusPath 360
      </Link>

      {/* Article Header */}
      <article>
        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
              {categoryLabels[topic.category] || topic.category}
            </span>
            <span className="flex items-center gap-1 text-sm text-slate-500">
              <Clock className="w-4 h-4" aria-hidden="true" />
              {topic.readTime} min read
            </span>
            <span className="flex items-center gap-1 text-sm text-slate-500">
              <Calendar className="w-4 h-4" aria-hidden="true" />
              Updated {topic.lastUpdated}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            {topic.title}
          </h1>

          <p className="text-xl text-slate-600">{topic.description}</p>
        </header>

        {/* Checklist - Highlighted at top */}
        {topic.checklist && topic.checklist.length > 0 && (
          <section
            className="card p-6 mb-8 bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200"
            aria-labelledby="checklist-heading"
          >
            <h2
              id="checklist-heading"
              className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2"
            >
              <CheckCircle2
                className="w-6 h-6 text-emerald-600"
                aria-hidden="true"
              />
              Quick Start Checklist
            </h2>
            <p className="text-slate-600 text-sm mb-4">
              Use this checklist to guide your journey. Check items off as you complete them.
            </p>

            <ul className="space-y-4" role="list">
              {topic.checklist.map((item, index) => (
                <li key={item.id} className="flex gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    <Circle
                      className="w-5 h-5 text-emerald-400"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-900">
                      <span className="text-emerald-600 mr-2">{index + 1}.</span>
                      {item.text}
                    </p>
                    {item.description && (
                      <p className="text-sm text-slate-600 mt-1">
                        {item.description}
                      </p>
                    )}
                    {item.resources && item.resources.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {item.resources.map((resource, i) => (
                          <Link
                            key={i}
                            href={resource.url}
                            className="inline-flex items-center gap-1 text-sm text-arcus-purple hover:text-purple-700 font-medium"
                          >
                            {resource.label}
                            <ExternalLink className="w-3 h-3" aria-hidden="true" />
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Main Content */}
        <div className="prose-custom">{renderContent(topic.content)}</div>

        {/* CTA to Marketplace */}
        <section className="mt-12 card p-6 bg-gradient-to-br from-purple-50 to-teal-50">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="flex-1">
              <h2 className="text-xl font-bold text-slate-900 mb-2">
                Ready to Take the Next Step?
              </h2>
              <p className="text-slate-600">
                Find verified, LGBTQIA+ affirming providers who can help you with
                your specific needs.
              </p>
            </div>
            <Link
              href={`/search?category=${topic.relatedCategories[0] || ""}`}
              className="btn-primary flex-shrink-0 flex items-center gap-2"
            >
              Find Providers
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </section>

        {/* Related Topics */}
        {relatedTopics.length > 0 && (
          <section className="mt-12" aria-labelledby="related-heading">
            <h2
              id="related-heading"
              className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2"
            >
              <BookOpen className="w-5 h-5 text-arcus-purple" aria-hidden="true" />
              Related Guides
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {relatedTopics.map((related) => (
                <Link
                  key={related.id}
                  href={`/360/${related.slug}`}
                  className="card p-4 hover:shadow-md hover:border-purple-200 transition-all group"
                >
                  <h3 className="font-semibold text-slate-900 group-hover:text-arcus-purple transition-colors">
                    {related.title}
                  </h3>
                  <p className="text-sm text-slate-600 mt-1 line-clamp-2">
                    {related.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm text-arcus-purple mt-2 font-medium">
                    Read more
                    <ArrowRight
                      className="w-3 h-3 group-hover:translate-x-1 transition-transform"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>

      {/* Disclaimer */}
      <footer className="mt-12 pt-8 border-t border-slate-200">
        <p className="text-sm text-slate-500">
          <strong>Disclaimer:</strong> This content is for educational purposes only
          and does not constitute legal, medical, or financial advice. Information
          may vary by jurisdiction and individual circumstances. Always consult with
          qualified professionals for advice specific to your situation.
        </p>
      </footer>
    </div>
  );
}
