import type { Metadata } from "next";
import { CompetingWithPurpose } from "@/components/home/CompetingWithPurpose";
import { Events } from "@/components/home/Events";
import { Feature } from "@/components/pages/Feature";
import { PageHero } from "@/components/pages/PageHero";
import { StartLights } from "@/components/pages/StartLights";

export const metadata: Metadata = {
  title: "Racing & Events",
  description: "Kingdom Racing’s 2026 ministry event schedule and racing history in IndyCar, sports cars, sprint cars, and other motorsports.",
};

export default function RacingPage() {
  return (
    <>
      <PageHero
        eyebrow="Racing & events"
        title={
          <>
            Excellence <em>on track.</em>
          </>
        }
        intro="Since 2007, Kingdom Racing has competed in IndyCar, sports cars, sprint cars, and other motorsports — and served at race weekends across the country."
        image="/images/track-pack.jpg"
        alt="Illustrative image: a pack of open-wheel race cars on a speedway at sunset."
        position="60% 50%"
      />
      <CompetingWithPurpose />
      <Feature
        index="03"
        eyebrow="Race weekends"
        chapter="Weekends"
        title={
          <>
            More than <em>a race weekend.</em>
          </>
        }
        image="/images/oval-crowd.jpg"
        alt="Illustrative image: race fans in the grandstands above a banked oval."
      >
        <p>At each event on our ministry schedule, volunteers serve as Kingdom Racing Ambassadors, host Miles of Smiles guests, and — at select circuits — gather fans for praise and worship at Fan Festivals.</p>
        <p>Want to serve at an upcoming event? Reach out and we’ll connect you with the team.</p>
      </Feature>
      <StartLights />
      <Events />
    </>
  );
}
