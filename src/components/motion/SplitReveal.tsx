"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, MQ, SplitText, useGSAP } from "@/lib/gsap";

type Props = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  /** "lines" rises each line out of a mask; "chars" staggers letters for display moments. */
  by?: "lines" | "words" | "chars";
  delay?: number;
  stagger?: number;
  start?: string;
  /** Play immediately on mount instead of waiting for the viewport. */
  immediate?: boolean;
};

export function SplitReveal({
  as: Tag = "div",
  children,
  className,
  by = "lines",
  delay = 0,
  stagger,
  start = "top 86%",
  immediate = false,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.set(el, { autoAlpha: 1 });
        const split = SplitText.create(el, {
          type: by === "chars" ? "lines,words,chars" : by === "words" ? "lines,words" : "lines",
          mask: "lines",
          linesClass: "split-line",
          autoSplit: true,
          onSplit(self) {
            const targets = by === "chars" ? self.chars : by === "words" ? self.words : self.lines;
            return gsap.from(targets, {
              yPercent: 118,
              rotate: by === "lines" ? 2.5 : 0,
              transformOrigin: "0% 100%",
              duration: by === "chars" ? 1.1 : 1.35,
              ease: "expo.out",
              delay,
              stagger: stagger ?? (by === "chars" ? 0.028 : by === "words" ? 0.04 : 0.11),
              scrollTrigger: immediate ? undefined : { trigger: el, start, once: true },
            });
          },
        });
        return () => split.revert();
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className} data-reveal>
      {children}
    </Tag>
  );
}
