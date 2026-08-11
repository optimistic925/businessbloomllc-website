import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Solutions", href: "/solutions" },
  { label: "Marketplace", href: "/marketplace" },
  { label: "Free Resources", href: "/resources" },
  { label: "About", href: "/about" },
  { label: "Support", href: "/support" },
];

export default function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0B0F1A]/90 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="/" className="text-white font-bold text-lg">Business Bloom</a>
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => <a key={link.href} href={link.href} className="px-3 py-2 text-sm text-white/70 hover:text-white rounded-lg hover:bg-white/5">{link.label}</a>)}
          </nav>
          <div className="hidden lg:flex items-center gap-3"><a href="/marketplace" className="px-4 py-2 text-sm font-medium text-white bg-[#7C3AED] rounded-lg hover:bg-[#6D2FDD]">Shop Marketplace</a></div>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 text-white/70" aria-label={mobileOpen ? "Close navigation" : "Open navigation"}>{mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}</button>
        </div>
      </div>
      {mobileOpen && <div className="lg:hidden bg-[#0B0F1A] border-t border-white/5 py-4"><nav className="flex flex-col px-4 gap-1">{navLinks.map((link) => <a key={link.href} href={link.href} className="px-3 py-3 text-sm text-white/70 rounded-lg hover:bg-white/5">{link.label}</a>)}<a href="/marketplace" className="mt-3 px-4 py-3 text-sm font-medium text-white bg-[#7C3AED] rounded-lg text-center">Shop Marketplace</a></nav></div>}
    </header>
  );
}
