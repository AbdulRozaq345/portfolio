import GradientText from "@/components/GradientText";
import { NavbarDemo } from "@/components/rezable-navbar";
import SvgComponent1 from "@/components/svg";
import SvgComponent from "@/components/svgC";
import CircularText from "@/components/CircularText";
import CurvedLoop from "@/components/CurvedLoop";

export default function Home() {
  return (
    <div className="min-h-screen font-sans dark:bg-black">
      <section className="w-full px-4 min-h-screen">
        <NavbarDemo />
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center max-w-screen ">
          <div className="md:col-span-6 flex flex-col justify-center items-center md:items-start order-2 md:order-1 text-center md:text-left">
            <div className="relative top-100 mb-6 w-full flex items-center justify-center md:justify-start md:left-12 md:top-70 ">
              {""}

              <GradientText
                colors={["#68E3AF", "#3D628F", "#91BDB1"]}
                animationSpeed={4}
                showBorder={false}
                className="text-sm md:text-base mb-2 font-serif uppercase font-bold md:absolute md:bottom-40 md:left-12"
              >
                DESIGNER & WEB DEVELOPER EXPERT
              </GradientText>

              <div className="absolute mt-55 md:mt-0 md:ml-6 md:mb-0">
                <p className="text-white text-4xl md:text-6xl font-extrabold font-serif">
                  Agency-level web development services at freelancer rates
                </p>
                <p className="text-sm mt-3">
                  My mission is to design and develop a website that you and
                  your audience love .
                </p>
              </div>
            </div>
            <div className="w-120 h-120 md:w-170 md:h-170 rounded-full bg-cyan-400 md:top-0 top-80 absolute md:m-0 md:p-0 -z-1 blur-2xl opacity-20 right-70 md:right-290 md:bottom-60 "></div>
            <div className="w-120 h-120 hidden md:block md:items-end md:justify-end  rounded-full bg-cyan-400 md:top-0 md:m-0 md:p-0 -z-1 blur-2xl absolute opacity-20 left-200  "></div>
          </div>
          <div className=" absolute flex bottom-20 inset-0 items-center justify-center md:items-end md:right-25 md:bottom-0 md:justify-end order-1 md:order-2 ">
            <SvgComponent1 />
          </div>
          <div className=" md:col-span-6 flex flex-col items-center md:items-start text-center md:text-left order-1 md:order-2 ">
            <div className="relative flex top-100 right-20 items-center justify-center md:right-150 md:top-140 ">
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

      <section className="w-full px-4 min-h-screen flex items-center justify-center">
        <CurvedLoop
          marqueeText="robin ngemut biji prabowo"
          speed={2}
          curveAmount={0}
          direction="right"
          interactive={false}
          className="custom-text-style  "
        />
      </section>
    </div>
  );
}
