import { HelpCircle, Mail, ShoppingBag, KeyRound } from "lucide-react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const supportAreas = [
  { icon: ShoppingBag, title: "Purchase help", text: "Include the product name and the email address used at checkout so the Business Bloom team can locate the purchase." },
  { icon: KeyRound, title: "Download or access problems", text: "Tell us what product you purchased, what step you reached, and the exact error or missing access issue you see." },
  { icon: HelpCircle, title: "Product questions", text: "Use the product name and describe what you are trying to accomplish so support can direct you to the appropriate resource or next step." },
];

export default function Support() {
  return <div className="min-h-screen bg-[#0B0F1A] text-white"><NavBar /><main className="pt-28 pb-20"><section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"><p className="text-[#14B8A6] text-sm font-bold uppercase tracking-wider">Business Bloom Support</p><h1 className="mt-4 text-4xl sm:text-5xl font-black">Clear help for purchases, delivery, and product access.</h1><p className="mt-6 text-lg text-white/60 leading-relaxed max-w-3xl">If something is unclear after a purchase, use the Business Bloom support path and provide enough information for the team to identify the order and problem quickly.</p><div className="grid md:grid-cols-3 gap-6 mt-12">{supportAreas.map((item) => <article key={item.title} className="p-6 rounded-2xl bg-[#0D1120] border border-white/10"><item.icon className="h-6 w-6 text-[#7C3AED]" /><h2 className="mt-4 text-lg font-bold">{item.title}</h2><p className="mt-3 text-sm text-white/55 leading-relaxed">{item.text}</p></article>)}</div><div className="mt-12 p-7 rounded-2xl border border-white/10 bg-[#0D1120]"><div className="flex items-start gap-4"><Mail className="h-6 w-6 text-[#14B8A6] shrink-0" /><div><h2 className="text-xl font-bold">Contact Business Bloom</h2><p className="mt-2 text-white/60">Use the existing Business Bloom contact/get-started channel for support. Include your checkout email, product name, and a concise description of the issue. Do not send passwords, full card numbers, API keys, or other secrets.</p><a href="/get-started" className="mt-5 inline-flex px-5 py-3 rounded-xl bg-[#7C3AED] font-bold">Contact Support</a></div></div></div></section></main><Footer /></div>;
}
