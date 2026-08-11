import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Shield } from "lucide-react";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white">
      <NavBar />
      <main className="pt-32 pb-20">
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8"><div className="w-12 h-12 rounded-xl bg-[#7C3AED]/10 flex items-center justify-center"><Shield className="h-6 w-6 text-[#7C3AED]" /></div><h1 className="text-3xl sm:text-4xl font-black" style={{ fontFamily: "var(--font-display)" }}>Privacy Policy</h1></div>
          <p className="text-white/40 text-sm mb-12">Last updated: August 2026</p>

          <div className="space-y-10 text-white/70 leading-relaxed">
            <section><h2 className="text-xl font-bold text-white mb-4">1. Scope</h2><p>This Privacy Policy describes how Business Bloom LLC handles information associated with the Business Bloom website, Marketplace, support interactions, digital-product delivery, and other Business Bloom services that reference this Policy.</p></section>

            <section><h2 className="text-xl font-bold text-white mb-4">2. Information You Provide</h2><p>Depending on how you use Business Bloom, you may provide information such as your name, email address, phone number, business information, purchase details, support-request details, and information submitted through forms or onboarding steps.</p></section>

            <section><h2 className="text-xl font-bold text-white mb-4">3. Payment Information</h2><p>Marketplace payments are processed through Stripe. Business Bloom does not require customers to send full payment-card numbers through Business Bloom support channels. Payment processors may collect payment and transaction information under their own privacy practices.</p></section>

            <section><h2 className="text-xl font-bold text-white mb-4">4. Website and Technical Information</h2><p>Business Bloom and service providers supporting the website may process technical information needed to operate, secure, diagnose, and improve the service, such as IP address, browser or device information, request logs, page interactions, and similar operational data.</p></section>

            <section><h2 className="text-xl font-bold text-white mb-4">5. How Information Is Used</h2><p>Information may be used to provide and operate Business Bloom services; process and confirm purchases; deliver digital products, access instructions, or onboarding information; answer support requests; maintain security and prevent misuse; improve service quality; comply with applicable obligations; and send communications that are appropriate to the customer relationship and available preferences.</p></section>

            <section><h2 className="text-xl font-bold text-white mb-4">6. Service Providers</h2><p>Business Bloom may use third-party service providers to support functions such as payments, hosting, communications, workflow automation, analytics, storage, and customer support. Those providers may process information needed to perform their services. Business Bloom does not ask customers to expose passwords, secret keys, or full card data through ordinary support requests.</p></section>

            <section><h2 className="text-xl font-bold text-white mb-4">7. Digital Product Delivery</h2><p>Purchase and contact information may be used to send transaction confirmation and only the delivery, access, or onboarding instructions relevant to the product purchased. Business Bloom aims to avoid exposing internal production folders, engineering materials, private credentials, or unrelated customer data in customer-facing delivery paths.</p></section>

            <section><h2 className="text-xl font-bold text-white mb-4">8. AI and Sensitive Information</h2><p>Some Business Bloom products include AI-assisted workflows or prompts. Do not submit confidential, regulated, or sensitive information to an AI or third-party tool unless you are authorized to do so and appropriate safeguards are in place. Customers are responsible for reviewing the privacy and security requirements that apply to their own use of Business Bloom materials and third-party systems.</p></section>

            <section><h2 className="text-xl font-bold text-white mb-4">9. Security</h2><p>Business Bloom uses technical and organizational safeguards intended to reduce unauthorized access, disclosure, misuse, or loss of information. No online system can be guaranteed to be completely secure, so customers should also protect their accounts, devices, and credentials.</p></section>

            <section><h2 className="text-xl font-bold text-white mb-4">10. Retention and Deletion</h2><p>Information may be retained as needed for service delivery, transaction records, support, security, dispute handling, and applicable business or legal requirements. Retention needs vary by data type and service context.</p></section>

            <section><h2 className="text-xl font-bold text-white mb-4">11. Your Requests</h2><p>You may contact Business Bloom Support with questions or requests concerning personal information associated with your Business Bloom relationship. The ability to access, correct, delete, restrict, or otherwise act on information may depend on the type of information, the service involved, applicable obligations, and identity verification.</p></section>

            <section><h2 className="text-xl font-bold text-white mb-4">12. Children</h2><p>Business Bloom products and services are intended for business users and are not designed as services for children. If Business Bloom becomes aware that information was submitted inappropriately by or about a child, it may take steps appropriate to the circumstances.</p></section>

            <section><h2 className="text-xl font-bold text-white mb-4">13. Changes</h2><p>This Policy may be updated as Business Bloom products, service providers, and data practices evolve. Material updates will be reflected by an updated revision date.</p></section>

            <section><h2 className="text-xl font-bold text-white mb-4">14. Contact</h2><p>For privacy questions or requests, use Business Bloom Support and describe the request without including passwords, full card numbers, API keys, or other secrets.</p><a href="/support" className="inline-flex mt-4 text-[#14B8A6] font-semibold hover:underline">Business Bloom Support</a></section>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
