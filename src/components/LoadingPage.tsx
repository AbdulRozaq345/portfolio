"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const LoadingScene = dynamic(() => import("@/components/three/LoadingScene"), {
  ssr: false,
});

export default function LoadingPage() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const duration = 3000;
    let raf: number;
    const loop = () => {
      const elapsed = performance.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out
      const eased = 1 - Math.pow(1 - progress, 3);
      setPct(Math.floor(eased * 100));
      if (progress < 1) raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-black font-sans">
      {/* Three.js animated tunnel */}
      <LoadingScene />

      {/* Subtle vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.85)_100%)]" />

      {/* Background radial glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[100px]" />

      {/* Top brand bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute left-6 top-6 flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.4em] text-white/40 md:left-10 md:top-10"
      >
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400 shadow-[0_0_8px_#47FFE0]" />
        nexxacode / booting
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="absolute right-6 top-6 font-mono text-[10px] uppercase tracking-[0.4em] text-white/40 md:right-10 md:top-10"
      >
        v.2026
      </motion.div>

      {/* Spinning rings + logo */}
      <div className="relative z-10 mb-8 h-32 w-32">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full"
          style={{
            border: "2px solid transparent",
            borderTopColor: "#47FFE0",
            borderRightColor: "rgba(71,255,224,0.3)",
          }}
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 3.8, repeat: Infinity, ease: "linear" }}
          className="absolute inset-2 rounded-full"
          style={{
            border: "1px solid transparent",
            borderTopColor: "#34D399",
            borderLeftColor: "rgba(52,211,153,0.25)",
          }}
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-3 rounded-full"
          style={{
            border: "1px dashed rgba(167,139,250,0.18)",
          }}
        />
        <div
          className="absolute inset-0 rounded-full"
          style={{ border: "1px solid rgba(255,255,255,0.06)" }}
        />

        <motion.div
          animate={{
            opacity: [0.7, 1, 0.7],
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Image
            src="/nexxa.avif"
            alt="nexxacode logo"
            width={62}
            height={62}
            priority
            className="rounded-full drop-shadow-[0_0_18px_rgba(71,255,224,0.4)]"
          />
        </motion.div>
      </div>

      {/* Label + dots */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="z-10 mb-8 flex flex-col items-center gap-3"
      >
        <p className="text-[10px] font-semibold uppercase tracking-[0.45em] text-white/35">
          Loading Experience
        </p>
        <div className="flex items-center gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0.25, 1, 0.25], scale: [0.7, 1.3, 0.7] }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.22,
                ease: "easeInOut",
              }}
              className="h-1 w-1 rounded-full bg-cyan-400"
            />
          ))}
        </div>
      </motion.div>

      {/* Progress bar with percentage */}
      <div className="relative z-10 w-56 md:w-72">
        <div className="mb-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
          <span>Init</span>
          <span className="text-cyan-300">{pct.toString().padStart(3, "0")}%</span>
        </div>
        <div className="relative h-px w-full bg-white/10">
          <motion.div
            className="absolute top-0 left-0 h-px bg-cyan-400"
            style={{
              width: `${pct}%`,
              boxShadow: "0 0 8px #47FFE0, 0 0 18px rgba(71,255,224,0.35)",
            }}
          />
          <motion.div
            className="absolute top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400"
            style={{
              left: `${pct}%`,
              boxShadow: "0 0 10px #47FFE0, 0 0 20px rgba(71,255,224,0.5)",
            }}
          />
        </div>
        <div className="mt-3 font-mono text-[9px] tracking-[0.3em] text-white/25">
          {pct < 25
            ? "INITIALIZING_SHADERS"
            : pct < 55
            ? "LOADING_GEOMETRY"
            : pct < 85
            ? "COMPILING_SCENE"
            : "READY_TO_LAUNCH"}
        </div>
      </div>

      {/* Bottom corner ticks */}
      <div className="pointer-events-none absolute bottom-6 left-6 font-mono text-[9px] uppercase tracking-[0.4em] text-white/25 md:bottom-10 md:left-10">
        / lat 0.06s
      </div>
      <div className="pointer-events-none absolute bottom-6 right-6 font-mono text-[9px] uppercase tracking-[0.4em] text-white/25 md:bottom-10 md:right-10">
        webgl /  three.js
      </div>
    </div>
  );
}
