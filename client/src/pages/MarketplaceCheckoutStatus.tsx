import { CheckCircle2, CircleX, Mail, ArrowLeft } from "lucide-react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

function Shell({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-[#0B0F1A] text-white"><NavBar /><main className="pt-32 pb-20"><div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div></main><Footer /></div>;
}

export function MarketplaceSuccess() {
  return <Shell><div className="p-8 sm:p-10 rounded-3xl bg-[#0D1120] border border-white/10 text-center"><CheckCircle2 className="h-14 w-14 text-[#14B8A6] mx-auto" /><h1 className="mt-6 text-3xl sm:text-4xl font-black">Purchase received</h1><p className="mt-4 text-white/60 leading-relaxed">Your Stripe checkout was completed. Business Bloom will send confirmation and the appropriate delivery, access, or onboarding information by email.</p><div className="mt-7 p-5 rounded-2xl bg-[#14B8A6]/8 border border-[#14B8A6]/20 text-left flex gap-3"><Mail className="h-5 w-5 text-[#14B8A6] shrink-0 mt-0.5" /><p className="text-sm text-white/70">Check the email address used at checkout. If your product requires a download, login, course access, membership access, or next step, those instructions will arrive through the approved fulfillment flow.</p></div><p className="mt-6 text-sm text-white/45">Need help? Use the Business Bloom support path and include the email address used at checkout.</p><div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center"><a href="/marketplace" className="px-5 py-3 rounded-xl bg-[#7C3AED] font-bold">Return to Marketplace</a><a href="/get-started" className="px-5 py-3 rounded-xl border border-white/10 font-bold hover:bg-white/5">Contact Business Bloom</a></div></div></Shell>;
}

export function MarketplaceCancel() {
  return <Shell><div className="p-8 sm:p-10 rounded-3xl bg-[#0D1120] border border-white/10 text-center"><CircleX className="h-14 w-14 text-white/55 mx-auto" /><h1 className="mt-6 text-3xl sm:text-4xl font-black">Purchase not completed</h1><p className="mt-4 text-white/60 leading-relaxed">Your checkout was canceled and no Marketplace purchase was completed. You can return to the product or continue browsing when you’re ready.</p><div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center"><a href="/marketplace" className="px-5 py-3 rounded-xl bg-[#7C3AED] font-bold inline-flex items-center justify-center gap-2"><ArrowLeft className="h-4 w-4" /> Return to Marketplace</a><a href="/get-started" className="px-5 py-3 rounded-xl border border-white/10 font-bold hover:bg-white/5">Ask a question</a></div></div></Shell>;
}
