"use client";

import { useRef } from "react";
import { gsap, MQ, useGSAP } from "@/lib/gsap";

/** Rolling-digit counter: each digit column spins into place like a race timing board. */
export function Odometer({ value, suffix = "", plain = false, className = "" }: { value: number; suffix?: string; plain?: boolean; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const text = plain ? String(value) : value.toLocaleString("en-US");

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const cols = el.querySelectorAll<HTMLElement>("[data-col]");
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.set(cols, { clearProps: "transform" });
        gsap.fromTo(cols, { yPercent: 0 }, {
          yPercent: (_i: number, target: HTMLElement) => -(10 + Number(target.dataset.col)) * 5,
          duration: (i: number) => 2.2 + i * 0.12,
          ease: "power4.out",
          stagger: 0.06,
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <span ref={ref} className={`inline-flex items-baseline tabular-nums ${className}`}>
      <span className="sr-only">
        {text}
        {suffix}
      </span>
      <span aria-hidden="true" className="inline-flex">
        {text.split("").map((ch, i) =>
          /\d/.test(ch) ? (
            <span key={i} className="relative inline-block h-[1em] overflow-hidden leading-none">
              <span className="invisible">{ch}</span>
              {/* 20 digits (two full turns) then the target: rolls fast before landing. */}
              <span data-col={ch} className="absolute inset-x-0 top-0 flex flex-col items-center" style={{ transform: `translateY(-${(10 + Number(ch)) * 5}%)` }}>
                {Array.from({ length: 20 }, (_, d) => (
                  <span key={d} className="block h-[1em] leading-none">
                    {d % 10}
                  </span>
                ))}
              </span>
            </span>
          ) : (
            <span key={i} className="leading-none">
              {ch}
            </span>
          ),
        )}
      </span>
      {suffix ? <span className="leading-none text-red">{suffix}</span> : null}
    </span>
  );
}
