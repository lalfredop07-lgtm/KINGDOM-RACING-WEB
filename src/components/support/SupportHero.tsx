"use client";

import { useRef } from "react";
import { VideoLoop } from "@/components/motion/VideoLoop";
import { gsap, MQ, SplitText, useGSAP } from "@/lib/gsap";
import { onIntroDone } from "@/lib/intro";

/**
 * Support opener — "Full throttle", compact: the car pulls away toward the sunset while the
 * headline rises letter by letter. It stays short on purpose — the giving and contact cards
 * (SupportActions) rise over its lower edge, so both are on the first screen.
 */
export function SupportHero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const split = SplitText.create(el.querySelector("[data-sh-title]"), { type: "lines,chars", mask: "lines" });
        gsap.set("[data-sh-copy]", { autoAlpha: 1 });
        gsap.set(split.chars, { yPercent: 110 });
        gsap.set("[data-sh-fade]", { autoAlpha: 0, y: 20 });
        gsap.set("[data-sh-line]", { scaleX: 0 });
        gsap.set("[data-sh-zoom]", { scale: 1.25 });
        const tl = gsap.timeline({ paused: true, defaults: { ease: "expo.out" } });
        tl.to("[data-sh-zoom]", { scale: 1.04, duration: 2.4 })
          .to("[data-sh-line]", { scaleX: 1, duration: 1.2, ease: "expo.inOut" }, 0.05)
          .to(split.chars, { yPercent: 0, stagger: 0.025, duration: 1.1 }, 0.1)
          .to("[data-sh-fade]", { autoAlpha: 1, y: 0, stagger: 0.06, duration: 0.9 }, 0.3);
        const off = onIntroDone(() => tl.play());
        gsap.to("[data-sh-media]", { yPercent: 18, ease: "none", scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true } });
        return () => {
          off();
          split.revert();
        };
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="intro" data-theme="dark" data-chapter="Support" className="relative overflow-hidden bg-ink text-paper">
      <div data-sh-media className="absolute inset-0">
        <div data-sh-zoom className="absolute inset-0">
          <VideoLoop
            src="/media/chase.mp4"
            poster="/media/chase-poster.jpg"
            label="Illustrative footage: an open-wheel race car accelerates toward the setting sun on a banked speedway."
            // On phones the opener is a short band behind the type; its still frame keeps the giving card first to load.
            minWidth={640}
            className="[&_img]:object-[62%_60%] [&_video]:object-[62%_60%]"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/30 to-transparent" />
        <div className="grain absolute inset-0 overflow-hidden" />
      </div>

      <div
        data-sh-copy
        data-reveal
        className="shell gutter relative grid gap-5 pb-24 pt-[calc(var(--nav-h)+2.25rem)] sm:pb-28 lg:grid-cols-12 lg:items-end lg:gap-10 lg:pb-44 lg:pt-[calc(var(--nav-h)+3.5rem)]"
      >
        <div className="lg:col-span-7">
          <p data-sh-fade className="eyebrow flex items-center gap-3 text-paper/85">
            <span data-sh-line className="h-px w-10 origin-left bg-red" />
            Support Kingdom Racing
          </p>
          <h1 data-sh-title className="display mt-4 text-[clamp(3.4rem,7.4vw,8rem)] leading-[0.9] sm:mt-5">
            Fuel the <em className="text-red">Mission.</em>
          </h1>
        </div>
        <div className="lg:col-span-5 lg:pb-3">
          <p data-sh-fade className="t-lead max-w-xl text-paper/85">
            Your generosity helps Kingdom Racing share God’s Word, connect with communities, and bring faith and purpose to the world of motorsports.
          </p>
          <p data-sh-fade className="micro mt-4 text-paper/45 max-sm:hidden">
            Illustrative footage
          </p>
        </div>
      </div>
    </section>
  );
}
