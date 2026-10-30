"use client";

import Image from "next/image";
import { useRef, type ReactNode } from "react";
import { LOGO } from "@/components/ui/Logo";
import { gsap, useGSAP } from "@/lib/gsap";

let firstMount = true;

/** Route transition: a curtain carrying the cross mark lifts off each newly loaded page. */
export default function Template({ children }: { children: ReactNode }) {
  const curtain = useRef<HTMLDivElement>(null);
  const page = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (firstMount) {
      firstMount = false;
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const tl = gsap.timeline({ defaults: { ease: "expo.inOut" } });
    tl.set(curtain.current, { display: "flex", yPercent: 0 })
      .fromTo("[data-curtain-mark]", { autoAlpha: 0, scale: 0.9 }, { autoAlpha: 1, scale: 1, duration: 0.4, ease: "power2.out" })
      .to(curtain.current, { yPercent: -100, duration: 1.1 }, 0.35)
      // Opacity only: a transform here would break position:fixed pins inside the page.
      .from(page.current, { opacity: 0, duration: 0.9, ease: "power2.out", clearProps: "opacity" }, 0.45)
      .set(curtain.current, { display: "none" });
  });

  return (
    <>
      <div ref={curtain} aria-hidden="true" className="fixed inset-0 z-[120] hidden items-center justify-center bg-ink">
        <Image data-curtain-mark src="/brand/kingdom-racing-logo-light.png" alt="" {...LOGO} sizes="160px" className="h-auto w-40 opacity-0" />
        <span className="absolute inset-x-0 bottom-0 h-1 bg-red" />
      </div>
      <div ref={page}>{children}</div>
    </>
  );
}
