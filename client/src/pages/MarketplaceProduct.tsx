import { ArrowLeft, CheckCircle2, LockKeyhole, ShieldAlert } from "lucide-react";
import { useRoute } from "wouter";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { initiateMarketplaceCheckout } from "@/lib/checkout";
import { getMarketplaceProduct, productCheckoutReady } from "../../../shared/marketplaceProducts";

function billingLabel(model: ReturnType<typeof getMarketplaceProduct> extends infer T ? T extends { billingModel: infer B } ? B : never : never) {
  if (model === "RECURRING") return "Recurring billing";
  if (model === "ONE_TIME") return "One-time purchase";
  if (model === "FREE") return "Free";
  return "Pricing setup required";
}

export default function MarketplaceProduct() {
  const [, params] = useRoute("/marketplace/:slug");
  const product = getMarketplaceProduct(params?.slug || "");

  if (!product) {
    return <div className="min-h-screen bg-[#0B0F1A] text-white"><NavBar /><main className="pt-32 max-w-3xl mx-auto px-4"><h1 className="text-3xl font-black">Product not found</h1><a href="/marketplace" className="inline-flex mt-6 text-[#14B8A6]">Return to Marketplace</a></main></div>;
  }

  const checkoutReady = productCheckoutReady(product);

  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white">
      <NavBar />
      <main className="pt-28 pb-20">
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <a href="/marketplace" className="inline-flex items-center gap-2 text-sm text-white/55 hover:text-white"><ArrowLeft className="h-4 w-4" /> Marketplace</a>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 mt-8">
            <div>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#7C3AED]/10 border border-[#7C3AED]/25 text-[#BDA4FF]">{product.category}</span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-white/60">{billingLabel(product.billingModel)}</span>
              </div>
              <h1 className="mt-6 text-4xl sm:text-5xl font-black leading-tight" style={{ fontFamily: "var(--font-display)" }}>{product.name}</h1>
              <p className="mt-2 text-sm text-white/35">{product.collection}</p>
              <p className="mt-5 text-lg text-white/60 leading-relaxed max-w-3xl">{product.shortDescription}</p>

              <div className="grid sm:grid-cols-2 gap-8 mt-10">
                <div><h2 className="text-xl font-bold">Key benefits</h2><ul className="space-y-3 mt-4">{product.benefits.slice(0, 6).map((item) => <li key={item} className="flex gap-3 text-white/70 text-sm"><CheckCircle2 className="h-5 w-5 text-[#14B8A6] shrink-0" />{item}</li>)}</ul></div>
                <div><h2 className="text-xl font-bold">What’s included</h2><ul className="space-y-3 mt-4">{product.included.map((item) => <li key={item} className="flex gap-3 text-white/70 text-sm"><CheckCircle2 className="h-5 w-5 text-[#7C3AED] shrink-0" />{item}</li>)}</ul></div>
              </div>

              <div className="mt-10 p-6 rounded-2xl border border-white/10 bg-[#0D1120]"><h2 className="text-xl font-bold">Access & support</h2><p className="mt-3 text-sm leading-relaxed text-white/55">This product is confirmed in the current approved Business Bloom Marketplace Drive inventory. Checkout will remain disabled until an approved Stripe product/price and a customer-accessible fulfillment destination are configured.</p></div>
            </div>

            <aside className="lg:sticky lg:top-24 h-fit p-7 rounded-2xl bg-[#0D1120] border border-white/10">
              <p className="text-sm text-white/45">Marketplace pricing</p>
              <p className="text-3xl font-black text-[#14B8A6] mt-1">{product.priceDisplay}</p>
              {checkoutReady ? (
                <button onClick={() => initiateMarketplaceCheckout(product.slug)} className="mt-6 w-full px-5 py-3.5 rounded-xl bg-[#7C3AED] hover:bg-[#6D2FDD] font-bold transition-colors">Purchase with Stripe</button>
              ) : (
                <div className="mt-6">
                  <button disabled className="w-full px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white/40 font-bold cursor-not-allowed inline-flex items-center justify-center gap-2"><LockKeyhole className="h-4 w-4" /> Checkout not yet enabled</button>
                  <div className="mt-4 p-4 rounded-xl bg-[#F59E0B]/10 border border-[#F59E0B]/25"><div className="flex items-start gap-3"><ShieldAlert className="h-5 w-5 text-[#F59E0B] shrink-0 mt-0.5" /><p className="text-xs leading-relaxed text-[#F8C866]">Current product assets are verified, but Stripe and public fulfillment configuration are still required. No legacy price or internal-only Drive path will be substituted.</p></div></div>
                </div>
              )}
              <dl className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between gap-4"><dt className="text-white/45">Catalog</dt><dd className="text-white/75 text-right">Current approved</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-white/45">Fulfillment</dt><dd className="text-white/75 text-right capitalize">{product.fulfillmentType}</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-white/45">Stripe mapping</dt><dd className="text-white/75 text-right">{product.stripeMatchStatus === "MATCHED" ? "Verified" : "Required"}</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-white/45">Launch</dt><dd className="text-white/75 text-right">{product.launchStatus}</dd></div>
              </dl>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
