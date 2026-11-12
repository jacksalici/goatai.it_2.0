import { useId } from "react";

/**
 * Minimal illustrations for the service cards: brand-color gradients with
 * grain, outlined by thin ink lines. Colors come from colors.css.
 */

export type ServiceArtName = "loop" | "roots" | "terrain";

const line = {
  fill: "none",
  strokeWidth: 1,
  vectorEffect: "non-scaling-stroke",
  style: { stroke: "var(--ink)" },
} as const;

const ink = { style: { fill: "var(--ink)" } };

/** Stop helper: color from the palette, optional opacity. */
function Stop({ at, color, opacity = 1 }: { at: number; color: string; opacity?: number }) {
  return <stop offset={at} style={{ stopColor: `var(--${color})`, stopOpacity: opacity }} />;
}

/**
 * Print-like grain. Fading areas dissolve into colored specks (each pixel is
 * kept only where its opacity beats the noise), and solid areas get a soft
 * texture that keeps the colors clean.
 */
function Grain({ id }: { id: string }) {
  return (
    <filter id={id} x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" seed="7" stitchTiles="stitch" result="noise" />

      {/* Dither: keep pixels whose opacity is above the noise */}
      <feColorMatrix in="noise" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  3 0 0 0 -1" />
      <feComponentTransfer result="threshold">
        <feFuncA type="linear" slope="0.9" /> {/* capped below 1 so solid fills stay solid */}
      </feComponentTransfer>
      <feComposite in="SourceAlpha" in2="threshold" operator="arithmetic" k2="1" k3="-1" result="diff" />
      <feComponentTransfer in="diff" result="mask">
        <feFuncA type="linear" slope="12" />
      </feComponentTransfer>
      <feColorMatrix in="SourceGraphic" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0 1" result="opaque" />
      <feComposite in="opaque" in2="mask" operator="in" result="dithered" />

      {/* Soft texture on top */}
      <feColorMatrix in="noise" values="0.33 0.33 0.33 0 0  0.33 0.33 0.33 0 0  0.33 0.33 0.33 0 0  0 0 0 0 1" result="mono" />
      <feBlend in="mono" in2="dithered" mode="soft-light" result="textured" />
      <feComposite in="textured" in2="dithered" operator="in" />
    </filter>
  );
}

/** Humans in the loop: a large model sphere and a small human one, tied by an orbit. */
function Loop({ id }: { id: string }) {
  return (
    <>
      <defs>
        <Grain id={`${id}-grain`} />
        <radialGradient id={`${id}-model`} cx="0.35" cy="0.3" r="0.8">
          <Stop at={0} color="cream" />
          <Stop at={0.4} color="lavender" />
          <Stop at={1} color="blue" />
        </radialGradient>
        <radialGradient id={`${id}-human`} cx="0.35" cy="0.3" r="0.8">
          <Stop at={0} color="cream" />
          <Stop at={1} color="orange" />
        </radialGradient>
        <radialGradient id={`${id}-shadow`}>
          <Stop at={0} color="blue" opacity={0.5} />
          <Stop at={1} color="blue" opacity={0} />
        </radialGradient>
      </defs>

      <g filter={`url(#${id}-grain)`}>
        <ellipse cx="185" cy="182" rx="120" ry="10" fill={`url(#${id}-shadow)`} />
        <circle cx="200" cy="104" r="62" fill={`url(#${id}-model)`} />
        <circle cx="92" cy="128" r="24" fill={`url(#${id}-human)`} />
      </g>

      <circle cx="200" cy="104" r="62" {...line} />
      <circle cx="92" cy="128" r="24" {...line} />
      <ellipse cx="180" cy="108" rx="150" ry="36" transform="rotate(-12 180 108)" {...line} />
      <circle cx="320" cy="90" r="2.5" {...ink} />
      <circle cx="40" cy="126" r="2.5" {...ink} />
    </>
  );
}

