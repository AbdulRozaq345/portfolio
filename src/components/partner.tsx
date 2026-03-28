"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Partner() {
  const t = useTranslations("partners");

  const partner = [
    { id: 1, image: "/raditya.avif" },
    { id: 2, image: "/fathir.avif" },
    { id: 3, image: "/fang.avif" },
  ];

  return (
    <section className="w-full py-24 bg-white/80 flex flex-col items-center justify-center">
      <div className="text-center mb-16 px-4">
        <motion.h5
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-emerald-400 font-mono tracking-[0.3em] text-sm mb-4 uppercase"
        >
          {t("badge")}
        </motion.h5>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold text-black font-serif"
        >
          {t("title")}
        </motion.h2>

        <div className="mt-16 flex flex-wrap justify-center gap-8 md:gap-12 max-w-6xl px-6">
          {partner.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group relative w-full md:w-[300px] h-[400px] rounded-3xl overflow-hidden border border-white/10 bg-zinc-900/50 backdrop-blur-sm"
            >
              <div className="absolute inset-0 grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out">
                <Image
                  src={item.image}
                  alt={t(`list.${index}.name`)}
                  fill
                  unoptimized
                  className="object-cover object-center transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80" />
              </div>
              <div className="absolute bottom-0 left-0 p-8 w-full translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <motion.div
                  className="h-1 w-12 bg-emerald-500 mb-4"
                  layoutId={`line-${item.id}`}
                />
                <h3 className="text-2xl font-bold text-white mb-1 tracking-tight">
                  {t(`list.${index}.name`)}
                </h3>
                <p className="text-emerald-400 font-mono text-sm uppercase tracking-widest mb-4">
                  {t(`list.${index}.role`)}
                </p>

                {/* Hidden text that reveals on hover */}
                <div className="max-h-0 opacity-0 group-hover:max-h-20 group-hover:opacity-100 transition-all duration-500 ease-in-out">
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {t(`list.${index}.desc`)}
                  </p>
                </div>
              </div>
              <div className="absolute inset-0 border-2 border-emerald-500/0 group-hover:border-emerald-500/30 rounded-3xl transition-colors duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
      <div className="absolute top-[30rem] -z-10 hidden h-100 w-full rounded-full bg-cyan-400 opacity-30 blur-2xl md:block md:w-full"></div>
    </section>
  );
}
