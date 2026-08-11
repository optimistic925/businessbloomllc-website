import { Router } from "express";
import Stripe from "stripe";
import { isRecurringPrice, getSuccessPath } from "../shared/servicePricing";
import { DOMAIN_PRICE_IDS } from "../shared/domainPricing";
import { getMarketplaceProduct } from "../shared/marketplaceProducts";
import { getMarketplaceCommercialConfig } from "../shared/marketplaceCommercialConfig";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2026-05-27.dahlia",
});

export const checkoutRouter = Router();

const DISABLED_DOMAIN_PRICE_IDS = new Set<string>(Object.values(DOMAIN_PRICE_IDS));
function isDomainPriceId(priceId: string): boolean { return DISABLED_DOMAIN_PRICE_IDS.has(priceId); }

interface CreateCheckoutBody {
  priceId?: string;
  marketplaceProductSlug?: string;
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

function marketplaceFulfillmentReady(product: NonNullable<ReturnType<typeof getMarketplaceProduct>>) {
  if (product.fulfillmentStatus !== "READY") return false;
  if (product.requiresDigitalDelivery && !product.downloadUrl) return false;
  if (product.requiresAccessInstructions && !product.accessUrl) return false;
  if (product.requiresOnboarding && !product.nextStepUrl) return false;
  return true;
}

checkoutRouter.post("/api/create-checkout", async (req, res) => {
  try {
    const body = req.body as CreateCheckoutBody;
    const marketplaceProduct = body.marketplaceProductSlug ? getMarketplaceProduct(body.marketplaceProductSlug) : null;
    const marketplaceCommercial = marketplaceProduct ? getMarketplaceCommercialConfig(marketplaceProduct.slug) : null;

    if (body.marketplaceProductSlug && !marketplaceProduct) {
      return res.status(404).json({ error: "Marketplace product not found" });
    }

    if (marketplaceProduct && !marketplaceCommercial) {
      return res.status(409).json({ error: "Approved commercial configuration required before launch" });
    }

    if (marketplaceProduct && !marketplaceFulfillmentReady(marketplaceProduct)) {
      return res.status(409).json({
        error: "Fulfillment configuration required before launch",
        fulfillmentStatus: marketplaceProduct.fulfillmentStatus,
      });
    }

    const priceId = marketplaceCommercial?.stripePriceId || body.priceId;
    if (!priceId) return res.status(400).json({ error: "priceId is required" });

    if (isDomainPriceId(priceId)) {
      return res.status(403).json({
        error: "Domain registration is temporarily unavailable. We are updating our domain registration system. Please check back soon.",
      });
    }

    const PRODUCTION_ORIGIN = "https://businessbloomllc.com";
    const recurring = marketplaceCommercial
      ? marketplaceCommercial.billingModel === "RECURRING"
      : isRecurringPrice(priceId);
    const mode: Stripe.Checkout.SessionCreateParams["mode"] = recurring ? "subscription" : "payment";

    const metadata: Record<string, string> = {};
    if (body.customerName) metadata.customer_name = body.customerName;
    if (body.customerEmail) metadata.customer_email = body.customerEmail;
    if (body.customerPhone) metadata.customer_phone = body.customerPhone;
    if (body.smsConsent !== undefined) metadata.sms_consent = String(body.smsConsent);
    if (body.domainName) metadata.domain_name = body.domainName;
    if (body.businessName) metadata.business_name = body.businessName;
    if (body.domain) metadata.domain = body.domain;
    if (body.billingPeriod) metadata.billing_period = body.billingPeriod;

    if (marketplaceProduct) {
      // Exact legacy metadata keys are preserved for the fulfillment contract.
      // Product-specific requirement flags allow n8n to validate only relevant destinations.
      metadata.product_name = marketplaceProduct.name;
      metadata.download_url = marketplaceProduct.downloadUrl ?? "";
      metadata.access_url = marketplaceProduct.accessUrl ?? "";
      metadata.next_step_url = marketplaceProduct.nextStepUrl ?? "";
      metadata.requires_download = String(marketplaceProduct.requiresDigitalDelivery);
      metadata.requires_access = String(marketplaceProduct.requiresAccessInstructions);
      metadata.requires_onboarding = String(marketplaceProduct.requiresOnboarding);
      metadata.marketplace_product_slug = marketplaceProduct.slug;
    } else if (body.productName) {
      // Preserve legacy checkout behavior for existing site purchase buttons.
      metadata.product_name = body.productName;
    }

    const successUrl = marketplaceProduct
      ? `${PRODUCTION_ORIGIN}/marketplace/success?session_id={CHECKOUT_SESSION_ID}`
      : `${PRODUCTION_ORIGIN}${body.successPath || getSuccessPath(priceId) || "/"}?success=true`;
    const cancelUrl = marketplaceProduct
      ? `${PRODUCTION_ORIGIN}/marketplace/cancel?product=${encodeURIComponent(marketplaceProduct.slug)}`
      : `${PRODUCTION_ORIGIN}${body.successPath || getSuccessPath(priceId) || "/"}?canceled=true`;

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      mode,
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      metadata,
      success_url: successUrl,
      cancel_url: cancelUrl,
      allow_promotion_codes: true,
    };

    if (body.customerEmail) sessionParams.customer_email = body.customerEmail;

    const session = await stripe.checkout.sessions.create(sessionParams);
    return res.json({ sessionId: session.id, url: session.url });
  } catch (error: any) {
    console.error("[Checkout] Error creating session:", error.message);
    return res.status(500).json({ error: "Failed to create checkout session", details: error.message });
  }
});

