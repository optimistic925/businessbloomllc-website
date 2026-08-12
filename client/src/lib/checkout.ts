import { toast } from "sonner";

/**
 * Existing checkout helper retained for legacy site purchase buttons.
 */
export async function initiateCheckout(priceId: string, productName: string) {
  try {
    const response = await fetch("/api/create-checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ priceId, productName }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || data.details || "Checkout failed");
    if (data.url) window.location.href = data.url;
    else if (data.sessionId) window.location.href = `https://checkout.stripe.com/c/pay/${data.sessionId}`;
    else throw new Error("No checkout URL returned");
  } catch (err: any) {
    console.error("Checkout error:", err);
    toast.error(err.message || "Failed to start checkout. Please try again.");
  }
}

/**
 * Marketplace checkout sends only a product slug. Stripe price and fulfillment
 * metadata are derived from the trusted server-side/shared product registry.
 */
export async function initiateMarketplaceCheckout(productSlug: string) {
  try {
    const response = await fetch("/api/create-checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ marketplaceProductSlug: productSlug }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || data.details || "Checkout failed");
    if (!data.url) throw new Error("No checkout URL returned");
    window.location.href = data.url;
  } catch (err: any) {
    console.error("Marketplace checkout error:", err);
    toast.error(err.message || "This product is not ready for checkout yet.");
  }
}
