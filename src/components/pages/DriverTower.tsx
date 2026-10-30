"use client";

import { useRef } from "react";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { drivers } from "@/content/site";

/**
 * Legacy page — "Timing tower": names slot into a broadcast-style tower one row at a time, then a
 * red sector line sweeps down it. The order is the order Kingdom Racing lists them, not a result.
 */
export function DriverTower() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: "[data-tower]", start: "top 78%", once: true } });
        tl.from("[data-row]", { xPercent: -104, duration: 1.1, stagger: 0.07, ease: "expo.out" })
          .from("[data-row-name]", { autoAlpha: 0, x: -20, duration: 0.8, stagger: 0.07, ease: "power3.out" }, 0.25)
          .fromTo("[data-sweep]", { yPercent: -100, autoAlpha: 1 }, { yPercent: drivers.length * 100, duration: 1.4, ease: "power2.inOut" }, 0.9)
          .to("[data-sweep]", { autoAlpha: 0, duration: 0.3 });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} data-theme="light" data-chapter="Drivers" className="relative py-24 sm:py-32">
      <div className="shell gutter grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Eyebrow index="02">On track</Eyebrow>
          <SplitReveal as="h2" className="display t-2 mt-6">
            Drivers who raced <em>with us.</em>
          </SplitReveal>
          <p className="t-lead mt-6 max-w-md text-mute">Kingdom Racing has competed in IndyCar, sports cars, sprint cars, and other motorsports with drivers including:</p>
          <p className="micro mt-8 text-mute">Listed as published by Kingdom Racing · not a race result</p>
        </div>

        <div data-tower className="relative overflow-hidden rounded-[4px] bg-ink text-paper lg:col-span-6 lg:col-start-7">
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
            <p className="micro text-red">Kingdom Racing</p>
            <p className="micro text-paper/50">Since 2007</p>
          </div>
          <ol className="relative">
            <span data-sweep aria-hidden className="pointer-events-none invisible absolute inset-x-0 top-0 z-10 h-[calc(100%/9)] bg-gradient-to-b from-transparent via-red/35 to-transparent" />
            {drivers.map((d, i) => (
              <li key={d} className="group overflow-hidden border-b border-white/[0.07] last:border-0">
                <div data-row className="flex items-center gap-5 px-5 py-3.5 transition-colors duration-300 group-hover:bg-red sm:py-4">
                  <span className="grid size-8 shrink-0 place-items-center rounded-[3px] bg-paper text-xs font-semibold tabular-nums text-ink">{i + 1}</span>
                  <span aria-hidden className="h-5 w-[3px] shrink-0 bg-red group-hover:bg-white" />
                  <span data-row-name className="display text-[clamp(1.4rem,2.2vw,2rem)] leading-none transition-transform duration-500 group-hover:translate-x-1 group-hover:italic">
                    {d}
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
