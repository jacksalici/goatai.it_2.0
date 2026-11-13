import { cn } from "@/lib/utils";

/** Press wordmarks, each with its own typographic style. */
const clients = [
  { name: "il Resto del Carlino", className: "font-serif font-normal italic" },
  { name: "la Repubblica", className: "font-serif font-normal" },
  { name: "Radio 24" },
  { name: "SKY TG24", className: "tracking-[0.08em]" },
  { name: "TVQui" },
];

export function Clients() {
  return (
    <section aria-label="Press" className="shell pt-15.5 pb-10 text-center sm:pt-[70px] md:pt-23 md:pb-18.5">
      <p className="mb-7 text-sm text-muted-foreground">They talked about the goat</p>
      <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-4.5 text-subtle-foreground md:flex-nowrap md:justify-between">
        {clients.map((client) => (
          <span
            key={client.name}
            className={cn("text-[clamp(17px,2vw,27px)] font-semibold", client.className)}
          >
            {client.name}
          </span>
        ))}
      </div>
    </section>
  );
}
