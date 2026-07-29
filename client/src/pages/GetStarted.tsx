import { useState } from "react";
import { Rocket, Send } from "lucide-react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const interestLabels: Record<string,string> = {
  "business-automation-guide": "Business Automation Starter Guide",
  "5-day-email-challenge": "Five-Day Business Growth Email Challenge",
  "business-bloom-engine-demo": "Business Bloom Engine Demo Updates",
  "prompt-starter-library": "Business Bloom Prompt Starter Library",
  "startup-growth-checklist": "Business Startup and Growth Checklist",
  "funding-readiness-checklist": "Funding Readiness Checklist",
  "funding-strategy-playbook": "Funding Strategy Mini Playbook",
  "ai-agent-starter-guide": "AI Agent Starter Guide",
  "operations-organizer-agent": "Operations Organizer Agent Waitlist",
  "business-bloom-capital": "Business Bloom Capital — Funding and Credit Support",
};
const standard = ["Business Bloom Engine", "Agent Marketplace", "Prompt Products", "Done-for-You Services", "Web Hosting", "Domain Registration", "Shopify App", "Free Shopify Store", "Other / Not Sure"];

export default function GetStarted() {
  const interest = new URLSearchParams(window.location.search).get("interest") || "";
  const selectedLabel = interestLabels[interest] || (interest ? interest.replace(/-/g," ") : "");
  const options = selectedLabel && !standard.includes(selectedLabel) ? [selectedLabel,...standard] : standard;
  const [formData,setFormData] = useState({name:"",email:"",phone:"",business:"",service:selectedLabel,message:""});
  const change = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) => setFormData({...formData,[e.target.name]:e.target.value});
  const submit = (e: React.FormEvent) => { e.preventDefault(); const params = new URLSearchParams({name:formData.name,email:formData.email,phone:formData.phone,service:formData.service,interest:interest || formData.service,business:formData.business,message:formData.message}); window.location.href=`https://app.businessbloomllc.com/?${params.toString()}`; };
  return <div className="min-h-screen bg-[#0B0F1A] text-white"><NavBar /><section className="pt-32 pb-12 text-center px-4"><Rocket className="h-11 w-11 text-[#14B8A6] mx-auto mb-5"/><h1 className="text-4xl sm:text-6xl font-black mb-5">Tell Us What You Need</h1><p className="text-white/60 text-lg max-w-2xl mx-auto">Your selected interest stays attached when you continue to the Business Bloom Engine. Resource requests do not promise immediate or automated delivery.</p></section><section className="max-w-2xl mx-auto px-4 pb-20"><form onSubmit={submit} className="p-8 rounded-2xl bg-[#0D1120] border border-white/10 space-y-5">{selectedLabel && <div className="p-4 rounded-xl bg-[#14B8A6]/10 border border-[#14B8A6]/20"><p className="text-xs text-[#14B8A6] font-semibold">SELECTED INTEREST</p><p className="font-bold mt-1 capitalize">{selectedLabel}</p></div>}{[{name:"name",label:"Full Name *",type:"text",required:true},{name:"email",label:"Email Address *",type:"email",required:true},{name:"phone",label:"Phone Number",type:"tel",required:false},{name:"business",label:"Business Name",type:"text",required:false}].map(f=><label key={f.name} className="block text-sm font-medium text-white/80">{f.label}<input name={f.name} type={f.type} required={f.required} value={formData[f.name as keyof typeof formData]} onChange={change} className="mt-2 w-full px-4 py-3 rounded-xl bg-[#0B0F1A] border border-white/10 text-white"/></label>)}<label className="block text-sm font-medium text-white/80">What Are You Interested In? *<select name="service" required value={formData.service} onChange={change} className="mt-2 w-full px-4 py-3 rounded-xl bg-[#0B0F1A] border border-white/10 text-white"><option value="">Select an interest...</option>{options.map(o=><option key={o} value={o}>{o}</option>)}</select></label><label className="block text-sm font-medium text-white/80">Tell Us More<textarea name="message" rows={4} value={formData.message} onChange={change} className="mt-2 w-full px-4 py-3 rounded-xl bg-[#0B0F1A] border border-white/10 text-white resize-none"/></label><input type="hidden" name="interest" value={interest}/><button className="w-full inline-flex justify-center items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#14B8A6] font-bold"><Send className="h-5 w-5"/>Continue to the Engine</button><p className="text-white/35 text-xs text-center">Submitting redirects to the Business Bloom Engine with your form details and selected interest. No email or CRM delivery is claimed here.</p></form></section><Footer /></div>;
}
