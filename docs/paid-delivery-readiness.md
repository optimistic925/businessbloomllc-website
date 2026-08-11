# Business Bloom — Paid Delivery Readiness

Protected PR #7 hard-gate matrix. Customer-safe delivery architecture is implemented; production checkout remains fail-closed until every required destination validates.

## Current approved fulfillment contract

All 13 active paid products in the current launch catalog are **DOWNLOAD** products. Automated tests enforce the current contract:

- `requires_download = true`
- `requires_access = false`
- `requires_onboarding = false`

If an approved product later changes to ACCESS, ONBOARDING, or HYBRID, its trusted server registry and tests must be updated before checkout can become ready.

## 13-product readiness matrix

| Product | Fulfillment type | Download required | Access required | Onboarding required | Customer destination | Validation | Checkout ready | Blocker |
|---|---|---:|---:|---:|---|---|---|---|
| Customer Service System | DOWNLOAD | YES | NO | NO | Not provisioned | FAIL-CLOSED | NO | Protected customer download destination required |
| HR System | DOWNLOAD | YES | NO | NO | Not provisioned | FAIL-CLOSED | NO | Protected customer download destination required |
| Marketing System | DOWNLOAD | YES | NO | NO | Not provisioned | FAIL-CLOSED | NO | Protected customer download destination required |
| Operations System | DOWNLOAD | YES | NO | NO | Not provisioned | FAIL-CLOSED | NO | Protected customer download destination required |
| AI Automation Bundles | DOWNLOAD | YES | NO | NO | Not provisioned | FAIL-CLOSED | NO | Protected customer download destination required |
| Professional Systems Bundle | DOWNLOAD | YES | NO | NO | Not provisioned | FAIL-CLOSED | NO | Protected customer download destination required |
| Website System | DOWNLOAD | YES | NO | NO | Not provisioned | FAIL-CLOSED | NO | Protected customer download destination required |
| Virtual Executive Team | DOWNLOAD | YES | NO | NO | Not provisioned | FAIL-CLOSED | NO | Protected customer download destination required |
| Branding System | DOWNLOAD | YES | NO | NO | Not provisioned | FAIL-CLOSED | NO | Protected customer download destination required |
| LLC Foundation System | DOWNLOAD | YES | NO | NO | Not provisioned | FAIL-CLOSED | NO | Protected customer download destination required |
| Business Launch Blueprint | DOWNLOAD | YES | NO | NO | Not provisioned | FAIL-CLOSED | NO | Protected customer download destination required |
| Content Marketing System | DOWNLOAD | YES | NO | NO | Not provisioned | FAIL-CLOSED | NO | Protected customer download destination required |
| Social Media System | DOWNLOAD | YES | NO | NO | Not provisioned | FAIL-CLOSED | NO | Protected customer download destination required |

## Implemented customer-safety controls

`server/marketplaceFulfillment.ts` reads destinations from the server-only `MARKETPLACE_DELIVERY_CONFIG_JSON` registry and validates each destination before checkout can proceed.

The current implementation rejects:

- non-HTTPS URLs;
- private Google Drive / Google Docs customer destinations;
- localhost;
- Internal-Do-Not-Distribute markers;
- engineering-handoff markers;
- internal-only markers; and
- production-folder markers.

Browser-provided destinations are not authoritative. Checkout derives trusted Stripe and fulfillment metadata server-side.

## Production configuration contract

For the current download-only catalog, deployment configuration must contain one valid customer-safe HTTPS `download_url` for each active slug. No access or onboarding URL should be populated merely to satisfy a generic schema.

Illustrative shape only — do not place QA/example URLs in production:

```json
{
  "business-bloom-customer-service-system": { "download_url": "<customer-safe HTTPS destination>" },
  "business-bloom-hr-system": { "download_url": "<customer-safe HTTPS destination>" },
  "business-bloom-marketing-system": { "download_url": "<customer-safe HTTPS destination>" },
  "business-bloom-operations-system": { "download_url": "<customer-safe HTTPS destination>" },
  "business-bloom-ai-automation-bundles": { "download_url": "<customer-safe HTTPS destination>" },
  "business-bloom-professional-systems": { "download_url": "<customer-safe HTTPS destination>" },
  "business-bloom-website-system": { "download_url": "<customer-safe HTTPS destination>" },
  "business-bloom-virtual-executive-team": { "download_url": "<customer-safe HTTPS destination>" },
  "business-bloom-branding-system": { "download_url": "<customer-safe HTTPS destination>" },
  "business-bloom-foundation-system": { "download_url": "<customer-safe HTTPS destination>" },
  "business-bloom-business-launch-blueprint": { "download_url": "<customer-safe HTTPS destination>" },
  "business-bloom-content-marketing-system": { "download_url": "<customer-safe HTTPS destination>" },
  "business-bloom-social-media-system": { "download_url": "<customer-safe HTTPS destination>" }
}
```

The placeholders above are documentation only and must never be copied into production configuration.

## Exact infrastructure authority still required

The connected toolset does not currently expose an approved protected object-storage/CDN/customer-download service where the paid ZIP packages can be uploaded and served as customer-safe HTTPS destinations.

The remaining owner/infrastructure authority is therefore narrowly defined:

1. authorize/provision the production customer-download storage/CDN or equivalent protected delivery service;
2. configure its domain and credentials outside source control and outside ChatGPT;
3. permit Engineering to upload the finalized customer packages to that approved destination; and
4. permit deployment configuration to receive the resulting server-side `MARKETPLACE_DELIVERY_CONFIG_JSON` secret.

No secret value should be pasted into chat, GitHub, Drive documentation, frontend code, or n8n payloads.

After infrastructure authority exists, Engineering owns the routine closure work: upload packages, populate the deployment secret, run validation, verify working customer downloads, execute controlled pre-launch journeys, and certify each row READY.

## Executive gate

**PAID DELIVERY: 0/13 READY — SOFTWARE ARCHITECTURE COMPLETE; PROTECTED DELIVERY INFRASTRUCTURE AUTHORITY REQUIRED.**
