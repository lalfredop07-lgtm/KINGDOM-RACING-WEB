"use client";

import Image from "next/image";
import { useRef } from "react";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Button, Arrow } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { site, stories } from "@/content/site";

/**
 * Concept — "Living gallery": cards lean toward the pointer in 3D, a light sheen follows it,
 * and footage wakes up on hover. Cards enter as a fanned deck that settles into a row.
 */
export function StoriesMedia() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const cards = gsap.utils.toArray<HTMLElement>("[data-story]", el);
      const mm = gsap.matchMedia();

      mm.add(MQ.desktop, () => {
        gsap.from(cards, {
          yPercent: 30,
          rotate: (i) => (i - 1) * 7,
          xPercent: (i) => (1 - i) * 40,
          autoAlpha: 0,
          duration: 1.6,
          ease: "expo.out",
          stagger: 0.08,
          scrollTrigger: { trigger: "[data-deck]", start: "top 80%", once: true },
        });
      });
      mm.add(MQ.mobile, () => {
        gsap.from(cards, { x: 60, autoAlpha: 0, duration: 1.2, stagger: 0.1, scrollTrigger: { trigger: "[data-deck]", start: "top 85%", once: true } });
      });

      mm.add(`${MQ.fine} and ${MQ.motion}`, () => {
        const cleanups = cards.map((card) => {
          const inner = card.querySelector<HTMLElement>("[data-tilt]")!;
          const sheen = card.querySelector<HTMLElement>("[data-sheen]")!;
          const video = card.querySelector<HTMLVideoElement>("video");
          const rx = gsap.quickTo(inner, "rotationX", { duration: 0.8, ease: "power3" });
          const ry = gsap.quickTo(inner, "rotationY", { duration: 0.8, ease: "power3" });
          const move = (e: PointerEvent) => {
            const r = card.getBoundingClientRect();
            const px = (e.clientX - r.left) / r.width - 0.5;
            const py = (e.clientY - r.top) / r.height - 0.5;
            ry(px * 10);
            rx(-py * 10);
            sheen.style.background = `radial-gradient(600px circle at ${(px + 0.5) * 100}% ${(py + 0.5) * 100}%, rgba(255,255,255,0.16), transparent 40%)`;
          };
          const enter = () => {
            video?.play().catch(() => {});
            gsap.to(video ?? [], { autoAlpha: 1, duration: 0.6 });
          };
          const leave = () => {
            rx(0);
            ry(0);
            sheen.style.background = "transparent";
            gsap.to(video ?? [], { autoAlpha: 0, duration: 0.6, onComplete: () => video?.pause() });
          };
          card.addEventListener("pointermove", move);
          card.addEventListener("pointerenter", enter);
          card.addEventListener("pointerleave", leave);
          return () => {
            card.removeEventListener("pointermove", move);
            card.removeEventListener("pointerenter", enter);
            card.removeEventListener("pointerleave", leave);
          };
        });
        return () => cleanups.forEach((c) => c());
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="stories" data-theme="light" data-chapter="Stories" className="relative overflow-hidden bg-paper-2/0 py-28 sm:py-40">
      <div className="shell gutter flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Eyebrow index="08">Stories that inspire</Eyebrow>
          <SplitReveal as="h2" className="display t-1 mt-8">
            Life beyond the <em>finish line.</em>
          </SplitReveal>
          <p className="t-lead mt-8 max-w-lg text-mute">From the track to the community — season reviews, outreach updates, and testimonies of transformation, purpose, and hope.</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Button href="/stories">All stories</Button>
          <Button href={site.channelUrl} external>
            GOD SPEED Channel
          </Button>
        </div>
      </div>

      <div
        data-deck
        className="no-scrollbar shell mt-16 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--gutter)] pb-4 [perspective:1200px] sm:mt-24 lg:grid lg:grid-cols-3 lg:gap-8 lg:overflow-visible"
      >
        {stories.map((s) => (
          <a
            key={s.title}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            data-story
            data-cursor="Read"
            className="group block w-[80vw] shrink-0 snap-start sm:w-[56vw] lg:w-auto"
          >
            <div data-tilt className="relative aspect-[4/5] overflow-hidden rounded-[3px] bg-ink [transform-style:preserve-3d] will-change-transform">
              <Image src={s.image} alt="" fill sizes="(min-width: 1024px) 31vw, 80vw" className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-105" />
              <video src={s.video} muted loop playsInline preload="none" className="invisible absolute inset-0 h-full w-full object-cover opacity-0" aria-hidden />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
              <div data-sheen className="pointer-events-none absolute inset-0" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-paper [transform:translateZ(40px)]">
                <p className="micro text-red">{s.category}</p>
                <h3 className="display mt-3 text-[clamp(1.7rem,2.3vw,2.4rem)] leading-[1.02]">{s.title}</h3>
                <div className="mt-5 flex items-center justify-between border-t border-white/15 pt-4">
                  <p className="micro text-paper/60">{s.date}</p>
                  <Arrow className="size-5 transition-transform duration-500 group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
      <p className="micro shell gutter mt-6 text-mute">Card imagery is illustrative. Stories open on kingdomracing.net.</p>
    </section>
  );
}
