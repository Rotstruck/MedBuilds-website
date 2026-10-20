import {
  ArrowLeftRight,
  Blocks,
  Presentation,
  Route,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Eyebrow, Reveal } from "./Reveal";

const whyCards = [
  {
    icon: Route,
    title: "Workflow first",
    copy: "Every screen is shaped around how care actually moves — registration to rounds to discharge — not around database tables. Staff learn it in hours, not weeks.",
    testid: "why-card-workflow-first",
  },
  {
    icon: Sparkles,
    title: "Visual confidence",
    copy: "A calm, readable interface that surfaces the right numbers at the right moment. No clutter, no cognitive overload — even at a busy nursing station.",
    testid: "why-card-visual-confidence",
  },
  {
    icon: Presentation,
    title: "Stronger storytelling",
    copy: "Every patient has one continuous narrative across departments, so each handover feels like a continuation of care — never a fresh start.",
    testid: "why-card-stronger-storytelling",
  },
];

const securityCards = [
  {
    icon: ShieldCheck,
    title: "Controlled access",
    copy: "Role-based permissions and complete audit trails keep sensitive records visible only to the people who need them.",
    testid: "security-card-controlled-access",
  },
  {
    icon: Blocks,
    title: "Connected ecosystem",
    copy: "Standards-aware data exchange designed to plug into the systems hospitals already run — labs, imaging, pharmacy and more.",
    testid: "security-card-connected-ecosystem",
  },
  {
    icon: ArrowLeftRight,
    title: "Reliable exchange",
    copy: "Dependable, traceable data flow between departments and external systems, so nothing arrives late or goes missing.",
    testid: "security-card-reliable-exchange",
  },
];

const ecosystem = [
  "Laboratory systems",
  "Radiology",
  "Pharmacy",
  "Insurance",
  "Payment gateways",
  "Government portals",
  "Communication tools",
  "Device integrations",
];

export const Why = () => (
  <section id="why" data-testid="why-section" className="relative py-20 lg:py-28 overflow-hidden">
    <div className="orb w-[440px] h-[440px] bottom-0 -right-48 bg-[#A9EEFF]/40" />
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Reveal className="max-w-3xl">
        <Eyebrow>Why MEDBUILDS</Eyebrow>
        <h2 className="mt-5 font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-800 leading-tight">
          Built to feel more premium, more usable, and more hospital-aware.
        </h2>
      </Reveal>
      <div className="mt-12 grid md:grid-cols-3 gap-6 lg:gap-8">
        {whyCards.map((c, i) => (
          <Reveal key={c.title} delay={i * 120}>
            <div
              data-testid={c.testid}
              className="card-lift h-full rounded-3xl glass-panel shadow-[0_10px_40px_rgba(2,132,199,0.06)] p-8"
            >
              <span className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#A9EEFF] to-[#52D2F7] flex items-center justify-center shadow-[0_8px_20px_rgba(82,210,247,0.35)]">
                <c.icon className="w-6 h-6 text-white" />
              </span>
              <h3 className="mt-5 font-display text-xl font-bold text-slate-800">{c.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-500">{c.copy}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export const Security = () => (
  <section id="security" data-testid="security-section" className="relative py-20 lg:py-28 bg-[#EAF8FF] overflow-hidden">
    <div className="orb w-[460px] h-[460px] -top-32 -left-40 bg-[#8DE9FF]/30" />
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Reveal className="max-w-3xl mx-auto text-center">
        <Eyebrow>Security & integrations</Eyebrow>
        <h2 className="mt-5 font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-800 leading-tight">
          Secure, standards-aware, and ready to connect.
        </h2>
        <p className="mt-5 text-base sm:text-lg leading-relaxed text-slate-500">
          MEDBUILDS is built for controlled access, reliable data flow and future-ready
          integrations across hospital systems — so the platform you adopt today keeps connecting
          to whatever your hospital adds tomorrow.
        </p>
      </Reveal>

      <div className="mt-12 grid md:grid-cols-3 gap-6 lg:gap-8">
        {securityCards.map((c, i) => (
          <Reveal key={c.title} delay={i * 120}>
            <div
              data-testid={c.testid}
              className="card-lift h-full rounded-3xl glass-panel shadow-[0_10px_40px_rgba(2,132,199,0.06)] p-8"
            >
              <span className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#A9EEFF] to-[#52D2F7] flex items-center justify-center shadow-[0_8px_20px_rgba(82,210,247,0.35)]">
                <c.icon className="w-6 h-6 text-white" />
              </span>
              <h3 className="mt-5 font-display text-xl font-bold text-slate-800">{c.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-500">{c.copy}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={200}>
        <div className="mt-10 flex flex-wrap justify-center gap-3" data-testid="ecosystem-pills">
          {ecosystem.map((e) => (
            <span
              key={e}
              className="rounded-full glass-panel px-5 py-2.5 text-sm font-bold text-slate-600 shadow-[0_6px_18px_rgba(2,132,199,0.06)] hover:text-cyan-700 hover:border-cyan-300/70 transition-colors duration-200"
            >
              {e}
            </span>
          ))}
        </div>
      </Reveal>
    </div>
  </section>
);
