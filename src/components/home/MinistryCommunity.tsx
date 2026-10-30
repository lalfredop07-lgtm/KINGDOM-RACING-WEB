"use client";

import Image from "next/image";
import { useRef } from "react";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { ministries } from "@/content/site";

/**
 * Concept — "Stacking stories": each ministry is a sticky card. As the next one slides over it,
 * the one beneath recedes in depth — scaling back, tilting slightly away and dimming.
 */
export function MinistryCommunity() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const cards = gsap.utils.toArray<HTMLElement>("[data-stack-card]", el);
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        cards.forEach((card, i) => {
          const next = cards[i + 1];
          if (next) {
            gsap.to(card.querySelector("[data-card-body]"), {
              scale: 0.92,
              rotateX: 5,
              filter: "brightness(0.7)",
              ease: "none",
              scrollTrigger: { trigger: next, start: "top 70%", end: "top 15%", scrub: true },
            });
          }
          gsap.fromTo(
            card.querySelector("[data-card-img]"),
            { scale: 1.25 },
            { scale: 1, ease: "none", scrollTrigger: { trigger: card, start: "top bottom", end: "top 20%", scrub: true } },
          );
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="ministry" data-theme="light" data-chapter="Ministry" className="relative pb-24 pt-28 sm:pb-40 sm:pt-40">
      <div className="shell gutter grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Eyebrow index="05">Our ministry</Eyebrow>
          <SplitReveal as="h2" className="display t-1 mt-8">
            Three ministries. <em>One mission.</em>
          </SplitReveal>
        </div>
        <div className="flex flex-col justify-end gap-8 lg:col-span-5 lg:col-start-8">
          <p className="t-lead text-mute">
            From the grandstands to the paddock, each ministry exists to meet people where they are and point them toward lasting hope in Christ.
          </p>
          <Button href="/ministry" variant="circle">
            Explore the ministries
          </Button>
        </div>
      </div>

      <div className="shell gutter mt-20 [perspective:1400px] sm:mt-28">
        {ministries.map((m, i) => (
          <article key={m.id} data-stack-card className="sticky top-[calc(var(--nav-h)+0.5rem)] pb-6" style={{ zIndex: i + 1 }}>
            <div
              data-card-body
              className="grid min-h-[calc(100svh-var(--nav-h)-3rem)] origin-top overflow-hidden rounded-[4px] bg-ink text-paper shadow-[0_-20px_60px_-30px_rgba(0,0,0,0.5)] will-change-transform md:min-h-[70vh] md:grid-cols-2"
            >
              <div className={`relative min-h-[42svh] overflow-hidden ${i % 2 ? "md:order-2" : ""}`}>
                <div data-card-img className="absolute inset-0">
                  <Image src={m.image} alt={m.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
                </div>
                <p className="micro absolute bottom-4 left-4 rounded-full bg-black/45 px-2.5 py-1 text-white/80 backdrop-blur-sm">Illustrative</p>
              </div>
              <div className="flex flex-col justify-between gap-10 p-7 sm:p-12 lg:p-16">
                <div className="flex items-center justify-between">
                  <p className="micro tabular-nums text-red">{m.index} / 03</p>
                  <p className="micro text-paper/55">{m.kicker}</p>
                </div>
                <div>
                  <h3 className="display t-2">{m.name}</h3>
                  <p className="t-lead mt-6 max-w-md text-paper/70">{m.summary}</p>
                </div>
                <Button href={`/ministry#${m.id}`}>
                  Learn more<span className="sr-only"> about {m.name}</span>
                </Button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
