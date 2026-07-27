import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

/**
 * Terms of Service page.
 *
 * This is a placeholder business-policy draft suitable for legal review.
 * Provisions requiring owner or attorney confirmation are labeled with
 * REVIEW NOTES. No company addresses, specific refund windows, or
 * governing-law provisions were invented — those are left for the
 * owner/attorney to complete.
 */
export default function Terms() {
  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white overflow-x-hidden">
      <NavBar />

      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#14B8A6]/8 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-[#7C3AED]/6 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#7C3AED]/30 bg-[#7C3AED]/10 text-[#7C3AED] text-sm font-medium mb-6">
              <FileText className="h-4 w-4" />
              LEGAL
            </span>
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Terms of Service
            </h1>
            <p className="text-white/40 text-sm">
              Last updated: July 27, 2026
            </p>
          </motion.div>

          {/* REVIEW NOTE banner */}
          <div className="mb-10 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
            <p className="text-amber-400/80 text-sm leading-relaxed">
              <strong>REVIEW NOTE:</strong> This is a placeholder Terms of
              Service draft prepared for legal review by Business Bloom LLC
              ownership and/or a qualified attorney. Specific details —
              including company contact information, refund policies, and
              governing jurisdiction — must be confirmed before this document
              is published to the public.
            </p>
          </div>

          <div className="space-y-10 text-white/70 leading-relaxed">
            <div>
              <h2 className="text-xl font-bold text-white mb-3">1. Acceptance of Terms</h2>
              <p>
                By accessing or using businessbloomllc.com (the "Website") and
                the services offered by Business Bloom LLC ("we," "us," or
                "our"), you agree to be bound by these Terms of Service
                ("Terms"). If you do not agree, please do not use our Website or
                services.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-3">2. Description of Services</h2>
              <p>
                Business Bloom LLC provides business automation systems,
                done-for-you services, prompt packs, hosting, and related
                digital products. This Website serves as the public marketing
                gateway for the Business Bloom ecosystem, which includes the
                Business Bloom Engine at app.businessbloomllc.com.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-3">3. Your Account and Responsibilities</h2>
              <ul className="list-disc list-inside space-y-1 text-white/60">
                <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
                <li>You agree not to use the Website for any unlawful purpose.</li>
                <li>You must provide accurate information when making purchases.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-3">4. Payments and Billing</h2>
              <p className="mb-2">
                Payments are processed through Stripe. By submitting a purchase,
                you authorize Stripe to charge your payment method for the
                applicable amounts.
              </p>
              <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                <p className="text-amber-400/80 text-sm">
                  <strong>REVIEW NOTE:</strong> Specific refund and cancellation
                  policies, including applicable timeframes, must be confirmed
                  by Business Bloom LLC ownership before publication.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-3">5. Acceptable Use</h2>
              <p>You agree not to:</p>
              <ul className="list-disc list-inside space-y-1 text-white/60 mt-2">
                <li>Use the Website to violate any law or regulation</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Reproduce or distribute our content without permission</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-3">6. Intellectual Property</h2>
              <p>
                All content on this Website, including text, graphics, logos,
                and software, is the property of Business Bloom LLC or its
                licensors and is protected by applicable intellectual property
                laws.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-3">7. Disclaimer of Warranties</h2>
              <p>
                The Website and services are provided "as is" without
                warranties of any kind, either express or implied. We do not
                guarantee that the Website will be error-free or uninterrupted.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-3">8. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, Business Bloom LLC shall
                not be liable for any indirect, incidental, special, or
                consequential damages arising from your use of the Website or
                services.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-3">9. Governing Law</h2>
              <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                <p className="text-amber-400/80 text-sm">
                  <strong>REVIEW NOTE:</strong> The governing law and jurisdiction
                  must be confirmed by Business Bloom LLC ownership or legal
                  counsel before publication.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-3">10. Contact Us</h2>
              <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                <p className="text-amber-400/80 text-sm">
                  <strong>REVIEW NOTE:</strong> Company contact information
                  (email address, mailing address, phone) must be confirmed by
                  Business Bloom LLC ownership before publication.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-3">11. Updates to These Terms</h2>
              <p>
                We may update these Terms from time to time. Changes will be
                posted on this page with an updated revision date.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
