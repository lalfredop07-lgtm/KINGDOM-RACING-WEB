"use client";

import Image from "next/image";
import { useEffect, useRef, type UIEvent } from "react";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { VideoLoop } from "@/components/motion/VideoLoop";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { gsap, MQ, useGSAP } from "@/lib/gsap";

const laps = [
  {
    key: "2007",
    title: "On track since 2007",
    text: "IndyCar, sports cars, sprint cars, and other motorsports — each one a platform for the message.",
    media: { video: "/media/chase.mp4", poster: "/media/chase-poster.jpg" },
    alt: "Illustrative footage: an open-wheel car races toward the setting sun.",
  },
  {
    key: "2008",
    title: "Indianapolis history",
    text: "The first faith-vision team ever to compete in the Indianapolis 500 Mile Race.",
    media: { image: "/images/front-straight.jpg" },
    alt: "Illustrative image: race cars on a speedway front straight beside a pagoda-style tower.",
  },
  {
    key: "70+",
    title: "Races with purpose",
    text: "More than 70 IndyCar and other major-series races, and countless conversations along the way.",
    media: { image: "/images/car-detail.jpg" },
    alt: "Illustrative image: close detail of a black and red open-wheel race car at speed.",
  },
  {
    key: "∞",
    title: "One finish line",
    text: "We race to represent something bigger. Every lap is an opportunity to make an eternal difference.",
    media: { image: "/images/grandstands.jpg" },
    alt: "Illustrative image: packed grandstands above a banked oval as the field streams through the turn.",
  },
] as const;

/** Phones swipe the rail natively; the red line shows how much of it has been seen. */
function showSwipe(rail: HTMLElement, bar: HTMLElement | null) {
  if (bar) bar.style.transform = `scaleX(${Math.min(1, (rail.scrollLeft + rail.clientWidth) / rail.scrollWidth)})`;
}

/**
 * Concept — "The straightaway": the section pins and the story travels sideways like a car
 * down the front stretch. Each photograph drifts inside its frame against the travel, and a
 * lap counter tracks progress. On touch screens it becomes a native swipe rail.
 */
