import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { ValueProps } from "@/components/sections/ValueProps";
import { IndustrySolutions } from "@/components/sections/IndustrySolutions";
import { Technologies } from "@/components/sections/Technologies";
import { CasesPreview } from "@/components/sections/CasesPreview";
import { StatsBar } from "@/components/sections/StatsBar";
import { LeadMagnet } from "@/components/sections/LeadMagnet";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <ValueProps />
      <IndustrySolutions />
      <Technologies />
      <CasesPreview />
      <StatsBar />
      <LeadMagnet />
    </>
  );
}
