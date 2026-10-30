import Image from "next/image";

/** Native size of both logo files (keeps the mark's true proportions). */
export const LOGO = { width: 2026, height: 538 } as const;

/** Official Kingdom Racing logo. The light variant only recolors the wordmark for dark surfaces. */
export function Logo({
  className = "",
  tone = "auto",
  priority,
  sizes = "200px",
}: {
  className?: string;
  tone?: "auto" | "light" | "dark";
  priority?: boolean;
  /** Rendered width, so the browser fetches a file to match instead of the 2026px master. */
  sizes?: string;
}) {
  if (tone !== "auto") {
    return (
      <Image
        src={tone === "light" ? "/brand/kingdom-racing-logo-light.png" : "/brand/kingdom-racing-logo.png"}
        alt="Kingdom Racing"
        {...LOGO}
        sizes={sizes}
        priority={priority}
        className={`h-auto ${className}`}
      />
    );
  }
  return (
    <span className={`relative block ${className}`}>
      <Image src="/brand/kingdom-racing-logo.png" alt="Kingdom Racing" {...LOGO} sizes={sizes} priority={priority} className="logo-dark h-auto w-full" />
      <Image src="/brand/kingdom-racing-logo-light.png" alt="" aria-hidden {...LOGO} sizes={sizes} priority={priority} className="logo-light h-auto w-full" />
    </span>
  );
}
