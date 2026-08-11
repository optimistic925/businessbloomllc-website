import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Marketplace", href: "/marketplace" },
  { label: "Solutions", href: "/solutions" },
  { label: "Prompt Packs", href: "/prompt-packs" },
  { label: "DFY Services", href: "/dfy-services" },
  { label: "Hosting", href: "/hosting" },
  { label: "Domains", href: "/domains" },
  { label: "Shopify App", href: "/shopify-app" },
  { label: "Free Store", href: "/free-shopify-store" },
  { label: "Resources", href: "/resources" },
];

export default function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0B0F1A]/90 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="/" className="flex items-center gap-2 text-white font-bold text-lg">
            Business Bloom
          </a>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="px-3 py-2 text-sm text-white/70 hover:text-white transition-colors rounded-lg hover:bg-white/5">
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a href="/get-started" className="px-4 py-2 text-sm font-medium text-white bg-[#7C3AED] rounded-lg hover:bg-[#6D2FDD] transition-colors">Get Started</a>
            <a href="https://app.businessbloomllc.com/" target="_blank" rel="noopener noreferrer" className="px-4 py-2 text-sm font-medium text-[#14B8A6] border border-[#14B8A6]/30 rounded-lg hover:bg-[#14B8A6]/10 transition-colors">Open Business Bloom Engine</a>
          </div>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 text-white/70 hover:text-white" aria-label={mobileOpen ? "Close navigation" : "Open navigation"}>
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-[#0B0F1A] border-t border-white/5 py-4">
          <nav className="flex flex-col px-4 gap-1">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="px-3 py-2 text-sm text-white/70 hover:text-white transition-colors rounded-lg hover:bg-white/5">{link.label}</a>
            ))}
            <div className="mt-4 flex flex-col gap-2">
              <a href="/get-started" className="px-4 py-2 text-sm font-medium text-white bg-[#7C3AED] rounded-lg hover:bg-[#6D2FDD] transition-colors text-center">Get Started</a>
              <a href="https://app.businessbloomllc.com/" target="_blank" rel="noopener noreferrer" className="px-4 py-2 text-sm font-medium text-[#14B8A6] border border-[#14B8A6]/30 rounded-lg hover:bg-[#14B8A6]/10 transition-colors text-center">Open Business Bloom Engine</a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
