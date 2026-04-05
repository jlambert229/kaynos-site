import React from "react";

const sizeMap = {
  sm: 20,
  md: 24,
  lg: 32,
  nav: 28,
  hero: 72,
};

export default function KaynosLogo({ size = "md" }) {
  const h = sizeMap[size] || sizeMap.md;
  const w = Math.round(h * (185 / 191));

  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 185 191"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Kaynos logo"
      className={`kaynos-logo kaynos-logo--${size}`}
    >
      <path d="M 64 151 L 102 189 L 178 190 L 102 114 Z" fill="#2184f3" fillRule="evenodd" />
      <path d="M 184 1 L 116 1 L 1 115 L 0 185 Z" fill="#2184f3" fillRule="evenodd" />
      <path d="M 58 0 L 3 0 L 0 3 L 0 91 L 57 34 Z" fill="#2184f3" fillRule="evenodd" />
    </svg>
  );
}
