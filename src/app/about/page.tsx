import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/page-header";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About",
  description: "GoatAI is a spin-off of the University of Modena and Reggio Emilia, building AI powered by humans.",
};

const stats = [
  { value: "20+", label: "years of computer vision research behind us" },
  { value: "1", label: "university spin-off, still working side by side with the lab" },
  { value: "4", label: "industries: transport, manufacturing, retail, safety" },
];

const values = [
  {
    title: "Humans first",
    body: "AI should make people safer and their work better. We design for the person in front of the camera as much as the one behind the dashboard.",
  },
  {
    title: "Proof before promises",
    body: "Every project starts with a feasibility study. If the data says no, we say no, before anyone has spent real money.",
  },
  {
    title: "Sure-footed",
    body: "Goats climb where others can't. We take on the messy, occluded, badly-lit problems and ship systems that keep working.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title={
          <>
            A research lab that <em>learned to ship.</em>
          </>
        }
        intro="GoatAI is a spin-off of the University of Modena and Reggio Emilia. We started as computer vision researchers; we became a company because our clients kept asking us to build the things we were writing papers about."
      />

      <section className="shell pb-17 sm:pb-24">
        <dl className="grid gap-px overflow-hidden rounded-3xl border bg-border sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-background p-6 sm:p-7.5">
              <dd className="font-serif text-[56px] leading-none tracking-[-1.5px] text-brand">{stat.value}</dd>
              <dt className="mt-3 max-w-60 text-sm text-muted-foreground">{stat.label}</dt>
            </div>
          ))}
        </dl>
      </section>

      <section className="shell grid gap-10 pb-17 sm:pb-24 md:grid-cols-2 md:gap-16">
        <h2 className="font-serif text-[42px] leading-[1.1] tracking-[-1.5px] sm:text-[clamp(42px,4.2vw,56px)]">
          Why a goat?
        </h2>
        <div className="space-y-5 text-[17px] leading-relaxed text-muted-foreground">
          <p>
            Goats are curious, stubborn and remarkably good at getting to places nobody else can reach. That's
            roughly how we approach AI: start from the hard problem, refuse to give up on it, and find a path
            that actually holds weight.
          </p>
          <p>
            We're a small herd of engineers and researchers based in Modena, working with companies across
            Italy and Europe. We still collaborate closely with the university, which keeps us honest and keeps
            our models current.
          </p>
        </div>
      </section>

      <section className="shell pb-17 sm:pb-24">
        <SectionHeading eyebrow="What we believe" title="How the herd works." />
        <div className="grid gap-5 md:grid-cols-3">
          {values.map((value) => (
            <div key={value.title} className="rounded-3xl border p-6 sm:p-7.5">
              <h3 className="mb-3.5 text-xl font-semibold tracking-[-0.2px]">{value.title}</h3>
              <p className="leading-normal text-muted-foreground">{value.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="shell pb-17 sm:pb-24">
        <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-foreground p-8 text-background sm:flex-row sm:items-center sm:p-12">
          <p className="max-w-130 font-serif text-[32px] leading-[1.15]">
            Meet the people behind the goat.
          </p>
          <div className="flex gap-3">
            <Button asChild size="lg" variant="secondary">
              <Link href="/team">Our team</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-background/40 bg-transparent text-background">
              <Link href="/contact">Get in touch</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
