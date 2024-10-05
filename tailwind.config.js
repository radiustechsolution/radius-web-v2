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
            card: siteConfig.siteColors.cardLightColor,
            background: siteConfig.siteColors.bgLightColor,
            bordercolor: "#EBEBEB",
          },
        },
        dark: {
          colors: {
            primary: siteConfig.siteColors.primary,
            card: siteConfig.siteColors.cardDarkColor,
            background: siteConfig.siteColors.bgDarkColor,
            bordercolor: "#3d3d3dbb",
          },
        },
      },
    }),
  ],
};
