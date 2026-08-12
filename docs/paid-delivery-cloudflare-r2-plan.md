# Business Bloom Paid Delivery — Protected R2 Provisioning Plan

Status: **ENGINEERING IMPLEMENTATION READY / EXTERNAL ACCOUNT AUTHORIZATION REQUIRED**

## Selected architecture
- Private Cloudflare R2 bucket for paid customer artifacts.
- Business Bloom-controlled download hostname, recommended `downloads.businessbloomllc.com`.
- Cloudflare Worker bound directly to the private R2 bucket.
- Website server generates HMAC-signed, expiring customer download URLs.
- Worker validates product slug, path, expiry, and signature before reading the object from R2.
- Bucket remains private; no `r2.dev` production exposure.
- Signing secret exists only as production server/Worker secrets and never in GitHub, frontend code, customer files, Stripe catalog metadata, or Drive documentation.

## Repository implementation
- `server/marketplaceDownloadSigning.ts` — server-only signed URL generation.
- `server/marketplaceDownloadSigning.test.ts` — fail-closed and secret-nonexposure tests.
- `infrastructure/cloudflare-r2-download-worker.ts` — Worker authorization + private R2 streaming reference.
- Existing `MARKETPLACE_DELIVERY_CONFIG_JSON` remains the product destination registry.
- Checkout remains fail-closed if a customer destination or signing secret is missing.

## Object layout
Recommended object keys:
- `products/business-bloom-customer-service-system.zip`
- `products/business-bloom-hr-system.zip`
- `products/business-bloom-marketing-system.zip`
- `products/business-bloom-operations-system.zip`
- `products/business-bloom-ai-automation-bundles.zip`
- `products/business-bloom-professional-systems.zip`
- `products/business-bloom-website-system.zip`
- `products/business-bloom-virtual-executive-team.zip`
- `products/business-bloom-branding-system.zip`
- `products/business-bloom-llc-foundation-system.zip`
- `products/business-bloom-business-launch-blueprint.zip`
- `products/business-bloom-content-marketing-system.zip`
- `products/business-bloom-social-media-system.zip`

## Production delivery registry target
Each paid product receives only its Business Bloom HTTPS Worker URL in `MARKETPLACE_DELIVERY_CONFIG_JSON`. The website server adds the signed query parameters when a checkout session is created.

## Owner-only external authorization
Engineering does not need the owner to design the storage system. The only external authority required is:
1. Authorize/connect the Business Bloom Cloudflare account containing the production domain to the available Cloudflare integration.
2. Permit Engineering access to create/configure R2, Workers, the download hostname/DNS route, and production secrets.
3. Do not paste Cloudflare credentials or secret values into ChatGPT, GitHub, Drive documents, or customer files.

After that authorization, Engineering owns bucket creation, Worker deployment, object upload, secret generation/storage, 13-product registry population, URL validation, and controlled customer-journey QA.
