"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/* Settings — every knob of the effect. Override any of them via `settings`.  */
/* Colors are not here: they are read from colors.css.                        */
/* -------------------------------------------------------------------------- */
export const dotFieldDefaults = {
  // Gradient
  driftSpeed: 0.16, // how fast the color areas move
  driftRange: 3.0, // how far the color areas travel (multiplies each blob's ax / ay)
  sway: 0.08, // gentle wobble of the color edges
  blobTightness: 2.2, // higher = smaller color areas
  colorSharpness: 2.0, // higher = purer colors, harder blends
  grain: 0.05, // film-grain opacity
  grainFps: 24, // grain re-seeds per second

  // Dots (radii in px)
  spacing: 30, // px between dots
  spacingMobile: 26, // px between dots below 640px
  dotSmall: 2, // every dot at rest (the "static" pulse mixes in the two below)
  dotMedium: 2.4,
  dotLarge: 3,
  labelDot: 10, // dots that carry a label
  shimmer: 0.06, // idle size wave
  shimmerSpeed: 1,

  // Pulse: random dots swell on their own (not with the "static" pulse).
  // Each pulse in `dotFieldPulses` below overrides some of these.
  dotPop: 3.4, // px radius a dot reaches at the top of a pop
  popChance: 0.02, // chance per second that a dot pops on its own
  popHold: 1.0, // "bounce": seconds a dot stays big (±30%)
  popStiffness: 100, // "bounce": spring stiffness, higher = faster
  popDamping: 16, // "bounce": spring damping, lower = more bounce
  popBreath: 3.0, // breathing pulses: seconds of one breath, in and out (±30%)
  popInhale: 0.4, // breathing pulses: share of the breath spent swelling
  spreadChance: 0.92, // chance a pop sets off one neighbor (average chain: 1 / (1 - chance) dots)
  spreadDelay: 0.25, // seconds before the neighbor pops (±30%)
  spreadFade: 1, // each dot down the chain swells this much of the previous one
  spreadSlow: 1, // each dot down the chain pops and passes on this much slower
  spreadMin: 0.15, // the chain stops once a dot would swell less than this (0–1)

  // Cursor
  influence: 50, // px radius where dots grow and move away
  magnify: 0.6, // extra size at the cursor
  repel: 6, // px dots get pushed
  hoverRadius: 14, // px around a label dot that opens it

  // Ripple
  ripple: 0.15, // strength on click (half of it when a label opens)
  rippleSpeed: 240, // px per second
  rippleLife: 2, // seconds

  // Labels
  labelEvery: 2.5, // seconds between automatic pop-ups
  labelHold: 5, // seconds an automatic label stays open
  maxOpen: 3, // max automatic labels open at once
  morphMs: 700, // dot → chip morph duration
  hoverLinger: 0.9, // seconds a label stays open after the cursor leaves

  // Fade (only with `fade`)
  fadeStart: 0.1, // 0–1 from the top: where dots begin to appear
  fadeMin: 0.04, // dot opacity at the top of the fade
  fadeMax: 0.95, // dot opacity at the bottom

  // Depth fade (only with `fade="depth"`)
  depthKnee: 0.30, // 0–1 from the top: where the opacity ramp turns steep
  depthKneeOpacity: 0.2, // dot opacity at the knee (0 at the top, 1 at the bottom)
  depthSharpFrom: 0.85, // 0–1 from the top: below this, dots are sharp
  depthBlur: 0.35, // blur radius at the top, as a fraction of the spacing

  // Multi-color dots (only when `dotColor` is a list)
  colorSpeed: 0.05, // palette cycles per second
  colorWave: 0.9, // palette cycles across the box (diagonal bands)
  colorJitter: 0.22, // per-dot random offset, breaks the bands into speckles
  colorHold: 0.7, // 0–1: share of the cycle a dot sits on a pure palette color
  colorRipple: 0.35, // palette shift a ripple pushes through the dots
};

export type DotFieldSettings = typeof dotFieldDefaults;

/**
 * Pulses: how dots swell on their own. Each one overrides only the settings it
 * tunes; the `settings` prop still wins over them.
 * - `static`: no pulse; dots keep a mix of three fixed sizes.
 * - `bounce`: a dot springs up, holds, springs back, with a little overshoot.
 * - `breathe`: a dot takes one smooth breath, with no pause and no bounce.
 * - `exhale`: like `breathe`, but each chain fades and slows down as it goes.
 * Every pulse but `static` passes pops on to neighbors, in short chains.
 */
