import { useState } from "react";
import { motion } from "framer-motion";
import {
  Globe,
  Search,
  Loader2,
  Shield,
  Lock,
  Settings,
  ArrowRight,
  CheckCircle,
  XCircle,
  X,
  ExternalLink,
} from "lucide-react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { DOMAIN_TLD_PRICING, getDomainPriceId, getDomainTLDInfo } from "../../../shared/domainPricing";
import { toast } from "sonner";

interface DomainResult {
  domain: string;
  available: boolean;
  isPremium?: boolean;
}

export default function Domains() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchStatus, setSearchStatus] = useState<"idle" | "searching" | "done">("idle");
  const [results, setResults] = useState<DomainResult[]>([]);
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);

  // Checkout modal state
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [checkoutDomain, setCheckoutDomain] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [smsConsent, setSmsConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const searchDomains = async () => {
    if (!searchQuery.trim()) return;
    setSearchStatus("searching");
    setResults([]);

    const baseName = searchQuery.replace(/\.[a-z]+$/i, "").trim();
    const tlds = [".com", ".net", ".org", ".io", ".co", ".biz"];
    const newResults: DomainResult[] = [];

    for (const tld of tlds) {
      const domain = `${baseName}${tld}`;
      try {
        const response = await fetch("/api/check-domain", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ domain }),
        });
        const data = await response.json();
        newResults.push({
          domain,
          available: data.available,
          isPremium: data.isPremium,
        });
      } catch {
        newResults.push({ domain, available: false });
      }
    }

    setResults(newResults);
    setSearchStatus("done");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") searchDomains();
  };

  const openCheckoutModal = (domain: string) => {
    setCheckoutDomain(domain);
    setCheckoutError(null);
    setShowCheckoutModal(true);
  };

  const closeCheckoutModal = () => {
    setShowCheckoutModal(false);
    setCheckoutDomain("");
    setCheckoutError(null);
  };

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutError(null);

    if (!customerEmail.trim()) {
      setCheckoutError("Please enter your email address.");
      return;
    }

    const priceId = getDomainPriceId(checkoutDomain);
    if (!priceId) {
      setCheckoutError("Unable to determine pricing for this domain.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceId,
          customerName: customerName.trim(),
          customerEmail: customerEmail.trim(),
          customerPhone: customerPhone.trim() || undefined,
          smsConsent,
          domainName: checkoutDomain,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.details || "Checkout failed");
      }

      if (data.url) {
        window.location.href = data.url;
      } else if (data.sessionId) {
        window.location.href = `https://checkout.stripe.com/c/pay/${data.sessionId}`;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (err: any) {
      console.error("Checkout error:", err);
      setCheckoutError(err.message || "Checkout failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Check for success/canceled URL params
  const urlParams = new URLSearchParams(window.location.search);
  const showSuccess = urlParams.get("success") === "true";

  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white overflow-x-hidden">
      <NavBar />

      {/* Success Banner */}
      {showSuccess && (
        <div className="fixed top-16 left-0 right-0 z-40 bg-[#14B8A6]/20 border-b border-[#14B8A6]/30 py-3">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-[#14B8A6] font-medium flex items-center justify-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Payment successful! Your domain registration is being processed. We'll email you once it's active.
            </p>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#14B8A6]/8 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-[#7C3AED]/6 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#7C3AED]/30 bg-[#7C3AED]/10 text-[#7C3AED] text-sm font-medium mb-8">
              <Globe className="h-4 w-4" />
              DOMAIN REGISTRATION
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Find Your Perfect{" "}
            <span className="bg-gradient-to-r from-[#7C3AED] to-[#14B8A6] bg-clip-text text-transparent">
              Domain Name
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Register your custom domain with free WHOIS privacy, DNS management, and SSL certificate included.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-2xl mx-auto"
          >
            <div className="flex gap-2 p-2 rounded-2xl bg-[#0D1120] border border-white/10">
              <input
                type="text"
                placeholder="Enter your domain name (e.g., mybusiness)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 px-5 py-4 bg-transparent text-white placeholder-white/30 focus:outline-none text-lg"
              />
              <button
                onClick={searchDomains}
                disabled={!searchQuery.trim() || searchStatus === "searching"}
                className="px-8 py-4 rounded-xl bg-[#7C3AED] text-white font-bold hover:bg-[#6D2FDD] disabled:opacity-50 flex items-center gap-2 transition-colors"
              >
                {searchStatus === "searching" ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Search className="h-5 w-5" />
                )}
                Search
              </button>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-sm text-white/40 mt-4"
          >
            Need hosting too?{" "}
            <a href="/hosting" className="text-[#14B8A6] hover:underline">
              View hosting plans &rarr;
            </a>
          </motion.p>
        </div>
      </section>

      {/* Search Results */}
      {searchStatus === "done" && results.length > 0 && (
        <section className="py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h2
                className="text-2xl font-black mb-6"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Search Results
              </h2>
              <div className="space-y-3">
                {results.map((result) => (
                  <div
                    key={result.domain}
                    className={`flex items-center justify-between p-5 rounded-xl border transition-all ${
                      result.available
                        ? selectedDomain === result.domain
                          ? "border-[#14B8A6]/50 bg-[#14B8A6]/10"
                          : "border-white/10 bg-[#0D1120] hover:border-[#14B8A6]/30 cursor-pointer"
                        : "border-white/5 bg-[#0D1120]/50 opacity-60"
                    }`}
                    onClick={() => result.available && setSelectedDomain(result.domain)}
                  >
                    <div className="flex items-center gap-3">
                      {result.available ? (
                        <CheckCircle className="h-5 w-5 text-[#14B8A6]" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-400" />
                      )}
                      <span className="font-medium text-lg">{result.domain}</span>
                      {result.isPremium && (
                        <span className="px-2 py-0.5 text-xs rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                          Premium
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4">
                      {result.available && (
                        <>
                          <span className="text-[#14B8A6] font-bold">
                            {getDomainTLDInfo(result.domain)?.price}/yr
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openCheckoutModal(result.domain);
                            }}
                            className="px-4 py-2 rounded-lg bg-[#14B8A6] text-white text-sm font-bold hover:bg-[#0FA897] transition-colors"
                          >
                            Register
                          </button>
                        </>
                      )}
                      {!result.available && (
                        <span className="text-white/40 text-sm">Unavailable</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Selected domain action */}
              {selectedDomain && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-6 rounded-xl bg-gradient-to-r from-[#14B8A6]/10 to-[#7C3AED]/10 border border-[#14B8A6]/20"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/60 text-sm mb-1">Selected domain</p>
                      <p className="text-xl font-bold text-white">{selectedDomain}</p>
                      <p className="text-[#14B8A6] font-medium mt-1">
                        {getDomainTLDInfo(selectedDomain)?.price}/yr
                      </p>
                    </div>
                    <button
                      onClick={() => openCheckoutModal(selectedDomain)}
                      className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#14B8A6] text-white font-bold hover:opacity-90 transition-opacity"
                    >
                      Register Domain <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="text-sm text-white/50 mt-3">
                    Includes free WHOIS privacy, DNS management, and SSL certificate. Want hosting too?{" "}
                    <a href="/hosting" className="text-[#14B8A6] hover:underline">
                      Bundle with hosting &rarr;
                    </a>
                  </p>
                </motion.div>
              )}
            </motion.div>
          </div>
        </section>
      )}

      {/* Domain Pricing Grid */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2
              className="text-3xl sm:text-4xl font-black mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Domain Pricing
            </h2>
            <p className="text-white/60 max-w-xl mx-auto">
              Choose from popular top-level domains. All domains include free privacy protection and DNS management.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {DOMAIN_TLD_PRICING.map((tldInfo, index) => (
              <motion.div
                key={tldInfo.tld}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="p-6 rounded-xl bg-[#0D1120] border border-white/10 hover:border-[#14B8A6]/30 transition-all group"
              >
                <p className="text-2xl font-black text-white mb-2">{tldInfo.tld}</p>
                <p className="text-[#14B8A6] font-bold text-xl mb-1">
                  {tldInfo.price}
                  <span className="text-white/40 text-sm font-normal">/yr</span>
                </p>
                <p className="text-white/50 text-sm">{tldInfo.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[#0D1120]/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2
              className="text-3xl sm:text-4xl font-black mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Every Domain Includes
            </h2>
            <p className="text-white/60 max-w-xl mx-auto">
              Premium features included with every domain registration at no extra cost.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: "WHOIS Privacy",
                desc: "Free privacy protection keeps your personal info hidden from public WHOIS lookups",
              },
              {
                icon: Lock,
                title: "Free SSL Certificate",
                desc: "Every domain includes a free SSL certificate for secure HTTPS connections",
              },
              {
                icon: Settings,
                title: "Easy DNS Management",
                desc: "Full DNS control panel to manage A records, CNAMEs, MX records, and more",
              },
              {
                icon: ExternalLink,
                title: "Domain Forwarding",
                desc: "Redirect your domain to any URL with masking and SEO-friendly options",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="p-6 rounded-xl bg-[#0B0F1A] border border-white/5"
              >
                <feature.icon className="h-8 w-8 text-[#14B8A6] mb-4" />
                <h3 className="text-white font-bold mb-2">{feature.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bundle CTA */}
      <section className="py-20">
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
              Save More with Hosting
            </h2>
            <p className="text-white/60 max-w-xl mx-auto mb-8">
              Bundle your domain with our hosting plans and get your domain free for the first year.
              Professional hosting starts at just $4.99/mo with yearly billing.
            </p>
            <a
              href="/hosting"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#7C3AED] text-white font-bold hover:bg-[#6D2FDD] transition-colors"
            >
              View Hosting Plans <ArrowRight className="h-5 w-5" />
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />

      {/* Checkout Modal */}
      {showCheckoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={closeCheckoutModal}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="relative w-full max-w-md bg-[#0D1120] border border-white/10 rounded-2xl p-6 shadow-2xl"
          >
            {/* Close button */}
            <button
              onClick={closeCheckoutModal}
              className="absolute top-4 right-4 p-1 text-white/40 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Header */}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-white mb-1">Register Domain</h3>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[#14B8A6] font-bold text-lg">{checkoutDomain}</span>
                <span className="text-white/40 text-sm">
                  — {getDomainTLDInfo(checkoutDomain)?.price}/yr
                </span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleCheckoutSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="John Smith"
                  className="w-full px-4 py-3 rounded-lg bg-[#0B0F1A] border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#14B8A6]/50 focus:ring-1 focus:ring-[#14B8A6]/30 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-1.5">
                  Email Address <span className="text-[#14B8A6]">*</span>
                </label>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="john@example.com"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-[#0B0F1A] border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#14B8A6]/50 focus:ring-1 focus:ring-[#14B8A6]/30 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-1.5">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="(555) 123-4567"
                  className="w-full px-4 py-3 rounded-lg bg-[#0B0F1A] border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#14B8A6]/50 focus:ring-1 focus:ring-[#14B8A6]/30 transition-all"
                />
              </div>

              <div className="flex items-start gap-3 pt-1">
                <input
                  type="checkbox"
                  id="smsConsent"
                  checked={smsConsent}
                  onChange={(e) => setSmsConsent(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-white/20 bg-[#0B0F1A] text-[#14B8A6] focus:ring-[#14B8A6]/30"
                />
                <label htmlFor="smsConsent" className="text-sm text-white/50 leading-relaxed">
                  I agree to receive SMS updates about my domain registration and account.
                </label>
              </div>

              {/* Error message */}
              {checkoutError && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                  <p className="text-red-400 text-sm">{checkoutError}</p>
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting || !customerEmail.trim()}
                className="w-full mt-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#14B8A6] text-white font-bold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Proceed to Payment <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>

              <p className="text-xs text-white/30 text-center mt-3">
                You'll be redirected to Stripe's secure checkout to complete payment.
              </p>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
