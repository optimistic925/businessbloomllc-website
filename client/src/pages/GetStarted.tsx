import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  Rocket,
  Send,
} from "lucide-react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const services = [
  "Automation System ($997)",
  "Business Launch System ($1,497–$2,497)",
  "Scale System ($3,000–$5,000+)",
  "Prompt Packs",
  "DFY Services",
  "Web Hosting",
  "Domain Registration",
  "Shopify App",
  "Free Shopify Store",
  "Other / Not Sure",
];

export default function GetStarted() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    business: "",
    service: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to app.businessbloomllc.com with context
    const params = new URLSearchParams({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      service: formData.service,
    });
    window.location.href = `https://app.businessbloomllc.com/?${params.toString()}`;
  };

  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white overflow-x-hidden">
      <NavBar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-[#7C3AED]/8 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#14B8A6]/6 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#14B8A6]/30 bg-[#14B8A6]/10 text-[#14B8A6] text-sm font-medium mb-8">
              <Rocket className="h-4 w-4" />
              GET STARTED
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Let's Build Your{" "}
            <span className="bg-gradient-to-r from-[#7C3AED] to-[#14B8A6] bg-clip-text text-transparent">
              Growth System
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed"
          >
            Tell us about your business and goals. We'll connect you with the
            right solution — whether that's automation, a done-for-you build, or
            a free strategy call.
          </motion.p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="p-8 rounded-2xl bg-[#0D1120] border border-white/10"
          >
            {submitted ? (
              <div className="text-center py-12">
                <CheckCircle className="h-16 w-16 text-[#14B8A6] mx-auto mb-6" />
                <h2 className="text-2xl font-bold text-white mb-3">
                  You're All Set!
                </h2>
                <p className="text-white/60 mb-6">
                  Redirecting you to the Business Bloom Engine...
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#0B0F1A] border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#7C3AED]/50 transition-colors"
                    placeholder="John Smith"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#0B0F1A] border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#7C3AED]/50 transition-colors"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#0B0F1A] border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#7C3AED]/50 transition-colors"
                    placeholder="(555) 123-4567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Business Name
                  </label>
                  <input
                    type="text"
                    name="business"
                    value={formData.business}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#0B0F1A] border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#7C3AED]/50 transition-colors"
                    placeholder="Your Business LLC"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    What Are You Interested In? *
                  </label>
                  <select
                    name="service"
                    required
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#0B0F1A] border border-white/10 text-white focus:outline-none focus:border-[#7C3AED]/50 transition-colors"
                  >
                    <option value="" className="bg-[#0B0F1A]">
                      Select a service...
                    </option>
                    {services.map((service) => (
                      <option key={service} value={service} className="bg-[#0B0F1A]">
                        {service}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Tell Us More About Your Goals
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#0B0F1A] border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#7C3AED]/50 transition-colors resize-none"
                    placeholder="What challenges are you facing? What does success look like for you?"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#14B8A6] text-white font-bold hover:opacity-90 transition-opacity text-lg"
                >
                  <Send className="h-5 w-5" />
                  Submit & Get Started
                </button>

                <p className="text-white/30 text-xs text-center">
                  By submitting, you'll be redirected to our Business Bloom Engine
                  where our team will follow up within 24 hours.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            {[
              { stat: "500+", label: "Businesses Served" },
              { stat: "10+", label: "Years Experience" },
              { stat: "24hr", label: "Response Time" },
            ].map((item) => (
              <div key={item.label} className="p-6 rounded-xl bg-[#0D1120] border border-white/5">
                <p className="text-3xl font-black text-[#14B8A6] mb-1">
                  {item.stat}
                </p>
                <p className="text-white/50 text-sm">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
