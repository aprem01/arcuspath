import Link from "next/link";
import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-arcus-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-arcus flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="text-xl font-bold">ArcusPath</span>
            </Link>
            <p className="text-slate-400 mb-4 max-w-md">
              Connecting the LGBTQIA+ community with trusted, affirming service
              providers. Because everyone deserves access to safe, inclusive
              care.
            </p>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <span>Built with</span>
              <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
              <span>for our community</span>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/search?category=healthcare"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Healthcare
                </Link>
              </li>
              <li>
                <Link
                  href="/search?category=legal"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Legal
                </Link>
              </li>
              <li>
                <Link
                  href="/search?category=financial"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Financial
                </Link>
              </li>
              <li>
                <Link
                  href="/search?category=career"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Career
                </Link>
              </li>
              <li>
                <Link
                  href="/search?category=lifestyle"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Lifestyle
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  For Providers
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Trust & Safety
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-8 pt-8 text-center text-sm text-slate-400">
          <p>&copy; {new Date().getFullYear()} ArcusPath. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
