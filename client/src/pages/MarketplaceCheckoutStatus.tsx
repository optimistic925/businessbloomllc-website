import { useEffect, useState } from "react";
import { CheckCircle2, CircleX, Mail, ArrowLeft, Loader2, ShieldAlert } from "lucide-react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

function Shell({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-[#0B0F1A] text-white"><NavBar /><main className="pt-32 pb-20"><div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div></main><Footer /></div>;
}

type SessionState = "checking" | "confirmed" | "unconfirmed";

export function MarketplaceSuccess() {
  const [state, setState] = useState<SessionState>("checking");
  const [productName, setProductName] = useState<string | null>(null);

  useEffect(() => {
    const sessionId = new URLSearchParams(window.location.search).get("session_id");
    if (!sessionId) {
      setState("unconfirmed");
      return;
    }

    fetch(`/api/checkout-session/${encodeURIComponent(sessionId)}`)
      .then(async (response) => {
        if (!response.ok) throw new Error("Unable to verify checkout");
        return response.json();
      })
      .then((session) => {
        setProductName(session.productName || null);
        setState(session.status === "complete" && session.paymentStatus === "paid" ? "confirmed" : "unconfirmed");
      })
      .catch(() => setState("unconfirmed"));
  }, []);

  if (state === "checking") {
    return <Shell><div className="p-8 sm:p-10 rounded-3xl bg-[#0D1120] border border-white/10 text-center"><Loader2 className="h-12 w-12 text-[#14B8A6] mx-auto animate-spin" /><h1 className="mt-6 text-3xl font-black">Confirming your purchase</h1><p className="mt-4 text-white/60">We’re verifying the completed Stripe Checkout Session before showing delivery guidance.</p></div></Shell>;
  }

  if (state === "unconfirmed") {
    return <Shell><div className="p-8 sm:p-10 rounded-3xl bg-[#0D1120] border border-white/10 text-center"><ShieldAlert className="h-14 w-14 text-[#F59E0B] mx-auto" /><h1 className="mt-6 text-3xl sm:text-4xl font-black">We couldn’t verify this purchase</h1><p className="mt-4 text-white/60 leading-relaxed">This page does not confirm a completed payment on its own. If you believe you completed checkout, check your Stripe receipt and contact Business Bloom Support with the email address used at checkout.</p><div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center"><a href="/marketplace" className="px-5 py-3 rounded-xl bg-[#7C3AED] font-bold">Return to Marketplace</a><a href="/support" className="px-5 py-3 rounded-xl border border-white/10 font-bold hover:bg-white/5">Contact Support</a></div></div></Shell>;
  }

  return <Shell><div className="p-8 sm:p-10 rounded-3xl bg-[#0D1120] border border-white/10 text-center"><CheckCircle2 className="h-14 w-14 text-[#14B8A6] mx-auto" /><h1 className="mt-6 text-3xl sm:text-4xl font-black">Purchase confirmed</h1>{productName && <p className="mt-3 text-[#BDA4FF] font-semibold">{productName}</p>}<p className="mt-4 text-white/60 leading-relaxed">Your Stripe checkout is confirmed. Business Bloom will send the appropriate delivery, access, or onboarding information to the email used at checkout.</p><div className="mt-7 p-5 rounded-2xl bg-[#14B8A6]/8 border border-[#14B8A6]/20 text-left flex gap-3"><Mail className="h-5 w-5 text-[#14B8A6] shrink-0 mt-0.5" /><div><p className="font-semibold">Check your email</p><p className="text-sm text-white/70 mt-1">Your confirmation arrives first. Product-specific download, onboarding, or access instructions follow only when that product requires them.</p></div></div><div className="mt-6 text-left p-5 rounded-2xl border border-white/10"><p className="font-semibold">What to do next</p><p className="text-sm text-white/55 mt-2">Save your confirmation, follow the delivery instructions you receive, and contact Support if an expected message or access step does not arrive.</p></div><div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center"><a href="/marketplace" className="px-5 py-3 rounded-xl bg-[#7C3AED] font-bold">Return to Marketplace</a><a href="/support" className="px-5 py-3 rounded-xl border border-white/10 font-bold hover:bg-white/5">Business Bloom Support</a></div></div></Shell>;
}

export function MarketplaceCancel() {
  const productSlug = new URLSearchParams(window.location.search).get("product");
  const productHref = productSlug ? `/marketplace/${encodeURIComponent(productSlug)}` : "/marketplace";
  return <Shell><div className="p-8 sm:p-10 rounded-3xl bg-[#0D1120] border border-white/10 text-center"><CircleX className="h-14 w-14 text-white/55 mx-auto" /><h1 className="mt-6 text-3xl sm:text-4xl font-black">Purchase not completed</h1><p className="mt-4 text-white/60 leading-relaxed">Checkout was canceled. No Marketplace purchase was completed through this session. You can return to the product or continue browsing whenever you’re ready.</p><div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center"><a href={productHref} className="px-5 py-3 rounded-xl bg-[#7C3AED] font-bold inline-flex items-center justify-center gap-2"><ArrowLeft className="h-4 w-4" /> Return to Product</a><a href="/marketplace" className="px-5 py-3 rounded-xl border border-white/10 font-bold hover:bg-white/5">Browse Marketplace</a></div></div></Shell>;
}
