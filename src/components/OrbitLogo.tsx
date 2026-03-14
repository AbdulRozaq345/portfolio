import React from "react";
import Image from "next/image";

const OrbitCircle = () => {
  return (
    <div className="relative flex items-center justify-center right-2 w-140 h-140 border border-dashed border-white/40 rounded-full animate-[spin_10s_linear_infinite]">
      <div className=" w-80 h-80 border border-dashed border-white/40 rounded-full "></div>
      <Image
        className=" absolute w-50 h-50 object-contain animate-[spin_10s_linear_infinite] "
        src="/react.png"
        alt="react icon"
        width={200}
        height={200}
      />
      {/* Bungkus Logo Figma biar gampang ngatur posisinya */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Image
          src="/Figma-Emblem.png"
          alt="figma"
          className="w-30 h-15 animate-[spin_10s_linear_infinite_reverse]"
          width={120}
          height={60}
        />
      </div>

      {/* Bungkus Logo Laravel di sisi berlawanan */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
        <Image
          src="/laravel.png"
          alt="laravel"
          className="w-16 h-16 animate-[spin_10s_linear_infinite_reverse]"
          width={64}
          height={64}
        />
      </div>
    </div>
  );
};

export default OrbitCircle;
