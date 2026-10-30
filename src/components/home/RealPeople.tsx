"use client";

import { useRef } from "react";
import { Odometer } from "@/components/motion/Odometer";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { goal, stats } from "@/content/site";

/**
 * Concept — "Timing board": a clean, calm grid where rule lines draw themselves and numbers
 * roll into place digit by digit. Then one number — the vision — fills the width.
 */
export function RealPeople() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.from("[data-rule]", {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1.6,
          ease: "expo.inOut",
          stagger: 0.12,
          scrollTrigger: { trigger: "[data-board]", start: "top 85%", once: true },
        });
        gsap.from("[data-stat-copy]", {
          autoAlpha: 0,
          y: 20,
          stagger: 0.1,
          duration: 1.2,
          delay: 0.4,
          scrollTrigger: { trigger: "[data-board]", start: "top 85%", once: true },
        });
        gsap.fromTo(
          "[data-goal]",
          { letterSpacing: "0.12em", opacity: 0.2 },
          { letterSpacing: "-0.035em", opacity: 1, ease: "none", scrollTrigger: { trigger: "[data-goal]", start: "top 95%", end: "center 55%", scrub: true } },
        );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="impact" data-theme="light" data-chapter="Impact" className="relative py-28 sm:py-40">
      <div className="shell gutter grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Eyebrow index="03">Our impact</Eyebrow>
          <SplitReveal as="h2" className="display t-1 mt-8">
            Real people. <em>Real change.</em>
          </SplitReveal>
        </div>
        <div className="flex flex-col justify-end gap-8 lg:col-span-6 lg:col-start-7">
          <p className="t-lead text-mute">
            Through race weekends, community outreach, and ministry partnerships, we create moments that meet people where they are — and point them toward lasting hope.
          </p>
          <Button href="/impact" variant="circle">
            See the impact
          </Button>
        </div>
      </div>

      <div data-board className="shell gutter mt-20 grid grid-cols-2 gap-x-6 sm:mt-28 lg:grid-cols-4 lg:gap-x-10">
        {stats.map((s) => (
          <div key={s.label} className="relative pb-10 pt-8">
            <span data-rule className="absolute inset-x-0 top-0 block h-px bg-[var(--fg)]" />
            <Odometer value={s.value} suffix={s.suffix} plain={"plain" in s && s.plain} className="display text-[clamp(3.2rem,7vw,6.5rem)]" />
            <div data-stat-copy>
              <p className="eyebrow mt-5 text-[var(--fg)]">{s.label}</p>
              <p className="mt-2 max-w-[16rem] text-sm leading-relaxed text-mute">{s.note}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="shell gutter mt-16 sm:mt-24">
        <div className="relative border-t border-line pt-10">
          <p className="eyebrow text-red">The road ahead</p>
          <p data-goal className="display mt-4 whitespace-nowrap text-[clamp(3.4rem,15.5vw,16rem)] leading-[0.85]">
            1,000,000
          </p>
          <p className="t-lead mt-6 max-w-xl text-mute">{goal.label} One conversation, one family, one race weekend at a time.</p>
        </div>
      </div>
    </section>
  );
}
