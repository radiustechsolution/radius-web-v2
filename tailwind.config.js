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
      // animation: {
      //   marquee: "marquee 30s linear infinite",
      // },
      // keyframes: {
      //   marquee: {
      //     "0%": { transform: "translateX(100%)" },
      //     "100%": { transform: "translateX(-100%)" },
      //   },
      // },
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
            primarymodecolor: siteConfig.siteColors.primary,
            primarymodecolorgray: siteConfig.siteColors.primary,
            iconBg: "#dbeafe",
            serviceIconBg: "#DBEAFE",
            serviceIconColor: siteConfig.siteColors.primary,
            promoCodeDisplayBg: "#dbeafe",
          },
        },
        dark: {
          colors: {
            primary: siteConfig.siteColors.primary,
            card: siteConfig.siteColors.cardDarkColor,
            background: siteConfig.siteColors.bgDarkColor,
            bordercolor: "#3d3d3dbb",
            primarymodecolor: "#ffffff",
            primarymodecolorgray: "#d1d5db",
            iconBg: "#dbeafe3e",
            serviceIconBg: siteConfig.siteColors.cardDarkColor,
            serviceIconColor: "#ffffff",
            promoCodeDisplayBg: siteConfig.siteColors.cardDarkColor,
          },
        },
      },
    }),
  ],
};
