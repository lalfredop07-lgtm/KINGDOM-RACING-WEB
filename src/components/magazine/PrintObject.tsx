"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, MQ, useGSAP } from "@/lib/gsap";

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** "magazine" is a thin stapled issue; "book" has a deep page block and a spine. */
  kind?: "magazine" | "book";
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Lean toward the pointer on devices with a fine pointer. */
  tilt?: boolean;
  /**
   * Owns its own perspective by default. Pass false when a parent supplies the perspective and
   * rotates the object as well, so the whole chain stays in one 3D space.
   */
  stage?: boolean;
};

/**
 * A printed object built from its real cover: the front face is the published cover image, and
 * CSS faces add the page block, spine, and a moving gloss. Parents animate `[data-print-body]`
 * for scroll choreography; pointer tilt lives on a separate wrapper so the two never fight.
 */
export function PrintObject({ src, alt, width, height, kind = "magazine", className = "", sizes = "420px", priority, tilt = true, stage = true }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const depth = kind === "book" ? 30 : 6;
  const pages = "repeating-linear-gradient(90deg, #efeae1 0 1px, #d9d2c6 1px 2px)";
  const pagesH = "repeating-linear-gradient(0deg, #efeae1 0 1px, #d9d2c6 1px 2px)";

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || !tilt) return;
      const mm = gsap.matchMedia();
      mm.add(`${MQ.fine} and ${MQ.motion}`, () => {
        const target = el.querySelector<HTMLElement>("[data-print-tilt]")!;
        const gloss = el.querySelector<HTMLElement>("[data-print-gloss]")!;
        const rx = gsap.quickTo(target, "rotationX", { duration: 0.9, ease: "power3" });
        const ry = gsap.quickTo(target, "rotationY", { duration: 0.9, ease: "power3" });
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          ry(px * 16);
          rx(-py * 12);
          gloss.style.setProperty("--gx", `${(px + 0.5) * 100}%`);
          gloss.style.setProperty("--gy", `${(py + 0.5) * 100}%`);
        };
        const leave = () => {
          rx(0);
          ry(0);
        };
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", leave);
        return () => {
          el.removeEventListener("pointermove", move);
          el.removeEventListener("pointerleave", leave);
        };
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={`relative ${stage ? "[perspective:1800px]" : "[transform-style:preserve-3d]"} ${className}`} style={{ aspectRatio: `${width} / ${height}` }}>
      {/* Ground shadow stays flat while the object moves above it. */}
      <div data-print-shadow aria-hidden className="absolute inset-x-[6%] -bottom-[7%] h-[12%] rounded-[50%] bg-black/45 blur-2xl" />
      <div data-print-tilt className="absolute inset-0 [transform-style:preserve-3d]">
        <div data-print-body className="absolute inset-0 will-change-transform [transform-style:preserve-3d]">
          {/* Back cover */}
          <div aria-hidden className="absolute inset-0 rounded-[2px] bg-[#1a1a1c] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)]" style={{ transform: `translateZ(${-depth}px)` }} />
          {/* Fore-edge, head and tail: the page block */}
          <div aria-hidden className="absolute left-full top-[0.6%] h-[98.8%] origin-left" style={{ width: depth, background: pages, transform: "rotateY(90deg)" }} />
          <div aria-hidden className="absolute bottom-full left-0 w-[99.4%] origin-bottom" style={{ height: depth, background: pagesH, transform: "rotateX(90deg)" }} />
          <div aria-hidden className="absolute left-0 top-full w-[99.4%] origin-top" style={{ height: depth, background: pagesH, transform: "rotateX(-90deg)" }} />
          {/* Spine */}
          <div
            aria-hidden
            className="absolute right-full top-0 h-full origin-right"
            style={{ width: depth, background: kind === "book" ? "linear-gradient(90deg,#0b0b0c,#232326 45%,#0b0b0c)" : "#d6cfc3", transform: "rotateY(-90deg)" }}
          />
          {/* Front cover */}
          <div className="absolute inset-0 overflow-hidden rounded-[2px] bg-ink [backface-visibility:hidden]">
            <Image src={src} alt={alt} fill priority={priority} sizes={sizes} quality={95} className="object-cover" />
            {kind === "book" ? (
              <span aria-hidden className="absolute inset-y-0 left-[3.5%] w-[2.5%] bg-gradient-to-r from-black/30 via-white/10 to-transparent" />
            ) : (
              <span aria-hidden className="absolute inset-y-0 left-0 w-[3%] bg-gradient-to-r from-black/25 to-transparent" />
            )}
            <span
              data-print-gloss
              aria-hidden
              className="pointer-events-none absolute inset-0 mix-blend-soft-light [--gx:30%] [--gy:20%]"
              style={{ background: "radial-gradient(70% 55% at var(--gx) var(--gy), rgba(255,255,255,0.55), transparent 60%), linear-gradient(115deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%)" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
