import { serializeJsonLd } from "@/lib/structured-data";
import type { JsonLdType } from "@/types/seo.type";

interface IJsonLdProps {
  data: JsonLdType;
}

// Strukturirani podaci se renderuju kao običan `<script>` u stranici (Next.js JSON-LD vodič);
// `next/script` nije za ovo jer JSON-LD nije izvršni kod.
export function JsonLd({ data }: IJsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
