import { FREE_RESOURCE_DELIVERY_CONFIG } from "./freeResourceDeliveryConfig";
import { FREE_RESOURCE_LEAD_REGISTRY } from "./freeResourceLeadRegistry";

Object.assign(FREE_RESOURCE_DELIVERY_CONFIG, {
  "brand-message-quick-check": { slug: "brand-message-quick-check", shortDescription: "Turn a fuzzy brand message into a clearer statement of who you help, what you help them achieve, and why customers should pay attention.", ctaLabel: "Get My Free Resource", relatedPaidProductSlug: "business-bloom-branding-system", relatedPaidProductName: "Business Bloom Branding System", deliveryUrl: "/downloads/free-resources/Business-Bloom-Brand-Message-Quick-Check-Fillable.pdf", deliveryStatus: "READY" },
  "website-conversion-checklist": { slug: "website-conversion-checklist", shortDescription: "Review one important website page for clarity, focus, trust, and call-to-action strength, then choose the highest-impact fix.", ctaLabel: "Get My Free Resource", relatedPaidProductSlug: "business-bloom-website-system", relatedPaidProductName: "Business Bloom Website System", deliveryUrl: "/downloads/free-resources/Business-Bloom-Website-Conversion-Checklist-Fillable.pdf", deliveryStatus: "READY" },
  "social-content-consistency-planner": { slug: "social-content-consistency-planner", shortDescription: "Plan one practical week of social content around real audience problems, useful formats, clear hooks, CTAs, and readiness status.", ctaLabel: "Get My Free Resource", relatedPaidProductSlug: "business-bloom-social-media-system", relatedPaidProductName: "Business Bloom Social Media System", deliveryUrl: "/downloads/free-resources/Business-Bloom-Social-Content-Consistency-Planner.xlsx", deliveryStatus: "READY" },
  "weekly-ceo-priority-planner": { slug: "weekly-ceo-priority-planner", shortDescription: "Focus the week on one primary outcome, three priorities, accountable actions, blockers, decisions, and a short end-of-week review.", ctaLabel: "Get My Free Resource", relatedPaidProductSlug: "business-bloom-professional-systems", relatedPaidProductName: "Business Bloom Professional Systems™", deliveryUrl: "/downloads/free-resources/Business-Bloom-Weekly-CEO-Priority-Planner.pdf", deliveryStatus: "READY" },
});

export const ALL_PUBLIC_FREE_RESOURCES = FREE_RESOURCE_LEAD_REGISTRY.map(({ slug, name, category, format }) => ({ slug, name, category, format })) as readonly {
  slug: string;
  name: string;
  category: string;
  format: "Fillable PDF" | "Spreadsheet";
}[];
