import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { FileText } from "lucide-react";
const sections = [
  ["1. Acceptance", "By accessing Business Bloom websites or related services, you agree to these Terms. If you do not agree, do not use the services."],
  ["2. Services", "Business Bloom provides public information, software access, business resources, hosting, Shopify-related offerings, prompts, and other services that may change over time. Availability labels on the website control where an asset or feature is not yet released."],
  ["3. Purchases", "Paid services use pricing and billing terms displayed at checkout. Payments are processed through Stripe. Refund, cancellation, and subscription terms applicable to a purchase must be confirmed in the offer or checkout terms presented for that transaction."],
  ["4. Domains", "Domain search and purchasing are currently unavailable while a verified registrar integration is established. Future registrations will also be subject to the applicable registrar and registry terms."],
  ["5. Intellectual Property", "Website content, software, graphics, and branding are owned by Business Bloom LLC or its licensors and may not be reproduced, resold, or redistributed without authorization."],
  ["6. User Responsibilities", "You must use the services lawfully, protect account access, review AI-assisted output, and remain responsible for business decisions, legal duties, financial obligations, approvals, and execution."],
  ["7. No Guaranteed Outcomes", "Business Bloom does not guarantee income, business results, credit improvement, funding approval, or capital availability. AI output may be incomplete or inaccurate and requires independent review."],
  ["8. Third-Party Services", "Links and integrations may involve Stripe, Shopify, Business Bloom Engine, or other providers. Their separate terms and policies apply to your use of their services."],
  ["9. Availability", "Services may be changed, suspended, or discontinued. Items labeled Coming Soon, early access, waitlist, or request-only are not promised as immediate downloads, videos, agents, or automated delivery."],
  ["10. Changes", "These Terms may be updated as services and legal requirements change. Updates will be posted with a revised date."],
  ["11. Contact", "Questions about these Terms may be submitted through the Get Started page. Official notice details, governing law, and dispute terms remain subject to owner and legal confirmation."],
];
export default function Terms(){return <div className="min-h-screen bg-[#0B0F1A] text-white"><NavBar/><main className="max-w-4xl mx-auto px-4 pt-32 pb-20"><div className="flex gap-3 items-center mb-6"><FileText className="h-8 w-8 text-[#14B8A6]"/><h1 className="text-4xl font-black">Terms of Service</h1></div><p className="text-white/40 text-sm mb-12">Last updated: July 2026</p><div className="space-y-9">{sections.map(([title,text])=><section key={title}><h2 className="text-xl font-bold mb-3">{title}</h2><p className="text-white/70 leading-relaxed">{text}</p></section>)}</div></main><Footer/></div>}
