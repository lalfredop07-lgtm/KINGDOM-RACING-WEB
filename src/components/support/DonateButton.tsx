import type { ReactNode } from "react";
import { Magnetic } from "@/components/motion/Magnetic";
import { Arrow } from "@/components/ui/Button";
import { site } from "@/content/site";

/**
 * The primary giving action: a large red pill that always opens Kingdom Racing's official
 * PayPal fundraiser (site.donateUrl). Full width on phones so it is the easiest target on screen;
 * `full` keeps it full width at every size (inside the giving card).
 */
export function DonateButton({ children = "Donate Now", full = false }: { children?: ReactNode; full?: boolean }) {
  return (
    <Magnetic strength={0.18} className={full ? "w-full" : "w-full sm:w-auto"}>
      <a
        href={site.donateUrl}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="Give"
        className={`group relative flex min-h-[3.75rem] w-full items-center justify-between gap-6 overflow-hidden rounded-full bg-red py-2.5 pl-7 pr-2.5 text-base font-medium tracking-wide text-white shadow-[0_18px_50px_-18px_rgba(212,20,42,0.75)] transition-colors duration-500 hover:text-ink sm:pl-8 ${full ? "" : "sm:inline-flex"}`}
      >
        <span className="absolute inset-0 -translate-x-[101%] bg-paper transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-0" />
        <span className="relative">
          {children}
          <span className="sr-only"> (opens Kingdom Racing’s PayPal fundraiser in a new tab)</span>
        </span>
        <span className="relative grid size-11 shrink-0 place-items-center rounded-full bg-white/15 transition-colors duration-500 group-hover:bg-red group-hover:text-white">
          <Arrow className="size-5 -rotate-45 transition-transform duration-500 group-hover:rotate-0" />
        </span>
      </a>
    </Magnetic>
  );
}
