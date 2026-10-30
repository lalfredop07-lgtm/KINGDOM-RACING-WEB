"use client";

import Image from "next/image";
import { useRef } from "react";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { VideoLoop } from "@/components/motion/VideoLoop";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { events2026 } from "@/content/site";

const previews = ["/images/track-pack.jpg", "/images/oval-crowd.jpg", "/images/pit-lane.jpg", "/images/front-straight.jpg", "/images/grandstands.jpg"];

/**
 * Concept — "Race control": a dimmed live-footage backdrop and a schedule board. Rows draw in
 * like timing lines; on desktop a photograph follows the pointer and changes with each venue.
 */
export function Events({ limit }: { limit?: number }) {
  const ref = useRef<HTMLElement>(null);
  const rows = limit ? events2026.slice(0, limit) : events2026;

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.utils.toArray<HTMLElement>("[data-row]", el).forEach((row) => {
          const tl = gsap.timeline({ scrollTrigger: { trigger: row, start: "top 92%", once: true } });
          tl.from(row.querySelector("[data-row-line]"), { scaleX: 0, duration: 1.2, ease: "expo.inOut" }).from(
            row.querySelectorAll("[data-row-cell]"),
            { yPercent: 100, autoAlpha: 0, stagger: 0.05, duration: 0.9 },
            0.3,
          );
        });
        gsap.fromTo("[data-ev-bg]", { scale: 1.2 }, { scale: 1, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
      });
      mm.add(`${MQ.fine} and ${MQ.desktop}`, () => {
        const float = el.querySelector<HTMLElement>("[data-float-img]");
        if (!float) return;
        gsap.set(float, { xPercent: -50, yPercent: -50, scale: 0.6, autoAlpha: 0 });
        const x = gsap.quickTo(float, "x", { duration: 0.7, ease: "power3" });
        const y = gsap.quickTo(float, "y", { duration: 0.7, ease: "power3" });
        const imgs = float.querySelectorAll<HTMLElement>("[data-fi]");
        const list = el.querySelector<HTMLElement>("[data-board]")!;
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          x(e.clientX - r.left);
          y(e.clientY - r.top);
          const row = (e.target as HTMLElement).closest<HTMLElement>("[data-row]");
          if (row) {
            const idx = Number(row.dataset.row) % previews.length;
            imgs.forEach((img, i) => gsap.to(img, { autoAlpha: i === idx ? 1 : 0, duration: 0.4 }));
          }
        };
        const enter = () => gsap.to(float, { scale: 1, autoAlpha: 1, duration: 0.6, ease: "expo.out" });
        const leave = () => gsap.to(float, { scale: 0.6, autoAlpha: 0, duration: 0.5 });
        list.addEventListener("pointermove", move);
        list.addEventListener("pointerenter", enter);
        list.addEventListener("pointerleave", leave);
        return () => {
          list.removeEventListener("pointermove", move);
          list.removeEventListener("pointerenter", enter);
          list.removeEventListener("pointerleave", leave);
        };
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="events" data-theme="dark" data-chapter="Events" className="relative overflow-hidden bg-ink py-28 text-paper sm:py-40">
      <div data-ev-bg className="absolute inset-0 opacity-30">
        <VideoLoop src="/media/oval.mp4" poster="/media/oval-poster.jpg" label="Illustrative footage: open-wheel cars sweep through an oval turn past the grandstands." />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/70 to-ink" />

      <div className="shell gutter relative grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Eyebrow index="10">Ministry events</Eyebrow>
          <SplitReveal as="h2" className="display t-1 mt-8">
            Where the <em>mission</em> meets the track.
          </SplitReveal>
        </div>
        <div className="flex flex-col justify-end gap-6 lg:col-span-4 lg:col-start-9">
          <p className="t-lead text-paper/70">Our 2026 ministry event schedule, as published by the Kingdom Racing team. Future dates are announced as they’re confirmed.</p>
          <Button href="/racing">Full schedule</Button>
        </div>
      </div>

      <div data-board className="shell gutter relative mt-16 sm:mt-24">
        <div className="micro hidden grid-cols-12 gap-6 pb-4 text-paper/45 md:grid">
          <span className="col-span-3">Dates · 2026</span>
          <span className="col-span-5">Venue</span>
          <span className="col-span-2">Location</span>
          <span className="col-span-2 text-right">Series</span>
        </div>
        <ul>
          {rows.map((ev, i) => (
            <li key={ev.name} data-row={i} className="group relative" data-cursor="">
              <span data-row-line className="absolute inset-x-0 top-0 block h-px origin-left bg-paper/20" />
              <span className="absolute inset-0 origin-bottom scale-y-0 bg-red/90 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-y-100 max-md:hidden" aria-hidden />
              <div className="relative grid grid-cols-[5.5rem_1fr] items-center gap-x-5 gap-y-1.5 py-6 md:grid-cols-12 md:gap-6 md:py-7">
                <span data-row-cell className="micro relative tabular-nums text-red group-hover:text-white md:col-span-3 md:text-xs">
                  {ev.dates}
                </span>
                <span data-row-cell className="relative block md:col-span-5">
                  <span className="display block text-2xl leading-[1.1] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-2 sm:text-3xl md:text-4xl">
                    {ev.name}
                  </span>
                </span>
                <span data-row-cell className="relative col-start-2 text-sm text-paper/60 group-hover:text-white/85 md:col-span-2 md:col-start-auto">
                  {ev.place}
                </span>
                <span data-row-cell className="micro relative col-start-2 text-paper/60 group-hover:text-white md:col-span-2 md:col-start-auto md:text-right">
                  {ev.series}
                </span>
              </div>
            </li>
          ))}
        </ul>
        <span className="block h-px bg-paper/20" />
      </div>

      <div data-float-img aria-hidden className="pointer-events-none absolute left-0 top-0 z-20 hidden aspect-[4/3] w-[22rem] overflow-hidden rounded-[3px] opacity-0 shadow-2xl lg:block">
        {previews.map((src, i) => (
          <div key={src} data-fi className="absolute inset-0" style={{ opacity: i === 0 ? 1 : 0 }}>
            <Image src={src} alt="" fill sizes="22rem" className="object-cover" />
          </div>
        ))}
      </div>
    </section>
  );
}
