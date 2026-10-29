import type { ReactNode } from "react";
import { getLocale } from "next-intl/server";

import { getBlogPostByKey } from "@/lib/blog";

import { ROUTES } from "@/constants/routes";
import { Link } from "@/i18n/navigation";

type LinkableRouteKeyType = Exclude<keyof typeof ROUTES, "blogPost">;

interface IMdxLinkProps {
  href?: string;
  children?: ReactNode;
}

const ROUTE_PREFIX = "route:";
const BLOG_PREFIX = "blog:";

const FOCUS_CLASSES =
  "rounded-sm underline-offset-4 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none";

function isLinkableRouteKey(key: string): key is LinkableRouteKeyType {
  return key !== "blogPost" && Object.hasOwn(ROUTES, key);
}

// Linkovi u člancima se pišu preko ključeva, ne lokalizovanih adresa, pa isti zapis radi
// u sr i en tekstu i ne puca kad se putanja promeni (poglavlje 7.2):
//   [stranica venčanja](route:servicesWeddings)    — ključ iz `ROUTES`
//   [kontakt](route:contact?usluga=vencanje)       — uz query parametre
//   [drugi članak](blog:snimanje-svadbe-dronom)    — naziv MDX fajla, slug ide po jeziku
//   [spoljni sajt](https://...)                    — otvara se u novom tabu
// Nepoznat ključ ili članak ruši build, umesto da na sajtu ostane pokvaren link.
export async function MdxLink({ href = "", children }: IMdxLinkProps) {
  if (href.startsWith(ROUTE_PREFIX)) {
    const [key, queryString = ""] = href.slice(ROUTE_PREFIX.length).split("?");

    if (!isLinkableRouteKey(key)) {
      throw new Error(`[blog] Nepoznata ruta u linku članka: ${href}`);
    }

    return (
      <Link
        href={{
          pathname: ROUTES[key],
          query: Object.fromEntries(new URLSearchParams(queryString)),
        }}
        className={FOCUS_CLASSES}
      >
        {children}
      </Link>
    );
  }

  if (href.startsWith(BLOG_PREFIX)) {
    const locale = await getLocale();
    const post = await getBlogPostByKey(locale, href.slice(BLOG_PREFIX.length));

    if (!post) {
      throw new Error(`[blog] Članak iz linka ne postoji na jeziku „${locale}": ${href}`);
    }

    return (
      <Link
        href={{ pathname: ROUTES.blogPost, params: { slug: post.slug } }}
        className={FOCUS_CLASSES}
      >
        {children}
      </Link>
    );
  }

  if (/^https:\/\//.test(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={FOCUS_CLASSES}>
        {children}
      </a>
    );
  }

  throw new Error(`[blog] Link u članku mora počinjati sa route:, blog: ili https:// — ${href}`);
}
