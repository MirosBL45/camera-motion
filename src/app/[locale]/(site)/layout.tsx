import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export default function SiteLayout({ children }: LayoutProps<"/[locale]">) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
