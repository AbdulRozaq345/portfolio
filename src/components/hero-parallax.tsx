"use client";
import React from "react";
import { HeroParallax } from "@/components/ui/hero-parallax";

export function HeroParallaxDemo() {
  return <HeroParallax products={products} />;
}
export const products = [
  {
    title: "AikoCare",
    link: "https://aikocare.vercel.app/",
    thumbnail: ["/aikocare.png"],
  },
  {
    title: "ThunderAi",
    link: "https://chat-ai-sigma.vercel.app/",
    thumbnail: ["/thunderAi.png"],
  },
  {
    title: "YayasanNivara",
    link: "https://yayasan-nivara-indonesia.vercel.app/",
    thumbnail: ["/yayasannivara.png"],
  },


];
