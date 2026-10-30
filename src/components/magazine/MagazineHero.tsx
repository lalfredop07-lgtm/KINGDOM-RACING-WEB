"use client";

import { useRef } from "react";
import { PrintObject } from "@/components/magazine/PrintObject";
import { Button } from "@/components/ui/Button";
import { gsap, MQ, SplitText, useGSAP } from "@/lib/gsap";
import { onIntroDone } from "@/lib/intro";
import { magazine } from "@/content/site";

/**
 * Concept — "Off the press": the published cover flies in edge-first out of the dark, lands at
 * an angle like a copy set down on a desk, and squares up to face the reader as the page scrolls.
 */
export function MagazineHero() {
  const ref = useRef<HTMLElement>(null);
  const latest = magazine.editions[0];

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();

      mm.add(MQ.motion, () => {
        const split = SplitText.create(el.querySelectorAll("[data-mh-word]"), { type: "chars", mask: "chars" });
        gsap.set("[data-mh-copy]", { autoAlpha: 1 });
        gsap.set(split.chars, { yPercent: 115 });
        gsap.set("[data-mh-fade]", { autoAlpha: 0, y: 24 });
        gsap.set("[data-mh-cover] [data-print-body]", { rotationY: -95, rotationX: 18, z: -500, xPercent: 40, autoAlpha: 0 });
        gsap.set("[data-mh-cover] [data-print-shadow]", { autoAlpha: 0, scaleX: 0.4 });

        const intro = gsap.timeline({ paused: true, defaults: { ease: "expo.out" } });
        intro
          .to(split.chars, { yPercent: 0, stagger: 0.035, duration: 1.4 }, 0)
          .to("[data-mh-cover] [data-print-body]", { rotationY: -26, rotationX: 6, z: 0, xPercent: 0, autoAlpha: 1, duration: 2.2, ease: "expo.out" }, 0.25)
          .to("[data-mh-cover] [data-print-shadow]", { autoAlpha: 1, scaleX: 1, duration: 1.8 }, 0.6)
          .to("[data-mh-fade]", { autoAlpha: 1, y: 0, stagger: 0.08, duration: 1.1 }, 0.8);
        const off = onIntroDone(() => intro.play());

        // Scroll squares the copy up to the reader, independent of the pointer tilt.
        const scroll = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: 1 } });
        scroll
          .to("[data-mh-turn]", { rotationY: 26, rotationX: -6, scale: 1.08, yPercent: 10 }, 0)
          .to("[data-mh-copy]", { yPercent: -18, autoAlpha: 0.15 }, 0)
          .to("[data-mh-seal]", { rotate: 160 }, 0)
          .to("[data-mh-glow]", { scale: 1.4, autoAlpha: 0.3 }, 0);

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
    <section ref={ref} data-theme="dark" data-chapter="Magazine" className="relative overflow-hidden bg-ink text-paper lg:h-[100svh] lg:min-h-[680px]">
      <div data-mh-glow aria-hidden className="absolute right-[-10%] top-[10%] size-[70vmax] rounded-full bg-[radial-gradient(closest-side,rgba(212,20,42,0.28),transparent)] lg:right-[-5%]" />
      <div className="grain absolute inset-0 overflow-hidden" />

      <div className="shell gutter relative grid h-full items-center gap-14 pb-20 pt-[calc(var(--nav-h)+3rem)] lg:grid-cols-12 lg:gap-8 lg:pb-12">
        <div data-mh-copy data-reveal className="lg:col-span-7">
          <p data-mh-fade className="eyebrow flex items-center gap-3 text-paper/80">
            <span className="h-px w-10 bg-red" />
            Published by Kingdom Racing · Free
          </p>
          <h1 className="display mt-7 text-[clamp(4rem,min(12.5vw,20svh),11.5rem)] leading-[0.86]" aria-label="GOD SPEED Magazine">
            <span data-mh-word className="block" aria-hidden>
              GOD
            </span>
            <span data-mh-word className="block" aria-hidden>
              SPEED
            </span>
            <span data-mh-word className="block pl-[0.6em] text-[0.42em] italic text-red max-sm:pl-[0.2em]" aria-hidden>
              Magazine
            </span>
          </h1>
          <p data-mh-fade className="t-lead mt-8 max-w-[30rem] text-paper/75">
            {magazine.promise}
          </p>
          <div data-mh-fade className="mt-10 flex flex-wrap items-center gap-4">
            <Button href="#subscribe" variant="solid">
              Subscribe for free
            </Button>
          </div>
        </div>

        <div className="relative mx-auto w-[min(76vw,23rem)] lg:col-span-5 lg:w-[min(100%,26rem,calc(62svh*0.77))] [perspective:1800px]">
          <div data-mh-turn className="[transform-style:preserve-3d]">
            <div data-mh-cover className="[transform-style:preserve-3d]">
              <PrintObject src={latest.cover} alt={latest.alt} width={latest.width} height={latest.height} priority stage={false} sizes="(min-width: 1024px) 420px, 76vw" />
            </div>
          </div>
          <div data-mh-seal data-mh-fade aria-hidden className="pointer-events-none absolute -left-12 -top-10 size-28 sm:-left-16 sm:size-32">
            <svg viewBox="0 0 200 200" className="size-full animate-[spin_24s_linear_infinite] text-paper/80">
              <defs>
                <path id="mag-seal" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
              </defs>
              <text className="fill-current font-sans text-[15px] font-medium uppercase tracking-[0.38em]">
                <textPath href="#mag-seal" textLength="486" lengthAdjust="spacing">Free • 100% free • Free • 100% free •</textPath>
              </text>
            </svg>
            <span className="display absolute inset-0 grid place-items-center text-[1.6rem] italic text-red">Free</span>
          </div>
          <p data-mh-fade className="micro mt-10 text-center text-paper/50">
            {latest.date} edition · {latest.credit}
          </p>
        </div>
      </div>
    </section>
  );
}
