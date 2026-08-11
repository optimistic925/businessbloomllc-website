import { ArrowRight, Bot, BriefcaseBusiness, CheckCircle2, Gift, Layers3, Rocket, ShieldCheck, ShoppingBag, Sparkles } from "lucide-react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { ALL_PUBLIC_FREE_RESOURCES } from "../../../shared/freeResources";
import { PUBLIC_MARKETPLACE_PRODUCTS } from "../../../shared/marketplacePublicCatalog";
import { getMarketplaceCommercialConfig } from "../../../shared/marketplaceCommercialConfig";

const solutions = [
  { icon: Rocket, title: "Start Your Business", text: "Organize business foundations, branding, launch planning, and your digital presence.", href: "/solutions#start-your-business" },
  { icon: BriefcaseBusiness, title: "Systemize Operations", text: "Create repeatable customer service, HR, marketing, and operations workflows.", href: "/solutions#systemize-operations" },
  { icon: Bot, title: "Automate Work", text: "Identify useful automation opportunities while keeping the right human review points.", href: "/solutions#automate-work" },
  { icon: Layers3, title: "Market & Grow", text: "Build structured marketing, content, social-media, and growth execution.", href: "/solutions#market-and-grow" },
  { icon: ShoppingBag, title: "Build Your Digital Presence", text: "Plan and improve the website and digital systems customers use to find and buy from you.", href: "/solutions#digital-presence" },
  { icon: Gift, title: "Start with a Free Resource", text: "Use a quick diagnostic, calculator, scorecard, or planning tool before choosing a paid system.", href: "/resources" },
];

const featuredSlugs = [
  "business-bloom-customer-service-system",
  "business-bloom-operations-system",
  "business-bloom-ai-automation-bundles",
];

const marketplaceCollections = [
  { title: "Professional Systems", description: "Customer service, HR, marketing, operations, automation, and the coordinated complete collection.", href: "/marketplace#professional-systems" },
  { title: "Startup & Foundation", description: "Branding, LLC foundation, and launch-planning systems for building with structure.", href: "/marketplace#startup" },
  { title: "Marketing", description: "Content and social-media systems designed for repeatable execution.", href: "/marketplace#marketing" },
  { title: "Digital & Executive", description: "Website and executive decision-support systems for owner-led business execution.", href: "/marketplace#digital-business" },
];

