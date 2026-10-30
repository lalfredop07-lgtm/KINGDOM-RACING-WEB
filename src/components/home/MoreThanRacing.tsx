"use client";

import Image from "next/image";
import { useRef } from "react";
import { RevealImage } from "@/components/motion/RevealImage";
import { ScrubWords } from "@/components/motion/ScrubWords";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { gsap, MQ, useGSAP } from "@/lib/gsap";

/**
 * Concept — "Editorial calm after the storm": a forward-only ribbon, then lines rising out of
 * masks, a statement that ignites word by word, and two photographs at different depths.
 */
export function MoreThanRacing() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.fromTo(
          "[data-float]",
          { yPercent: 30 },
          { yPercent: -40, ease: "none", scrollTrigger: { trigger: "[data-float-wrap]", start: "top bottom", end: "bottom top", scrub: true } },
        );
        gsap.from("[data-mtr-fade]", {
          autoAlpha: 0,
          y: 30,
          stagger: 0.1,
          duration: 1.2,
          scrollTrigger: { trigger: "[data-mtr-copy]", start: "top 80%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="more-than-racing" data-theme="light" data-chapter="Mission" className="surface-light relative z-[2] -mt-px overflow-hidden rounded-t-[28px] pb-28 pt-28 shadow-[0_-40px_80px_-20px_rgba(0,0,0,0.45)] sm:rounded-t-[44px] sm:pb-40 sm:pt-36">
      <div className="shell gutter grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div data-mtr-copy className="lg:col-span-5 lg:pt-10">
          <Eyebrow index="01">Our mission</Eyebrow>
          <SplitReveal as="h2" className="display t-1 mt-8">
            More than <em>racing.</em>
          </SplitReveal>
          <p data-mtr-fade className="t-lead mt-8 max-w-md text-mute">
            We believe every race is a platform — a chance to inspire, connect with people, and share the love of Christ through the world of motorsport.
          </p>
          <div data-mtr-fade className="mt-10">
            <Button href="/mission" variant="circle">
              Explore our mission
            </Button>
          </div>
        </div>

        <div data-float-wrap className="relative lg:col-span-7">
          <RevealImage
            src="/media/pit-poster.jpg"
            video="/media/pit.mp4"
            alt="Illustrative footage: open-wheel race cars lined up in pit lane at sunset while the crew works."
            from="right"
            className="aspect-[4/5] w-full sm:aspect-[16/11]"
            position="40% 50%"
            sizes="(min-width: 1024px) 58vw, 100vw"
          />
          <div data-float className="absolute -bottom-16 -left-4 w-[46%] max-w-[300px] overflow-hidden border-[6px] border-[var(--bg)] shadow-2xl shadow-black/20 sm:-left-10 lg:-left-20">
            <div className="relative aspect-[3/4]">
              <Image src="/images/sharing-the-word.jpg" alt="Illustrative image: a team member reads the Bible with friends in the paddock." fill sizes="300px" className="object-cover" style={{ objectPosition: "45% 50%" }} />
            </div>
          </div>
          <p className="micro absolute -top-8 right-0 text-mute">Pit lane · Illustrative</p>
        </div>
      </div>

      <div className="shell gutter mt-32 sm:mt-44">
        <ScrubWords
          className="display t-3 mx-auto max-w-[22ch] text-center leading-[1.08]"
          text="For more than twenty years, Kingdom Racing has carried one message to the racetrack — the hope of Jesus Christ, shared with drivers, crews, fans, and families."
        />
      </div>
    </section>
  );
}
