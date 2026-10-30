import type { ReactNode } from "react";
import { RevealImage } from "@/components/motion/RevealImage";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Eyebrow } from "@/components/ui/Eyebrow";

type Props = {
  id?: string;
  eyebrow: string;
  index?: string;
  title: ReactNode;
  children: ReactNode;
  image: string;
  alt: string;
  reverse?: boolean;
  theme?: "light" | "dark";
  chapter?: string;
  position?: string;
  /** Label on the photo; real photographs pass null. */
  caption?: string | null;
};

/** Editorial row: photograph and text trade sides down the page, as in the approved reference. */
export function Feature({ id, eyebrow, index, title, children, image, alt, reverse, theme = "light", chapter, position, caption = "Illustrative" }: Props) {
  return (
    <section
      id={id}
      data-theme={theme}
      data-chapter={chapter}
      className={`relative scroll-mt-20 py-20 sm:py-28 ${theme === "dark" ? "bg-ink text-paper" : ""}`}
    >
      <div className="shell gutter grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
        <div className={`lg:col-span-7 ${reverse ? "lg:order-2" : ""}`}>
          <RevealImage src={image} alt={alt} from={reverse ? "left" : "right"} className="aspect-[4/5] w-full sm:aspect-[16/11]" position={position} sizes="(min-width: 1024px) 58vw, 100vw" caption={caption ?? undefined} />
        </div>
        <div className={`lg:col-span-4 ${reverse ? "lg:col-start-1" : "lg:col-start-9"}`}>
          <Eyebrow index={index}>{eyebrow}</Eyebrow>
          <SplitReveal as="h2" className="display t-2 mt-6">
            {title}
          </SplitReveal>
          <div className={`mt-6 space-y-5 text-[1.0625rem] leading-relaxed ${theme === "dark" ? "text-paper/70" : "text-mute"}`}>{children}</div>
        </div>
      </div>
    </section>
  );
}