export default function Home() {
  const featured = featuredSlugs.map((slug) => PUBLIC_MARKETPLACE_PRODUCTS.find((product) => product.slug === slug)).filter(Boolean);
  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white overflow-x-hidden">
      <NavBar />
      <main>
        <section className="pt-32 pb-20 border-b border-white/5">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-flex px-4 py-2 rounded-full border border-[#7C3AED]/30 bg-[#7C3AED]/10 text-[#BDA4FF] text-sm font-semibold">BUSINESS SYSTEMS FOR ENTREPRENEURS & SMALL BUSINESSES</span>
            <h1 className="mt-7 text-4xl sm:text-5xl lg:text-7xl font-black leading-tight" style={{ fontFamily: "var(--font-display)" }}>Start. Systemize. Automate. <span className="text-[#14B8A6]">Grow.</span></h1>
            <p className="mt-6 text-lg sm:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">Business Bloom gives entrepreneurs and small businesses practical systems, editable tools, guided implementation resources, and AI-assisted workflows for building more organized businesses.</p>
            <div className="mt-9 flex flex-col sm:flex-row justify-center gap-4"><a href="/marketplace" className="px-8 py-4 rounded-xl bg-[#7C3AED] font-bold inline-flex items-center justify-center gap-2">Shop Marketplace <ArrowRight className="h-5 w-5" /></a><a href="/solutions" className="px-8 py-4 rounded-xl border border-white/10 font-bold hover:bg-white/5">Explore Solutions</a></div>
          </div>
        </section>

        <section className="py-20"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div className="text-center max-w-3xl mx-auto"><p className="text-[#14B8A6] text-sm font-bold uppercase tracking-wider">Business Bloom Solutions</p><h2 className="mt-3 text-3xl sm:text-4xl font-black">Choose the business problem you want to solve</h2><p className="mt-4 text-white/55">Start with the outcome—not a legacy package name. Business Bloom connects each problem to a current approved system or Free Resource.</p></div><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">{solutions.map((item) => <a key={item.title} href={item.href} className="p-6 rounded-2xl bg-[#0D1120] border border-white/10 hover:border-[#7C3AED]/40"><item.icon className="h-6 w-6 text-[#7C3AED]" /><h3 className="mt-4 text-lg font-bold">{item.title}</h3><p className="mt-2 text-sm text-white/55 leading-relaxed">{item.text}</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#14B8A6]">Explore path <ArrowRight className="h-4 w-4" /></span></a>)}</div></div></section>

        <section className="py-20 border-y border-white/5"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"><div><p className="text-[#BDA4FF] text-sm font-bold uppercase tracking-wider">Featured Professional Systems</p><h2 className="mt-2 text-3xl font-black">Practical systems built for implementation</h2></div><a href="/marketplace#professional-systems" className="text-[#14B8A6] font-semibold">View Professional Systems</a></div><div className="grid md:grid-cols-3 gap-6 mt-8">{featured.map((product) => { const commercial = getMarketplaceCommercialConfig(product!.slug); return <article key={product!.slug} className="rounded-2xl overflow-hidden bg-[#0D1120] border border-white/10 flex flex-col"><div className="aspect-[16/7] bg-gradient-to-br from-[#7C3AED]/35 via-[#141A2D] to-[#14B8A6]/20 p-6 flex items-end"><Sparkles className="h-7 w-7 text-[#BDA4FF]" /></div><div className="p-6 flex flex-col flex-1"><h3 className="text-xl font-bold">{product!.name}</h3><p className="mt-3 text-sm text-white/55 leading-relaxed flex-1">{product!.shortDescription}</p><p className="mt-5 text-2xl font-black text-[#14B8A6]">{commercial?.priceDisplay ?? "Pricing available soon"}</p><a href={`/marketplace/${product!.slug}`} className="mt-5 inline-flex items-center gap-2 font-semibold">View Product <ArrowRight className="h-4 w-4" /></a></div></article>; })}</div></div></section>

        <section className="py-20"><div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"><div className="text-center max-w-3xl mx-auto"><p className="text-[#14B8A6] text-sm font-bold uppercase tracking-wider">How Business Bloom Works</p><h2 className="mt-3 text-3xl sm:text-4xl font-black">Choose → purchase, download, or access → implement → grow</h2></div><div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">{[["1","Choose","Start with a business problem or current priority."],["2","Get the right system","Use the Marketplace or a Free Resource to choose the current approved tool."],["3","Implement","Follow the included instructions, editable resources, and workflows."],["4","Grow","Use the system repeatedly and automate appropriate work with human review."]].map(([n,title,text]) => <div key={n} className="p-6 rounded-2xl border border-white/10 bg-[#0D1120]"><span className="text-sm font-black text-[#7C3AED]">{n}</span><h3 className="mt-3 font-bold">{title}</h3><p className="mt-2 text-sm text-white/55 leading-relaxed">{text}</p></div>)}</div></div></section>

        <section className="py-20 border-y border-white/5"><div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center"><div><p className="text-[#14B8A6] text-sm font-bold uppercase tracking-wider">Why Business Bloom</p><h2 className="mt-3 text-3xl sm:text-4xl font-black">Built to turn business ideas into usable operating tools</h2><p className="mt-5 text-white/60 leading-relaxed">Business Bloom products combine guidance with working materials so customers can move from understanding a problem to applying a repeatable process.</p></div><ul className="space-y-4">{["Practical systems instead of isolated downloads","Editable tools and structured implementation materials","Dashboards, prompts, templates, and quick-reference resources where appropriate","Clear professional-review boundaries for sensitive business decisions"].map((item) => <li key={item} className="flex gap-3 text-white/75"><CheckCircle2 className="h-5 w-5 text-[#14B8A6] shrink-0" />{item}</li>)}</ul></div></section>

        <section className="py-20"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"><div><p className="text-[#BDA4FF] text-sm font-bold uppercase tracking-wider">Marketplace Collections</p><h2 className="mt-2 text-3xl font-black">Shop the current catalog by need</h2></div><a href="/marketplace" className="text-sm font-semibold text-[#14B8A6]">View all {PUBLIC_MARKETPLACE_PRODUCTS.length} products</a></div><div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">{marketplaceCollections.map((collection) => <a key={collection.title} href={collection.href} className="p-6 rounded-2xl border border-white/10 bg-[#0D1120] hover:border-[#7C3AED]/40"><h3 className="font-bold">{collection.title}</h3><p className="mt-3 text-sm text-white/50 leading-relaxed">{collection.description}</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#14B8A6]">Browse collection <ArrowRight className="h-4 w-4" /></span></a>)}</div></div></section>

        <section className="py-20 border-y border-white/5"><div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"><div className="grid lg:grid-cols-[1.2fr_1fr] gap-10 items-center"><div><Gift className="h-9 w-9 text-[#F59E0B]" /><h2 className="mt-5 text-3xl sm:text-4xl font-black">Start with a Free Resource</h2><p className="mt-4 text-white/60 max-w-2xl">Use a Business Bloom diagnostic, checklist, calculator, scorecard, or planning tool to get a focused quick win and identify the right paid system when you need deeper support.</p><p className="mt-4 text-sm text-white/45">{ALL_PUBLIC_FREE_RESOURCES.length} finalized resources are currently available. Incomplete resource slots are not shown as placeholders.</p><a href="/resources" className="mt-7 inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 font-bold">Browse Free Resources <ArrowRight className="h-4 w-4" /></a></div><div className="grid grid-cols-2 gap-4">{ALL_PUBLIC_FREE_RESOURCES.slice(0,4).map((resource) => <div key={resource.slug} className="min-h-32 p-5 rounded-2xl border border-white/10 bg-gradient-to-br from-[#F59E0B]/10 via-[#0D1120] to-[#14B8A6]/10"><span className="text-xs text-white/40">{resource.category}</span><p className="mt-3 font-bold text-sm">{resource.name}</p><p className="mt-2 text-[#14B8A6] font-black">FREE</p></div>)}</div></div></div></section>

        <section className="py-20"><div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"><div className="text-center max-w-3xl mx-auto"><ShieldCheck className="h-9 w-9 text-[#14B8A6] mx-auto" /><p className="mt-5 text-[#14B8A6] text-sm font-bold uppercase tracking-wider">Trust & credibility</p><h2 className="mt-3 text-3xl sm:text-4xl font-black">Clear products. Clear boundaries. Practical implementation.</h2><p className="mt-4 text-white/60 leading-relaxed">Business Bloom is built around organized business systems, customer-usable tools, secure commerce architecture, and transparent professional-review boundaries. We do not rely on invented customer counts, fake testimonials, or unsupported performance claims.</p></div></div></section>

        <section className="py-20 border-t border-white/5"><div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"><h2 className="text-3xl sm:text-4xl font-black">Build the next system your business needs.</h2><p className="mt-4 text-white/60">Explore the current Business Bloom Marketplace or start with a Free Resource if you want to diagnose the problem first.</p><div className="mt-8 flex flex-col sm:flex-row justify-center gap-4"><a href="/marketplace" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#14B8A6] font-bold">Shop Marketplace <ArrowRight className="h-5 w-5" /></a><a href="/resources" className="inline-flex items-center justify-center px-8 py-4 rounded-xl border border-white/10 font-bold">Browse Free Resources</a></div></div></section>
      </main>
      <Footer />
    </div>
  );
}
