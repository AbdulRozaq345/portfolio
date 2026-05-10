"use client";
import { motion } from "motion/react";

const ITEMS = [
  "AVAILABLE FOR PROJECTS",
  "WEB DEVELOPMENT",
  "UI / UX DESIGN",
  "BRAND IDENTITY",
  "MOTION DESIGN",
  "BASED IN INDONESIA",
  "AVAILABLE FOR PROJECTS",
  "FULL-STACK ENGINEERING",
];

export default function MarqueeBand({
  reverse = false,
  accent = "cyan",
}: {
  reverse?: boolean;
  accent?: "cyan" | "emerald" | "violet";
}) {
  const accentColor =
    accent === "emerald"
      ? "text-emerald-300"
      : accent === "violet"
      ? "text-violet-300"
      : "text-cyan-300";

  return (
    <div className="relative w-full overflow-hidden border-y border-white/10 bg-black/60 backdrop-blur-sm py-5">
      <motion.div
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="flex whitespace-nowrap"
      >
        {[...ITEMS, ...ITEMS].map((item, i) => (
          <span
            key={i}
            className="mx-8 flex items-center gap-8 text-2xl font-bold uppercase tracking-[0.18em] text-white/85 md:text-4xl"
          >
            {item}
            <span
              className={`inline-block h-2 w-2 rounded-full ${accentColor.replace("text-", "bg-")}`}
              style={{
                boxShadow: "0 0 8px currentColor",
              }}
            />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
