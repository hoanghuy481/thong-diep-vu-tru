"use client";

import ShuttleButton from "./ShuttleButton";

export default function StepThree({ onNext }: { onNext: () => void }) {
  return (
    <div className="relative z-10 flex w-full flex-col items-center gap-6 px-4">
      <div className="text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-nebula-soft/80">
          Trạm vũ trụ // Khoang phát sóng
        </p>
        <h2 className="mt-3 font-display text-lg font-bold text-ice sm:text-xl">
          Thông điệp của anh dành cho em 💫
        </h2>
      </div>

      {/* khung chứa video */}
      <div className="glass-panel w-full max-w-4xl rounded-2xl p-2 sm:p-3">
        <div className="aspect-video overflow-hidden rounded-xl">
          <iframe
            className="h-full w-full border-0"
            src="https://www.youtube.com/embed/Hvhg3vCJBIE"
            title='ASTRO B - "You are my whole world" ft BIG P'
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </div>

      {/* button sang trạm kế tiếp */}
      <div className="mt-16 flex items-end justify-center gap-20 sm:gap-14">
        <ShuttleButton
          label="Trạm cuối"
          variant="yes"
          scale={2}
          onClick={onNext}
        />
      </div>
    </div>
  );
}
