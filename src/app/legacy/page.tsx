import type { Metadata } from "next";
import { RacingLegacy } from "@/components/home/RacingLegacy";
import { DriverTower } from "@/components/pages/DriverTower";
import { Feature } from "@/components/pages/Feature";
import { PageHero } from "@/components/pages/PageHero";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { leadership, ministryPartners } from "@/content/site";

export const metadata: Metadata = {
  title: "Legacy",
  description: "Founded by George & Maricarmen Del Canto, Kingdom Racing became the first faith-vision team to compete in the Indianapolis 500 in 2008.",
};

export default function LegacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Our legacy"
        title={
          <>
            Twenty years <em>at God Speed.</em>
          </>
        }
        intro="From the first green flag in 2007 to a historic Indianapolis 500 entry in 2008 and more than 70 major-series races since, Kingdom Racing has always raced for something bigger."
        image="/images/front-straight.jpg"
        alt="Illustrative image: a speedway front straight and pagoda tower at sunset."
      />
      <RacingLegacy />
      <Feature
        index="01"
        eyebrow="Founders"
        chapter="Founders"
        theme="dark"
        title={
          <>
            {leadership.founders.split(" & ")[0]} & <em>{leadership.founders.split(" & ")[1]}</em>
          </>
        }
        image="/images/founders.jpg"
        alt="George and Maricarmen Del Canto with team headsets at the pit wall, the grandstands behind them."
        position="52% 30%"
        caption={null}
      >
        <p>Kingdom Racing was founded by George and Maricarmen Del Canto with a single conviction: that motorsports could carry God’s Word to people who might never walk into a church.</p>
        <p>Their legacy continues through the volunteers, partners, and friends who serve alongside the team today.</p>
      </Feature>

      <DriverTower />

      <section data-theme="light" data-chapter="Leadership" className="relative border-t border-line py-24 sm:py-32">
        <div className="shell gutter grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow index="03">Leadership & partners</Eyebrow>
            <SplitReveal as="h2" className="display t-2 mt-6">
              Guided by <em>faithful</em> people.
            </SplitReveal>
          </div>
          <div className="grid gap-12 sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
            <div>
              <p className="micro mb-5 text-red">Advisory board</p>
              <ul className="space-y-4">
                {leadership.board.map((p) => (
                  <li key={p.name}>
                    <p className="font-serif text-2xl">{p.name}</p>
                    <p className="text-sm text-mute">{p.role}</p>
                  </li>
                ))}
              </ul>
              <p className="micro mb-5 mt-10 text-red">In memoriam</p>
              <ul className="space-y-4">
                {leadership.memoriam.map((p) => (
                  <li key={p.name}>
                    <p className="font-serif text-2xl">{p.name}</p>
                    <p className="text-sm text-mute">{p.role}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="micro mb-5 text-red">Ministry partners</p>
              <p className="mb-5 text-sm text-mute">We’ve served alongside national partners and ministries such as:</p>
              <ul className="space-y-3">
                {ministryPartners.map((p) => (
                  <li key={p} className="border-b border-line pb-3 font-serif text-xl">
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
