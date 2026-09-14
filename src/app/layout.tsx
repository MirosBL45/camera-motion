import type { Metadata } from "next";
import { Outfit, Source_Sans_3 } from "next/font/google";

import "./globals.css";

const outfit = Outfit({
  variable: "--font-heading",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const sourceSans3 = Source_Sans_3({
  variable: "--font-body",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Camera Motion",
  description: "Video produkcija iz Beograda — snimanje dronom i kamerom",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  // TODO(feature 03): <html lang> treba da prati aktivni locale umesto fiksnog "sr"
  return (
    <html lang="sr" className={`${outfit.variable} ${sourceSans3.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
