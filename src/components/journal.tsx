import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { PostCard } from "@/components/post-card";
import { SectionHeading } from "@/components/section-heading";
import { posts } from "@/lib/posts";

export function Journal() {
  return (
    <section id="journal" className="shell py-17 sm:py-24">
      <SectionHeading eyebrow="Field notes" title="From the pasture.">
        <Link href="/blog" className="group inline-flex items-center gap-2 font-medium">
          All notes
          <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" strokeWidth={1.33} />
        </Link>
      </SectionHeading>

      <div className="grid gap-11 sm:grid-cols-2 sm:gap-6 md:grid-cols-3">
        {posts.slice(0, 3).map((post) => (
          <PostCard key={post.slug} post={post} className="sm:last:col-span-full md:last:col-span-1" />
        ))}
      </div>
    </section>
  );
}
