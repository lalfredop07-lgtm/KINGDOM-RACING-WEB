"use client";

import { useRef } from "react";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Arrow } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { gsap, MQ, SplitText, useGSAP } from "@/lib/gsap";
import { magazine, magazineMailto, site } from "@/content/site";

/**
 * Concept — "Stamped free": the word Free is struck onto the page letter by letter like a
 * rubber stamp while the two real ways to subscribe swing up into place. Both routes are
 * handled by Kingdom Racing; nothing is collected or stored by this website.
 */
export function Subscribe() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const split = SplitText.create(el.querySelector("[data-stamp]"), { type: "chars" });
        gsap.from(split.chars, {
          scale: 2.6,
          rotate: (i) => (i % 2 ? 14 : -10),
          autoAlpha: 0,
          stagger: 0.09,
          duration: 0.7,
          ease: "back.out(2.2)",
          scrollTrigger: { trigger: "[data-stamp]", start: "top 82%", once: true },
        });
        gsap.from("[data-route]", {
          rotationX: 55,
          y: 80,
          autoAlpha: 0,
          transformOrigin: "50% 100%",
          stagger: 0.14,
          duration: 1.5,
          ease: "expo.out",
          scrollTrigger: { trigger: "[data-routes]", start: "top 85%", once: true },
        });
        gsap.to("[data-sub-seal]", { rotate: 220, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
        return () => split.revert();
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  const routes = [
    {
      n: "01",
      title: "Sign up on kingdomracing.net",
      text: magazine.signupHow,
      note: "Kingdom Racing’s official sign-up form opens in a new tab.",
      cta: "Open the official sign-up form",
      href: magazine.signupUrl,
      external: true,
    },
    {
      n: "02",
      title: "Request it by email",
      text: `${magazine.byEmail} Write to ${site.email}.`,
      note: "Opens your email app with a ready-to-send message. Nothing is sent until you press send.",
      cta: "Email the team",
      href: magazineMailto,
      external: false,
    },
  ];

  return (
    <section ref={ref} id="subscribe" data-theme="dark" data-chapter="Subscribe" className="relative scroll-mt-10 overflow-hidden bg-ink py-28 text-paper sm:py-40">
      <div aria-hidden className="absolute -left-[20vmax] bottom-[-30vmax] size-[70vmax] rounded-full bg-[radial-gradient(closest-side,rgba(212,20,42,0.22),transparent)]" />
      <div className="shell gutter relative">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Eyebrow index="01">Subscribe</Eyebrow>
            <h2 className="sr-only">Subscribe to GOD SPEED Magazine — It’s Free.</h2>
            <div aria-hidden>
              <SplitReveal className="display t-1 mt-8">Subscribe to GOD SPEED Magazine —</SplitReveal>
              <p className="display t-1 mt-2 italic text-red">
                <span data-stamp className="inline-block">
                  It’s Free.
                </span>
              </p>
            </div>
          </div>
          <div className="flex items-end lg:col-span-3 lg:col-start-10 lg:justify-end">
            <div data-sub-seal aria-hidden className="relative size-32 sm:size-40">
              <svg viewBox="0 0 200 200" className="size-full text-paper/70">
                <defs>
                  <path id="sub-seal" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
                </defs>
                <text className="fill-current font-sans text-[14px] font-medium uppercase tracking-[0.36em]">
                  <textPath href="#sub-seal" textLength="486" lengthAdjust="spacing">100% free • No cost • 100% free • No cost •</textPath>
                </text>
              </svg>
            </div>
          </div>
        </div>

        <p className="t-lead mt-10 max-w-2xl text-paper/75">
          {magazine.free} Choose whichever way is easier for you — both go straight to the Kingdom Racing team.
        </p>

        <div data-routes className="mt-16 grid gap-5 [perspective:1600px] md:grid-cols-2">
          {routes.map((r) => (
            <a
              key={r.n}
              data-route
              href={r.href}
              {...(r.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="group relative flex flex-col justify-between gap-12 overflow-hidden rounded-[4px] border border-white/12 bg-ink-2 p-7 transition-colors duration-500 hover:border-red sm:p-10"
              data-cursor="Go"
            >
              <span aria-hidden className="absolute inset-0 origin-bottom scale-y-0 bg-red transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-y-100" />
              <span className="relative">
                <span className="micro tabular-nums text-red transition-colors duration-500 group-hover:text-white">{r.n}</span>
                <span className="display mt-5 block text-[clamp(2rem,3.4vw,3.2rem)] leading-[1]">{r.title}</span>
                <span className="mt-5 block max-w-md text-[1.0625rem] leading-relaxed text-paper/70 group-hover:text-white/90">{r.text}</span>
              </span>
              <span className="relative flex items-end justify-between gap-6">
                <span className="max-w-xs text-xs leading-relaxed text-paper/45 group-hover:text-white/75">{r.note}</span>
                <span className="flex shrink-0 items-center gap-3 text-sm font-medium">
                  <span className="max-sm:sr-only">{r.cta}</span>
                  <span className="grid size-12 place-items-center rounded-full border border-white/25 transition-colors duration-500 group-hover:border-white group-hover:bg-white group-hover:text-red">
                    <Arrow className="size-5" />
                  </span>
                </span>
              </span>
            </a>
          ))}
        </div>

        <p className="mt-10 max-w-2xl text-sm leading-relaxed text-paper/50">
          “{magazine.privacy}” — Kingdom Racing. This website does not collect, store, or forward your details.
        </p>
      </div>
    </section>
  );
}
