"use client";

import Image from "next/image";
import { useRef } from "react";
import { useLenis } from "@/components/motion/SmoothScroll";
import { ContactForm } from "@/components/pages/ContactForm";
import { CopyEmail } from "@/components/pages/CopyEmail";
import { DonateButton } from "@/components/support/DonateButton";
import { site } from "@/content/site";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { onIntroDone } from "@/lib/intro";

/**
 * Give & connect — "Side by side": the contact card (left) and the PayPal card (right) rise
 * together over the opener's lower edge and settle at the same height, so neither is below the
 * other. On phones the giving card comes first. The entrance is short and starts with the
 * opener, so nothing waits on it.
 */
export function SupportActions() {
  const ref = useRef<HTMLElement>(null);
  const lenis = useLenis();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-action-card]");
        gsap.set(cards, { autoAlpha: 1 });
        const tl = gsap.timeline({ paused: true, defaults: { ease: "expo.out" } });
        tl.from(cards, { y: 70, clipPath: "inset(14% 0% 0% 0% round 6px)", duration: 1.15, stagger: 0.08 }, 0.25).from(
          "[data-action-item]",
          { y: 18, autoAlpha: 0, duration: 0.8, stagger: 0.035 },
          0.45,
        );
        const off = onIntroDone(() => tl.play());
        return () => off();
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  const askAboutGiving = () => {
    window.dispatchEvent(new CustomEvent("contact-topic", { detail: "giving" }));
    const target = document.getElementById("contact");
    const field = document.getElementById("name");
    const focusForm = () => field?.focus({ preventScroll: true });
    if (!target || !field) return;
    // Side by side on large screens: the form is already in view, so only move focus there.
    const r = field.getBoundingClientRect();
    if (r.top > 0 && r.bottom < window.innerHeight) return focusForm();
    if (lenis) lenis.scrollTo(target, { offset: -24, duration: 1.2, onComplete: focusForm });
    else {
      target.scrollIntoView({ behavior: "smooth" });
      focusForm();
    }
  };

  return (
    <section ref={ref} id="give-connect" data-theme="light" data-chapter="Give & connect" className="relative z-10 pb-20 sm:pb-28">
      <div className="shell gutter -mt-16 grid gap-5 sm:-mt-20 lg:-mt-32 lg:grid-cols-2 lg:gap-6">
        {/* Giving — first in the reading order and on phones, on the right on large screens. */}
        <article
          id="give"
          data-action-card
          data-reveal
          aria-labelledby="give-title"
          className="relative flex scroll-mt-24 flex-col overflow-hidden rounded-[6px] border border-white/10 bg-ink text-paper shadow-[0_40px_90px_-40px_rgba(13,13,14,0.55)] lg:order-2"
        >
          {/* The red edge marks the card where it overlaps the dark opener. */}
          <span aria-hidden className="absolute inset-x-0 top-0 z-[1] h-[3px] bg-red" />
          <div className="relative p-7 sm:p-10 lg:p-12">
            <p data-action-item className="micro flex items-center gap-3 text-red">
              <span className="h-px w-8 bg-red" aria-hidden />
              Donate with PayPal
            </p>
            <h2 data-action-item id="give-title" className="display mt-5 text-[clamp(2.6rem,4.2vw,4.25rem)] leading-[0.92]">
              Support Our <em>Mission.</em>
            </h2>
            <p data-action-item className="mt-5 max-w-md leading-relaxed text-paper/75">
              Every gift helps carry the hope of Jesus Christ to drivers, crews, fans, and families at racetracks across the nation — through Miles of Smiles, KR Ambassadors, and
              Fan Festivals.
            </p>
            <div data-action-item className="mt-8">
              <DonateButton full>Donate with PayPal</DonateButton>
            </div>
            <p data-action-item className="mt-4 flex items-start gap-2.5 text-sm leading-relaxed text-paper/60">
              <svg viewBox="0 0 24 24" className="mt-0.5 size-4 shrink-0 text-paper/70" fill="none" aria-hidden="true">
                <rect x="5" y="10.5" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
                <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              Donations are processed securely by PayPal on Kingdom Racing’s official fundraiser page. No payment details are entered on this website.
            </p>

            <dl data-action-item className="mt-8 grid gap-3.5 border-t border-white/12 pt-6 text-sm">
              <div className="flex justify-between gap-6">
                <dt className="text-paper/50">Organization</dt>
                <dd className="text-right">{site.legalName}</dd>
              </div>
              <div className="flex justify-between gap-6">
                <dt className="text-paper/50">Status</dt>
                <dd className="text-right">
                  Non-denominational Christian <span className="whitespace-nowrap">501(c)(3)</span>
                </dd>
              </div>
              <div className="flex justify-between gap-6">
                <dt className="text-paper/50">Team</dt>
                <dd className="text-right">100% volunteer-staffed</dd>
              </div>
              <div className="flex justify-between gap-6">
                <dt className="text-paper/50">Give by mail</dt>
                <dd className="text-right">
                  {site.address.line1}, {site.address.city}, {site.address.state} {site.address.zip}
                </dd>
              </div>
            </dl>
            <p data-action-item className="mt-6 text-sm text-paper/60">
              Questions about giving?{" "}
              <button type="button" onClick={askAboutGiving} className="inline-flex min-h-11 items-center text-paper underline decoration-white/30 underline-offset-4 transition-colors hover:text-red">
                Ask the team
              </button>
            </p>
          </div>

          {/* Fills the remaining height so both cards end together on large screens. */}
          <div className="relative mt-auto hidden min-h-48 flex-1 lg:block">
            <Image src="/images/front-straight.jpg" alt="" fill sizes="50vw" className="object-cover opacity-55" />
            <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/30 to-ink/10" />
            <p className="micro absolute bottom-5 right-6 text-paper/45">Illustrative</p>
          </div>
        </article>

        {/* Contact — on the left on large screens. */}
        <article
          id="contact"
          data-action-card
          data-reveal
          aria-labelledby="contact-title"
          // surface-light keeps the card's own palette even while the canvas is still dark.
          style={{ background: "#fbfaf7" }}
          className="surface-light scroll-mt-24 rounded-[6px] border border-line p-7 shadow-[0_40px_90px_-50px_rgba(13,13,14,0.35)] transition-colors duration-500 hover:border-[rgba(13,13,14,0.24)] sm:p-10 lg:order-1 lg:p-12"
        >
          <p data-action-item className="micro flex items-center gap-3 text-red">
            <span className="h-px w-8 bg-red" aria-hidden />
            Contact
          </p>
          <h2 data-action-item id="contact-title" className="display mt-5 text-[clamp(2.6rem,4.2vw,4.25rem)] leading-[0.92]">
            Let’s <em>Connect.</em>
          </h2>
          <p data-action-item className="mt-5 max-w-md leading-relaxed text-mute">
            Have a question, want to get involved, or interested in supporting Kingdom Racing? We’d love to hear from you.
          </p>
          <div data-action-item className="mt-6">
            <ContactForm />
          </div>

          <div data-action-item className="mt-10 grid gap-5 border-t border-line pt-6 text-sm sm:grid-cols-[1fr_auto] sm:items-center">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="micro text-mute">Email</span>
              <a href={`mailto:${site.email}`} className="inline-flex min-h-11 items-center text-base underline decoration-line underline-offset-4 hover:text-red">
                {site.email}
              </a>
              <CopyEmail />
            </div>
            <ul className="flex flex-wrap gap-2" aria-label="Kingdom Racing on social media">
              {[...site.socials, { label: "YouTube", short: "YT", href: site.channelUrl }].map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={s.label}
                    className="micro grid size-11 place-items-center rounded-full border border-line transition-colors hover:border-red hover:bg-red hover:text-white"
                  >
                    <span aria-hidden>{s.short}</span>
                    <span className="sr-only">{s.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </article>
      </div>
    </section>
  );
}
