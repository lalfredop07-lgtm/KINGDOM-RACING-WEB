"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  /** Landscape source for large screens. */
  src: string;
  /** Lighter landscape source for small laptops / data saver. */
  srcSmall?: string;
  /** Portrait source for phones. */
  srcPortrait?: string;
  poster: string;
  posterPortrait?: string;
  className?: string;
  label?: string;
  /** Below this viewport width only the poster shows (no download), where the footage is decorative. */
  minWidth?: number;
};

/**
 * Plays generated race footage as an endless forward loop. The playhead is never
 * tied to scroll position, so cars can't appear to drive backward on scroll-up.
 * The file is only chosen once the loop comes near the viewport, so a phone never downloads
 * every loop on a page up front; the poster holds the frame until then.
 */
export function VideoLoop({ src, srcSmall, srcPortrait, poster, posterPortrait, className = "", label, minWidth }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const [source, setSource] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = wrap.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (minWidth && window.innerWidth < minWidth) return;
    const pick = () => {
      const portrait = window.matchMedia("(max-aspect-ratio: 4/5)").matches;
      const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
      if (portrait && srcPortrait) setSource(srcPortrait);
      else if (srcSmall && (window.innerWidth < 1400 || conn?.saveData)) setSource(srcSmall);
      else setSource(src);
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        pick();
        io.disconnect();
      },
      { rootMargin: "75% 25%" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [src, srcSmall, srcPortrait, minWidth]);

  useEffect(() => {
    const video = ref.current;
    if (!video || !source) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.01 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, [source]);

  return (
    <div ref={wrap} className={`absolute inset-0 ${className}`}>
      <picture>
        {posterPortrait ? <source media="(max-aspect-ratio: 4/5)" srcSet={posterPortrait} /> : null}
        <img src={poster} alt="" className="absolute inset-0 h-full w-full object-cover" fetchPriority="high" />
      </picture>
      {source ? (
        <video
          ref={ref}
          src={source}
          muted
          loop
          playsInline
          autoPlay
          preload="auto"
          aria-label={label}
          onPlaying={() => setReady(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}
        />
      ) : null}
    </div>
  );
}
