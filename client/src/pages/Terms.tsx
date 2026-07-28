import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { FileText } from "lucide-react";

/**
 * Terms of Service — Business Bloom LLC
 *
 * This is placeholder business-policy content suitable for legal review.
 * Provisions requiring owner or attorney confirmation are labeled
 * with [REQUIRES OWNER/ATTORNEY REVIEW].
 *
 * No company addresses, specific refund periods, or governing-law
 * provisions have been invented.
 */
export default function Terms() {
  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white">
      <NavBar />

      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[#14B8A6]/8 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-[#14B8A6]/10 flex items-center justify-center">
              <FileText className="h-6 w-6 text-[#14B8A6]" />
            </div>
            <h1
              className="text-3xl sm:text-4xl font-black"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Terms of Service
            </h1>
          </div>

          <p className="text-white/40 text-sm mb-12">
            Last updated: July 2026 · This document is a placeholder pending legal review.
          </p>

          <div className="prose prose-invert max-w-none space-y-10 text-white/70 leading-relaxed">
            {/* Section 1 */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing or using the Business Bloom LLC website
                (businessbloomllc.com), the Business Bloom Engine
                (app.businessbloomllc.com), or any related Services, you
                agree to be bound by these Terms of Service. If you do not
                agree to these Terms, please do not use our Services.
              </p>
            </div>

            {/* Section 2 */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4">2. Description of Services</h2>
              <p>
                Business Bloom LLC provides business automation systems,
                done-for-you services, hosting, domain registration, AI prompt
                packs, and related tools for entrepreneurs and businesses. The
                specific Services available may change over time.
              </p>
            </div>

            {/* Section 3 */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4">3. Purchases and Payments</h2>
              <p>
                Some Services require payment. Payments are processed through
                Stripe. By making a purchase, you agree to the pricing and
                billing terms presented at the time of checkout.
              </p>
              <p className="mt-3 text-[#14B8A6] text-sm">
                [REQUIRES OWNER/ATTORNEY REVIEW: Add specific refund policy
                period, subscription cancellation terms, and any
                money-back guarantee details once confirmed.]
              </p>
            </div>

            {/* Section 4 */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4">4. Domain Registration</h2>
              <p>
                Domain registration services are currently being updated. When
                available, domain purchases are subject to the terms of the
                applicable registrar and registry. Business Bloom LLC is not
                responsible for domain availability, registration failures, or
                disputes over domain ownership. Domain purchases are non-refundable.
              </p>
              <p className="mt-3 text-[#14B8A6] text-sm">
                [REQUIRES OWNER/ATTORNEY REVIEW: Confirm registrar partner,
                refund terms for failed registrations, and any liability
                limitations once the registrar integration is complete.]
              </p>
            </div>

            {/* Section 5 */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4">5. Intellectual Property</h2>
              <p>
                All content on our website, including text, graphics, logos,
                software, and design elements, is the property of Business
                Bloom LLC or its licensors and is protected by intellectual
                property laws. You may not reproduce, distribute, or create
                derivative works from our content without written permission.
              </p>
            </div>

            {/* Section 6 */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4">6. User Conduct</h2>
              <p>You agree not to:</p>
              <ul className="mt-3 space-y-2">
                <li>Use our Services for any unlawful purpose</li>
                <li>Attempt to gain unauthorized access to our systems or data</li>
                <li>Interfere with the proper operation of our Services</li>
                <li>Use our content without attribution or permission</li>
                <li>Reproduce, resell, or redistribute our products without authorization</li>
              </ul>
            </div>

            {/* Section 7 */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4">7. Disclaimers</h2>
              <p>
                Our Services are provided "as is" and "as available." We make
                no warranties, express or implied, regarding the reliability,
                accuracy, or availability of our Services. We do not guarantee
                specific business results, revenue outcomes, or funding
                approvals.
              </p>
            </div>

            {/* Section 8 */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4">8. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, Business Bloom LLC
                shall not be liable for any indirect, incidental, special,
                consequential, or punitive damages arising from your use of
                our Services.
              </p>
            </div>

            {/* Section 9 */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4">9. Third-Party Services</h2>
              <p>
                Our Services may integrate with or link to third-party
                platforms (e.g., Stripe, Shopify). We are not responsible for
                the practices or content of these third parties. Your use of
                third-party services is subject to their respective terms.
              </p>
            </div>

            {/* Section 10 */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4">10. Changes to Terms</h2>
              <p>
                We may update these Terms from time to time. Material changes
                will be posted on this page with an updated revision date.
                Continued use of our Services after changes constitutes
                acceptance of the updated Terms.
              </p>
            </div>

            {/* Section 11 */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4">11. Contact Us</h2>
              <p>
                For questions about these Terms of Service, please reach out
                through the contact information available on our website at
                businessbloomllc.com.
              </p>
              <p className="mt-3 text-[#14B8A6] text-sm">
                [REQUIRES OWNER/ATTORNEY REVIEW: Add official contact email,
                mailing address, governing law jurisdiction, and any dispute
                resolution clauses once confirmed.]
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
