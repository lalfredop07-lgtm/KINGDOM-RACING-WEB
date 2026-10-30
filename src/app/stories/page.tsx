import type { Metadata } from "next";
import { StoriesMedia } from "@/components/home/StoriesMedia";
import { Feature } from "@/components/pages/Feature";
import { MagazineTeaser } from "@/components/magazine/MagazineTeaser";
import { PageHero } from "@/components/pages/PageHero";
import { Button } from "@/components/ui/Button";
import { channel } from "@/content/site";

export const metadata: Metadata = {
  title: "Stories & Media",
  description: "Season reviews, outreach updates, and the GOD SPEED Channel from Kingdom Racing.",
};

export default function StoriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Stories & media"
        title={
          <>
            Life beyond the <em>finish line.</em>
          </>
        }
        intro="Season reviews, outreach updates, and stories of hope from the paddock, the grandstands, and the communities we serve."
        image="/images/pit-lane.jpg"
        alt="Illustrative image: open-wheel race cars in pit lane at sunset."
      />
      <StoriesMedia />
      <Feature
        index="01"
        eyebrow="Watch"
        chapter="Channel"
        theme="dark"
        title={
          <>
            The GOD SPEED <em>Channel.</em>
          </>
        }
        image="/images/car-detail.jpg"
        alt="Illustrative image: an open-wheel race car at speed."
      >
        <p>{channel.text}</p>
        <div className="pt-4">
          <Button href={channel.url} external>
            Watch on YouTube
          </Button>
        </div>
      </Feature>
      <MagazineTeaser theme="light" index="02" />
    </>
  );
}
