"use client";

import CurvedLoop from "./CurvedLoop";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWhatsapp,
  faLinkedinIn,
  faInstagramSquare,
} from "@fortawesome/free-brands-svg-icons";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

const links = [
  {
    id: 1,
    link: "https://wa.me/6285122908813",
    logo: faWhatsapp,
    name: "WhatsApp",
  },
  {
    id: 2,
    link: "https://www.linkedin.com/in/nexxacode-id-4064873a2/",
    logo: faLinkedinIn,
    name: "LinkedIn",
  },
  {
    id: 3,
    link: "https://www.instagram.com/nexxacodeid?igsh=MTRtdnJ4bXAxaWtodw==",
    logo: faInstagramSquare,
    name: "Instagram",
  },
];

export default function LetsTalk() {
  return (
    <section className="relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-black px-4 py-16 text-white md:h-screen md:px-6">
      <div>
        <div className=" hidden md:flex absolute inset-x-0 top-1/2 -translate-y-1/2 opacity-30">
          <CurvedLoop
            marqueeText="Let's Talk Let's Talk Let's Talk Let's Talk Let's Talk Let's Talk Let's Talk Let's Talk "
            speed={2}
            curveAmount={0}
            direction="left"
            interactive={false}
            className="custom-text-style text-[7rem] md:text-[12rem] font-bold uppercase"
          />
        </div>
      </div>
      <div className=" md:hidden relative z-10 flex max-w-3xl flex-col items-center text-center">
        <p className="mb-3 text-xs uppercase tracking-[0.4em] text-cyan-300 md:text-sm">
          Open for projects
        </p>
        <h2 className="cursor-target font-serif text-4xl font-bold uppercase md:text-7xl">
          Let&apos;s Talk
        </h2>
        <p className="mt-4 text-sm text-white/70 md:text-base">
          Tell me what you want to build and let&apos;s make the next section
          count.
        </p>
      </div>
      <div className="mt-12 flex w-full max-w-6xl flex-col rounded-[2rem] border border-white/20 md:mt-80 md:flex-row md:rounded-full">
        {links.map((link) => (
          <a
            key={link.id}
            href={link.link}
            target="_blank"
            className="group relative flex flex-1 cursor-target items-center justify-center gap-3 border-b border-white/20 py-6 transition-all duration-500 hover:bg-[#0a1a1a] rounded-full last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0 md:py-8"
          >
            <FontAwesomeIcon
              icon={link.logo}
              className="w-5 h-5 text-white group-hover:text-cyan-400 transition-colors"
            />
            <span className="text-white font-bold uppercase tracking-widest text-sm group-hover:text-cyan-400 transition-colors">
              {link.name}
            </span>
            <FontAwesomeIcon
              icon={faArrowUpRightFromSquare}
              className="w-3 h-3 text-white/50 group-hover:text-cyan-400"
            />
          </a>
        ))}
      </div>

      <div className="mx-auto mt-10 flex w-full max-w-6xl flex-col items-center justify-between border-t border-white/10 pt-8 text-sm text-gray-400 md:mt-20 md:flex-row md:pt-10">
        <div className="flex items-center gap-10">
          <h2 className="text-white text-2xl font-bold tracking-tighter">
            nexxacode
          </h2>
          <p>hello@nexxacode.site</p>
        </div>

        <div className="mt-5 md:mt-0 flex gap-4">
          <p>Nexxa Code | 2026 © All Rights Reserved</p>
        </div>
      </div>
    </section>
  );
}