export const dotFieldPulses = {
  static: {},
  bounce: { popChance: 0.01, spreadChance: 0.85 },
  breathe: {},
  exhale: { spreadFade: 0.88, spreadSlow: 1.12 },
} satisfies Record<string, Partial<DotFieldSettings>>;

export type DotFieldPulse = keyof typeof dotFieldPulses;
export type DotFieldLabel = { text: string; x: number; y: number };

/** Gradient color areas: palette variable, position (0–1 from top-left), drift and tightness. */
const blobs = [
  { color: "blue", x: 0.18, y: 0.2, ax: 0.08, ay: 0.1, fx: 1.1, fy: 0.9, k: 1 },
  {
    color: "blue",
    x: 0.48,
    y: 0.05,
    ax: 0.1,
    ay: 0.06,
    fx: 0.7,
    fy: 1.3,
    k: 1.3,
  },
  {
    color: "periwinkle",
    x: 0.9,
    y: 0.18,
    ax: 0.05,
    ay: 0.1,
    fx: 0.8,
    fy: 1.2,
    k: 0.75,
  },
  {
    color: "coral",
    x: 0.08,
    y: 0.92,
    ax: 0.07,
    ay: 0.08,
    fx: 1,
    fy: 0.8,
    k: 1.2,
  },
  {
    color: "periwinkle",
    x: 0.62,
    y: 0.88,
    ax: 0.12,
    ay: 0.1,
    fx: 0.6,
    fy: 1.1,
    k: 1,
  },
  {
    color: "coral",
    x: 0.95,
    y: 0.9,
    ax: 0.04,
    ay: 0.08,
    fx: 0.9,
    fy: 0.7,
    k: 1.4,
  },
];

const noLabels: DotFieldLabel[] = [];

/* -------------------------------------------------------------------------- */

/**
 * Animated dot field. Children render on top of the effect.
 * - `gradient`: moving color background; when off, set the background via `className`.
 *   `"dots"`: the same moving gradient colors the dots instead of the background,
 *   as if seen through holes in a dark sheet; set the background via `className`.
 * - `dotColor`: palette variable the dots are drawn with. Pass a list to give every
 *   dot one of those colors, flowing between them in diagonal waves. Ignored with
 *   `gradient="dots"`.
 * - `fade`: dots fade in from the top; `"depth"` also blurs them toward the top.
 */
