import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { FileText } from "lucide-react";

export default function Terms() {
  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white">
      <NavBar />
      <main className="pt-32 pb-20">
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8"><div className="w-12 h-12 rounded-xl bg-[#14B8A6]/10 flex items-center justify-center"><FileText className="h-6 w-6 text-[#14B8A6]" /></div><h1 className="text-3xl sm:text-4xl font-black" style={{ fontFamily: "var(--font-display)" }}>Terms of Service</h1></div>
          <p className="text-white/40 text-sm mb-12">Last updated: August 2026</p>

          <div className="space-y-10 text-white/70 leading-relaxed">
            <section><h2 className="text-xl font-bold text-white mb-4">1. Scope and Acceptance</h2><p>These Terms apply to use of the Business Bloom LLC website, Marketplace, digital products, Free Resources, support channels, and other Business Bloom services that reference these Terms. By using a Business Bloom service or completing a purchase, you agree to the terms presented for that service or transaction.</p></section>

            <section><h2 className="text-xl font-bold text-white mb-4">2. Business Bloom Products</h2><p>Business Bloom provides digital business systems, educational and planning resources, editable tools, templates, prompts, workflows, dashboards, and related implementation materials. Specific product contents, formats, and delivery methods are described on the applicable product page or customer materials.</p></section>

            <section><h2 className="text-xl font-bold text-white mb-4">3. Purchases and Payment</h2><p>Paid Marketplace transactions are processed through Stripe. You are responsible for reviewing the product description, price, billing type, and any transaction-specific terms shown before completing checkout. Current Marketplace products are offered as one-time purchases unless a product page and checkout clearly state otherwise.</p></section>

            <section><h2 className="text-xl font-bold text-white mb-4">4. Digital Delivery and Access</h2><p>Digital products may be delivered by download, access instructions, onboarding instructions, or a combination of these methods. Customers are responsible for providing a usable email address at checkout and for following the customer-facing delivery instructions provided after purchase. If expected delivery or access does not arrive, contact Business Bloom Support.</p></section>

            <section><h2 className="text-xl font-bold text-white mb-4">5. License and Permitted Use</h2><p>Unless a product-specific license states otherwise, Business Bloom digital products are licensed to the purchaser for the purchaser’s own authorized business use. Purchase does not transfer ownership of Business Bloom intellectual property. You may not resell, publicly redistribute, publish, sublicense, or represent Business Bloom materials as your own product without written authorization.</p></section>

            <section><h2 className="text-xl font-bold text-white mb-4">6. Free Resources</h2><p>Free Resources may be provided at no charge for educational, diagnostic, or planning purposes. Their availability, format, and delivery method may change. Free Resources remain subject to applicable intellectual-property and use restrictions.</p></section>

            <section><h2 className="text-xl font-bold text-white mb-4">7. Professional Advice and Customer Responsibility</h2><p>Business Bloom products are business-planning and educational resources. They do not replace qualified legal, tax, accounting, financial, investment, medical, HR, regulatory, or other professional advice. Customers remain responsible for final decisions, implementation, legal obligations, and obtaining qualified professional guidance when their facts, industry, jurisdiction, transaction, or circumstances require it.</p></section>

            <section><h2 className="text-xl font-bold text-white mb-4">8. AI-Assisted Materials</h2><p>Some Business Bloom products include AI-assisted workflows, prompts, or decision-support materials. AI-generated output can contain errors or unsupported statements. Review output before use, verify material claims, protect confidential or sensitive information, and keep appropriate human judgment and professional review in the process.</p></section>

            <section><h2 className="text-xl font-bold text-white mb-4">9. No Guaranteed Business Results</h2><p>Business Bloom does not guarantee specific revenue, earnings, sales, funding, customer-acquisition, productivity, automation, or other business outcomes. Results depend on the customer’s circumstances, decisions, implementation, market conditions, and other factors outside Business Bloom’s control.</p></section>

            <section><h2 className="text-xl font-bold text-white mb-4">10. Refunds, Cancellations, and Billing Questions</h2><p>Review any refund, cancellation, or recurring-billing terms presented for a specific product or service before purchase. If a purchase page does not state a policy relevant to your situation, contact Business Bloom Support before purchasing. Transaction questions after purchase should include the product name, order or Checkout Session reference when available, and the email used at checkout; never send full payment-card information.</p></section>

            <section><h2 className="text-xl font-bold text-white mb-4">11. Acceptable Use</h2><p>You may not use Business Bloom services to violate law, infringe intellectual-property rights, gain unauthorized access to systems or data, interfere with service operation, distribute malicious content, or misuse customer or third-party data.</p></section>

            <section><h2 className="text-xl font-bold text-white mb-4">12. Third-Party Services</h2><p>Business Bloom may rely on third-party providers for payment processing, hosting, communications, file formats, or other service functions. Your use of a third-party product or platform may also be subject to that provider’s terms and privacy practices.</p></section>

            <section><h2 className="text-xl font-bold text-white mb-4">13. Intellectual Property</h2><p>Business Bloom names, product names, written materials, graphics, software, workflows, templates, and other original content remain the property of Business Bloom LLC or applicable licensors except where expressly stated otherwise.</p></section>

            <section><h2 className="text-xl font-bold text-white mb-4">14. Service Changes</h2><p>Business Bloom may update products, resources, website features, or these Terms as the business evolves. Material updates to these Terms will be reflected by an updated revision date.</p></section>

            <section><h2 className="text-xl font-bold text-white mb-4">15. Contact</h2><p>For purchase, delivery, access, or Terms questions, use the Business Bloom Support page. Do not send passwords, full card numbers, API keys, or other secrets through support requests.</p><a href="/support" className="inline-flex mt-4 text-[#14B8A6] font-semibold hover:underline">Business Bloom Support</a></section>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
