"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CircularText from "./CircularText";
import { faArrowDownLong } from "@fortawesome/free-solid-svg-icons";

const services = [
  {
    number: "01",
    title: "SEO Optimization",
    description:
      "We elevate your digital presence by aligning search intent with technical precision, ensuring your brand ranks where it matters most.",
    detail:
      "Focused on keyword strategy, technical site audits, and high-authority backlink architecture.",
    meta: "Ahrefs, Google Search Console, On-page/Off-page SEO",
    accent: "from-cyan-400/30 via-cyan-300/10 to-transparent",
  },
  {
    number: "02",
    title: "WEB DEVELOPMENT",
    description:
      "I could transform static designs into websites that are fast, responsive, and feel premium across every screen size.",
    detail:
      "Clean builds, organized component structure, and a consistent user experience throughout.",
    meta: "Next.js, responsive build, production-ready frontend",
    accent: "from-cyan-400/30 via-cyan-300/10 to-transparent",
  },

  {
    number: "03",
    title: "System Maintenance",
    description:
      "We keep your digital assets running at peak performance, providing a secure and seamless experience through proactive updates and monitoring.",
    detail:
      "Focused on security patching, database optimization, and real-time performance tuning.",
    meta: "Uptime monitoring, Security audits, Automated backups",
    accent: "from-cyan-400/30 via-cyan-300/10 to-transparent",
  },
];

export default function Services() {
  return (
    <section className="relative min-h-screen w-full overflow-visible border-y border-emerald-900/60 bg-slate-950 px-6 py-16 md:px-10 md:py-20 lg:px-16 lg:py-24">
      <div className="relative left-0 right-0 flex items-center justify-center self-center -translate-y-12 lg:self-center md:-translate-y-16 ">
        <div className="absolute h-36 w-36 rounded-full border border-emerald-500/30 bg-[linear-gradient(229deg,rgba(33,33,33,1)_0%,rgba(13,13,13,1)_44%,rgba(31,181,103,1)_100%)] shadow-[0_0_60px_rgba(16,185,129,0.2)]" />
        <div className="absolute z-10">
          <CircularText
            text="WEB*PROGRAMMING*"
            onHover="speedUp"
            spinDuration={20}
            className="md:scale-65 text-lg font-bold text-white text-sm"
          />
        </div>
        <FontAwesomeIcon
          icon={faArrowDownLong}
          size="2x"
          className="z-20 text-white"
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.14),transparent_30%),radial-gradient(circle_at_80%_55%,rgba(34,211,238,0.12),transparent_24%)]" />
      <div className="absolute left-1/2 top-28 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="mx-auto mt-12  flex w-full max-w-7xl flex-col gap-14 lg:gap-20">
        <div className="grid items-end gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-400">
                How Can I Help?
              </p>
              <div className="space-y-5">
                <h2 className="max-w-2xl text-5xl font-semibold leading-none text-white md:text-7xl lg:text-8xl">
                  Services
                </h2>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm">
              <p className="text-3xl font-semibold text-white">3+</p>
              <p className="mt-2 text-sm uppercase tracking-[0.25em] text-slate-400">
                Service Tracks
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm">
              <p className="text-3xl font-semibold text-white">Fast</p>
              <p className="mt-2 text-sm uppercase tracking-[0.25em] text-slate-400">
                Delivery Focus
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm">
              <p className="text-3xl font-semibold text-white">Clean</p>
              <p className="mt-2 text-sm uppercase tracking-[0.25em] text-slate-400">
                UI + Frontend
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
          {services.map((service) => (
            <article
              key={service.number}
              className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-white/20 hover:bg-white/[0.07] lg:p-9"
            >
              <div
                className={`absolute inset-x-0 top-0 h-28 bg-gradient-to-b ${service.accent} opacity-80 transition-opacity duration-300 group-hover:opacity-100`}
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0)_28%)] opacity-60" />

              <div className="relative flex h-full flex-col">
                <div className="mb-8 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-px w-10 bg-white/20" />
                    <span className="text-base font-semibold text-emerald-300">
                      {service.number}
                    </span>
                  </div>
                  <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.25em] text-slate-300">
                    Premium
                  </span>
                </div>

                <div className="mb-8 space-y-5">
                  <h3 className="text-3xl font-semibold leading-tight text-white lg:text-4xl">
                    {service.title}
                  </h3>
                  <p className="text-base leading-7 text-slate-300">
                    {service.description}
                  </p>
                  <p className="text-sm leading-6 text-slate-400">
                    {service.detail}
                  </p>
                </div>

                <div className="mt-auto flex items-center justify-between gap-4 border-t border-white/10 pt-6">
                  <p className="max-w-[15rem] text-sm text-slate-400">
                    {service.meta}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="flex flex-col items-start justify-between gap-6 rounded-[2rem] border border-white/10 bg-white/[0.04] px-8 py-7 backdrop-blur-sm md:flex-row md:items-center">
          <div className="space-y-2">
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-400">
              Need a stronger landing page?
            </p>
            <p className="max-w-2xl text-lg leading-7 text-slate-200">
              If you want, I can take this further with a proper CTA connected
              to WhatsApp, email, or a contact form that fits the flow of the
              page.
            </p>
          </div>
          <a
            href="#contact"
            className="inline-flex cursor-target items-center gap-3 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-200 transition-colors hover:border-emerald-300/60 hover:bg-emerald-400/20"
          >
            Let&apos;s Talk
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 17L17 7M17 7H7M17 7V17"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
