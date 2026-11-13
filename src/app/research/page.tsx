import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";

import { PageHeader } from "@/components/page-header";
import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import { publications, researchAreas } from "@/lib/research";

export const metadata: Metadata = {
  title: "Research",
  description: "GoatAI's research in computer vision, human behavior understanding and synthetic data.",
};

export default function ResearchPage() {
  const sorted = [...publications].sort((a, b) => b.year - a.year);

  return (
    <>
      <PageHeader
        eyebrow="Research"
        title={
          <>
            Research is where <em>we come from.</em>
          </>
        }
        intro="GoatAI was born inside a computer vision lab at the University of Modena and Reggio Emilia. We still publish, still go to conferences, and still bring every new result straight into client work."
      />

      <section className="shell pb-17 sm:pb-24">
        <div className="grid gap-px overflow-hidden rounded-3xl border bg-border sm:grid-cols-2">
          {researchAreas.map((area, index) => (
            <div key={area.title} className="bg-background p-6 sm:p-8">
              <span className="font-serif text-lg text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
              <h2 className="mt-6 mb-2.5 text-xl font-semibold tracking-[-0.2px]">{area.title}</h2>
              <p className="max-w-100 leading-normal text-muted-foreground">{area.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="shell pb-17 sm:pb-24">
        <SectionHeading eyebrow="Publications & awards" title="On the record." />
        <ul className="border-t">
          {sorted.map((item) => {
            const Row = item.href ? "a" : "div";
            return (
              <li key={item.title} className="border-b">
                <Row
                  {...(item.href ? { href: item.href, target: "_blank", rel: "noreferrer" } : {})}
                  className="group grid grid-cols-[auto_1fr_auto] items-baseline gap-x-6 gap-y-2 py-6 sm:grid-cols-[80px_1fr_120px_auto]"
                >
                  <span className="font-serif text-lg text-muted-foreground">{item.year}</span>
                  <span className="font-serif text-[22px] leading-[1.25] sm:text-2xl">{item.title}</span>
                  <span className="col-start-2 text-sm text-muted-foreground sm:col-start-auto">{item.venue}</span>
                  <span className="col-start-3 row-start-1 flex items-center gap-2 sm:col-start-auto">
                    <Badge variant="secondary" className="px-2.5 py-1 text-[13px]">
                      {item.kind}
                    </Badge>
                    {item.href && <ArrowUpRight className="size-4 transition-colors group-hover:text-brand" />}
                  </span>
                </Row>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}
