"use client";

import { useEffect, useRef } from "react";
import { gsap, MQ } from "@/lib/gsap";

/** A quiet two-part cursor for fine pointers. Elements with data-cursor="Label" expand it. */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!window.matchMedia(`${MQ.fine} and ${MQ.motion}`).matches) return;
    const d = dot.current!;
    const r = ring.current!;
    const l = label.current!;
    gsap.set([d, r], { xPercent: -50, yPercent: -50, autoAlpha: 0 });
    const dx = gsap.quickTo(d, "x", { duration: 0.12, ease: "power3" });
    const dy = gsap.quickTo(d, "y", { duration: 0.12, ease: "power3" });
    const rx = gsap.quickTo(r, "x", { duration: 0.55, ease: "power3" });
    const ry = gsap.quickTo(r, "y", { duration: 0.55, ease: "power3" });
    let current: string | null = null;

    const move = (e: PointerEvent) => {
      gsap.to([d, r], { autoAlpha: 1, duration: 0.3, overwrite: "auto" });
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
      const target = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor], a, button");
      const next = target ? target.dataset.cursor ?? "" : null;
      if (next === current) return;
      current = next;
      if (next === null) {
        gsap.to(r, { scale: 1, backgroundColor: "rgba(212,20,42,0)", duration: 0.5 });
        gsap.to(d, { scale: 1, duration: 0.3 });
        gsap.to(l, { autoAlpha: 0, duration: 0.2 });
      } else if (next === "") {
        gsap.to(r, { scale: 1.6, backgroundColor: "rgba(212,20,42,0)", duration: 0.5 });
        gsap.to(d, { scale: 0, duration: 0.3 });
        gsap.to(l, { autoAlpha: 0, duration: 0.2 });
      } else {
        l.textContent = next;
        gsap.to(r, { scale: 2.6, backgroundColor: "rgba(212,20,42,0.92)", duration: 0.5 });
        gsap.to(d, { scale: 0, duration: 0.3 });
        gsap.to(l, { autoAlpha: 1, duration: 0.3, delay: 0.1 });
      }
    };
    const leave = () => gsap.to([d, r], { autoAlpha: 0, duration: 0.3 });
    window.addEventListener("pointermove", move);
    document.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[150] hidden [@media(hover:hover)_and_(pointer:fine)]:block">
      <div ref={ring} className="fixed left-0 top-0 grid size-9 place-items-center rounded-full border border-red/70 opacity-0">
        <span ref={label} className="micro scale-[0.4] whitespace-nowrap font-semibold tracking-[0.2em] text-white opacity-0" />
      </div>
      <div ref={dot} className="fixed left-0 top-0 size-1.5 rounded-full bg-red opacity-0" />
    </div>
  );
}
