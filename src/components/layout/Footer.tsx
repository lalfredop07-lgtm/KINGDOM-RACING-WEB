"use client";

import Link from "next/link";
import { useRef } from "react";
import { Logo } from "@/components/ui/Logo";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { nav, site } from "@/content/site";

/** Footer: the practical information slides out from beneath the page as it comes into view. */
/** Footer links get full-size touch targets below the desktop layout. */
const link = "inline-flex items-center hover:text-white max-lg:min-h-11 max-lg:min-w-11";

export function Footer() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.fromTo(
          "[data-footer-inner]",
          { yPercent: -30 },
          { yPercent: 0, ease: "none", scrollTrigger: { trigger: "[data-footer-info]", start: "top bottom", end: "bottom bottom", scrub: true } },
        );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <footer ref={ref} data-theme="dark" className="relative overflow-hidden bg-ink text-paper">
      <div data-footer-info className="relative overflow-hidden">
        <div data-footer-inner className="gutter shell pt-20 sm:pt-24">
          <div className="grid gap-14 border-b border-white/10 pb-16 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Logo tone="light" className="w-[200px]" />
              <p className="mt-8 max-w-sm text-sm leading-relaxed text-white/55">{site.nonprofit}</p>
              <Link
                href="/support"
                className="mt-8 inline-flex items-center gap-3 rounded-full bg-red px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-paper hover:text-ink"
              >
                Support Kingdom Racing <span aria-hidden>→</span>
              </Link>
            </div>
            <nav aria-label="Footer" className="grid grid-cols-2 gap-10 text-sm sm:grid-cols-3 lg:col-span-7">
              <div>
                <p className="micro mb-5 text-red">Explore</p>
                <ul className="space-y-3 text-white/75 max-lg:space-y-0">
                  <li><Link className={link} href="/">Home</Link></li>
                  {nav.slice(0, 4).map((n) => (
                    <li key={n.href}><Link className={link} href={n.href}>{n.label}</Link></li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="micro mb-5 text-red">Connect</p>
                <ul className="space-y-3 text-white/75 max-lg:space-y-0">
                  {nav.slice(4).map((n) => (
                    <li key={n.href}><Link className={link} href={n.href}>{n.label}</Link></li>
                  ))}
                  <li><Link className={link} href="/support#contact">Contact</Link></li>
                  <li><Link className={link} href="/get-involved">Get Involved</Link></li>
                  <li><a className={link} href={site.donateUrl} target="_blank" rel="noopener noreferrer">Donate</a></li>
                </ul>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <p className="micro mb-5 text-red">Contact</p>
                <address className="space-y-3 not-italic text-white/75">
                  <a className={link} href={`mailto:${site.email}`}>{site.email}</a>
                  <p>
                    {site.legalName}
                    <br />
                    {site.address.line1}
                    <br />
                    {site.address.city}, {site.address.state} {site.address.zip}
                  </p>
                </address>
                <ul className="mt-6 flex gap-2">
                  {site.socials.map((s) => (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={s.label}
                        className="micro grid size-11 place-items-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-red hover:bg-red hover:text-white"
                      >
                        <span aria-hidden>{s.short}</span>
                        <span className="sr-only">{s.label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          </div>

          <div className="flex flex-col gap-3 pb-[max(2rem,env(safe-area-inset-bottom))] pt-8 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} {site.legalName}. All rights reserved.</p>
            <p>Photography and race footage on this site are AI-generated illustrations, not records of specific Kingdom Racing events.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