export function DotField({
  labels = noLabels,
  gradient = true,
  dotColor = "background",
  fade = false,
  pulse = "bounce",
  settings,
  className,
  children,
}: {
  labels?: DotFieldLabel[];
  gradient?: boolean | "dots";
  dotColor?: string | string[];
  fade?: boolean | "depth";
  pulse?: DotFieldPulse;
  settings?: Partial<DotFieldSettings>;
  className?: string;
  children?: React.ReactNode;
}) {
  const cfg = { ...dotFieldDefaults, ...dotFieldPulses[pulse], ...settings };
  const rootRef = useRef<HTMLDivElement>(null);
  const gradientRef = useRef<HTMLCanvasElement>(null);
  const grainRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<HTMLCanvasElement>(null);
  const chipRefs = useRef<HTMLDivElement[]>([]);

  useEffect(
    () =>
      startDotField({
        root: rootRef.current!,
        gradientCanvas: gradientRef.current,
        grainCanvas: grainRef.current,
        dotCanvas: dotsRef.current!,
        chips: chipRefs.current,
        labels,
        dotColor,
        gradientDots: gradient === "dots",
        fade,
        pulse,
        cfg: { ...dotFieldDefaults, ...dotFieldPulses[pulse], ...settings },
      }),
    [labels, dotColor, gradient, fade, pulse, settings],
  );

  const gradientBackground = gradient === true;

  return (
    <div
      ref={rootRef}
      className={cn(
        "relative isolate overflow-hidden",
        gradientBackground && "bg-blue",
        className,
      )}
      style={
        {
          "--dot": `${cfg.labelDot * 2}px`,
          "--morph": `${cfg.morphMs}ms`,
          "--text-delay": `${cfg.morphMs * 0.45}ms`,
        } as React.CSSProperties
      }
    >
      {gradientBackground && (
        <>
          <canvas
            ref={gradientRef}
            aria-hidden="true"
            className="absolute inset-0 -z-10 size-full"
          />
          <canvas
            ref={grainRef}
            aria-hidden="true"
            className="absolute inset-0 -z-10 size-full mix-blend-overlay"
            style={{ opacity: cfg.grain }}
          />
        </>
      )}
      <canvas
        ref={dotsRef}
        aria-hidden="true"
        className="absolute inset-0 -z-10 size-full"
      />

      {labels.map((label, i) => (
        <div
          key={label.text}
          ref={(el) => {
            if (el) chipRefs.current[i] = el;
          }}
          data-open="false"
          className={cn(
            "group pointer-events-none absolute top-0 left-0 flex select-none size-(--dot) items-center justify-center overflow-hidden rounded-full bg-background",
            "transition-[width,height,box-shadow] duration-(--morph) ease-[cubic-bezier(0.34,1.35,0.64,1)]",
            "data-[open=true]:h-8 data-[open=true]:w-(--chip-w) data-[open=true]:shadow-lg data-[open=true]:shadow-foreground/10 sm:data-[open=true]:h-9",
          )}
        >
          <span className="shrink-0 px-3 text-xs font-medium whitespace-nowrap opacity-0 transition-opacity duration-200 group-data-[open=true]:opacity-100 group-data-[open=true]:delay-(--text-delay) sm:px-4 sm:text-sm">
            {label.text}
          </span>
        </div>
      ))}

      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Animation engine                                                           */
/* -------------------------------------------------------------------------- */

type RGB = [number, number, number];

/** Blurred dot: an alpha mask plus one colored copy per color it was drawn in. */
type Sprite = {
  mask: HTMLCanvasElement;
  half: number;
  tints: Map<string, HTMLCanvasElement>;
};

type Dot = {
  sprite?: Sprite; // pre-blurred dot, drawn instead of a sharp circle
  x: number;
  y: number;
  wave: number; // diagonal offset for the shimmer
  hue: number; // position in the palette cycle (multi-color only)
  base: number;
  alpha: number;
  scale: number;
  vs: number;
  dx: number;
  dy: number;
  vx: number;
  vy: number;
  pop: number; // how swollen the dot is: 0 = at rest, 1 = full pop
  vp: number; // spring speed of `pop` ("bounce" only)
  popStart: number; // time the pop started, 0 when not popping
  popDur: number; // length of the current pop
  popAt: number; // time a pop passed on by a neighbor starts, 0 when none
  popGen: number; // place in the chain: 0 for a dot that popped on its own
  neighbors: Dot[]; // the up to 8 dots around it
};

type Anchor = {
  el: HTMLDivElement;
  x: number;
  y: number;
  width: number; // chip width when open
  shift: number; // horizontal offset that keeps the open chip inside the box
  open: boolean;
  hovered: boolean;
  closeAt: number;
};

type Ripple = { x: number; y: number; t: number; strength: number };

/** Resolves any CSS color (hex, oklch, …) of a custom property to RGB. */
function readColor(el: Element, name: string): RGB {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 1;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = getComputedStyle(el).getPropertyValue(`--${name}`).trim();
  ctx.fillRect(0, 0, 1, 1);
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
  return [r, g, b];
}

/* OKLab conversion (https://bottosson.github.io/posts/oklab), so blends look even to the eye. */
const toLinear = (c: number) =>
  (c /= 255) <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
const fromLinear = (c: number) =>
  255 *
  (c <= 0.0031308 ? 12.92 * c : 1.055 * Math.max(c, 0) ** (1 / 2.4) - 0.055);

function rgbToOklab([r, g, b]: RGB): RGB {
  const [lr, lg, lb] = [toLinear(r), toLinear(g), toLinear(b)];
  const l = Math.cbrt(
    0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb,
  );
  const m = Math.cbrt(
    0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb,
  );
  const s = Math.cbrt(
    0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb,
  );
  return [
    0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  ];
}

function oklabToRgb(L: number, a: number, b: number): RGB {
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  return [
    fromLinear(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s),
    fromLinear(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s),
    fromLinear(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s),
  ];
}

/**
 * Pre-renders a dot of `radius` px with a gaussian blur of `sigma` px, in
 * device pixels. The blur is done by hand (separable kernel) because canvas
 * `filter` is not available everywhere. It spreads the dot without changing
 * its total opacity. The result is a mask: `tinted` colors it.
 */
function blurredDot(radius: number, sigma: number, dpr: number): Sprite {
  const half = radius + Math.ceil(3 * sigma) + 1;
  const n = Math.ceil(half * 2 * dpr);
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = n;
  const c = canvas.getContext("2d")!;
  c.beginPath();
  c.arc(n / 2, n / 2, radius * dpr, 0, Math.PI * 2);
  c.fill();
  const img = c.getImageData(0, 0, n, n);

  const s = sigma * dpr;
  const kr = Math.ceil(3 * s);
  const kernel: number[] = [];
  let ksum = 0;
  for (let i = -kr; i <= kr; i++) {
    const w = Math.exp(-(i * i) / (2 * s * s));
    kernel.push(w);
    ksum += w;
  }
  let a = Float32Array.from({ length: n * n }, (_, i) => img.data[i * 4 + 3] / 255);
  for (const horizontal of [true, false]) {
    const out = new Float32Array(n * n);
    for (let y = 0; y < n; y++) {
      for (let x = 0; x < n; x++) {
        let v = 0;
        for (let k = -kr; k <= kr; k++) {
          const xx = horizontal ? x + k : x;
          const yy = horizontal ? y : y + k;
          if (xx >= 0 && xx < n && yy >= 0 && yy < n) v += a[yy * n + xx] * kernel[k + kr];
        }
        out[y * n + x] = v / ksum;
      }
    }
    a = out;
  }
  for (let i = 0; i < n * n; i++) img.data[i * 4 + 3] = Math.round(a[i] * 255);
  c.putImageData(img, 0, 0);
  return { mask: canvas, half: n / 2 / dpr, tints: new Map() };
}

/** The sprite's blurred dot in `color`, made on first use. */
function tinted(sprite: Sprite, color: string) {
  let canvas = sprite.tints.get(color);
  if (!canvas) {
    canvas = document.createElement("canvas");
    canvas.width = sprite.mask.width;
    canvas.height = sprite.mask.height;
    const c = canvas.getContext("2d")!;
    c.drawImage(sprite.mask, 0, 0);
    c.globalCompositeOperation = "source-in";
    c.fillStyle = color;
    c.fillRect(0, 0, canvas.width, canvas.height);
    sprite.tints.set(color, canvas);
  }
  return canvas;
}

/**
 * Looping palette as a lookup table of CSS colors. Each color holds for `hold`
 * of its slot, then eases into the next one through OKLab.
 */
function buildPalette(colors: RGB[], hold: number, steps = 32): string[] {
  const css = ([r, g, b]: RGB) =>
    `rgb(${Math.round(r)},${Math.round(g)},${Math.round(b)})`;
  if (colors.length < 2) return [css(oklabToRgb(...colors[0]))];
  const out: string[] = [];
  for (let i = 0; i < colors.length; i++) {
    const a = colors[i];
    const b = colors[(i + 1) % colors.length];
    for (let s = 0; s < steps; s++) {
      const p = Math.max(0, (s / steps - hold) / (1 - hold));
      const e = p * p * (3 - 2 * p);
      out.push(
        css(oklabToRgb(...(a.map((v, k) => v + (b[k] - v) * e) as RGB))),
      );
    }
  }
  return out;
}

/** Stable pseudo-random number in [0, 1) for a given index. */
function seeded(i: number) {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

/**
 * One breath over p in 0–1: eases up to 1 at `inhale`, then eases back to 0.
 * Both halves are half cosine waves, so the motion never stops or jerks.
 */
function breath(p: number, inhale: number) {
  return p < inhale
    ? 0.5 - 0.5 * Math.cos((Math.PI * p) / inhale)
    : 0.5 + 0.5 * Math.cos((Math.PI * (p - inhale)) / (1 - inhale));
}

/**
 * Lays out the grid so the gap from the outer dots to the edge is the same on
 * all four sides. A fixed spacing only centers each axis on its own, so the
 * spacing is nudged (at most ±6%) to the value that best evens out the two
 * margins, preferring values close to the target.
 */
function fitGrid(W: number, H: number, target: number) {
  let best = { spacing: target, cols: 1, rows: 1, ox: 0, oy: 0 };
  let bestCost = Infinity;
  for (let s = target * 0.94; s <= target * 1.06; s += 0.01) {
    const cols = Math.floor((W - s * 1.9) / s) + 1;
    const rows = Math.floor((H - s * 1.9) / s) + 1;
    const ox = (W - (cols - 1) * s) / 2;
    const oy = (H - (rows - 1) * s) / 2;
    const cost = Math.abs(ox - oy) + 0.2 * Math.abs(s - target);
    if (cost < bestCost) {
      bestCost = cost;
      best = { spacing: s, cols, rows, ox, oy };
    }
  }
  return best;
}

function startDotField({
  root,
  gradientCanvas: shownGradient,
  grainCanvas,
  dotCanvas,
  chips,
  labels,
  dotColor: dotColorName,
  gradientDots,
  fade,
  pulse,
  cfg,
}: {
  root: HTMLDivElement;
  gradientCanvas: HTMLCanvasElement | null;
  grainCanvas: HTMLCanvasElement | null;
  dotCanvas: HTMLCanvasElement;
  chips: HTMLDivElement[];
  labels: DotFieldLabel[];
  dotColor: string | string[];
  gradientDots: boolean;
  fade: boolean | "depth";
  pulse: DotFieldPulse;
  cfg: DotFieldSettings;
}) {
  // With `gradient="dots"` the gradient is drawn off screen and only shows
  // through the dots.
  const gradientCanvas =
    shownGradient ?? (gradientDots ? document.createElement("canvas") : null);
  const gctx = gradientCanvas?.getContext("2d");
  const nctx = grainCanvas?.getContext("2d");
  const ctx = dotCanvas.getContext("2d")!;
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const now = () => performance.now() / 1000;

  const dotNames = Array.isArray(dotColorName) ? dotColorName : [dotColorName];
  const dotPalette = buildPalette(
    dotNames.map((n) => rgbToOklab(readColor(root, n))),
    cfg.colorHold,
  );
  const multiColor = dotPalette.length > 1;
  const blobColors = blobs.map((b) => rgbToOklab(readColor(root, b.color)));

  // Grain: one random tile, redrawn at a random offset.
  const tile = document.createElement("canvas");
  tile.width = tile.height = 128;
  const tctx = tile.getContext("2d")!;
  const noise = tctx.createImageData(128, 128);
  for (let i = 0; i < noise.data.length; i += 4) {
    noise.data[i] = noise.data[i + 1] = noise.data[i + 2] = Math.random() * 255;
    noise.data[i + 3] = 255;
  }
  tctx.putImageData(noise, 0, 0);
  const grainPattern = nctx?.createPattern(tile, "repeat");

  const anchors: Anchor[] = chips.map((el) => ({
    el,
    x: 0,
    y: 0,
    width: 0,
    shift: 0,
    open: false,
    hovered: false,
    closeAt: 0,
  }));

  let W = 0;
  let H = 0;
  let dots: Dot[] = [];
  let gradient: ImageData | undefined;
  const ripples: Ripple[] = [];
  const mouse = { x: 0, y: 0, inside: false };

  function measureChips() {
    for (const a of anchors) {
      a.width = (a.el.firstElementChild as HTMLElement).offsetWidth;
      a.el.style.setProperty("--chip-w", `${a.width}px`);
    }
  }

  function build() {
    const rect = root.getBoundingClientRect();
    W = rect.width;
    H = rect.height;
    const dpr = Math.min(devicePixelRatio, 2);
    dotCanvas.width = W * dpr;
    dotCanvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (grainCanvas) {
      grainCanvas.width = W;
      grainCanvas.height = H;
    }
    if (gradientCanvas && gctx) {
      gradientCanvas.width = Math.ceil(W / 8);
      gradientCanvas.height = Math.ceil(H / 8);
      gradient = gctx.createImageData(
        gradientCanvas.width,
        gradientCanvas.height,
      );
    }

    const { spacing, cols, rows, ox, oy } = fitGrid(
      W,
      H,
      W < 640 ? cfg.spacingMobile : cfg.spacing,
    );

    // Label dots snap to the nearest grid point and are drawn by their chip.
    const anchorCells = new Set<number>();
    labels.forEach((label, i) => {
      const c = Math.round(label.x * (cols - 1));
      const r = Math.round(label.y * (rows - 1));
      anchorCells.add(r * cols + c);
      anchors[i].x = ox + c * spacing;
      anchors[i].y = oy + r * spacing;
    });

    dots = [];
    const grid: (Dot | undefined)[] = [];
    const sprites = new Map<string, Sprite>();
    for (let r = 0; r < rows; r++) {
      const y = oy + r * spacing;
      const t = y / H;
      let alpha = 1;
      let sigma = 0; // gaussian blur in px (half the Figma/CSS blur radius)
      if (fade === "depth") {
        const { depthKnee: k, depthKneeOpacity: ko, depthSharpFrom: sf } = cfg;
        alpha = t < k ? (ko * t) / k : ko + ((1 - ko) * (t - k)) / (1 - k);
        sigma = (cfg.depthBlur * spacing * Math.max(0, (sf - t) / sf)) / 2;
      } else if (fade) {
        const f = Math.max(0, (t - cfg.fadeStart) / (1 - cfg.fadeStart));
        alpha = cfg.fadeMin + (cfg.fadeMax - cfg.fadeMin) * f ** 1.6;
      }
      for (let c = 0; c < cols; c++) {
        if (anchorCells.has(r * cols + c)) continue;
        const rv = seeded(r * 97 + c);
        const base =
          pulse !== "static"
            ? cfg.dotSmall
            : rv > 0.86
              ? cfg.dotLarge
              : rv > 0.55
                ? cfg.dotMedium
                : cfg.dotSmall;
        let sprite: Sprite | undefined;
        if (sigma > 0.15) {
          const key = `${base}|${r}`;
          sprite = sprites.get(key);
          if (!sprite) {
            sprite = blurredDot(base, sigma, dpr);
            sprites.set(key, sprite);
          }
        }
        const dot: Dot = {
          sprite,
          x: ox + c * spacing,
          y,
          wave: (c + r) * 0.35 - seeded(r * 97 + c + 999) * 2,
          hue:
            ((c / cols) * 0.55 + (r / rows) * 0.45) * cfg.colorWave +
            seeded(r * 97 + c + 4242) * cfg.colorJitter,
          base,
          alpha,
          scale: 1,
          vs: 0,
          dx: 0,
          dy: 0,
          vx: 0,
          vy: 0,
          pop: 0,
          vp: 0,
          popStart: 0,
          popDur: 0,
          popAt: 0,
          popGen: 0,
          neighbors: [],
        };
        dots.push(dot);
        grid[r * cols + c] = dot;
      }
    }
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const dot = grid[r * cols + c];
        if (!dot) continue;
        for (let nr = r - 1; nr <= r + 1; nr++) {
          for (let nc = c - 1; nc <= c + 1; nc++) {
            if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;
            const n = grid[nr * cols + nc];
            if (n && n !== dot) dot.neighbors.push(n);
          }
        }
      }
    }
    measureChips();
  }

  function drawGradient(drift: number) {
    if (!gctx || !gradient) return;
    const { width: gw, height: gh, data } = gradient;
    const asp = W / H;
    const centers = blobs.map((b) => [
      (b.x + cfg.driftRange * b.ax * Math.sin(drift * b.fx)) * asp,
      b.y + cfg.driftRange * b.ay * Math.cos(drift * b.fy),
      cfg.blobTightness * b.k * cfg.colorSharpness,
    ]);
    let i = 0;
    for (let y = 0; y < gh; y++) {
      const py = (y + 0.5) / gh;
      for (let x = 0; x < gw; x++) {
        const px = ((x + 0.5) / gw) * asp;
        const wx = px + cfg.sway * Math.sin(py * 3.1 + drift * 0.5);
        const wy = py + cfg.sway * Math.cos(px * 2.7 - drift * 0.5);
        // weighted mix of the blob colors, in OKLab
        let sum = 1e-9;
        let L = 0;
        let A = 0;
        let B = 0;
        for (let k = 0; k < centers.length; k++) {
          const [cx, cy, tightness] = centers[k];
          const w = Math.exp(-((wx - cx) ** 2 + (wy - cy) ** 2) * tightness);
          sum += w;
          L += blobColors[k][0] * w;
          A += blobColors[k][1] * w;
          B += blobColors[k][2] * w;
        }
        const [r, g, b] = oklabToRgb(L / sum, A / sum, B / sum);
        data[i++] = r;
        data[i++] = g;
        data[i++] = b;
        data[i++] = 255;
      }
    }
    gctx.putImageData(gradient, 0, 0);
  }

  function drawGrain() {
    if (!nctx || !grainPattern) return;
    nctx.save();
    nctx.translate(-Math.random() * 128, -Math.random() * 128);
    nctx.fillStyle = grainPattern;
    nctx.fillRect(0, 0, W + 128, H + 128);
    nctx.restore();
  }

  function setOpen(a: Anchor, open: boolean) {
    a.open = open;
    a.el.dataset.open = String(open);
  }

  function updateLabels(t: number, dt: number) {
    if (!reduceMotion && t >= nextAuto) {
      nextAuto = t + cfg.labelEvery;
      const closed = anchors.filter((a) => !a.open);
      if (anchors.length - closed.length < cfg.maxOpen && closed.length) {
        const a = closed[Math.floor(Math.random() * closed.length)];
        setOpen(a, true);
        a.closeAt = t + cfg.labelHold;
      }
    }
    for (const a of anchors) {
      if (a.open && !a.hovered && t >= a.closeAt) setOpen(a, false);
      const half = a.width / 2 + 10;
      const target = a.open ? Math.min(Math.max(a.x, half), W - half) - a.x : 0;
      a.shift += (target - a.shift) * Math.min(1, dt * 8);
      a.el.style.transform = `translate(${a.x + a.shift}px, ${a.y}px) translate(-50%, -50%)`;
    }
  }

  /**
   * Pulse: a random dot pops (springs up or takes a breath, by pulse) and may
   * pass the pop on to one idle neighbor, so pops crawl in short chains. Down
   * the chain each dot can swell less and go slower (`spreadFade`, `spreadSlow`).
   */
  function updatePop(d: Dot, t: number, dt: number) {
    if (d.popStart && t >= d.popStart + d.popDur) d.popStart = 0;
    if (
      !d.popStart &&
      (d.popAt
        ? t >= d.popAt
        : !reduceMotion && d.pop < 0.05 && Math.random() < cfg.popChance * dt)
    ) {
      if (!d.popAt) d.popGen = 0;
      d.popAt = 0;
      d.popStart = t;
      const slow = cfg.spreadSlow ** d.popGen;
      const length = pulse === "bounce" ? cfg.popHold : cfg.popBreath;
      d.popDur = length * slow * (0.7 + 0.6 * Math.random());
      const nextGen = d.popGen + 1;
      if (
        cfg.spreadFade ** nextGen >= cfg.spreadMin &&
        Math.random() < cfg.spreadChance
      ) {
        const idle = d.neighbors.filter(
          (n) => !n.popStart && !n.popAt && n.pop < 0.05,
        );
        const n = idle[Math.floor(Math.random() * idle.length)];
        if (n) {
          n.popGen = nextGen;
          n.popAt = t + cfg.spreadDelay * slow * (0.7 + 0.6 * Math.random());
        }
      }
    }
    const amp = cfg.spreadFade ** d.popGen;
    if (pulse === "bounce") {
      const target = d.popStart ? amp : 0;
      d.vp += ((target - d.pop) * cfg.popStiffness - d.vp * cfg.popDamping) * dt;
      d.pop += d.vp * dt;
    } else {
      d.pop = d.popStart
        ? amp * breath((t - d.popStart) / d.popDur, cfg.popInhale)
        : 0;
    }
  }

  function drawDots(t: number, dt: number) {
    for (let i = ripples.length - 1; i >= 0; i--) {
      ripples[i].t += dt;
      if (ripples[i].t > cfg.rippleLife) ripples.splice(i, 1);
    }

    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = dotPalette[0];
    const cycle = t * cfg.colorSpeed;

    for (const d of dots) {
      let scale = 1;
      let tx = 0;
      let ty = 0;

      if (mouse.inside) {
        const mx = d.x - mouse.x;
        const my = d.y - mouse.y;
        const dist = Math.hypot(mx, my);
        if (dist < cfg.influence) {
          const f = 1 - dist / cfg.influence;
          const e = f * f * (3 - 2 * f);
          scale += e * cfg.magnify;
          tx += (mx * e * cfg.repel) / (dist || 1);
          ty += (my * e * cfg.repel) / (dist || 1);
        }
      }

      let kick = 0;
      for (const rp of ripples) {
        const dist = Math.hypot(d.x - rp.x, d.y - rp.y);
        const band =
          Math.exp(-((dist - rp.t * cfg.rippleSpeed) ** 2) / 600) *
          (1 - rp.t / cfg.rippleLife) *
          rp.strength;
        if (band > 0.002) {
          kick += band;
          scale += band * 1.4;
          tx += ((d.x - rp.x) * band * 8) / (dist || 1);
          ty += ((d.y - rp.y) * band * 8) / (dist || 1);
        }
      }

      // springs
      d.vs = (d.vs + (scale - d.scale) * 180 * dt) * 0.8;
      d.scale += d.vs * dt * 6;
      d.vx = (d.vx + (tx - d.dx) * 160 * dt) * 0.82;
      d.dx += d.vx * dt * 6;
      d.vy = (d.vy + (ty - d.dy) * 160 * dt) * 0.82;
      d.dy += d.vy * dt * 6;

      if (pulse !== "static") updatePop(d, t, dt);
      const size = d.base + (cfg.dotPop - d.base) * d.pop;

      const wave = Math.sin(t * cfg.shimmerSpeed - d.wave);
      let color = dotPalette[0];
      if (multiColor) {
        const h = d.hue + cycle + kick * cfg.colorRipple;
        const n = dotPalette.length;
        color = dotPalette[(((Math.floor(h * n) % n) + n) % n)];
        ctx.fillStyle = color;
      }
      ctx.globalAlpha = d.alpha * (0.88 + 0.12 * wave);
      const radius = Math.max(0.5, size * d.scale * (1 + wave * cfg.shimmer));
      if (d.sprite) {
        // scaled with the dot, so the blur grows a little with it
        const h = (d.sprite.half * radius) / d.base;
        ctx.drawImage(
          tinted(d.sprite, color),
          d.x + d.dx - h,
          d.y + d.dy - h,
          h * 2,
          h * 2,
        );
      } else {
        ctx.beginPath();
        ctx.arc(d.x + d.dx, d.y + d.dy, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.globalAlpha = 1;

    // Gradient-lit dots: the dots drawn so far act as a stencil; the gradient,
    // stretched over the whole box, replaces their color and keeps their alpha.
    if (gradientDots && gradientCanvas) {
      ctx.globalCompositeOperation = "source-in";
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(gradientCanvas, 0, 0, W, H);
      ctx.globalCompositeOperation = "source-over";
    }
  }

  // Loop
  let raf = 0;
  let last = now();
  let drift = 0;
  let nextGrain = 0;
  let nextAuto = last + 0.6;
  let visible = true;

  function frame() {
    raf = requestAnimationFrame(frame);
    const t = now();
    const dt = Math.min(t - last, 1 / 30);
    last = t;
    if (!visible) return;

    drift += dt * cfg.driftSpeed * (reduceMotion ? 0.3 : 1);
    drawGradient(drift);
    if (!reduceMotion && t >= nextGrain) {
      nextGrain = t + 1 / cfg.grainFps;
      drawGrain();
    }
    updateLabels(t, dt);
    drawDots(reduceMotion ? t * 0.3 : t, dt);
  }

  // Pointer
  function onMove(e: PointerEvent) {
    const rect = root.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    mouse.inside = true;

    const hit = anchors.find((a) =>
      a.open
        ? Math.abs(mouse.x - a.x - a.shift) <= a.el.offsetWidth / 2 &&
          Math.abs(mouse.y - a.y) <= a.el.offsetHeight / 2
        : Math.hypot(mouse.x - a.x, mouse.y - a.y) <= cfg.hoverRadius,
    );
    for (const a of anchors) {
      if (a === hit && !a.hovered) {
        a.hovered = true;
        if (!a.open) {
          setOpen(a, true);
          ripples.push({ x: a.x, y: a.y, t: 0, strength: cfg.ripple / 2 });
        }
      } else if (a !== hit && a.hovered) {
        a.hovered = false;
        a.closeAt = now() + cfg.hoverLinger;
      }
    }
    root.style.cursor = hit ? "pointer" : "";
  }

  function onLeave() {
    mouse.inside = false;
    for (const a of anchors) {
      if (a.hovered) {
        a.hovered = false;
        a.closeAt = now() + cfg.hoverLinger;
      }
    }
  }

  function onDown(e: PointerEvent) {
    const rect = root.getBoundingClientRect();
    ripples.push({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      t: 0,
      strength: cfg.ripple,
    });
  }

  build();
  drawGrain();
  document.fonts?.ready.then(measureChips);

  const resizeObserver = new ResizeObserver(build);
  resizeObserver.observe(root);
  const visibilityObserver = new IntersectionObserver(
    ([entry]) => (visible = entry.isIntersecting),
  );
  visibilityObserver.observe(root);
  root.addEventListener("pointermove", onMove);
  root.addEventListener("pointerleave", onLeave);
  root.addEventListener("pointerdown", onDown);
  raf = requestAnimationFrame(frame);

  return () => {
    cancelAnimationFrame(raf);
    resizeObserver.disconnect();
    visibilityObserver.disconnect();
    root.removeEventListener("pointermove", onMove);
    root.removeEventListener("pointerleave", onLeave);
    root.removeEventListener("pointerdown", onDown);
  };
}
