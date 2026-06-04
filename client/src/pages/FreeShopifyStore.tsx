import { motion } from "framer-motion";
import {
  Gift,
  ShoppingBag,
  Palette,
  CreditCard,
  Truck,
  ArrowRight,
  CheckCircle,
  Star,
} from "lucide-react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const included = [
  "Professional Shopify store setup",
  "Custom theme configuration",
  "Up to 10 products added",
  "Payment gateway integration",
  "Shipping settings configured",
  "Mobile-responsive design",
  "Basic SEO setup",
  "Training video walkthrough",
];

const steps = [
  {
    icon: Gift,
    title: "Claim Your Free Store",
    description: "Fill out the form below with your business details and product info.",
  },
  {
    icon: Palette,
    title: "We Design & Build",
    description: "Our team sets up your store with a professional theme and your products.",
  },
  {
    icon: ShoppingBag,
    title: "Start Selling",
    description: "Your store goes live and you start accepting orders immediately.",
  },
];

const faqs = [
  {
    q: "Is this really free?",
    a: "Yes — the store setup is 100% free. You only pay Shopify's standard monthly plan ($39/mo) and any transaction fees directly to Shopify.",
  },
  {
    q: "How long does setup take?",
    a: "Most stores are ready within 3–5 business days after we receive your product information and branding assets.",
  },
  {
    q: "What if I need more than 10 products?",
    a: "We'll add up to 10 products for free. Additional products can be added for a small fee, or we can train you to add them yourself.",
  },
  {
    q: "Do I own the store?",
    a: "Absolutely. The Shopify account is in your name and you have full ownership and admin access.",
  },
  {
    q: "Can I upgrade later?",
    a: "Yes! We offer ongoing support, our Shopify App for automation, and DFY services for scaling your store.",
  },
];

export default function FreeShopifyStore() {
  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white overflow-x-hidden">
      <NavBar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#14B8A6]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-[#7C3AED]/6 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#14B8A6]/30 bg-[#14B8A6]/10 text-[#14B8A6] text-sm font-medium mb-8">
              <Gift className="h-4 w-4" />
              FREE OFFER
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Get a{" "}
            <span className="bg-gradient-to-r from-[#14B8A6] to-[#7C3AED] bg-clip-text text-transparent">
              Free Shopify Store
            </span>{" "}
            Built for You
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed mb-10"
          >
            We'll build you a professional, ready-to-sell Shopify store at no
            cost. You just pay Shopify's standard monthly fee. No catch, no
            contracts.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <a
              href="/get-started"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#14B8A6] to-[#7C3AED] text-white font-bold hover:opacity-90 transition-opacity text-lg"
            >
              Claim Your Free Store <ArrowRight className="h-5 w-5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <h2
              className="text-3xl sm:text-4xl font-black mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              How It Works
            </h2>
            <p className="text-white/60 max-w-xl mx-auto">
              Three simple steps to your own professional online store.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.15 }}
                className="text-center p-8 rounded-2xl bg-[#0D1120] border border-white/10"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#14B8A6]/10 flex items-center justify-center mx-auto mb-5">
                  <step.icon className="h-7 w-7 text-[#14B8A6]" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <h2
              className="text-3xl sm:text-4xl font-black mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              What's Included — Free
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {included.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="flex items-center gap-3 p-4 rounded-xl bg-[#0D1120] border border-white/5"
              >
                <CheckCircle className="h-5 w-5 text-[#14B8A6] shrink-0" />
                <span className="text-white/80 text-sm">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <h2
              className="text-3xl sm:text-4xl font-black mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="p-6 rounded-xl bg-[#0D1120] border border-white/10"
              >
                <h3 className="text-white font-bold mb-2 flex items-start gap-2">
                  <Star className="h-4 w-4 text-[#7C3AED] mt-1 shrink-0" />
                  {faq.q}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed pl-6">
                  {faq.a}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className="text-3xl sm:text-4xl font-black mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Don't Wait — Spots Are Limited
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto mb-8 text-lg">
              We only take on a limited number of free store builds each month to
              ensure quality. Claim yours now.
            </p>
            <a
              href="/get-started"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#14B8A6] to-[#7C3AED] text-white font-bold hover:opacity-90 transition-opacity text-lg"
            >
              Claim Your Free Store <ArrowRight className="h-5 w-5" />
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
