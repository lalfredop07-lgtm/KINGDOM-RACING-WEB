import type { Metadata } from "next";
import { Feature } from "@/components/pages/Feature";
import { PageHero } from "@/components/pages/PageHero";
import { MagazineTeaser } from "@/components/magazine/MagazineTeaser";
import { RacingLine } from "@/components/pages/RacingLine";
import { ministries } from "@/content/site";

export const metadata: Metadata = {
  title: "Ministry & Community",
  description: "Miles of Smiles, Kingdom Racing Ambassadors, and Fan Festivals — how Kingdom Racing serves people at the track.",
};

const detail: Record<string, string[]> = {
  "miles-of-smiles": [
    "Some of the people we meet are carrying heavy burdens. Through Miles of Smiles, we welcome youth groups, individuals, and families going through struggles and give them VIP experiences at racetrack events across the nation.",
    "A day behind the scenes at a race can become a reminder that they are seen, valued, and loved.",
  ],
  ambassadors: [
    "Kingdom Racing Ambassadors are trackside evangelists. They offer race spectators Bible tracts and a personal invitation to enter into a relationship with Jesus Christ.",
    "It’s simple, respectful, and personal — one conversation at a time, wherever fans gather.",
  ],
  "fan-festivals": [
    "Fan Festivals are praise and worship events held at legendary race circuits, including Indianapolis Motor Speedway and Texas Motor Speedway.",
    "They bring fans together to celebrate, worship, and hear the Good News in the places they already love.",
  ],
};

export default function MinistryPage() {
  return (
    <>
      <PageHero
        eyebrow="Ministry & community"
        title={
          <>
            Hope, <em>trackside.</em>
          </>
        }
        intro="Three ministries carry the message from the grandstands to the paddock. Each one exists to meet people where they are and point them toward lasting hope in Christ."
        image="/images/prayer-circle.jpg"
        alt="Illustrative image: families and race fans pray together near the grandstands."
        position="50% 40%"
      />
      <RacingLine />
      {ministries.map((m, i) => (
        <Feature
          key={m.id}
          id={m.id}
          index={m.index}
          eyebrow={m.kicker}
          chapter={m.name.split(" ")[0]}
          title={m.name}
          image={m.image}
          alt={m.alt}
          reverse={i % 2 === 1}
          theme={i === 1 ? "dark" : "light"}
        >
          {detail[m.id].map((p) => (
            <p key={p}>{p}</p>
          ))}
        </Feature>
      ))}
      <MagazineTeaser title="Want the stories in your mailbox?" />
    </>
  );
}
