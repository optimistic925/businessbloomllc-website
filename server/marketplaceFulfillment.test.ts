import { afterEach, describe, expect, it } from "vitest";
import { MARKETPLACE_PRODUCTS } from "../shared/marketplaceProducts";
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
  it("keeps checkout blocked when no customer-safe destination exists", () => {
    delete process.env.MARKETPLACE_DELIVERY_CONFIG_JSON;
    const product = MARKETPLACE_PRODUCTS[0];
    const destination = getMarketplaceFulfillmentDestination(product.slug);
    expect(destination.downloadUrl).toBeNull();
    expect(marketplaceFulfillmentReady(product, destination)).toBe(false);
  });

  it("accepts a valid HTTPS customer download and only requires relevant URLs", () => {
    const product = MARKETPLACE_PRODUCTS.find((item) => item.slug === "business-bloom-customer-service-system")!;
    process.env.MARKETPLACE_DELIVERY_CONFIG_JSON = JSON.stringify({
      [product.slug]: {
        download_url: "https://downloads.businessbloomllc.com/customer-service-system.zip",
      },
    });

    const destination = getMarketplaceFulfillmentDestination(product.slug);
    expect(destination.downloadUrl).toBe("https://downloads.businessbloomllc.com/customer-service-system.zip");
    expect(destination.accessUrl).toBeNull();
    expect(destination.nextStepUrl).toBeNull();
    expect(marketplaceFulfillmentReady(product, destination)).toBe(true);
  });

  it("rejects private Drive and internal engineering destinations", () => {
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

  it("rejects malformed, insecure, or internal-only URLs", () => {
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
