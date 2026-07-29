import { BookOpen, Video, FileText, ArrowRight, Lightbulb } from "lucide-react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const featured = [
  { title: "Business Automation Starter Guide", description: "A planned guide to practical, owner-supervised automation.", type: "Guide", interest: "business-automation-guide", cta: "Request the Guide" },
  { title: "Five-Day Business Growth Email Challenge", description: "A planned five-day series. Automated enrollment and email delivery are not yet connected.", type: "Email Series", interest: "5-day-email-challenge", cta: "Notify Me When Available" },
  { title: "Business Bloom Engine Demo", description: "A planned walkthrough of the Engine workspace. A verified demo video is not currently available here.", type: "Video Demo", interest: "business-bloom-engine-demo", cta: "Request Demo Updates" },
];
const categories = [
  { icon: BookOpen, title: "Guides and Playbooks", text: "Planned step-by-step resources for launching, marketing, operations, and growth." },
  { icon: Video, title: "Training Videos", text: "Planned screen recordings and tutorials; videos will be labeled available only after production." },
  { icon: FileText, title: "Templates and Checklists", text: "Planned reusable starting points for owner review and customization." },
];

export default function Resources() {
  return <div className="min-h-screen bg-[#0B0F1A] text-white"><NavBar /><section className="pt-32 pb-16 text-center px-4"><Lightbulb className="h-12 w-12 text-[#14B8A6] mx-auto mb-5"/><p className="text-[#14B8A6] font-semibold mb-4">RESOURCE INTEREST CENTER</p><h1 className="text-4xl sm:text-6xl font-black mb-6">Choose the Resource You Want to Hear About</h1><p className="text-white/60 text-xl max-w-3xl mx-auto">Resources below are planned unless specifically marked available. Selecting one preserves your interest through the Get Started form.</p></section><section className="max-w-6xl mx-auto px-4 pb-16 grid md:grid-cols-3 gap-6">{featured.map(item=><article key={item.title} className="p-6 rounded-2xl bg-[#0D1120] border border-[#7C3AED]/20"><div className="flex justify-between gap-3 mb-4"><span className="text-[#7C3AED] text-xs font-semibold">{item.type}</span><span className="text-white/40 text-xs">Coming Soon</span></div><h2 className="text-xl font-bold mb-3">{item.title}</h2><p className="text-white/50 text-sm mb-5">{item.description}</p><a href={`/get-started?interest=${item.interest}`} className="inline-flex items-center gap-2 text-[#14B8A6] font-semibold">{item.cta}<ArrowRight className="h-4 w-4"/></a></article>)}</section><section className="py-16 border-t border-white/5"><div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-6">{categories.map(c=><article key={c.title} className="p-6 rounded-2xl bg-[#0D1120] border border-white/10"><c.icon className="h-7 w-7 text-[#14B8A6] mb-4"/><h2 className="text-xl font-bold mb-2">{c.title}</h2><p className="text-white/50 text-sm">{c.text}</p></article>)}</div></section><section className="py-16 text-center border-t border-white/5"><a href="/free-store" className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-[#7C3AED] font-bold">Browse the Free Store<ArrowRight className="h-4 w-4"/></a></section><Footer /></div>;
}
