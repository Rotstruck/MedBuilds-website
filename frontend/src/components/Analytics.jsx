import { Clock, Eye, GitBranch, HeartHandshake, Zap } from "lucide-react";
import { Eyebrow, Reveal } from "./Reveal";

const kpis = [
  { label: "Patients Today", value: "312", delta: "+9%" },
  { label: "Appointments", value: "196", delta: "+12%" },
  { label: "Wait Time", value: "14 min", delta: "-18%" },
  { label: "Efficiency", value: "92%", delta: "+5%" },
];

const departments = [
  { name: "OPD", value: 88 },
  { name: "Cardiology", value: 64 },
  { name: "Orthopaedics", value: 52 },
  { name: "Paediatrics", value: 71 },
  { name: "Gynaecology", value: 47 },
];

const quality = [
  { metric: "Avg consultation time", value: "12 min", status: "On track" },
  { metric: "Billing turnaround", value: "8 min", status: "On track" },
  { metric: "Discharge turnaround", value: "46 min", status: "Watch" },
];

const values = [
  { icon: Eye, label: "Better visibility", note: "Volumes, revenue and occupancy in one glance" },
  { icon: Zap, label: "Faster action", note: "Spot bottlenecks while they are still small" },
  { icon: Clock, label: "Reduced delays", note: "Wait times and turnaround tracked continuously" },
  { icon: GitBranch, label: "Better coordination", note: "Departments plan from the same numbers" },
  { icon: HeartHandshake, label: "Improved outcomes", note: "Quality indicators reviewed every day" },
];

export const Analytics = () => (
  <section id="analytics" data-testid="analytics-section" className="relative py-20 lg:py-28 overflow-hidden">
    <div className="orb w-[480px] h-[480px] top-10 -left-56 bg-[#A9EEFF]/40" />
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
      <Reveal>
        <div
          data-testid="analytics-dashboard-mockup"
          className="rounded-3xl glass-panel shadow-[0_24px_60px_rgba(2,132,199,0.12)] p-5 sm:p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <p className="font-display text-sm font-bold text-slate-700">Hospital analytics</p>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-cyan-700">
              <span className="live-dot w-1.5 h-1.5 rounded-full bg-[#52D2F7]" /> LIVE
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {kpis.map((k) => (
              <div key={k.label} className="rounded-xl bg-white/85 border border-cyan-100 px-3 py-2.5">
                <p className="text-[9px] font-bold uppercase tracking-wide text-slate-400">{k.label}</p>
                <p className="font-display text-lg font-extrabold text-slate-800 leading-tight">
                  {k.value}
                  <span className="ml-1 text-[9px] font-bold text-cyan-600">{k.delta}</span>
                </p>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-xl bg-white/85 border border-cyan-100 p-4">
            <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400 mb-3">
              Department performance
            </p>
            <div className="space-y-2.5">
              {departments.map((d) => (
                <div key={d.name} className="flex items-center gap-3">
                  <span className="w-24 shrink-0 text-[10px] font-bold text-slate-500 truncate">{d.name}</span>
                  <div className="flex-1 h-2.5 rounded-full bg-sky-100/80 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#A9EEFF] to-[#38BDF8]"
                      style={{ width: `${d.value}%` }}
                    />
                  </div>
                  <span className="w-8 text-right text-[10px] font-extrabold text-slate-600">{d.value}%</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 rounded-xl bg-white/85 border border-cyan-100 p-4">
            <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400 mb-2.5">
              Quality metrics
            </p>
            <div className="space-y-1.5">
              {quality.map((q) => (
                <div key={q.metric} className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-semibold text-slate-600">{q.metric}</span>
                  <span className="text-[11px] font-extrabold text-slate-700">{q.value}</span>
                  <span
                    className={`rounded-full border px-2 py-0.5 text-[9px] font-bold ${
                      q.status === "On track"
                        ? "bg-sky-100 text-sky-700 border-sky-200"
                        : "bg-amber-100 text-amber-700 border-amber-200"
                    }`}
                  >
                    {q.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal delay={150}>
        <Eyebrow>Analytics & insights</Eyebrow>
        <h2 className="mt-5 font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-800 leading-tight">
          Turn hospital data into everyday decisions.
        </h2>
        <p className="mt-5 text-base sm:text-lg leading-relaxed text-slate-500">
          Administrators and teams track patient volumes, wait times, revenue, occupancy,
          department performance and quality indicators from one analytics layer — so reviews
          become decisions, and decisions become same-day action.
        </p>
        <div className="mt-8 space-y-4" data-testid="analytics-value-points">
          {values.map((v) => (
            <div key={v.label} className="flex items-start gap-3.5">
              <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C7F4FF] to-[#8DE9FF] border border-cyan-200/60 flex items-center justify-center shrink-0">
                <v.icon className="w-5 h-5 text-cyan-700" />
              </span>
              <div>
                <p className="text-sm font-extrabold text-slate-700">{v.label}</p>
                <p className="text-sm text-slate-500">{v.note}</p>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  </section>
);
