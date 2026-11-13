import { ArrowRight } from "lucide-react";
import Image from "next/image";

import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import { posts } from "@/lib/content";

function PlaceholderArt() {
  return (
    <div aria-hidden="true" className="absolute inset-0">
      <span className="absolute -bottom-18.5 -left-[15%] h-32.5 w-[130%] rotate-3 rounded-t-[50%] bg-foreground/15" />
      <span className="absolute -bottom-25 left-[5%] h-32.5 w-[130%] -rotate-5 rounded-t-[50%] bg-foreground/30" />
      <span className="absolute top-9 right-9 size-10.5 rounded-full border border-background/65" />
    </div>
  );
}

export function Journal() {
  return (
    <section id="journal" className="shell py-17 sm:py-24">
      <SectionHeading eyebrow="Field notes" title="From the pasture.">
        <a href="#journal" className="group inline-flex items-center gap-2 font-medium">
          All notes
          <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" strokeWidth={1.33} />
        </a>
      </SectionHeading>

      <div className="grid gap-11 sm:grid-cols-2 sm:gap-6 md:grid-cols-3">
        {posts.map((post) => (
          <article key={post.title} className="group min-w-0 sm:last:col-span-full md:last:col-span-1">
            <div className="relative h-55 overflow-hidden rounded-[20px] bg-lavender sm:h-60">
              {post.image ? (
                <Image
                  src={post.image}
                  alt=""
                  fill
                  sizes="(min-width: 900px) 400px, 100vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-104"
                />
              ) : (
                <PlaceholderArt />
              )}
            </div>
            <div className="mt-4.5 flex items-center gap-2.5">
              <Badge variant="secondary" className="px-2.5 py-1 text-[13px]">
                {post.tag}
              </Badge>
              <p className="text-sm text-muted-foreground">{post.meta}</p>
            </div>
            <h3 className="mt-4 font-serif text-[26px] leading-[1.2]">{post.title}</h3>
          </article>
        ))}
      </div>
    </section>
  );
}
