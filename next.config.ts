import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

import en from "./src/i18n/messages/en";
import sr from "./src/i18n/messages/sr";
import { validateMessages } from "./src/i18n/validator";

// Puca u build-u/dev-u ako sr i en prevodi nemaju iste ključeve (poglavlje 8.3)
validateMessages(sr, en);

const nextConfig: NextConfig = {
  images: {
    // YouTube thumbnail za `YouTubeLite` facade — jedini remote izvor slika na sajtu
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        pathname: "/vi/**",
      },
    ],
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
