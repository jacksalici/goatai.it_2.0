import { DotField } from "@/components/dot-field";
import { capabilities } from "@/lib/content";

export function HeroVisual() {
  return (
    <section aria-label="GoatAI capabilities" className="shell">
      <DotField labels={capabilities} className="aspect-[0.92] rounded-[30px] sm:aspect-[1200/520]" />
    </section>
  );
}
