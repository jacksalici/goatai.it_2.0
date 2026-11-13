import type { Metadata } from "next";

import { PageHeader } from "@/components/page-header";
import { PostCard } from "@/components/post-card";
import { posts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "Field notes from GoatAI: research, projects and lessons from putting AI to work.",
};

export default function BlogPage() {
  return (
    <>
      <PageHeader
        eyebrow="Field notes"
        title={
          <>
            From the <em>pasture.</em>
          </>
        }
        intro="Research we're proud of, projects we've shipped, and the things we learned the hard way."
      />
      <section className="shell grid gap-11 pb-17 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-14 sm:pb-24 md:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </section>
    </>
  );
}
