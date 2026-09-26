"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";

type Track = { name: string; src: string; title: string };

function fmt(seconds: number) {
  if (!Number.isFinite(seconds) || seconds <= 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function MusicPlayer({ paused }: { paused: boolean }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(paused);
  pausedRef.current = paused;
  const wasPlayingRef = useRef(false);
  const needsGestureRef = useRef(false);
  const playingRef = useRef(false);

  const [tracks, setTracks] = useState<Track[]>([]);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [volume, setVolume] = useState(1);
  const [title, setTitle] = useState("");
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState(false);
  const volumeRef = useRef(1);
  volumeRef.current = volume;

  // lấy danh sách nhạc từ thư mục /music (qua /api/tracks)
  useEffect(() => {
    let cancelled = false;
    fetch("/api/tracks")
      .then((res) => res.json())
      .then((data: { tracks: string[] }) => {
        if (cancelled || !data.tracks?.length) {
          setError(true);
          return;
        }
        const list: Track[] = data.tracks.map((name) => ({
          name,
          src: `/music/${encodeURIComponent(name)}`,
          title: name
            .replace(/\.\w+$/, "")
            .replace(/\s*\[[^\]]*\]\s*$/, "")
            .trim(),
        }));
        setTracks(list);
      })
      .catch(() => setError(true));
    return () => {
      cancelled = true;
    };
  }, []);

  // khôi phục âm lượng đã lưu ở lần nghe trước
  useEffect(() => {
    try {
      const saved = localStorage.getItem("player-volume");
      if (saved !== null) {
        const v = parseFloat(saved);
        if (Number.isFinite(v)) setVolume(Math.min(1, Math.max(0, v)));
      }
    } catch {
      // bỏ qua
    }
  }, []);

  // khi có danh sách nhạc: phát bài đầu tiên, mặc định MỞ LOA
  useEffect(() => {
    if (!tracks.length) return;
    setTitle(tracks[0].title);
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volumeRef.current;
    audio.muted = false;
    setMuted(false);
    // mặc định mở loa; trình duyệt có thể chặn autoplay có tiếng → giữ nguyên
    // trạng thái mở loa và phát ở lần tương tác đầu tiên (effect bên dưới)
    audio.play().catch(() => {
      needsGestureRef.current = true;
    });
  }, [tracks]);

  // step 3: tạm dừng; rời step 3: phát lại nếu trước đó đang phát
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (paused) {
      if (!audio.paused) {
        wasPlayingRef.current = true;
        audio.pause();
      }
    } else if (wasPlayingRef.current) {
      wasPlayingRef.current = false;
      audio.play().catch(() => {
        // bỏ qua
      });
    }
  }, [paused]);

  // lần tương tác đầu tiên ngoài khung player: phát nhạc nếu autoplay bị chặn
  useEffect(() => {
    const handle = (event: Event) => {
      // bấm bên trong player thì để các nút tự xử lý
      if (cardRef.current?.contains(event.target as Node)) return;
      window.removeEventListener("pointerdown", handle);
      window.removeEventListener("keydown", handle);
      const audio = audioRef.current;
      if (audio && needsGestureRef.current) {
        needsGestureRef.current = false;
        if (audio.paused && !pausedRef.current) audio.play().catch(() => {});
      }
    };
    window.addEventListener("pointerdown", handle);
    window.addEventListener("keydown", handle);
    return () => {
      window.removeEventListener("pointerdown", handle);
      window.removeEventListener("keydown", handle);
    };
  }, []);

  // forcePlay: dùng khi hết bài — lúc đó trình duyệt đã bắn `pause` trước `ended`
  // nên playingRef đã thành false, phải ép phát bài kế tiếp
  const playIndex = (i: number, forcePlay = false) => {
    if (!tracks.length) return;
    const list = tracks;
    const nextIndex = ((i % list.length) + list.length) % list.length;
    const shouldPlay = forcePlay || playingRef.current;
    setIndex(nextIndex);
    setTitle(list[nextIndex].title);
    setCurrent(0);
    setDuration(0);
    setError(false);
    // chờ src mới được gán xong rồi phát tiếp nếu trước đó đang phát
    window.setTimeout(() => {
      const audio = audioRef.current;
      if (audio && shouldPlay) audio.play().catch(() => {});
    }, 0);
  };

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    needsGestureRef.current = false;
    if (audio.paused) audio.play().catch(() => {});
    else audio.pause();
  };

  const next = (forcePlay = false) => {
    if (!tracks.length) return;
    if (shuffle && tracks.length > 1) {
      // chọn ngẫu nhiên bài khác bài đang phát
      let r = index;
      while (r === index) {
        r = Math.floor(Math.random() * tracks.length);
      }
      playIndex(r, forcePlay);
    } else {
      playIndex(index + 1, forcePlay);
    }
  };
  const previous = (forcePlay = false) => playIndex(index - 1, forcePlay);

  const changeVolume = (delta: number) => {
    const nextVolume = Math.min(1, Math.max(0, volume + delta));
    setVolume(nextVolume);
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = nextVolume;
    if (nextVolume > 0 && audio.muted) {
      audio.muted = false;
      setMuted(false);
    } else if (nextVolume === 0) {
      audio.muted = true;
      setMuted(true);
    }
    try {
      localStorage.setItem("player-volume", String(nextVolume));
    } catch {
      // bỏ qua
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.muted) {
      audio.muted = false;
    } else {
      audio.muted = true;
    }
    setMuted(audio.muted);
  };

  const seek = (event: MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || duration <= 0) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const ratio = Math.min(
      1,
      Math.max(0, (event.clientX - rect.left) / rect.width),
    );
    audio.currentTime = ratio * duration;
  };

  const progress = duration > 0 ? (current / duration) * 100 : 0;

  return (
    <div className="fixed left-1/2 top-[4.5rem] z-20 w-[min(560px,calc(100vw-2rem))] -translate-x-1/2 lg:top-4">
      <div
        ref={cardRef}
        className="glass-panel flex items-center gap-3 rounded-xl px-3 py-2.5 sm:gap-4 sm:px-4"
      >
        {/* bìa nhạc */}
        <div className="relative hidden h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-nebula-soft/40 bg-gradient-to-br from-[#2a2560] to-[#12112b] text-xl text-stardust sm:flex">
          <span className={playing ? "animate-flicker" : "opacity-80"}>♪</span>
        </div>

        {/* tên bài + tiến trình */}
        <div className="min-w-0 flex-1">
          <div className="flex min-w-0 items-center gap-2">
            <p className="min-w-0 truncate font-display text-xs font-bold text-ice">
              {title}
            </p>
            {error && (
              <span className="shrink-0 rounded-full bg-flare/15 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-flare">
                Lỗi tải nhạc
              </span>
            )}
          </div>
          <div className="mt-1.5 flex items-center gap-2">
            <span className="w-9 shrink-0 font-mono text-[10px] text-nebula-soft">
              {fmt(current)}
            </span>
            <div
              onClick={seek}
              aria-label="Tiến trình bài hát"
              className="relative h-1.5 flex-1 cursor-pointer overflow-hidden rounded-full bg-white/10"
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-nebula to-stardust"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="w-9 shrink-0 text-right font-mono text-[10px] text-nebula-soft">
              {fmt(duration)}
            </span>
          </div>
        </div>

        {/* nút điều khiển */}
        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={() => setShuffle((s) => !s)}
            aria-label={shuffle ? "Tắt trộn bài" : "Trộn bài"}
            aria-pressed={shuffle}
            className={`rounded-full p-1.5 transition-colors ${
              shuffle
                ? "bg-stardust/15 text-stardust hover:bg-stardust/25"
                : "text-ice/80 hover:bg-white/5 hover:text-stardust"
            }`}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M2 18h1.4c1.3 0 2.5-.6 3.3-1.7l6.1-8.6c.8-1.1 2-1.7 3.3-1.7H22" />
              <path d="m18 2 4 4-4 4" />
              <path d="M2 6h1.9c1.5 0 2.9.9 3.6 2.2" />
              <path d="M22 18h-5.9c-1.3 0-2.5-.6-3.3-1.7l-.5-.8" />
              <path d="m18 14 4 4-4 4" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => previous()}
            aria-label="Bài trước"
            className="rounded-full p-1.5 text-ice/80 transition-colors hover:bg-white/5 hover:text-stardust"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
              <path d="M18 5v14l-8-7zM8 5H6v14h2z" />
            </svg>
          </button>
          <button
            type="button"
            onClick={toggle}
            aria-label={playing ? "Tạm dừng" : "Phát nhạc"}
            className="rounded-full bg-nebula/80 p-2.5 text-white transition-colors hover:bg-nebula"
          >
            {playing ? (
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
          <button
            type="button"
            onClick={() => next()}
            aria-label="Bài tiếp theo"
            className="rounded-full p-1.5 text-ice/80 transition-colors hover:bg-white/5 hover:text-stardust"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
              <path d="M6 5v14l8-7zM16 5h2v14h-2z" />
            </svg>
          </button>

          {/* chia nhóm âm lượng */}
          <span className="mx-1 hidden h-4 w-px bg-white/10 sm:block" />
          <button
            type="button"
            onClick={() => changeVolume(-0.1)}
            aria-label="Giảm âm lượng"
            className="rounded-full p-1.5 text-ice/80 transition-colors hover:bg-white/5 hover:text-stardust"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="h-4 w-4"
            >
              <path d="M5 12h14" />
            </svg>
          </button>
          <button
            type="button"
            onClick={toggleMute}
            aria-label={muted ? "Bật tiếng" : "Tắt tiếng"}
            className="rounded-full p-1.5 text-ice/80 transition-colors hover:bg-white/5 hover:text-stardust"
          >
            {muted ? (
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                <path d="M3 9v6h4l5 5V4L7 9H3zM16.5 12l4-4-1.4-1.4-4 4-4-4L9.7 8l4 4-4 4 1.4 1.4 4-4 4 4 1.4-1.4-4-4z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                <path d="M3 9v6h4l5 5V4L7 9H3zM16.5 12A4.5 4.5 0 0 0 14 8v8a4.5 4.5 0 0 0 2.5-4z" />
              </svg>
            )}
          </button>
          <button
            type="button"
            onClick={() => changeVolume(0.1)}
            aria-label="Tăng âm lượng"
            className="rounded-full p-1.5 text-ice/80 transition-colors hover:bg-white/5 hover:text-stardust"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="h-4 w-4"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
          </button>
        </div>
      </div>

      {/* phần tử audio ẩn — phát nhạc từ thư mục /music */}
      {/* chỉ render khi đã có danh sách nhạc, tránh sự kiện error do chưa có src */}
      {tracks.length > 0 && (
        <audio
          ref={audioRef}
          className="hidden"
          src={tracks[index]?.src}
          preload="metadata"
          onTimeUpdate={(e) => setCurrent(e.currentTarget.currentTime)}
          onLoadedMetadata={(e) => {
            setDuration(e.currentTarget.duration);
            setError(false);
          }}
          onPlay={() => {
            setPlaying(true);
            playingRef.current = true;
          }}
          onPause={() => {
            setPlaying(false);
            playingRef.current = false;
          }}
          onEnded={() => next(true)}
          onError={() => setError(true)}
          onVolumeChange={(e) => setMuted(e.currentTarget.muted)}
        />
      )}
    </div>
  );
}
