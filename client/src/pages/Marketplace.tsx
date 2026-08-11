import { ArrowRight, CheckCircle2, Gift, Layers3, ShieldCheck, ShoppingBag } from "lucide-react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { APPROVED_FREE_RESOURCES, MARKETPLACE_PRODUCTS, PROFESSIONAL_SYSTEMS } from "../../../shared/marketplaceProducts";

export default function Marketplace() {
  const categories = Array.from(new Set(MARKETPLACE_PRODUCTS.map((product) => product.category)));

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
              Practical systems, tools, resources, and services for growing businesses.
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-white/60 max-w-3xl leading-relaxed">
              Browse verified Business Bloom offers in one place. Products that still need delivery, access, or onboarding configuration are clearly marked before checkout is enabled.
            </p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-6 rounded-2xl bg-[#0D1120] border border-white/10"><Layers3 className="h-6 w-6 text-[#7C3AED]" /><h2 className="mt-4 text-xl font-bold">Centralized product data</h2><p className="mt-2 text-white/55 text-sm">Listings, detail pages, Stripe mapping, and fulfillment readiness use one product configuration.</p></div>
            <div className="p-6 rounded-2xl bg-[#0D1120] border border-white/10"><ShieldCheck className="h-6 w-6 text-[#14B8A6]" /><h2 className="mt-4 text-xl font-bold">Safe checkout readiness</h2><p className="mt-2 text-white/55 text-sm">Missing customer destinations stay visible as launch blockers instead of being replaced with fake URLs.</p></div>
            <div className="p-6 rounded-2xl bg-[#0D1120] border border-white/10"><Gift className="h-6 w-6 text-[#F59E0B]" /><h2 className="mt-4 text-xl font-bold">Approved free resources</h2><p className="mt-2 text-white/55 text-sm">Free resources are sourced from the approved Business Bloom inventory rather than a generic fallback list.</p></div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="flex items-end justify-between gap-4 mb-8"><div><p className="text-[#14B8A6] text-sm font-bold uppercase tracking-wider">Marketplace catalog</p><h2 className="text-3xl font-black mt-2">Verified offers</h2></div><div className="text-sm text-white/45 hidden sm:block">{categories.length} active categories</div></div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {MARKETPLACE_PRODUCTS.map((product) => (
              <article key={product.slug} className="rounded-2xl bg-[#0D1120] border border-white/10 p-6 flex flex-col">
                <div className="flex items-start justify-between gap-3">
                  <span className="text-xs font-semibold text-[#BDA4FF] bg-[#7C3AED]/10 border border-[#7C3AED]/20 px-3 py-1 rounded-full">{product.category}</span>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${product.recurring ? "text-[#14B8A6] border-[#14B8A6]/30 bg-[#14B8A6]/10" : "text-white/60 border-white/10 bg-white/5"}`}>{product.recurring ? "Recurring" : "One-time"}</span>
                </div>
                <h3 className="text-xl font-bold mt-5">{product.name}</h3>
                <p className="text-white/55 text-sm leading-relaxed mt-2 flex-1">{product.shortDescription}</p>
                <div className="mt-5 flex items-center justify-between"><span className="text-2xl font-black text-[#14B8A6]">{product.priceDisplay}</span><span className="text-xs text-[#F59E0B] text-right max-w-[145px]">{product.fulfillmentStatus === "READY" ? "Fulfillment ready" : "Fulfillment setup required"}</span></div>
                <a href={`/marketplace/${product.slug}`} className="mt-6 inline-flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl border border-white/10 hover:bg-white/5 font-semibold transition-colors">View Product <ArrowRight className="h-4 w-4" /></a>
              </article>
            ))}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
          <p className="text-[#7C3AED] text-sm font-bold uppercase tracking-wider">Professional Systems™</p>
          <h2 className="text-3xl font-black mt-2">Coordinated system collection</h2>
          <p className="text-white/55 mt-3 max-w-3xl">The collection identity is preserved while checkout remains gated until each system's existing assets, Stripe mapping, and customer fulfillment destinations are verified.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-7">{PROFESSIONAL_SYSTEMS.map((name) => <div key={name} className="p-5 rounded-xl border border-white/10 bg-[#0D1120] flex items-center gap-3"><CheckCircle2 className="h-5 w-5 text-[#14B8A6] shrink-0" /><span className="font-semibold">{name}</span></div>)}</div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"><div><p className="text-[#F59E0B] text-sm font-bold uppercase tracking-wider">Free Resources</p><h2 className="text-3xl font-black mt-2">Approved inventory located</h2></div><a href="/resources" className="text-sm font-semibold text-[#14B8A6] hover:underline">Browse resource center</a></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-7">{APPROVED_FREE_RESOURCES.map((resource) => <article key={resource.slug} className="p-6 rounded-2xl bg-[#0D1120] border border-white/10"><span className="text-xs text-white/45">{resource.format}</span><h3 className="text-lg font-bold mt-2">{resource.name}</h3><p className="text-sm text-white/50 mt-2">{resource.category}</p><p className="mt-5 text-xs text-[#14B8A6]">Approved internal source verified; public delivery destination still requires launch validation.</p></article>)}</div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