checkoutRouter.get("/api/checkout-session/:sessionId", async (req, res) => {
  try {
    const { sessionId } = req.params;
    if (!sessionId?.startsWith("cs_")) {
      return res.status(400).json({ error: "Invalid Checkout Session" });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return res.json({
      id: session.id,
      status: session.status,
      paymentStatus: session.payment_status,
      productName: session.metadata?.product_name || null,
    });
  } catch (error: any) {
    console.error("[Checkout] Error retrieving session:", error.message);
    return res.status(404).json({ error: "Checkout Session not found" });
  }
});

checkoutRouter.post("/api/check-domain", async (_req, res) => {
  return res.status(503).json({
    available: false,
    disabled: true,
    message: "Domain availability checking is temporarily unavailable. We are updating our domain registration system. Please check back soon.",
  });
});

checkoutRouter.post("/api/stripe/webhook", async (req, res) => {
  const sig = req.headers["stripe-signature"] as string;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("[Webhook] No webhook secret configured");
    return res.status(500).json({ error: "Webhook secret not configured" });
  }

  let event: Stripe.Event;
  try { event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret); }
  catch (err: any) {
    console.error("[Webhook] Signature verification failed:", err.message);
    return res.status(400).json({ error: `Webhook Error: ${err.message}` });
  }

  if (event.id.startsWith("evt_test_")) return res.json({ verified: true });

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log("[Webhook] Checkout completed:", { sessionId: session.id, customerEmail: session.customer_email, metadata: session.metadata });
      if (session.metadata?.domain_name) console.log(`[Webhook] Domain registration needed: ${session.metadata.domain_name} for ${session.customer_email}`);
      if (session.metadata?.product_name) console.log(`[Webhook] Product purchased: ${session.metadata.product_name} by ${session.customer_email}`);
      break;
    }
    case "payment_intent.succeeded":
      console.log("[Webhook] Payment succeeded:", (event.data.object as Stripe.PaymentIntent).id);
      break;
    case "customer.subscription.created":
      console.log("[Webhook] Subscription created:", (event.data.object as Stripe.Subscription).id);
      break;
    default:
      console.log(`[Webhook] Unhandled event type: ${event.type}`);
  }

  return res.json({ received: true });
});
