"use client";

import { useRef } from "react";
import { VideoLoop } from "@/components/motion/VideoLoop";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { scripture, site } from "@/content/site";

/**
 * Concept — "Zoom-through": a small framed photograph opens into a full-bleed scene while
 * the three pillars — Faith, Spirit, Truth — take turns at center stage, ending on Scripture.
 */
export function HigherPurpose() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();

      const build = (length: string) => {
        const words = gsap.utils.toArray<HTMLElement>("[data-pillar]", el);
        gsap.set(words, { yPercent: 100, autoAlpha: 0 });
        gsap.set("[data-verse]", { autoAlpha: 0, y: 30 });
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: el, start: "top top", end: length, pin: true, scrub: 1, anticipatePin: 1 },
        });
        tl.fromTo("[data-hp-frame]", { clipPath: "inset(26% 32% 26% 32% round 4px)" }, { clipPath: "inset(0% 0% 0% 0% round 0px)", duration: 3 }, 0)
          .fromTo("[data-hp-img]", { scale: 1.45 }, { scale: 1, duration: 3 }, 0)
          .fromTo("[data-hp-shade]", { opacity: 0.1 }, { opacity: 0.62, duration: 2 }, 1)
          .to("[data-hp-intro]", { autoAlpha: 0, y: -40, duration: 1 }, 0.6);
        words.forEach((w, i) => {
          const t = 2 + i * 1.6;
          tl.to(w, { yPercent: 0, autoAlpha: 1, duration: 0.8, ease: "power2.out" }, t);
          if (i < words.length - 1) tl.to(w, { yPercent: -100, autoAlpha: 0, duration: 0.8, ease: "power2.in" }, t + 1.1);
        });
        tl.to(words[words.length - 1], { yPercent: -60, autoAlpha: 0, duration: 0.8 }, 2 + words.length * 1.6 - 0.3).to(
          "[data-verse]",
          { autoAlpha: 1, y: 0, duration: 1 },
          2 + words.length * 1.6,
        );
        tl.to({}, { duration: 0.6 });
      };

      mm.add(MQ.desktop, () => build("+=260%"));
      // Phones get a shorter pin so the story never feels stuck.
      mm.add(MQ.mobile, () => build("+=130%"));
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="higher-purpose" data-theme="dark" data-chapter="Faith" className="relative h-[100svh] min-h-[560px] overflow-hidden bg-ink text-paper">
      <div data-hp-frame className="absolute inset-0 overflow-hidden">
        <div data-hp-img className="absolute inset-0">
          <VideoLoop
            src="/media/prayer.mp4"
            poster="/media/prayer-poster.jpg"
            label="Illustrative footage: race fans and families pray together beside the speedway at sunset."
          />
        </div>
        <div data-hp-shade className="absolute inset-0 bg-ink opacity-60" />
        <div className="grain absolute inset-0 overflow-hidden" />
      </div>

      <div data-hp-intro className="gutter pointer-events-none absolute inset-x-0 top-[calc(var(--nav-h)+1.5rem)] flex items-start justify-between">
        <p className="eyebrow text-red">04 — Faith in action</p>
        <p className="micro hidden text-paper/60 sm:block">Driven by a higher purpose</p>
      </div>
      <div data-hp-intro className="gutter pointer-events-none absolute inset-x-0 bottom-10 hidden justify-between [.js-motion_&]:flex">
        <h2 className="display t-3 max-w-[12ch] leading-[0.95]">
          Driven by a <em>higher</em> purpose.
        </h2>
      </div>

      {/* Static composition when motion is reduced or scripts are unavailable. */}
      <div className="gutter absolute inset-0 grid place-items-center text-center [.js-motion_&]:hidden">
        <div>
          <p className="display t-2 italic">{site.pillars.join(". ")}.</p>
          <p className="display t-4 mx-auto mt-8 max-w-3xl leading-[1.15]">“{scripture.text}”</p>
          <p className="micro mt-6 text-paper/70">{scripture.ref}</p>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 hidden place-items-center [.js-motion_&]:grid">
        {site.pillars.map((p) => (
          <p key={p} data-pillar className="display t-hero absolute italic">
            {p}.
          </p>
        ))}
        <blockquote data-verse className="gutter absolute max-w-4xl text-center">
          <p className="display t-3 leading-[1.08]">“{scripture.text}”</p>
          <footer className="micro mt-8 text-paper/70">{scripture.ref}</footer>
        </blockquote>
      </div>
    </section>
  );
}
