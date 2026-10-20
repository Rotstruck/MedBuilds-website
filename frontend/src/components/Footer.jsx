import { Activity } from "lucide-react";

const links = [
  { label: "Product", href: "#platform", id: "product" },
  { label: "Workspaces", href: "#workspaces", id: "workspaces" },
  { label: "Patient Journey", href: "#journey", id: "patient-journey" },
  { label: "Analytics", href: "#analytics", id: "analytics" },
  { label: "Pricing", href: "#pricing", id: "pricing" },
  { label: "Security", href: "#security", id: "security" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export const Footer = () => (
  <footer data-testid="site-footer" className="relative bg-[#F1FAFF] border-t border-cyan-100/80 overflow-hidden">
    <div className="orb w-[380px] h-[380px] -bottom-48 right-0 bg-[#A9EEFF]/35" />
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
        <div className="max-w-sm">
          <a href="#top" data-testid="footer-logo-link" className="flex items-center gap-2.5">
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
          <p className="mt-4 text-sm leading-relaxed text-slate-500">
            Hospital management made smarter, one connected system at a time.
          </p>
        </div>
        <nav data-testid="footer-nav" className="grid grid-cols-2 sm:grid-cols-3 gap-x-12 gap-y-3">
          {links.map((l) => (
            <a
              key={l.href + l.label}
              data-testid={`footer-link-${l.id}`}
              href={l.href}
              className="text-sm font-semibold text-slate-500 hover:text-cyan-600 transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
      <div className="mt-12 pt-6 border-t border-cyan-100/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs font-semibold text-slate-400">
          © {new Date().getFullYear()} MEDBUILDS by Rotstruck. All rights reserved.
        </p>
        <span
          data-testid="footer-status-badge"
          className="inline-flex items-center gap-2 rounded-full glass-panel px-4 py-1.5 text-xs font-bold text-slate-500"
        >
          <span className="live-dot w-2 h-2 rounded-full bg-emerald-400" />
          All systems operational
        </span>
      </div>
    </div>
  </footer>
);
