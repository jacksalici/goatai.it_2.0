"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { navLinks } from "@/lib/content";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav aria-label="Main navigation" className="shell relative z-20 flex h-21 items-center md:h-27">
      <Logo />

      <div
        className={cn(
          "absolute inset-x-0 top-19 flex-col rounded-2xl border bg-card p-3 shadow-xl shadow-foreground/10",
          "md:static md:ml-auto md:flex md:flex-row md:gap-9 md:border-0 md:bg-transparent md:p-0 md:shadow-none",
          open ? "flex" : "hidden",
        )}
      >
        {navLinks.map((link) => {
          const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              aria-current={active ? "page" : undefined}
              className={cn(
                "px-2.5 py-3 text-sm transition-colors hover:text-brand md:p-0",
                active && "text-brand",
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </div>

      <Button asChild size="lg" className="ml-auto max-sm:hidden md:ml-9">
        <Link href="/contact">Talk to us</Link>
      </Button>

      <Button
        variant="outline"
        size="icon-lg"
        className="ml-2.5 rounded-full max-sm:ml-auto md:hidden"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label="Toggle menu"
      >
        {open ? <X /> : <Menu />}
      </Button>
    </nav>
  );
}
