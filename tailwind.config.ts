import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@relume_io/relume-ui/dist/**/*.{js,ts,jsx,tsx}",
  ],
  presets: [require("@relume_io/relume-tailwind")],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        headings: "var(--headings)",
        tagline: "var(--tagline)",
        altBackground: "var(--alt-background)",
        cardBackground: "var(--card-background)",
        cardText: "var(--card-text)",
        ctaAlt: "var(--cta-alt)",
        neutral: "#f9f9f9",
      },
    },
    fontSize: {
      lg: "1.125rem",
      "2xl": "1.5rem",
      "5xl": "3rem",
      "6xl": "5rem",
    },
  },
  plugins: [],
};
export default config;
