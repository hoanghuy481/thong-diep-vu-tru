type SlotFrameProps = {
  index: number;
};

export default function SlotFrame({ index }: SlotFrameProps) {
  return (
    <div
      className="relative flex shrink-0 items-center justify-center overflow-hidden rounded-sm border border-nebula-soft/25 bg-gradient-to-b from-[#14162c] via-[#0f1123] to-[#0a0b1a] shadow-[inset_0_0_24px_rgba(0,0,0,0.55),0_0_18px_-8px_rgba(108,76,224,0.45)]"
      style={{ width: "5cm", height: "9cm" }}
    >
      {/* corner brackets */}
      <span className="absolute left-1.5 top-1.5 h-3 w-3 border-l border-t border-stardust/60" />
      <span className="absolute right-1.5 top-1.5 h-3 w-3 border-r border-t border-stardust/60" />
      <span className="absolute bottom-1.5 left-1.5 h-3 w-3 border-b border-l border-stardust/60" />
      <span className="absolute bottom-1.5 right-1.5 h-3 w-3 border-b border-r border-stardust/60" />

      {/* hazard stripe accent */}
      <span
        className="absolute inset-x-0 top-0 h-1 opacity-60"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, #f4c95d 0 8px, transparent 8px 16px)",
        }}
      />

      {/* slot label */}
      {/* <span className="absolute left-3 top-3 font-mono text-[9px] uppercase tracking-[0.25em] text-nebula-soft/70">
        Khoang {String(index).padStart(2, "0")}
      </span> */}

      {/* dashed insertion zone */}
      <span className="pointer-events-none h-[95%] w-[85%] rounded-[2px] border border-dashed border-ice/20" />
    </div>
  );
}
