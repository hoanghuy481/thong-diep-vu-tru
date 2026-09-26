"use client";

import { useMemo } from "react";

type Star = {
  id: number;
  top: string;
  left: string;
  size: number;
  delay: string;
  duration: string;
};

function generateStars(count: number, seedOffset: number): Star[] {
  return Array.from({ length: count }, (_, i) => {
    // Deterministic-ish pseudo-random so server/client markup matches.
    const seed = (i + 1) * 9301 + seedOffset * 49297;
    const rand = (n: number) => ((seed * n) % 233280) / 233280;

    return {
      id: i + seedOffset * 1000,
      top: `${(rand(3) * 100).toFixed(2)}%`,
      left: `${(rand(7) * 100).toFixed(2)}%`,
      size: 1 + Math.floor(rand(11) * 2),
      delay: `${(rand(13) * 4).toFixed(2)}s`,
      duration: `${(2.4 + rand(17) * 2.4).toFixed(2)}s`,
    };
  });
}

export default function StarField() {
  const farStars = useMemo(() => generateStars(80, 1), []);
  const nearStars = useMemo(() => generateStars(45, 2), []);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden bg-void">
      {/* radial nebula glows */}
      <div className="absolute -left-40 top-[-10%] h-[520px] w-[520px] rounded-full bg-nebula/20 blur-[140px]" />
      <div className="absolute -right-40 bottom-[-15%] h-[480px] w-[480px] rounded-full bg-flare/10 blur-[140px]" />
      <div className="absolute left-1/2 top-1/3 h-[380px] w-[380px] -translate-x-1/2 rounded-full bg-stardust/5 blur-[160px]" />

      {/* far, dim, drifting star layer */}
      <div className="absolute inset-0 animate-drift">
        {farStars.map((star) => (
          <span
            key={star.id}
            className="absolute rounded-full bg-ice/60 animate-twinkle"
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              animationDelay: star.delay,
              animationDuration: star.duration,
            }}
          />
        ))}
      </div>

      {/* near, brighter star layer */}
      <div className="absolute inset-0">
        {nearStars.map((star) => (
          <span
            key={star.id}
            className="absolute rounded-full bg-ice animate-twinkle shadow-[0_0_6px_1px_rgba(237,239,251,0.6)]"
            style={{
              top: star.top,
              left: star.left,
              width: star.size + 0.5,
              height: star.size + 0.5,
              animationDelay: star.delay,
              animationDuration: star.duration,
            }}
          />
        ))}
      </div>

      {/* occasional shooting star */}
      <div className="absolute right-[15%] top-[18%] h-px w-24 origin-right animate-shooting-star bg-gradient-to-l from-ice via-ice/60 to-transparent" />
      <div
        className="absolute right-[35%] top-[55%] h-px w-16 origin-right animate-shooting-star bg-gradient-to-l from-stardust via-stardust/50 to-transparent"
        style={{ animationDelay: "3.2s" }}
      />
    </div>
  );
}
