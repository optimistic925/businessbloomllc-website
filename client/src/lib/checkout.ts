import { toast } from "sonner";

/**
 * Initiates a Stripe Checkout session by calling the server endpoint.
 * Redirects the user to Stripe's hosted checkout page.
 *
 * @param priceId - The Stripe Price ID for the product
 * @param productName - Human-readable product name (stored in metadata)
 */
export async function initiateCheckout(priceId: string, productName: string) {
  try {
    const response = await fetch("/api/create-checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        priceId,
        productName,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || data.details || "Checkout failed");
    }

    if (data.url) {
      window.location.href = data.url;
    } else if (data.sessionId) {
      window.location.href = `https://checkout.stripe.com/c/pay/${data.sessionId}`;
    } else {
      throw new Error("No checkout URL returned");
    }
  } catch (err: any) {
    console.error("Checkout error:", err);
    toast.error(err.message || "Failed to start checkout. Please try again.");
  }
}
