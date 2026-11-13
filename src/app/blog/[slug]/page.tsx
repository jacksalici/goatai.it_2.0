import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PlaceholderArt } from "@/components/post-card";
import { Badge } from "@/components/ui/badge";
import { formatDate, getPost, posts } from "@/lib/posts";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug);
  return post ? { title: post.title, description: post.excerpt } : {};
}

export default async function PostPage({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  return (
    <article className="pb-17 sm:pb-24">
      <header className="shell max-w-190 pt-12 sm:pt-16">
        <Link
          href="/blog"
          className="group mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-brand"
        >
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" strokeWidth={1.33} />
          All notes
        </Link>
        <div className="flex items-center gap-2.5">
          <Badge variant="secondary" className="px-2.5 py-1 text-[13px]">
            {post.tag}
          </Badge>
          <p className="text-sm text-muted-foreground">
            <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.meta}
          </p>
        </div>
        <h1 className="mt-6 font-serif text-[40px] leading-[1.1] tracking-[-1px] sm:text-[clamp(44px,5vw,60px)] sm:tracking-[-1.5px]">
          {post.title}
        </h1>
        <p className="mt-6 text-lg leading-normal text-muted-foreground">{post.excerpt}</p>
      </header>

      <div className="shell relative my-12 h-70 max-w-250 overflow-hidden rounded-3xl bg-lavender sm:h-105">
        <PlaceholderArt />
      </div>

      <div className="shell max-w-190 space-y-6 text-[17px] leading-relaxed">
        {post.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}
