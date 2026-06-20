// Inline brand mark (Sentri "S" + orbit ring). Rendered inline rather than
// loaded as a file so it can never 404 and stays crisp at any size.
export default function Logo({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label="Sabarna Saha"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="logoStroke" x1="14" y1="12" x2="50" y2="52" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#c2ef4e" />
          <stop offset="0.5" stopColor="#6a5fc1" />
          <stop offset="1" stopColor="#fa7faa" />
        </linearGradient>
        <linearGradient id="logoRing" x1="8" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#c2ef4e" />
          <stop offset="1" stopColor="#6a5fc1" />
        </linearGradient>
      </defs>

      {/* orbit ring */}
      <circle
        cx="32"
        cy="32"
        r="23"
        fill="none"
        stroke="url(#logoRing)"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeDasharray="92 52"
        opacity="0.55"
      />
      {/* satellite node */}
      <circle cx="48.3" cy="15.7" r="3" fill="#c2ef4e" />
      {/* S mark */}
      <path
        d="M41 25 C41 19, 23 18.5, 23 26.5 C23 32.5, 41 31.5, 41 39 C41 46.5, 23 46, 23 40"
        fill="none"
        stroke="url(#logoStroke)"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  );
}
