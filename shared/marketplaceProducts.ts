export type MarketplaceProductType = "digital" | "hosted" | "service" | "subscription" | "hosting" | "system" | "free-resource";
export type FulfillmentType = "download" | "access" | "onboarding" | "hybrid" | "free-resource";
export type FulfillmentStatus = "READY" | "CONFIGURATION_REQUIRED" | "ENGINEERING_REQUIRED" | "MANUAL_FULFILLMENT" | "NOT_APPLICABLE";
export type LaunchStatus = "DRAFT" | "FULFILLMENT CONFIGURATION REQUIRED" | "ENGINEERING READY" | "CHECKOUT READY" | "LAUNCH READY" | "LIVE" | "ARCHIVED";

export interface MarketplaceProduct {
  slug: string;
  name: string;
  shortDescription: string;
  category: string;
  type: MarketplaceProductType;
  priceDisplay: string;
  stripeProductId: string | null;
  stripePriceId: string | null;
  recurring: boolean;
  benefits: string[];
  included: string[];
  fulfillmentType: FulfillmentType;
  downloadUrl: string | null;
  accessUrl: string | null;
  nextStepUrl: string | null;
  requiresDigitalDelivery: boolean;
  requiresAccessInstructions: boolean;
  requiresOnboarding: boolean;
  supportReference: string;
  fulfillmentStatus: FulfillmentStatus;
  launchStatus: LaunchStatus;
  source: string;
}

const SUPPORT = "/get-started";

