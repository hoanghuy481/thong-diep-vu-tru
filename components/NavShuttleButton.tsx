type NavShuttleButtonProps = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
};

export default function NavShuttleButton({
  label,
  onClick,
  disabled,
}: NavShuttleButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="group relative flex h-12 w-[150px] items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-stardust focus-visible:ring-offset-4 focus-visible:ring-offset-void disabled:cursor-not-allowed disabled:opacity-60"
    >
      {/* lửa đẩy phía sau — tách wrapper căn giữa riêng để animate-flicker không ghi đè translate */}
      <span className="absolute -left-4 top-1/2 h-4 w-6 -translate-y-1/2">
        <span className="block h-full w-full animate-flicker rounded-l-full bg-gradient-to-l from-flare via-stardust to-transparent opacity-90" />
      </span>

      {/* thân tên lửa, mũi hướng sang phải */}
      <span
        className="relative z-10 flex h-full w-full items-center justify-center border border-nebula-soft/60 bg-gradient-to-r from-[#12112b] via-[#1c1a3e] to-[#2a2560] pl-9 pr-6 shadow-[0_0_24px_-4px_rgba(108,76,224,0.65)] transition-shadow duration-300 group-hover:shadow-[0_0_36px_-2px_rgba(156,133,245,0.85)]"
        style={{
          clipPath: "polygon(0% 12%, 76% 12%, 100% 50%, 76% 88%, 0% 88%)",
        }}
      >
        {/* cửa sổ tròn */}
        <span className="absolute left-4 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full border border-stardust/70 bg-stardust/30" />

        {/* vệt sáng dọc thân */}
        <span className="pointer-events-none absolute inset-y-1.5 left-2.5 w-px bg-white/15" />

        <span className="font-display text-[11px] font-bold uppercase tracking-[0.15em] text-ice">
          {label}
        </span>
      </span>
    </button>
  );
}
