import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { ALL_PUBLIC_FREE_RESOURCES } from "../shared/freeResources";
import { getFreeResourceDeliveryConfig } from "../shared/freeResourceDelivery";
import { FREE_RESOURCE_LEAD_REGISTRY } from "../shared/freeResourceLeadRegistry";
const PUBLIC_ROOT = join(process.cwd(), "client", "public");
describe("Free Resource lead-capture portfolio", () => {
  it("contains exactly the approved 13 identities with unique slugs", () => {
    expect(ALL_PUBLIC_FREE_RESOURCES).toHaveLength(13);
    expect(FREE_RESOURCE_LEAD_REGISTRY).toHaveLength(13);
    expect(new Set(ALL_PUBLIC_FREE_RESOURCES.map((resource) => resource.slug)).size).toBe(13);
    expect(ALL_PUBLIC_FREE_RESOURCES.some((resource) => resource.slug === "weekly-ceo-priority-planner")).toBe(true);
  });
  it("keeps every resource customer-delivery ready without private destinations", () => {
    for (const resource of ALL_PUBLIC_FREE_RESOURCES) {
      const delivery = getFreeResourceDeliveryConfig(resource.slug);
      expect(delivery).not.toBeNull(); expect(delivery?.deliveryStatus).toBe("READY"); expect(delivery?.deliveryUrl).toBeTruthy(); expect(delivery?.deliveryUrl?.toLowerCase()).not.toContain("drive.google.com");
      if (delivery?.deliveryUrl?.startsWith("/downloads/")) expect(existsSync(join(PUBLIC_ROOT, delivery.deliveryUrl.replace(/^\//, "")))).toBe(true);
    }
  });
  it("preserves all 13 approved lead mappings and customer help copy", () => {
    expect(FREE_RESOURCE_LEAD_REGISTRY.every((resource) => resource.interest && resource.primaryPaidOffer && resource.resourceHelpText.length > 30 && resource.gettingStartedTip.length > 30)).toBe(true);
  });
});
