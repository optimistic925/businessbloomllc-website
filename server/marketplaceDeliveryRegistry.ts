const DOWNLOAD_ORIGIN = "https://downloads.businessbloomllc.com";
const R2_PREFIX = "Business-Bloom-Website-System-v1.0-Customer-Download (1)";

function objectUrl(fileName: string) {
  const encodedKey = `${R2_PREFIX}/${fileName}`
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");
  return `${DOWNLOAD_ORIGIN}/${encodedKey}`;
}

/**
 * Server-only paid-delivery registry for the 13 current launch-gate products.
 *
 * These URLs are customer-safe Worker routes only. The underlying R2 bucket is
 * private, r2.dev is disabled, and the Worker requires an HMAC signature before
 * any object is returned.
 */
export const MARKETPLACE_PAID_DELIVERY_REGISTRY = {
  "business-bloom-customer-service-system": {
    download_url: objectUrl("Business-Bloom-Customer-Service-System-v1.0.zip"),
  },
  "business-bloom-hr-system": {
    download_url: objectUrl("Business-Bloom-HR-System-v1.0.zip"),
  },
  "business-bloom-marketing-system": {
    download_url: objectUrl("Business-Bloom-Marketing-System-v1.0.zip"),
  },
  "business-bloom-operations-system": {
    download_url: objectUrl("Business-Bloom-Operations-System-v1.0.zip"),
  },
  "business-bloom-ai-automation-bundles": {
    download_url: objectUrl("Business-Bloom-AI-Automation-Bundles-v1.0.zip"),
  },
  "business-bloom-professional-systems": {
    download_url: objectUrl("Business-Bloom-Professional-Systems-v1.0.zip"),
  },
  "business-bloom-website-system": {
    download_url: objectUrl("Business-Bloom-Website-System-v1.0-Customer-Download (1).zip"),
  },
  "business-bloom-virtual-executive-team": {
    download_url: objectUrl("Business-Bloom-Virtual-Executive-Team-v1.1-Customer (1).zip"),
  },
  "business-bloom-branding-system": {
    download_url: `${DOWNLOAD_ORIGIN}/bundles/business-bloom-branding-system`,
  },
  "business-bloom-foundation-system": {
    download_url: objectUrl("Business-Bloom-LLC-Foundation-System-v1.0.zip"),
  },
  "business-bloom-business-launch-blueprint": {
    download_url: objectUrl("Business-Bloom-Business-Launch-Blueprint-v1.0.zip"),
  },
  "business-bloom-content-marketing-system": {
    download_url: objectUrl("Business-Bloom-Content-Marketing-System-v1.0-Customer-Download.zip"),
  },
  "business-bloom-social-media-system": {
    download_url: objectUrl("Business-Bloom-Social-Media-System-v1.0.zip"),
  },
} as const;

export const BRANDING_R2_OBJECT_KEYS = [
  `${R2_PREFIX}/Business-Bloom-Branding-System-v1.0-Part-1-Core-Editable.zip`,
  `${R2_PREFIX}/Business-Bloom-Branding-System-v1.0-Part-2-Worksheets.zip`,
  `${R2_PREFIX}/Business-Bloom-Branding-System-v1.0-Part-3-Examples-Safety-Reference.zip`,
  `${R2_PREFIX}/Business-Bloom-Branding-System-v1.0-Part-4-PDFs.zip`,
] as const;
