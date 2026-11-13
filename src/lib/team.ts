/* Placeholder people — replace with the real team (names, roles, photos). */

export type Member = {
  name: string;
  role: string;
  bio: string;
  image?: string;
};

export const team: Member[] = [
  {
    name: "Name Surname",
    role: "Co-founder & CEO",
    bio: "Turns client problems into research questions, and research answers into products.",
  },
  {
    name: "Name Surname",
    role: "Co-founder & CTO",
    bio: "Computer vision PhD. Owns the path from prototype to production.",
  },
  {
    name: "Name Surname",
    role: "Scientific advisor",
    bio: "Professor at the University of Modena and Reggio Emilia, where GoatAI was born.",
  },
  {
    name: "Name Surname",
    role: "Senior ML engineer",
    bio: "Tracking, re-identification and everything that needs to run in real time.",
  },
  {
    name: "Name Surname",
    role: "ML engineer",
    bio: "Synthetic data pipelines and the occasional game engine hack.",
  },
  {
    name: "Name Surname",
    role: "Software engineer",
    bio: "Edge deployment, dashboards and making sure it all keeps running.",
  },
];
