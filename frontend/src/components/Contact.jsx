import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import {
  ArrowRight,
  CheckCircle2,
  GitBranch,
  HeartHandshake,
  Lightbulb,
  Loader2,
  Zap,
} from "lucide-react";
import { Eyebrow, Reveal } from "./Reveal";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const gains = [
  { icon: GitBranch, label: "Fewer silos", note: "Departments share one live record" },
  { icon: Zap, label: "Faster workflows", note: "Less typing, fewer queues, quicker handovers" },
  { icon: Lightbulb, label: "Clearer decisions", note: "Live numbers replace end-of-day guesswork" },
  { icon: HeartHandshake, label: "Better patient experience", note: "Smoother movement from desk to discharge" },
];

const initialForm = {
  hospital: "",
  name: "",
  role: "",
  city: "",
  email: "",
  phone: "",
  challenge: "",
};

const inputClass =
  "w-full rounded-xl border border-cyan-200/70 bg-white/80 px-4 py-3 text-sm font-semibold text-slate-700 placeholder:text-slate-400 placeholder:font-medium focus:outline-none focus:ring-2 focus:ring-cyan-300/60 focus:border-cyan-300 transition";

export const Contact = () => {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API}/demo-requests`, form);
      setSubmitted(true);
      toast.success("Demo request received. Our team will reach out shortly.");
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" data-testid="contact-section" className="relative py-20 lg:py-28 overflow-hidden">
      <div className="orb w-[540px] h-[540px] -bottom-52 -left-52 bg-[#A9EEFF]/45" />
      <div className="orb w-[420px] h-[420px] top-0 -right-40 bg-[#74D8FF]/30" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-3xl">
          <Eyebrow>Book a demo</Eyebrow>
          <h2 className="mt-5 font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-800 leading-tight">
            Ready to make your hospital feel more connected?
          </h2>
        </Reveal>

        <div className="mt-12 grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <Reveal delay={100}>
            <p className="text-base sm:text-lg leading-relaxed text-slate-500">
              See MEDBUILDS running on your own workflows — OPD, IPD, vitals, billing and analytics —
              in a guided 30-minute walkthrough. We will map the demo to your facility's size,
              departments and the challenges your team faces today.
            </p>
            <div
              data-testid="contact-gains-card"
              className="mt-8 rounded-3xl glass-panel shadow-[0_16px_45px_rgba(2,132,199,0.1)] p-7 sm:p-8 space-y-5"
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-cyan-700">
                What your hospital gains
              </p>
              {gains.map((g) => (
                <div key={g.label} className="flex items-start gap-4">
                  <span className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#C7F4FF] to-[#8DE9FF] border border-cyan-200/60 flex items-center justify-center shrink-0">
                    <g.icon className="w-5 h-5 text-cyan-700" />
                  </span>
                  <div>
                    <p className="text-sm font-extrabold text-slate-700">{g.label}</p>
                    <p className="text-sm text-slate-500">{g.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="rounded-3xl bg-gradient-to-br from-white/95 via-[#F1FAFF]/85 to-white/95 border-2 border-cyan-200/80 shadow-[0_24px_60px_rgba(2,132,199,0.14)] backdrop-blur-2xl p-7 sm:p-9">
              {submitted ? (
                <div data-testid="demo-form-success" className="py-10 text-center">
                  <span className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-[#A9EEFF] to-[#52D2F7] flex items-center justify-center shadow-[0_12px_30px_rgba(82,210,247,0.4)]">
                    <CheckCircle2 className="w-8 h-8 text-white" />
                  </span>
                  <h3 className="mt-6 font-display text-2xl font-bold text-slate-800">
                    Your demo is on its way.
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-500 max-w-sm mx-auto">
                    Thank you, {form.name.split(" ")[0] || "there"} Our team will reach out
                    within one working day to schedule your walkthrough of MEDBUILDS.
                  </p>
                  <button
                    data-testid="demo-form-reset-btn"
                    onClick={() => {
                      setForm(initialForm);
                      setSubmitted(false);
                    }}
                    className="mt-6 text-sm font-bold text-cyan-600 hover:text-cyan-700 transition-colors"
                  >
                    Submit another request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} data-testid="demo-request-form" className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="demo-hospital" className="block text-xs font-bold text-slate-500 mb-1.5">
                        Hospital / clinic
                      </label>
                      <input
                        id="demo-hospital"
                        data-testid="demo-form-hospital-input"
                        required
                        value={form.hospital}
                        onChange={update("hospital")}
                        placeholder="City Care Hospital"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="demo-name" className="block text-xs font-bold text-slate-500 mb-1.5">
                        Your name
                      </label>
                      <input
                        id="demo-name"
                        data-testid="demo-form-name-input"
                        required
                        value={form.name}
                        onChange={update("name")}
                        placeholder="Dr. Asha Nair"
                        className={inputClass}
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="demo-role" className="block text-xs font-bold text-slate-500 mb-1.5">
                        Role
                      </label>
                      <select
                        id="demo-role"
                        data-testid="demo-form-role-select"
                        required
                        value={form.role}
                        onChange={update("role")}
                        className={inputClass}
                      >
                        <option value="" disabled>
                          Select your role
                        </option>
                        <option>Hospital administrator</option>
                        <option>Doctor</option>
                        <option>Reception / front desk</option>
                        <option>Nursing lead</option>
                        <option>Owner / management</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="demo-city" className="block text-xs font-bold text-slate-500 mb-1.5">
                        City
                      </label>
                      <input
                        id="demo-city"
                        data-testid="demo-form-city-input"
                        required
                        value={form.city}
                        onChange={update("city")}
                        placeholder="Pune"
                        className={inputClass}
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="demo-email" className="block text-xs font-bold text-slate-500 mb-1.5">
                        Email
                      </label>
                      <input
                        id="demo-email"
                        type="email"
                        data-testid="demo-form-email-input"
                        required
                        value={form.email}
                        onChange={update("email")}
                        placeholder="you@hospital.in"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="demo-phone" className="block text-xs font-bold text-slate-500 mb-1.5">
                        Phone / WhatsApp
                      </label>
                      <input
                        id="demo-phone"
                        data-testid="demo-form-phone-input"
                        required
                        value={form.phone}
                        onChange={update("phone")}
                        placeholder="+91 98XXX XXXXX"
                        className={inputClass}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="demo-challenge" className="block text-xs font-bold text-slate-500 mb-1.5">
                      Main challenge today
                    </label>
                    <textarea
                      id="demo-challenge"
                      data-testid="demo-form-challenge-input"
                      rows={3}
                      value={form.challenge}
                      onChange={update("challenge")}
                      placeholder="e.g. Long OPD queues, scattered records, slow discharge billing…"
                      className={`${inputClass} resize-none`}
                    />
                  </div>
                  <button
                    type="submit"
                    data-testid="demo-form-submit-btn"
                    disabled={loading}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-[#52D2F7] to-[#38BDF8] shadow-[0_14px_34px_rgba(82,210,247,0.4)] hover:shadow-[0_18px_44px_rgba(82,210,247,0.55)] hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-60 disabled:hover:translate-y-0"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Scheduling…
                      </>
                    ) : (
                      <>
                        Schedule my demo <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                  <p className="text-center text-[11px] font-semibold text-slate-400">
                    No commitment. A guided walkthrough mapped to your facility.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
