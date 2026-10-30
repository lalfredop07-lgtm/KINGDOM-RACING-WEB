"use client";

import { useRef } from "react";
import { PrintObject } from "@/components/magazine/PrintObject";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { book } from "@/content/site";

/**
 * Concept — "Turned in hand": the book rotates with the scroll from its spine to its cover,
 * the way you'd pick it up off a table, while the opening line is written out word by word.
 */
export function BookFeature() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.fromTo(
          "[data-book] [data-print-body]",
          { rotationY: 62, rotationX: 4, rotationZ: -4 },
          { rotationY: -16, rotationX: 0, rotationZ: 0, ease: "none", scrollTrigger: { trigger: el, start: "top 85%", end: "center 40%", scrub: 1 } },
        );
        gsap.fromTo("[data-book]", { yPercent: 12 }, { yPercent: -6, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
        gsap.from("[data-book-fade]", { y: 30, autoAlpha: 0, stagger: 0.1, duration: 1.2, scrollTrigger: { trigger: "[data-book-copy]", start: "top 78%", once: true } });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} data-theme="light" data-chapter="The book" className="relative overflow-hidden py-28 sm:py-40">
      <div className="shell gutter grid items-center gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="order-2 lg:order-1 lg:col-span-5 lg:col-start-1">
          <div data-book className="mx-auto w-[min(62vw,20rem)] lg:w-[min(100%,22rem)]">
            <PrintObject kind="book" src={book.cover} alt={book.alt} width={book.width} height={book.height} sizes="(min-width: 1024px) 360px, 62vw" />
          </div>
        </div>

        <div data-book-copy className="order-1 lg:order-2 lg:col-span-6 lg:col-start-7">
          <Eyebrow index="02">The book</Eyebrow>
          <SplitReveal as="h2" className="display t-1 mt-8">
            {book.title}
          </SplitReveal>
          <p data-book-fade className="display t-4 mt-4 italic text-mute">
            {book.subtitle}
          </p>
          <blockquote data-book-fade className="display t-3 mt-12 border-l-2 border-red pl-6 leading-[1.08]">
            “{book.opening}”
          </blockquote>
          <p data-book-fade className="mt-8 max-w-lg text-[1.0625rem] leading-relaxed text-mute">
            {book.text}
          </p>
          <dl data-book-fade className="mt-10 grid gap-6 border-t border-line pt-6 text-sm sm:grid-cols-2">
            <div>
              <dt className="micro text-red">By</dt>
              <dd className="mt-2">{book.byline}</dd>
            </div>
            <div>
              <dt className="micro text-red">Foreword</dt>
              <dd className="mt-2">{book.foreword.replace("Foreword by ", "")}</dd>
            </div>
          </dl>
          <div data-book-fade className="mt-10 flex flex-wrap items-center gap-5">
            <Button href={book.orderUrl} variant="solid" external>
              Order the book
            </Button>
            <p className="text-xs text-mute">Opens the publisher’s store, as linked from kingdomracing.net.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
