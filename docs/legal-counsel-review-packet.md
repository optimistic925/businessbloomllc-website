# Business Bloom Marketplace — Counsel Review Packet

Internal counsel handoff and launch-risk record. This packet is not legal advice and does not represent attorney approval, attorney-client representation, or professional legal clearance.

## Executive status

**INTERNAL REVIEW COMPLETE — OWNER RISK ACCEPTED — EXTERNAL COUNSEL REVIEW RECOMMENDED / PENDING.**

Business Bloom completed the strongest reasonable internal legal-document and compliance consistency review available for the current launch scope. The owner has expressly accepted the residual legal risk of proceeding toward launch before licensed counsel completes a full review. External counsel review remains recommended and pending, but is not by itself an automatic launch blocker.

## Current launch scope

- Business Bloom corporate website and Marketplace.
- One-time digital Marketplace products only.
- Free Resources at $0.
- Stripe payment processing.
- Protected customer-safe digital delivery.
- Transactional fulfillment through the approved n8n → Listmonk flow when separately authorized for production activation.
- Customer support through Business Bloom <support@businessbloomllc.com>.
- No recurring/subscription product in the approved launch catalog.

## Internally resolved

1. **Terms commercial scope** — one-time purchase model, digital delivery/access responsibilities, acceptable use, intellectual property, default license/use restrictions, support and fulfillment-error handling, customer responsibility, Free Resources, third-party services, future-subscription disclosure boundaries, and professional-advice boundaries are drafted.
2. **Privacy operational scope** — website, Marketplace, support, Stripe payments, delivery/onboarding, technical/service data, service providers, retention/minimization, communications, security, privacy requests, children, and regional-use concepts are drafted.
3. **Digital delivery / cancellation position** — default commercial position is final after delivery/access is made available, subject to applicable law, with support-based correction or resolution for duplicate charges, incorrect delivery, inaccessible/corrupted files, and documented fulfillment defects.
4. **Portfolio license default** — purchaser/authorized internal business use; no resale, public redistribution, sublicensing, ownership misrepresentation, or removal of ownership notices unless a product-specific license expressly differs.
5. **AI boundary** — human review, fact/claim verification, sensitive-data precautions, authorization/permission requirements, and qualified professional review are preserved.
6. **HR boundary** — HR materials are operational/educational and do not replace employment-law review, legally required notices, or jurisdiction-specific policy review.
7. **LLC/business-formation boundary** — formation, filing, licensing, tax, contract, and related materials are educational, do not create an attorney-client relationship, and require qualified review where appropriate.
8. **Marketing / earnings boundary** — revenue, earnings, sales, ROI, automation, conversion, ranking, funding, productivity, AI, and other outcome claims are not guaranteed. Objective claims require substantiation before publication.
9. **Customer responsibility** — customers remain responsible for final business decisions, permissions/consents, credential security, backups, claim verification, professional review, regulatory obligations, and production testing.
10. **Delivery isolation** — customer-facing destinations must not expose private Drive sources, engineering materials, credentials, unrelated customer data, private production paths, or Internal-Do-Not-Distribute assets.
11. **Support / sender identity** — customer-facing support now identifies support@businessbloomllc.com, consistent with the approved transactional sender identity.
12. **Subscriptions** — no subscription is part of the current approved catalog. Any future recurring offer requires a new review covering recurring price, billing interval, renewal, cancellation, trial/promotional terms, and recurring-payment consent.

## Pre-launch corrections completed in PR #7

1. **Support contact clarity** — `client/src/pages/Support.tsx` now directly identifies and links `support@businessbloomllc.com` for purchase, delivery, access, billing, privacy, Terms, licensing, and product-support questions.
2. **Legacy Get Started claims / privacy behavior** — `client/src/pages/GetStarted.tsx` no longer publishes unsupported numeric customer-count, years-experience, or 24-hour response claims, and no longer places personal contact data into redirect URL query parameters.
3. **Marketplace checkout consistency and disclosure** — `client/src/pages/MarketplaceProduct.tsx` now exposes the certified Marketplace checkout path for approved commercial products and provides concise one-time digital-purchase, Terms, Privacy, final-sale, and fulfillment-error disclosure adjacent to the checkout action.

These corrections are source-complete on the PR branch. Production deployment remains a separate Executive/owner authorization decision.

## Owner-accepted residual legal risks

The owner has accepted the following residual risks pending external counsel review, provided no new concrete defect is discovered:

1. Entity formation state, operating jurisdictions, target customer jurisdictions, and jurisdiction-specific Terms/Privacy requirements.
2. Whether governing law, venue, arbitration, class-action waiver, mediation, notice, or other dispute-resolution provisions should be added.
3. Whether support email alone is sufficient legal/privacy contact information in each applicable jurisdiction or whether additional physical/statutory contact information is required.
4. Jurisdiction-specific enforceability and required exceptions for digital-product final-sale/refund language, cooling-off rights, or transaction-specific disclosures.
5. Jurisdiction-specific privacy-rights workflows, identity verification, response timing, retention, vendor/processor disclosure, cookies/analytics consent, international transfers, and regional privacy notices.
6. State-by-state employment-law implications of HR materials.
7. State-specific unauthorized-practice, filing, tax, licensing, and entity-law implications of LLC/business-formation materials.
8. Product-specific license exceptions and enforceability of portfolio restrictions.
9. Ongoing advertising-substantiation standards for objective public marketing and performance claims.

## Exact questions for external counsel

1. For the jurisdictions Business Bloom actually serves at launch, what entity identity, address, statutory contact, or other Terms/Privacy disclosures must be added?
2. Should Business Bloom adopt governing-law, venue, arbitration, class-action waiver, mediation, or other dispute-resolution provisions for this one-time digital-product model? If yes, provide exact language and scope.
3. Is the current digital-product final-sale/refund position enforceable for the intended launch jurisdictions, and what mandatory exceptions or pre-purchase disclosures must be added?
4. What privacy-request, identity-verification, response-time, retention, cookie/analytics, vendor/processor, international-transfer, and regional-rights language is required for the actual production stack and customer geography?
5. Are the current HR educational/professional-review boundaries sufficient for the intended launch jurisdictions? Identify any mandatory edits.
6. Are the current LLC/business-formation educational, tax, filing, licensing, and legal-advice boundaries sufficient to reduce unauthorized-practice risk? Identify any mandatory edits.
7. Are the portfolio license defaults and any product-specific exceptions acceptable and sufficiently clear for purchaser/internal-business use?
8. What substantiation standard should Business Bloom adopt for objective customer-count, savings, earnings, ROI, productivity, automation, AI, conversion, ranking, funding, and business-growth claims?
9. If any future recurring product is proposed, what recurring billing, consent, renewal, trial, and cancellation language must be added before activation?

## Counsel response requested

Counsel should return one of:

- **APPROVED AS DRAFTED**, with scope and jurisdictions stated;
- **APPROVED WITH REQUIRED EDITS**, identifying exact required changes; or
- **HOLD**, identifying the precise legal blocker, affected scope, and required remediation.

## Internal legal gate

**LEGAL: INTERNAL REVIEW PASS — OWNER RISK ACCEPTED.**

**EXTERNAL COUNSEL REVIEW: RECOMMENDED / PENDING.**

This internal gate does not constitute attorney approval and does not itself authorize merge, production deployment changes, n8n activation, or public launch.
