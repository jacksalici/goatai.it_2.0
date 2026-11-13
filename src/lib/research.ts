/* Placeholder copy — replace with the real publication list and links. */

export const researchAreas = [
  {
    title: "People detection & tracking",
    body: "Finding and following people in crowded, messy, real-world scenes.",
  },
  {
    title: "Human behavior understanding",
    body: "Pose, action and interaction analysis, robust to occlusion and odd viewpoints.",
  },
  {
    title: "Synthetic data",
    body: "Photorealistic simulated worlds to train models without collecting personal data.",
  },
  {
    title: "Edge & industrial AI",
    body: "Models that run in real time on constrained hardware, right next to the machine.",
  },
];

export type Publication = {
  title: string;
  venue: string;
  year: number;
  kind: "Paper" | "Award" | "Dataset";
  href?: string;
};

export const publications: Publication[] = [
  {
    title: "Synthetic data for pedestrian detection and tracking",
    venue: "ICCV",
    year: 2021,
    kind: "Paper",
  },
  {
    title: "Pose estimation under heavy occlusion",
    venue: "ACM TOMM",
    year: 2022,
    kind: "Paper",
  },
  {
    title: "A large-scale synthetic dataset for multi-object tracking",
    venue: "ICCV",
    year: 2021,
    kind: "Dataset",
  },
  {
    title: "Best Demo Award",
    venue: "ECCV",
    year: 2020,
    kind: "Award",
  },
];
