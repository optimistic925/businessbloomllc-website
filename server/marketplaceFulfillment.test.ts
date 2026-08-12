import { afterEach, describe, expect, it } from "vitest";
import { MARKETPLACE_PRODUCTS } from "../shared/marketplaceProducts";
import { MARKETPLACE_PAID_DELIVERY_REGISTRY } from "./marketplaceDeliveryRegistry";
import {
  getMarketplaceFulfillmentDestination,
  marketplaceFulfillmentReady,
} from "./marketplaceFulfillment";

const ORIGINAL = process.env.MARKETPLACE_DELIVERY_CONFIG_JSON;

afterEach(() => {
  if (ORIGINAL === undefined) delete process.env.MARKETPLACE_DELIVERY_CONFIG_JSON;
  else process.env.MARKETPLACE_DELIVERY_CONFIG_JSON = ORIGINAL;
});

describe("Marketplace server-trusted fulfillment configuration", () => {
  it("maps all 13 launch-gate products to customer-safe HTTPS destinations", () => {
    delete process.env.MARKETPLACE_DELIVERY_CONFIG_JSON;
    expect(MARKETPLACE_PRODUCTS).toHaveLength(13);
    expect(Object.keys(MARKETPLACE_PAID_DELIVERY_REGISTRY)).toHaveLength(13);

    for (const product of MARKETPLACE_PRODUCTS) {
      const destination = getMarketplaceFulfillmentDestination(product.slug);
      expect(destination.downloadUrl, product.slug).toMatch(/^https:\/\/downloads\.businessbloomllc\.com\//);
      expect(destination.downloadUrl, product.slug).not.toContain("drive.google.com");
      expect(destination.downloadUrl, product.slug).not.toMatch(/engineering|internal/i);
      expect(destination.accessUrl, product.slug).toBeNull();
      expect(destination.nextStepUrl, product.slug).toBeNull();
      expect(marketplaceFulfillmentReady(product, destination), product.slug).toBe(true);
    }
  });

  it("keeps Branding on the protected four-part bundle route", () => {
    delete process.env.MARKETPLACE_DELIVERY_CONFIG_JSON;
    const destination = getMarketplaceFulfillmentDestination("business-bloom-branding-system");
    expect(destination.downloadUrl).toBe("https://downloads.businessbloomllc.com/bundles/business-bloom-branding-system");
  });

  it("allows an explicit server-side override for emergency rotation/testing", () => {
    const product = MARKETPLACE_PRODUCTS.find((item) => item.slug === "business-bloom-customer-service-system")!;
    process.env.MARKETPLACE_DELIVERY_CONFIG_JSON = JSON.stringify({
      [product.slug]: {
        download_url: "https://downloads.businessbloomllc.com/rotated/customer-service-system.zip",
      },
    });

    const destination = getMarketplaceFulfillmentDestination(product.slug);
    expect(destination.downloadUrl).toBe("https://downloads.businessbloomllc.com/rotated/customer-service-system.zip");
    expect(marketplaceFulfillmentReady(product, destination)).toBe(true);
  });

  it("rejects private Drive and internal engineering override destinations", () => {
    const product = MARKETPLACE_PRODUCTS[0];
    process.env.MARKETPLACE_DELIVERY_CONFIG_JSON = JSON.stringify({
      [product.slug]: {
        download_url: "https://drive.google.com/file/d/private-source/view",
        access_url: "https://example.com/engineering-handoff/internal",
      },
    });

    const destination = getMarketplaceFulfillmentDestination(product.slug);
    expect(destination.downloadUrl).toBeNull();
    expect(destination.accessUrl).toBeNull();
    expect(marketplaceFulfillmentReady(product, destination)).toBe(false);
  });

  it("rejects malformed, insecure, or internal-only override URLs", () => {
    const product = MARKETPLACE_PRODUCTS[0];
    process.env.MARKETPLACE_DELIVERY_CONFIG_JSON = JSON.stringify({
      [product.slug]: {
        download_url: "http://downloads.businessbloomllc.com/file.zip",
        access_url: "not-a-url",
        next_step_url: "https://portal.businessbloomllc.com/Internal-Do-Not-Distribute/start",
      },
    });

    const destination = getMarketplaceFulfillmentDestination(product.slug);
    expect(destination).toEqual({ downloadUrl: null, accessUrl: null, nextStepUrl: null });
  });

  it("keeps the current 13-product launch catalog aligned to its approved download fulfillment model", () => {
    expect(MARKETPLACE_PRODUCTS).toHaveLength(13);

    for (const product of MARKETPLACE_PRODUCTS) {
      expect(product.fulfillmentType, product.slug).toBe("download");
      expect(product.requiresDigitalDelivery, product.slug).toBe(true);
      expect(product.requiresAccessInstructions, product.slug).toBe(false);
      expect(product.requiresOnboarding, product.slug).toBe(false);
    }
  });
});
