import { AskSection } from "@/components/ask-section";
import { Clients } from "@/components/clients";
import { Hero } from "@/components/hero";
import { Journal } from "@/components/journal";
import { Services } from "@/components/services";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  return (
    <main id="top">
      <SiteHeader />
      <Hero />
      <Clients />
      <Services />
      <Journal />
      <AskSection />
      <SiteFooter />
    </main>
  );
}
