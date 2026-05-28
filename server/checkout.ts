import { Router } from "express";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2026-05-27.dahlia",
});

export const checkoutRouter = Router();

interface CreateCheckoutBody {
  priceId: string;
  customerName?: string;
  customerEmail: string;
  customerPhone?: string;
  smsConsent?: boolean;
  domainName?: string;
  businessName?: string;
  domain?: string;
  billingPeriod?: string;
}

/**
 * POST /api/create-checkout
 *
 * Creates a Stripe Checkout Session for either hosting or domain purchases.
 * Accepts priceId, customer info, and optional domain metadata.
 * Returns { sessionId, url } for frontend redirect.
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
    } = req.body as CreateCheckoutBody;

    if (!priceId) {
      return res.status(400).json({ error: "priceId is required" });
    }

    if (!customerEmail) {
      return res.status(400).json({ error: "customerEmail is required" });
    }

    const origin = req.headers.origin || `${req.protocol}://${req.get("host")}`;

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

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      customer_email: customerEmail,
      metadata,
      success_url: `${origin}/domains?success=true`,
      cancel_url: `${origin}/domains?canceled=true`,
      allow_promotion_codes: true,
    };

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
 * Simulates domain availability check.
 * In production, this would integrate with a domain registrar API.
 */
checkoutRouter.post("/api/check-domain", async (req, res) => {
  try {
    const { domain } = req.body as { domain: string };

    if (!domain) {
      return res.status(400).json({ error: "domain is required" });
    }

    // Simulate domain availability check
    // In production, integrate with a registrar API (e.g., Namecheap, GoDaddy, Enom)
    const isAvailable = Math.random() > 0.3; // 70% chance available for demo
    const isPremium = Math.random() > 0.9; // 10% chance premium

    return res.json({
      domain,
      available: isAvailable,
      isPremium,
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
      break;
    }
    case "payment_intent.succeeded": {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log("[Webhook] Payment succeeded:", paymentIntent.id);
      break;
    }
    default:
      console.log(`[Webhook] Unhandled event type: ${event.type}`);
  }

  return res.json({ received: true });
});
