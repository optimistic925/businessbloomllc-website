import { ArrowLeft, ArrowRight, CheckCircle2, HelpCircle, LockKeyhole, Sparkles } from "lucide-react";
import { useRoute } from "wouter";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { initiateMarketplaceCheckout } from "@/lib/checkout";
import { PUBLIC_MARKETPLACE_PRODUCTS, getPublicMarketplaceProduct } from "../../../shared/marketplacePublicCatalog";
import { getMarketplaceCommercialConfig } from "../../../shared/marketplaceCommercialConfig";

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

function problemFor(category: string) {
  switch (category) {
    case "Professional Systems": return "Important work becomes inconsistent when processes live in memory, scattered files, or one-off habits instead of a repeatable operating system.";
    case "Digital Business": return "Website work can become fragmented across strategy, content, workflows, QA, and launch decisions without one coordinated implementation structure.";
    case "Executive": return "Major owner-led decisions are harder when finance, marketing, operations, risk, and execution tradeoffs are considered separately.";
    case "Startup": return "New businesses often lose momentum when foundational decisions, launch work, brand materials, and implementation tasks are not organized into one usable path.";
    case "Marketing": return "Marketing becomes difficult to repeat when planning, content, campaigns, publishing, and measurement are handled as disconnected activities.";
    default: return "Business execution slows when important work is scattered instead of organized into a repeatable system.";
  }
}

function deliveryCopy(type: "download" | "access" | "onboarding" | "hybrid") {
  switch (type) {
    case "access": return "After a successful purchase, Business Bloom sends secure access instructions to the customer email used at checkout.";
    case "onboarding": return "After a successful purchase, Business Bloom sends onboarding instructions and the approved next-step destination to the customer email used at checkout.";
    case "hybrid": return "After a successful purchase, Business Bloom sends the required combination of download, access, and onboarding instructions to the customer email used at checkout.";
    default: return "After a successful purchase, Business Bloom sends the approved customer download instructions to the customer email used at checkout.";
  }
}

