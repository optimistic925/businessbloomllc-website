import type { MarketplaceProduct } from "../shared/marketplaceProducts";
import { MARKETPLACE_PAID_DELIVERY_REGISTRY } from "./marketplaceDeliveryRegistry";

export interface MarketplaceFulfillmentDestination {
  downloadUrl: string | null;
  accessUrl: string | null;
  nextStepUrl: string | null;
}

type RawDestination = Partial<Record<"download_url" | "access_url" | "next_step_url", unknown>>;

const BLOCKED_HOSTS = new Set([
  "drive.google.com",
  "docs.google.com",
  "localhost",
  "127.0.0.1",
]);

const BLOCKED_MARKERS = [
  "internal-do-not-distribute",
  "internal_only",
  "engineering-handoff",
  "engineering_handoff",
  "production-folder",
];

function normalizeCustomerUrl(value: unknown): string | null {
  if (typeof value !== "string" || !value.trim()) return null;
  const candidate = value.trim();

  let parsed: URL;
  try {
    parsed = new URL(candidate);
  } catch {
    return null;
  }

  if (parsed.protocol !== "https:") return null;
  if (BLOCKED_HOSTS.has(parsed.hostname.toLowerCase())) return null;

  const lowered = candidate.toLowerCase();
  if (BLOCKED_MARKERS.some((marker) => lowered.includes(marker))) return null;

  return parsed.toString();
}

function readDeliveryRegistry(): Record<string, RawDestination> {
  const productionRegistry = MARKETPLACE_PAID_DELIVERY_REGISTRY as unknown as Record<string, RawDestination>;
  const raw = process.env.MARKETPLACE_DELIVERY_CONFIG_JSON;
  if (!raw) return productionRegistry;

  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return productionRegistry;
    // Environment values are an explicit server-side override for emergency
    // rotation/testing. They never originate from the browser.
    return { ...productionRegistry, ...(parsed as Record<string, RawDestination>) };
  } catch {
    console.error("[Marketplace Fulfillment] MARKETPLACE_DELIVERY_CONFIG_JSON is invalid JSON");
    return productionRegistry;
  }
}

export function getMarketplaceFulfillmentDestination(slug: string): MarketplaceFulfillmentDestination {
  const registry = readDeliveryRegistry();
  const entry = registry[slug] ?? {};
  return {
    downloadUrl: normalizeCustomerUrl(entry.download_url),
    accessUrl: normalizeCustomerUrl(entry.access_url),
    nextStepUrl: normalizeCustomerUrl(entry.next_step_url),
  };
}

export function marketplaceFulfillmentReady(
  product: MarketplaceProduct,
  destination = getMarketplaceFulfillmentDestination(product.slug),
) {
  if (product.requiresDigitalDelivery && !destination.downloadUrl) return false;
  if (product.requiresAccessInstructions && !destination.accessUrl) return false;
  if (product.requiresOnboarding && !destination.nextStepUrl) return false;
  return true;
}
