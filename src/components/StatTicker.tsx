"use client";
import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

type Stat = {
  value: number;
  suffix?: string;
  label: string;
};

const STATS: Stat[] = [
  { value: 25, suffix: "+", label: "Projects Delivered" },
  { value: 7, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "%", label: "Client Satisfaction" },
  { value: 24, suffix: "/7", label: "Support Available" },
];

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1600;
    const start = performance.now();
    let raf: number;
    const tick = () => {
      const p = Math.min((performance.now() - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

export default function StatTicker() {
  return (
    <div className="relative w-full border-y border-white/10 bg-black/60 backdrop-blur-md">
      <div className="mx-auto grid max-w-7xl grid-cols-2 divide-y divide-x divide-white/10 md:grid-cols-4 md:divide-y-0">
        {STATS.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="group relative px-6 py-10 md:px-10 md:py-14"
          >
            <div className="flex items-baseline gap-1 font-serif text-5xl font-bold text-white md:text-6xl">
              <CountUp to={s.value} suffix={s.suffix} />
            </div>
            <p className="mt-3 text-[11px] font-mono uppercase tracking-[0.25em] text-white/40">
              {s.label}
            </p>
            <div className="absolute left-0 top-0 h-px w-0 bg-gradient-to-r from-cyan-400 to-emerald-400 transition-all duration-700 group-hover:w-full" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
