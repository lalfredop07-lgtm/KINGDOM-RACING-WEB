import type { Metadata } from "next";
import { GetInvolved } from "@/components/home/GetInvolved";
import { Feature } from "@/components/pages/Feature";
import { MagazineTeaser } from "@/components/magazine/MagazineTeaser";
import { PageHero } from "@/components/pages/PageHero";
import { PitBoards } from "@/components/pages/PitBoards";
import { Button } from "@/components/ui/Button";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Get Involved",
  description: "Pray, volunteer, partner, or give to support Kingdom Racing’s mission of delivering God’s Word through motorsports.",
};

export default function GetInvolvedPage() {
  return (
    <>
      <PageHero
        eyebrow="Get involved"
        title={
          <>
            Be part of <em>the mission.</em>
          </>
        }
        intro="Whether through prayer, volunteering, partnership, or giving, you can help carry the hope of Jesus Christ to every circuit, city, and generation."
        image="/images/chase-sunset.jpg"
        alt="Illustrative image: an open-wheel race car heads toward the setting sun."
      />
      <GetInvolved withIris={false} />
      <PitBoards />
      <Feature
        id="give"
        index="04"
        eyebrow="Give"
        chapter="Give"
        title={
          <>
            Fuel the <em>mission.</em>
          </>
        }
        image="/images/front-straight.jpg"
        alt="Illustrative image: a speedway front straight at sunset."
      >
        <p>{site.nonprofit} Your gift supports Miles of Smiles, KR Ambassadors, and Fan Festivals as we work toward reaching one million people for Jesus Christ.</p>
        <p>
          Give securely online through PayPal, or mail a gift to {site.legalName}, {site.address.line1}, {site.address.city}, {site.address.state} {site.address.zip}.
        </p>
        <div className="flex flex-wrap gap-4 pt-4">
          <Button href={site.donateUrl} variant="solid" external>
            Donate with PayPal
          </Button>
          <Button href="/support?topic=partner#contact">Partnership inquiries</Button>
        </div>
      </Feature>
      <MagazineTeaser title="Read it. Share it. It’s free." text="Pass GOD SPEED Magazine along to a friend, a church group, or a race fan. Every subscription is free — for you and for them." />
    </>
  );
}
