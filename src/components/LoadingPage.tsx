"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function LoadingPage() {
  return (
    <div className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-black font-sans ">
      <div className="relative w-24 h-24 border border-white/10 rounded-full flex items-center justify-center">
        <Image
          src="/nexxa.avif"
          alt="nexxacode logo"
          width={80}
          height={80}
          priority
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="mt-8 text-white tracking-[0.3rem] font-bold text-sm"
      >
        Loading...
      </motion.div>

      <div className="absolute bottom-50 w-64 h-0.5 bg-[#D9D9D9]/20">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 3, ease: "easeInOut" }}
          className="h-full bg-[#47FFE0] shadow-[0_0_10px_#47FFE0]"
        />
      </div>
    </div>
  );
}
