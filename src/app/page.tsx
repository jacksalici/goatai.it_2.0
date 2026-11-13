import { AskSection } from "@/components/ask-section";
import { Clients } from "@/components/clients";
import { Hero } from "@/components/hero";
import { Journal } from "@/components/journal";
import { Services } from "@/components/services";

export default function Home() {
  return (
    <>
      <Hero />
      <Clients />
      <Services />
      <Journal />
      <AskSection />
    </>
  );
}
