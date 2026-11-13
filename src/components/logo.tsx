import Link from "next/link";

import { cn } from "@/lib/utils";

/** Renders /pictogram.svg as a mask, so it takes the current text color. */
function Pictogram() {
  return (
    <span
      aria-hidden="true"
      className="size-9 bg-current mask-[url(/pictogram.svg)] mask-contain mask-center mask-no-repeat sm:size-10.5"
    />
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="GoatAI home"
      className={cn("inline-flex items-center gap-1.5 text-[19px] font-semibold sm:text-[22px]", className)}
    >
      <Pictogram />
      GoatAI
    </Link>
  );
}
