"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import SlotFrame from "./SlotFrame";
import NavShuttleButton from "./NavShuttleButton";

const LETTERS = ["B", "I", "N", "H"];
const LETTER_COLORS: Partial<Record<string, string>> = {
  B: "#d81b60",
  N: "#a3e635",
  H: "#3b82f6",
};
const LETTER_WIDTH_SCALE: Record<string, number> = {
  B: 1.08,
  I: 0.92,
  N: 1.08,
  H: 1.08,
};
const FRAME_WIDTH = "5cm";
const FRAME_GAP = "10px";
const ROW_WIDTH = `calc(4 * ${FRAME_WIDTH} + 3 * ${FRAME_GAP})`;
const ROWS_GAP = "2px";
const LETTER_BOX_HEIGHT = "4cm";
const NAV_BUTTON_WIDTH = 150; // chiều ngang thân tên lửa (khớp w-[150px] trong NavShuttleButton)
const FLAME_PAD = 16; // chừa chỗ cho ngọn lửa phía sau thân

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function StepTwo({ onNext }: { onNext: () => void }) {
  const [launching, setLaunching] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const [buttonTop, setButtonTop] = useState(0);

  // Đo vị trí hàng chữ trong viewport để neo button theo chiều dọc
  useIsomorphicLayoutEffect(() => {
    const update = () => {
      const rect = rowRef.current?.getBoundingClientRect();
      if (rect) setButtonTop(rect.top + rect.height / 2);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Đếm ngược 20 giây sau khi bấm khởi hành; về 0 thì sang trạm kế tiếp
  useEffect(() => {
    if (countdown === null) return;
    if (countdown === 0) {
      onNext();
      return;
    }
    const id = window.setTimeout(() => setCountdown((c) => (c ?? 1) - 1), 1000);
    return () => window.clearTimeout(id);
  }, [countdown, onNext]);

  const handleLaunch = () => {
    if (launching || revealed) return;
    setLaunching(true);
    setCountdown(25);
  };

  return (
    <div className="relative z-10 flex w-full flex-col items-center gap-6 px-4">
      <div className="text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-nebula-soft/80">
          Trạm vũ trụ // Khoang lưu trữ
        </p>
        <div className="relative mt-3">
          {/* hướng dẫn luôn chiếm chỗ (ẩn đi chứ không bỏ khỏi layout) để khung dưới không xê dịch */}
          <h2
            className={`font-coiny text-lg font-normal text-ice sm:text-xl ${
              countdown !== null ? "invisible" : ""
            }`}
          >
            Đặt sticky note đầu tiên vào khung, sau đó đặt cái thứ hai chồng lên
            một nửa tấm thứ nhất nhé 😎
            <br />
            Sau khi đặt xong thì bấm khởi hành để xem kết quả nè.
          </h2>

          {/* đếm ngược đè lên, căn giữa đúng vị trí cũ */}
          {countdown !== null && (
            <h2
              className="absolute inset-0 flex items-center justify-center font-mono text-sm tracking-wide text-stardust"
              aria-live="polite"
            >
              Thời gian đếm ngược để qua trạm kế tiếp còn: {countdown}
            </h2>
          )}
        </div>
      </div>
      {/* khung chứa các sticky note và đường bay của tàu */}
      <div className="max-w-full overflow-x-auto pb-2">
        <div
          className="mx-auto flex flex-col"
          style={{ width: ROW_WIDTH, gap: ROWS_GAP }}
        >
          {/* 4 khung chứa sticky note */}
          <div
            className="grid"
            style={{
              gridTemplateColumns: `repeat(4, ${FRAME_WIDTH})`,
              gap: FRAME_GAP,
            }}
          >
            {LETTERS.map((_, i) => (
              <SlotFrame key={i} index={i + 1} />
            ))}
          </div>

          {/* đường bay của tàu + 4 ô chữ hiện ra bên dưới, cách khung đúng 1px */}
          <div
            ref={rowRef}
            className="relative"
            style={{ height: LETTER_BOX_HEIGHT }}
          >
            <div
              className="absolute inset-0 grid"
              style={{
                gridTemplateColumns: `repeat(4, ${FRAME_WIDTH})`,
                gap: FRAME_GAP,
              }}
            >
              {LETTERS.map((letter, i) => (
                <div
                  key={letter}
                  className={`flex items-center justify-center overflow-hidden rounded-md border border-nebula-soft/30 bg-panel/70 transition-all duration-500 ease-out ${
                    revealed
                      ? "translate-y-0 scale-100 opacity-100"
                      : "pointer-events-none -translate-y-2 scale-90 opacity-0"
                  }`}
                  style={{
                    width: FRAME_WIDTH,
                    height: LETTER_BOX_HEIGHT,
                    transitionDelay: revealed ? `${i * 120}ms` : "0ms",
                  }}
                >
                  <span
                    className="block font-coiny text-4xl font-normal leading-none text-stardust"
                    style={{
                      fontSize: "11.25rem",
                      transform: `translateY(-30%) scaleX(${LETTER_WIDTH_SCALE[letter]})`,
                      color: LETTER_COLORS[letter],
                      WebkitTextStroke: "7px currentColor",
                    }}
                  >
                    {letter}
                  </span>
                </div>
              ))}
            </div>

            {/* button rocket next station */}
            <div
              className="fixed left-0"
              style={{
                top: buttonTop,
                paddingLeft: FLAME_PAD,
                transform: `translate(${
                  launching
                    ? `calc(100vw - ${NAV_BUTTON_WIDTH}px - ${FLAME_PAD}px)`
                    : "0px"
                }, -50%)`,
                transition: "transform 1600ms cubic-bezier(0.4, 0, 0.2, 1)",
              }}
              onTransitionEnd={() => {
                if (launching) setRevealed(true);
              }}
            >
              <NavShuttleButton
                label={launching && revealed ? "Đi ngay" : "Khởi hành"}
                onClick={launching ? onNext : handleLaunch}
                disabled={launching && !revealed}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex h-20 flex-col justify-center text-center sm:h-16">
        <h2
          className={`font-coiny text-lg font-normal text-ice sm:text-xl ${
            countdown === null ? "invisible" : ""
          }`}
        >
          {`Nhìn ra được chữ gì hong :))`}
          <br />
          Thấy cute thì 📸 lại 1 cái ik
        </h2>
      </div>
    </div>
  );
}
