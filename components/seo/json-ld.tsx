import { serializeJsonLd, type JsonLd } from "@/lib/seo/schema";

type JsonLdProps = {
  schema: JsonLd;
};

export function JsonLd({ schema }: JsonLdProps) {
  return (
    <script
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }}
      type="application/ld+json"
    />
  );
}
