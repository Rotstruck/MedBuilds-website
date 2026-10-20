import { useState } from "react";
import { Activity, ArrowRight, Menu, X } from "lucide-react";

const links = [
  { label: "Platform", href: "#platform", id: "platform" },
  { label: "Workspaces", href: "#workspaces", id: "workspaces" },
  { label: "Patient Journey", href: "#journey", id: "patient-journey" },
  { label: "Analytics", href: "#analytics", id: "analytics" },
  { label: "Pricing", href: "#pricing", id: "pricing" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header
      data-testid="site-header"
      className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-white/70 border-b border-cyan-100/70 shadow-[0_4px_24px_rgba(2,132,199,0.05)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 lg:h-[72px] flex items-center justify-between">
        <a href="#top" data-testid="logo-link" className="flex items-center gap-2.5">
          <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#8DE9FF] via-[#52D2F7] to-[#38BDF8] flex items-center justify-center shadow-[0_6px_16px_rgba(82,210,247,0.4)]">
            <Activity className="w-5 h-5 text-white" strokeWidth={2.5} />
          </span>
          <span className="leading-tight">
            <span className="block font-display font-bold text-[17px] tracking-tight text-slate-800">
              MEDBUILDS
            </span>
            <span className="block text-[10px] font-bold tracking-[0.2em] uppercase text-cyan-600/80">
              by Rotstruck
            </span>
          </span>
        </a>

        <nav data-testid="desktop-nav" className="hidden lg:flex items-center gap-7">
          {links.map((l) => (
            <a
              key={l.href}
              data-testid={`nav-link-${l.id}`}
              href={l.href}
              className="text-sm font-semibold text-slate-500 hover:text-cyan-600 transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            data-testid="header-book-demo-btn"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-[#52D2F7] to-[#38BDF8] shadow-[0_8px_20px_rgba(82,210,247,0.35)] hover:shadow-[0_12px_28px_rgba(82,210,247,0.5)] hover:-translate-y-0.5 transition-all duration-300"
          >
            Book a demo <ArrowRight className="w-4 h-4" />
          </a>
          <button
            data-testid="mobile-menu-btn"
            aria-label="Toggle navigation menu"
            onClick={() => setOpen(!open)}
            className="lg:hidden w-10 h-10 rounded-xl glass-panel flex items-center justify-center text-slate-600"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div
          data-testid="mobile-menu"
          className="lg:hidden mx-4 mb-4 rounded-2xl glass-panel shadow-[0_20px_50px_rgba(2,132,199,0.12)] p-4 space-y-1"
        >
          {links.map((l) => (
            <a
              key={l.href}
              data-testid={`mobile-nav-link-${l.id}`}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-cyan-50 hover:text-cyan-700 transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            data-testid="mobile-book-demo-btn"
            onClick={() => setOpen(false)}
            className="mt-2 flex items-center justify-center gap-1.5 rounded-xl px-5 py-3 text-sm font-bold text-white bg-gradient-to-r from-[#52D2F7] to-[#38BDF8]"
          >
            Book a demo <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      )}
    </header>
  );
};
