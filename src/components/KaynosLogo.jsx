const sizeMap = {
  sm: 20,
  md: 24,
  lg: 32,
  nav: 28,
  hero: 88,
};

export default function KaynosLogo({ size = "md", color = "#f5f5f7" }) {
  const h = sizeMap[size] || sizeMap.md;
  const w = h;

  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Badgerskope logo"
      className={`kaynos-logo kaynos-logo--${size}`}
    >
      <circle cx="60" cy="60" r="54" stroke={color} strokeWidth="8" fill="none" />
      <path
        d="M23 69c10-15 28-24 46-25 6-10 18-15 28-13-9 3-15 10-16 16 9 7 16 17 19 29-5 9-15 14-26 14-8 0-17-3-24-8-8-5-17-8-27-8z"
        fill={color}
      />
      <path d="M65 55c4 2 8 6 9 11-3-3-6-5-10-6z" fill="#050508" />
      <circle cx="75" cy="60" r="2.5" fill="#050508" />
    </svg>
  );
}
