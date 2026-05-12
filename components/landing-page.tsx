import { BusinessAssistant } from "@/components/business-assistant";
import { CollectionSection } from "@/components/collection-section";
import { ContactFooter } from "@/components/contact-footer";
import { HeroSection } from "@/components/hero-section";
import { Navbar } from "@/components/navbar";

export function LandingPage() {
  return (
    <main className="min-h-screen bg-ink text-white">
      <Navbar />
      <HeroSection />
      <CollectionSection />
      <ContactFooter />
      <BusinessAssistant />
    </main>
  );
}
