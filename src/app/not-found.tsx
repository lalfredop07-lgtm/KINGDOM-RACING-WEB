import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section data-theme="dark" className="relative grid min-h-[100svh] place-items-center bg-ink px-[var(--gutter)] text-center text-paper">
      <div>
        <p className="eyebrow text-red">Off track</p>
        <h1 className="display t-1 mt-6">
          Wrong <em>turn.</em>
        </h1>
        <p className="t-lead mx-auto mt-6 max-w-md text-paper/70">The page you’re looking for isn’t here. Let’s get you back on the racing line.</p>
        <div className="mt-10 flex justify-center">
          <Button href="/">Back to home</Button>
        </div>
      </div>
    </section>
  );
}
