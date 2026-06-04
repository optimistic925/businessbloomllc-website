import { motion } from "framer-motion";
import {
  ShoppingBag,
  Zap,
  BarChart3,
  Package,
  CreditCard,
  ArrowRight,
  CheckCircle,
  Star,
} from "lucide-react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const features = [
  {
    icon: Zap,
    title: "Automated Order Processing",
    description:
      "Orders flow seamlessly from your store to fulfillment without manual intervention.",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description:
      "Track revenue, conversion rates, AOV, and customer lifetime value in real time.",
  },
  {
    icon: Package,
    title: "Inventory Sync",
    description:
      "Keep inventory accurate across all channels with automatic stock updates.",
  },
  {
    icon: CreditCard,
    title: "Smart Upsells",
    description:
      "AI-powered product recommendations that increase average order value by 15–30%.",
  },
  {
    icon: Star,
    title: "Review Automation",
    description:
      "Automatically request and display customer reviews to build social proof.",
  },
  {
    icon: ShoppingBag,
    title: "Multi-Store Management",
    description:
      "Manage multiple Shopify stores from a single dashboard with unified reporting.",
  },
];

const plans = [
  {
    name: "Basic",
    price: "$29",
    period: "/mo",
    features: [
      "1 Shopify store",
      "Order automation",
      "Basic analytics",
      "Email support",
      "Up to 500 orders/mo",
    ],
  },
  {
    name: "Growth",
    price: "$79",
    period: "/mo",
    features: [
      "Up to 3 stores",
      "Advanced automation",
      "Full analytics suite",
      "Smart upsells",
      "Review automation",
      "Priority support",
      "Up to 5,000 orders/mo",
    ],
    featured: true,
  },
  {
    name: "Enterprise",
    price: "$199",
    period: "/mo",
    features: [
      "Unlimited stores",
      "Custom automation rules",
      "White-label reporting",
      "API access",
      "Dedicated account manager",
      "Unlimited orders",
      "Custom integrations",
    ],
  },
];

export default function ShopifyApp() {
  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white overflow-x-hidden">
      <NavBar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#7C3AED]/8 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-[#14B8A6]/6 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#7C3AED]/30 bg-[#7C3AED]/10 text-[#7C3AED] text-sm font-medium mb-8">
              <ShoppingBag className="h-4 w-4" />
              SHOPIFY APP
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Supercharge Your{" "}
            <span className="bg-gradient-to-r from-[#7C3AED] to-[#14B8A6] bg-clip-text text-transparent">
              Shopify Store
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed mb-10"
          >
            Our Shopify app automates order processing, boosts revenue with smart
            upsells, and gives you the analytics you need to scale your e-commerce
            business.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="/get-started"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#7C3AED] text-white font-bold hover:bg-[#6D2FDD] transition-colors text-lg"
            >
              Install App <ArrowRight className="h-5 w-5" />
            </a>
            <a
              href="/free-shopify-store"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/10 text-white font-bold hover:bg-white/5 transition-colors text-lg"
            >
              Get a Free Store First
            </a>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              Built for E-Commerce Growth
            </h2>
            <p className="text-white/60 max-w-xl mx-auto">
              Every feature is designed to save you time and increase your revenue.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-[#0D1120] border border-white/10 hover:border-[#7C3AED]/30 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-[#7C3AED]/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-[#7C3AED]" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              Simple Pricing
            </h2>
            <p className="text-white/60 max-w-xl mx-auto">
              Start with what you need and scale as you grow. All plans include a
              14-day free trial.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`p-8 rounded-2xl border transition-all ${
                  plan.featured
                    ? "bg-gradient-to-b from-[#7C3AED]/10 to-[#0D1120] border-[#7C3AED]/40"
                    : "bg-[#0D1120] border-white/10"
                }`}
              >
                {plan.featured && (
                  <span className="inline-block px-3 py-1 text-xs font-bold rounded-full bg-[#7C3AED]/20 text-[#7C3AED] border border-[#7C3AED]/30 mb-4">
                    MOST POPULAR
                  </span>
                )}
                <h3 className="text-xl font-bold text-white mb-2">
                  {plan.name}
                </h3>
                <div className="mb-6">
                  <span className="text-4xl font-black text-white">
                    {plan.price}
                  </span>
                  <span className="text-white/40">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm text-white/70"
                    >
                      <CheckCircle className="h-4 w-4 text-[#14B8A6] mt-0.5 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href="/get-started"
                  className={`block text-center px-6 py-3 rounded-xl font-bold transition-colors ${
                    plan.featured
                      ? "bg-[#7C3AED] text-white hover:bg-[#6D2FDD]"
                      : "border border-white/10 text-white hover:bg-white/5"
                  }`}
                >
                  Start Free Trial
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
