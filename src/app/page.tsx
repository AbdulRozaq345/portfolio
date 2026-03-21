"use client";
import { motion, AnimatePresence } from "framer-motion";
import GradientText from "@/components/GradientText";
import { NavbarDemo } from "@/components/rezable-navbar";
import SvgComponent from "@/components/svgC";
import CircularText from "@/components/CircularText";
import CurvedLoop from "@/components/CurvedLoop";
import OrbitCircle from "@/components/OrbitLogo";
import TextHover from "@/components/TextHover";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowPointer } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import LoadingPage from "@/components/LoadingPage";
import Text from "@/components/text";
import { HeroParallaxDemo } from "@/components/hero-parallax";
import Services from "@/components/services";
import Partner from "@/components/partner";
import LetsTalk from "@/components/letsTalk";
import TargetCursor from "@/components/TargetCursor";
import Button from "@/components/button";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const link = [
    {
      id: 1,
      link: "https://wa.me/6285122908813",
    },
  ];

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
            transition={{
              duration: 1.2,
              ease: [0.76, 0, 0.24, 1],
              delay: 0.1,
            }}
            className="fixed inset-0 z-9999 bg-black"
          />
        )}
      </AnimatePresence>

      <main
        className={`min-h-screen ${loading ? "overflow-hidden h-screen" : ""}`}
      >
        <div className="min-h-screen  font-sans dark:bg-black ">
          <TargetCursor
            spinDuration={2}
            hideDefaultCursor
            parallaxOn
            hoverDuration={0.2}
          />
          <section id="home" className="z-50">
            <section className="w-full px-4 min-h-screen">
              <NavbarDemo />
              <div className="grid grid-cols-1 gap-10 items-center max-w-screen ">
                <div className=" flex flex-col justify-center items-center md:items-start order-2 md:order-1 text-center md:text-left">
                  <div className="relative top-20 mb-6 flex text-center w-full flex-col items-center justify-center md:justify-start md:left-12 md:top-80 ">
                    {""}

                    <GradientText
                      colors={["#68E3AF", "#3D628F", "#91BDB1"]}
                      animationSpeed={4}
                      showBorder={false}
                      className="text-sm md:text-base mb-2 font-serif uppercase font-bold md:absolute md:bottom-20 md:left-108"
                    >
                      DESIGNER & WEB DEVELOPER EXPERT
                    </GradientText>

                    <div className="absolute mt-55 md:mt-0 md:ml-6 md:mb-0">
                      <p className="text-white text-4xl md:text-6xl font-extrabold font-serif">
                        Agency-level web development services at freelancer
                        rates
                      </p>
                      <p className="text-sm mt-3">
                        our mission is to design and develop a website that you
                        and your audience love .
                      </p>
                    </div>
                    {link.map((item) => (
                      <a key={item.id} href={item.link} className="block">
                        <div className="flex relative cursor-target items-center justify-center top-64 md:top-56 md:scale-120 ">
                          <Button />
                        </div>
                      </a>
                    ))}
                  </div>
                  <div className="w-120 h-120 md:w-170 md:h-170 rounded-full bg-cyan-400 md:top-0 top-80 absolute md:m-0 md:p-0 -z-1 blur-2xl opacity-20 right-70 md:right-290 md:bottom-60 "></div>
                  <div className="w-120 h-120 hidden md:block md:items-end md:justify-end  rounded-full bg-cyan-400 md:top-0 md:m-0 md:p-0 -z-1 blur-2xl absolute opacity-20 left-200  "></div>
                </div>
                <div className=" md:col-span-6 flex flex-col items-center md:items-start text-center md:text-left order-1 md:order-2 ">
                  <div className="relative flex top-140 right-30 items-center justify-center md:right-0 md:top-100 ">
                    <SvgComponent />
                    <div className="absolute flex items-center justify-center pointer-events-none md:text-center md:items-center md:justify-center">
                      <CircularText
                        text="WEB*PROGRAMING*"
                        onHover="speedUp"
                        spinDuration={20}
                        className="text-white font-bold text-lg md:text-2xl scale-75 "
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="w-full px-4 min-h-screen flex flex-col items-center justify-center">
              <div className="w-full hidden md:block ">
                <CurvedLoop
                  marqueeText="NEXXACODE"
                  speed={2}
                  curveAmount={0}
                  direction="left"
                  interactive={false}
                  className="custom-text-style text-[6rem] md:text-[6rem] -translate-y-320 md:translate-y-160"
                />
              </div>
              <div className=" hidden md:flex flex-col absolute items-center top-200 left-0 p-0 m-0 justify-center w-full h-full">
                <div className="bg-cyan-300 w-120 h-80 rounded-full absolute -z-10 blur-3xl opacity-20  "></div>
                <div className="flex items-center justify-center z-20 top-0 left-0 absolute w-full h-full">
                  <div className="text-7xl flex flex-col font-semibold text-center items-center justify-center">
                    <div className="flex items-center gap-4  ">
                      <TextHover value={7} />
                      <span> YEARS OF</span>
                    </div>
                    <span>
                      EXPERIENCE IN <br /> WEB DEVELOPMENT
                    </span>
                  </div>
                </div>
                <OrbitCircle />

                <div className="left-47 relative ">
                  <FontAwesomeIcon
                    icon={faArrowPointer}
                    style={{ color: "rgb(99, 230, 190)" }}
                    className="w-7 h-7"
                  />
                </div>
              </div>
              <div
                id="about"
                className="relative flex flex-col mt-20 md:bottom-160 md:mt-0 md:top-120"
              >
                <h1 className="text-4xl font-bold font-serif text-center items-center justify-center">
                  About
                </h1>
                <div className="w-120 h-120 md:w-170 md:h-170 rounded-full bg-cyan-400 md:top-0 top-80 absolute md:m-0 md:p-0 -z-1 blur-2xl opacity-27 right-70 md:right-290 md:bottom-60 "></div>
                <div className="w-18 h-120 md:w-170 md:h-170 rounded-full bg-cyan-400 md:top-160 top-360 absolute md:m-0 md:p-0 -z-1 blur-2xl opacity-5 left-70 md:right-290 md:bottom-0  "></div>
                <Text />
              </div>
            </section>

            <section className="relative flex w-full items-center md:top-160 justify-center px-4 py-8 md:px-4 md:py-12  ">
              <div>
                <HeroParallaxDemo />
              </div>
            </section>

            <section id="services" className="relative -mt-8 w-full md:mt-160">
              <Services />
            </section>
          </section>

          <section className="md:hidden ">
            <div className="bg-white">
              <Partner />
            </div>
            <div className="bg-black">
              <LetsTalk />
            </div>
          </section>

          <section className="relative hidden w-full overflow-clip bg-black  md:block md:min-h-[220vh]">
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
