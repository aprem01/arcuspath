import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ArcusPath brand colors - professional, trustworthy, inclusive
        arcus: {
          purple: "#7C3AED",      // Primary - represents diversity
          blue: "#2563EB",        // Trust, stability
          teal: "#0D9488",        // Growth, health
          pink: "#EC4899",        // Warmth, community
          orange: "#F97316",      // Energy, action
          navy: "#1E293B",        // Professional, grounded
        },
        trust: {
          verified: "#059669",    // Green - verified
          affirming: "#7C3AED",   // Purple - affirming
          owned: "#EC4899",       // Pink - LGBTQIA+ owned
          trained: "#2563EB",     // Blue - trained
        }
      },
      backgroundImage: {
        "gradient-pride": "linear-gradient(135deg, #E40303 0%, #FF8C00 17%, #FFED00 33%, #008026 50%, #24408E 67%, #732982 100%)",
        "gradient-arcus": "linear-gradient(135deg, #7C3AED 0%, #2563EB 50%, #0D9488 100%)",
      }
    },
  },
  plugins: [],
};

export default config;
