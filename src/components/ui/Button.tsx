import Link from "next/link";
import type { ReactNode } from "react";
import { Magnetic } from "@/components/motion/Magnetic";

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M4 12h15M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  );
}

type Props = {
  href: string;
  children: ReactNode;
  variant?: "pill" | "solid" | "circle";
  external?: boolean;
  className?: string;
};

/**
 * Pill: outlined, fills from the left on hover. Solid: red, for the primary give/support action.
 * Circle: a ring with an arrow followed by a label, as in the approved reference.
 */
export function Button({ href, children, variant = "pill", external, className = "" }: Props) {
  const ext = external || href.startsWith("http");
  const linkProps = ext ? { target: "_blank", rel: "noopener noreferrer" } : {};

  if (variant === "circle") {
    return (
      <Link href={href} {...linkProps} className={`group inline-flex items-center gap-4 ${className}`} data-cursor="Go">
        <Magnetic>
          <span className="relative grid size-14 place-items-center overflow-hidden rounded-full border border-current/40 transition-colors duration-500 group-hover:border-red">
            <span className="absolute inset-0 origin-bottom scale-y-0 rounded-full bg-red transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-y-100" />
            <Arrow className="relative size-5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:text-white" />
          </span>
        </Magnetic>
        <span className="text-sm font-medium tracking-wide">{children}</span>
      </Link>
    );
  }

  const base =
    "group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-6 py-3.5 text-[0.8125rem] font-medium tracking-wide transition-colors duration-500";
  const look =
    variant === "solid"
      ? "bg-red text-white hover:text-ink"
      : "border border-current/35 hover:border-[var(--fg)] hover:text-[var(--bg)]";
  const fill = variant === "solid" ? "bg-paper" : "bg-[var(--fg)]";

  return (
    <Magnetic>
      <Link href={href} {...linkProps} className={`${base} ${look} ${className}`}>
        <span className={`absolute inset-0 -translate-x-[101%] ${fill} transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-0`} />
        <span className="relative">{children}</span>
        <Arrow className="relative size-4 transition-transform duration-500 group-hover:translate-x-1" />
      </Link>
    </Magnetic>
  );
}
