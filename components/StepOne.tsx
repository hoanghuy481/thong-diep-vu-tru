"use client";

import { useState } from "react";
import ShuttleButton from "./ShuttleButton";

const TEASE_MESSAGES = [
  "Chắc chưa nè?",
  "Thử nhìn tàu YES coi...",
  "Nó đang to dần lên đó nha!",
  "Thôi khỏi né, bấm YES đi mà~",
  "Trạm chỉ còn một cửa ra thôi đó...",
];

const MAX_SCALE = 2.6;
const SCALE_STEP = 0.32;

export default function StepOne({
  onConfirm,
  className = "",
}: {
  onConfirm: () => void;
  className?: string;
}) {
  const [noCount, setNoCount] = useState(0);

  const yesScale = Math.min(1 + noCount * SCALE_STEP, MAX_SCALE);
  const teaseText =
    noCount > 0
      ? TEASE_MESSAGES[Math.min(noCount - 1, TEASE_MESSAGES.length - 1)]
      : null;

  return (
    <div
      className={`glass-panel animate-card-in relative w-full max-w-lg rounded-2xl px-8 py-10 sm:px-12 sm:py-12 ${className}`}
    >
      <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-nebula-soft/80">
        Trạm vũ trụ // Tín hiệu đang chờ
      </p>

      <h1 className="mt-5 font-display text-xl font-bold leading-relaxed text-ice sm:text-2xl">
        Em đã sẵn sàng khám phá thông điệp của anh dành cho em chưa?
      </h1>

      <div className="mt-12 flex items-end justify-center gap-10 sm:gap-14">
        <ShuttleButton
          label="NO"
          variant="no"
          onClick={() => setNoCount((c) => c + 1)}
        />
        <ShuttleButton label="YES" variant="yes" scale={yesScale} onClick={onConfirm} />
      </div>

      <p
        className={`mt-10 text-center font-body text-sm text-ice/60 transition-opacity duration-300 ${
          teaseText ? "opacity-100" : "opacity-0"
        }`}
        aria-live="polite"
      >
        {teaseText ?? "\u00A0"}
      </p>
    </div>
  );
}
