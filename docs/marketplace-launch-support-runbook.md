# Business Bloom Marketplace Launch Support Runbook

Internal use only. Do not expose internal escalation procedures or credentials on customer-facing pages.

## Operating rule

Customer Service owns the first response and customer communication. Engineering owns checkout/application defects. Automation owns n8n/Listmonk routing defects. Finance/Operations owns duplicate-charge/refund routing. Executive Office owns material launch-risk escalation.

| Problem | Owner | First response | Escalation | Customer communication | System to check | Resolution status |
|---|---|---|---|---|---|---|
| Payment succeeded, no email | Customer Service | Confirm purchase email and approximate checkout time; do not ask for card data | Automation if no Listmonk send; Engineering if Checkout Session/webhook is missing | Confirm purchase is being investigated and avoid promising a delivery time until the event path is verified | Stripe Checkout Session → n8n execution → Listmonk transaction | OPEN until email delivery is verified |
| Email delivered, bad download link | Customer Service | Reproduce the link using a non-admin/customer context | Product for wrong package; Engineering for destination/config issue | Acknowledge the bad link and provide a verified replacement only after QA | Product fulfillment config → customer destination | OPEN until customer-safe destination is verified |
| Product inaccessible | Customer Service | Confirm product and purchase email; capture the exact customer-facing error | Engineering for hosted/access product; Product for package issue | Provide a clear next step without exposing internal URLs | Marketplace product config → access destination → Stripe metadata | OPEN until access succeeds |
| Customer purchased wrong product | Customer Service | Confirm order ID/product and requested correction | Finance/Operations for refund/adjustment decision | Explain available resolution after transaction review; do not promise a refund before approval | Stripe Checkout Session / PaymentIntent | PENDING FINANCE DECISION |
| Stripe session incomplete/canceled | Customer Service | Confirm no completed purchase before advising retry | Engineering if customer is repeatedly blocked | Explain that the purchase was not completed; offer Marketplace/product return path | Stripe Checkout Session status | CLOSED when session state is confirmed |
| Duplicate charge reported | Customer Service | Collect order email, dates, amounts, and last 4 digits only if voluntarily provided; never request full card number | Finance/Operations immediately; Engineering if duplicate Checkout creation is suspected | Confirm investigation; do not promise refund until duplicate is verified | Stripe PaymentIntents/Charges and Checkout Sessions | HIGH PRIORITY until charge disposition is complete |
| Automation failed after successful Stripe payment | Automation | Locate n8n execution by order/session; determine failure node | Engineering if metadata/config defect; Customer Service for manual recovery | Customer Service sends a manual acknowledgement/delivery only from verified destinations | Stripe event → n8n execution → Listmonk | MANUAL INTERVENTION until automated path is recovered |
| Listmonk failed | Automation | Review HTTP response/credential/service state; retry only when idempotent/safe | Customer Service for manual communication; Engineering for integration defect | Avoid duplicate emails; send only the missing transactional message | n8n HTTP node → Listmonk tx endpoint/template | OPEN until delivery confirmed |
| Required fulfillment URL missing | Engineering | Keep checkout blocked; identify which requirement flag is true | Product/CX to supply/approve customer destination | No purchase should proceed for an unfulfillable product | centralized Marketplace product config | LAUNCH BLOCKER |
| Unknown Marketplace product | Engineering | Reject checkout; verify Drive-approved catalog membership | Product if catalog classification is unclear | Do not invent or substitute a product | Drive-approved registry → commercial config | BLOCKED until catalog decision |
| Free resource delivery fails | Customer Service | Confirm resource name and lead/download path | Product for file issue; Engineering for delivery path | Provide verified customer-safe link only after QA | Free Resource registry → lead capture/delivery destination | OPEN until download succeeds |
| Access/onboarding email missing | Customer Service | Confirm which fulfillment flags apply to product | Automation if routing skipped; Engineering if metadata flags wrong | Explain which instructions should have been sent and recover only the missing step | Checkout metadata → n8n condition branches → Listmonk | OPEN until correct template delivery verified |

## First-response rules

- Never request passwords, full payment-card numbers, secret keys, or private internal URLs.
- Use the Stripe Checkout Session/order ID and purchase email as primary transaction references.
- Do not expose n8n, Listmonk, private Drive folders, engineering notes, or credential names to customers.
- Do not manually send a product until the destination/package has been verified as customer-safe.
- Avoid duplicate transactional emails when retrying automation failures.
- Escalate any suspected credential exposure or customer-data leak to Security immediately.

## Manual recovery controls

Manual fulfillment is allowed only when a product is explicitly marked `MANUAL_FULFILLMENT_APPROVED` or Executive Office authorizes an incident recovery. Record the order ID, product, customer email, reason for manual handling, verified destination used, operator, and completion status.

## Launch-day escalation priorities

1. Duplicate/incorrect charges or security/privacy incidents.
2. Successful payment with no fulfillment.
3. Broken customer destinations.
4. Incorrect product delivered.
5. Access/onboarding failures.
6. Free-resource delivery issues.

No silent failures. Every paid-order incident remains open until the customer has either received the correct product/access or the transaction has been formally resolved.