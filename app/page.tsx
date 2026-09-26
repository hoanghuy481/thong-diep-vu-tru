"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import StarField from "@/components/StarField";
import MusicPlayer from "@/components/MusicPlayer";
import StepOne from "@/components/StepOne";
import StepTwo from "@/components/StepTwo";
import StepThree from "@/components/StepThree";
import StepFour from "@/components/StepFour";

const EXIT_MS = 400; // thời gian step hiện tại trượt/mờ ra (khớp với duration-[400ms] bên dưới)
const ENTER_MS = 600; // thời gian step mới mờ dần vào

type Phase = "idle" | "leaving" | "entering";
type Step = 1 | 2 | 3 | 4;

export default function Home() {
  const [step, setStep] = useState<Step>(1);
  const [phase, setPhase] = useState<Phase>("idle");
  const timers = useRef<number[]>([]);
  const phaseRef = useRef(phase);
  phaseRef.current = phase;

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach((t) => window.clearTimeout(t));
  }, []);

  const switchStep = useCallback((target: Step) => {
    if (phaseRef.current !== "idle") return;

    // Tôn trọng cài đặt "giảm chuyển động" của hệ thống: đổi step ngay lập tức
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStep(target);
      setPhase("idle");
      return;
    }

    setPhase("leaving");
    timers.current.push(
      window.setTimeout(() => {
        setStep(target);
        setPhase("entering");
        // Đợi 1 frame để class opacity-0 được áp trước khi chuyển sang opacity-100
        timers.current.push(window.setTimeout(() => setPhase("idle"), 30));
      }, EXIT_MS)
    );
  }, []);

  const goToStepTwo = useCallback(() => switchStep(2), [switchStep]);
  const goToStepThree = useCallback(() => switchStep(3), [switchStep]);
  const goToStepFour = useCallback(() => switchStep(4), [switchStep]);
  const goBack = useCallback(() => {
    if (step > 1) switchStep((step - 1) as Step);
  }, [step, switchStep]);

  return (
    <main className="relative flex min-h-screen items-center justify-center px-4 py-16">
      <StarField />

      {/* nhạc nền sống suốt các step, tạm dừng ở step 3 rồi phát lại khi rời đi */}
      <MusicPlayer paused={step === 3} />

      {/* nút quay lại, hiện từ step 2 trở đi */}
      {step > 1 && (
        <button
          type="button"
          onClick={goBack}
          aria-label="Quay lại step trước"
          className="fixed right-4 top-4 z-20 flex items-center gap-2 rounded-full border border-nebula-soft/40 bg-panel/80 px-4 py-2 font-mono text-xs uppercase tracking-[0.25em] text-nebula-soft backdrop-blur transition-colors duration-300 hover:border-stardust/70 hover:text-stardust focus:outline-none focus-visible:ring-2 focus-visible:ring-stardust focus-visible:ring-offset-2 focus-visible:ring-offset-void"
        >
          ← Quay lại
        </button>
      )}

      <div className="relative z-10 flex w-full justify-center">
        {step === 1 && (
          <StepOne
            onConfirm={goToStepTwo}
            className={`transition-all duration-[400ms] ease-in ${
              phase === "leaving"
                ? "-translate-x-12 opacity-0"
                : "translate-x-0 opacity-100"
            }`}
          />
        )}
        {step === 2 && (
          <div
            className={`w-full transition-opacity ease-out ${
              phase === "idle" ? "opacity-100" : "opacity-0"
            }`}
            style={{
              transitionDuration: `${phase === "leaving" ? EXIT_MS : ENTER_MS}ms`,
            }}
          >
            <StepTwo onNext={goToStepThree} />
          </div>
        )}
        {step === 3 && (
          <div
            className={`w-full transition-opacity ease-out ${
              phase === "idle" ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDuration: `${ENTER_MS}ms` }}
          >
            <StepThree onNext={goToStepFour} />
          </div>
        )}
        {step === 4 && (
          <div
            className={`w-full transition-opacity ease-out ${
              phase === "idle" ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDuration: `${ENTER_MS}ms` }}
          >
            <StepFour />
          </div>
        )}
      </div>
    </main>
  );
}
