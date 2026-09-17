import { Outfit, Source_Sans_3 } from "next/font/google";

export const outfit = Outfit({
  variable: "--font-heading",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const sourceSans3 = Source_Sans_3({
  variable: "--font-body",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600"],
  display: "swap",
});
