"use client";

import { useRef } from "react";
import { PrintObject } from "@/components/magazine/PrintObject";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { magazine } from "@/content/site";

const latest = magazine.editions[0];

/**
 * Concept — "Hot off the press": two lines of outlined type run past each other like paper
 * through a press while the published cover drops out of depth, lands, and turns toward the reader.
 */
export function MagazineShowcase() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();

      mm.add(MQ.motion, () => {
        gsap.fromTo("[data-press='a']", { xPercent: 0 }, { xPercent: -30, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
        gsap.fromTo("[data-press='b']", { xPercent: -30 }, { xPercent: 0, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
      });

      mm.add(MQ.desktop, () => {
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: "[data-ms-stage]", start: "top top", end: "+=130%", pin: true, scrub: 1, anticipatePin: 1 },
        });
        tl.fromTo(
          "[data-ms-cover] [data-print-body]",
          { rotationX: 68, rotationZ: -20, rotationY: 0, yPercent: 70, z: -900, autoAlpha: 0 },
          { rotationX: 6, rotationZ: 0, rotationY: -24, yPercent: 0, z: 0, autoAlpha: 1, duration: 1, ease: "power3.out" },
          0,
        )
          .fromTo("[data-ms-cover] [data-print-shadow]", { autoAlpha: 0, scale: 0.3 }, { autoAlpha: 1, scale: 1, duration: 0.8 }, 0.2)
          .from("[data-ms-fade]", { autoAlpha: 0, y: 40, stagger: 0.08, duration: 0.5, ease: "power2.out" }, 0.45)
          .to("[data-ms-cover] [data-print-body]", { rotationY: 12, rotationX: -2, duration: 0.9 }, 1.05)
          .to({}, { duration: 0.2 });
      });

      mm.add(MQ.mobile, () => {
        gsap.from("[data-ms-cover] [data-print-body]", {
          rotationX: 55,
          rotationZ: -12,
          yPercent: 30,
          autoAlpha: 0,
          duration: 1.8,
          ease: "expo.out",
          scrollTrigger: { trigger: "[data-ms-cover]", start: "top 85%", once: true },
        });
        gsap.from("[data-ms-fade]", { autoAlpha: 0, y: 30, stagger: 0.08, duration: 1.1, scrollTrigger: { trigger: "[data-ms-copy]", start: "top 85%", once: true } });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  const press = "GOD SPEED Magazine · GOD SPEED Magazine · GOD SPEED Magazine · ";

  return (
    <section ref={ref} id="magazine" data-theme="dark" data-chapter="Magazine" className="relative overflow-hidden bg-ink text-paper">
      <div data-ms-stage className="relative overflow-hidden py-24 sm:py-32 lg:flex lg:h-[100svh] lg:items-center lg:py-0">
        <div aria-hidden className="pointer-events-none absolute inset-0 flex flex-col justify-center gap-[2vh] opacity-[0.16]">
          {(["a", "b"] as const).map((k) => (
            <p
              key={k}
              data-press={k}
              className={`display whitespace-nowrap text-[clamp(6rem,17vw,19rem)] leading-[0.95] text-transparent [-webkit-text-stroke:1px_#f4f1ec] ${k === "b" ? "italic" : ""}`}
            >
              {press}
              {press}
            </p>
          ))}
        </div>
        <div aria-hidden className="absolute right-[-15%] top-1/2 size-[60vmax] -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(212,20,42,0.25),transparent)]" />

        <div className="shell gutter relative grid w-full items-center gap-16 lg:grid-cols-12 lg:gap-8">
          <div data-ms-copy className="lg:col-span-6">
            <div data-ms-fade>
              <Eyebrow index="09">GOD SPEED Magazine</Eyebrow>
            </div>
            <SplitReveal as="h2" className="display t-1 mt-8">
              Stories of faith, <em>delivered free.</em>
            </SplitReveal>
            <p data-ms-fade className="t-lead mt-8 max-w-[30rem] text-paper/75">
              {magazine.promise} {magazine.free}
            </p>
            <div data-ms-fade className="mt-10 flex flex-wrap items-center gap-4">
              <Button href="/god-speed-magazine" variant="solid">
                Discover GOD SPEED Magazine
              </Button>
              <Button href="/god-speed-magazine#subscribe">Subscribe for Free</Button>
            </div>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <div data-ms-cover className="mx-auto w-[min(72vw,22rem)] [perspective:1800px] lg:w-[min(100%,24rem,calc(66svh*0.77))]">
              <PrintObject src={latest.cover} alt={latest.alt} width={latest.width} height={latest.height} sizes="(min-width: 1024px) 400px, 72vw" stage={false} />
            </div>
            <p data-ms-fade className="micro mt-10 text-center text-paper/55">
              {latest.date} edition · Cover story: {latest.coverStory.name}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
