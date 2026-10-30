"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const LenisContext = createContext<Lenis | null>(null);

export const useLenis = () => useContext(LenisContext);

export function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.classList.add("js-motion");
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if ((navigator.hardwareConcurrency ?? 8) <= 4 || conn?.saveData) document.documentElement.classList.add("low-power");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) {
      document.documentElement.classList.remove("js-motion");
      return;
    }

    const instance = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Native momentum on touch devices feels better than synthetic smoothing.
      syncTouch: false,
      // In-page links (#subscribe, #contact…) glide instead of jumping.
      anchors: { duration: 1.4 },
    });
    instance.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    setLenis(instance);

    return () => {
      gsap.ticker.remove(tick);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  // Each route starts at the top, and triggers are measured after the new layout settles.
  // A route opened with a hash lands on its target only after pinned sections above it have
  // added their scroll length; scrolling earlier would stop short.
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) {
      lenis?.scrollTo(0, { immediate: true, force: true });
      window.scrollTo(0, 0);
    }
    const id = window.setTimeout(() => {
      ScrollTrigger.refresh();
      const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
      if (!target) return;
      if (lenis) lenis.scrollTo(target, { immediate: true, force: true });
      else target.scrollIntoView();
    }, 160);
    return () => window.clearTimeout(id);
  }, [pathname, lenis]);

  // Late font and image loads shift layout; re-measure once everything has arrived.
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);
    return () => window.removeEventListener("load", refresh);
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
