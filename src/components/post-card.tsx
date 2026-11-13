import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import type { Post } from "@/lib/posts";
import { cn } from "@/lib/utils";

export function PlaceholderArt() {
  return (
    <div aria-hidden="true" className="absolute inset-0">
      <span className="absolute -bottom-18.5 -left-[15%] h-32.5 w-[130%] rotate-3 rounded-t-[50%] bg-foreground/15" />
      <span className="absolute -bottom-25 left-[5%] h-32.5 w-[130%] -rotate-5 rounded-t-[50%] bg-foreground/30" />
      <span className="absolute top-9 right-9 size-10.5 rounded-full border border-background/65" />
    </div>
  );
}

export function PostCard({ post, className }: { post: Post; className?: string }) {
  return (
    <article className={cn("group relative min-w-0", className)}>
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
      <h3 className="mt-4 font-serif text-[26px] leading-[1.2] transition-colors group-hover:text-brand">
        <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
          {post.title}
        </Link>
      </h3>
    </article>
  );
}