/** Grounded models: a sphere resting on the horizon, with roots into layered ground. */
function Roots({ id }: { id: string }) {
  return (
    <>
      <defs>
        <Grain id={`${id}-grain`} />
        <radialGradient id={`${id}-seed`} cx="0.35" cy="0.3" r="0.85">
          <Stop at={0} color="cream" />
          <Stop at={0.5} color="orange" />
          <Stop at={1} color="orange" />
        </radialGradient>
        <linearGradient id={`${id}-shade`} x1="0" y1="0" x2="0" y2="1">
          <Stop at={0.4} color="lavender" opacity={0} />
          <Stop at={1} color="blue" opacity={0.45} />
        </linearGradient>
        <linearGradient id={`${id}-ground`} x1="0" y1="0" x2="0" y2="1">
          <Stop at={0} color="orange" opacity={0.45} />
          <Stop at={0.6} color="lavender" opacity={0.25} />
          <Stop at={1} color="cream" opacity={0} />
        </linearGradient>
        <radialGradient id={`${id}-sun`}>
          <Stop at={0} color="lavender" opacity={0.7} />
          <Stop at={1} color="lavender" opacity={0} />
        </radialGradient>
      </defs>

      <g filter={`url(#${id}-grain)`}>
        <circle cx="292" cy="46" r="40" fill={`url(#${id}-sun)`} />
        <rect x="0" y="140" width="360" height="60" fill={`url(#${id}-ground)`} />
        <circle cx="180" cy="92" r="48" fill={`url(#${id}-seed)`} />
        <circle cx="180" cy="92" r="48" fill={`url(#${id}-shade)`} />
      </g>

      <circle cx="292" cy="46" r="13" {...line} />
      <circle cx="180" cy="92" r="48" {...line} />
      <path d="M0 140H360" {...line} />
      <path d="M0 168H360" {...line} strokeOpacity={0.3} />
      <path d="M180 140C178 160 160 172 148 200M180 140V200M180 140C183 162 202 174 216 200" {...line} />
    </>
  );
}

/** Runs where you work: layered ridges under a low sun, a goat on the summit. */
function Terrain({ id }: { id: string }) {
  const ridge = "M0 150L90 82L150 124L222 58L360 158";
  const hill = "M0 176C80 142 160 150 230 168S330 164 360 148";
  return (
    <>
      <defs>
        <Grain id={`${id}-grain`} />
        <radialGradient id={`${id}-glow`}>
          <Stop at={0} color="orange" opacity={0.6} />
          <Stop at={1} color="orange" opacity={0} />
        </radialGradient>
        <linearGradient id={`${id}-back`} x1="0" y1="0" x2="0" y2="1">
          <Stop at={0} color="lavender" />
          <Stop at={1} color="cream" opacity={0.2} />
        </linearGradient>
        <linearGradient id={`${id}-front`} x1="0" y1="0" x2="0" y2="1">
          <Stop at={0} color="blue" opacity={0.7} />
          <Stop at={1} color="lavender" opacity={0.15} />
        </linearGradient>
      </defs>

      <g filter={`url(#${id}-grain)`}>
        <circle cx="262" cy="64" r="72" fill={`url(#${id}-glow)`} />
        <path d={`${ridge}V200H0Z`} fill={`url(#${id}-back)`} />
        <path d={`${hill}V200H0Z`} fill={`url(#${id}-front)`} />
      </g>

      <circle cx="262" cy="64" r="15" {...line} />
      <path d={ridge} {...line} />
      <path d={hill} {...line} />
      <circle cx="222" cy="58" r="2.5" {...ink} />
    </>
  );
}

const art = { loop: Loop, roots: Roots, terrain: Terrain };

export function ServiceArt({ name, className }: { name: ServiceArtName; className?: string }) {
  const id = useId().replace(/:/g, "");
  const Art = art[name];
  return (
    <svg viewBox="0 0 360 200" aria-hidden="true" className={className}>
      <Art id={id} />
    </svg>
  );
}
