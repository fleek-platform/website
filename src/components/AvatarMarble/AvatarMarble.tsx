import React from 'react';

const AVATAR_SIZE = 80;

import { generateColors } from './avatarColor';

interface AvatarMarbleProps {
  name?: string;
}

const colors = ['#FFFF57', '#7B7B7B', '#5ADBFF', '#FE9000', '#FFCAE9'];

export const AvatarMarble: React.FC<AvatarMarbleProps> = ({
  name = '',
  ...props
}) => {
  const properties = generateColors({ name, colors });
  const maskID = React.useId();

  return (
    <svg
      className="h-[26px] w-[26px] rounded-[50%]"
      viewBox={`0 0 ${AVATAR_SIZE} ${AVATAR_SIZE}`}
      fill="none"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <mask
        id={maskID}
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={AVATAR_SIZE}
        height={AVATAR_SIZE}
      >
        <rect
          width={AVATAR_SIZE}
          height={AVATAR_SIZE}
          className="fill-white/95"
        />
      </mask>
      <g mask={`url(#${maskID})`}>
        <rect
          width={AVATAR_SIZE}
          height={AVATAR_SIZE}
          fill={properties[0].color}
          className="bg-monochrome-normal"
        />
        {Array.from({ length: 3 }).map((_, idx) => {
          const id = idx + 1;
          const isOverlay = id !== 1;
          const basePath =
            'M32.414 59.35L50.376 70.5H72.5v-71H33.728L26.5 13.381l19.057 27.08L32.414 59.35z';
          const overlayPath =
            'M22.216 24L0 46.75l14.108 38.129L78 86l-3.081-59.276-22.378 4.005 12.972 20.186-23.35 27.395L22.215 24z';

          return (
            <path
              key={idx}
              filter="url(#prefix__filter0_f)"
              fill={properties[id].color}
              d={isOverlay ? overlayPath : basePath}
              transform={`translate(${properties[id].translateX} ${properties[id].translateY}) rotate(${properties[id].rotate} ${
                AVATAR_SIZE / 2
              } ${AVATAR_SIZE / 2}) scale(${properties[id].scale})
              `}
            />
          );
        })}
      </g>
      <defs>
        <filter
          id="prefix__filter0_f"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation={12} result="effect1_foregroundBlur" />
        </filter>
      </defs>
    </svg>
  );
};
