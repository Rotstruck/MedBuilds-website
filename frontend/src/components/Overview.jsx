import { Activity, Hospital, Network, TrendingUp } from "lucide-react";
import { Eyebrow, Reveal } from "./Reveal";

const features = [
  {
    icon: Network,
    title: "Connected departments",
    copy: "OPD, IPD, nursing, pharmacy, lab and billing work from the same live record. No handoffs lost between desks, no details typed twice.",
    testid: "overview-card-connected-departments",
  },
  {
    icon: Activity,
    title: "Live operational intelligence",
    copy: "Vitals, bed occupancy, queues and revenue update in real time, so teams act on what is happening now — not on yesterday's report.",
    testid: "overview-card-live-intelligence",
  },
  {
    icon: Hospital,
    title: "Designed for hospitals",
    copy: "Built around Indian hospital workflows: token queues, MRN-based records, GST-ready billing and role-wise access for every staff member.",
    testid: "overview-card-designed-for-hospitals",
  },
  {
    icon: TrendingUp,
    title: "Scales with growth",
    copy: "Start with a single OPD clinic and grow into multi-specialty wards and multi-site groups — without ever switching systems.",
    testid: "overview-card-scales-with-growth",
  },
];

export const Overview = () => (
  <section id="platform" data-testid="product-overview-section" className="relative py-20 lg:py-28 bg-[#F1FAFF] overflow-hidden">
    <div className="orb w-[420px] h-[420px] -top-32 right-0 bg-[#A9EEFF]/40" />
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Reveal className="max-w-3xl">
        <Eyebrow>Product overview</Eyebrow>
        <h2 className="mt-5 font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-800 leading-tight">
          One calm system for the complete hospital journey.
        </h2>
        <p className="mt-5 text-base sm:text-lg leading-relaxed text-slate-500">
          MEDBUILDS connects every department, workflow and patient interaction in one intelligent
          platform — from the first appointment to admission, treatment, billing, discharge and
          follow-up. Each team sees the same truth, updated the moment anything changes.
        </p>
      </Reveal>

      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f, i) => (
          <Reveal key={f.title} delay={i * 100}>
            <div
              data-testid={f.testid}
              className="card-lift h-full rounded-3xl glass-panel shadow-[0_10px_40px_rgba(2,132,199,0.06)] p-7"
            >
              <span className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#A9EEFF] to-[#52D2F7] flex items-center justify-center shadow-[0_8px_20px_rgba(82,210,247,0.35)]">
                <f.icon className="w-6 h-6 text-white" />
              </span>
              <h3 className="mt-5 font-display text-lg font-bold text-slate-800">{f.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-500">{f.copy}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
