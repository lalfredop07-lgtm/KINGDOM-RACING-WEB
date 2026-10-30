"use client";

import Link from "next/link";
import { useRef } from "react";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { ministries } from "@/content/site";

/** Apex points along the line, in the 1200 × 420 drawing space. */
const apexes = [
  { x: 190, y: 300 },
  { x: 600, y: 110 },
  { x: 1010, y: 300 },
] as const;

const path = "M -20 120 C 90 120, 120 300, 190 300 S 430 110, 600 110 S 900 300, 1010 300 S 1160 140, 1240 140";

/**
 * Ministry page — "The racing line": a single red line is drawn through three apexes as the
 * reader scrolls, one for each ministry, the way a driver links corners into one lap.
 */
export function RacingLine() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();

      mm.add(MQ.desktop, () => {
        const line = el.querySelector<SVGPathElement>("[data-line]")!;
        const len = line.getTotalLength();
        gsap.set(line, { strokeDasharray: len, strokeDashoffset: len });
        const tl = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: el, start: "top 65%", end: "bottom 70%", scrub: 1 } });
        tl.to(line, { strokeDashoffset: 0, duration: 3 }, 0);
        gsap.utils.toArray<HTMLElement>("[data-apex]", el).forEach((a, i) => {
          tl.from(a, { autoAlpha: 0, y: 30, duration: 0.4, ease: "power2.out" }, 0.35 + i * 1);
        });
      });

      mm.add(MQ.mobile, () => {
        gsap.fromTo("[data-vline]", { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: "[data-vlist]", start: "top 75%", end: "bottom 60%", scrub: true } });
        gsap.utils.toArray<HTMLElement>("[data-vitem]", el).forEach((it) =>
          gsap.from(it, { x: 40, autoAlpha: 0, duration: 1.1, scrollTrigger: { trigger: it, start: "top 85%", once: true } }),
        );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} data-theme="light" data-chapter="The line" className="relative overflow-hidden py-24 sm:py-32">
      <div className="shell gutter">
        <Eyebrow>Three ministries · One lap</Eyebrow>
        <SplitReveal as="h2" className="display t-2 mt-6 max-w-[18ch]">
          One line through <em>every corner</em> of race day.
        </SplitReveal>
      </div>

      <div className="shell gutter relative mt-10 hidden lg:block">
        <div className="relative aspect-[1200/420]">
          <svg viewBox="0 0 1200 420" className="absolute inset-0 size-full overflow-visible" aria-hidden>
            <path d={path} fill="none" stroke="var(--line)" strokeWidth="44" strokeLinecap="round" />
            <path data-line d={path} fill="none" stroke="#d4142a" strokeWidth="2.5" strokeLinecap="round" />
            {apexes.map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r="7" fill="#d4142a" />
            ))}
          </svg>
          {ministries.map((m, i) => (
            <Link
              key={m.id}
              href={`#${m.id}`}
              data-apex
              className="group absolute w-[22%]"
              style={{ left: `${(apexes[i].x / 1200) * 100}%`, top: `${(apexes[i].y / 420) * 100}%`, transform: `translate(-50%, ${i === 1 ? "calc(-100% - 2rem)" : "2rem"})` }}
            >
              <span className="micro block text-center tabular-nums text-red">{m.index}</span>
              <span className="display mt-2 block text-center text-[clamp(1.6rem,2.4vw,2.4rem)] leading-[1] transition-colors group-hover:text-red">{m.name}</span>
              <span className="mt-2 block text-center text-sm text-mute">{m.kicker}</span>
            </Link>
          ))}
        </div>
      </div>

      <ol data-vlist className="shell gutter relative mt-14 space-y-10 lg:hidden">
        <span data-vline aria-hidden className="absolute bottom-2 left-[calc(var(--gutter)+5px)] top-2 w-px origin-top bg-red" />
        {ministries.map((m) => (
          <li key={m.id} data-vitem className="relative pl-10">
            <span aria-hidden className="absolute left-0 top-1.5 size-[11px] rounded-full bg-red" />
            <Link href={`#${m.id}`} className="block">
              <span className="micro tabular-nums text-red">{m.index}</span>
              <span className="display mt-2 block text-3xl">{m.name}</span>
              <span className="mt-1 block text-sm text-mute">{m.kicker}</span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
