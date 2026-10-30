"use client";

import { useRef, useState } from "react";
import { RevealImage } from "@/components/motion/RevealImage";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { gsap, MQ, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { leadership, milestones } from "@/content/site";

/**
 * Concept — "Pit board": a sticky signboard on the left flips to each milestone as it passes,
 * while a red line draws the timeline down the page.
 */
export function RacingLegacy() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const items = gsap.utils.toArray<HTMLElement>("[data-milestone]", el);
      const triggers = items.map((item, i) =>
        ScrollTrigger.create({ trigger: item, start: "top 60%", end: "bottom 60%", onToggle: (s) => s.isActive && setActive(i) }),
      );
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.fromTo("[data-timeline-fill]", { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: "[data-timeline]", start: "top 60%", end: "bottom 60%", scrub: true } });
        items.forEach((item) =>
          gsap.from(item.querySelectorAll("[data-ms-fade]"), {
            autoAlpha: 0,
            x: 40,
            stagger: 0.08,
            duration: 1.2,
            scrollTrigger: { trigger: item, start: "top 80%", once: true },
          }),
        );
      });
      return () => {
        triggers.forEach((t) => t.kill());
        mm.revert();
      };
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="legacy" data-theme="light" data-chapter="Legacy" className="relative border-t border-line py-28 sm:py-40">
      <div className="shell gutter grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Eyebrow index="06">Racing legacy</Eyebrow>
          <SplitReveal as="h2" className="display t-1 mt-8">
            Twenty years <em>at God Speed.</em>
          </SplitReveal>
        </div>
        <div className="flex flex-col justify-end gap-6 lg:col-span-5 lg:col-start-8">
          <p className="t-lead text-mute">
            Founded by {leadership.founders}, Kingdom Racing has grown from a single conviction into a nationwide ministry — and made history along the way.
          </p>
          <Button href="/legacy" variant="circle">
            Read our story
          </Button>
        </div>
      </div>

      <div className="shell gutter mt-20 grid gap-12 lg:mt-28 lg:grid-cols-12">
        <div className="hidden lg:col-span-5 lg:block">
          <div className="sticky top-[calc(var(--nav-h)+3rem)]">
            <div className="relative h-[clamp(7rem,13vw,13rem)] overflow-hidden" aria-hidden="true">
              {milestones.map((m, i) => (
                <p
                  key={m.key}
                  className={`display absolute inset-0 flex items-end whitespace-nowrap leading-none transition-[transform,opacity] duration-[900ms] ease-[var(--ease-out-expo)] ${
                    i === active ? "translate-y-0 opacity-100" : i < active ? "-translate-y-full opacity-0" : "translate-y-full opacity-0"
                  } ${m.key.length > 4 ? "text-[clamp(3rem,5.6vw,5.75rem)] italic" : "text-[clamp(5.5rem,11vw,11.5rem)]"}`}
                >
                  {m.key}
                </p>
              ))}
            </div>
            <RevealImage
              src="/images/front-straight.jpg"
              alt="Illustrative image: a speedway front straight and pagoda tower at sunset."
              className="mt-10 aspect-[16/10] w-full max-w-[34rem]"
              from="left"
              sizes="34rem"
            />
          </div>
        </div>

        <ol data-timeline className="relative lg:col-span-6 lg:col-start-7">
          <span className="absolute bottom-0 left-0 top-0 w-px bg-line" aria-hidden />
          <span data-timeline-fill className="absolute bottom-0 left-0 top-0 w-px origin-top bg-red" aria-hidden />
          {milestones.map((m, i) => (
            <li key={m.key} data-milestone className="relative pb-20 pl-10 last:pb-0 sm:pl-14">
              <span
                className={`absolute -left-[5px] top-2 block size-[11px] rotate-45 border transition-colors duration-500 ${
                  i <= active ? "border-red bg-red" : "border-[var(--fg-mute)] bg-[var(--bg)]"
                }`}
                aria-hidden
              />
              <p data-ms-fade className="display text-5xl lg:hidden">
                {m.key}
              </p>
              <p data-ms-fade className="micro mt-3 text-red lg:mt-0">
                Milestone {String(i + 1).padStart(2, "0")}
              </p>
              <h3 data-ms-fade className="display t-3 mt-3">
                {m.title}
              </h3>
              <p data-ms-fade className="t-lead mt-4 max-w-lg text-mute">
                {m.text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
