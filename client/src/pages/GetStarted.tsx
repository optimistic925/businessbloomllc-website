import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Rocket } from "lucide-react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const services = [
  "Marketplace digital products",
  "Free Resources",
  "Business systems guidance",
  "Other / Not Sure",
];

export default function GetStarted() {
  const [service, setService] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = service ? `?service=${encodeURIComponent(service)}` : "";
    window.location.href = `https://app.businessbloomllc.com/${params}`;
  };

  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white overflow-x-hidden">
      <NavBar />

      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-[#7C3AED]/8 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#14B8A6]/6 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#14B8A6]/30 bg-[#14B8A6]/10 text-[#14B8A6] text-sm font-medium mb-8"><Rocket className="h-4 w-4" /> GET STARTED</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6" style={{ fontFamily: "var(--font-display)" }}>
            Find the Right <span className="bg-gradient-to-r from-[#7C3AED] to-[#14B8A6] bg-clip-text text-transparent">Business Bloom Path</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
            Choose what you are looking for and continue to the Business Bloom Engine. Personal contact details are not placed in the website redirect URL.
          </motion.p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="p-8 rounded-2xl bg-[#0D1120] border border-white/10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">What are you interested in?</label>
                <select name="service" value={service} onChange={(e) => setService(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-[#0B0F1A] border border-white/10 text-white focus:outline-none focus:border-[#7C3AED]/50 transition-colors">
                  <option value="" className="bg-[#0B0F1A]">Select a path...</option>
                  {services.map((item) => <option key={item} value={item} className="bg-[#0B0F1A]">{item}</option>)}
                </select>
              </div>
              <button type="submit" className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#14B8A6] text-white font-bold hover:opacity-90 transition-opacity text-lg">
                Continue <ArrowRight className="h-5 w-5" />
              </button>
              <p className="text-white/35 text-xs text-center">You can provide any required contact information inside the destination experience rather than through URL query parameters.</p>
            </form>
          </motion.div>
        </div>
      </section>

      <section className="py-16 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {["Current Marketplace products are one-time purchases", "Paid digital delivery uses protected customer-safe links", "Sensitive business decisions preserve professional-review boundaries"].map((item) => (
              <div key={item} className="p-6 rounded-xl bg-[#0D1120] border border-white/5 flex gap-3"><CheckCircle2 className="h-5 w-5 text-[#14B8A6] shrink-0 mt-0.5" /><p className="text-white/60 text-sm leading-relaxed">{item}</p></div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-white/45">For purchase, delivery, access, privacy, or Terms questions, email <a className="text-[#14B8A6] font-semibold hover:underline" href="mailto:support@businessbloomllc.com">support@businessbloomllc.com</a>.</p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
