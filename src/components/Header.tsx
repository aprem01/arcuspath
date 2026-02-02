"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Search } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-arcus flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <span className="text-xl font-bold text-arcus-navy">ArcusPath</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/search"
              className="text-slate-600 hover:text-arcus-purple transition-colors"
            >
              Browse Providers
            </Link>
            <Link
              href="/search?category=healthcare"
              className="text-slate-600 hover:text-arcus-purple transition-colors"
            >
              Healthcare
            </Link>
            <Link
              href="/search?category=legal"
              className="text-slate-600 hover:text-arcus-purple transition-colors"
            >
              Legal
            </Link>
            <Link
              href="/search?category=financial"
              className="text-slate-600 hover:text-arcus-purple transition-colors"
            >
              Financial
            </Link>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/search"
              className="flex items-center gap-2 text-slate-600 hover:text-arcus-purple"
            >
              <Search className="w-5 h-5" />
            </Link>
            <button className="btn-secondary text-sm">For Providers</button>
            <button className="btn-primary text-sm">Sign In</button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col gap-4">
              <Link
                href="/search"
                className="text-slate-600 hover:text-arcus-purple"
                onClick={() => setMobileMenuOpen(false)}
              >
                Browse Providers
              </Link>
              <Link
                href="/search?category=healthcare"
                className="text-slate-600 hover:text-arcus-purple"
                onClick={() => setMobileMenuOpen(false)}
              >
                Healthcare
              </Link>
              <Link
                href="/search?category=legal"
                className="text-slate-600 hover:text-arcus-purple"
                onClick={() => setMobileMenuOpen(false)}
              >
                Legal
              </Link>
              <Link
                href="/search?category=financial"
                className="text-slate-600 hover:text-arcus-purple"
                onClick={() => setMobileMenuOpen(false)}
              >
                Financial
              </Link>
              <hr />
              <button className="btn-secondary text-sm w-full">
                For Providers
              </button>
              <button className="btn-primary text-sm w-full">Sign In</button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
