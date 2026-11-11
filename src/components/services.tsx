import { ArrowUpRight } from "lucide-react";

import { SectionHeading } from "@/components/section-heading";
import { services } from "@/lib/content";

export function Services() {
  return (
    <section id="services" className="shell py-17 sm:py-24">
      <SectionHeading
        eyebrow="What we do"
        title={
          <>
            Machine precision.
            <br />
            Human know-how.
          </>
        }
      >
        <p className="mb-1 text-[17px] leading-normal text-muted-foreground">
          Every model is shaped by the experts who use it.
          <br className="max-md:hidden" /> No black boxes, no noise — just tools that earn trust.
        </p>
      </SectionHeading>

      <div className="grid gap-5 md:grid-cols-3">
        {services.map((service, index) => (
          <article
            key={service.title}
            style={{ "--accent": `var(--${service.accent})` } as React.CSSProperties}
            className="group relative flex min-h-74 flex-col justify-between overflow-hidden rounded-3xl border bg-card/90 p-6 transition duration-200 hover:-translate-y-2 hover:border-(--accent)/50 hover:shadow-2xl hover:shadow-foreground/10 sm:min-h-68 sm:p-7.5 md:min-h-82"
          >
            {/* Accent bar and ring decorations */}
            <span className="absolute inset-y-0 left-0 w-1.25 origin-bottom scale-y-0 bg-(--accent) transition-transform duration-250 group-hover:scale-y-100" />
            <span className="absolute -top-20.5 -right-18 size-37.5 rounded-full border-30 border-(--accent)/30 transition-transform duration-300 group-hover:scale-114" />

            <div className="relative flex items-start justify-between">
              <span className="grid size-13.5 place-items-center rounded-2xl bg-(--accent)">
                <service.icon className="size-6" strokeWidth={1.6} />
              </span>
              <span className="font-serif text-lg text-subtle-foreground">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            <div className="relative">
              <h3 className="mb-3.5 text-xl font-semibold tracking-[-0.2px]">{service.title}</h3>
              <p className="max-w-78 leading-normal text-muted-foreground">{service.body}</p>
            </div>

            <ArrowUpRight className="absolute right-7 bottom-7 size-5 -translate-x-2 translate-y-2 opacity-0 transition duration-200 group-hover:translate-0 group-hover:opacity-100" />
          </article>
        ))}
      </div>
    </section>
  );
}
