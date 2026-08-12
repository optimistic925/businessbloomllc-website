export type MarketplaceProductType = "digital" | "hosted" | "service" | "subscription" | "hosting" | "system" | "bundle" | "free-resource";
export type FulfillmentType = "download" | "access" | "onboarding" | "hybrid" | "free-resource";
export type FulfillmentStatus = "READY" | "CONFIGURATION_REQUIRED" | "ENGINEERING_REQUIRED" | "MANUAL_FULFILLMENT" | "NOT_APPLICABLE";
export type LaunchStatus = "DRAFT" | "FULFILLMENT CONFIGURATION REQUIRED" | "ENGINEERING READY" | "CHECKOUT READY" | "LAUNCH READY" | "LIVE" | "ARCHIVED";
export type CatalogStatus = "CURRENT_APPROVED_PRODUCT" | "CURRENT_PRODUCT_IN_PRODUCTION" | "LEGACY_ARCHIVED" | "INTERNAL_ONLY" | "NOT_A_MARKETPLACE_PRODUCT";
export type BillingModel = "FREE" | "ONE_TIME" | "RECURRING" | "REQUIRED";
export type StripeMatchStatus = "MATCHED" | "STRIPE_PRODUCT_REQUIRED" | "STRIPE_PRICE_REQUIRED" | "NOT_REQUIRED";

export interface MarketplaceProduct {
  slug: string;
  name: string;
  collection: string;
  shortDescription: string;
  category: string;
  type: MarketplaceProductType;
  freeOrPaid: "FREE" | "PAID";
  billingModel: BillingModel;
  priceDisplay: string;
  stripeProductId: string | null;
  stripePriceId: string | null;
  stripeMatchStatus: StripeMatchStatus;
  recurring: boolean | null;
  benefits: string[];
  included: string[];
  productCoverSourceId: string | null;
  marketplaceGraphicSourceId: string | null;
  productMockupSourceId: string | null;
  customerDownloadSourceId: string | null;
  productMetadataSource: string | null;
  productManifestSource: string | null;
  sourceFolderId: string;
  fulfillmentType: FulfillmentType;
  downloadUrl: string | null;
  accessUrl: string | null;
  nextStepUrl: string | null;
  requiresDigitalDelivery: boolean;
  requiresAccessInstructions: boolean;
  requiresOnboarding: boolean;
  supportReference: string;
  fulfillmentStatus: FulfillmentStatus;
  catalogStatus: CatalogStatus;
  launchStatus: LaunchStatus;
}

const SUPPORT = "/get-started";
const PRICING_PENDING = "Pricing pending";

function currentPaidProduct(input: Omit<MarketplaceProduct, "freeOrPaid" | "billingModel" | "priceDisplay" | "stripeProductId" | "stripePriceId" | "stripeMatchStatus" | "recurring" | "downloadUrl" | "accessUrl" | "nextStepUrl" | "supportReference" | "fulfillmentStatus" | "catalogStatus" | "launchStatus">): MarketplaceProduct {
  return {
    ...input,
    freeOrPaid: "PAID",
    billingModel: "REQUIRED",
    priceDisplay: PRICING_PENDING,
    stripeProductId: null,
    stripePriceId: null,
    stripeMatchStatus: "STRIPE_PRODUCT_REQUIRED",
    recurring: null,
    downloadUrl: null,
    accessUrl: null,
    nextStepUrl: null,
    supportReference: SUPPORT,
    fulfillmentStatus: "CONFIGURATION_REQUIRED",
    catalogStatus: "CURRENT_APPROVED_PRODUCT",
    launchStatus: "FULFILLMENT CONFIGURATION REQUIRED",
  };
}

/**
 * ACTIVE PUBLIC CATALOG
 *
 * Source of truth: Google Drive folder "Business Bloom Marketplace"
 * folder ID 1pZ3yNOQSkkeRMa4jG9Mg9T2IbOXHfLYD.
 *
 * A Stripe record alone is never sufficient to enter this array. Products are
 * admitted only after a current/final Drive product package is confirmed.
 */
