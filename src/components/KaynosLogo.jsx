import React from 'react';

const sizeMap = {
  sm: { width: 30, height: 4, redWidth: 4, tailWidth: 6 },
  md: { width: 30, height: 4, redWidth: 4, tailWidth: 6 },
  lg: { width: 48, height: 6, redWidth: 6, tailWidth: 10 },
};

export default function KaynosLogo({ size = 'md' }) {
  const { width, height, redWidth, tailWidth } = sizeMap[size] || sizeMap.md;
  const redX = width - tailWidth - redWidth;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Kaynos logo"
    >
      <rect
        x="0"
        y="0"
        width={width}
        height={height}
        rx="1"
        fill="#1a1a1a"
        stroke="rgba(255,255,255,0.15)"
        strokeWidth="0.5"
      />
      <rect
        x={redX}
        y="0"
        width={redWidth}
        height={height}
        fill="#c62828"
      />
    </svg>
  );
}
