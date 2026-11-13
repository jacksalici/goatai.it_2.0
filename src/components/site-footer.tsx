import Link from "next/link";

import { Logo } from "@/components/logo";
import { contact, footerColumns } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="shell pt-6 pb-14">
      <div className="flex flex-col items-start justify-between gap-12.5 pb-12 md:flex-row md:gap-0">
        <div>
          <Logo />
          <p className="mt-2.5 text-sm text-brand">
            Artificial Intelligence, <em className="font-serif text-base">powered by humans.</em>
          </p>
          <p className="mt-4 max-w-72 text-sm leading-normal text-muted-foreground">
            A spin-off of the University of Modena and Reggio Emilia, born inside a computer
            vision research lab.
          </p>
        </div>

        <div className="flex w-full flex-wrap gap-10 text-sm text-muted-foreground sm:flex-nowrap sm:justify-between md:w-auto md:gap-[clamp(45px,6vw,80px)]">
          {footerColumns.map((column) => (
            <div key={column.title} className="flex flex-col gap-2.5">
              <strong className="text-[13px] font-medium text-foreground">{column.title}</strong>
              {column.links.map((link) => (
                <Link key={link.label} href={link.href} className="transition-colors hover:text-brand">
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
          <div className="flex w-full flex-col gap-2.5 sm:w-auto">
            <strong className="text-[13px] font-medium text-foreground">Contact</strong>
            <a href={`mailto:${contact.email}`} className="transition-colors hover:text-brand">
              {contact.email}
            </a>
            <a href={contact.phoneHref} className="transition-colors hover:text-brand">
              {contact.phone}
            </a>
            <span>Via Vivarelli 2, Modena</span>
          </div>
        </div>
      </div>

      <div className="border-t pt-7.5 text-sm text-subtle-foreground">© 2026 GoatAI.</div>
    </footer>
  );
}
