import { CalendarClock, Check, HeartPulse, LayoutDashboard, Stethoscope } from "lucide-react";
import { Eyebrow, Reveal } from "./Reveal";

const AdminMini = () => (
  <div className="grid grid-cols-3 gap-1.5">
    {[
      { l: "OPD today", v: "212" },
      { l: "IPD census", v: "84" },
      { l: "Dues", v: "₹38K" },
    ].map((k) => (
      <div key={k.l} className="rounded-lg bg-white/85 border border-cyan-100 px-2 py-1.5">
        <p className="text-[7px] font-bold uppercase text-slate-400">{k.l}</p>
        <p className="text-[11px] font-extrabold text-slate-700">{k.v}</p>
      </div>
    ))}
  </div>
);

const DoctorMini = () => (
  <div className="space-y-1.5">
    {["Tab. Azithromycin 500mg — 1-0-1 × 5d", "Syr. Ambroxol — 10ml twice daily", "Review CBC report tomorrow"].map((rx) => (
      <div key={rx} className="flex items-center gap-1.5 rounded-lg bg-white/85 border border-cyan-100 px-2 py-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-[#52D2F7] shrink-0" />
        <p className="text-[8px] font-semibold text-slate-600 truncate">{rx}</p>
      </div>
    ))}
  </div>
);

const ReceptionMini = () => (
  <div className="flex items-center gap-1.5 flex-wrap">
    {["T-104", "T-105", "T-106", "T-107"].map((t, i) => (
      <span
        key={t}
        className={`rounded-lg border px-2.5 py-1.5 text-[8px] font-extrabold ${
          i === 0
            ? "bg-gradient-to-r from-[#A9EEFF] to-[#74D8FF] text-cyan-900 border-cyan-200"
            : "bg-white/85 text-slate-500 border-cyan-100"
        }`}
      >
        {t}
      </span>
    ))}
    <span className="text-[7px] font-bold text-cyan-700 ml-1">Queue moving · 4 waiting</span>
  </div>
);

const NurseMini = () => (
  <div className="grid grid-cols-4 gap-1.5">
    {[
      { l: "BP", v: "118/76" },
      { l: "HR", v: "78" },
      { l: "SpO₂", v: "97%" },
      { l: "Temp", v: "98.4°" },
    ].map((v) => (
      <div key={v.l} className="rounded-lg bg-white/85 border border-cyan-100 px-1.5 py-1.5 text-center">
        <p className="text-[7px] font-bold uppercase text-slate-400">{v.l}</p>
        <p className="text-[10px] font-extrabold text-slate-700">{v.v}</p>
      </div>
    ))}
  </div>
);

const workspaces = [
  {
    icon: LayoutDashboard,
    title: "Admin Command Center",
    copy: "Hospital-wide visibility across appointments, bed occupancy, revenue and bottlenecks — one command view for centralized operational control.",
    bullets: [
      "Monitor OPD and IPD flow",
      "Review occupancy in real time",
      "Track daily revenue and dues",
      "Respond faster to operational issues",
    ],
    Mini: AdminMini,
    testid: "workspace-card-admin",
  },
  {
    icon: Stethoscope,
    title: "Doctor Workspace",
    copy: "Assigned patients, latest vitals, digital prescriptions and complete history in one quiet view — less paperwork, faster care.",
    bullets: [
      "Review assigned patients in one view",
      "Check vitals and alerts quickly",
      "Write prescriptions digitally",
      "Track treatment progress with ease",
    ],
    Mini: DoctorMini,
    testid: "workspace-card-doctor",
  },
  {
    icon: CalendarClock,
    title: "Receptionist Portal",
    copy: "Registration, appointment scheduling, queue control and payment coordination — built for fast, calm check-ins at a busy front desk.",
    bullets: [
      "Register patients quickly",
      "Manage doctor schedules",
      "Handle queues smoothly",
      "Create invoices and follow payments",
    ],
    Mini: ReceptionMini,
    testid: "workspace-card-receptionist",
  },
  {
    icon: HeartPulse,
    title: "Staff Nurse Vitals Panel",
    copy: "Assigned beds, quick vitals entry, trends and alerts — a real-time ward workflow that keeps every reading where the team can see it.",
    bullets: [
      "Capture BP, HR, SpO₂ and temperature quickly",
      "Open bed-wise patient details",
      "Review vitals history",
      "Act on critical alerts faster",
    ],
    Mini: NurseMini,
    testid: "workspace-card-nurse",
  },
];

export const Workspaces = () => (
  <section id="workspaces" data-testid="workspaces-section" className="relative py-20 lg:py-28 overflow-hidden">
    <div className="orb w-[460px] h-[460px] top-20 -left-52 bg-[#A9EEFF]/40" />
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Reveal className="max-w-3xl mx-auto text-center">
        <Eyebrow>Role-based workspaces</Eyebrow>
        <h2 className="mt-5 font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-800 leading-tight">
          Different workspaces, one source of truth.
        </h2>
        <p className="mt-5 text-base sm:text-lg leading-relaxed text-slate-500">
          Every role gets a screen shaped around its own day — while each action updates the same
          shared record the whole hospital relies on.
        </p>
      </Reveal>

      <div className="mt-12 grid md:grid-cols-2 gap-6 lg:gap-8">
        {workspaces.map((w, i) => (
          <Reveal key={w.title} delay={(i % 2) * 120}>
            <div
              data-testid={w.testid}
              className="card-lift h-full rounded-3xl glass-panel shadow-[0_10px_40px_rgba(2,132,199,0.06)] p-7 sm:p-8"
            >
              <div className="flex items-center gap-3.5">
                <span className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#A9EEFF] to-[#52D2F7] flex items-center justify-center shadow-[0_8px_20px_rgba(82,210,247,0.35)] shrink-0">
                  <w.icon className="w-6 h-6 text-white" />
                </span>
                <h3 className="font-display text-xl font-bold text-slate-800">{w.title}</h3>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-slate-500">{w.copy}</p>
              <ul className="mt-5 grid sm:grid-cols-2 gap-x-4 gap-y-2.5">
                {w.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm font-semibold text-slate-600">
                    <Check className="w-4 h-4 text-cyan-500 mt-0.5 shrink-0" strokeWidth={3} />
                    {b}
                  </li>
                ))}
              </ul>
              <div className="mt-6 rounded-2xl border border-cyan-100/80 bg-[#F1FAFF]/80 p-3">
                <w.Mini />
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
