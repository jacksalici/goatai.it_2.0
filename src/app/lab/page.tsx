import type { Metadata } from "next";

import { DotField } from "@/components/dot-field";
import { Logo } from "@/components/logo";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";

// Graphic experiments. Not linked from anywhere and kept out of search engines:
// reachable only by typing the URL. The page covers the whole viewport, above
// the site header and footer, with a bar of its own in the same place, and
// shows each variant alone in the same rounded box as the "Ask" section, with
// its name above the box, never on it.
export const metadata: Metadata = {
  title: "Lab",
  robots: { index: false, follow: false },
};

const box =
  "min-h-155 w-full rounded-[25px] bg-foreground sm:min-h-140 sm:rounded-[32px]";

const variants: {
  id: string;
  name: React.ReactNode;
  status: "live" | "experiment";
  note: string;
  field: React.ReactNode;
}[] = [
  {
    id: "stencil-hero",
    name: (
      <>
        Stencil, <em>hero colors</em>
      </>
    ),
    status: "experiment",
    note: "The hero gradient, unchanged, seen through the dots of a dark sheet. Its blue sits top left, where the dots fade out.",
    field: <DotField gradient="dots" blobs="hero" fade="depth" className={box} />,
  },
  {
    id: "stencil",
    name: (
      <>
        Stencil, <em>moved colors</em>
      </>
    ),
    status: "experiment",
    note: "The same gradient with its colors moved into the visible band: blue on the left, periwinkle in the middle, coral on the right.",
    field: <DotField gradient="dots" fade="depth" className={box} />,
  },
  {
    id: "home",
    name: "Depth dot field",
    status: "live",
    note: "The dots of the “Ask” section today: multi-color, fading and blurring toward the top. Shown alone, without the aurora orbs behind them.",
    field: (
      <DotField gradient={false} dotColor={["blue", "periwinkle", "coral"]} fade="depth" className={box} />
    ),
  },
];

export default function LabPage() {
  return (
    <div className="fixed inset-0 z-100 overflow-auto bg-background">
      <div className="shell flex h-21 items-center md:h-27">
        <Logo />
        <Badge
          variant="outline"
          className="ml-auto gap-1.5 px-2.5 py-2 text-xs font-normal text-muted-foreground sm:px-3.5 sm:text-sm"
        >
          <span className="size-2 rounded-full bg-brand" />
          Private, not indexed
        </Badge>
      </div>

      <PageHeader
        title={
          <>
            Ideas, <em>before they ship.</em>
          </>
        }
        intro="A private page for trying visual ideas side by side before they reach the site. On the bench now: the Stencil variant of the dot field, where the moving hero gradient colors the dots instead of the background. The dots of the “Ask” section, as they are today, close the page as the reference."
      />

      <div className="shell flex flex-col gap-17 pb-17.5 sm:gap-24 sm:pb-24">
        {variants.map((v, i) => (
          <section key={v.id} id={v.id} className="scroll-mt-6 border-t pt-7 sm:pt-9">
            <div className="mb-7 grid gap-3 sm:mb-9 md:grid-cols-[1fr_minmax(0,28rem)] md:items-end md:gap-10">
              <div>
                <span className="font-serif text-lg text-muted-foreground tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="mt-3 text-[28px] font-semibold tracking-[-0.03em] leading-[1.1] sm:text-[34px]">
                  {v.name}
                </h2>
              </div>
              <div className="flex flex-col items-start gap-3">
                <Badge
                  variant="outline"
                  className="gap-1.5 px-2.5 py-1 text-xs font-normal text-muted-foreground"
                >
                  <span className={v.status === "live" ? "size-1.5 rounded-full bg-brand" : "size-1.5 rounded-full bg-coral"} />
                  {v.status === "live" ? "On the home page" : "Experiment"}
                </Badge>
                <p className="leading-normal text-muted-foreground">{v.note}</p>
              </div>
            </div>
            {v.field}
          </section>
        ))}
      </div>
    </div>
  );
}
