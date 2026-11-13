import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import { caseStudies, getCaseStudy } from "@/lib/case-studies";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const study = getCaseStudy((await params).slug);
  return study ? { title: study.title, description: study.summary } : {};
}

export default async function CaseStudyPage({ params }: Props) {
  const study = getCaseStudy((await params).slug);
  if (!study) notFound();

  return (
    <article className="pb-17 sm:pb-24">
      <header className="shell pt-12 sm:pt-16">
        <Link
          href="/case-studies"
          className="group mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-brand"
        >
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" strokeWidth={1.33} />
          All case studies
        </Link>
        <p className="mb-4 text-[13px] font-medium tracking-[0.12em] text-muted-foreground uppercase">
          {study.sector} · {study.client}
        </p>
        <h1 className="max-w-225 font-serif text-[44px] leading-[1.05] tracking-[-1.5px] sm:text-[clamp(52px,6vw,76px)] sm:tracking-[-2px]">
          {study.title}
        </h1>
        <p className="mt-6 max-w-160 text-lg leading-normal text-muted-foreground">{study.summary}</p>
      </header>

      <dl className="shell mt-12 grid gap-px overflow-hidden rounded-3xl border bg-border sm:grid-cols-3">
        {study.metrics.map((metric) => (
          <div key={metric.label} className="bg-background p-6 sm:p-7.5">
            <dt className="text-sm text-muted-foreground">{metric.label}</dt>
            <dd className="mt-2 font-serif text-[44px] leading-none tracking-[-1px] text-brand">{metric.value}</dd>
          </div>
        ))}
      </dl>

      <div className="shell mt-16 grid gap-12 md:grid-cols-[1fr_2fr] md:gap-16">
        <h2 className="font-serif text-[32px] leading-[1.15]">The challenge</h2>
        <p className="text-[17px] leading-relaxed">{study.challenge}</p>

        <h2 className="font-serif text-[32px] leading-[1.15]">Our approach</h2>
        <ol className="space-y-5 text-[17px] leading-relaxed">
          {study.approach.map((step, index) => (
            <li key={step} className="flex gap-4">
              <span className="font-serif text-lg text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
              {step}
            </li>
          ))}
        </ol>

        <h2 className="font-serif text-[32px] leading-[1.15]">The outcome</h2>
        <p className="text-[17px] leading-relaxed">{study.outcome}</p>
      </div>

      <div className="shell mt-17 flex flex-col items-start justify-between gap-6 rounded-3xl bg-lavender/40 p-8 sm:mt-24 sm:flex-row sm:items-center sm:p-10">
        <p className="font-serif text-[28px] leading-[1.2]">
          Got a problem that looks like this one?
        </p>
        <Button asChild size="lg">
          <Link href="/contact">Talk to us</Link>
        </Button>
      </div>
    </article>
  );
}
