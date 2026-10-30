import type { Metadata } from "next";
import { GiveSection } from "@/components/support/GiveSection";
import { SupportActions } from "@/components/support/SupportActions";
import { SupportHero } from "@/components/support/SupportHero";
import { WaysToSupport } from "@/components/support/WaysToSupport";

export const metadata: Metadata = {
  title: "Support",
  description:
    "Fuel the mission. Donate to Kingdom Racing Foundation, a non-denominational Christian 501(c)(3), through PayPal, contact the team in Galveston, Texas, or find other ways to get involved.",
};

export default function SupportPage() {
  return (
    <>
      <SupportHero />
      <SupportActions />
      <GiveSection />
      <WaysToSupport />
    </>
  );
}
