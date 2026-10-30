"use client";

import { useRef } from "react";
import { Odometer } from "@/components/motion/Odometer";
import { RevealImage } from "@/components/motion/RevealImage";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { useLenis } from "@/components/motion/SmoothScroll";
import { Arrow } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { goal, involvement, ministryPartners, scripture, site } from "@/content/site";
import { gsap, MQ, useGSAP } from "@/lib/gsap";

/** Order and naming for this page; the copy itself comes from `involvement` in site.ts. */
const ways = [
  { id: "give", title: "Financial giving" },
  { id: "partner", title: "Partnerships", topic: "partner" },
  { id: "volunteer", title: "Volunteering", topic: "volunteer" },
  { id: "pray", title: "Prayer & community", topic: "prayer" },
] as const;

/**
 * Other ways — "Grid lineup": the vision rolls onto a timing board, a community scene opens
 * from its center, then four ways to stand with the ministry take their places like cars on
 * the grid. Choosing one selects that topic in the contact form and glides down to it.
 */
export function WaysToSupport() {
  const ref = useRef<HTMLElement>(null);
  const lenis = useLenis();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.from("[data-way]", {
          y: 70,
          autoAlpha: 0,
          stagger: 0.09,
          duration: 1.3,
          scrollTrigger: { trigger: "[data-ways]", start: "top 85%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  const pick = (topic: string) => {
    window.dispatchEvent(new CustomEvent("contact-topic", { detail: topic }));
    const target = document.getElementById("contact");
    if (!target) return;
    const focusForm = () => document.getElementById("name")?.focus({ preventScroll: true });
    if (lenis) lenis.scrollTo(target, { duration: 1.4, onComplete: focusForm });
    else {
      target.scrollIntoView({ behavior: "smooth" });
      focusForm();
    }
  };

  return (
    <section ref={ref} id="ways" data-theme="dark" data-chapter="Ways" className="relative bg-ink pb-24 pt-24 text-paper sm:pb-36 sm:pt-36">
      <div className="shell gutter grid gap-12 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <p className="eyebrow flex items-center gap-3 text-red">
            <span className="h-px w-8 bg-red" aria-hidden />
            The vision
          </p>
          <Odometer value={goal.value} className="display mt-8 text-[clamp(4.25rem,15vw,15rem)]" />
          <p className="t-lead mt-6 max-w-xl text-paper/75">
            {goal.label} Every gift, every prayer, and every volunteer at the track moves toward that finish line.
          </p>
        </div>
        <figure className="border-l border-red pl-6 lg:col-span-4">
          <blockquote className="display text-[clamp(1.5rem,2vw,1.9rem)] italic leading-[1.2] text-paper/90">“{scripture.text}”</blockquote>
          <figcaption className="micro mt-5 text-paper/50">{scripture.ref}</figcaption>
        </figure>
      </div>

      <div className="shell gutter mt-16 sm:mt-24">
        <RevealImage
          src="/media/prayer-poster.jpg"
          video="/media/prayer.mp4"
          alt="Illustrative footage: race fans, families, and team members bow their heads in prayer beside the speedway at sunset."
          from="center"
          parallax={10}
          sizes="100vw"
          caption="Illustrative"
          className="aspect-[4/5] w-full rounded-[4px] sm:aspect-[21/9]"
        />
      </div>

      <div className="shell gutter mt-24 sm:mt-32">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Eyebrow index="02">Other ways to support</Eyebrow>
            <SplitReveal as="h2" className="display t-2 mt-6 text-balance">
              Four ways to <em>stand with us.</em>
            </SplitReveal>
          </div>
          <p className="t-lead text-paper/65 lg:col-span-4 lg:col-start-9 lg:self-end">
            Give, partner, serve, or pray. Choose one and we’ll set up your message to the team.
          </p>
        </div>

        <ul data-ways className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {ways.map((w, i) => {
            const item = involvement.find((x) => x.id === w.id);
            if (!item) return null;
            const give = w.id === "give";
            const inner = (
              <>
                <span className="flex items-center justify-between">
                  <span className={`micro tabular-nums ${give ? "text-white/70" : "text-paper/45"}`}>{String(i + 1).padStart(2, "0")}</span>
                  <span
                    className={`grid size-11 place-items-center rounded-full border transition-colors duration-500 ${give ? "border-white/40 group-hover:bg-white group-hover:text-red" : "border-white/20 group-hover:border-red group-hover:bg-red"}`}
                  >
                    <Arrow className={`size-4 transition-transform duration-500 ${give ? "-rotate-45 group-hover:rotate-0" : "rotate-90 group-hover:translate-y-0.5"}`} />
                  </span>
                </span>
                <span className="mt-auto block pt-10 sm:pt-14">
                  <span className="display block text-[2.5rem] leading-[0.95]">{w.title}</span>
                  <span className={`mt-4 block text-sm leading-relaxed ${give ? "text-white/85" : "text-paper/65"}`}>{item.text}</span>
                  <span className={`micro mt-6 block ${give ? "text-white" : "text-red"}`}>{item.cta}</span>
                </span>
              </>
            );
            const card = `group relative flex h-full min-h-[17rem] w-full sm:min-h-[22rem] flex-col overflow-hidden rounded-[4px] p-7 text-left transition-colors duration-500 sm:p-8`;
            return (
              <li key={w.id} data-way>
                {give ? (
                  <a href={site.donateUrl} target="_blank" rel="noopener noreferrer" className={`${card} bg-red text-white hover:bg-red-deep`}>
                    {inner}
                    <span className="sr-only"> (opens PayPal in a new tab)</span>
                  </a>
                ) : (
                  <button type="button" onClick={() => "topic" in w && pick(w.topic)} className={`${card} border border-white/12 bg-ink-2 hover:border-white/30 hover:bg-ink-3`}>
                    {inner}
                  </button>
                )}
              </li>
            );
          })}
        </ul>

        <p className="mt-10 max-w-3xl text-sm leading-relaxed text-paper/55">
          Kingdom Racing serves alongside ministry partners including {ministryPartners.slice(0, -1).join(", ")}, and {ministryPartners[ministryPartners.length - 1]}.
        </p>
      </div>
    </section>
  );
}
