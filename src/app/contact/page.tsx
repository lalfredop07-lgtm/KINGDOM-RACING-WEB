import { permanentRedirect } from "next/navigation";

/** Contact now lives on the Support page; old links (including ?topic=) land on its form. */
export default async function ContactPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const topic = (await searchParams).topic;
  const query = typeof topic === "string" ? `?topic=${encodeURIComponent(topic)}` : "";
  permanentRedirect(`/support${query}#contact`);
}
