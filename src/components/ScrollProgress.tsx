"use client";
import { useScroll, useSpring, motion } from "motion/react";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX, transformOrigin: "0%" }}
      className="fixed left-0 right-0 top-0 z-[60] h-[2px] bg-gradient-to-r from-cyan-400 via-emerald-400 to-violet-400"
    >
      <div
        className="absolute inset-0"
        style={{
          boxShadow:
            "0 0 8px rgba(71,255,224,0.7), 0 0 16px rgba(71,255,224,0.35)",
        }}
      />
    </motion.div>
  );
}
