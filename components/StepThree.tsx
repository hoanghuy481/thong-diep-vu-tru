"use client";

import { useEffect, useRef } from "react";
import ShuttleButton from "./ShuttleButton";

export default function StepThree({
  onNext,
  onYouTubePlay,
}: {
  onNext: () => void;
  onYouTubePlay: () => void;
}) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const onYouTubePlayRef = useRef(onYouTubePlay);
  onYouTubePlayRef.current = onYouTubePlay;

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      if (document.activeElement !== iframeRef.current) return;
      onYouTubePlayRef.current();
      window.clearInterval(intervalId);
    }, 100);
    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <div className="relative z-10 flex w-full flex-col items-center gap-6 px-4">
      <div className="text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-nebula-soft/80">
          Trạm vũ trụ // Khoang phát sóng
        </p>
        {/* content */}
        <h2 className="mt-3 font-coiny text-lg font-normal text-ice sm:text-xl">
          Dưới đây là mọi suy nghĩ về em trong khoảng thời gian qua, anh đã đưa
          vào giai điệu này...
          <br />
          Bao gồm cả quá trình làm mấy trò con nít này nữa 🥹
        </h2>
      </div>

      {/* khung chứa video */}
      <div className="glass-panel w-full max-w-4xl rounded-2xl p-2 sm:p-3">
        <div className="aspect-video overflow-hidden rounded-xl">
          <iframe
            ref={iframeRef}
            width="1801"
            height="1013"
            className="h-full w-full border-0"
            src="https://www.youtube.com/embed/Hvhg3vCJBIE"
            title='ASTRO B - "You are my whole world" ft BIG P'
            frameBorder="0"
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
