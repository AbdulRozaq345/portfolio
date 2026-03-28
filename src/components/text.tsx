'use client';

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";



export default function Text() {
  const t = useTranslations('about');
  const keys = ["0", "1", "2", "3", "4", "5", "6", "7"] as const;
    return (
      <div className=" text-white p-10 font-sans ">
        <div className="max-w-4xl mx-auto border-t border-white/20">
          {keys.map((key, index) => (
            <motion.div
              key={key}
              whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
              className="flex items-start gap-8 py-10 border-b border-white/20 group cursor-default transition-colors"
            >
              <div className="flex-shrink-0 w-10 h-10 border border-white/30 flex items-center justify-center text-sm font-bold group-hover:border-[#47FFE0] group-hover:text-[#47FFE0]">
                {index + 1}
              </div>
              <p className="text-xl leading-relaxed text-gray-300 group-hover:text-white transition-colors">
                {t(`items.${key}`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    );
}