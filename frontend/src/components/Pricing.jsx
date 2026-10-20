import { ArrowRight, Check } from "lucide-react";
import { Eyebrow, Reveal } from "./Reveal";

const plans = [
  {
    name: "Clinic",
    tagline: "For small OPD-focused practices",
    features: [
      "Appointment scheduling",
      "Patient registration",
      "Doctor workspace",
      "Basic EMR",
      "Digital prescription workflow",
    ],
    cta: "Talk to us",
    featured: false,
    testid: "pricing-card-clinic",
  },
  {
    name: "Hospital",
    tagline: "For full multi-department hospitals",
    features: [
      "Reception & queue control",
      "Doctor workspace",
      "Nursing vitals panel",
      "Bed & ward management",
      "Billing & checkout",
      "Analytics & reports",
    ],
    cta: "Book a demo",
    featured: true,
    testid: "pricing-card-hospital",
  },
  {
    name: "Enterprise",
    tagline: "For large hospital groups",
    features: [
      "Multi-site setup",
      "Advanced analytics",
      "Integration support",
      "Custom onboarding",
      "Dedicated support",
    ],
    cta: "Contact sales",
    featured: false,
    testid: "pricing-card-enterprise",
  },
];

export const Pricing = () => (
  <section id="pricing" data-testid="pricing-section" className="relative py-20 lg:py-28 bg-[#F1FAFF] overflow-hidden">
    <div className="orb w-[520px] h-[520px] -top-40 left-1/3 bg-[#A9EEFF]/40" />
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Reveal className="max-w-3xl mx-auto text-center">
        <Eyebrow>Pricing</Eyebrow>
        <h2 className="mt-5 font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-800 leading-tight">
          Plans that grow with your facility.
        </h2>
        <p className="mt-5 text-base sm:text-lg leading-relaxed text-slate-500">
          Start where you are — a single consulting room or a multi-site group — and add
          departments, beds and branches as you grow. Pricing is tailored to your facility's size
          and workflow.
        </p>
      </Reveal>

      <div className="mt-14 grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
        {plans.map((p, i) => (
          <Reveal key={p.name} delay={i * 120} className="h-full">
            <div
              data-testid={p.testid}
              className={`card-lift relative h-full rounded-3xl p-8 flex flex-col ${
                p.featured
                  ? "bg-gradient-to-br from-white/95 via-[#EAF8FF]/90 to-white/95 border-2 border-cyan-300 shadow-[0_24px_60px_rgba(2,132,199,0.18)] backdrop-blur-2xl lg:-translate-y-3"
                  : "glass-panel shadow-[0_10px_40px_rgba(2,132,199,0.06)]"
              }`}
            >
              {p.featured && (
                <span
                  data-testid="pricing-most-popular-badge"
                  className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#52D2F7] to-[#38BDF8] px-4 py-1.5 text-[11px] font-extrabold text-white shadow-[0_8px_20px_rgba(82,210,247,0.45)]"
                >
                  Most popular
                </span>
              )}
              <h3 className="font-display text-2xl font-bold text-slate-800">{p.name}</h3>
              <p className="mt-1.5 text-sm font-semibold text-slate-400">{p.tagline}</p>
              <p className="mt-5 font-display text-3xl font-extrabold text-slate-800">
                Custom
                <span className="block text-xs font-bold text-slate-400 mt-1">
                  tailored to your facility
                </span>
              </p>
              <ul className="mt-6 space-y-3 flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm font-semibold text-slate-600">
                    <span className="w-5 h-5 rounded-full bg-gradient-to-br from-[#C7F4FF] to-[#8DE9FF] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-cyan-700" strokeWidth={3.5} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                data-testid={`pricing-cta-${p.name.toLowerCase()}`}
                className={`mt-8 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-all duration-300 hover:-translate-y-0.5 ${
                  p.featured
                    ? "text-white bg-gradient-to-r from-[#52D2F7] to-[#38BDF8] shadow-[0_12px_30px_rgba(82,210,247,0.4)] hover:shadow-[0_16px_38px_rgba(82,210,247,0.55)]"
                    : "text-cyan-700 glass-panel shadow-[0_8px_24px_rgba(2,132,199,0.08)] hover:shadow-[0_14px_30px_rgba(2,132,199,0.16)]"
                }`}
              >
                {p.cta} <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
