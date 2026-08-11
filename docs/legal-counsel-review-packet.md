# Business Bloom Marketplace — Counsel Review Packet

Internal counsel handoff. This packet is not legal advice and does not represent attorney approval.

## Executive status

**INTERNALLY RESOLVED — PROFESSIONAL LEGAL REVIEW REQUIRED BEFORE LAUNCH.**

Business Bloom has completed the commercial drafting and operational consistency work that can be handled internally without inventing jurisdiction-specific legal conclusions. Counsel review should focus on the limited issues below rather than reopening the full commercial architecture.

## Current launch scope

- One-time digital Marketplace products only.
- Free Resources are $0 digital resources.
- Stripe processes payments.
- Transactional fulfillment is sent through the approved n8n → Listmonk email flow.
- Production fulfillment remains unpublished/inactive until launch approval.
- Customer delivery must use customer-safe destinations; private Drive, internal production folders, engineering paths, QA URLs, and Internal-Do-Not-Distribute assets are prohibited.
- No recurring/subscription product is in the current approved launch catalog.

## Internally resolved

1. **Terms of Service commercial scope** — one-time purchase model, digital delivery/access responsibilities, acceptable use, intellectual property, license/use restrictions, support and fulfillment-error handling, customer responsibility, Free Resources, third-party services, future-subscription disclosure requirements, and professional-advice boundaries are drafted.
2. **Privacy Policy operational scope** — website, Marketplace, support, payment, delivery/onboarding, technical/analytics, service-provider, retention/minimization, communications, security, privacy requests, children, and regional-use concepts are drafted.
3. **Digital delivery / cancellation position** — default commercial position is final after delivery/access is made available, subject to applicable law, with support-based correction or resolution for duplicate charges, incorrect delivery, inaccessible/corrupted files, and other documented fulfillment defects.
4. **Portfolio license default** — purchaser/authorized internal business use; no resale, public redistribution, sublicensing, ownership misrepresentation, or removal of ownership notices unless a product-specific license expressly differs.
5. **AI boundary** — human review, fact/claim verification, sensitive-data controls, authorization/permission requirements, and qualified professional review are preserved.
6. **HR boundary** — HR materials are operational/educational and do not replace employment-law review, required notices, or jurisdiction-specific policy review.
7. **LLC/business-formation boundary** — formation, filing, licensing, tax, contract, and related materials are educational, do not create an attorney-client relationship, and require qualified review where appropriate.
8. **Marketing / earnings boundary** — examples, calculations, projections, benchmarks, ROI scenarios, automation outcomes, conversion outcomes, ranking outcomes, funding outcomes, revenue, earnings, and sales outcomes are not guaranteed.
9. **Customer responsibility** — customers remain responsible for final decisions, permissions/consents, credential protection, backups, claim review, professional review, and production testing.
10. **Delivery isolation** — customer-facing destinations must not expose internal production folders, engineering materials, credentials, unrelated customer data, private Drive sources, or Internal-Do-Not-Distribute assets.
11. **Sender identity** — transactional email sender is Business Bloom <support@businessbloomllc.com> under the verified Listmonk contract.
12. **Subscriptions** — no subscription is part of the current approved catalog. Any future recurring offer must disclose price, interval, renewal, cancellation, and trial/promotion terms before purchase and must receive a new legal review.

## Professional legal review required

Counsel should provide launch-specific approval or edits only for these unresolved matters:

1. Confirm Terms and Privacy against Business Bloom LLC's actual formation state, operating jurisdictions, target customer jurisdictions, and current business practices.
2. Determine governing law, venue, arbitration, class-action waiver, and dispute-resolution language, if any.
3. Confirm required legal/privacy contact information, including whether Support alone is sufficient or whether mailing/registered-agent/dedicated privacy contact information is required.
4. Confirm digital-product final-sale/refund language and any required exceptions, cooling-off rights, or transaction-specific disclosures by applicable jurisdiction.
5. Confirm privacy-rights workflow, identity verification, response timing, retention, processor/vendor disclosures, international transfers, analytics/cookies, and consent requirements for the actual production stack and customer geography.
6. Confirm HR product language for employment-law and jurisdiction-specific risk.
7. Confirm LLC/business-formation language for unauthorized-practice, tax, filing, entity, and jurisdiction-specific risk.
8. Confirm portfolio license consistency and any product-specific exceptions.
9. Review public marketing, bundle-savings, earnings, ROI, automation, AI, and performance claims and approve the required substantiation standard.
10. Re-review recurring billing language only if a subscription product is later added to launch scope.

## Documents for counsel review

- `client/src/pages/Terms.tsx`
- `client/src/pages/Privacy.tsx`
- `docs/legal-compliance-launch-review.md`
- Current paid-product license/use materials in the approved Drive product packages
- HR, LLC/business-formation, AI/human-review, professional-advice, customer-responsibility, privacy/data, ethical-sales, and earnings/performance notices where applicable

## Requested counsel output

Counsel should return one of:

- **APPROVED AS DRAFTED**, with jurisdictions/scope stated; or
- **APPROVED WITH REQUIRED EDITS**, identifying exact text/section changes; or
- **HOLD**, identifying the precise legal blocker and required remediation.

## Internal launch gate

**LEGAL / COMPLIANCE: HOLD — INTERNAL WORK COMPLETE; PROFESSIONAL LEGAL REVIEW REQUIRED.**

Do not convert this gate to PASS until the professional review outcome is documented.