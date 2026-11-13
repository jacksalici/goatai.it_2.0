import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/page-header";
import { ServiceArt, type ServiceArtName } from "@/components/service-art";
import { caseStudies } from "@/lib/case-studies";

export const metadata: Metadata = {
  title: "Case studies",
  description: "How GoatAI puts computer vision to work in manufacturing, transportation and retail.",
};

const arts: ServiceArtName[] = ["terrain", "loop", "roots"];

export default function CaseStudiesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Case studies"
        title={
          <>
            Out of the lab, <em>onto the floor.</em>
          </>
        }
        intro="Real problems, real constraints, real results. A few of the projects we've taken from first conversation to production."
      />
      <section className="shell grid gap-5 pb-17 sm:pb-24 md:grid-cols-3">
        {caseStudies.map((study, index) => (
          <article
            key={study.slug}
            className="group relative flex flex-col overflow-hidden rounded-3xl border bg-background transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-foreground/5"
          >
            <div className="p-6 sm:p-7.5">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                {study.sector}
                <ArrowUpRight className="size-5 -translate-x-1 translate-y-1 text-foreground opacity-0 transition duration-300 group-hover:translate-0 group-hover:opacity-100" />
              </div>
              <h2 className="mt-6 mb-3.5 font-serif text-[28px] leading-[1.15]">
                <Link href={`/case-studies/${study.slug}`} className="after:absolute after:inset-0">
                  {study.title}
                </Link>
              </h2>
              <p className="leading-normal text-muted-foreground">{study.summary}</p>
              <p className="mt-6 font-serif text-3xl">{study.metrics[0].value}</p>
              <p className="text-sm text-muted-foreground">{study.metrics[0].label}</p>
            </div>
            <ServiceArt
              name={arts[index % arts.length]}
              className="mt-auto w-full transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            />
          </article>
        ))}
      </section>
    </>
  );
}
