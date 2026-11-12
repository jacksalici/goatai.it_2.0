import { Mountain, Sprout, UserRound, type LucideIcon } from "lucide-react";

export type Accent = "blue" | "orange" | "lavender";

export const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Research", href: "#research" },
  { label: "Blog", href: "#journal" },
  { label: "About", href: "#about" },
];

export const services: {
  title: string;
  body: string;
  icon: LucideIcon;
  accent: Accent;
}[] = [
  {
    title: "Humans in the loop",
    body: "Experts review, correct and teach the model. Every decision leaves a trail you can read.",
    icon: UserRound,
    accent: "blue",
  },
  {
    title: "Grounded models",
    body: "Built on your data and your domain, not the whole internet. Fewer hallucinations, more answers.",
    icon: Sprout,
    accent: "orange",
  },
  {
    title: "Runs where you work",
    body: "In your tools, on your servers, at the edge. Sure-footed on any terrain, like a goat.",
    icon: Mountain,
    accent: "lavender",
  },
];

export const posts: { title: string; tag: string; meta: string; image?: string }[] = [
  {
    title: "Why the best models still need a shepherd",
    tag: "Research",
    meta: "Oct 2026 · 8 min read",
  },
  {
    title: "Mycelium: how our agents share what they learn",
    tag: "Product",
    meta: "Sep 2026 · 4 min read",
  },
  {
    title: "Small team, steep slopes: how we build GoatAI",
    tag: "Culture",
    meta: "Aug 2026 · 5 min read",
  },
];

export const suggestions = ["Audit my workflow", "Build a custom model", "Talk to a human"];

export const footerColumns = [
  {
    title: "Product",
    links: [
      { label: "Models", href: "#services" },
      { label: "Agents", href: "#services" },
      { label: "Pricing", href: "#ask" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#about" },
      { label: "Blog", href: "#journal" },
      { label: "Careers", href: "#ask" },
    ],
  },
];