export const MARKETPLACE_PRODUCTS: MarketplaceProduct[] = [
  {
    slug: "automation-system", name: "Automation System", shortDescription: "Speed-to-lead, follow-up, reactivation, processing, and reporting automation.", category: "AI & Automation", type: "system", priceDisplay: "$997", stripeProductId: "prod_UdtsmPXCUsyOPe", stripePriceId: "price_1Tec5lIVlv7TZiKS5KOlD53t", recurring: false,
    benefits: ["Reduce manual follow-up", "Create repeatable workflows", "Improve response consistency", "Centralize core automations"], included: ["Lead follow-up automation", "Reactivation workflows", "Processing workflows", "Reporting foundation"], fulfillmentType: "hybrid", downloadUrl: null, accessUrl: null, nextStepUrl: null, requiresDigitalDelivery: true, requiresAccessInstructions: true, requiresOnboarding: true, supportReference: SUPPORT, fulfillmentStatus: "CONFIGURATION_REQUIRED", launchStatus: "FULFILLMENT CONFIGURATION REQUIRED", source: "Existing website + live Stripe catalog"
  },
  {
    slug: "business-launch-system", name: "Business Launch System", shortDescription: "A coordinated launch system combining automation, website, branding, and client acquisition.", category: "Professional Systems", type: "system", priceDisplay: "$1,497", stripeProductId: "prod_UdttNwT73OHOvn", stripePriceId: "price_1Tec5pIVlv7TZiKSO69DLm7g", recurring: false,
    benefits: ["Coordinate launch essentials", "Reduce setup fragmentation", "Create an acquisition foundation", "Move from planning to execution"], included: ["Automation system", "Website and funnel setup", "Brand foundation", "Client acquisition system"], fulfillmentType: "hybrid", downloadUrl: null, accessUrl: null, nextStepUrl: null, requiresDigitalDelivery: true, requiresAccessInstructions: true, requiresOnboarding: true, supportReference: SUPPORT, fulfillmentStatus: "CONFIGURATION_REQUIRED", launchStatus: "FULFILLMENT CONFIGURATION REQUIRED", source: "Existing website + live Stripe catalog"
  },
  {
    slug: "scale-system", name: "Scale System", shortDescription: "Advanced business automation, integrations, reporting, and support for scaling operations.", category: "Professional Systems", type: "system", priceDisplay: "$3,000", stripeProductId: "prod_Udtt5iQCHMmJi2", stripePriceId: "price_1Tec5tIVlv7TZiKSQ4sbw0kA", recurring: false,
    benefits: ["Connect growth systems", "Standardize team execution", "Improve reporting visibility", "Support more complex operations"], included: ["Advanced automation", "Custom integrations", "Reporting", "Implementation support"], fulfillmentType: "hybrid", downloadUrl: null, accessUrl: null, nextStepUrl: null, requiresDigitalDelivery: false, requiresAccessInstructions: true, requiresOnboarding: true, supportReference: SUPPORT, fulfillmentStatus: "CONFIGURATION_REQUIRED", launchStatus: "FULFILLMENT CONFIGURATION REQUIRED", source: "Existing website + live Stripe catalog"
  },
  {
    slug: "prompt-pack-starter", name: "Prompt Pack - Starter", shortDescription: "10 AI prompts for business automation basics.", category: "Prompt Packs", type: "digital", priceDisplay: "$47", stripeProductId: "prod_Udtt1h2rTBNPZx", stripePriceId: "price_1Tec5xIVlv7TZiKSq1eJjfdQ", recurring: false,
    benefits: ["Start faster with structured prompts", "Reduce blank-page effort", "Create repeatable AI workflows", "Use practical business scenarios"], included: ["10 AI prompts", "Business automation basics"], fulfillmentType: "download", downloadUrl: null, accessUrl: null, nextStepUrl: null, requiresDigitalDelivery: true, requiresAccessInstructions: false, requiresOnboarding: false, supportReference: SUPPORT, fulfillmentStatus: "CONFIGURATION_REQUIRED", launchStatus: "FULFILLMENT CONFIGURATION REQUIRED", source: "Live Stripe catalog"
  },
  {
    slug: "prompt-pack-pro", name: "Prompt Pack - Pro", shortDescription: "50 AI prompts for advanced business automation.", category: "Prompt Packs", type: "digital", priceDisplay: "$97", stripeProductId: "prod_UdttkO9cILYqC1", stripePriceId: "price_1Tec61IVlv7TZiKSBogQn8Ip", recurring: false,
    benefits: ["Expand automation use cases", "Standardize advanced prompting", "Improve repeatability", "Accelerate implementation"], included: ["50 AI prompts", "Advanced automation scenarios"], fulfillmentType: "download", downloadUrl: null, accessUrl: null, nextStepUrl: null, requiresDigitalDelivery: true, requiresAccessInstructions: false, requiresOnboarding: false, supportReference: SUPPORT, fulfillmentStatus: "CONFIGURATION_REQUIRED", launchStatus: "FULFILLMENT CONFIGURATION REQUIRED", source: "Live Stripe catalog"
  },
  {
    slug: "prompt-pack-ultimate", name: "Prompt Pack - Ultimate", shortDescription: "200 AI prompts covering a broad business automation library.", category: "Prompt Packs", type: "digital", priceDisplay: "$197", stripeProductId: "prod_UdttjXVmag0Gun", stripePriceId: "price_1Tec66IVlv7TZiKSzOmbKFWg", recurring: false,
    benefits: ["Broaden AI coverage", "Create reusable workflows", "Support multiple business functions", "Reduce repetitive setup"], included: ["200 AI prompts", "Business automation library"], fulfillmentType: "download", downloadUrl: null, accessUrl: null, nextStepUrl: null, requiresDigitalDelivery: true, requiresAccessInstructions: false, requiresOnboarding: false, supportReference: SUPPORT, fulfillmentStatus: "CONFIGURATION_REQUIRED", launchStatus: "FULFILLMENT CONFIGURATION REQUIRED", source: "Live Stripe catalog"
  },
  {
    slug: "hosting-starter", name: "Web Hosting - Starter", shortDescription: "Starter hosting with SSL and 5GB storage.", category: "Hosting", type: "hosting", priceDisplay: "$19/mo", stripeProductId: "prod_UdttqJFGqJKRYy", stripePriceId: "price_1Tec6AIVlv7TZiKSkAw2UeBS", recurring: true,
    benefits: ["Managed hosting foundation", "SSL included", "Clear monthly billing", "Business-ready entry tier"], included: ["5GB storage", "SSL", "Hosting access"], fulfillmentType: "access", downloadUrl: null, accessUrl: null, nextStepUrl: null, requiresDigitalDelivery: false, requiresAccessInstructions: true, requiresOnboarding: false, supportReference: SUPPORT, fulfillmentStatus: "CONFIGURATION_REQUIRED", launchStatus: "FULFILLMENT CONFIGURATION REQUIRED", source: "Existing website + live Stripe catalog"
  },
  {
    slug: "hosting-business", name: "Web Hosting - Business", shortDescription: "Business hosting with expanded storage and priority support.", category: "Hosting", type: "hosting", priceDisplay: "$49/mo", stripeProductId: "prod_Udtuf2jh8TR0ID", stripePriceId: "price_1Tec6EIVlv7TZiKSEoh2dIUj", recurring: true,
    benefits: ["More hosting capacity", "Priority support", "Predictable monthly billing", "Room for growing sites"], included: ["Business hosting", "SSL", "Priority support"], fulfillmentType: "access", downloadUrl: null, accessUrl: null, nextStepUrl: null, requiresDigitalDelivery: false, requiresAccessInstructions: true, requiresOnboarding: false, supportReference: SUPPORT, fulfillmentStatus: "CONFIGURATION_REQUIRED", launchStatus: "FULFILLMENT CONFIGURATION REQUIRED", source: "Existing website + live Stripe catalog"
  },
  {
    slug: "dfy-website-build", name: "DFY Website Build", shortDescription: "Done-for-you professional website implementation.", category: "Services", type: "service", priceDisplay: "$1,497", stripeProductId: "prod_UdtuysnYc6woRm", stripePriceId: "price_1Tec6MIVlv7TZiKSmFt0H1Pu", recurring: false,
    benefits: ["Reduce implementation burden", "Get a professional build", "Move faster to launch", "Use a defined delivery process"], included: ["Website implementation", "Project setup", "Launch coordination"], fulfillmentType: "onboarding", downloadUrl: null, accessUrl: null, nextStepUrl: null, requiresDigitalDelivery: false, requiresAccessInstructions: false, requiresOnboarding: true, supportReference: SUPPORT, fulfillmentStatus: "CONFIGURATION_REQUIRED", launchStatus: "FULFILLMENT CONFIGURATION REQUIRED", source: "Existing website + live Stripe catalog"
  },
  {
    slug: "shopify-app-basic", name: "Shopify App - Basic", shortDescription: "Basic Shopify automation app access.", category: "Tools & Apps", type: "subscription", priceDisplay: "$29/mo", stripeProductId: "prod_Udtu1mSZ63S7SR", stripePriceId: "price_1Tec6UIVlv7TZiKSPYWts1Ra", recurring: true,
    benefits: ["Add Shopify automation", "Use recurring app access", "Reduce repetitive store work", "Start with a focused feature set"], included: ["Basic app access", "Subscription access"], fulfillmentType: "access", downloadUrl: null, accessUrl: null, nextStepUrl: null, requiresDigitalDelivery: false, requiresAccessInstructions: true, requiresOnboarding: false, supportReference: SUPPORT, fulfillmentStatus: "CONFIGURATION_REQUIRED", launchStatus: "FULFILLMENT CONFIGURATION REQUIRED", source: "Existing website + live Stripe catalog"
  }
];

