"use client";
import { motion, AnimatePresence } from "framer-motion";
import GradientText from "@/components/GradientText";
import { NavbarDemo } from "@/components/rezable-navbar";
import SvgComponent from "@/components/svgC";
import CircularText from "@/components/CircularText";
import OrbitCircle from "@/components/OrbitLogo";
import TextHover from "@/components/TextHover";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowPointer } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import LoadingPage from "@/components/LoadingPage";
import Text from "@/components/text";
import ProjectCards from "@/components/ProjectCards";
import Services from "@/components/services";
import Partner from "@/components/partner";
import LetsTalk from "@/components/letsTalk";
import TargetCursor from "@/components/TargetCursor";
import Button from "@/components/button";
import ScrollProgress from "@/components/ScrollProgress";
import MarqueeBand from "@/components/MarqueeBand";
import StatTicker from "@/components/StatTicker";
import MagneticButton from "@/components/MagneticButton";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";

const HeroCanvas = dynamic(
  () => import("@/components/three/HeroCanvas"),
  { ssr: false },
);
const GlobalBackground = dynamic(
  () => import("@/components/three/GlobalBackground"),
  { ssr: false },
);
const SkillsSphere = dynamic(
  () => import("@/components/three/SkillsSphere"),
  { ssr: false },
);

