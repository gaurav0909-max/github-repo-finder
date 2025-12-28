import Script from "next/script";

/**
 * StructuredData Component
 *
 * Renders JSON-LD structured data for SEO purposes.
 * Use this component to inject Schema.org markup into pages for rich snippets
 * in search engine results.
 *
 * @param data - The structured data object (from structured-data.ts helpers)
 *
 * @example
 * ```tsx
 * import { getWebsiteSchema } from '@/lib/seo/structured-data';
 * import StructuredData from '@/components/seo/structured-data';
 *
 * <StructuredData data={getWebsiteSchema()} />
 * ```
 */
interface StructuredDataProps {
  data: Record<string, any>;
}

export default function StructuredData({ data }: StructuredDataProps) {
  return (
    <Script
      id={`structured-data-${data["@type"]?.toLowerCase() || "schema"}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      strategy="beforeInteractive"
    />
  );
}