export default function MarketplaceProduct() {
  const [, params] = useRoute("/marketplace/:slug");
  const product = getPublicMarketplaceProduct(params?.slug || "");

  if (!product) {
    return <div className="min-h-screen bg-[#0B0F1A] text-white"><NavBar /><main className="pt-32 max-w-3xl mx-auto px-4"><h1 className="text-3xl font-black">Product not found</h1><a href="/marketplace" className="inline-flex mt-6 text-[#14B8A6]">Return to Marketplace</a></main></div>;
  }

  const commercial = getMarketplaceCommercialConfig(product.slug);
  const checkoutReady = Boolean(commercial);
  const relatedProducts = PUBLIC_MARKETPLACE_PRODUCTS
    .filter((candidate) => candidate.slug !== product.slug)
    .sort((a, b) => Number(b.category === product.category) - Number(a.category === product.category))
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white overflow-x-hidden">
      <NavBar />
      <main className="pt-28 pb-20">
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <a href="/marketplace" className="inline-flex items-center gap-2 text-sm text-white/55 hover:text-white"><ArrowLeft className="h-4 w-4" /> Marketplace</a>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 mt-8">
            <div>
              <div className="aspect-[16/6] rounded-3xl bg-gradient-to-br from-[#7C3AED]/35 via-[#141A2D] to-[#14B8A6]/20 border border-white/10 p-7 sm:p-10 flex items-end">
                <div><Sparkles className="h-8 w-8 text-[#BDA4FF]" /><p className="mt-4 text-xs font-semibold tracking-[0.2em] uppercase text-white/50">Business Bloom</p><p className="mt-2 text-2xl sm:text-3xl font-black">{product.name}</p></div>
              </div>

              <div className="flex flex-wrap gap-2 mt-8"><span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#7C3AED]/10 border border-[#7C3AED]/25 text-[#BDA4FF]">{product.category}</span><span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-white/60">One-time purchase</span><span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-white/60 capitalize">{product.fulfillmentType} fulfillment</span></div>
              <h1 className="mt-6 text-4xl sm:text-5xl font-black leading-tight" style={{ fontFamily: "var(--font-display)" }}>{product.name}</h1>
              <p className="mt-2 text-sm text-white/35">{product.collection}</p>
              <p className="mt-5 text-lg text-white/60 leading-relaxed max-w-3xl">{product.shortDescription}</p>

              <div className="grid sm:grid-cols-2 gap-8 mt-10"><div><h2 className="text-xl font-bold">Who it is for</h2><p className="mt-4 text-white/65 text-sm leading-relaxed">{audienceFor(product.category)}</p></div><div><h2 className="text-xl font-bold">The problem it solves</h2><p className="mt-4 text-white/65 text-sm leading-relaxed">{problemFor(product.category)}</p></div></div>

              <div className="grid sm:grid-cols-2 gap-8 mt-10"><div><h2 className="text-xl font-bold">Key benefits</h2><ul className="space-y-3 mt-4">{product.benefits.slice(0, 6).map((item) => <li key={item} className="flex gap-3 text-white/70 text-sm"><CheckCircle2 className="h-5 w-5 text-[#14B8A6] shrink-0" />{item}</li>)}</ul></div><div><h2 className="text-xl font-bold">What’s included</h2><ul className="space-y-3 mt-4">{product.included.map((item) => <li key={item} className="flex gap-3 text-white/70 text-sm"><CheckCircle2 className="h-5 w-5 text-[#7C3AED] shrink-0" />{item}</li>)}</ul></div></div>

              <div className="mt-10 p-6 rounded-2xl border border-white/10 bg-[#0D1120]"><h2 className="text-xl font-bold">How it works</h2><ol className="mt-4 grid sm:grid-cols-3 gap-5 text-sm text-white/60"><li><strong className="text-white block mb-1">1. Choose the system</strong>Review the outcome, included tools, price, and fit for your business.</li><li><strong className="text-white block mb-1">2. Complete checkout</strong>Secure one-time payment is handled through Stripe using the approved product and price mapping.</li><li><strong className="text-white block mb-1">3. Receive instructions</strong>{deliveryCopy(product.fulfillmentType)}</li></ol></div>

              <div className="grid sm:grid-cols-2 gap-6 mt-8"><div className="p-6 rounded-2xl border border-white/10 bg-[#0D1120]"><h2 className="text-xl font-bold">Format & delivery</h2><p className="mt-3 text-sm leading-relaxed text-white/55">Digital Business Bloom product. No physical shipment is required. {deliveryCopy(product.fulfillmentType)}</p></div><div className="p-6 rounded-2xl border border-white/10 bg-[#0D1120]"><h2 className="text-xl font-bold">License & use</h2><p className="mt-3 text-sm leading-relaxed text-white/55">Purchase provides customer use rights under the applicable Business Bloom license and Terms. Redistribution, resale, or public sharing is not included unless the product license expressly says otherwise.</p></div></div>

              <div className="mt-8 p-6 rounded-2xl border border-white/10 bg-[#0D1120]"><h2 className="text-xl font-bold">FAQ</h2><div className="mt-4 grid sm:grid-cols-2 gap-6 text-sm"><div><h3 className="font-semibold">Is this a subscription?</h3><p className="text-white/55 mt-1">No. The current approved product is priced as a one-time purchase.</p></div><div><h3 className="font-semibold">Do I need special software?</h3><p className="text-white/55 mt-1">Use requirements vary by the included editable tools. Product instructions identify the appropriate formats and next steps.</p></div><div><h3 className="font-semibold">How will I receive it?</h3><p className="text-white/55 mt-1">Delivery instructions are sent to the customer email after successful payment using the approved fulfillment flow.</p></div><div><h3 className="font-semibold">Where do I get help?</h3><p className="text-white/55 mt-1">Email <a href="mailto:support@businessbloomllc.com" className="text-[#14B8A6] hover:underline">support@businessbloomllc.com</a> for purchase, delivery, access, onboarding, or product questions.</p></div></div></div>

              <div className="mt-8 p-6 rounded-2xl border border-white/10 bg-[#0D1120]"><h2 className="text-xl font-bold">Important use boundary</h2><p className="mt-3 text-sm leading-relaxed text-white/55">Business Bloom products provide business planning and implementation resources. They do not replace licensed legal, tax, accounting, HR, medical, or other regulated professional advice where professional review is required.</p></div>
            </div>

            <aside className="lg:sticky lg:top-24 h-fit p-7 rounded-2xl bg-[#0D1120] border border-white/10">
              <p className="text-sm text-white/45">One-time price</p><p className="text-3xl font-black text-[#14B8A6] mt-1">{commercial?.priceDisplay ?? "Unavailable"}</p>
              <p className="mt-4 text-sm text-white/55 leading-relaxed">{product.shortDescription}</p>
              {checkoutReady ? <div className="mt-6"><button onClick={() => initiateMarketplaceCheckout(product.slug)} className="w-full px-5 py-3.5 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold inline-flex items-center justify-center gap-2"><LockKeyhole className="h-4 w-4" /> Continue to secure checkout</button><p className="mt-3 text-xs text-white/45 leading-relaxed">By continuing, you are purchasing a one-time digital product and agree to the <a href="/terms" className="text-[#14B8A6] hover:underline">Terms of Service</a> and acknowledge the <a href="/privacy" className="text-[#14B8A6] hover:underline">Privacy Policy</a>. Digital-product purchases are treated as final after delivery or access is made available, subject to applicable law and Business Bloom’s documented fulfillment-error remedies.</p></div> : <div className="mt-6"><button disabled className="w-full px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white/40 font-bold cursor-not-allowed inline-flex items-center justify-center gap-2"><LockKeyhole className="h-4 w-4" /> Checkout unavailable</button><p className="mt-3 text-xs text-white/45">This product does not currently have an approved commercial configuration.</p></div>}
              <dl className="mt-6 space-y-3 text-sm"><div className="flex justify-between gap-4"><dt className="text-white/45">Catalog</dt><dd className="text-white/75 text-right">Current approved</dd></div><div className="flex justify-between gap-4"><dt className="text-white/45">Billing</dt><dd className="text-white/75 text-right">One-time</dd></div><div className="flex justify-between gap-4"><dt className="text-white/45">Fulfillment</dt><dd className="text-white/75 text-right capitalize">{product.fulfillmentType}</dd></div><div className="flex justify-between gap-4"><dt className="text-white/45">Stripe mapping</dt><dd className="text-white/75 text-right">{commercial ? "Verified" : "Required"}</dd></div></dl>
              <a href="/support" className="mt-6 inline-flex w-full items-center justify-center gap-2 text-sm text-[#14B8A6] font-semibold"><HelpCircle className="h-4 w-4" /> Questions before purchase?</a>
            </aside>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 border-t border-white/5 pt-16">
          <div className="flex items-end justify-between gap-4"><div><p className="text-[#BDA4FF] text-sm font-bold uppercase tracking-wider">Related products</p><h2 className="mt-2 text-3xl font-black">Continue building the system</h2></div><a href="/marketplace" className="hidden sm:inline-flex text-sm font-semibold text-[#14B8A6]">View Marketplace</a></div>
          <div className="grid md:grid-cols-3 gap-5 mt-7">{relatedProducts.map((related) => { const relatedCommercial = getMarketplaceCommercialConfig(related.slug); return <a href={`/marketplace/${related.slug}`} key={related.slug} className="p-6 rounded-2xl bg-[#0D1120] border border-white/10 hover:border-[#7C3AED]/40 transition-colors"><span className="text-xs text-white/40">{related.category}</span><h3 className="mt-2 text-lg font-bold">{related.name}</h3><p className="mt-3 text-sm text-white/50 line-clamp-3">{related.shortDescription}</p><div className="mt-5 flex items-center justify-between"><span className="font-black text-[#14B8A6]">{relatedCommercial?.priceDisplay}</span><ArrowRight className="h-4 w-4 text-white/50" /></div></a>; })}</div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
