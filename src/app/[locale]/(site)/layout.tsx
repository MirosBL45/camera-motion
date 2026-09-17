import { Header } from "@/components/layout/Header";

export default function SiteLayout({ children }: LayoutProps<"/[locale]">) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
