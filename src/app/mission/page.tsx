import type { Metadata } from "next";
import { RealPeople } from "@/components/home/RealPeople";
import { Feature } from "@/components/pages/Feature";
import { PageHero } from "@/components/pages/PageHero";
import { PillarsTriptych } from "@/components/pages/PillarsTriptych";
import { Statement } from "@/components/pages/Statement";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Mission",
  description: "Kingdom Racing’s mission is to deliver God’s Word through motorsports — a non-denominational Christian 501(c)(3) ministry.",
};

export default function MissionPage() {
  return (
    <>
      <PageHero
        eyebrow="Our mission"
        title={
          <>
            To deliver God’s Word <em>through motorsports.</em>
          </>
        }
        intro="Kingdom Racing is a unique, Christ-based ministry. For more than twenty years we’ve used the speed, scale, and community of racing as a platform to share the hope of Jesus Christ."
        image="/images/sharing-the-word.jpg"
        alt="Illustrative image: people read the Bible together beside the pit lane at sunset."
        position="50% 40%"
      />
      <Statement kicker="Faith · Spirit · Truth" text="Every race weekend gathers thousands of people in one place. We show up to meet them there — with encouragement, with Scripture, and with an open invitation." />
      <PillarsTriptych />
      <Feature
        index="01"
        eyebrow="Why motorsports"
        chapter="Why"
        title={
          <>
            A platform <em>built for</em> people.
          </>
        }
        image="/images/grandstands.jpg"
        alt="Illustrative image: packed grandstands above a banked oval."
      >
        <p>Racing draws families, fans, crews, and competitors from every walk of life. That makes the racetrack one of the most natural places to start a conversation about faith.</p>
        <p>We compete with excellence so that the message is carried with credibility — on pit road, in the paddock, and in the stands.</p>
      </Feature>
      <Feature
        index="02"
        eyebrow="Who we are"
        chapter="Who"
        reverse
        theme="dark"
        title={
          <>
            Open to all. <em>Run by volunteers.</em>
          </>
        }
        image="/images/prayer-circle.jpg"
        alt="Illustrative image: families pray together near the speedway."
      >
        <p>{site.nonprofit}</p>
        <p>Kingdom Racing is staffed 100% by volunteers — people who give their time so that others can encounter the love of Christ at the track.</p>
      </Feature>
      <Feature
        index="03"
        eyebrow="Where we’re headed"
        chapter="Vision"
        title={
          <>
            One million <em>people.</em>
          </>
        }
        image="/images/front-straight.jpg"
        alt="Illustrative image: race cars on a speedway straight at sunset."
      >
        <p>Our vision is to reach 1,000,000 men and women for Jesus Christ — one race weekend, one family, and one conversation at a time.</p>
      </Feature>
      <RealPeople />
    </>
  );
}
