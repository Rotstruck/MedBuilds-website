import {
  BedDouble,
  CalendarCheck,
  ClipboardList,
  FileText,
  HeartPulse,
  LogOut,
  Receipt,
  Stethoscope,
  UserPlus,
} from "lucide-react";
import { Eyebrow, Reveal } from "./Reveal";

const steps = [
  { icon: CalendarCheck, label: "Appointment booked", note: "Slot confirmed, token issued" },
  { icon: UserPlus, label: "Patient registered", note: "MRN created in seconds" },
  { icon: Stethoscope, label: "Doctor consultation", note: "History and vitals on screen" },
  { icon: FileText, label: "Digital prescription", note: "Signed and shared instantly" },
  { icon: BedDouble, label: "Bed assigned", note: "Ward occupancy updates live" },
  { icon: HeartPulse, label: "Vitals recorded", note: "Nurse panel feeds the chart" },
  { icon: Receipt, label: "Billing prepared", note: "Every charge already captured" },
  { icon: LogOut, label: "Checkout completed", note: "Discharge summary ready" },
];

const activity = [
  { label: "Consultation completed", time: "10:42 AM", done: true },
  { label: "Lab result ready", time: "12:15 PM", done: true },
  { label: "Vitals recorded", time: "01:30 PM", done: true },
  { label: "Billing in progress", time: "Now", done: false },
];

export const Journey = () => (
  <section id="journey" data-testid="patient-journey-section" className="relative py-20 lg:py-28 bg-[#EAF8FF] overflow-hidden">
    <div className="orb w-[500px] h-[500px] -bottom-40 -right-40 bg-[#8DE9FF]/35" />
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Reveal className="max-w-3xl">
        <Eyebrow>Patient journey</Eyebrow>
        <h2 className="mt-5 font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-800 leading-tight">
          From appointment to discharge, every touchpoint stays connected.
        </h2>
        <p className="mt-5 text-base sm:text-lg leading-relaxed text-slate-500">
          MEDBUILDS keeps reception, doctors, nursing, wards and billing synchronized across the
          full patient journey. Each completed step quietly prepares the next — so the patient
          moves forward without anyone chasing paper.
        </p>
      </Reveal>

      <div className="mt-14 grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        <div className="relative" data-testid="journey-timeline">
          <span className="absolute left-[22px] top-3 bottom-3 w-px bg-gradient-to-b from-[#8DE9FF] via-[#52D2F7] to-[#C7F4FF]" />
          <div className="space-y-5">
            {steps.map((s, i) => (
              <Reveal key={s.label} delay={i * 80}>
                <div className="relative flex items-center gap-4" data-testid={`journey-step-${i + 1}`}>
                  <span className="relative z-10 w-11 h-11 rounded-2xl bg-white/90 border border-cyan-200/70 shadow-[0_8px_20px_rgba(2,132,199,0.1)] flex items-center justify-center shrink-0">
                    <s.icon className="w-5 h-5 text-cyan-600" />
                  </span>
                  <div className="glass-panel rounded-2xl px-5 py-3 flex-1 shadow-[0_8px_24px_rgba(2,132,199,0.06)]">
                    <p className="text-sm font-bold text-slate-700">
                      <span className="text-cyan-600 mr-1.5">{String(i + 1).padStart(2, "0")}</span>
                      {s.label}
                    </p>
                    <p className="text-xs text-slate-400 font-semibold">{s.note}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={200}>
          <div
            data-testid="patient-status-card"
            className="rounded-3xl bg-gradient-to-br from-white/90 via-[#F1FAFF]/80 to-white/90 border-2 border-cyan-200/80 shadow-[0_20px_55px_rgba(2,132,199,0.14)] backdrop-blur-2xl p-7 sm:p-8 lg:sticky lg:top-28"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-display text-xl font-bold text-slate-800">Rahul Verma</p>
                <p className="text-xs font-semibold text-slate-400 mt-0.5">MRN 20477 · Male, 42</p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#A9EEFF] to-[#74D8FF] px-3 py-1.5 text-[11px] font-extrabold text-cyan-900 shadow-[0_6px_16px_rgba(82,210,247,0.35)]">
                <span className="live-dot w-1.5 h-1.5 rounded-full bg-cyan-700" />
                Admitted
              </span>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-white/80 border border-cyan-100 px-4 py-3">
                <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">Ward / Bed</p>
                <p className="text-sm font-extrabold text-slate-700 mt-0.5">General B · Bed 12</p>
              </div>
              <div className="rounded-2xl bg-white/80 border border-cyan-100 px-4 py-3">
                <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">Attending doctor</p>
                <p className="text-sm font-extrabold text-slate-700 mt-0.5">Dr. Mehta · Cardiology</p>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400 mb-3">
                Latest activity
              </p>
              <div className="space-y-2.5">
                {activity.map((a) => (
                  <div
                    key={a.label}
                    className="flex items-center gap-3 rounded-xl bg-white/75 border border-cyan-100/80 px-4 py-2.5"
                  >
                    <span
                      className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                        a.done
                          ? "bg-gradient-to-br from-[#8DE9FF] to-[#38BDF8]"
                          : "live-dot bg-amber-400"
                      }`}
                    />
                    <p className="text-sm font-semibold text-slate-600 flex-1">{a.label}</p>
                    <span className={`text-[11px] font-bold ${a.done ? "text-slate-400" : "text-amber-600"}`}>
                      {a.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-5 text-xs leading-relaxed text-slate-400 font-semibold">
              Every department sees this same card — reception, the doctor, the ward nurse and the
              billing desk, all in step.
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);
