import { outfit, sourceSans3 } from "@/lib/fonts";

import "../globals.css";

// Sopstveni root layout van [locale] stabla — briše se zajedno sa /dev-ui u featureu 21.
export default function DevUiLayout({ children }: LayoutProps<"/dev-ui">) {
  return (
    <html lang="sr" className={`${outfit.variable} ${sourceSans3.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
