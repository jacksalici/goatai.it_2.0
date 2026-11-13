import type { ServiceArtName } from "@/components/service-art";

export const navLinks = [
  { label: "How it works", href: "#services" },
  { label: "Research", href: "#journal" },
  { label: "About", href: "#about" },
  { label: "Careers", href: "#ask" },
];

/** Hero labels: x / y are fractions of the box (0–1), snapped to the nearest dot. */
export const capabilities = [
  { text: "Computer Vision", x: 0.55, y: 0.12 },
  { text: "Behavior Understanding", x: 0.32, y: 0.38 },
  { text: "Deep Learning", x: 0.87, y: 0.42 },
  { text: "Deep Monitoring", x: 0.61, y: 0.7 },
  { text: "AI consulting", x: 0.21, y: 0.82 },
  { text: "Industry 4.0", x: 0.1, y: 0.22 },
  { text: "Image Processing", x: 0.9, y: 0.88 },
  { text: "Machine Learning", x: 0.42, y: 0.6 },
  { text: "Safety", x: 0.74, y: 0.22 },
];

export const services: {
  title: string;
  body: string;
  art: ServiceArtName;
}[] = [
  {
    title: "Tell us the problem",
    body: "A real conversation with the people who will build it. We dig into your challenge before touching a model.",
    art: "loop",
  },
  {
    title: "Prove it, then prototype",
    body: "A feasibility study first, then a working prototype shaped around your data and your needs.",
    art: "roots",
  },
  {
    title: "Scale up to production",
    body: "From prototype to a robust, industrial product. Sure-footed on any terrain, like a goat.",
    art: "terrain",
  },
];

export const posts: { title: string; tag: string; meta: string; image?: string }[] = [
  {
    title: "Teaching models to see people, without filming people",
    tag: "Research",
    meta: "ICCV 2021 · Synthetic data",
  },
  {
    title: "Reading human behavior, even when half of it is hidden",
    tag: "Research",
    meta: "TOMM 2022 · Occlusion",
  },
  {
    title: "Best Demo Award: a small herd at ECCV",
    tag: "Award",
    meta: "ECCV 2020",
  },
];

export const suggestions = ["Run a feasibility study", "Build a prototype", "Talk to a human"];

export const footerColumns = [
  {
    title: "Solutions",
    links: [
      { label: "Consulting", href: "#services" },
      { label: "Prototyping", href: "#services" },
      { label: "Scale-up", href: "#services" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#about" },
      { label: "Research", href: "#journal" },
      { label: "Careers", href: "#ask" },
    ],
  },
];
