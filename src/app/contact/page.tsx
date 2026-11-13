import { Mail, MapPin, Phone } from "lucide-react";
import type { Metadata } from "next";

import { AskSection } from "@/components/ask-section";
import { PageHeader } from "@/components/page-header";
import { contact } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Tell GoatAI about the problem you want to solve.",
};

const channels = [
  { icon: Mail, label: "Email", value: contact.email, href: `mailto:${contact.email}` },
  { icon: Phone, label: "Phone", value: contact.phone, href: contact.phoneHref },
  {
    icon: MapPin,
    label: "Office",
    value: contact.address,
    href: `https://maps.google.com/?q=${encodeURIComponent(contact.address)}`,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={
          <>
            Let&apos;s talk about <em>your problem.</em>
          </>
        }
        intro="No sales script. Tell us what you're trying to solve and one of the people who'd actually build it will get back to you, usually within two working days."
      />

      <section className="shell grid gap-5 pb-5 sm:grid-cols-3">
        {channels.map(({ icon: Icon, label, value, href }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noreferrer" : undefined}
            className="group rounded-3xl border p-6 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-foreground/5 sm:p-7.5"
          >
            <Icon className="size-5 text-brand" strokeWidth={1.33} />
            <p className="mt-6 text-sm text-muted-foreground">{label}</p>
            <p className="mt-1 text-lg transition-colors group-hover:text-brand">{value}</p>
          </a>
        ))}
      </section>

      <AskSection />
    </>
  );
}