export const MARKETPLACE_PRODUCTS: MarketplaceProduct[] = [
  currentPaidProduct({
    slug: "business-bloom-customer-service-system",
    name: "Business Bloom Customer Service System™",
    collection: "Business Bloom Professional Systems™",
    shortDescription: "Current approved Customer Service System package from the Business Bloom Professional Systems collection.",
    category: "Professional Systems",
    type: "system",
    benefits: ["Structured customer-service operating materials", "Reusable customer documents and interactive tools", "Coordinated website and marketplace assets"],
    included: ["Customer documents", "Interactive tools", "Marketplace assets", "Website assets", "Customer ZIP package"],
    productCoverSourceId: "1-2YogeNhY7kqG33t5BkTxheBI2iyKAKz",
    marketplaceGraphicSourceId: "1tw_riKyNe9TjfkeiRzW8fAd3xQfemsfQ",
    productMockupSourceId: "17O0XKJUfZ9S65G8iywGeT5EG7ZWFTLxv",
    customerDownloadSourceId: "1WGajOTbinFpTYdzbH8d3iO5aIBfrd5JV",
    productMetadataSource: null,
    productManifestSource: null,
    sourceFolderId: "19AzPk5VQWRI0Cwek2clMLwR0pNlq2-Ga",
    fulfillmentType: "download",
    requiresDigitalDelivery: true,
    requiresAccessInstructions: false,
    requiresOnboarding: false,
  }),
  currentPaidProduct({
    slug: "business-bloom-hr-system",
    name: "Business Bloom HR System™",
    collection: "Business Bloom Professional Systems™",
    shortDescription: "Current approved HR System package from the Business Bloom Professional Systems collection.",
    category: "Professional Systems",
    type: "system",
    benefits: ["Structured HR operating materials", "Reusable customer documents and interactive tools", "Coordinated website and marketplace assets"],
    included: ["Customer documents", "Interactive tools", "Marketplace assets", "Website assets", "Customer ZIP package"],
    productCoverSourceId: "1Abh0g0G6Ft6OeS6S6Gwij3OLnrlV59jC",
    marketplaceGraphicSourceId: "1_J75NPOxtJW_e-Tn-yJS8gzfKThrE10y",
    productMockupSourceId: "1MDoEYW_IN5ceC_JXQXn88yaL_9PR-hAs",
    customerDownloadSourceId: "1Zd_PuSXiCueqp-uNKoliVTTPET4sgreA",
    productMetadataSource: null,
    productManifestSource: null,
    sourceFolderId: "1ZTDjT__Q-CMHFyyWUPO4rrxtnKND0opy",
    fulfillmentType: "download",
    requiresDigitalDelivery: true,
    requiresAccessInstructions: false,
    requiresOnboarding: false,
  }),
  currentPaidProduct({
    slug: "business-bloom-marketing-system",
    name: "Business Bloom Marketing System™",
    collection: "Business Bloom Professional Systems™",
    shortDescription: "Current approved Marketing System package with strategy, campaign, toolkit, and prompt-library materials.",
    category: "Professional Systems",
    type: "system",
    benefits: ["Organize marketing planning", "Use repeatable campaign materials", "Apply a structured prompt library"],
    included: ["Marketing Quick Start Guide", "Marketing Strategy Playbook and Toolkit", "Marketing Campaign Toolkit", "Fillable Interactive Toolkit", "Marketing AI Prompt Library"],
    productCoverSourceId: "1EUu47xpQ-7sY_EPxEr9Np1whhOZ_JLdt",
    marketplaceGraphicSourceId: "1ycxlwvfPiYv_bS5EgWsrQuByw3Oo5ynk",
    productMockupSourceId: "1XTJAKWSgizGKpBKdsZLNm_wvp_WEw6FV",
    customerDownloadSourceId: "1Ga5FTnW0-xiitChhm4S6a47dQNxie-g1",
    productMetadataSource: null,
    productManifestSource: null,
    sourceFolderId: "1CVPYTbMP4Ovqry7ijJqNQieSy8N0Ces0",
    fulfillmentType: "download",
    requiresDigitalDelivery: true,
    requiresAccessInstructions: false,
    requiresOnboarding: false,
  }),
  currentPaidProduct({
    slug: "business-bloom-operations-system",
    name: "Business Bloom Operations System™",
    collection: "Business Bloom Professional Systems™",
    shortDescription: "Current approved Operations System package with playbooks, SOP tools, dashboards, references, and AI prompts.",
    category: "Professional Systems",
    type: "system",
    benefits: ["Document repeatable operations", "Create clearer SOPs", "Use an operations dashboard and quick-reference materials"],
    included: ["Operations Quick Start Guide", "Operations Playbook and Toolkit", "Operations SOP Toolkit", "Fillable Interactive Toolkit", "Operations AI Prompt Library", "Operations Quick Reference", "Operations Management Dashboard"],
    productCoverSourceId: "1AZ4OdnTWlj5iBkD7K1_dCUZKq4xlAtxJ",
    marketplaceGraphicSourceId: "1Fxk1dVx-DAmHLskQm9Q4DEPWMSo8HKne",
    productMockupSourceId: "1HNtuKAHATr0stiM9dd-axEwSOAjbYwZ9",
    customerDownloadSourceId: "1FP4ntHdVTpJ5-DVIlnhrHzsiL3rhac9Z",
    productMetadataSource: "1anzScG-MBd7TDR2UrDvdg-h2mUFhHShB",
    productManifestSource: null,
    sourceFolderId: "1_t2LTD5AzQtI8cFA18y5fP9_4fDMBbln",
    fulfillmentType: "download",
    requiresDigitalDelivery: true,
    requiresAccessInstructions: false,
    requiresOnboarding: false,
  }),
  currentPaidProduct({
    slug: "business-bloom-ai-automation-bundles",
    name: "Business Bloom AI Automation Bundles™",
    collection: "Business Bloom Professional Systems™",
    shortDescription: "Current approved AI Automation Bundles package with opportunity planning, design tools, prompts, and dashboard materials.",
    category: "Professional Systems",
    type: "system",
    benefits: ["Identify automation opportunities", "Plan human-reviewed automation", "Use repeatable prompts and implementation tools"],
    included: ["AI Automation Quick Start", "AI Automation Playbook", "AI Automation Design Toolkit", "Fillable Interactive Toolkit", "AI Automation Prompt Library", "AI Automation Quick Reference", "Automation Opportunity Dashboard"],
    productCoverSourceId: "10T6VNNimoa-lRqzjjUyAFiCBtKnXSLEh",
    marketplaceGraphicSourceId: "1ZyK-ve4eWpkN5-eIwaiusHqpAW-baH29",
    productMockupSourceId: "1dGJAACmJ-53ILvEXJRVZHaNK9kFkysv2",
    customerDownloadSourceId: "1XuEUzOxiY_-dLkxak8CdaR15O749leTO",
    productMetadataSource: "15q2PlIhgJdWp-ZnHDO5bbntFCYZ79Pmf",
    productManifestSource: null,
    sourceFolderId: "1M6P4CLXBgwVUq9xd4uvQta5DtGbPrz0B",
    fulfillmentType: "download",
    requiresDigitalDelivery: true,
    requiresAccessInstructions: false,
    requiresOnboarding: false,
  }),
  currentPaidProduct({
    slug: "business-bloom-professional-systems",
    name: "Business Bloom Professional Systems™",
    collection: "Business Bloom Professional Systems™",
    shortDescription: "Current approved Professional Systems bundle with a customer start guide, customer-use framework, dashboard, and system package.",
    category: "Professional Systems",
    type: "bundle",
    benefits: ["Coordinate multiple Business Bloom operating systems", "Use a shared customer framework", "Track implementation from one dashboard"],
    included: ["Professional Systems Start Here", "Customer Use Framework", "Professional Systems Dashboard", "Professional Systems ZIP package"],
    productCoverSourceId: "1tquel5-VbwARl-4jnTJMp6RosHCUjITP",
    marketplaceGraphicSourceId: "1ALY7sCfMkuRtum1T34zFnAfbVTwo3UN2",
    productMockupSourceId: "1q1vowWie-xKEB0N0eMlbDCxaRu95bPUD",
    customerDownloadSourceId: "1OjWq9yc8SGC27l-9ZsOv4nbpJHT6gBnA",
    productMetadataSource: null,
    productManifestSource: null,
    sourceFolderId: "1XdOvBvumhXBiTIkxzUui_7awWy2OAp7i",
    fulfillmentType: "download",
    requiresDigitalDelivery: true,
    requiresAccessInstructions: false,
    requiresOnboarding: false,
  }),
  currentPaidProduct({
    slug: "business-bloom-website-system",
    name: "Business Bloom Website System",
    collection: "Standalone Current Products",
    shortDescription: "Current approved website-planning and website-operations system with customer documents, prompts, workflows, worksheets, examples, and QA materials.",
    category: "Digital Business",
    type: "system",
    benefits: ["Plan website strategy and architecture", "Use repeatable website workflows", "Review content and launch readiness with structured QA"],
    included: ["Customer documents", "Customer PDFs", "Agent instructions", "Prompt library", "Workflows", "Worksheets and templates", "Examples", "Quality and safety materials", "Quick reference"],
    productCoverSourceId: "1fxNyUE_qxwy9tTV7xnNrcmhmS1jvj89M",
    marketplaceGraphicSourceId: "1fxNyUE_qxwy9tTV7xnNrcmhmS1jvj89M",
    productMockupSourceId: "18rVbuwxDYdXUP3dBhLVphNZ5VK4fCNGm",
    customerDownloadSourceId: "1MC282-vn_JvvjTQZDcZ3zMZUJ5O8ilSR",
    productMetadataSource: "1f3IFBDK7vsRu-PBujHgUDk_S6Y_TT_lY#Product_Metadata",
    productManifestSource: "1f3IFBDK7vsRu-PBujHgUDk_S6Y_TT_lY#Product_Manifest",
    sourceFolderId: "1Ufy7oqg5m2pyhJcl_Zp3WR7KJ9Sms25b",
    fulfillmentType: "download",
    requiresDigitalDelivery: true,
    requiresAccessInstructions: false,
    requiresOnboarding: false,
  }),
  currentPaidProduct({
    slug: "business-bloom-virtual-executive-team",
    name: "Business Bloom Virtual Executive Team",
    collection: "Standalone Current Products",
    shortDescription: "Structured executive decision-support materials for owner-led business planning.",
    category: "Executive",
    type: "system",
    benefits: ["Clarify major business decisions", "Review strategy, finance, operations, and marketing perspectives", "Convert approved decisions into an action plan"],
    included: ["Start Here Guide", "Customer Guide", "Intake Workbook", "Executive Decision Questionnaire", "Four executive agent instruction files", "Prompt Library", "Workflows", "Worksheets and templates", "Examples", "Safety files", "Quick Reference"],
    productCoverSourceId: "1UT0Wjhl1Aa_gEZtrICkLu_tM_wXp71oJ#10_Marketplace_Graphics/Business_Bloom_VET_Marketplace_Cover_v1.1.png",
    marketplaceGraphicSourceId: "1UT0Wjhl1Aa_gEZtrICkLu_tM_wXp71oJ#10_Marketplace_Graphics",
    productMockupSourceId: "1UT0Wjhl1Aa_gEZtrICkLu_tM_wXp71oJ#12_Product_Mockups/Business_Bloom_VET_Product_Mockup_v1.1.png",
    customerDownloadSourceId: "1UT0Wjhl1Aa_gEZtrICkLu_tM_wXp71oJ#Customer-Download/Business-Bloom-Virtual-Executive-Team-v1.1.zip",
    productMetadataSource: "1UT0Wjhl1Aa_gEZtrICkLu_tM_wXp71oJ#14_Engineering_Handoff/Product_Metadata.json",
    productManifestSource: "1UT0Wjhl1Aa_gEZtrICkLu_tM_wXp71oJ#14_Engineering_Handoff/Product_Manifest.csv",
    sourceFolderId: "1A-yX_eACGZ-aVtJU7XvAbl8TisZuHXaR",
    fulfillmentType: "download",
    requiresDigitalDelivery: true,
    requiresAccessInstructions: false,
    requiresOnboarding: false,
  }),
  currentPaidProduct({
    slug: "business-bloom-branding-system",
    name: "Business Bloom Branding System",
    collection: "Startup Collection",
    shortDescription: "Current approved Branding System with editable core files, worksheets, examples, safety/reference materials, PDFs, marketplace graphics, and product mockups.",
    category: "Startup",
    type: "system",
    benefits: ["Build a repeatable branding foundation", "Use editable customer materials", "Work from coordinated examples and reference files"],
    included: ["Core editable package", "Worksheets", "Examples and safety/reference package", "PDF package", "Marketplace graphics", "Product mockups"],
    productCoverSourceId: "1KFCjkRUqmqyDRnW1lOBteqHjPTcHaT3y",
    marketplaceGraphicSourceId: "1KFCjkRUqmqyDRnW1lOBteqHjPTcHaT3y",
    productMockupSourceId: "1MkDK3Ew0D8EKZM9WaSpMSdjCy68jAGy1",
    customerDownloadSourceId: "1-c_evh5rklwp8eAZnFWQCuTZkq2_sCxB",
    productMetadataSource: "1n9SwOfGqevL54s0_J0s_7N1CfzXQsSJr",
    productManifestSource: "1n9SwOfGqevL54s0_J0s_7N1CfzXQsSJr",
    sourceFolderId: "1r8fARNwymBaxmSdyxnSN5oxwZnNTEexK",
    fulfillmentType: "download",
    requiresDigitalDelivery: true,
    requiresAccessInstructions: false,
    requiresOnboarding: false,
  }),
  currentPaidProduct({
    slug: "business-bloom-foundation-system",
    name: "Business Bloom LLC Foundation System",
    collection: "Startup Collection",
    shortDescription: "Current final Foundation System package confirmed by its final production folder and completion report.",
    category: "Startup",
    type: "system",
    benefits: ["Establish a structured business foundation", "Use the finalized customer package", "Work from the completed production system"],
    included: ["Customer ZIP package", "Complete production package", "Engineering handoff", "Final production report"],
    productCoverSourceId: null,
    marketplaceGraphicSourceId: null,
    productMockupSourceId: null,
    customerDownloadSourceId: "1n06Lq-FPtBmErjDOpC5mTGapUSSaz2CJ",
    productMetadataSource: "1AHiNxBqFnIczPvW8M5EPTgDt3oXObSF7",
    productManifestSource: "1AHiNxBqFnIczPvW8M5EPTgDt3oXObSF7",
    sourceFolderId: "1n8klgMDjtzPoQxKFZISx7I9_Sey72VEU",
    fulfillmentType: "download",
    requiresDigitalDelivery: true,
    requiresAccessInstructions: false,
    requiresOnboarding: false,
  }),
  currentPaidProduct({
    slug: "business-bloom-business-launch-blueprint",
    name: "Business Bloom Business Launch Blueprint",
    collection: "Startup Collection",
    shortDescription: "Current final Business Launch Blueprint package confirmed by its final customer ZIP and production-completion report.",
    category: "Startup",
    type: "system",
    benefits: ["Use a finalized launch-planning package", "Work from completed production assets", "Follow the approved launch blueprint materials"],
    included: ["Customer ZIP package", "Complete production package", "Engineering handoff", "Final production completion report"],
    productCoverSourceId: null,
    marketplaceGraphicSourceId: null,
    productMockupSourceId: null,
    customerDownloadSourceId: "1KP9A1yXm-88BQmqC83Yyc0IU0OzG30fU",
    productMetadataSource: "1qmTj4puns2MTKvvcy7Lr-qC16bb6FNOg",
    productManifestSource: "1qmTj4puns2MTKvvcy7Lr-qC16bb6FNOg",
    sourceFolderId: "1aZWU18KxJ_uuB0C4pRryhwXs151R1CTc",
    fulfillmentType: "download",
    requiresDigitalDelivery: true,
    requiresAccessInstructions: false,
    requiresOnboarding: false,
  }),
  currentPaidProduct({
    slug: "business-bloom-content-marketing-system",
    name: "Business Bloom Content Marketing System",
    collection: "Marketing Collection",
    shortDescription: "Current approved Content Marketing System with a complete customer-download package and coordinated marketplace, website, social, cover, and mockup assets.",
    category: "Marketing",
    type: "system",
    benefits: ["Organize content marketing work", "Use reusable workflows and templates", "Work from a complete customer package"],
    included: ["Customer documents", "Customer PDFs", "Agent instructions", "Prompt library", "Workflows", "Worksheets and templates", "Examples", "Quality and safety", "Quick reference"],
    productCoverSourceId: "1yBynSKe1Vrw_Up2fMXgRQVU0ouLNoPu6",
    marketplaceGraphicSourceId: "1g_EAJdR8_ypZaIUDPpEDioFuZj3xnDj1",
    productMockupSourceId: "1pM4wSiFin_RJky6rnEbQdIoc_Sx3sP98",
    customerDownloadSourceId: "1QipLzpYSms1sRNkWAbwuFjP0ZcghTfTO",
    productMetadataSource: "1vrWJvC2gaDemUY6-b4onQbhWJTnZXt30",
    productManifestSource: "1vrWJvC2gaDemUY6-b4onQbhWJTnZXt30",
    sourceFolderId: "1Q4ew0w-D9qKs1QzmP_98tw-I-LI7Hmty",
    fulfillmentType: "download",
    requiresDigitalDelivery: true,
    requiresAccessInstructions: false,
    requiresOnboarding: false,
  }),
  currentPaidProduct({
    slug: "business-bloom-social-media-system",
    name: "Business Bloom Social Media System",
    collection: "Marketing Collection",
    shortDescription: "Current approved Social Media System with final customer package, engineering handoff, marketplace graphics, website graphics, social graphics, product cover, and product mockup.",
    category: "Marketing",
    type: "system",
    benefits: ["Use a coordinated social-media system", "Work from current marketplace and website assets", "Use the final customer package instead of production drafts"],
    included: ["Customer ZIP package", "Engineering handoff", "Marketplace graphics", "Website graphics", "Social launch graphic", "Product cover", "Product mockup"],
    productCoverSourceId: "1uXcCvXnx__ZtxcvKPSuIOy-maI3QCWpu",
    marketplaceGraphicSourceId: "1Gin_o8xAytDjs2oB0vujt_IaLMA_RH6p",
    productMockupSourceId: "1vdCvJZwOvs-pHTGhHCCnOJUOqpRK6YK7",
    customerDownloadSourceId: "1LPajkKpOfEPjtFoxLDGHramQdA-GBkwz",
    productMetadataSource: "1_huSpSOdjd0wTUWwQV8I5Pne4SRRvOnS",
    productManifestSource: "1_huSpSOdjd0wTUWwQV8I5Pne4SRRvOnS",
    sourceFolderId: "1q9-lh3kcVgxz1zTOakr85oPAl1gyoTHN",
    fulfillmentType: "download",
    requiresDigitalDelivery: true,
    requiresAccessInstructions: false,
    requiresOnboarding: false,
  }),
];

