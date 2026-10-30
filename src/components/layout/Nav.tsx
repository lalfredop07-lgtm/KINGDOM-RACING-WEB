"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useLenis } from "@/components/motion/SmoothScroll";
import { Logo } from "@/components/ui/Logo";
import { gsap, MQ, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { onIntroDone } from "@/lib/intro";
import { nav, site } from "@/content/site";

export function Nav() {
  const header = useRef<HTMLElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const menuTl = useRef<gsap.core.Timeline | null>(null);
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState(0);
  const pathname = usePathname();
  const lenis = useLenis();

  // Entrance after the opening titles, then hide on scroll-down / reveal on scroll-up.
  useGSAP(
    () => {
      const el = header.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.set(el, { yPercent: -110 });
        const off = onIntroDone(() => gsap.to(el, { yPercent: 0, duration: 1.4, ease: "expo.out", delay: 0.9 }));
        let hidden = false;
        const st = ScrollTrigger.create({
          start: 0,
          end: "max",
          onUpdate: (self) => {
            const shouldHide = self.direction === 1 && self.scroll() > window.innerHeight * 0.6;
            if (shouldHide !== hidden) {
              hidden = shouldHide;
              gsap.to(el, { yPercent: hidden ? -110 : 0, duration: 0.8, ease: "expo.out", overwrite: "auto" });
            }
            el.classList.toggle("is-scrolled", self.scroll() > 40);
          },
        });
        return () => {
          off();
          st.kill();
        };
      });
      return () => mm.revert();
    },
    { scope: header },
  );

  // Full-screen menu: an iris opens from the menu button, links rise from their masks.
  useGSAP(
    () => {
      const el = menu.current;
      if (!el) return;
      const tl = gsap.timeline({ paused: true, defaults: { ease: "expo.inOut" } });
      tl.set(el, { visibility: "visible" })
        .fromTo(el, { clipPath: "circle(0% at calc(100% - 3.5rem) 2.5rem)" }, { clipPath: "circle(150% at calc(100% - 3.5rem) 2.5rem)", duration: 1.1 })
        .from("[data-menu-link]", { yPercent: 120, stagger: 0.05, duration: 1, ease: "expo.out" }, 0.35)
        .from("[data-menu-fade]", { autoAlpha: 0, y: 20, stagger: 0.06, duration: 0.8, ease: "expo.out" }, 0.55)
        .from("[data-menu-preview]", { clipPath: "inset(100% 0% 0% 0%)", duration: 1.2 }, 0.3);
      menuTl.current = tl;
      return () => tl.kill();
    },
    { scope: menu },
  );

  useEffect(() => {
    const tl = menuTl.current;
    if (!tl) return;
    if (open) {
      lenis?.stop();
      tl.timeScale(1).play();
      menu.current?.querySelector<HTMLElement>("a")?.focus({ preventScroll: true });
    } else {
      lenis?.start();
      tl.timeScale(1.6).reverse();
    }
  }, [open, lenis]);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header
        ref={header}
        className="group/nav fixed inset-x-0 top-0 z-[80] text-[var(--nav-fg)] transition-[background-color,color,backdrop-filter] duration-500 [&.is-scrolled]:bg-[color-mix(in_oklab,var(--nav-bg)_72%,transparent)] [&.is-scrolled]:backdrop-blur-md"
        data-nav-tone={open ? "light" : undefined}
        style={open ? { color: "#f4f1ec", background: "transparent", backdropFilter: "none" } : undefined}
      >
        <div className="gutter flex h-[var(--nav-h)] items-center justify-between gap-6">
          <Link href="/" aria-label="Kingdom Racing — home" className="nav-logo relative z-[2] flex min-h-11 w-[132px] items-center sm:w-[150px]">
            <Logo priority />
          </Link>

          <nav aria-label="Primary" className={`hidden transition-opacity duration-500 lg:block ${open ? "pointer-events-none opacity-0" : ""}`}>
            <ul className="flex items-center gap-6 xl:gap-8">
              {nav.filter((n) => n.href !== "/support").map((item) => {
                const active = pathname.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link href={item.href} className="group relative block overflow-hidden py-1 text-[0.8125rem] font-medium tracking-wide">
                      <span className="block transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-full">{item.label}</span>
                      <span aria-hidden className="absolute inset-x-0 top-full block py-1 text-red transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-full">
                        {item.label}
                      </span>
                      <span className={`absolute bottom-0 left-0 h-px bg-red transition-all duration-500 ${active ? "w-full" : "w-0"}`} />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="relative z-[2] flex items-center gap-3">
            <Link
              href="/support"
              aria-current={pathname.startsWith("/support") ? "page" : undefined}
              className={`inline-flex h-11 items-center rounded-full px-4 text-[0.8125rem] font-medium tracking-wide transition-colors duration-300 hover:bg-red hover:text-white sm:px-5 ${pathname.startsWith("/support") ? "bg-red text-white" : "bg-[var(--nav-fg)] text-[var(--nav-bg)]"} ${open ? "pointer-events-none opacity-0" : ""}`}
            >
              Support
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="site-menu"
              className={`group flex h-11 items-center gap-3 rounded-full border px-4 transition-colors duration-500 ${open ? "border-white/30 text-white" : "border-current/25"}`}
              data-cursor=""
            >
              <span className="micro hidden sm:block">{open ? "Close" : "Menu"}</span>
              <span className="relative block h-3 w-5" aria-hidden>
                <span className={`absolute left-0 block h-px w-5 bg-current transition-transform duration-500 ${open ? "top-1.5 rotate-45" : "top-0.5"}`} />
                <span className={`absolute left-0 block h-px bg-current transition-all duration-500 ${open ? "top-1.5 w-5 -rotate-45" : "top-2.5 w-3 group-hover:w-5"}`} />
              </span>
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            </button>
          </div>
        </div>
      </header>

      <div
        ref={menu}
        id="site-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        aria-hidden={!open}
        inert={!open}
        className="invisible fixed inset-0 z-[70] overflow-y-auto bg-ink text-paper"
        data-lenis-prevent
      >
        <div className="gutter grid min-h-full grid-cols-1 gap-10 pb-10 pt-[calc(var(--nav-h)+2rem)] lg:grid-cols-[1.25fr_1fr] lg:gap-16">
          <nav aria-label="Menu">
            <ul className="divide-y divide-white/10 border-y border-white/10">
              {[{ href: "/", label: "Home", blurb: "Speed. People. Purpose.", image: "/images/track-pack.jpg" }, ...nav].map((item, i) => {
                // The current page stays marked, so visitors always know where they are.
                const current = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                return (
                  <li key={item.href} className="overflow-hidden">
                    <Link
                      href={item.href}
                      aria-current={current ? "page" : undefined}
                      onPointerEnter={() => setPreview(i)}
                      onFocus={() => setPreview(i)}
                      className="group flex items-center justify-between gap-4 py-2.5 sm:items-baseline sm:gap-6 sm:py-3"
                    >
                      <span data-menu-link className="flex items-baseline gap-4 sm:gap-6">
                        <span className={`micro w-6 tabular-nums ${current ? "text-red" : "text-white/40"}`}>{String(i).padStart(2, "0")}</span>
                        <span
                          className={`display text-[clamp(2rem,min(5.4vw,6.4svh),4.75rem)] transition-[color,transform] duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-3 group-hover:italic group-hover:text-red ${current ? "italic text-red" : ""}`}
                        >
                          {item.label}
                        </span>
                      </span>
                      {/* Phones show the blurb too ("Racing — Events & the track"), so each destination is clear. */}
                      <span data-menu-link className="micro max-w-[9.5rem] text-right leading-relaxed text-white/45 max-[359px]:hidden sm:max-w-none">
                        {item.blurb}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="flex flex-col justify-between gap-10">
            <div data-menu-preview className="relative hidden aspect-[4/5] max-h-[56vh] overflow-hidden rounded-sm lg:block">
              {[{ image: "/images/track-pack.jpg" }, ...nav].map((item, i) => (
                <Image
                  key={i}
                  src={item.image}
                  alt=""
                  fill
                  sizes="40vw"
                  className={`object-cover transition-[opacity,transform] duration-1000 ease-[var(--ease-out-expo)] ${preview === i ? "scale-100 opacity-100" : "scale-110 opacity-0"}`}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent" />
              <p className="micro absolute bottom-4 left-4 text-white/70">Illustrative imagery</p>
            </div>
            <div className="grid grid-cols-2 gap-6 text-sm text-white/70">
              <div data-menu-fade>
                <p className="micro mb-3 text-red">Write to us</p>
                <a href={`mailto:${site.email}`} className="inline-flex min-h-11 items-center break-all hover:text-white">
                  {site.email}
                </a>
                <p className="leading-relaxed">
                  {site.address.line1}
                  <br />
                  {site.address.city}, {site.address.state} {site.address.zip}
                </p>
              </div>
              <div data-menu-fade>
                <p className="micro mb-3 text-red">Follow</p>
                <ul>
                  {site.socials.map((s) => (
                    <li key={s.label}>
                      <a href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center hover:text-white">
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <a
                data-menu-fade
                href={site.donateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="col-span-2 inline-flex items-center justify-between rounded-full bg-red px-6 py-4 text-sm font-medium text-white transition-colors hover:bg-paper hover:text-ink"
              >
                Donate now <span aria-hidden>↗</span>
                <span className="sr-only">(opens PayPal in a new tab)</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
