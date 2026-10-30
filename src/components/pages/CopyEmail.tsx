"use client";

import { useState } from "react";
import { site } from "@/content/site";

/** Copies the team address, for visitors whose device has no email app set up. */
export function CopyEmail({ className = "" }: { className?: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setState("copied");
    } catch {
      setState("failed");
    }
    window.setTimeout(() => setState("idle"), 2400);
  };

  return (
    <button
      type="button"
      onClick={copy}
      className={`micro inline-flex min-h-11 items-center rounded-full border border-line px-4 transition-colors hover:border-red hover:text-red ${className}`}
    >
      <span aria-live="polite">{state === "copied" ? "Copied" : state === "failed" ? "Copy failed — select the address" : "Copy address"}</span>
    </button>
  );
}