/** Mapped, but intentionally excluded from public display until final product evidence is complete. */
export const MARKETPLACE_PRODUCTS_IN_PRODUCTION = [
  {
    slug: "business-bloom-sales-system",
    name: "Business Bloom Sales System™",
    collection: "Business Bloom Professional Systems™ / Sales Collection",
    catalogStatus: "CURRENT_PRODUCT_IN_PRODUCTION" as const,
    sourceFolderIds: ["1o9UmYX-BJdf9RxvQJmJ8PONLYqUbXok6", "10QcwF5WhHCi3aW2uGXWh0mzJkvKMBdRD"],
    reason: "Current reference, policy, license, and implementation-plan files are present, but a final customer ZIP plus marketplace asset set was not confirmed during this inventory pass.",
  },
] as const;

export const PROFESSIONAL_SYSTEMS_STATUS = [
  { name: "Customer Service System™", status: "CURRENT_APPROVED_PRODUCT" },
  { name: "Sales System™", status: "CURRENT_PRODUCT_IN_PRODUCTION" },
  { name: "HR System™", status: "CURRENT_APPROVED_PRODUCT" },
  { name: "Marketing System™", status: "CURRENT_APPROVED_PRODUCT" },
  { name: "Operations System™", status: "CURRENT_APPROVED_PRODUCT" },
  { name: "AI Automation Bundles™", status: "CURRENT_APPROVED_PRODUCT" },
] as const;

