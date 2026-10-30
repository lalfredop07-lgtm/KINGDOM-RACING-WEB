import { CommunityOutreach } from "@/components/home/CommunityOutreach";
import { CompetingWithPurpose } from "@/components/home/CompetingWithPurpose";
import { Events } from "@/components/home/Events";
import { GetInvolved } from "@/components/home/GetInvolved";
import { Hero } from "@/components/home/Hero";
import { MagazineShowcase } from "@/components/home/MagazineShowcase";
import { HigherPurpose } from "@/components/home/HigherPurpose";
import { MinistryCommunity } from "@/components/home/MinistryCommunity";
import { MoreThanRacing } from "@/components/home/MoreThanRacing";
import { RacingLegacy } from "@/components/home/RacingLegacy";
import { RealPeople } from "@/components/home/RealPeople";
import { StoriesMedia } from "@/components/home/StoriesMedia";

export default function HomePage() {
  return (
    <>
      <Hero />
      <MoreThanRacing />
      <CompetingWithPurpose />
      <RealPeople />
      <HigherPurpose />
      <MinistryCommunity />
      <RacingLegacy />
      <CommunityOutreach />
      <StoriesMedia />
      <MagazineShowcase />
      <Events limit={6} />
      <GetInvolved />
    </>
  );
}
