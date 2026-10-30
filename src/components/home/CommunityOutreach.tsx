"use client";

import Image from "next/image";
import { useRef } from "react";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { gsap, MQ, useGSAP } from "@/lib/gsap";

const tiles = [
  { src: "/images/paddock-community.jpg", alt: "Illustrative image: a team member talks with children and their families in the paddock.", area: "lg:col-[1/5] lg:row-[1/3]", pos: "40% 40%", from: { x: -55, y: -40, z: -900, r: -14 } },
  { src: "/images/grandstands.jpg", alt: "Illustrative image: race fans fill the grandstands above a banked oval.", area: "lg:col-[5/9] lg:row-[1/2]", pos: "50% 60%", from: { x: 10, y: -70, z: -1400, r: 8 } },
  { src: "/images/sharing-the-word.jpg", alt: "Illustrative image: friends read the Bible together beside pit lane.", area: "lg:col-[9/13] lg:row-[1/3]", pos: "45% 50%", from: { x: 60, y: -30, z: -700, r: 12 } },
  { src: "/images/prayer-circle.jpg", alt: "Illustrative image: families pray together near the speedway.", area: "lg:col-[1/5] lg:row-[3/4]", pos: "50% 35%", from: { x: -70, y: 50, z: -1200, r: 10 } },
  { src: "/images/oval-crowd.jpg", alt: "Illustrative image: spectators watch open-wheel cars sweep through a turn.", area: "lg:col-[9/13] lg:row-[3/4]", pos: "40% 60%", from: { x: 70, y: 60, z: -1000, r: -9 } },
] as const;

const notes = [
  { k: "Families", v: "VIP race-day experiences for youth groups, individuals, and families walking through hard seasons." },
  { k: "Local events", v: "Go-kart events hosted close to home, where neighbors can gather around the joy of racing." },
  { k: "At home", v: "Free GOD SPEED Magazine subscriptions and prayer for anyone who asks." },
] as const;

/**
 * Concept — "The gathering": photographs begin scattered through deep 3D space and converge
 * into one composition as the reader scrolls, the way a race weekend draws a community together.
 */
export function CommunityOutreach() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const items = gsap.utils.toArray<HTMLElement>("[data-gather]", el);
      const mm = gsap.matchMedia();

      mm.add(MQ.desktop, () => {
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: "[data-gather-stage]", start: "top top", end: "+=160%", pin: true, scrub: 1, anticipatePin: 1 },
        });
        items.forEach((item, i) => {
          const f = tiles[i].from;
          tl.fromTo(
            item,
            { xPercent: f.x * 2, yPercent: f.y * 2, z: f.z, rotate: f.r, autoAlpha: 0 },
            { xPercent: 0, yPercent: 0, z: 0, rotate: 0, autoAlpha: 1, duration: 1, ease: "power2.out" },
            i * 0.08,
          );
          tl.fromTo(item.querySelector("img"), { scale: 1.5 }, { scale: 1, duration: 1.2 }, i * 0.08);
        });
        tl.fromTo("[data-gather-core]", { autoAlpha: 0, scale: 0.85 }, { autoAlpha: 1, scale: 1, duration: 0.6, ease: "power2.out" }, 0.55)
          .fromTo("[data-gather-ring]", { scale: 0.2, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.9 }, 0.4)
          .to({}, { duration: 0.35 });
      });

      mm.add(MQ.mobile, () => {
        items.forEach((item, i) =>
          gsap.from(item, {
            y: 90,
            rotate: i % 2 ? 4 : -4,
            scale: 0.9,
            autoAlpha: 0,
            duration: 1.3,
            ease: "expo.out",
            scrollTrigger: { trigger: item, start: "top 92%", once: true },
          }),
        );
        gsap.from("[data-gather-core]", { y: 40, autoAlpha: 0, duration: 1.2, scrollTrigger: { trigger: "[data-gather-core]", start: "top 88%", once: true } });
      });

      mm.add(MQ.motion, () => {
        gsap.from("[data-note]", {
          y: 50,
          autoAlpha: 0,
          stagger: 0.1,
          duration: 1.2,
          scrollTrigger: { trigger: "[data-notes]", start: "top 85%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="community" data-theme="light" data-chapter="Community" className="relative overflow-hidden pt-28 sm:pt-40">
      <div className="shell gutter grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Eyebrow index="07">Community & outreach</Eyebrow>
          <SplitReveal as="h2" className="display t-1 mt-8">
            Racing for a <em>stronger</em> tomorrow.
          </SplitReveal>
        </div>
        <div className="flex flex-col justify-end gap-8 lg:col-span-4 lg:col-start-9">
          <p className="t-lead text-mute">
            We create spaces where people can belong, grow, and be inspired — from local events to the biggest race weekends in the country.
          </p>
          <Button href="/ministry" variant="circle">
            Our community work
          </Button>
        </div>
      </div>

      <div data-gather-stage className="relative lg:flex lg:h-[100svh] lg:items-center">
        <div className="shell gutter relative w-full py-16 [perspective:1600px] lg:py-0">
          <div className="grid grid-cols-2 gap-3 [transform-style:preserve-3d] sm:gap-4 lg:h-[74svh] lg:grid-cols-12 lg:grid-rows-3 lg:gap-5">
            {tiles.map((t, i) => (
              <figure
                key={t.src}
                data-gather
                className={`relative overflow-hidden rounded-[3px] bg-ink-3 will-change-transform ${t.area} ${i === 0 ? "col-span-2 aspect-[16/11] lg:aspect-auto" : "aspect-[4/5] lg:aspect-auto"}`}
              >
                <Image src={t.src} alt={t.alt} fill sizes="(min-width: 1024px) 33vw, 50vw" className="object-cover" style={{ objectPosition: t.pos }} />
              </figure>
            ))}

            <div
              data-gather-core
              className="relative col-span-2 flex flex-col items-center justify-center gap-5 rounded-[3px] bg-ink p-8 text-center text-paper lg:col-[5/9] lg:row-[2/4] lg:p-10"
            >
              <span data-gather-ring aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 size-[min(70%,22rem)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-red/40" />
              <p className="micro relative text-red">One weekend · Many lives</p>
              <p className="display relative text-[clamp(2rem,3.4vw,3.6rem)] leading-[1.02]">
                Everyone has a seat <em>at the table.</em>
              </p>
              <p className="relative max-w-sm text-sm leading-relaxed text-paper/65">Grandstands, garages, and go-kart tracks become places where strangers become neighbors.</p>
            </div>
          </div>
          <p className="micro mt-4 text-mute">Illustrative imagery</p>
        </div>
      </div>

      <div data-notes className="shell gutter grid gap-px border-y border-line pb-28 sm:pb-36 lg:grid-cols-3 lg:gap-10 lg:border-0 lg:pt-8">
        {notes.map((n, i) => (
          <div key={n.k} data-note className="border-b border-line py-8 last:border-0 lg:border-b-0 lg:border-t lg:pt-8">
            <p className="micro tabular-nums text-red">{String(i + 1).padStart(2, "0")}</p>
            <h3 className="display t-4 mt-4">{n.k}</h3>
            <p className="mt-3 max-w-sm text-[1.0625rem] leading-relaxed text-mute">{n.v}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
