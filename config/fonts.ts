import {
  Fira_Code as FontMono,
  Inter as FontSans,
  Dancing_Script as Dancing,
} from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const fontDancing = Dancing({
  subsets: ["latin"],
  variable: "--font-dancing",
});
