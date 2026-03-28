"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "../lib/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export function NavbarDemo() {
  const t = useTranslations("navbar");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const navItems = [
    { name: t("home"), link: "#home" },
    { name: t("about"), link: "#about" },
    { name: t("services"), link: "#services" },
  ];

  // Fungsi sakti buat ganti bahasa
  const handleLanguageChange = (nextLocale: "en" | "id") => {
    router.replace(pathname, { locale: nextLocale });
    setIsLangOpen(false);
  };

  return (
    <div className="relative w-full">
      <Navbar>
        <NavBody>
          <NavbarLogo />
          <div className="bg-gray-800/90 border border-white/10 backdrop-blur-md w-auto px-4 h-10 rounded-full flex items-center justify-center">
            <NavItems
              items={navItems}
              className="text-white! h-full relative flex items-center"
            />
          </div>

          {/* WRAPPER DROPDOWN BAHASA */}
          <div
            className="relative hidden md:block"
            onMouseEnter={() => setIsLangOpen(true)}
            onMouseLeave={() => setIsLangOpen(false)}
          >
            <div className="cursor-target border border-white/20 h-10 w-48 rounded-full flex items-center px-4 gap-3 bg-black/40 overflow-hidden hover:border-emerald-500/50 transition-colors">
              <div className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </div>

              {/* Teks Status / Bahasa */}
              <div className="flex-1 flex items-center justify-between mt-0.5">
                <span className="text-[10px] font-bold text-white tracking-widest uppercase">
                  {locale === "id" ? "Bahasa Indonesia" : "English Mode"}
                </span>
                <ChevronDown
                  className={`w-3 h-3 text-white transition-transform duration-300 ${isLangOpen ? "rotate-180" : ""}`}
                />
              </div>
            </div>

            {/* FLOATING MENU */}
            <AnimatePresence>
              {isLangOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-12 right-0 w-40 bg-zinc-900 border border-white/10 rounded-2xl p-2 shadow-2xl z-50 backdrop-blur-xl"
                >
                  <button
                    onClick={() => handleLanguageChange("id")}
                    className={`w-full text-left px-4 py-2 rounded-xl text-[10px] font-bold tracking-tighter uppercase transition-all ${locale === "id" ? "bg-emerald-500/20 text-emerald-400" : "text-gray-400 hover:bg-white/5 hover:text-white"}`}
                  >
                    Indonesia
                  </button>
                  <button
                    onClick={() => handleLanguageChange("en")}
                    className={`w-full text-left px-4 py-2 rounded-xl text-[10px] font-bold tracking-tighter uppercase transition-all ${locale === "en" ? "bg-emerald-500/20 text-emerald-400" : "text-gray-400 hover:bg-white/5 hover:text-white"}`}
                  >
                    English
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <div className="flex items-center gap-4">
              {/* Switcher Cepat di Mobile */}
              <button
                onClick={() =>
                  handleLanguageChange(locale === "id" ? "en" : "id")
                }
                className="text-[10px] font-bold text-emerald-400 border border-emerald-400/30 px-2 py-1 rounded-lg uppercase"
              >
                {locale}
              </button>
              <MobileNavToggle
                isOpen={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
            </div>
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-100 dark:text-neutral-100"
              >
                <span className="block text-2xl font-bold uppercase">
                  {item.name}
                </span>
              </a>
            ))}
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}
