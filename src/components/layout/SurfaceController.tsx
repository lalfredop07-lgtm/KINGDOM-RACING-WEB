"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { ScrollTrigger } from "@/lib/gsap";

/**
 * Sections declare data-theme="light" | "dark". As each one crosses the middle of the
 * viewport the whole canvas cross-fades to its surface (see the @property tokens in globals.css).
 */
export function SurfaceController() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-theme]"));
    if (sections[0]) {
      root.dataset.surface = sections[0].dataset.theme;
      root.dataset.nav = sections[0].dataset.theme;
    }
    const triggers = sections.flatMap((section) => [
      ScrollTrigger.create({
        trigger: section,
        start: "top 52%",
        end: "bottom 52%",
        onToggle: (self) => {
          if (self.isActive) root.dataset.surface = section.dataset.theme;
        },
      }),
      // The header reads the section passing beneath it (just under its own height).
      ScrollTrigger.create({
        trigger: section,
        start: "top 48px",
        end: "bottom 48px",
        onToggle: (self) => {
          if (self.isActive) root.dataset.nav = section.dataset.theme;
        },
      }),
    ]);
    return () => triggers.forEach((t) => t.kill());
  }, [pathname]);

  return null;
}
