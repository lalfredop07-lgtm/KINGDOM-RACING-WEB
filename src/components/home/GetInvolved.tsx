"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Arrow, Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { involvement } from "@/content/site";

/**
 * Concept — "The finish": an iris opens from a single point of light into the closing scene,
 * then four ways to join the mission expand fluidly under the pointer.
 */
export function GetInvolved({ withIris = true }: { withIris?: boolean }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      if (withIris) {
        // Phones open from a wider iris over a shorter pin, so the scene never reads as an empty screen.
        mm.add({ desktop: MQ.desktop, mobile: MQ.mobile }, (ctx) => {
          const { desktop, mobile } = ctx.conditions as { desktop: boolean; mobile: boolean };
          if (!desktop && !mobile) return;
          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: { trigger: "[data-iris-wrap]", start: "top top", end: mobile ? "+=90%" : "+=140%", pin: true, scrub: 1, anticipatePin: 1 },
          });
          tl.fromTo("[data-iris]", { clipPath: `circle(${mobile ? 16 : 4}% at 50% 55%)` }, { clipPath: "circle(75% at 50% 55%)", duration: 2 })
            .fromTo("[data-iris-img]", { scale: 1.5 }, { scale: 1, duration: 2 }, 0)
            .fromTo("[data-iris-copy]", { autoAlpha: 0, y: 60 }, { autoAlpha: 1, y: 0, duration: 0.8 }, 1.2)
            .to({}, { duration: 0.4 });
        });
      }
      mm.add(MQ.motion, () => {
        gsap.from("[data-path]", {
          y: 80,
          autoAlpha: 0,
          stagger: 0.08,
          duration: 1.4,
          scrollTrigger: { trigger: "[data-paths]", start: "top 85%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="get-involved" data-theme="dark" data-chapter="Join" className="relative bg-ink text-paper">
      {withIris ? (
        <div data-iris-wrap className="relative h-[100svh] min-h-[560px] overflow-hidden">
          <div data-iris className="absolute inset-0 overflow-hidden [.js-motion_&]:[clip-path:circle(4%_at_50%_55%)]">
            <div data-iris-img className="absolute inset-0">
              <Image src="/images/chase-sunset.jpg" alt="Illustrative image: an open-wheel race car heads toward the setting sun." fill sizes="100vw" className="object-cover" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-ink/20" />
          </div>
          <div data-iris-copy className="gutter absolute inset-x-0 bottom-0 pb-16 sm:pb-24">
            <div className="shell">
              <Eyebrow index="11">Get involved</Eyebrow>
              <h2 className="display t-1 mt-6 max-w-[12ch]">
                Be part of the <em>mission.</em>
              </h2>
              <div className="mt-8 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
                <p className="t-lead max-w-lg text-paper/80">
                  Join us in using motorsport as a force for good. Whether through prayer, volunteering, partnership, or giving — you can make an eternal impact.
                </p>
                <Button href="/support" variant="solid">
                  Support Kingdom Racing
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="shell gutter pt-28 sm:pt-36">
          <Eyebrow>Ways to help</Eyebrow>
          <SplitReveal as="h2" className="display t-1 mt-6">
            Four ways to <em>join in.</em>
          </SplitReveal>
        </div>
      )}

      <div data-paths className="shell gutter py-20 sm:py-28">
        <ul className="flex flex-col gap-px overflow-hidden rounded-[3px] bg-white/10 lg:h-[26rem] lg:flex-row">
          {involvement.map((item, i) => {
            const ext = "external" in item && item.external;
            const linkProps = ext ? { target: "_blank", rel: "noopener noreferrer" } : {};
            return (
              <li
                key={item.id}
                data-path
                id={item.id}
                className="group relative flex-1 bg-ink transition-[flex-grow,background-color] duration-700 ease-[var(--ease-out-expo)] hover:bg-ink-2 lg:hover:flex-[1.9]"
              >
                <Link href={item.href} {...linkProps} className="flex h-full flex-col justify-between gap-10 p-7 sm:p-9">
                  <div className="flex items-center justify-between">
                    <span className="micro tabular-nums text-paper/45">{String(i + 1).padStart(2, "0")}</span>
                    <span className="grid size-10 place-items-center rounded-full border border-white/20 transition-colors duration-500 group-hover:border-red group-hover:bg-red">
                      <Arrow className="size-4 -rotate-45 transition-transform duration-500 group-hover:rotate-0" />
                    </span>
                  </div>
                  <div>
                    <h3 className="display text-5xl transition-colors duration-500 group-hover:text-red lg:text-6xl">{item.title}</h3>
                    <p className="mt-5 max-w-sm text-sm leading-relaxed text-paper/65 lg:max-h-0 lg:overflow-hidden lg:opacity-0 lg:transition-all lg:duration-700 lg:group-hover:max-h-40 lg:group-hover:opacity-100 lg:group-focus-within:max-h-40 lg:group-focus-within:opacity-100">
                      {item.text}
                    </p>
                    <p className="micro mt-6 text-red">{item.cta}</p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
