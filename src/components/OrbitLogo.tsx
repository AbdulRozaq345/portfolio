"use client";
import { motion } from "motion/react";

const OUTER_R = 150;
const INNER_R = 90;

function dotPos(r: number, angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { left: r + r * Math.cos(rad), top: r + r * Math.sin(rad) };
}

// Multiple glowing dots around each ring — replaces the logos
const OUTER_DOTS = [
  { angle: -90, color: "#47FFE0", size: 7 },
  { angle: 30, color: "#34d399", size: 6 },
  { angle: 150, color: "#06b6d4", size: 6 },
  { angle: 210, color: "#a78bfa", size: 5 },
];

const INNER_DOTS = [
  { angle: -90, color: "#47FFE0", size: 6 },
  { angle: 90, color: "#34d399", size: 7 },
];

export default function OrbitCircle() {
  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: OUTER_R * 2 + 60, height: OUTER_R * 2 + 60 }}
    >
      {/* Ambient background glow */}
      <motion.div
        animate={{ opacity: [0.12, 0.3, 0.12], scale: [1, 1.08, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute rounded-full bg-cyan-400 blur-[90px]"
        style={{ width: 220, height: 220 }}
      />

      {/* ── Outer orbit ring ── */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        className="absolute rounded-full border border-dashed border-white/[0.12]"
        style={{
          width: OUTER_R * 2,
          height: OUTER_R * 2,
          boxShadow:
            "0 0 24px rgba(71,255,224,0.05), inset 0 0 24px rgba(71,255,224,0.03)",
        }}
      >
        {OUTER_DOTS.map((d, i) => {
          const { left, top } = dotPos(OUTER_R, d.angle);
          return (
            <motion.div
              key={i}
              animate={{
                opacity: [0.4, 1, 0.4],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 2 + i * 0.3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.25,
              }}
              style={{
                position: "absolute",
                left,
                top,
                transform: "translate(-50%, -50%)",
                width: d.size,
                height: d.size,
                borderRadius: "50%",
                background: d.color,
                boxShadow: `0 0 8px ${d.color}, 0 0 18px ${d.color}80`,
              }}
            />
          );
        })}
      </motion.div>

      {/* ── Inner orbit ring ── */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute rounded-full border border-dashed border-emerald-500/[0.2]"
        style={{
          width: INNER_R * 2,
          height: INNER_R * 2,
          boxShadow: "0 0 16px rgba(52,211,153,0.05)",
        }}
      >
        {INNER_DOTS.map((d, i) => {
          const { left, top } = dotPos(INNER_R, d.angle);
          return (
            <motion.div
              key={i}
              animate={{
                opacity: [0.5, 1, 0.5],
                scale: [0.8, 1.3, 0.8],
              }}
              transition={{
                duration: 1.6 + i * 0.4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
              style={{
                position: "absolute",
                left,
                top,
                transform: "translate(-50%, -50%)",
                width: d.size,
                height: d.size,
                borderRadius: "50%",
                background: d.color,
                boxShadow: `0 0 8px ${d.color}, 0 0 18px ${d.color}80`,
              }}
            />
          );
        })}
      </motion.div>

      {/* ── Static faint middle ring ── */}
      <div
        className="absolute rounded-full border border-white/[0.04]"
        style={{
          width: OUTER_R + INNER_R,
          height: OUTER_R + INNER_R,
        }}
      />

      {/* ── Pulsing center core (no logo) ── */}
      <motion.div
        animate={{
          boxShadow: [
            "0 0 20px rgba(71,255,224,0.25), 0 0 60px rgba(71,255,224,0.10)",
            "0 0 38px rgba(71,255,224,0.55), 0 0 100px rgba(71,255,224,0.22)",
            "0 0 20px rgba(71,255,224,0.25), 0 0 60px rgba(71,255,224,0.10)",
          ],
          scale: [1, 1.08, 1],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 h-3 w-3 rounded-full bg-cyan-300"
      />
    </div>
  );
}
