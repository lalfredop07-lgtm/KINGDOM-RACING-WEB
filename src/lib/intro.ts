"use client";

/** Coordinates the first-load preloader with the hero entrance. */
const EVENT = "kr:intro-done";

declare global {
  interface Window {
    __krIntroDone?: boolean;
  }
}

export function markIntroDone() {
  window.__krIntroDone = true;
  window.dispatchEvent(new Event(EVENT));
}

export function onIntroDone(cb: () => void) {
  if (window.__krIntroDone) {
    cb();
    return () => {};
  }
  window.addEventListener(EVENT, cb, { once: true });
  return () => window.removeEventListener(EVENT, cb);
}
