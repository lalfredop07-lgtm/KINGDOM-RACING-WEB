"use client";

import Link from "next/link";
import { useRef } from "react";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Arrow } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { gsap, MQ, useGSAP } from "@/lib/gsap";

/** Volunteer opportunities named on kingdomracing.net/contact. */
const roles = [
  { n: "P1", title: "Pray", text: "Join the people who pray for drivers, teams, fans, and every event on the schedule.", href: "/support?topic=prayer#contact" },
  { n: "P2", title: "Host Miles of Smiles", text: "Help host a Miles of Smiles event for youth groups and families walking through difficult seasons.", href: "/support?topic=volunteer#contact" },
  { n: "P3", title: "Be an Ambassador", text: "Serve trackside, offering race fans Bible tracts and a personal invitation to know Jesus Christ.", href: "/support?topic=volunteer#contact" },
  { n: "P4", title: "And much more", text: "Discover the many other volunteer activities within Kingdom Racing. Tell us where you’d like to help.", href: "/support?topic=volunteer#contact" },
] as const;

/**
 * Get Involved — "Pit boards": each way to serve hangs like a crew’s pit board and swings down
 * on its hinge into view, settling with a small overshoot.
 */
export function PitBoards() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.from("[data-board]", {
          rotationX: -100,
          transformOrigin: "50% 0%",
          autoAlpha: 0,
          duration: 1.6,
          stagger: 0.12,
          ease: "elastic.out(1, 0.6)",
          scrollTrigger: { trigger: "[data-boards]", start: "top 80%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} data-theme="light" data-chapter="Serve" className="relative py-24 sm:py-32">
      <div className="shell gutter grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Eyebrow>Volunteer</Eyebrow>
          <SplitReveal as="h2" className="display t-2 mt-6">
            A place for you <em>on the crew.</em>
          </SplitReveal>
        </div>
        <p className="t-lead text-mute lg:col-span-4 lg:col-start-9 lg:self-end">Kingdom Racing is staffed 100% by volunteers. These are some of the ways people serve.</p>
      </div>
      <ul data-boards className="shell gutter mt-14 grid gap-4 [perspective:1600px] sm:grid-cols-2 lg:grid-cols-4">
        {roles.map((r) => (
          <li key={r.n} data-board className="relative pt-5">
            <span aria-hidden className="absolute left-1/2 top-0 h-5 w-px bg-[var(--fg)] opacity-40" />
            <Link
              href={r.href}
              className="group flex h-full min-h-[19rem] flex-col justify-between rounded-[4px] border-[6px] border-ink bg-ink p-6 text-paper transition-colors duration-500 hover:border-red"
              data-cursor="Go"
            >
              <span className="display text-[3.6rem] leading-none tabular-nums text-red transition-colors duration-500 group-hover:text-paper">{r.n}</span>
              <span>
                <span className="display block text-3xl">{r.title}</span>
                <span className="mt-3 block text-sm leading-relaxed text-paper/65">{r.text}</span>
                <span className="mt-6 flex items-center gap-2 text-sm font-medium">
                  Get in touch <Arrow className="size-4 transition-transform duration-500 group-hover:translate-x-1" />
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
