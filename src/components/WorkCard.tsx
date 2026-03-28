"use client";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/constans/work";
import Button1 from "./button1";
import { useTranslations } from "next-intl";

type WorkCardProps = {
  items?: Product[];
  $items?: Product[];
};

export const WorkCard = ({ items: propItems, $items }: WorkCardProps) => {
  const items = propItems ?? $items ?? [];
  const t = useTranslations("work");

  return (
    <section className="bg-slate-950 px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-16 text-5xl font-bold tracking-tighter text-white md:text-7xl">
          {t("work")}
        </h2>
        <div className="relative flex flex-col items-start justify-center mb-12 gap-16 md:gap-24 ">
        <Button1 />
        </div>


        <div className=" grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {items.map((product, index) => (
            <div key={index} className="group relative">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-[#171717] transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                <Image
                  src={product.thumbnail[0] ?? "/aikocare.png"}
                  alt={product.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="translate-y-4 rounded-full bg-white px-6 py-2 font-bold text-black transition-transform group-hover:translate-y-0">
                    View Project
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex items-center justify-between text-white">
                  <h3 className="text-2xl font-semibold">{product.title}</h3>
                  <div className="rounded-full border border-neutral-700 p-2 transition-colors group-hover:bg-white group-hover:text-black">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </div>
                </div>

                <p className="mt-2 flex items-center gap-2 text-sm text-neutral-500">
                  <span>📍 {product.location || "Global"}</span>
                </p>

                <div className="mt-6 flex justify-between border-t border-neutral-800 pt-4 text-[10px] uppercase tracking-[0.2em] text-neutral-600">
                  <span>Designed by: Nexxa</span>
                  <span>Developed by: {product.dev || "Nexxa"}</span>
                </div>
              </div>

              <Link
                href={product.link}
                target="_blank"
                rel="noreferrer"
                className="absolute inset-0 z-10"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
