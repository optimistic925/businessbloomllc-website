import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { ALL_PUBLIC_FREE_RESOURCES } from "../shared/freeResources";
import { getFreeResourceDeliveryConfig } from "../shared/freeResourceDeliveryConfig";

const PUBLIC_ROOT = join(process.cwd(), "client", "public");

describe("final Free Resource portfolio", () => {
  it("contains exactly 13 finalized identities with unique slugs", () => {
    expect(ALL_PUBLIC_FREE_RESOURCES).toHaveLength(13);
    expect(new Set(ALL_PUBLIC_FREE_RESOURCES.map((resource) => resource.slug)).size).toBe(13);
  });

  it("keeps every resource customer-delivery ready without private Drive URLs", () => {
    for (const resource of ALL_PUBLIC_FREE_RESOURCES) {
      const delivery = getFreeResourceDeliveryConfig(resource.slug);
      expect(delivery, `Missing delivery config for ${resource.slug}`).not.toBeNull();
      expect(delivery?.deliveryStatus, `Resource not READY: ${resource.slug}`).toBe("READY");
      expect(delivery?.deliveryUrl, `Missing URL for ${resource.slug}`).toBeTruthy();
      expect(delivery?.deliveryUrl?.toLowerCase()).not.toContain("drive.google.com");
      expect(delivery?.deliveryUrl?.toLowerCase()).not.toContain("internal-do-not-distribute");

      if (delivery?.deliveryUrl?.startsWith("/downloads/")) {
        expect(
          existsSync(join(PUBLIC_ROOT, delivery.deliveryUrl.replace(/^\//, ""))),
          `Missing public customer file for ${resource.slug}`,
        ).toBe(true);
      }
    }
  });

  it("keeps the four new resources mapped to distinct portfolio gaps", () => {
    const expected = [
      "offer-clarity-worksheet",
      "brand-message-quick-check",
      "website-conversion-checklist",
      "social-content-consistency-planner",
    ];
    for (const slug of expected) expect(ALL_PUBLIC_FREE_RESOURCES.some((resource) => resource.slug === slug)).toBe(true);
  });
});
