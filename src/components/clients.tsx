import { cn } from "@/lib/utils";

/** Placeholder wordmarks, each with its own typographic style. */
const clients = [
  { name: "Northfield" },
  { name: "alpenlab" },
  { name: "Corteccia", className: "font-serif text-[30px] font-normal italic" },
  { name: "MOSSWORK", className: "text-xl tracking-[0.12em]" },
  { name: "Halden", className: "font-serif text-[29px]" },
  { name: "kiln." },
];

export function Clients() {
  return (
    <section aria-label="Clients" className="shell pt-15.5 pb-10 text-center sm:pt-[70px] md:pt-23 md:pb-18.5">
      <p className="mb-7 text-sm text-muted-foreground">Trusted by teams who still believe in people</p>
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
