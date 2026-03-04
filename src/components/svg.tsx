"use client";
import * as React from "react";
const SvgComponent1 = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <>
      <div className="block md:hidden">
        <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={361}
    height={378}
    fill="none"
    {...props}
  >
    <path
      fill="#6BE3E3"
      d="M361 154.067c0 71.794-60.468 129.995-135.06 129.995-74.591 0-135.06-58.201-135.06-129.995 0-71.795 60.469-129.996 135.06-129.996 74.592 0 135.06 58.201 135.06 129.996Z"
    />
    <ellipse
      cx={203.536}
      cy={265.522}
      fill="#85C7F6"
      rx={125.908}
      ry={87.893}
    />
    <ellipse
      cx={135.059}
      cy={209.898}
      fill="#6548CE"
      rx={135.059}
      ry={129.995}
    />
    <path fill="url(#a-mobile)" d="M56.657 0H319.41v317.734H56.657z" />
    <ellipse cx={194.7} cy={341.429} fill="#000" rx={103.819} ry={36.571} />
    <defs>
      <pattern
        id="a-mobile"
        width={1}
        height={1}
        patternContentUnits="objectBoundingBox"
      >
        <use xlinkHref="#b-mobile" transform="scale(.0022 .00182)" />
      </pattern>
      <image
        href="/image.png"
        id="b-mobile"
        width={454}
        height={549}
        preserveAspectRatio="none"
      />
    </defs>
  </svg>
      </div>

      <div className="hidden md:block">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width={572}
          height={628}
          fill="none"
          {...props}
        >
          <path
            fill="#6BE3E3"
            d="M572 250.664c0 116.808-95.811 211.5-214 211.5s-214-94.692-214-211.5 95.811-211.5 214-211.5 214 94.692 214 211.5Z"
          />
          <ellipse cx={322.5} cy={432} fill="#85C7F6" rx={199.5} ry={143} />
          <ellipse cx={214} cy={341.5} fill="#6548CE" rx={214} ry={211.5} />
          <path fill="url(#a-desktop)" d="M87 0h422v510H87z" />
          <g filter="url(#b-desktop)">
            <ellipse cx={308.5} cy={555.5} fill="#000" rx={164.5} ry={59.5} />
          </g>
          <defs>
            <pattern
              id="a-desktop"
              width={1}
              height={1}
              patternContentUnits="objectBoundingBox"
              className=" shadow-black shadow-2xl opacity-90"
            >
              <use xlinkHref="#c-desktop" transform="matrix(.0022 0 0 .00182 0 0)" />
            </pattern>
            <filter
              id="b-desktop"
              width={345.8}
              height={135.8}
              x={135.6}
              y={491.6}
              colorInterpolationFilters="sRGB"
              filterUnits="userSpaceOnUse"
            >
              <feFlood floodOpacity={0} result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                result="hardAlpha"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              />
              <feOffset dy={4} />
              <feGaussianBlur stdDeviation={4.2} />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" />
              <feBlend
                in2="BackgroundImageFix"
                result="effect1_dropShadow_48_6"
              />
              <feBlend
                in="SourceGraphic"
                in2="effect1_dropShadow_48_6"
                result="shape"
              />
            </filter>
            <image
              href="/image.png"
              id="c-desktop"
              width={454}
              height={549}
              preserveAspectRatio="none"
            />
          </defs>
        </svg>
      </div>
    </>
  );
};
export default SvgComponent1;
