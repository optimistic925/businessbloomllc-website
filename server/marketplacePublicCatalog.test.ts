import { describe, expect, it } from "vitest";
import { MARKETPLACE_PRODUCTS } from "../shared/marketplaceProducts";
import { PUBLIC_FREE_RESOURCES, PUBLIC_MARKETPLACE_PRODUCTS } from "../shared/marketplacePublicCatalog";

function sorted(values: string[]) {
  return [...values].sort();
}

describe("public Marketplace catalog security boundary", () => {
  it("keeps the public paid catalog aligned with the authoritative internal catalog", () => {
    expect(sorted(PUBLIC_MARKETPLACE_PRODUCTS.map((product) => product.slug))).toEqual(
      sorted(MARKETPLACE_PRODUCTS.map((product) => product.slug)),
    );
  });

  it("does not expose internal Drive or engineering provenance fields", () => {
    const serialized = JSON.stringify({ products: PUBLIC_MARKETPLACE_PRODUCTS, free: PUBLIC_FREE_RESOURCES }).toLowerCase();
    for (const forbidden of [
      "sourcefolderid",
      "customerdownloadsourceid",
      "productmetadatasource",
      "productmanifestsource",
      "marketplacegraphicsourceid",
      "productcoversourceid",
      "productmockupsourceid",
      "downloadurl",
      "accessurl",
      "nextstepurl",
      "engineering_handoff",
      "drive.google.com",
    ]) {
      expect(serialized).not.toContain(forbidden);
    }
  });

  it("contains only the finalized Free Resources intended for public display", () => {
    expect(PUBLIC_FREE_RESOURCES).toHaveLength(3);
    expect(PUBLIC_FREE_RESOURCES.map((resource) => resource.slug)).toEqual([
      "30-minute-business-reset",
      "business-systems-checklist",
      "business-health-check",
    ]);
  });
});
