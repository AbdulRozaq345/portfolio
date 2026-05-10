"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
  AnimatePresence,
} from "motion/react";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/navigation";

// Repeat array until we have `n` items
function fill<T>(arr: T[], n: number): T[] {
  if (!arr.length) return [];
  const out: T[] = [];
  while (out.length < n) out.push(...arr);
  return out.slice(0, n);
}

export const HeroParallax = ({
  products,
}: {
  products: {
    title: string;
    link: string;
    thumbnail: string[];
  }[];
}) => {
  const filled = fill(products, 12);
  const firstRow = filled.slice(0, 4);
  const secondRow = filled.slice(4, 8);
  const thirdRow = filled.slice(8, 12);

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const spring = { stiffness: 280, damping: 28, bounce: 0 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1200]),
    spring,
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1200]),
    spring,
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [22, 0]),
    spring,
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.15, 1]),
    spring,
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [24, 0]),
    spring,
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-900, 0]),
    spring,
  );

  return (
    <div
      ref={ref}
      className="relative flex h-[200vh] w-screen max-w-full flex-col overflow-hidden py-16 antialiased
        [perspective:1200px] [transform-style:preserve-3d]
        md:h-[240vh] md:py-24"
    >
      {/* Ambient glow background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-cyan-500/[0.06] blur-[120px]" />
        <div className="absolute right-0 top-1/2 h-[400px] w-[400px] rounded-full bg-emerald-500/[0.05] blur-[100px]" />
      </div>

      <Header />

      <motion.div
        style={{ rotateX, rotateZ, translateY, opacity }}
        className="w-full max-w-full"
      >
        {/* Row 1 — slides right */}
        <motion.div className="mb-16 flex flex-row-reverse space-x-reverse space-x-16 md:mb-20 md:space-x-20">
          {firstRow.map((product, i) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={`r1-${i}`}
            />
          ))}
        </motion.div>

        {/* Row 2 — slides left */}
        <motion.div className="mb-16 flex flex-row space-x-16 md:mb-20 md:space-x-20">
          {secondRow.map((product, i) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={`r2-${i}`}
            />
          ))}
        </motion.div>

        {/* Row 3 — slides right */}
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-16 md:space-x-20">
          {thirdRow.map((product, i) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={`r3-${i}`}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Header = () => {
  const t = useTranslations("project");
  return (
    <div className="relative mx-auto mb-16 flex w-full max-w-7xl flex-col gap-6 px-4 py-10 md:py-20">
      {/* Badge */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-400"
      >
        Selected Work
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.08 }}
        className="text-3xl font-bold dark:text-white md:text-7xl"
      >
        {t.rich("title", { br: () => <br /> })}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="max-w-2xl text-sm leading-7 text-neutral-400 md:text-lg"
      >
        {t("text")}
      </motion.p>

      {/* CTA button */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.22 }}
        className="mt-2 md:absolute md:right-4 md:top-20"
      >
        <Link href="/work" className="block">
          <button
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 px-6 py-4 text-sm font-bold text-gray-100 transition-all duration-500
              hover:border-cyan-400/40 hover:text-cyan-300
              before:absolute before:right-2 before:top-2 before:h-10 before:w-10 before:rounded-full before:bg-violet-500 before:blur-lg before:transition-all before:duration-500
              after:absolute after:right-6 after:top-3 after:h-14 after:w-14 after:rounded-full after:bg-rose-300/20 after:blur-lg after:transition-all after:duration-500
              hover:before:-bottom-6 hover:before:right-10 hover:before:blur-[28px] hover:before:bg-violet-600
              hover:after:-right-6 hover:after:bg-rose-400/30"
          >
            <span className="relative z-20 flex items-center gap-3">
              {t("btn")}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </span>
          </button>
        </Link>
      </motion.div>
    </div>
  );
};

export const ProductCard = ({
  product,
  translate,
}: {
  product: { title: string; link: string; thumbnail: string[] };
  translate: MotionValue<number>;
}) => {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (product.thumbnail.length <= 1) return;
    timerRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % product.thumbnail.length);
    }, 3000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [product.thumbnail]);

  return (
    <motion.div
      style={{ x: translate }}
      whileHover={{ y: -16, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group/card relative h-[22rem] w-[24rem] shrink-0 overflow-hidden rounded-2xl
        border border-white/[0.07] bg-neutral-950
        shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_8px_40px_rgba(0,0,0,0.5)]
        transition-shadow duration-500
        hover:border-cyan-400/25
        hover:shadow-[0_0_30px_rgba(71,255,224,0.12),0_16px_60px_rgba(0,0,0,0.6)]
        md:h-[26rem] md:w-[30rem]"
    >
      <a href={product.link} target="_blank" rel="noopener noreferrer" className="block h-full w-full">
        {/* Image carousel */}
        <AnimatePresence mode="wait">
          <motion.img
            key={product.thumbnail[index]}
            src={product.thumbnail[index]}
            alt={product.title}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="absolute inset-0 h-full w-full object-cover object-left-top"
          />
        </AnimatePresence>

        {/* Hover overlay */}
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 transition-opacity duration-400 group-hover/card:opacity-100" />

        {/* Title */}
        <div className="absolute bottom-0 left-0 w-full translate-y-2 p-6 opacity-0 transition-all duration-400 group-hover/card:translate-y-0 group-hover/card:opacity-100">
          <div className="mb-2 h-[1px] w-10 bg-cyan-400" />
          <h2 className="text-lg font-bold text-white">{product.title}</h2>
          <p className="mt-1 flex items-center gap-1.5 text-xs font-medium text-cyan-400">
            <span>View project</span>
            <svg viewBox="0 0 12 12" fill="none" className="h-3 w-3" stroke="currentColor" strokeWidth={2}>
              <path d="M2 10L10 2M10 2H4M10 2V8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </p>
        </div>

        {/* Carousel dots */}
        {product.thumbnail.length > 1 && (
          <div className="absolute right-4 top-4 z-20 flex gap-1.5">
            {product.thumbnail.map((_, i) => (
              <div
                key={i}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === index
                    ? "w-5 bg-cyan-400 shadow-[0_0_6px_#47FFE0]"
                    : "w-2 bg-white/25"
                }`}
              />
            ))}
          </div>
        )}

        {/* Corner glow on hover */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 ring-1 ring-inset ring-cyan-400/20 transition-opacity duration-500 group-hover/card:opacity-100" />
      </a>
    </motion.div>
  );
};
