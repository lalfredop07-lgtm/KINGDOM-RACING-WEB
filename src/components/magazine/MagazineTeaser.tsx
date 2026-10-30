"use client";

import { useRef } from "react";
import { PrintObject } from "@/components/magazine/PrintObject";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { magazine } from "@/content/site";

type Props = { theme?: "light" | "dark"; index?: string; title?: string; text?: string };

/**
 * A compact doorway to the magazine page for other pages: the published cover slides in on its
 * edge and swings flat to face the reader as the section enters.
 */
export function MagazineTeaser({ theme = "dark", index, title = "Stories of faith, in your mailbox.", text }: Props) {
  const ref = useRef<HTMLElement>(null);
  const latest = magazine.editions[0];

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.fromTo(
          "[data-teaser-cover] [data-print-body]",
          { rotationY: -80, xPercent: -30, autoAlpha: 0 },
          { rotationY: -14, xPercent: 0, autoAlpha: 1, duration: 2, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 75%", once: true } },
        );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} data-theme={theme} data-chapter="Magazine" className={`relative overflow-hidden py-24 sm:py-32 ${theme === "dark" ? "bg-ink text-paper" : ""}`}>
      <div className="shell gutter grid items-center gap-14 md:grid-cols-12 md:gap-10">
        <div data-teaser-cover className="mx-auto w-[min(58vw,16rem)] md:col-span-4 md:w-full md:max-w-[18rem]">
          <PrintObject src={latest.cover} alt={latest.alt} width={latest.width} height={latest.height} sizes="(min-width: 768px) 290px, 58vw" />
        </div>
        <div className="md:col-span-7 md:col-start-6">
          <Eyebrow index={index}>GOD SPEED Magazine · Free</Eyebrow>
          <SplitReveal as="h2" className="display t-2 mt-6 max-w-[16ch]">
            {title}
          </SplitReveal>
          <p className={`mt-6 max-w-lg text-[1.0625rem] leading-relaxed ${theme === "dark" ? "text-paper/70" : "text-mute"}`}>{text ?? `${magazine.eachIssue} ${magazine.free}`}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/god-speed-magazine#subscribe" variant="solid">
              Subscribe for free
            </Button>
            <Button href="/god-speed-magazine">Discover the magazine</Button>
          </div>
          <p className={`micro mt-8 ${theme === "dark" ? "text-paper/45" : "text-mute"}`}>Shown: the {latest.date} edition</p>
        </div>
      </div>
    </section>
  );
}
