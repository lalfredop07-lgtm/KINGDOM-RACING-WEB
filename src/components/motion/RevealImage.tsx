"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { VideoLoop } from "./VideoLoop";

type Props = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Edge the mask opens from. */
  from?: "bottom" | "left" | "right" | "top" | "center";
  /** Strength of the inner scroll parallax, in percent. */
  parallax?: number;
  position?: string;
  caption?: string;
  /** Optional forward-only loop that plays over the still once it has buffered. */
  video?: string;
};

const CLIP = {
  bottom: "inset(100% 0% 0% 0%)",
  top: "inset(0% 0% 100% 0%)",
  left: "inset(0% 100% 0% 0%)",
  right: "inset(0% 0% 0% 100%)",
  center: "inset(18% 18% 18% 18%)",
} as const;

export function RevealImage({
  src,
  alt,
  className = "",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority,
  from = "bottom",
  parallax = 8,
  position = "50% 50%",
  caption,
  video,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const inner = el.querySelector<HTMLElement>("[data-inner]");
      const img = el.querySelector<HTMLElement>("[data-media]");
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.set(el, { autoAlpha: 1 });
        const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 88%", once: true } });
        tl.fromTo(el, { clipPath: CLIP[from] }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.6, ease: "expo.inOut" })
          .fromTo(img, { scale: 1.35 }, { scale: 1, duration: 2.2, ease: "expo.out" }, 0.15);
        if (parallax && inner) {
          gsap.fromTo(
            inner,
            { yPercent: -parallax },
            {
              yPercent: parallax,
              ease: "none",
              scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        }
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <figure ref={ref} className={`relative overflow-hidden bg-ink-3 ${className}`} data-reveal>
      <div data-inner className="absolute inset-x-0 -inset-y-[12%]">
        <div data-media className="absolute inset-0">
          {video ? (
            <VideoLoop src={video} poster={src} label={alt} />
          ) : (
            <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" style={{ objectPosition: position }} />
          )}
        </div>
      </div>
      {caption ? (
        <figcaption className="micro absolute bottom-3 left-3 z-10 rounded-full bg-black/45 px-2.5 py-1 text-white/80 backdrop-blur-sm">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
