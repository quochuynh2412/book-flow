
export default function Star({size, color="text-yellow-400"} : {size: number, color?: String}) {

  return (
    <svg
      className={`w-${size} h-${size} ${color} me-1`}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 22 20">
      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
    </svg>
  );
}

export function HalfStar({ size, half }: { size: number; half: number }) {
  const fillPercentage = Math.min(1, Math.max(0, half)); // Ensure fillPercentage is between 0 and 1

  return (
    <svg
      className={`w-${size} h-${size} me-1`}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 22 20"
    >
      {/* Filled portion of the star */}
      <path
        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575"
        fill="#D1D5DB"
      />

      {/* Unfilled portion of the star */}
      <path
        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575"
        fill="#FACC15"
        clipPath={`url(#clip-path-${fillPercentage})`}
      />

      {/* Clip path to control the unfilled portion */}
      <defs>
        <clipPath id={`clip-path-${fillPercentage}`}>
          <rect x="0" y="0" width={`${fillPercentage * 100}%`} height="100%" />
        </clipPath>
      </defs>
    </svg>
  );
}

export function StarGenerator({size, score} : {size: number, score: number}) {
  return (
    <div className="flex">
      {Array.from({ length: score }).map((_, index) => (
        <Star key={index} size={size} />
      ))}

      {
        (score % 1 != 0) ? <HalfStar size={size} half={score % 1} /> : null
      }

      {Array.from({ length: 5 - score }).map((_, index) => (
        <Star key={index} size={size} color="text-gray-300" />
      ))}
    </div>
  );
}