export const PROFESSIONAL_SYSTEMS = ["Customer Service System™", "Sales System™", "HR System™", "Marketing System™", "Operations System™", "AI Automation Bundles™"] as const;

export const APPROVED_FREE_RESOURCES = [
  { slug: "30-minute-business-reset", name: "30-Minute Business Reset", category: "Business Foundations", format: "Fillable PDF", driveFileId: "1ILWHypoHFwaCD5YbhIxSUhwRBx-y0_Yy", deliveryStatus: "INTERNAL_SOURCE_VERIFIED" },
  { slug: "business-systems-checklist", name: "Business Systems Checklist", category: "Business Foundations", format: "Fillable PDF", driveFileId: "1-py5ugpfixb2Rjdk1faQ27qGOjCyPzxj", deliveryStatus: "INTERNAL_SOURCE_VERIFIED" },
  { slug: "business-health-check", name: "Business Health Check", category: "Business Foundations", format: "Spreadsheet", driveFileId: "1jjPrWS7I6bwnwgTQjQLekuTntdQsbEKF", deliveryStatus: "INTERNAL_SOURCE_VERIFIED" }
] as const;

export function getMarketplaceProduct(slug: string) {
  return MARKETPLACE_PRODUCTS.find((product) => product.slug === slug) ?? null;
}

export function getMarketplaceProductByPriceId(priceId: string) {
  return MARKETPLACE_PRODUCTS.find((product) => product.stripePriceId === priceId) ?? null;
}

export function productCheckoutReady(product: MarketplaceProduct) {
  if (!product.stripePriceId || product.fulfillmentStatus !== "READY") return false;
  if (product.requiresDigitalDelivery && !product.downloadUrl) return false;
  if (product.requiresAccessInstructions && !product.accessUrl) return false;
  if (product.requiresOnboarding && !product.nextStepUrl) return false;
  return true;
}
