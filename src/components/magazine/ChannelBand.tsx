"use client";

import { useRef } from "react";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { VideoLoop } from "@/components/motion/VideoLoop";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { channel } from "@/content/site";

/**
 * Concept — "Screen on": a small frame of footage widens into a full-bleed screen as it reaches
 * the center of the viewport. The footage itself loops forward and is never scrubbed.
 */
export function ChannelBand() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.fromTo(
          "[data-screen]",
          { clipPath: "inset(18% 22% 18% 22% round 18px)" },
          { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "none", scrollTrigger: { trigger: el, start: "top 80%", end: "top 10%", scrub: 1 } },
        );
        gsap.fromTo("[data-screen-video]", { scale: 1.3 }, { scale: 1, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} data-theme="dark" data-chapter="Channel" className="relative bg-ink text-paper">
      <div data-screen className="relative h-[100svh] min-h-[560px] overflow-hidden">
        <div data-screen-video className="absolute inset-0">
          <VideoLoop src="/media/chase.mp4" poster="/media/chase-poster.jpg" label="Illustrative footage: open-wheel race cars chase each other at sunset." />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/30" />
        <div className="shell gutter relative flex h-full flex-col justify-end pb-16 sm:pb-24">
          <Eyebrow index="03">
            Watch
          </Eyebrow>
          <SplitReveal as="h2" className="display t-1 mt-8 max-w-[12ch]">
            The GOD SPEED <em>Channel.</em>
          </SplitReveal>
          <div className="mt-8 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <p className="t-lead max-w-md text-paper/75">{channel.text}</p>
            <div className="flex items-center gap-6">
              <p className="micro text-paper/50 max-sm:hidden">Illustrative footage</p>
              <Button href={channel.url} external>
                Watch on YouTube
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