export const APPROVED_FREE_RESOURCES = [
  { slug: "30-minute-business-reset", name: "30-Minute Business Reset", category: "Business Foundations", format: "Fillable PDF", driveFileId: "1ILWHypoHFwaCD5YbhIxSUhwRBx-y0_Yy", catalogStatus: "CURRENT_APPROVED_PRODUCT" as const, deliveryStatus: "PUBLIC_DELIVERY_CONFIGURATION_REQUIRED" },
  { slug: "business-systems-checklist", name: "Business Systems Checklist", category: "Business Foundations", format: "Fillable PDF", driveFileId: "1-py5ugpfixb2Rjdk1faQ27qGOjCyPzxj", catalogStatus: "CURRENT_APPROVED_PRODUCT" as const, deliveryStatus: "PUBLIC_DELIVERY_CONFIGURATION_REQUIRED" },
  { slug: "business-health-check", name: "Business Health Check", category: "Business Foundations", format: "Spreadsheet", driveFileId: "1jjPrWS7I6bwnwgTQjQLekuTntdQsbEKF", catalogStatus: "CURRENT_APPROVED_PRODUCT" as const, deliveryStatus: "PUBLIC_DELIVERY_CONFIGURATION_REQUIRED" },
] as const;

/** Named in the approved Free Resources Start Here guide but no finalized file was found in the corresponding Drive category folder. */
export const FREE_RESOURCES_REFERENCED_NOT_FINALIZED = [
  "Customer Service Scorecard™",
  "Sales Conversion Calculator™",
  "Interview Scorecard™",
  "Marketing ROI Calculator™",
  "SOP Quick-Start Template™",
  "AI Automation Opportunity Finder™",
] as const;

