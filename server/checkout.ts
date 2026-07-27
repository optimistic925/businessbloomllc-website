import { Router } from "express";
import Stripe from "stripe";
import { isRecurringPrice, getSuccessPath } from "../shared/servicePricing";
import { DOMAIN_PRICE_IDS } from "../shared/domainPricing";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2026-05-27.dahlia",
});

export const checkoutRouter = Router();

interface CreateCheckoutBody {
  priceId: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  smsConsent?: boolean;
  domainName?: string;
  businessName?: string;
  domain?: string;
  billingPeriod?: string;
  productName?: string;
  successPath?: string;
}

// Set of all domain-related Stripe Price IDs — used to block domain
// checkout sessions until a real registrar integration is connected.
const DOMAIN_PRICE_ID_VALUES: ReadonlySet<string> = new Set(
  Object.values(DOMAIN_PRICE_IDS)
);

/**
 * Returns true if the given price ID corresponds to a domain TLD product.
 * Used to prevent creating Stripe Checkout sessions for domain purchases
 * until a real domain registrar availability check is connected.
 */
function isDomainPriceId(priceId: string): boolean {
  return DOMAIN_PRICE_ID_VALUES.has(priceId);
}

/**
 * POST /api/create-checkout
 *
 * Creates a Stripe Checkout Session for any product (one-time or subscription).
 * Automatically detects recurring vs one-time based on the price ID.
 * customerEmail is optional — Stripe Checkout will collect it if not provided.
 * Returns { sessionId, url } for frontend redirect.
 *
 * Domain purchases are temporarily disabled until a real registrar is integrated.
 * Requests with a domain price ID or a domainName field are rejected with 503.
 *
 * Success/cancel URLs always point to the production domain (businessbloomllc.com).
 */
checkoutRouter.post("/api/create-checkout", async (req, res) => {
  try {
    const {
      priceId,
      customerName,
      customerEmail,
      customerPhone,
      smsConsent,
      domainName,
      businessName,
      domain,
      billingPeriod,
      productName,
      successPath: clientSuccessPath,
    } = req.body as CreateCheckoutBody;

    if (!priceId) {
      return res.status(400).json({ error: "priceId is required" });
    }

    // ── Domain purchase guard ───────────────────────────────────────────
    // Until a real domain registrar is integrated, refuse to create a
    // Stripe Checkout session for any domain-typed price ID or any
    // request that carries a domainName field.
    if (isDomainPriceId(priceId) || domainName) {
      return res.status(503).json({
        error:
          "Domain registration is temporarily unavailable. Assisted domain registration is being updated. Please check back soon.",
      });
    }

    // Always use the production domain for Stripe redirect URLs.
    const PRODUCTION_ORIGIN = "https://businessbloomllc.com";

    // Determine the success redirect path
    const successPath = clientSuccessPath || getSuccessPath(priceId) || "/";

    // Determine if this is a recurring subscription or one-time payment
    const recurring = isRecurringPrice(priceId);
    const mode: Stripe.Checkout.SessionCreateParams["mode"] = recurring
      ? "subscription"
      : "payment";

    // Build metadata object
    const metadata: Record<string, string> = {};
    if (customerName) metadata.customer_name = customerName;
    if (customerEmail) metadata.customer_email = customerEmail;
    if (customerPhone) metadata.customer_phone = customerPhone;
    if (smsConsent !== undefined) metadata.sms_consent = String(smsConsent);
    if (domainName) metadata.domain_name = domainName;
    if (businessName) metadata.business_name = businessName;
    if (domain) metadata.domain = domain;
    if (billingPeriod) metadata.billing_period = billingPeriod;
    if (productName) metadata.product_name = productName;

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      mode,
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      metadata,
      success_url: `${PRODUCTION_ORIGIN}${successPath}?success=true`,
      cancel_url: `${PRODUCTION_ORIGIN}${successPath}?canceled=true`,
      allow_promotion_codes: true,
    };

    // Only set customer_email if provided (otherwise Stripe Checkout collects it)
    if (customerEmail) {
      sessionParams.customer_email = customerEmail;
    }

    const session = await stripe.checkout.sessions.create(sessionParams);

    return res.json({
      sessionId: session.id,
      url: session.url,
    });
  } catch (error: any) {
    console.error("[Checkout] Error creating session:", error.message);
    return res.status(500).json({
      error: "Failed to create checkout session",
      details: error.message,
    });
  }
});

/**
 * POST /api/check-domain
 *
 * Domain availability checking is temporarily disabled.
 * A real registrar API integration (e.g., Namecheap, GoDaddy, Enom) will
 * be connected in a future phase. Until then, this endpoint always returns
 * available: false with a professional message so the frontend can display
 * an appropriate notice to the visitor.
 *
 * No simulated (Math.random) availability results are returned.
 */
checkoutRouter.post("/api/check-domain", async (req, res) => {
  try {
    const { domain } = req.body as { domain: string };

    if (!domain) {
      return res.status(400).json({ error: "domain is required" });
    }

    return res.json({
      domain,
      available: false,
      disabled: true,
      message:
        "Assisted domain registration is being updated. Please check back soon.",
    });
  } catch (error: any) {
    console.error("[Domain Check] Error:", error.message);
    return res.status(500).json({ error: "Failed to check domain availability" });
  }
});

/**
 * POST /api/stripe/webhook
 *
 * Handles Stripe webhook events for payment confirmation.
 */
checkoutRouter.post("/api/stripe/webhook", async (req, res) => {
  const sig = req.headers["stripe-signature"] as string;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error("[Webhook] No webhook secret configured");
    return res.status(500).json({ error: "Webhook secret not configured" });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err: any) {
    console.error("[Webhook] Signature verification failed:", err.message);
    return res.status(400).json({ error: `Webhook Error: ${err.message}` });
  }

  // Handle test events
  if (event.id.startsWith("evt_test_")) {
    console.log("[Webhook] Test event detected, returning verification response");
    return res.json({ verified: true });
  }

  // Process events
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log("[Webhook] Checkout completed:", {
        sessionId: session.id,
        customerEmail: session.customer_email,
        metadata: session.metadata,
      });

      // If this is a domain purchase, log the domain name for manual registration
      if (session.metadata?.domain_name) {
        console.log(
          `[Webhook] Domain registration needed: ${session.metadata.domain_name} for ${session.customer_email}`
        );
      }

      // Log product purchase
      if (session.metadata?.product_name) {
        console.log(
          `[Webhook] Product purchased: ${session.metadata.product_name} by ${session.customer_email}`
        );
      }
      break;
    }
    case "payment_intent.succeeded": {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log("[Webhook] Payment succeeded:", paymentIntent.id);
      break;
    }
    case "customer.subscription.created": {
      const subscription = event.data.object as Stripe.Subscription;
      console.log("[Webhook] Subscription created:", subscription.id);
      break;
    }
    default:
      console.log(`[Webhook] Unhandled event type: ${event.type}`);
  }

  return res.json({ received: true });
});
