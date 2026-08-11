import { ArrowRight, Gift, Layers3, ShieldCheck, ShoppingBag } from "lucide-react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import {
  APPROVED_FREE_RESOURCES,
  FREE_RESOURCE_EXPECTED_COUNT,
  MARKETPLACE_PRODUCTS,
} from "../../../shared/marketplaceProducts";

function billingLabel(model: (typeof MARKETPLACE_PRODUCTS)[number]["billingModel"]) {
  if (model === "RECURRING") return "Recurring";
  if (model === "ONE_TIME") return "One-time";
  if (model === "FREE") return "Free";
  return "Pricing setup required";
}

export default function Marketplace() {
  const categories = Array.from(new Set(MARKETPLACE_PRODUCTS.map((product) => product.category)));
  const professionalSystems = MARKETPLACE_PRODUCTS.filter(
    (product) => product.collection === "Business Bloom Professional Systems™",
  );

  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white">
      <NavBar />
      <main className="pt-28 pb-20">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#7C3AED]/10 border border-[#7C3AED]/30 text-[#BDA4FF] text-sm font-semibold">
              <ShoppingBag className="h-4 w-4" /> BUSINESS BLOOM MARKETPLACE
            </span>
            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-black leading-tight" style={{ fontFamily: "var(--font-display)" }}>
              Current Business Bloom systems and resources, verified from the approved Marketplace inventory.
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-white/60 max-w-3xl leading-relaxed">
              The public catalog is built from current approved product packages—not historical Stripe products. Checkout remains disabled until pricing and customer fulfillment are configured for each current offer.
            </p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-6 rounded-2xl bg-[#0D1120] border border-white/10"><Layers3 className="h-6 w-6 text-[#7C3AED]" /><h2 className="mt-4 text-xl font-bold">Drive-first catalog</h2><p className="mt-2 text-white/55 text-sm">Current product packages, design assets, and customer downloads determine what appears here.</p></div>
            <div className="p-6 rounded-2xl bg-[#0D1120] border border-white/10"><ShieldCheck className="h-6 w-6 text-[#14B8A6]" /><h2 className="mt-4 text-xl font-bold">Safe checkout gating</h2><p className="mt-2 text-white/55 text-sm">No legacy Stripe match, placeholder price, or internal-only delivery path can silently enable checkout.</p></div>
            <div className="p-6 rounded-2xl bg-[#0D1120] border border-white/10"><Gift className="h-6 w-6 text-[#F59E0B]" /><h2 className="mt-4 text-xl font-bold">Verified free resources</h2><p className="mt-2 text-white/55 text-sm">Only finalized files actually present in the approved Free Resources inventory are shown.</p></div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="flex items-end justify-between gap-4 mb-8">
            <div><p className="text-[#14B8A6] text-sm font-bold uppercase tracking-wider">Current approved catalog</p><h2 className="text-3xl font-black mt-2">{MARKETPLACE_PRODUCTS.length} verified paid products</h2></div>
            <div className="text-sm text-white/45 hidden sm:block">{categories.length} active categories</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {MARKETPLACE_PRODUCTS.map((product) => (
              <article key={product.slug} className="rounded-2xl bg-[#0D1120] border border-white/10 p-6 flex flex-col">
                <div className="flex items-start justify-between gap-3">
                  <span className="text-xs font-semibold text-[#BDA4FF] bg-[#7C3AED]/10 border border-[#7C3AED]/20 px-3 py-1 rounded-full">{product.category}</span>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full border text-white/60 border-white/10 bg-white/5">{billingLabel(product.billingModel)}</span>
                </div>
                <h3 className="text-xl font-bold mt-5">{product.name}</h3>
                <p className="text-xs text-white/35 mt-1">{product.collection}</p>
                <p className="text-white/55 text-sm leading-relaxed mt-3 flex-1">{product.shortDescription}</p>
                <div className="mt-5 flex items-center justify-between gap-4"><span className="text-xl font-black text-[#14B8A6]">{product.priceDisplay}</span><span className="text-xs text-[#F59E0B] text-right">Checkout configuration required</span></div>
                <a href={`/marketplace/${product.slug}`} className="mt-6 inline-flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl border border-white/10 hover:bg-white/5 font-semibold transition-colors">View Product <ArrowRight className="h-4 w-4" /></a>
              </article>
            ))}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
          <p className="text-[#7C3AED] text-sm font-bold uppercase tracking-wider">Professional Systems™</p>
          <h2 className="text-3xl font-black mt-2">Current approved systems</h2>
          <p className="text-white/55 mt-3 max-w-3xl">Only Professional Systems with confirmed current customer packages are displayed. Products still in production remain out of the public catalog until their final package and marketplace assets are confirmed.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-7">
            {professionalSystems.map((product) => <a href={`/marketplace/${product.slug}`} key={product.slug} className="p-5 rounded-xl border border-white/10 bg-[#0D1120] hover:border-[#7C3AED]/40 transition-colors"><span className="font-semibold">{product.name}</span></a>)}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div><p className="text-[#F59E0B] text-sm font-bold uppercase tracking-wider">Free Resources</p><h2 className="text-3xl font-black mt-2">{APPROVED_FREE_RESOURCES.length} of {FREE_RESOURCE_EXPECTED_COUNT} finalized files verified</h2></div>
            <a href="/resources" className="text-sm font-semibold text-[#14B8A6] hover:underline">Browse resource center</a>
          </div>
          <p className="mt-3 text-sm text-white/45 max-w-3xl">The approved library is expected to contain 13 resources, but only finalized source files confirmed in Drive are listed here. Missing resources are not being invented or substituted.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-7">
            {APPROVED_FREE_RESOURCES.map((resource) => <article key={resource.slug} className="p-6 rounded-2xl bg-[#0D1120] border border-white/10"><span className="text-xs text-white/45">{resource.format}</span><h3 className="text-lg font-bold mt-2">{resource.name}</h3><p className="text-sm text-white/50 mt-2">{resource.category}</p><p className="mt-5 text-xs text-[#14B8A6]">Current approved source verified; public delivery configuration is still required.</p></article>)}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
