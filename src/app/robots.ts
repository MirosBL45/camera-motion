import type { MetadataRoute } from "next";

import { toAbsoluteUrl } from "@/lib/seo";

// Sve je dozvoljeno osim interne `/dev-ui` stranice (feature 02); link na sitemap (poglavlje 14).
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/dev-ui" },
    sitemap: toAbsoluteUrl("/sitemap.xml"),
  };
}
