"use client";

import React from "react";

type BackgroundMusicProps = {
  enabled?: boolean;
  onEnabledChange?: (enabled: boolean) => void;
  src?: string;
  volume?: number; // 0..1
};

const DEFAULT_SRC = "/music/jingle-bells.mp3";

export default function BackgroundMusic({
  enabled = true,
  onEnabledChange,
  src = DEFAULT_SRC,
  volume = 0.35,
}: BackgroundMusicProps) {
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const [needsInteraction, setNeedsInteraction] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);

  const createAudio = React.useCallback(() => {
    const audio = new Audio(encodeURI(src));
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = Math.min(1, Math.max(0, volume));
    audioRef.current = audio;
    return audio;
  }, [src, volume]);

  const tryPlay = React.useCallback(async () => {
    const audio = audioRef.current ?? createAudio();
    audio.volume = Math.min(1, Math.max(0, volume));
    try {
      setErrorMessage(null);
      await audio.play();
      setNeedsInteraction(false);
      setIsPlaying(true);
    } catch {
      setNeedsInteraction(true);
      setIsPlaying(false);
    }
  }, [createAudio, volume]);

  const pause = React.useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    setIsPlaying(false);
  }, []);

  React.useEffect(() => {
    const audio = createAudio();
    const onError = () => {
      setErrorMessage(
        "Audio failed to load/play. If you are on HTTPS, an HTTP music URL may be blocked (mixed content).",
      );
      setNeedsInteraction(true);
      setIsPlaying(false);
    };
    audio.addEventListener("error", onError);
    if (enabled) void tryPlay();

    return () => {
      audio.removeEventListener("error", onError);
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, [createAudio, enabled, tryPlay]);

  React.useEffect(() => {
    if (enabled) {
      void tryPlay();
    } else {
      pause();
      setNeedsInteraction(false);
      setErrorMessage(null);
    }
  }, [enabled, pause, tryPlay]);

  const onButtonClick = () => {
    if (enabled) {
      if (needsInteraction) {
        void tryPlay();
        return;
      }
      onEnabledChange?.(false);
      return;
    }

    onEnabledChange?.(true);
    void tryPlay();
  };

  const ariaLabel = enabled ? "关闭祝福语与圣诞老人（并暂停音乐）" : "开启祝福语与圣诞老人（并播放音乐）";
  const title = enabled
    ? isPlaying
      ? "关闭祝福/圣诞老人（音乐暂停）"
      : "关闭祝福/圣诞老人"
    : "开启祝福/圣诞老人（音乐播放）";

  return (
    <div className="fixed right-4 top-4 z-50 flex max-w-[18rem] flex-col items-end gap-2">
      {errorMessage ? (
        <div className="rounded-md bg-black/60 px-3 py-2 text-xs text-white backdrop-blur">
          {errorMessage}
        </div>
      ) : null}
      <button
        type="button"
        onClick={() => onButtonClick()}
        className="grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur hover:bg-white/15"
        aria-label={ariaLabel}
        title={title}
      >
        {enabled ? (
          isPlaying ? (
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M14 3v12.2a3.2 3.2 0 1 1-2-3V6.5l10-2.5v9.2a3.2 3.2 0 1 1-2-3V3.5L14 3Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M14 3v12.2a3.2 3.2 0 1 1-2-3V6.5l10-2.5v9.2a3.2 3.2 0 1 1-2-3V3.5L14 3Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
                opacity="0.85"
              />
              <path
                d="M5 5l14 14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          )
        ) : (
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M12 5v14"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M5 12h14"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        )}
      </button>
    </div>
  );
}
