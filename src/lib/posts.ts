/* Placeholder copy — replace with real articles. */

export type Post = {
  slug: string;
  title: string;
  tag: "Research" | "Award" | "Company" | "Insight";
  date: string; // ISO
  meta: string;
  excerpt: string;
  image?: string;
  body: string[];
};

export const posts: Post[] = [
  {
    slug: "seeing-people-without-filming-people",
    title: "Teaching models to see people, without filming people",
    tag: "Research",
    date: "2026-10-02",
    meta: "ICCV 2021 · Synthetic data",
    excerpt:
      "Real footage of pedestrians is expensive to label and hard to collect without privacy headaches. So we built a city that doesn't exist.",
    body: [
      "Every computer vision project starts with the same question: where does the data come from? For people detection and tracking, the honest answer is usually 'from cameras pointed at real people'. That means consent, anonymisation, and thousands of hours of manual labelling.",
      "Our team took a different road. Using a photorealistic game engine, we generated a large synthetic dataset of crowded urban scenes: pedestrians walking, stopping, overlapping, under every kind of light and weather. Every box, every mask, every identity is labelled for free, because we placed it there.",
      "The surprising part is not that synthetic data helps. It's how much. Models trained only on synthetic scenes held their own against models trained on real footage, and combining the two pushed results further still.",
      "For our clients this matters in a very practical way: we can start building before a single camera is installed, and we can do it without collecting images of anyone.",
    ],
  },
  {
    slug: "reading-behavior-when-half-is-hidden",
    title: "Reading human behavior, even when half of it is hidden",
    tag: "Research",
    date: "2026-08-21",
    meta: "TOMM 2022 · Occlusion",
    excerpt:
      "On a factory floor people are always partly hidden — behind machines, pallets, each other. Our pose models are built to guess what they can't see.",
    body: [
      "Lab benchmarks love clean shots: one person, centred, fully visible. The real world is never like that. On a production line, an operator is half behind a press; in a warehouse, a picker disappears between two shelves.",
      "We work on models that reason about the joints they can't see, using context and motion to fill in the gaps. A wrist hidden behind a crate is still somewhere, and where it probably is matters a lot if you're checking that a hand is clear of a moving part.",
      "This research now sits at the core of our safety monitoring work, where a missed detection is not an accuracy metric, it's an incident.",
    ],
  },
  {
    slug: "best-demo-award-eccv",
    title: "Best Demo Award: a small herd at ECCV",
    tag: "Award",
    date: "2026-06-12",
    meta: "ECCV 2020",
    excerpt:
      "A live demo, a crowded hall and a lot of nervous laughter. Here's what we showed, and what we learned from showing it.",
    body: [
      "Live demos at a conference are a special kind of stress test. The lighting is wrong, the Wi-Fi is worse, and hundreds of computer vision researchers are actively trying to break your system.",
      "Ours held up — well enough to win the Best Demo Award. The demo ran real-time people tracking and behaviour analysis on a single workstation, with visitors walking in and out of frame.",
      "The lesson we took home: robustness is a feature you design for from day one, not something you bolt on later. It's the same lesson we bring to every project.",
    ],
  },
  {
    slug: "from-feasibility-to-production",
    title: "From feasibility study to production: what actually changes",
    tag: "Insight",
    date: "2026-04-30",
    meta: "Field notes · Process",
    excerpt:
      "A prototype that works on a laptop is maybe a third of the job. The rest is the unglamorous part, and it's where most AI projects die.",
    body: [
      "Feasibility studies answer one question: can this be done with the data we have? Prototypes answer a second: can it be done well enough to be useful? Production asks a third, harder one: can it keep doing that, every day, without us watching?",
      "Moving to production means dealing with drift, edge hardware, monitoring, retraining loops, and the people who will actually use the system. We plan for all of it from the first meeting, even if we only build it at the end.",
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}