export function CompetingWithPurpose() {
  const ref = useRef<HTMLElement>(null);
  const swipeBar = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const rail = ref.current?.querySelector<HTMLElement>("[data-rail]");
    if (rail) showSwipe(rail, swipeBar.current);
  }, []);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const track = el.querySelector<HTMLElement>("[data-rail]");
      if (!track) return;
      const mm = gsap.matchMedia();

      mm.add(MQ.desktop, () => {
        const distance = () => track.scrollWidth - window.innerWidth;
        const travel = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              const lap = Math.min(laps.length, Math.floor(self.progress * laps.length) + 1);
              const counter = el.querySelector("[data-lap]");
              if (counter) counter.textContent = String(lap);
            },
          },
        });
        gsap.utils.toArray<HTMLElement>("[data-panel-media]", el).forEach((media) => {
          gsap.fromTo(
            media,
            { xPercent: -12 },
            {
              xPercent: 12,
              ease: "none",
              scrollTrigger: { trigger: media.parentElement, containerAnimation: travel, start: "left right", end: "right left", scrub: true },
            },
          );
        });
        gsap.utils.toArray<HTMLElement>("[data-panel-copy]", el).forEach((copy) => {
          gsap.from(copy.children, {
            y: 60,
            autoAlpha: 0,
            stagger: 0.08,
            duration: 1.2,
            scrollTrigger: { trigger: copy, containerAnimation: travel, start: "left 80%", once: true },
          });
        });
        gsap.fromTo("[data-speedline]", { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { trigger: el, start: "top top", end: () => `+=${distance()}`, scrub: true } });
      });

      mm.add(MQ.mobile, () => {
        gsap.from("[data-rail] > *", {
          x: 80,
          autoAlpha: 0,
          stagger: 0.1,
          duration: 1.2,
          scrollTrigger: { trigger: track, start: "top 85%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="competing" data-theme="dark" data-chapter="Racing" className="relative overflow-hidden bg-ink text-paper lg:h-[100svh]">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 hidden h-[var(--nav-h)] lg:block" />
      <div
        data-rail
        onScroll={(e: UIEvent<HTMLDivElement>) => showSwipe(e.currentTarget, swipeBar.current)}
        className="no-scrollbar flex h-full snap-x snap-mandatory scroll-px-[var(--gutter)] items-stretch gap-4 overflow-x-auto px-[var(--gutter)] pb-20 pt-24 will-change-transform lg:w-max lg:snap-none lg:scroll-px-0 lg:gap-0 lg:overflow-visible lg:p-0"
      >
        <div className="flex w-[86vw] shrink-0 snap-start flex-col justify-center sm:w-[70vw] lg:h-full lg:w-[46vw] lg:pl-[var(--gutter)] lg:pr-[6vw]">
          <Eyebrow index="02">On the track</Eyebrow>
          <SplitReveal as="h2" className="display t-1 mt-8">
            Competing <em>with</em> purpose.
          </SplitReveal>
          <p className="t-lead mt-8 max-w-md text-paper/70">
            Excellence on track opens doors off it. We compete at the highest levels of motorsport so we can stand alongside the people who make it run.
          </p>
          <div className="mt-10">
            <Button href="/racing">Our racing program</Button>
          </div>
          <p className="micro mt-12 hidden items-center gap-3 text-paper/50 lg:flex">
            Keep scrolling <span aria-hidden>→</span>
          </p>
        </div>

        {laps.map((lap, i) => (
          <article
            key={lap.key}
            className="relative flex w-[86vw] shrink-0 snap-start flex-col gap-6 sm:w-[64vw] lg:h-full lg:w-[62vw] lg:justify-center lg:gap-0 lg:pr-[4vw]"
          >
            <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[16/11] lg:aspect-auto lg:h-[64vh]">
              <div data-panel-media className="absolute inset-y-0 -left-[14%] -right-[14%]">
                {"video" in lap.media ? (
                  <VideoLoop src={lap.media.video} poster={lap.media.poster} label={lap.alt} />
                ) : (
                  <Image src={lap.media.image} alt={lap.alt} fill sizes="(min-width: 1024px) 62vw, 86vw" className="object-cover" />
                )}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
              <span className="display absolute -bottom-[0.12em] left-4 text-[clamp(5rem,13vw,13rem)] leading-none text-paper/85">
                {lap.key}
              </span>
            </div>
            <div data-panel-copy className="grid gap-3 lg:mt-8 lg:grid-cols-[auto_1fr] lg:gap-10">
              <p className="micro tabular-nums text-red">Lap {String(i + 1).padStart(2, "0")}</p>
              <div>
                <h3 className="display t-4">{lap.title}</h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-paper/65">{lap.text}</p>
              </div>
            </div>
          </article>
        ))}
        <div className="hidden w-[var(--gutter)] shrink-0 lg:block" aria-hidden />
      </div>

      <div className="gutter pointer-events-none absolute inset-x-0 bottom-8 hidden items-center gap-6 lg:flex">
        <p className="micro tabular-nums text-paper/70">
          Lap <span data-lap>1</span> / {laps.length}
        </p>
        <span className="relative h-px flex-1 bg-paper/15">
          <span data-speedline className="absolute inset-0 origin-left bg-red" />
        </span>
        <p className="micro text-paper/50">Illustrative imagery</p>
      </div>
      <div className="gutter -mt-12 flex items-center gap-4 pb-10 lg:hidden">
        <p className="micro shrink-0 text-paper/70">
          Swipe <span aria-hidden>→</span>
        </p>
        <span className="relative h-px flex-1 bg-paper/15" aria-hidden>
          <span ref={swipeBar} className="absolute inset-0 origin-left scale-x-[0.3] bg-red transition-transform duration-300" />
        </span>
        <p className="micro shrink-0 text-paper/45">Illustrative</p>
      </div>
    </section>
  );
}
