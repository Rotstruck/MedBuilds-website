import { Activity, BedDouble, Heart, HeartPulse } from "lucide-react";

const sidebarItems = [
  "Dashboard",
  "Patients",
  "Doctors",
  "Appointments",
  "Nursing",
  "Beds & Vitals",
  "Billing",
  "Reports",
];

const stats = [
  { label: "Total Patients", value: "1,284", delta: "+6%" },
  { label: "Appts Today", value: "196", delta: "+12%" },
  { label: "Beds Occupied", value: "73.6%", delta: "" },
  { label: "Revenue Today", value: "₹4.2L", delta: "+8%" },
];

const bars = [38, 55, 44, 68, 58, 84, 72];

const patients = [
  { name: "Priya Sharma", mrn: "MRN 20481", status: "Stable" },
  { name: "Rahul Verma", mrn: "MRN 20477", status: "Observe" },
  { name: "Ayesha Khan", mrn: "MRN 20470", status: "Stable" },
];

const pillStyle = {
  Stable: "bg-sky-100 text-sky-700 border-sky-200",
  Observe: "bg-amber-100 text-amber-700 border-amber-200",
  Critical: "bg-rose-100 text-rose-600 border-rose-200",
};

export const StatusPill = ({ label, className = "" }) => (
  <span
    className={`inline-flex items-center rounded-full border px-1.5 py-0.5 text-[8px] font-bold ${pillStyle[label]} ${className}`}
  >
    {label}
  </span>
);

