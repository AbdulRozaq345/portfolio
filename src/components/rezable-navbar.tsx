"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";
import CurvedLoop from "./CurvedLoop";

export function NavbarDemo() {
  const navItems = [
    {
      name: "HOME",
      link: "/#home",
    },
    {
      name: "ABOUT",
      link: "/#about",
    },

    {
      name: "SERVICES",
      link: "/#services",
    },
  ];

  const link = [
    {
      id: 1,
      link: "https://wa.me/6285122908813",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative w-full ">
      <Navbar>
        {/* Desktop Navigation */}

        <NavBody>
          <NavbarLogo />
          <div className="bg-gray-800 opacity-90 w-[480px] h-10  rounded-full flex items-center justify-center">
            <NavItems
              items={navItems}
              className="!text-white h-full relative flex items-center"
            />
          </div>
          {link.map((item) => (
            <a key={item.id} href={item.link} className="cursor-target block">
              <div className="hidden md:flex gap-4">
                <div className="border border-white/20 h-10 w-44 rounded-full flex items-center px-4 gap-3 bg-black/40 overflow-hidden">
                  <div className="relative flex h-2 w-2 flex-shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </div>
                  <div className="flex-1 mt-2 overflow-hidden">
                    <CurvedLoop
                      marqueeText="Available for work ✦ Available for work ✦ "
                      speed={3}
                      curveAmount={0}
                      direction="left"
                      interactive={false}
                      className="text-[8rem] font-medium text-gray-200  p-0"
                    />
                  </div>
                </div>
              </div>
            </a>
          ))}
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
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
                className="relative text-neutral-100 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                Login
              </NavbarButton>
              Book a call
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {/* Navbar */}
    </div>
  );
}