export default function Home() {
  const [loading, setLoading] = useState(true);
  const t = useTranslations("home");

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const waLink = "https://wa.me/6285122908813";

  return (
    <>
      <AnimatePresence mode="wait">
        {loading ? (
          <LoadingPage key="loading" />
        ) : (
          <motion.div
            key="curtain"
            initial={{ y: 0 }}
            animate={{ y: "-100vh" }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
            className="fixed inset-0 z-[9998] bg-black"
          />
        )}
      </AnimatePresence>

      <ScrollProgress />

      <main className={`min-h-screen ${loading ? "h-screen overflow-hidden" : ""}`}>
        {/* Global Three.js background — sits behind everything */}
        <GlobalBackground />

        <div className="relative min-h-screen font-sans dark:bg-black">
          <TargetCursor spinDuration={2} hideDefaultCursor parallaxOn hoverDuration={0.2} />

          {/* ── HOME + ABOUT ─────────────────────────────────────────── */}
          <section id="home" className="relative z-10">

            {/* ── Hero ─────────────────────────────────────────────────── */}
            <section className="relative w-full min-h-screen overflow-hidden px-4">
              <HeroCanvas />

              {/* CSS ambient glows above Three.js canvas */}
              <div
                className="pointer-events-none absolute right-[30%] top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-cyan-400/20 blur-[100px]"
                style={{ zIndex: 1 }}
              />
              <div
                className="pointer-events-none absolute left-[10%] top-[20%] hidden h-[300px] w-[300px] rounded-full bg-cyan-500/10 blur-[80px] md:block"
                style={{ zIndex: 1 }}
              />

              {/* Floating corner labels — desktop */}
              <div className="pointer-events-none absolute left-6 top-24 z-[2] hidden font-mono text-[10px] uppercase tracking-[0.4em] text-white/35 md:block md:left-10 md:top-28">
                <span className="mr-2 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400 align-middle shadow-[0_0_6px_#34d399]" />
                online · Kediri
              </div>
              <div className="pointer-events-none absolute right-6 top-24 z-[2] hidden font-mono text-[10px] uppercase tracking-[0.4em] text-white/35 md:block md:right-10 md:top-28">
                portfolio / 2026
              </div>

              {/* Content */}
              <div className="relative" style={{ zIndex: 2 }}>
                <NavbarDemo />
                <div className="grid grid-cols-1 items-center gap-10 max-w-screen">
                  <div className="flex flex-col items-center justify-center md:items-start order-2 md:order-1 text-center md:text-left">
                    <div className="relative top-20 mb-6 flex w-full flex-col items-center justify-center text-center md:items-start md:justify-start md:left-23 md:top-68">
                      <GradientText
                        colors={["#68E3AF", "#3D628F", "#91BDB1"]}
                        animationSpeed={4}
                        showBorder={false}
                        className="text-sm md:text-base mb-2 font-serif uppercase font-bold md:absolute md:bottom-20 md:left-108"
                      >
                        {t("title")}
                      </GradientText>

                      <div className="absolute mt-55 md:mt-0 md:ml-6 md:mb-0">
                        <p className="text-white text-4xl md:text-6xl font-extrabold font-serif drop-shadow-[0_0_30px_rgba(71,255,224,0.18)]">
                          {t("subtitle1")}
                        </p>
                        <p className="text-sm mt-3 text-white/65">{t("subtitle2")}</p>
                      </div>

                      <a href={waLink} className="block">
                        <MagneticButton className="flex relative cursor-target items-center justify-center top-64 md:top-56 md:scale-120 md:flex md:items-center md:justify-center md:left-120">
                          <Button />
                        </MagneticButton>
                      </a>
                    </div>
                  </div>

                  <div className="md:col-span-6 flex flex-col items-center md:items-start text-center md:text-left order-1 md:order-2">
                    <div className="relative flex top-140 right-30 items-center justify-center md:right-0 md:top-100">
                      <SvgComponent />
                      <div className="absolute flex items-center justify-center pointer-events-none">
                        <CircularText
                          text="WEB*PROGRAMING*"
                          onHover="speedUp"
                          spinDuration={20}
                          className="text-white font-bold text-lg md:text-2xl scale-75"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom scroll indicator */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5, duration: 0.8 }}
                  className="pointer-events-none absolute bottom-6 left-1/2 z-[2] -translate-x-1/2 flex flex-col items-center gap-2"
                >
                  <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-white/40">
                    scroll
                  </span>
                  <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                    className="h-6 w-px bg-gradient-to-b from-cyan-400 to-transparent"
                  />
                </motion.div>
              </div>
            </section>

            {/* ── Marquee band: visual divider that fills empty space ── */}
            <MarqueeBand />

            {/* ── Stat ticker — adds density right after hero ── */}
            <StatTicker />

            {/* ── About / Stats Section ─────────────────────────────────── */}
            <section className="relative w-full min-h-screen overflow-hidden px-4 py-20 md:py-28">
              {/* Background glow */}
              <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/[0.08] blur-[120px]" />

              {/* ── DESKTOP: 3D Skills Sphere + Stats side by side ── */}
              <div className="hidden md:flex items-center justify-center gap-16 xl:gap-24 w-full relative z-10">
                {/* Stats */}
                <div className="flex flex-col gap-2">
                  <div className="text-6xl xl:text-7xl flex items-center gap-4 font-semibold">
                    <TextHover value={7} />
                    <span className="drop-shadow-[0_0_20px_rgba(71,255,224,0.25)]">
                      {t("rotatedText1")}
                    </span>
                  </div>
                  <p className="text-5xl xl:text-6xl font-semibold leading-tight">
                    {t("rotatedText2")}
                    <br />
                    {t("rotatedText3")}
                  </p>
                  <div className="mt-4 self-end">
                    <FontAwesomeIcon
                      icon={faArrowPointer}
                      style={{ color: "rgb(99, 230, 190)" }}
                      className="w-6 h-6"
                    />
                  </div>
                </div>

                {/* 3D Sphere with logo + Orbit overlay */}
                <div className="relative h-[460px] w-[460px] xl:h-[520px] xl:w-[520px] flex items-center justify-center">
                  <SkillsSphere />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <OrbitCircle />
                  </div>
                </div>
              </div>

              {/* ── MOBILE: stack vertically with sphere ── */}
              <div className="md:hidden flex flex-col items-center gap-8 relative z-10 pt-12">
                <div className="text-5xl flex items-center gap-3 font-semibold">
                  <TextHover value={7} />
                  <span>{t("rotatedText1")}</span>
                </div>
                <p className="text-3xl font-semibold leading-tight text-center">
                  {t("rotatedText2")}
                  <br />
                  {t("rotatedText3")}
                </p>
                <div className="relative h-[340px] w-[340px] flex items-center justify-center">
                  <SkillsSphere />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none scale-90">
                    <OrbitCircle />
                  </div>
                </div>
              </div>

              {/* ── About content ── */}
              <div
                id="about"
                className="relative flex flex-col mt-20 md:mt-24 z-10"
              >
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="text-4xl font-bold font-serif text-center"
                >
                  {t("about")}
                </motion.h1>
                <Text />
              </div>
            </section>

            {/* ── Marquee divider before projects ── */}
            <MarqueeBand reverse accent="emerald" />


            {/* ── Project Cards (replaces parallax) ── */}
            <section className="relative w-full bg-black/40">
              <ProjectCards />
            </section>

            {/* ── Services ── */}
            <section id="services" className="relative w-full">
              <Services />
            </section>
          </section>

          {/* ── MOBILE: Partner + Let's Talk ── */}
          <section className="md:hidden">
            <div className="bg-white">
              <Partner />
            </div>
            <div className="bg-black">
              <LetsTalk />
            </div>
          </section>

          {/* ── DESKTOP: sticky Let's Talk + Partner ── */}
          <section className="relative hidden w-full overflow-clip bg-black md:block md:min-h-[220vh]">
            <div className="sticky top-0 h-screen w-full">
              <LetsTalk />
            </div>
            <div className="relative z-10 -mt-[100vh] min-h-[120vh] bg-white">
              <Partner />
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
