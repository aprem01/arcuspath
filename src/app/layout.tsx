import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ArcusPath - Trusted Services for the LGBTQIA+ Community",
  description:
    "Find verified, LGBTQIA+-affirming professionals in healthcare, legal, financial, career, and lifestyle services. Built on trust, inclusion, and privacy.",
  keywords: [
    "LGBTQIA+",
    "LGBTQ",
    "affirming care",
    "healthcare",
    "legal services",
    "financial planning",
    "trusted providers",
    "inclusive services",
  ],
  authors: [{ name: "ArcusPath" }],
  creator: "ArcusPath",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "ArcusPath",
    title: "ArcusPath - Trusted Services for the LGBTQIA+ Community",
    description:
      "Find verified, LGBTQIA+-affirming professionals in healthcare, legal, financial, career, and lifestyle services.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ArcusPath - Trusted Services for the LGBTQIA+ Community",
    description:
      "Find verified, LGBTQIA+-affirming professionals in healthcare, legal, financial, career, and lifestyle services.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        {/* Skip to main content - Accessibility */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        <div className="min-h-screen flex flex-col">
          <Header />
          <main id="main-content" className="flex-1" role="main">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
