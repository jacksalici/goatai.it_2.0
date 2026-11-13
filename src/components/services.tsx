import { ArrowUpRight } from "lucide-react";

import { SectionHeading } from "@/components/section-heading";
import { ServiceArt } from "@/components/service-art";
import { services } from "@/lib/content";

export function Services() {
  return (
    <section id="services" className="shell py-17 sm:py-24">
      <SectionHeading
        eyebrow="How it works"
        title={
          <>
            Machine precision.
            <br />
            Human know-how.
          </>
        }
      >
        <p className="mb-1 text-[17px] leading-normal text-muted-foreground">
          Twenty years of research in computer vision and human behavior,
          <br className="max-md:hidden" /> put to work in transportation, manufacturing, retail and safety.
        </p>
      </SectionHeading>

      <div className="grid gap-5 md:grid-cols-3">
        {services.map((service, index) => (
          <article
            key={service.title}
            className="group flex flex-col overflow-hidden rounded-3xl border bg-background transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-foreground/5"
          >
            <div className="p-6 sm:p-7.5">
              <div className="flex items-center justify-between">
                <span className="font-serif text-lg text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <ArrowUpRight className="size-5 -translate-x-1 translate-y-1 opacity-0 transition duration-300 group-hover:translate-0 group-hover:opacity-100" />
              </div>
              <h3 className="mt-6 mb-3.5 text-xl font-semibold tracking-[-0.2px]">{service.title}</h3>
              <p className="max-w-78 leading-normal text-muted-foreground">{service.body}</p>
            </div>
            <ServiceArt
              name={service.art}
              className="mt-auto w-full transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            />
          </article>
        ))}
      </div>
    </section>
  );
}
