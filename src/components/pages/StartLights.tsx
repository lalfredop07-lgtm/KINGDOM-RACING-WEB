"use client";

import { useRef } from "react";
import { gsap, MQ, useGSAP } from "@/lib/gsap";

/**
 * Racing page — "Lights out": five pairs of start lights come on one by one with the scroll,
 * hold, then go dark together, and the message launches off the line.
 */
export function StartLights() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add({ desktop: MQ.desktop, mobile: MQ.mobile }, (ctx) => {
        const { desktop, mobile } = ctx.conditions as { desktop: boolean; mobile: boolean };
        if (!desktop && !mobile) return;
        const cols = gsap.utils.toArray<HTMLElement>("[data-light-col]", el);
        gsap.set("[data-go]", { autoAlpha: 0, yPercent: 40 });
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          // Phones get a shorter pin so the countdown never feels stuck.
          scrollTrigger: { trigger: el, start: "top top", end: mobile ? "+=100%" : "+=140%", pin: true, scrub: 0.6, anticipatePin: 1 },
        });
        cols.forEach((c, i) => {
          tl.to(c.querySelectorAll("[data-lamp]"), { backgroundColor: "#ff1f3a", boxShadow: "0 0 38px 6px rgba(212,20,42,0.75)", duration: 0.12 }, i * 0.5);
        });
        tl.to("[data-ready]", { autoAlpha: 0, duration: 0.3 }, 2.6)
          .to("[data-lamp]", { backgroundColor: "#2a2a2d", boxShadow: "0 0 0 0 rgba(212,20,42,0)", duration: 0.06 }, 3)
          .to("[data-lights]", { scale: 0.82, yPercent: -30, duration: 0.8 }, 3)
          .to("[data-go]", { autoAlpha: 1, yPercent: 0, stagger: 0.12, duration: 0.6, ease: "power3.out" }, 3.05)
          .to({}, { duration: 0.6 });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} data-theme="dark" data-chapter="Lights out" className="relative flex h-[100svh] min-h-[560px] items-center overflow-hidden bg-ink text-paper">
      <div className="grain absolute inset-0 overflow-hidden" />
      <p data-ready className="micro absolute inset-x-0 bottom-10 hidden text-center text-paper/55 [.js-motion_&]:block">
        Scroll to start
      </p>
      <div className="shell gutter relative w-full text-center">
        <div data-lights aria-hidden className="mx-auto flex w-fit gap-3 rounded-[10px] bg-ink-2 p-3 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] sm:gap-5 sm:p-5">
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} data-light-col className="flex flex-col gap-2.5 rounded-[6px] bg-black p-2 sm:gap-3 sm:p-3">
              {[0, 1].map((j) => (
                <span key={j} data-lamp className="block size-9 rounded-full bg-[#2a2a2d] sm:size-14" />
              ))}
            </div>
          ))}
        </div>
        <h2 className="display t-hero mt-12 leading-[0.9] sm:mt-14">
          <span data-go className="block">
            Lights out.
          </span>
          <span data-go className="block text-[0.4em] italic text-red">
            Every event is an open door.
          </span>
        </h2>
        <p data-go className="t-lead mx-auto mt-8 max-w-xl text-paper/70">
          On each weekend of the ministry schedule, volunteers serve as Ambassadors, host Miles of Smiles guests, and — at select circuits — gather fans for praise and worship at Fan Festivals.
        </p>
      </div>
    </section>
  );
}
