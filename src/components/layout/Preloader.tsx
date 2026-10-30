"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { LOGO } from "@/components/ui/Logo";
import { gsap, useGSAP } from "@/lib/gsap";
import { markIntroDone } from "@/lib/intro";

const KEY = "kr-intro-seen";

/** First-visit opening titles: the logo is revealed, then the frame splits like a starting light. */
export function Preloader() {
  const ref = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      let seen = false;
      try {
        seen = sessionStorage.getItem(KEY) === "1";
      } catch {}
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (seen || reduce) {
        setGone(true);
        markIntroDone();
        return;
      }

      const count = { v: 0 };
      const num = el.querySelector<HTMLElement>("[data-count]");
      const tl = gsap.timeline({
        defaults: { ease: "expo.inOut" },
        onComplete: () => {
          try {
            sessionStorage.setItem(KEY, "1");
          } catch {}
          setGone(true);
        },
      });
      tl.to(count, {
        v: 100,
        duration: 1.9,
        ease: "power2.inOut",
        onUpdate: () => {
          if (num) num.textContent = String(Math.round(count.v)).padStart(3, "0");
        },
      })
        .fromTo("[data-logo]", { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5 }, 0.1)
        .fromTo("[data-bar]", { scaleX: 0 }, { scaleX: 1, duration: 1.9, ease: "power2.inOut" }, 0)
        .fromTo("[data-word]", { yPercent: 120 }, { yPercent: 0, stagger: 0.12, duration: 1, ease: "expo.out" }, 0.5)
        .to("[data-inner]", { autoAlpha: 0, y: -24, duration: 0.6, ease: "power2.in" }, 2.05)
        .add(() => markIntroDone(), 2.35)
        .to("[data-top]", { yPercent: -100, duration: 1.1 }, 2.35)
        .to("[data-bottom]", { yPercent: 100, duration: 1.1 }, 2.35);
      // Phones and tablets get the same titles in about half the time, so content is never kept waiting.
      if (window.matchMedia("(max-width: 1023px)").matches) tl.timeScale(1.75);
    },
    { scope: ref },
  );

  if (gone) return null;

  return (
    <div ref={ref} className="pointer-events-none fixed inset-0 z-[200]" aria-hidden="true">
      <div data-top className="absolute inset-x-0 top-0 h-1/2 bg-ink" />
      <div data-bottom className="absolute inset-x-0 bottom-0 h-1/2 bg-ink" />
      <div data-inner className="absolute inset-0 flex flex-col items-center justify-center gap-8 text-paper">
        <Image data-logo src="/brand/kingdom-racing-logo-light.png" alt="" {...LOGO} sizes="340px" priority className="h-auto w-[min(62vw,340px)]" />
        <div className="flex gap-3 overflow-hidden font-serif text-xl italic text-paper/80 sm:text-2xl">
          {["Speed.", "People.", "Purpose."].map((w) => (
            <span key={w} data-word className="inline-block">
              {w}
            </span>
          ))}
        </div>
        <div className="absolute inset-x-[var(--gutter)] bottom-10 flex items-center gap-6">
          <span data-count className="micro tabular-nums text-paper/70">
            000
          </span>
          <span className="relative h-px flex-1 bg-paper/15">
            <span data-bar className="absolute inset-0 origin-left bg-red" />
          </span>
          <span className="micro text-paper/70">Galveston, TX</span>
        </div>
      </div>
    </div>
  );
}
