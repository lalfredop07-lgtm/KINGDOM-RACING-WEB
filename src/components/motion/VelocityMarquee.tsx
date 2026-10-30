"use client";

import { useRef, type ReactNode } from "react";
import { gsap, MQ, ScrollTrigger, useGSAP } from "@/lib/gsap";

/**
 * A ribbon that always travels forward (right to left). Scrolling in either
 * direction only adds speed — it never reverses, echoing the race footage.
 */
export function VelocityMarquee({ children, speed = 60, className = "" }: { children: ReactNode; speed?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      const track = el?.querySelector<HTMLElement>("[data-track]");
      if (!el || !track) return;
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        let x = 0;
        let boost = 0;
        const setX = gsap.quickSetter(track, "x", "px");
        const setSkew = gsap.quickSetter(track, "skewX", "deg");
        const st = ScrollTrigger.create({
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            boost = Math.min(Math.abs(self.getVelocity()) / 18, 900);
          },
        });
        const tick = (_t: number, dt: number) => {
          const half = track.scrollWidth / 2;
          boost *= 0.92;
          x -= ((speed + boost) * dt) / 1000;
          if (x <= -half) x += half;
          setX(x);
          setSkew(-Math.min(boost / 90, 6));
        };
        gsap.ticker.add(tick);
        return () => {
          gsap.ticker.remove(tick);
          st.kill();
        };
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={`overflow-hidden ${className}`} aria-hidden="true">
      <div data-track className="flex w-max will-change-transform">
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0">{children}</div>
      </div>
    </div>
  );
}
