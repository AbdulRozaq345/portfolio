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

  {
    title: "Editorially",
    link: "https://editorially.org",
    thumbnail: [
      "https://www.aceternity.com/images/products/thumbnails/new/editorially.png",
    ],
  },
  {
    title: "Editrix AI",
    link: "https://editrix.ai",
    thumbnail: [
      "https://www.aceternity.com/images/products/thumbnails/new/editrix.png",
    ],
  },

  {
    title: "SmartBridge",
    link: "https://smartbridgetech.com",
    thumbnail: [
      "https://www.aceternity.com/images/products/thumbnails/new/smartbridge.png",
    ],
  },
  {
    title: "Renderwork Studio",
    link: "https://renderwork.studio",
    thumbnail: [
      "https://www.aceternity.com/images/products/thumbnails/new/renderwork.png",
    ],
  },

  {
    title: "Creme Digital",
    link: "https://cremedigital.com",
    thumbnail: [
      "https://www.aceternity.com/images/products/thumbnails/new/cremedigital.png",
    ],
  },
  {
    title: "Golden Bells Academy",
    link: "https://goldenbellsacademy.com",
    thumbnail: [
      "https://www.aceternity.com/images/products/thumbnails/new/goldenbellsacademy.png",
    ],
  },
];
