"use client";

import Image from "next/image";
import { useRef, type ReactNode } from "react";
import { gsap, MQ, SplitText, useGSAP } from "@/lib/gsap";
import { onIntroDone } from "@/lib/intro";

type Props = {
  eyebrow: string;
  title: ReactNode;
  intro: string;
  image: string;
  alt: string;
  position?: string;
};

/**
 * Inner-page opener — "Aperture": the photograph settles from a deep zoom while the title
 * characters rise; on scroll the image sinks slower than the type for depth.
 */
export function PageHero({ eyebrow, title, intro, image, alt, position = "50% 50%" }: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const split = SplitText.create(el.querySelector("[data-ph-title]"), { type: "lines,chars", mask: "lines" });
        gsap.set("[data-ph-copy]", { autoAlpha: 1 });
        gsap.set(split.chars, { yPercent: 110 });
        gsap.set("[data-ph-fade]", { autoAlpha: 0, y: 24 });
        gsap.set("[data-ph-img]", { scale: 1.3 });
        const tl = gsap.timeline({ paused: true, defaults: { ease: "expo.out" } });
        tl.to("[data-ph-img]", { scale: 1.05, duration: 2.6 })
          .to(split.chars, { yPercent: 0, stagger: 0.022, duration: 1.3 }, 0.25)
          .to("[data-ph-fade]", { autoAlpha: 1, y: 0, stagger: 0.08, duration: 1.1 }, 0.7);
        const off = onIntroDone(() => tl.play());
        gsap.to("[data-ph-media]", { yPercent: 18, ease: "none", scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true } });
        gsap.to("[data-ph-copy]", { yPercent: -20, autoAlpha: 0.2, ease: "none", scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true } });
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
    <section ref={ref} data-theme="dark" data-chapter="Intro" className="relative h-[88svh] min-h-[600px] overflow-hidden bg-ink text-paper">
      <div data-ph-media className="absolute inset-0">
        <div data-ph-img className="absolute inset-0">
          <Image src={image} alt={alt} fill priority sizes="100vw" className="object-cover" style={{ objectPosition: position }} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/60 to-transparent" />
        <div className="grain absolute inset-0 overflow-hidden" />
      </div>
      <div data-ph-copy data-reveal className="shell gutter relative flex h-full flex-col justify-end pb-14 sm:pb-20">
        <p data-ph-fade className="eyebrow flex items-center gap-3 text-paper/80">
          <span className="h-px w-10 bg-red" />
          {eyebrow}
        </p>
        <h1 data-ph-title className="display t-1 mt-6 max-w-[14ch]">
          {title}
        </h1>
        <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <p data-ph-fade className="t-lead max-w-xl text-paper/75">
            {intro}
          </p>
          <p data-ph-fade className="micro text-paper/50">
            Illustrative imagery
          </p>
        </div>
      </div>
    </section>
  );
}
