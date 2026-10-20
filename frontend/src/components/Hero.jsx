import { Activity, ArrowRight, Play, ShieldCheck, Sparkles } from "lucide-react";
import { Reveal } from "./Reveal";
import {
  BedsCard,
  HeartRateCard,
  IcuCard,
  LaptopMockup,
  PhoneMockup,
  Spo2Card,
  TabletMockup,
} from "./Mockups";

const eyebrowPills = [
  "Hospital management made smarter",
  "EMR + OPD + IPD + Billing",
  "Built for Indian hospitals",
];

const credibility = [
  { icon: ShieldCheck, label: "Role-based secure access" },
  { icon: Sparkles, label: "Trusted by growing hospitals" },
  { icon: Activity, label: "Live vitals & occupancy" },
];

export const Hero = () => (
  <section id="top" data-testid="hero-section" className="relative overflow-hidden">
    <div className="orb w-[520px] h-[520px] -top-40 -left-40 bg-[#A9EEFF]/50" />
    <div className="orb w-[620px] h-[620px] top-10 -right-52 bg-[#74D8FF]/40" />
    <div className="orb w-[380px] h-[380px] bottom-0 left-1/3 bg-[#D5F3FF]/70" />

    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 lg:pt-36 pb-16 lg:pb-24 grid lg:grid-cols-2 gap-14 items-center">
      <div>
        <Reveal>
          <div className="flex flex-wrap gap-2" data-testid="hero-eyebrow-pills">
            {eyebrowPills.map((pill) => (
              <span
                key={pill}
                className="inline-flex items-center gap-1.5 rounded-full glass-panel px-3.5 py-1.5 text-[11px] font-bold text-slate-600"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#52D2F7] to-[#0EA5E9]" />
                {pill}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={100}>
          <h1 className="mt-6 font-display text-4xl sm:text-5xl lg:text-[3.6rem] font-extrabold tracking-tight leading-[1.08] text-slate-800">
            See your entire hospital on{" "}
            <span className="text-gradient">one intelligent screen.</span>
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <p className="mt-6 text-base sm:text-lg leading-relaxed text-slate-500 max-w-xl">
            MEDBUILDS connects your front desk, doctors, nursing, wards, billing and analytics
            inside one hospital operating system. Teams move faster, collaborate in real time,
            and care for patients with live visibility across every department.
          </p>
        </Reveal>

        <Reveal delay={300}>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              data-testid="hero-book-demo-btn"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-[#52D2F7] to-[#38BDF8] shadow-[0_14px_34px_rgba(82,210,247,0.4)] hover:shadow-[0_18px_44px_rgba(82,210,247,0.55)] hover:-translate-y-0.5 transition-all duration-300"
            >
              Book a live demo <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#platform"
              data-testid="hero-explore-platform-btn"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold text-cyan-700 glass-panel shadow-[0_8px_24px_rgba(2,132,199,0.08)] hover:shadow-[0_14px_34px_rgba(2,132,199,0.16)] hover:-translate-y-0.5 transition-all duration-300"
            >
              <Play className="w-4 h-4" /> Explore platform
            </a>
          </div>
        </Reveal>

        <Reveal delay={400}>
          <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3" data-testid="hero-credibility-pills">
            {credibility.map((c) => (
              <span key={c.label} className="inline-flex items-center gap-2 text-xs font-bold text-slate-500">
                <c.icon className="w-4 h-4 text-cyan-500" />
                {c.label}
              </span>
            ))}
          </div>
        </Reveal>
      </div>

      <Reveal delay={250} className="relative">
        <div className="relative h-[520px] sm:h-[560px] lg:h-[600px]" data-testid="hero-mockup-composition">
          <div className="absolute top-6 right-0 w-[88%] z-10">
            <LaptopMockup />
          </div>
          <div className="absolute bottom-24 -left-1 sm:left-0 w-[44%] z-20">
            <TabletMockup />
          </div>
          <div className="absolute bottom-0 right-1 w-[33%] z-30">
            <PhoneMockup />
          </div>
          <HeartRateCard className="absolute -top-2 left-0 sm:left-2 z-40 animate-float" />
          <IcuCard className="absolute top-[34%] -right-1 sm:right-0 z-40 animate-float-slow" />
          <BedsCard className="absolute bottom-40 left-[38%] z-40 animate-float-delay" />
          <Spo2Card className="absolute bottom-2 left-[34%] sm:left-[38%] z-40 animate-float-slow" />
        </div>
      </Reveal>
    </div>
  </section>
);
