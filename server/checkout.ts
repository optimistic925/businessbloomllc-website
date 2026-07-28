import { Router } from "express";
import Stripe from "stripe";
import { isRecurringPrice, getSuccessPath } from "../shared/servicePricing";
import { DOMAIN_PRICE_IDS } from "../shared/domainPricing";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2026-05-27.dahlia",
});

export const checkoutRouter = Router();

/** Set of all domain-related Stripe Price IDs — checkout for these is disabled. */
const DISABLED_DOMAIN_PRICE_IDS = new Set<string>(
  Object.values(DOMAIN_PRICE_IDS)
);

function isDomainPriceId(priceId: string): boolean {
  return DISABLED_DOMAIN_PRICE_IDS.has(priceId);
}

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

/**
 * POST /api/create-checkout
 *
 * Creates a Stripe Checkout Session for any product (one-time or subscription).
 * Automatically detects recurring vs one-time based on the price ID.
 * customerEmail is optional — Stripe Checkout will collect it if not provided.
 * Returns { sessionId, url } for frontend redirect.
 *
 * Domain checkout is BLOCKED until a real registrar API is connected.
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

    // ── Domain purchase guard ──────────────────────────────────────────
    // Do NOT create a Stripe checkout session for any domain price ID.
    // Domain availability cannot be verified without a real registrar API.
    // This prevents users from paying for domains that may not be registrable.
    if (isDomainPriceId(priceId)) {
      return res.status(403).json({
        error:
          "Domain registration is temporarily unavailable. We are updating our domain registration system. Please check back soon.",
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
 * The previous implementation used Math.random() to simulate availability,
 * which could lead to customers paying for domains that are not registrable.
 *
 * A real registrar API integration is required before this endpoint can
 * return actual availability results.
 */
checkoutRouter.post("/api/check-domain", async (_req, res) => {
  return res.status(503).json({
    available: false,
    disabled: true,
    message:
      "Domain availability checking is temporarily unavailable. We are updating our domain registration system. Please check back soon.",
  });
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
