import type { Metadata } from "next";
import Image from "next/image";

import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { contact } from "@/lib/content";
import { team } from "@/lib/team";

export const metadata: Metadata = {
  title: "Team",
  description: "The researchers and engineers behind GoatAI.",
};

export default function TeamPage() {
  return (
    <>
      <PageHeader
        eyebrow="Team"
        title={
          <>
            A small herd, <em>big brains.</em>
          </>
        }
        intro="Researchers, engineers and a few people who make sure the researchers and engineers talk to clients. When you work with GoatAI, you work directly with the people who build it."
      />

      <section className="shell grid gap-x-6 gap-y-12 pb-17 sm:grid-cols-2 sm:pb-24 md:grid-cols-3">
        {team.map((member, index) => (
          <article key={`${member.role}-${index}`}>
            <div className="relative aspect-4/5 overflow-hidden rounded-[20px] bg-lavender">
              {member.image ? (
                <Image src={member.image} alt={member.name} fill sizes="(min-width: 900px) 400px, 100vw" className="object-cover" />
              ) : (
                <span
                  aria-hidden="true"
                  className="absolute inset-0 m-auto size-1/2 bg-foreground/15 mask-[url(/pictogram.svg)] mask-contain mask-center mask-no-repeat"
                />
              )}
            </div>
            <h2 className="mt-4.5 font-serif text-[26px] leading-[1.2]">{member.name}</h2>
            <p className="mt-1 text-sm font-medium text-brand">{member.role}</p>
            <p className="mt-2.5 leading-normal text-muted-foreground">{member.bio}</p>
          </article>
        ))}
      </section>

      <section className="shell pb-17 sm:pb-24">
        <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-lavender/40 p-8 sm:flex-row sm:items-center sm:p-12">
          <div>
            <p className="font-serif text-[32px] leading-[1.15]">Join the herd.</p>
            <p className="mt-2 max-w-130 text-muted-foreground">
              We're always happy to hear from people who love computer vision and want to see it out in the
              world. Send us a few lines and your CV.
            </p>
          </div>
          <Button asChild size="lg">
            <a href={`mailto:${contact.email}?subject=Joining%20the%20herd`}>Write to us</a>
          </Button>
        </div>
      </section>
    </>
  );
}
