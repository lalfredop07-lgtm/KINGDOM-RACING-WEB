"use client";

import Image from "next/image";
import { useRef } from "react";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { scripture } from "@/content/site";

const panels = [
  {
    word: "Faith",
    text: "Everything we do starts with Jesus Christ. We race to share His hope with the people around every track.",
    image: "/images/prayer-circle.jpg",
    alt: "Illustrative image: families pray together near the speedway.",
  },
  {
    word: "Spirit",
    text: "A team staffed 100% by volunteers, serving with joy — in the paddock, in the grandstands, and beyond.",
    image: "/images/paddock-community.jpg",
    alt: "Illustrative image: a volunteer talks with children and their families in the paddock.",
  },
  {
    word: "Truth",
    text: "We carry God’s Word: Scripture, Bible tracts, and a personal invitation to know Jesus Christ.",
    image: "/images/sharing-the-word.jpg",
    alt: "Illustrative image: friends read the Bible together beside pit lane.",
  },
] as const;

/**
 * Mission page — "Triptych": the three pillars stand as hinged panels. The side panels are
 * folded shut over the center and swing open with the scroll, like an altarpiece unfolding.
 */
export function PillarsTriptych() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MQ.desktop, () => {
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: "[data-tri-stage]", start: "top top", end: "+=110%", pin: true, scrub: 1, anticipatePin: 1 },
        });
        tl.fromTo("[data-panel='0']", { rotationY: 104 }, { rotationY: 0, duration: 1 }, 0)
          .fromTo("[data-panel='2']", { rotationY: -104 }, { rotationY: 0, duration: 1 }, 0)
          .fromTo("[data-panel='1']", { scale: 0.9 }, { scale: 1, duration: 1 }, 0)
          .from("[data-panel-copy]", { autoAlpha: 0, y: 30, stagger: 0.1, duration: 0.4 }, 0.7)
          .fromTo("[data-tri-verse]", { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.4 }, 1.1)
          .to({}, { duration: 0.3 });
      });
      mm.add(MQ.mobile, () => {
        gsap.utils.toArray<HTMLElement>("[data-panel]", el).forEach((p) =>
          gsap.from(p, { rotationX: -60, transformOrigin: "50% 0%", autoAlpha: 0, duration: 1.4, scrollTrigger: { trigger: p, start: "top 88%", once: true } }),
        );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} data-theme="dark" data-chapter="Pillars" className="relative bg-ink text-paper">
      <div className="shell gutter pt-24 sm:pt-32">
        <Eyebrow>Faith · Spirit · Truth</Eyebrow>
        <SplitReveal as="h2" className="display t-2 mt-6 max-w-[16ch]">
          Three words we <em>race by.</em>
        </SplitReveal>
      </div>
      <div data-tri-stage className="relative lg:flex lg:h-[100svh] lg:flex-col lg:justify-center">
        <div className="shell gutter grid w-full gap-4 py-14 [perspective:2200px] lg:grid-cols-3 lg:gap-2 lg:py-0">
          {panels.map((p, i) => (
            <article
              key={p.word}
              data-panel={i}
              className={`relative flex min-h-[26rem] flex-col justify-end overflow-hidden rounded-[3px] bg-ink-3 p-7 will-change-transform [backface-visibility:hidden] lg:h-[66svh] lg:min-h-0 lg:p-9 ${i === 0 ? "lg:origin-right" : i === 2 ? "lg:origin-left" : "lg:z-10"}`}
            >
              <Image src={p.image} alt={p.alt} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover opacity-55" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/10" />
              <div data-panel-copy className="relative">
                <p className="micro tabular-nums text-red">0{i + 1}</p>
                <h3 className="display mt-4 text-[clamp(3rem,5vw,5.5rem)] italic leading-[0.9]">{p.word}</h3>
                <p className="mt-5 max-w-xs text-[1.0625rem] leading-relaxed text-paper/75">{p.text}</p>
              </div>
            </article>
          ))}
        </div>
        <div data-tri-verse className="shell gutter flex flex-col gap-2 pb-24 sm:flex-row sm:items-baseline sm:justify-between lg:mt-8 lg:pb-0">
          <p className="display max-w-2xl text-xl italic text-paper/80 sm:text-2xl">“{scripture.text}”</p>
          <p className="micro text-paper/50">{scripture.ref} · Illustrative imagery</p>
        </div>
      </div>
    </section>
  );
}