export const LaptopMockup = () => (
  <div
    data-testid="laptop-mockup"
    className="rounded-2xl border border-cyan-200/70 bg-white/85 backdrop-blur-xl shadow-[0_30px_80px_rgba(2,132,199,0.18)] overflow-hidden"
  >
    <div className="flex items-center gap-1.5 px-3.5 py-2 border-b border-cyan-100/80 bg-white/70">
      <span className="w-2 h-2 rounded-full bg-cyan-300" />
      <span className="w-2 h-2 rounded-full bg-sky-200" />
      <span className="w-2 h-2 rounded-full bg-slate-200" />
      <span className="ml-2 text-[9px] font-semibold text-slate-400 tracking-wide">
        medbuilds.in/admin · Hospital overview
      </span>
      <span className="ml-auto inline-flex items-center gap-1 text-[8px] font-bold text-cyan-700">
        <span className="live-dot w-1.5 h-1.5 rounded-full bg-[#52D2F7]" /> LIVE
      </span>
    </div>
    <div className="flex">
      <div className="w-[96px] sm:w-[118px] shrink-0 border-r border-cyan-100/70 bg-[#F7FCFF]/90 p-2 space-y-1">
        <div className="flex items-center gap-1 px-1.5 pb-1.5">
          <span className="w-3.5 h-3.5 rounded-md bg-gradient-to-br from-[#8DE9FF] to-[#52D2F7] flex items-center justify-center">
            <Activity className="w-2.5 h-2.5 text-white" />
          </span>
          <span className="text-[8px] font-extrabold text-slate-600 tracking-tight">MEDBUILDS</span>
        </div>
        {sidebarItems.map((item, i) => (
          <div
            key={item}
            className={`text-[8px] font-semibold px-2 py-1.5 rounded-lg truncate ${
              i === 0
                ? "bg-gradient-to-r from-[#C7F4FF] to-[#A9EEFF] text-cyan-800"
                : "text-slate-400"
            }`}
          >
            {item}
          </div>
        ))}
      </div>
      <div className="flex-1 p-2.5 sm:p-3 space-y-2 min-w-0">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-bold text-slate-700">Good morning, Dr. Mehta</p>
          <span className="text-[8px] font-semibold text-slate-400">Today · OPD + IPD</span>
        </div>
        <div className="grid grid-cols-4 gap-1.5">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-lg border border-cyan-100 bg-white/80 px-1.5 py-1.5"
            >
              <p className="text-[6.5px] font-bold uppercase tracking-wide text-slate-400 truncate">
                {s.label}
              </p>
              <p className="text-[11px] sm:text-[13px] font-extrabold text-slate-700 leading-tight">
                {s.value}
                {s.delta && (
                  <span className="ml-0.5 text-[7px] font-bold text-cyan-600">{s.delta}</span>
                )}
              </p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          <div className="rounded-lg border border-cyan-100 bg-white/80 p-1.5">
            <p className="text-[7px] font-bold text-slate-500 mb-1">Appointments trend</p>
            <div className="flex items-end gap-[3px] h-9">
              {bars.map((h, i) => (
                <span
                  key={i}
                  className="flex-1 rounded-sm bg-gradient-to-t from-[#A9EEFF] to-[#52D2F7]"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-cyan-100 bg-white/80 p-1.5 flex flex-col items-center">
            <p className="text-[7px] font-bold text-slate-500 self-start mb-1">Bed occupancy</p>
            <div className="relative">
              <svg viewBox="0 0 64 64" className="w-11 h-11">
                <circle cx="32" cy="32" r="26" fill="none" stroke="#E0F2FE" strokeWidth="8" />
                <circle
                  cx="32"
                  cy="32"
                  r="26"
                  fill="none"
                  stroke="#52D2F7"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray="120.2 163.4"
                  transform="rotate(-90 32 32)"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-[8px] font-extrabold text-slate-700">
                73.6%
              </span>
            </div>
          </div>
          <div className="rounded-lg border border-cyan-100 bg-white/80 p-1.5">
            <p className="text-[7px] font-bold text-slate-500 mb-1">Revenue trend</p>
            <svg viewBox="0 0 100 36" className="w-full h-9">
              <polyline
                points="0,30 15,24 30,27 45,16 60,20 75,10 90,14 100,6"
                fill="none"
                stroke="#38BDF8"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        <div className="rounded-lg border border-cyan-100 bg-white/80 p-1.5">
          <p className="text-[7px] font-bold text-slate-500 mb-1">Recent patients</p>
          <div className="space-y-1">
            {patients.map((p) => (
              <div key={p.mrn} className="flex items-center justify-between">
                <span className="text-[8px] font-semibold text-slate-600">{p.name}</span>
                <span className="hidden sm:inline text-[7px] text-slate-400">{p.mrn}</span>
                <StatusPill label={p.status} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const beds = [
  { bed: "Bed 01", name: "Aarav Malhotra", doctor: "Dr. Rao", status: "Stable" },
  { bed: "Bed 07", name: "Rahul Verma", doctor: "Dr. Rao", status: "Observe" },
  { bed: "Bed 12", name: "Vikram Nair", doctor: "Dr. Sen", status: "Critical" },
];

export const TabletMockup = () => (
  <div
    data-testid="tablet-mockup"
    className="rounded-2xl border-[3px] border-white bg-white/90 backdrop-blur-xl shadow-[0_24px_60px_rgba(2,132,199,0.2)] overflow-hidden"
  >
    <div className="px-3 py-2 bg-gradient-to-r from-[#EAF8FF] to-[#DFF7FF] border-b border-cyan-100 flex items-center justify-between">
      <p className="text-[9px] font-extrabold text-slate-700">Ward · General B</p>
      <span className="text-[7px] font-bold text-cyan-700">Beds & Vitals</span>
    </div>
    <div className="p-2 space-y-1.5">
      {beds.map((b) => (
        <div
          key={b.bed}
          className="rounded-lg border border-cyan-100 bg-white/85 px-2 py-1.5 flex items-center justify-between gap-1"
        >
          <div className="min-w-0">
            <p className="text-[8px] font-extrabold text-slate-700">{b.bed}</p>
            <p className="text-[7px] text-slate-400 truncate">
              {b.name} · {b.doctor}
            </p>
          </div>
          <StatusPill label={b.status} />
        </div>
      ))}
    </div>
  </div>
);

const timeline = [
  { label: "Registered", done: true },
  { label: "Consultation done", done: true },
  { label: "Lab tests ordered", done: true },
  { label: "Vitals recorded", done: true },
  { label: "Discharge pending", done: false },
];

export const PhoneMockup = () => (
  <div
    data-testid="phone-mockup"
    className="rounded-[1.4rem] border-[3px] border-white bg-white/92 backdrop-blur-xl shadow-[0_24px_60px_rgba(2,132,199,0.22)] overflow-hidden"
  >
    <div className="px-3 pt-2.5 pb-2 bg-gradient-to-r from-[#C7F4FF] to-[#A9EEFF]">
      <div className="mx-auto mb-1.5 w-8 h-1 rounded-full bg-white/80" />
      <p className="text-[10px] font-extrabold text-slate-800">Rahul Verma</p>
      <p className="text-[7px] font-semibold text-slate-500">MRN 20477</p>
      <span className="mt-1 inline-flex items-center rounded-full bg-white/85 border border-cyan-200 px-1.5 py-0.5 text-[7px] font-bold text-cyan-700">
        Admitted · Bed 12
      </span>
    </div>
    <div className="p-2.5">
      <p className="text-[7px] font-bold uppercase tracking-wide text-slate-400 mb-1.5">
        Patient timeline
      </p>
      <div className="space-y-1.5">
        {timeline.map((t, i) => (
          <div key={t.label} className="flex items-center gap-1.5">
            <span
              className={`w-2 h-2 rounded-full shrink-0 ${
                t.done
                  ? "bg-gradient-to-br from-[#8DE9FF] to-[#38BDF8]"
                  : "border-2 border-slate-200 bg-white"
              }`}
            />
            <span
              className={`text-[8px] font-semibold ${t.done ? "text-slate-600" : "text-slate-400"}`}
            >
              {t.label}
            </span>
            {i === timeline.length - 1 && (
              <span className="ml-auto text-[6.5px] font-bold text-amber-600">In progress</span>
            )}
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const EcgLine = () => (
  <svg viewBox="0 0 120 32" className="w-full h-7" aria-hidden="true">
    <path
      d="M0 16 L18 16 L24 9 L30 23 L36 4 L42 28 L48 16 L66 16 L72 10 L78 22 L84 16 L120 16"
      fill="none"
      stroke="#38BDF8"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="ecg-path"
    />
  </svg>
);

export const HeartRateCard = ({ className = "" }) => (
  <div data-testid="float-card-heart-rate" className={`glass-flash rounded-2xl p-3 w-36 sm:w-44 ${className}`}>
    <div className="flex items-center justify-between">
      <p className="text-[9px] font-bold uppercase tracking-wide text-slate-400">Heart Rate</p>
      <Heart className="w-3.5 h-3.5 text-sky-500" />
    </div>
    <p className="font-display text-xl sm:text-2xl font-extrabold text-slate-800 leading-tight">
      78 <span className="text-[10px] font-bold text-slate-400">bpm</span>
    </p>
    <EcgLine />
    <p className="text-[8px] font-semibold text-cyan-700">Stable recovery trend</p>
  </div>
);

export const IcuCard = ({ className = "" }) => (
  <div data-testid="float-card-icu" className={`glass-flash rounded-2xl p-3 w-36 sm:w-44 ${className}`}>
    <div className="flex items-center gap-2">
      <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#8DE9FF] to-[#52D2F7] flex items-center justify-center">
        <HeartPulse className="w-4 h-4 text-white" />
      </span>
      <p className="text-[10px] font-extrabold text-slate-700">ICU Monitoring</p>
    </div>
    <p className="mt-1.5 text-[8px] font-semibold text-slate-400">
      Critical cases surfaced instantly
    </p>
  </div>
);

export const BedsCard = ({ className = "" }) => (
  <div data-testid="float-card-beds" className={`glass-flash rounded-2xl p-3 w-36 sm:w-44 ${className}`}>
    <div className="flex items-center justify-between">
      <p className="text-[9px] font-bold uppercase tracking-wide text-slate-400">Beds Occupied</p>
      <BedDouble className="w-3.5 h-3.5 text-sky-500" />
    </div>
    <p className="font-display text-xl sm:text-2xl font-extrabold text-slate-800 leading-tight">73.6%</p>
    <div className="my-1.5 h-1.5 rounded-full bg-sky-100 overflow-hidden">
      <div className="h-full w-[73.6%] rounded-full bg-gradient-to-r from-[#8DE9FF] to-[#38BDF8]" />
    </div>
    <p className="text-[8px] font-semibold text-cyan-700">Live occupancy across wards</p>
  </div>
);

export const Spo2Card = ({ className = "" }) => (
  <div data-testid="float-card-spo2" className={`glass-flash rounded-2xl p-3 w-32 sm:w-40 ${className}`}>
    <div className="flex items-center justify-between">
      <p className="text-[9px] font-bold uppercase tracking-wide text-slate-400">SpO₂</p>
      <span className="live-dot w-2 h-2 rounded-full bg-[#52D2F7]" />
    </div>
    <p className="font-display text-xl sm:text-2xl font-extrabold text-slate-800 leading-tight">97%</p>
    <p className="text-[8px] font-semibold text-cyan-700">Updated 10 seconds ago</p>
  </div>
);
