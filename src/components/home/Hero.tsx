"use client";

import { useRef } from "react";
import { VideoLoop } from "@/components/motion/VideoLoop";
import { Button } from "@/components/ui/Button";
import { gsap, MQ, SplitText, useGSAP } from "@/lib/gsap";
import { onIntroDone } from "@/lib/intro";
import { site } from "@/content/site";

/**
 * Hero concept — "Lights out": the letterbox opens on forward-moving race footage, the
 * three words rise one by one, and on scroll the camera pushes *into* the track while the
 * type layers drift apart at different depths. Footage never scrubs, so it only plays forward.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();

      mm.add(MQ.motion, () => {
        const words = gsap.utils.toArray<HTMLElement>("[data-hero-word]", el);
        // The heading carries its own label, so the split letters stay out of the accessibility tree.
        const splits = words.map((w) => SplitText.create(w, { type: "chars", mask: "chars", charsClass: "hero-char", aria: "none" }));
        gsap.set("[data-hero-copy]", { autoAlpha: 1 });
        gsap.set("[data-hero-media]", { clipPath: "inset(50% 0% 50% 0%)" });
        gsap.set("[data-hero-video]", { scale: 1.28 });
        gsap.set(splits.flatMap((s) => s.chars), { yPercent: 110 });
        gsap.set("[data-hero-fade]", { autoAlpha: 0, y: 24 });
        gsap.set("[data-hero-rule]", { scaleX: 0 });

        const intro = gsap.timeline({ paused: true, defaults: { ease: "expo.out" } });
        intro
          .to("[data-hero-media]", { clipPath: "inset(0% 0% 0% 0%)", duration: 1.8, ease: "expo.inOut" })
          .to("[data-hero-video]", { scale: 1.06, duration: 2.6 }, 0.2)
          .to(splits[0].chars, { yPercent: 0, stagger: 0.045, duration: 1.4 }, 0.9)
          .to(splits[1].chars, { yPercent: 0, stagger: 0.045, duration: 1.4 }, 1.1)
          .to(splits[2].chars, { yPercent: 0, stagger: 0.045, duration: 1.4 }, 1.3)
          .to("[data-hero-rule]", { scaleX: 1, duration: 1.4, ease: "expo.inOut" }, 1.2)
          .to("[data-hero-fade]", { autoAlpha: 1, y: 0, stagger: 0.08, duration: 1.2 }, 1.7);
        const off = onIntroDone(() => intro.play());

        // Scroll: the hero holds still (pinned, no spacer) while the next chapter slides over it
        // like a curtain; inside, the camera pushes into the scene and the type layers separate.
        const scroll = gsap.timeline({
          scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: 0.8, pin: true, pinSpacing: false },
          defaults: { ease: "none" },
        });
        scroll
          .to("[data-hero-push]", { scale: 1.22, yPercent: 6 }, 0)
          .to("[data-hero-media]", { scale: 0.92, borderRadius: 24 }, 0)
          .to("[data-hero-shade]", { opacity: 0.8 }, 0)
          .to("[data-depth='1']", { yPercent: -60 }, 0)
          .to("[data-depth='2']", { yPercent: -110 }, 0)
          .to("[data-depth='3']", { yPercent: -170 }, 0)
          .to("[data-hero-fadeout]", { autoAlpha: 0, y: -40 }, 0)
          .to("[data-hero-badge]", { rotate: 200, yPercent: -80 }, 0);

        return () => {
          off();
          splits.forEach((s) => s.revert());
        };
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      id="hero"
      data-theme="dark"
      data-chapter="Speed"
      className="relative h-[100svh] min-h-[620px] overflow-hidden bg-ink text-paper"
      aria-label="Kingdom Racing — Speed. People. Purpose."
    >
      <div data-hero-media className="absolute inset-0 overflow-hidden">
        <div data-hero-push className="absolute inset-0 will-change-transform">
          <div data-hero-video className="absolute inset-0 will-change-transform">
            <VideoLoop
              src="/media/hero-1080.mp4"
              srcSmall="/media/hero-720.mp4"
              srcPortrait="/media/hero-mobile.mp4"
              poster="/media/hero-1080-poster.jpg"
              posterPortrait="/media/hero-mobile-poster.jpg"
              label="Illustrative footage: open-wheel race cars racing toward the camera on an oval at sunset."
            />
          </div>
        </div>
        {/* Cinematic grade: keeps type legible without flattening the footage. */}
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_70%_60%,transparent_30%,rgba(8,8,9,0.55)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/75 via-ink/25 to-transparent max-lg:from-ink/55" />
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-ink/85 to-transparent" />
        <div data-hero-shade className="absolute inset-0 bg-ink opacity-0" />
        <div className="grain absolute inset-0 overflow-hidden" />
      </div>

      <div data-hero-copy data-reveal className="gutter relative z-10 flex h-full flex-col justify-end pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-[var(--nav-h)] lg:pb-24">
        <div data-hero-fadeout className="mb-6 flex items-center gap-4 lg:mb-8">
          <span data-hero-rule className="block h-px w-12 origin-left bg-red" />
          <p data-hero-fade className="eyebrow text-paper/85">
            A higher purpose
          </p>
        </div>

        <h1 className="display t-hero select-none" aria-label="Speed. People. Purpose.">
          <span data-depth="1" className="block" aria-hidden>
            <span data-hero-word className="block">Speed.</span>
          </span>
          <span data-depth="2" className="block pl-[0.55em] max-sm:pl-[0.3em]" aria-hidden>
            <span data-hero-word className="block italic">People.</span>
          </span>
          <span data-depth="3" className="block pl-[1.1em] max-sm:pl-[0.15em]" aria-hidden>
            <span data-hero-word className="block">Purpose.</span>
          </span>
        </h1>

        <div data-hero-fadeout className="mt-8 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between lg:mt-10">
          <p data-hero-fade className="t-lead max-w-[26rem] text-paper/80">
            {site.tagline} — carrying a message of hope to every circuit, city, and generation.
          </p>
          <div data-hero-fade>
            <Button href="#more-than-racing" variant="circle">
              Discover our story
            </Button>
          </div>
        </div>
      </div>

      {/* Rotating seal, as in the approved hero reference. */}
      <div data-hero-badge data-hero-fade className="pointer-events-none absolute right-[var(--gutter)] top-[22%] z-10 hidden size-36 lg:block xl:right-[calc(var(--gutter)+4rem)]">
        <svg viewBox="0 0 200 200" className="size-full animate-[spin_28s_linear_infinite] text-paper/80" aria-hidden="true">
          <defs>
            <path id="seal" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
          </defs>
          <text className="fill-current font-sans text-[13px] font-medium uppercase tracking-[0.42em]">
            <textPath href="#seal">Faith • Spirit • Truth • Motorsports •</textPath>
          </text>
        </svg>
        <svg viewBox="0 0 24 24" className="absolute left-1/2 top-1/2 size-7 -translate-x-1/2 -translate-y-1/2 text-paper" aria-hidden="true">
          <path d="M12 3v18M7 8.5h10" stroke="currentColor" strokeWidth="1.25" />
        </svg>
      </div>

      <div data-hero-fadeout className="gutter pointer-events-none absolute inset-x-0 bottom-6 z-10 hidden items-center justify-between lg:flex">
        <span aria-hidden />
        <p data-hero-fade className="micro text-paper/50">Illustrative footage</p>
      </div>
    </section>
  );
}
