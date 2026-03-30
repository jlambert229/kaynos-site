import React from "react";

/** Black belt with red rank stripe. `size`: nav (header), hero (large lockup), md (footer), sm (tight spaces). */
const sizeMap = {
  sm: { w: 44, h: 12 },
  md: { w: 56, h: 15 },
  nav: { w: 72, h: 20 },
  hero: { w: 132, h: 36 },
};

const VB = "0 0 140 36";

export default function KaynosLogo({ size = "md" }) {
  const { w, h } = sizeMap[size] || sizeMap.md;
  const gid = `k${React.useId().replace(/[^a-zA-Z0-9]/g, "") || "logo"}`;

  return (
    <svg
      width={w}
      height={h}
      viewBox={VB}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Kaynos logo: black belt with red stripe"
      className={`kaynos-logo kaynos-logo--${size}`}
    >
      <defs>
        <linearGradient id={`beltFace-${gid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3a3a40" />
          <stop offset="35%" stopColor="#141416" />
          <stop offset="100%" stopColor="#050508" />
        </linearGradient>
        <linearGradient id={`beltFold-${gid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2d2d32" />
          <stop offset="100%" stopColor="#0a0a0c" />
        </linearGradient>
        <linearGradient id={`stripeRed-${gid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ef5350" />
          <stop offset="50%" stopColor="#c62828" />
          <stop offset="100%" stopColor="#8b0000" />
        </linearGradient>
        <filter id={`beltSoft-${gid}`} x="-8%" y="-8%" width="116%" height="116%">
          <feDropShadow dx="0" dy="1.2" stdDeviation="1.2" floodOpacity="0.4" />
        </filter>
      </defs>

      {/* Folded end (belt knot side) */}
      <path
        d="M 6 9 C 3 9 1 11 1 14 v 8 c 0 3.5 2.5 6 6 6 h 14 c 2 0 3.5 -1.5 3.5 -3.5 V 12 c 0 -2 -1.8 -3 -3.8 -3 H 10 Z"
        fill={`url(#beltFold-${gid})`}
        stroke="rgba(255,255,255,0.1)"
        strokeWidth="0.4"
      />
      <path
        d="M 4 14 Q 9 12 14 14"
        fill="none"
        stroke="rgba(255,255,255,0.07)"
        strokeWidth="0.6"
        strokeLinecap="round"
      />

      {/* Main strap */}
      <path
        d="M 22 8 h 108 c 3 0 5 2 5 4.5 v 11 c 0 2.5 -2 4.5 -5 4.5 H 22 c -2.5 0 -4 -2 -4 -4.5 v -11 c 0 -2.5 1.5 -4.5 4 -4.5 Z"
        fill={`url(#beltFace-${gid})`}
        stroke="rgba(255,255,255,0.12)"
        strokeWidth="0.5"
        filter={`url(#beltSoft-${gid})`}
      />

      {/* Fabric edge / thickness hint */}
      <path
        d="M 24 26.5 h 102"
        stroke="rgba(0,0,0,0.45)"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.9"
      />
      <path
        d="M 26 10.5 h 58"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth="0.9"
        strokeLinecap="round"
      />

      {/* Red rank stripe (vertical bar on black belt) */}
      <rect
        x="93"
        y="9.5"
        width="17"
        height="17"
        rx="2.2"
        fill={`url(#stripeRed-${gid})`}
        stroke="rgba(0,0,0,0.35)"
        strokeWidth="0.45"
      />
      <path
        d="M 96 12.5 h 11"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="0.55"
        strokeLinecap="round"
      />
    </svg>
  );
}
