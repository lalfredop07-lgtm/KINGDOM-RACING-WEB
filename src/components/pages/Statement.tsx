import { ScrubWords } from "@/components/motion/ScrubWords";

export function Statement({ text, kicker, theme = "light" }: { text: string; kicker?: string; theme?: "light" | "dark" }) {
  return (
    <section data-theme={theme} className={`relative py-28 sm:py-40 ${theme === "dark" ? "bg-ink text-paper" : ""}`}>
      <div className="shell gutter text-center">
        {kicker ? <p className="eyebrow mb-10 text-red">{kicker}</p> : null}
        <ScrubWords className="display t-3 mx-auto max-w-[24ch] leading-[1.08]" text={text} />
      </div>
    </section>
  );
}
