/* Placeholder copy — replace with real, approved client stories. */

export type CaseStudy = {
  slug: string;
  client: string;
  sector: string;
  title: string;
  summary: string;
  metrics: { value: string; label: string }[];
  challenge: string;
  approach: string[];
  outcome: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "safer-production-line",
    client: "Manufacturing company, Emilia-Romagna",
    sector: "Manufacturing",
    title: "Keeping hands clear of a moving press",
    summary:
      "A vision system that watches the danger zone around heavy machinery and stops it before anyone gets hurt.",
    metrics: [
      { value: "< 80 ms", label: "detection to stop signal" },
      { value: "0", label: "incidents since deployment" },
      { value: "12", label: "lines covered" },
    ],
    challenge:
      "Light curtains kept operators safe but slowed every cycle and were routinely bypassed. The client needed protection that adapts to how people actually work.",
    approach: [
      "Two-week feasibility study on recorded footage from the plant floor.",
      "Pose estimation tuned for heavy occlusion, running on edge hardware next to each press.",
      "Integration with the existing PLC so the system can halt the machine directly.",
    ],
    outcome:
      "The system now runs on every line, with faster cycle times than the old barriers and no safety incidents since go-live.",
  },
  {
    slug: "people-flow-in-transit",
    client: "Public transport operator",
    sector: "Transportation",
    title: "Counting passengers without recording faces",
    summary:
      "Privacy-first people counting on buses and platforms, trained largely on synthetic data.",
    metrics: [
      { value: "97%", label: "counting accuracy" },
      { value: "0", label: "images stored" },
      { value: "300+", label: "vehicles equipped" },
    ],
    challenge:
      "The operator needed reliable occupancy data to plan service, but could not store or transmit images of passengers.",
    approach: [
      "Synthetic training data to cover crowding, lighting and camera angles before installation.",
      "On-device inference: only counts leave the vehicle, never pixels.",
      "A lightweight dashboard for the planning team.",
    ],
    outcome:
      "Occupancy data now feeds weekly service planning, and the privacy design passed the operator's data protection review first time.",
  },
  {
    slug: "shelf-intelligence-retail",
    client: "Retail chain",
    sector: "Retail",
    title: "Spotting empty shelves before customers do",
    summary:
      "Automatic out-of-stock detection from existing in-store cameras, with alerts sent straight to staff.",
    metrics: [
      { value: "−35%", label: "out-of-stock time" },
      { value: "4 wks", label: "from data to pilot" },
      { value: "40", label: "stores in rollout" },
    ],
    challenge:
      "Manual shelf checks were slow and inconsistent. The client wanted to reuse cameras already installed for security.",
    approach: [
      "Product-level detection trained on the client's own planograms.",
      "Pilot in two stores, measuring impact against control stores.",
      "Alerts delivered to the handheld devices staff already carry.",
    ],
    outcome:
      "The pilot cut out-of-stock time by a third, and the system is now rolling out across the chain.",
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}
