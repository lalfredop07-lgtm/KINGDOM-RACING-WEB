"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

type Chapter = { id: string; label: string };

/** Thin race-red progress line plus a chapter index on large screens. */
export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const setBar = bar.current ? gsap.quickSetter(bar.current, "scaleX") : null;
    const progress = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => setBar?.(self.progress),
    });

    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-chapter]"));
    setChapters(nodes.map((n, i) => ({ id: n.id || `chapter-${i}`, label: n.dataset.chapter ?? "" })));
    setActive(0);
    const triggers = nodes.map((node, i) =>
      ScrollTrigger.create({
        trigger: node,
        start: "top 50%",
        end: "bottom 50%",
        onToggle: (self) => self.isActive && setActive(i),
      }),
    );
    return () => {
      progress.kill();
      triggers.forEach((t) => t.kill());
    };
  }, [pathname]);

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 top-0 z-[90] h-[2px]">
        <div ref={bar} className="h-full origin-left scale-x-0 bg-red" />
      </div>
      {chapters.length > 2 ? (
        <nav
          aria-label="Page chapters"
          className={`group/idx fixed right-3 top-1/2 z-[60] hidden -translate-y-1/2 transition-opacity duration-700 xl:block ${active === 0 ? "pointer-events-none opacity-0" : "opacity-100"}`}
        >
          <p className="micro mb-4 text-right tabular-nums text-[var(--fg)]">
            <span className="text-red">{String(active + 1).padStart(2, "0")}</span>
            <span className="text-mute"> / {String(chapters.length).padStart(2, "0")}</span>
          </p>
          <ol className="space-y-2.5">
            {chapters.map((c, i) => (
              <li key={c.id} className="flex items-center justify-end gap-3">
                <a
                  href={`#${c.id}`}
                  className={`micro rounded-full bg-[var(--bg)] px-2 py-0.5 opacity-0 transition-all duration-500 group-hover/idx:opacity-100 ${i === active ? "text-[var(--fg)]" : "text-mute"}`}
                >
                  {c.label}
                </a>
                <span className={`block h-px transition-all duration-500 ${i === active ? "w-8 bg-red" : "w-3 bg-[var(--fg-mute)]"}`} />
              </li>
            ))}
          </ol>
        </nav>
      ) : null}
    </>
  );
}
