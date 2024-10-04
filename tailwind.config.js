import { nextui } from "@nextui-org/theme";
import { siteConfig } from "./config/site";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
        bebas: ["Bebas, sans-serif"],
        dancing: ["var(--font-dancing)"],
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: siteConfig.siteColors.primary,
          },
        },
        dark: {
          colors: {
            primary: siteConfig.siteColors.primary,
          },
        },
      },
    }),
  ],
};