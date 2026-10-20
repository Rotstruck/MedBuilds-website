import { useEffect, useRef, useState } from "react";

export const Reveal = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export const Eyebrow = ({ children }) => (
  <span className="inline-flex items-center gap-2 rounded-full glass-panel px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-cyan-700">
    <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#52D2F7] to-[#0EA5E9]" />
    {children}
  </span>
);
