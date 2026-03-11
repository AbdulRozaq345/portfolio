'use client';

import { motion } from "framer-motion";

const services = [
  {
    id: 1,
    text: "Infrastructure & Government Systems Specialist – Extensive experience in managing and maintaining server infrastructures for various local government agencies, ensuring high availability and seamless public service operations.",
  },
  {
    id: 2,
    text: "Dedicated Cyber Security Division – A specialized unit focused on system penetration testing, sensitive data auditing, and robust server protection to mitigate external digital threats for both public and corporate sectors.",
  },
  {
    id: 3,
    text: "Advanced UI/UX Design & Digital Architecture – Defining new visual standards through deep user experience research, delivering modern, exclusive, and highly intuitive interfaces that prioritize user engagement.",
  },
  {
    id: 4,
    text: "Fullstack Web Engineering – Developing high-performance web ecosystems using PHP, JavaScript, and Laravel, capable of handling large-scale data traffic with absolute responsiveness.",
  },
  {
    id: 5,
    text: "Clean Code & Scalable Architecture – Prioritizing organized and maintainable code structures, ensuring every digital product we build is ready for seamless future scaling and feature integration.",
  },
  {
    id: 6,
    text: "Digital Conversion & Strategic Marketing Design – Crafting result-oriented visual strategies that help clients boost business conversion rates through a powerful and optimized digital presence.",
  },
  {
    id: 7,
    text: "Interactive Motion & Visual Experience – Bringing a new dimension to the web through premium animations, Lottie integrations, and unique interactions that create a lasting impression on every user.",
  },
  {
    id: 8,
    text: "Digital Innovation & Security-First Strategy – Integrating the latest technological innovations with advanced cyber security to provide future-proof digital solutions for modern businesses.",
  },
];

export default function Text() {
    return (
      <div className=" text-white p-10 font-sans ">
        <div className="max-w-4xl mx-auto border-t border-white/20">
          {services.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
              className="flex items-start gap-8 py-10 border-b border-white/20 group cursor-default transition-colors"
            >
              <div className="flex-shrink-0 w-10 h-10 border border-white/30 flex items-center justify-center text-sm font-bold group-hover:border-[#47FFE0] group-hover:text-[#47FFE0]">
                {item.id}
              </div>
              <p className="text-xl leading-relaxed text-gray-300 group-hover:text-white transition-colors">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    );
}