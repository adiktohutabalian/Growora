import HeroSection from "@/components/home/HeroSection";
import HowItWorks from "@/components/home/HowItWorks";
import FeaturedSkills from "@/components/home/FeaturedSkills";
import StatsSection from "@/components/home/StatsSection";
import FutureFeatures from "@/components/home/FutureFeatures";
import CTASection from "@/components/home/CTASection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <HowItWorks />
      <FeaturedSkills />
      <StatsSection />
      <FutureFeatures />
      <CTASection />
    </>
  );
}