export const FREE_RESOURCE_EXPECTED_COUNT = 13;

/** Prior Stripe-first records removed from active display. Historical Stripe objects remain untouched. */
export const LEGACY_STRIPE_ONLY_PRODUCTS_EXCLUDED = [
  "Automation System",
  "Business Launch System",
  "Scale System",
  "Prompt Pack - Starter",
  "Prompt Pack - Pro",
  "Prompt Pack - Ultimate",
  "Web Hosting - Starter",
  "Web Hosting - Business",
  "DFY Website Build",
  "Shopify App - Basic",
] as const;

export const MARKETPLACE_COLLECTION_AUDIT = [
  { collection: "Business Bloom Professional Systems™", status: "INSPECTED" },
  { collection: "03 Executive Collection", status: "INSPECTED_VISUAL_ASSETS_ONLY" },
  { collection: "04 Startup Collection", status: "INSPECTED_CURRENT_PRODUCTS_FOUND" },
  { collection: "05 Marketing Collection", status: "INSPECTED_CURRENT_PRODUCTS_FOUND" },
  { collection: "06 Sales Collection", status: "INSPECTED_PRODUCT_IN_PRODUCTION" },
  { collection: "07 Automation Collection", status: "INSPECTED_VISUAL_ASSETS_ONLY" },
  { collection: "08 Digital Business Collection", status: "INSPECTED_VISUAL_ASSETS_ONLY" },
  { collection: "09 Operations Collection", status: "INSPECTED_VISUAL_ASSETS_ONLY" },
  { collection: "10 Finance Collection", status: "INSPECTED_VISUAL_ASSETS_ONLY" },
  { collection: "11 Business Protection Collection", status: "INSPECTED_VISUAL_ASSETS_ONLY" },
  { collection: "12 Business Growth Collection", status: "INSPECTED_VISUAL_ASSETS_ONLY" },
  { collection: "13 Free Resources", status: "INSPECTED_INCOMPLETE_FINALIZED_INVENTORY" },
  { collection: "Business-Bloom-Website-System-v1.0", status: "INSPECTED_CURRENT_PRODUCT_FOUND" },
  { collection: "Business-Bloom-Virtual-Executive-Team-v1.1", status: "INSPECTED_CURRENT_PRODUCT_FOUND" },
  { collection: "14 Marketplace Graphics", status: "INSPECTED" },
  { collection: "15 Website Graphics", status: "INSPECTED" },
  { collection: "16 Social Media Graphics", status: "INSPECTED" },
  { collection: "17 Product Mockups", status: "INSPECTED" },
  { collection: "18 Product Covers", status: "INSPECTED" },
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
