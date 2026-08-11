import { ArrowLeft, CheckCircle2, LockKeyhole, ShieldAlert } from "lucide-react";
import { useRoute } from "wouter";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { initiateMarketplaceCheckout } from "@/lib/checkout";
import { getMarketplaceProduct } from "../../../shared/marketplaceProducts";
import { getMarketplaceCommercialConfig } from "../../../shared/marketplaceCommercialConfig";

function fulfillmentReady(product: NonNullable<ReturnType<typeof getMarketplaceProduct>>) {
  if (product.fulfillmentStatus !== "READY") return false;
  if (product.requiresDigitalDelivery && !product.downloadUrl) return false;
  if (product.requiresAccessInstructions && !product.accessUrl) return false;
  if (product.requiresOnboarding && !product.nextStepUrl) return false;
  return true;
}

function audienceFor(category: string) {
  switch (category) {
    case "Professional Systems": return "Small-business owners, managers, and teams building repeatable business operations.";
    case "Digital Business": return "Entrepreneurs and small businesses planning, building, or improving their digital business presence.";
    case "Executive": return "Founders and owner-led businesses that want a structured way to evaluate important business decisions.";
    case "Startup": return "Aspiring entrepreneurs and startups establishing the foundations for a credible business launch.";
    case "Marketing": return "Solopreneurs, small businesses, marketers, and agencies building repeatable marketing execution.";
    default: return "Entrepreneurs and growing businesses that want practical, reusable business systems.";
  }
}

export default function MarketplaceProduct() {
  const [, params] = useRoute("/marketplace/:slug");
  const product = getMarketplaceProduct(params?.slug || "");

  if (!product) {
    return <div className="min-h-screen bg-[#0B0F1A] text-white"><NavBar /><main className="pt-32 max-w-3xl mx-auto px-4"><h1 className="text-3xl font-black">Product not found</h1><a href="/marketplace" className="inline-flex mt-6 text-[#14B8A6]">Return to Marketplace</a></main></div>;
  }

  const commercial = getMarketplaceCommercialConfig(product.slug);
  const checkoutReady = Boolean(commercial && fulfillmentReady(product));

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
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-white/60">One-time purchase</span>
              </div>
              <h1 className="mt-6 text-4xl sm:text-5xl font-black leading-tight" style={{ fontFamily: "var(--font-display)" }}>{product.name}</h1>
              <p className="mt-2 text-sm text-white/35">{product.collection}</p>
              <p className="mt-5 text-lg text-white/60 leading-relaxed max-w-3xl">{product.shortDescription}</p>

              <div className="grid sm:grid-cols-2 gap-8 mt-10">
                <div><h2 className="text-xl font-bold">Who it is for</h2><p className="mt-4 text-white/65 text-sm leading-relaxed">{audienceFor(product.category)}</p></div>
                <div><h2 className="text-xl font-bold">Product format</h2><p className="mt-4 text-white/65 text-sm leading-relaxed">Digital Business Bloom system delivered through the approved customer-access flow. No physical shipment is required.</p></div>
              </div>

              <div className="grid sm:grid-cols-2 gap-8 mt-10">
                <div><h2 className="text-xl font-bold">Key benefits</h2><ul className="space-y-3 mt-4">{product.benefits.slice(0, 6).map((item) => <li key={item} className="flex gap-3 text-white/70 text-sm"><CheckCircle2 className="h-5 w-5 text-[#14B8A6] shrink-0" />{item}</li>)}</ul></div>
                <div><h2 className="text-xl font-bold">What’s included</h2><ul className="space-y-3 mt-4">{product.included.map((item) => <li key={item} className="flex gap-3 text-white/70 text-sm"><CheckCircle2 className="h-5 w-5 text-[#7C3AED] shrink-0" />{item}</li>)}</ul></div>
              </div>

              <div className="mt-10 p-6 rounded-2xl border border-white/10 bg-[#0D1120]"><h2 className="text-xl font-bold">How it works</h2><ol className="mt-4 grid sm:grid-cols-3 gap-4 text-sm text-white/60"><li><strong className="text-white block mb-1">1. Choose the system</strong>Review the outcome, included tools, and fit for your business.</li><li><strong className="text-white block mb-1">2. Complete checkout</strong>Secure payment is handled through Stripe once delivery validation is complete.</li><li><strong className="text-white block mb-1">3. Follow delivery instructions</strong>Business Bloom sends the appropriate download, access, or onboarding information by email.</li></ol></div>

              <div className="mt-8 p-6 rounded-2xl border border-white/10 bg-[#0D1120]"><h2 className="text-xl font-bold">FAQ</h2><div className="mt-4 space-y-5 text-sm"><div><h3 className="font-semibold">Is this a subscription?</h3><p className="text-white/55 mt-1">No. The current approved product is priced as a one-time purchase.</p></div><div><h3 className="font-semibold">Do I need special software?</h3><p className="text-white/55 mt-1">Use requirements vary by the included editable tools. Product instructions identify the appropriate file formats and next steps.</p></div><div><h3 className="font-semibold">Where do I get help?</h3><p className="text-white/55 mt-1">Use Business Bloom Support for purchase, delivery, access, or product questions.</p></div></div></div>

              <div className="mt-8 p-6 rounded-2xl border border-white/10 bg-[#0D1120]"><h2 className="text-xl font-bold">Important use boundary</h2><p className="mt-3 text-sm leading-relaxed text-white/55">Business Bloom products provide business planning and implementation resources. They do not replace licensed legal, tax, accounting, HR, medical, or other regulated professional advice where professional review is required.</p></div>
            </div>

            <aside className="lg:sticky lg:top-24 h-fit p-7 rounded-2xl bg-[#0D1120] border border-white/10">
              <p className="text-sm text-white/45">One-time price</p>
              <p className="text-3xl font-black text-[#14B8A6] mt-1">{commercial?.priceDisplay ?? "Unavailable"}</p>
              {checkoutReady ? (
                <button onClick={() => initiateMarketplaceCheckout(product.slug)} className="mt-6 w-full px-5 py-3.5 rounded-xl bg-[#7C3AED] hover:bg-[#6D2FDD] font-bold transition-colors">Purchase with Stripe</button>
              ) : (
                <div className="mt-6">
                  <button disabled className="w-full px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white/40 font-bold cursor-not-allowed inline-flex items-center justify-center gap-2"><LockKeyhole className="h-4 w-4" /> Checkout finalization in progress</button>
                  <div className="mt-4 p-4 rounded-xl bg-[#F59E0B]/10 border border-[#F59E0B]/25"><div className="flex items-start gap-3"><ShieldAlert className="h-5 w-5 text-[#F59E0B] shrink-0 mt-0.5" /><p className="text-xs leading-relaxed text-[#F8C866]">Approved pricing and Stripe mapping are complete. Checkout remains protected until the customer delivery path and automated fulfillment are validated.</p></div></div>
                </div>
              )}
              <dl className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between gap-4"><dt className="text-white/45">Catalog</dt><dd className="text-white/75 text-right">Current approved</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-white/45">Billing</dt><dd className="text-white/75 text-right">One-time</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-white/45">Fulfillment</dt><dd className="text-white/75 text-right capitalize">{product.fulfillmentType}</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-white/45">Stripe mapping</dt><dd className="text-white/75 text-right">{commercial ? "Verified" : "Required"}</dd></div>
              </dl>
              <a href="/support" className="mt-6 block text-center text-sm text-[#14B8A6] hover:underline">Questions before purchase?</a>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
