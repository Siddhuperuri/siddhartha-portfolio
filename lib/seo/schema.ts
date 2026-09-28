type JsonLdValue =
  | boolean
  | number
  | string
  | JsonLdValue[]
  | { [key: string]: JsonLdValue | undefined }
  | undefined;

export type JsonLd = {
  "@context": "https://schema.org";
  "@type": string;
  [key: string]: JsonLdValue;
};

export function serializeJsonLd(schema: JsonLd) {
  return JSON.stringify(schema).replace(/</g, "\\u003c");
}
