import { cn } from "@/lib/utils";

const COLS = 29;
const ROWS = 12;
const STEP = 40;

/** Grid cells [col, row] drawn as larger "nodes" instead of plain dots. */
const nodes = new Set(
  [
    [0, 0], [0, 2], [0, 3], [1, 1], [1, 2], [1, 4], [2, 5], [2, 6], [2, 10], [3, 2], [3, 10],
    [3, 11], [4, 5], [5, 1], [6, 2], [6, 4], [6, 7], [7, 1], [7, 7], [8, 5], [8, 10], [10, 2],
    [11, 4], [14, 9], [15, 0], [15, 2], [16, 0], [17, 3], [17, 11], [20, 11], [21, 0], [21, 10],
    [23, 8], [24, 3], [24, 9], [25, 3], [25, 6], [25, 9], [26, 0], [26, 3], [26, 5], [26, 8],
    [27, 1], [27, 2], [27, 3], [27, 4], [28, 3], [28, 4], [28, 9],
  ].map(([col, row]) => `${col},${row}`),
);

/** Floating labels, positioned over the illustration (mobile first). */
const capabilities = [
  { label: "Anomaly Detection", position: "left-[8%] top-[30%] sm:left-[21.7%] sm:top-[34%]" },
  { label: "Tailored Models", position: "left-[45%] top-[8.8%] sm:left-[52%]" },
  { label: "AI consulting", position: "left-[7%] top-[76%] sm:left-[13.4%]" },
  { label: "LLM Inference", position: "left-[48%] top-[66%] sm:left-[57%] sm:top-[65%]" },
  { label: "Computer Vision", position: "right-[3%] top-[42%] sm:right-[2.4%] sm:top-[38%]" },
];

const glows = [
  { className: "fill-orange", cx: 236, cy: 417, rx: 416, ry: 338 },
  { className: "fill-orange", cx: 851, cy: 383, rx: 483, ry: 310 },
  { className: "fill-blue", cx: 1092, cy: 68, rx: 326, ry: 285 },
  { className: "fill-lavender", cx: 241, cy: 26, rx: 635, ry: 320 },
];

export function HeroVisual() {
  return (
    <section
      aria-label="GoatAI capabilities"
      className="shell relative aspect-[0.92] overflow-hidden rounded-[30px] bg-foreground sm:aspect-[1200/520]"
    >
      <svg
        viewBox="0 0 1200 520"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
        className="absolute inset-0 size-full"
      >
        <filter id="hero-glow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="100" />
        </filter>
        <g filter="url(#hero-glow)">
          {glows.map((glow, i) => (
            <ellipse key={i} {...glow} />
          ))}
        </g>
        <g className="fill-background">
          {Array.from({ length: COLS * ROWS }, (_, i) => {
            const col = i % COLS;
            const row = Math.floor(i / COLS);
            const r = nodes.has(`${col},${row}`) ? 6 : 4;
            return <circle key={i} cx={STEP + col * STEP} cy={STEP + row * STEP} r={r} />;
          })}
        </g>
      </svg>

      {capabilities.map((capability) => (
        <span
          key={capability.label}
          className={cn(
            "absolute rounded-full bg-background px-2.5 py-2 text-[9px] font-medium whitespace-nowrap shadow-lg shadow-foreground/10",
            "sm:text-[clamp(9px,1.05vw,14px)] md:px-3.5 md:py-2.5",
            capability.position,
          )}
        >
          {capability.label}
        </span>
      ))}
    </section>
  );
}
