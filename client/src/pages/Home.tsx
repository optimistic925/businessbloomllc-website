import { ArrowRight, Bot, BriefcaseBusiness, CheckCircle2, Gift, Layers3, Rocket, ShoppingBag } from "lucide-react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { MARKETPLACE_PRODUCTS } from "../../../shared/marketplaceProducts";
import { getMarketplaceCommercialConfig } from "../../../shared/marketplaceCommercialConfig";

const solutions = [
  { icon: BriefcaseBusiness, title: "Professional Systems", text: "Practical operating systems for customer service, HR, marketing, operations, and automation.", href: "/marketplace" },
  { icon: Bot, title: "AI & Automation", text: "Structured tools for identifying, planning, and implementing useful automation with human review.", href: "/marketplace/business-bloom-ai-automation-bundles" },
  { icon: Rocket, title: "Business Startup", text: "Brand, foundation, website, and launch systems for entrepreneurs building the next stage of their business.", href: "/marketplace" },
  { icon: Layers3, title: "Marketing & Growth", text: "Marketing, content, and social media systems designed for repeatable execution.", href: "/marketplace" },
  { icon: ShoppingBag, title: "Digital Business Tools", text: "Decision support and website systems that help owners organize important business work.", href: "/marketplace" },
  { icon: Gift, title: "Free Business Resources", text: "Useful diagnostic and planning tools that help you identify the right next step before buying anything.", href: "/resources" },
];

const featuredSlugs = [
  "business-bloom-customer-service-system",
  "business-bloom-operations-system",
  "business-bloom-ai-automation-bundles",
];

export default function Home() {
  const featured = featuredSlugs.map((slug) => MARKETPLACE_PRODUCTS.find((product) => product.slug === slug)).filter(Boolean);
  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white overflow-x-hidden">
      <NavBar />
      <main>
        <section className="pt-32 pb-20 border-b border-white/5">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-flex px-4 py-2 rounded-full border border-[#7C3AED]/30 bg-[#7C3AED]/10 text-[#BDA4FF] text-sm font-semibold">BUSINESS SYSTEMS FOR ENTREPRENEURS & SMALL BUSINESSES</span>
            <h1 className="mt-7 text-4xl sm:text-5xl lg:text-7xl font-black leading-tight" style={{ fontFamily: "var(--font-display)" }}>Start. Systemize. Automate. <span className="text-[#14B8A6]">Grow.</span></h1>
            <p className="mt-6 text-lg sm:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">Business Bloom gives entrepreneurs and small businesses practical systems, editable tools, guided implementation resources, and AI-assisted workflows for building more organized operations.</p>
            <div className="mt-9 flex flex-col sm:flex-row justify-center gap-4"><a href="/marketplace" className="px-8 py-4 rounded-xl bg-[#7C3AED] font-bold inline-flex items-center justify-center gap-2">Shop Marketplace <ArrowRight className="h-5 w-5" /></a><a href="/solutions" className="px-8 py-4 rounded-xl border border-white/10 font-bold hover:bg-white/5">Explore Solutions</a></div>
          </div>
        </section>

        <section className="py-20"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div className="text-center max-w-3xl mx-auto"><p className="text-[#14B8A6] text-sm font-bold uppercase tracking-wider">Business Bloom Solutions</p><h2 className="mt-3 text-3xl sm:text-4xl font-black">Choose the business problem you want to solve</h2></div><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">{solutions.map((item) => <a key={item.title} href={item.href} className="p-6 rounded-2xl bg-[#0D1120] border border-white/10 hover:border-[#7C3AED]/40"><item.icon className="h-6 w-6 text-[#7C3AED]" /><h3 className="mt-4 text-lg font-bold">{item.title}</h3><p className="mt-2 text-sm text-white/55 leading-relaxed">{item.text}</p></a>)}</div></div></section>

        <section className="py-20 border-y border-white/5"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"><div><p className="text-[#7C3AED] text-sm font-bold uppercase tracking-wider">Featured Professional Systems</p><h2 className="mt-2 text-3xl font-black">Practical systems built for implementation</h2></div><a href="/marketplace" className="text-[#14B8A6] font-semibold">View all products</a></div><div className="grid md:grid-cols-3 gap-6 mt-8">{featured.map((product) => { const commercial = getMarketplaceCommercialConfig(product!.slug); return <article key={product!.slug} className="p-6 rounded-2xl bg-[#0D1120] border border-white/10"><h3 className="text-xl font-bold">{product!.name}</h3><p className="mt-3 text-sm text-white/55 leading-relaxed min-h-20">{product!.shortDescription}</p><p className="mt-5 text-2xl font-black text-[#14B8A6]">{commercial?.priceDisplay ?? "Pricing available soon"}</p><a href={`/marketplace/${product!.slug}`} className="mt-5 inline-flex items-center gap-2 font-semibold">View Product <ArrowRight className="h-4 w-4" /></a></article>; })}</div></div></section>

        <section className="py-20"><div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center"><div><p className="text-[#14B8A6] text-sm font-bold uppercase tracking-wider">Why Business Bloom</p><h2 className="mt-3 text-3xl sm:text-4xl font-black">Built to turn business ideas into usable operating tools</h2><p className="mt-5 text-white/60 leading-relaxed">Business Bloom products combine guidance with working materials so customers can move from understanding a problem to applying a repeatable process.</p></div><ul className="space-y-4">{["Practical systems instead of isolated downloads","Editable tools and structured implementation materials","Dashboards, prompts, templates, and quick-reference resources where appropriate","Clear professional-review boundaries for sensitive business decisions"].map((item) => <li key={item} className="flex gap-3 text-white/75"><CheckCircle2 className="h-5 w-5 text-[#14B8A6] shrink-0" />{item}</li>)}</ul></div></section>

        <section className="py-20 border-y border-white/5"><div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center"><p className="text-[#7C3AED] text-sm font-bold uppercase tracking-wider">How It Works</p><h2 className="mt-3 text-3xl font-black">Choose a solution → get the tools → implement the system → automate where appropriate</h2></div></section>

        <section className="py-20"><div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center"><Gift className="h-10 w-10 text-[#F59E0B] mx-auto" /><h2 className="mt-5 text-3xl font-black">Start with a Free Resource</h2><p className="mt-4 text-white/60 max-w-2xl mx-auto">Use a Business Bloom diagnostic, checklist, or planning resource to clarify the problem before deciding what system you need next.</p><a href="/resources" className="mt-7 inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 font-bold">Browse Free Resources <ArrowRight className="h-4 w-4" /></a></div></section>

        <section className="py-20 border-t border-white/5"><div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"><h2 className="text-3xl sm:text-4xl font-black">Build the next system your business needs.</h2><p className="mt-4 text-white/60">Explore the current Business Bloom Marketplace and choose the product that matches your next operational priority.</p><a href="/marketplace" className="mt-8 inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#14B8A6] font-bold">Shop Business Bloom Marketplace <ArrowRight className="h-5 w-5" /></a></div></section>
      </main>
      <Footer />
    </div>
  );
}
