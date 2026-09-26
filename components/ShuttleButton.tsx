"use client";

type ShuttleButtonProps = {
  label: string;
  variant: "yes" | "no";
  scale?: number;
  onClick: () => void;
};

export default function ShuttleButton({
  label,
  variant,
  scale = 1,
  onClick,
}: ShuttleButtonProps) {
  const isYes = variant === "yes";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      style={{ transform: `scale(${scale})` }}
      className="group relative flex flex-col items-center transition-transform duration-500 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-stardust focus-visible:ring-offset-4 focus-visible:ring-offset-void"
    >
      {/* hull */}
      <span
        className={`relative z-10 flex h-[86px] w-[132px] items-center justify-center border transition-colors duration-300 ${
          isYes
            ? "border-nebula-soft/60 bg-gradient-to-b from-[#2a2560] via-[#1c1a3e] to-[#12112b] shadow-[0_0_28px_-4px_rgba(108,76,224,0.65)] group-hover:shadow-[0_0_36px_-2px_rgba(156,133,245,0.8)]"
            : "border-white/10 bg-gradient-to-b from-[#1a1c30] via-[#131426] to-[#0d0e1c] shadow-[0_0_14px_-6px_rgba(255,255,255,0.15)]"
        }`}
        style={{
          clipPath:
            "polygon(50% 0%, 82% 18%, 88% 78%, 100% 100%, 0% 100%, 12% 78%, 18% 18%)",
        }}
      >
        <span
          className={`font-display text-xs font-bold tracking-[0.15em] ${
            isYes ? "text-ice" : "text-ice/70"
          }`}
        >
          {label}
        </span>

        {/* porthole */}
        <span
          className={`absolute top-[20%] h-2.5 w-2.5 rounded-full border ${
            isYes
              ? "border-stardust/70 bg-stardust/30"
              : "border-white/20 bg-white/10"
          }`}
        />
      </span>

      {/* fins */}
      <span
        className={`absolute bottom-[18px] left-[6px] h-4 w-3 -skew-y-[20deg] ${
          isYes ? "bg-nebula-soft/50" : "bg-white/10"
        }`}
      />
      <span
        className={`absolute bottom-[18px] right-[6px] h-4 w-3 skew-y-[20deg] ${
          isYes ? "bg-nebula-soft/50" : "bg-white/10"
        }`}
      />

      {/* thruster flame */}
      <span className="relative -mt-1 flex h-8 w-10 items-start justify-center overflow-visible">
        <span
          className={`h-8 w-4 rounded-b-full ${
            isYes
              ? "animate-flicker bg-gradient-to-b from-stardust via-flare to-transparent opacity-90"
              : "h-3 w-2.5 bg-gradient-to-b from-white/20 to-transparent opacity-60"
          }`}
        />
      </span>
    </button>
  );
}
