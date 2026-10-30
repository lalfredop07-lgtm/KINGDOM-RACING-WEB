"use client";

import { useRef } from "react";
import { RevealImage } from "@/components/motion/RevealImage";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ministries } from "@/content/site";
import { gsap, MQ, useGSAP } from "@/lib/gsap";

/**
 * Why it matters — "Pit wall": the statement holds its place on the left while the three
 * ministries a gift sustains pass by on the right; each row's rule draws in before its words rise.
 */
export function GiveSection() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.utils.toArray<HTMLElement>("[data-give-row]").forEach((row) => {
          const tl = gsap.timeline({ scrollTrigger: { trigger: row, start: "top 85%", once: true } });
          tl.from(row.querySelector("[data-give-rule]"), { scaleX: 0, duration: 1.2, ease: "expo.inOut" }).from(
            row.querySelectorAll("[data-give-text]"),
            { yPercent: 40, autoAlpha: 0, stagger: 0.08, duration: 1.1 },
            0.35,
          );
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="why" data-theme="light" data-chapter="Why give" className="relative py-20 sm:py-28">
      <div className="shell gutter grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5 lg:self-start lg:sticky lg:top-28">
          <Eyebrow index="01">Why your gift matters</Eyebrow>
          <SplitReveal as="h2" className="display t-2 mt-6 max-w-[14ch] text-balance">
            Every gift carries <em>the message further.</em>
          </SplitReveal>
          <p className="t-lead mt-8 max-w-xl text-mute">
            For more than 20 years, Kingdom Racing has met drivers, crews, fans, and families at the racetrack with the hope of Jesus Christ. The team is staffed 100% by
            volunteers, and your generosity helps them keep showing up in the places where faith meets motorsports.
          </p>
          <a
            href="#give"
            className="group mt-8 inline-flex min-h-11 items-center gap-2 text-sm font-medium underline decoration-line underline-offset-4 transition-colors hover:text-red"
          >
            Back to the donation card
            <span aria-hidden className="transition-transform duration-500 group-hover:-translate-y-0.5">
              ↑
            </span>
          </a>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <h3 className="micro text-mute">What your gift supports</h3>
          <ul className="mt-6">
            {ministries.map((m) => (
              <li key={m.id} data-give-row className="relative grid gap-6 py-8 sm:grid-cols-[minmax(0,14rem)_1fr] sm:items-center sm:gap-8">
                <span data-give-rule aria-hidden className="absolute inset-x-0 top-0 h-px origin-left bg-line" />
                <RevealImage
                  src={m.image}
                  alt={m.alt}
                  from="left"
                  parallax={6}
                  sizes="(min-width: 640px) 14rem, 100vw"
                  className="aspect-[16/10] w-full rounded-[3px] sm:aspect-[4/3]"
                />
                <div className="overflow-hidden">
                  <p data-give-text className="micro tabular-nums text-red">
                    {m.index} · {m.kicker}
                  </p>
                  <p data-give-text className="display mt-3 text-[clamp(2rem,3vw,2.75rem)] leading-none">
                    {m.name}
                  </p>
                  <p data-give-text className="mt-4 max-w-lg leading-relaxed text-mute">
                    {m.summary}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <p className="micro mt-2 text-mute">Images are illustrative</p>
        </div>
      </div>
    </section>
  );
}
