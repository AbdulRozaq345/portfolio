"use client";
import * as React from "react";

const SvgComponent = (props: React.SVGAttributes<SVGSVGElement>) => {
  const uid = React.useId();

  const aMobile = `${uid}-a-mobile`;
  const bMobile = `${uid}-b-mobile`;
  const cMobile = `${uid}-c-mobile`;
  const dMobile = `${uid}-d-mobile`;

  const aDesktop = `${uid}-a-desktop`;
  const bDesktop = `${uid}-b-desktop`;
  const cDesktop = `${uid}-c-desktop`;
  const dDesktop = `${uid}-d-desktop`;

  return (
    <>
      <div className="block md:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width={118}
          height={117}
          fill="none"
          {...props}
        >
          <path
            fill="#D9D9D9"
            d="M108.889 58.063c0 27.89-22.386 50.5-50 50.5s-50-22.61-50-50.5 22.386-50.5 50-50.5 50 22.61 50 50.5Zm-98.575 0c0 27.095 21.748 49.061 48.575 49.061s48.575-21.966 48.575-49.061c0-27.096-21.748-49.061-48.575-49.061s-48.575 21.965-48.575 49.06Z"
          />
          <g filter={`url(#${aMobile})`}>
            <ellipse
              cx={58.571}
              cy={58.386}
              fill={`url(#${bMobile})`}
              rx={47.771}
              ry={47.587}
            />
            <path
              stroke="#000"
              d="M58.57 11.3c26.11 0 47.271 21.083 47.271 47.087 0 26.003-21.162 47.086-47.27 47.086-26.109 0-47.27-21.083-47.271-47.086C11.3 32.384 32.462 11.3 58.57 11.3Z"
            />
          </g>
          <rect
            width={48.805}
            height={48.805}
            x={34.805}
            y={33.66}
            fill={`url(#${cMobile})`}
            rx={24.402}
          />
          <defs>
            <linearGradient
              id={bMobile}
              x1={16.851}
              x2={98.988}
              y1={76.515}
              y2={32.324}
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#1D9BF4" />
              <stop offset={0.668} stopColor="#010109" />
            </linearGradient>
            <pattern
              id={cMobile}
              width={1}
              height={1}
              patternContentUnits="objectBoundingBox"
            >
              <use xlinkHref={`#${dMobile}`} transform="scale(.002)" />
            </pattern>
            <filter
              id={aMobile}
              width={117.142}
              height={116.773}
              x={0}
              y={0}
              colorInterpolationFilters="sRGB"
              filterUnits="userSpaceOnUse"
            >
              <feFlood floodOpacity={0} result="BackgroundImageFix" />
              <feBlend
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                result="effect1_foregroundBlur_195_140"
                stdDeviation={5.4}
              />
            </filter>
            <image
              href="/nexxa.png"
              id={dMobile}
              width={500}
              height={500}
              preserveAspectRatio="none"
            />
          </defs>
        </svg>
      </div>
      <div className="hidden md:block">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width={172}
          height={169}
          fill="none"
          {...props}
        >
          <path
            fill="#D9D9D9"
            d="M164.8 83.8c0 43.078-35.146 78-78.5 78s-78.5-34.922-78.5-78 35.146-78 78.5-78 78.5 34.922 78.5 78Zm-154.763 0c0 41.851 34.144 75.777 76.263 75.777 42.119 0 76.263-33.926 76.263-75.777 0-41.85-34.144-75.777-76.263-75.777-42.119 0-76.263 33.926-76.263 75.777Z"
          />
          <g filter={`url(#${aDesktop})`}>
            <ellipse
              cx={85.8}
              cy={84.3}
              fill={`url(#${bDesktop})`}
              rx={75}
              ry={73.5}
            />
            <path
              stroke="#000"
              d="M85.8 11.3c41.155 0 74.5 32.693 74.5 73s-33.345 73-74.5 73-74.5-32.693-74.5-73 33.345-73 74.5-73Z"
            />
          </g>
          <rect
            width={76}
            height={76}
            x={48.8}
            y={45.8}
            fill={`url(#${cDesktop})`}
            rx={38}
          />
          <defs>
            <linearGradient
              id={bDesktop}
              x1={20.3}
              x2={148.3}
              y1={112.3}
              y2={42.3}
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#1D9BF4" />
              <stop offset={0.668} stopColor="#010109" />
            </linearGradient>
            <pattern
              id={cDesktop}
              width={1}
              height={1}
              patternContentUnits="objectBoundingBox"
            >
              <use xlinkHref={`#${dDesktop}`} transform="scale(.002)" />
            </pattern>
            <filter
              id={aDesktop}
              width={171.6}
              height={168.6}
              x={0}
              y={0}
              colorInterpolationFilters="sRGB"
              filterUnits="userSpaceOnUse"
            >
              <feFlood floodOpacity={0} result="BackgroundImageFix" />
              <feBlend
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                result="effect1_foregroundBlur_143_435"
                stdDeviation={5.4}
              />
            </filter>
            <image
              href="/nexxa.png"
              id={dDesktop}
              width={500}
              height={500}
              preserveAspectRatio="none"
            />
          </defs>
        </svg>
      </div>
    </>
  );
};
export default SvgComponent;
