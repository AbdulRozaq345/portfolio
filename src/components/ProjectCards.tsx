"use client";
import { motion } from "motion/react";
import { Link } from "@/lib/navigation";
import { useTranslations } from "next-intl";

const PROJECTS = [
  {
    title: "AikoCare",
    link: "https://aikocare.vercel.app/",
    thumbnail: "/aikocare.png",
    tag: "Healthcare",
    desc: "Modern healthcare platform with intuitive UI/UX",
  },
  {
    title: "ThunderAi",
    link: "https://chat-ai-sigma.vercel.app/",
    thumbnail: "/thunderAi.png",
    tag: "AI · Chat",
    desc: "AI-powered conversational interface (Demo)",
  },
  {
    title: "YayasanNivara",
    link: "https://yayasan-nivara-indonesia.vercel.app/",
    thumbnail: "/yayasannivara.png",
    tag: "Foundation",
    desc: "Non-profit foundation web presence for Indonesia",
  },
  {
    title: "Nocturn",
    link: "https://nocturn-pro.vercel.app/",
    thumbnail: "/nocturn.png",
    tag: "Music Player",
    desc: "Nocturn is a web-based music player designed for a seamless and immersive listening experience — right from your browser, no installation needed.",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export default function ProjectCards() {
  const t = useTranslations("project");

  return (
    <section className="w-full px-4 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-cyan-400"
            >
              Selected Work
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="text-3xl font-bold text-white md:text-5xl"
            >
              {t.rich("title", { br: () => <br /> })}
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link href="/work">
              <button className="group flex cursor-target items-center gap-2.5 rounded-full border border-white/[0.12] bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-white/60 transition-all duration-300 hover:border-cyan-400/40 hover:bg-cyan-400/[0.07] hover:text-cyan-300">
                {t("btn")}
                <svg
                  className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                  viewBox="0 0 14 14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    d="M1 7h12M8 2l5 5-5 5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </Link>
          </motion.div>
        </div>

        {/* ── Card Grid ──────────────────────────────────────────────────── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5"
        >
          {PROJECTS.map((project, i) => (
            <motion.div key={project.title} variants={cardVariants}>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block h-[260px] overflow-hidden rounded-2xl border border-white/[0.07] bg-neutral-950 cursor-target
                  transition-all duration-500
                  hover:border-cyan-400/[0.22]
                  hover:shadow-[0_0_40px_rgba(71,255,224,0.08),0_24px_60px_rgba(0,0,0,0.55)]
                  md:h-[340px]"
              >
                {/* Background image */}
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />

                {/* Gradient overlay — always on */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                {/* Hover tint */}
                <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Index number (top-left) */}
                <div className="absolute left-5 top-5 text-[11px] font-mono font-semibold text-white/25">
                  {String(i + 1).padStart(2, "0")}
                </div>

                {/* Bottom content */}
                <div className="absolute bottom-0 left-0 w-full px-5 pb-5 pt-8 md:px-6 md:pb-6">
                  {/* Tag */}
                  <div className="mb-2.5 inline-flex items-center rounded-full border border-white/[0.1] bg-white/[0.05] px-2.5 py-[3px] text-[10px] font-medium uppercase tracking-wider text-white/40">
                    {project.tag}
                  </div>

                  {/* Title + arrow row */}
                  <div className="flex items-end justify-between gap-3">
                    <h3 className="text-lg font-bold leading-tight text-white md:text-xl">
                      {project.title}
                    </h3>
                    {/* Arrow button */}
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/[0.1] bg-black/50 backdrop-blur-sm transition-all duration-300 group-hover:border-cyan-400/40 group-hover:bg-cyan-400/[0.1]">
                      <svg
                        className="h-3.5 w-3.5 text-white/40 transition-colors duration-300 group-hover:text-cyan-400"
                        viewBox="0 0 12 12"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          d="M2 10L10 2M10 2H4M10 2V8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Description — slides in on hover */}
                  <div className="grid transition-all duration-500 [grid-template-rows:0fr] group-hover:[grid-template-rows:1fr]">
                    <div className="overflow-hidden">
                      <p className="mt-2 text-sm leading-relaxed text-white/45">
                        {project.desc}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Neon ring on hover */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 ring-1 ring-inset ring-cyan-400/[0.18] transition-opacity duration-500 group-hover:opacity-100" />
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
