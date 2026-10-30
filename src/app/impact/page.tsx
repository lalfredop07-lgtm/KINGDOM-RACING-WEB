import type { Metadata } from "next";
import { HigherPurpose } from "@/components/home/HigherPurpose";
import { RealPeople } from "@/components/home/RealPeople";
import { Feature } from "@/components/pages/Feature";
import { PageHero } from "@/components/pages/PageHero";
import { Statement } from "@/components/pages/Statement";

export const metadata: Metadata = {
  title: "Impact",
  description: "More than 20 years of ministry, 70+ major-series races, and a vision to reach 1,000,000 people for Jesus Christ.",
};

export default function ImpactPage() {
  return (
    <>
      <PageHero
        eyebrow="Our impact"
        title={
          <>
            Real people. <em>Real change.</em>
          </>
        }
        intro="Impact isn’t measured only in laps or results. It’s measured in families encouraged, conversations started, and lives pointed toward Jesus Christ."
        image="/images/paddock-community.jpg"
        alt="Illustrative image: a team member talks with children and families in a racing paddock."
        position="45% 40%"
      />
      <RealPeople />
      <Statement theme="dark" text="Behind every number is a name — a child at their first race, a family in a hard season, a fan who heard the Good News between practice sessions." />
      <HigherPurpose />
      <Feature
        index="01"
        eyebrow="How it happens"
        chapter="How"
        title={
          <>
            Faithful, <em>season after season.</em>
          </>
        }
        image="/images/oval-crowd.jpg"
        alt="Illustrative image: crowds watch open-wheel cars sweep through an oval turn."
      >
        <p>Impact grows through consistency: showing up at race weekends year after year, building trust with the racing community, and serving people with no strings attached.</p>
        <p>Every gift, every volunteer hour, and every prayer helps carry that work forward.</p>
      </Feature>
    </>
  );
}
