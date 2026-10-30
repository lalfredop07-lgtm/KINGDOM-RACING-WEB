import type { Metadata } from "next";
import { BookFeature } from "@/components/magazine/BookFeature";
import { ChannelBand } from "@/components/magazine/ChannelBand";
import { MagazineHero } from "@/components/magazine/MagazineHero";
import { Subscribe } from "@/components/magazine/Subscribe";
import { Statement } from "@/components/pages/Statement";
import { magazine } from "@/content/site";

export const metadata: Metadata = {
  title: "GOD SPEED Magazine",
  description: `${magazine.launch} ${magazine.free} Subscribe for free and discover the book God Speed.`,
  openGraph: { images: [{ url: magazine.editions[0].cover, width: magazine.editions[0].width, height: magazine.editions[0].height }] },
};

export default function MagazinePage() {
  return (
    <>
      <MagazineHero />
      <Statement kicker="Inside every issue" text={magazine.eachIssue} />
      <Subscribe />
      <BookFeature />
      <ChannelBand />
    </>
  );
}
