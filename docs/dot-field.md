# Dot field

An animated grid of dots that reacts to the cursor. It is one of the most recognizable visual elements of the GoatAI brand: it is the hero visual on the home page and the background of the "Ask the goat anything" section.

Source: [src/components/dot-field.tsx](../src/components/dot-field.tsx)

## Anatomy

From back to front, a dot field is made of up to five layers:

1. **Background.** Either the animated gradient or a flat color set on the container.
2. **Gradient** _(optional)_. Soft color areas ("blobs") in blue, periwinkle and coral that slowly drift and blend into each other. Colors are mixed in OKLab, so the blends look even to the eye.
3. **Grain** _(only with the gradient)_. A light film-grain noise on top of the gradient, re-drawn 24 times per second.
4. **Dots.** A regular grid of square cells, centered in the container with the same gap to the edge on all four sides (the spacing is nudged by up to 6% to make the gaps match; on near-square boxes a difference of a few pixels can remain). Each dot gets one of three sizes at random (small, medium, large), always the same across reloads.
5. **Labels** _(optional)_. Some grid points carry a label: a bigger dot that grows into a pill with text (the "dot-to-chip morph").

Content passed as children is rendered on top of all layers.

## Behavior

- **Shimmer.** At rest, dots slowly pulse in size and opacity, in a wave that runs diagonally across the grid.
- **Cursor.** Dots near the cursor grow and move away from it, with a springy motion.
- **Ripple.** Clicking anywhere sends a wave through the grid.
- **Labels.** Every few seconds a random label opens on its own and closes after a while (at most 3 open at once). Hovering a label dot opens it, with a smaller ripple, and keeps it open while the cursor is on it.
- **Reduced motion.** With the system "reduce motion" setting on, the gradient and shimmer slow down, the grain stops changing and labels no longer open on their own.
- **Off screen.** Animation pauses when the field is not visible.

## Settings

Every knob lives in `dotFieldDefaults` at the top of the source file. A single instance can override any of them through the `settings` prop. Colors are not settings: they come from the palette in [src/app/colors.css](../src/app/colors.css).

| Group | Settings | What they control |
|---|---|---|
| Gradient | `driftSpeed`, `sway`, `blobTightness`, `colorSharpness`, `grain`, `grainFps` | Speed and shape of the color areas, grain strength |
| Dots | `spacing`, `spacingMobile`, `dotSmall`, `dotMedium`, `dotLarge`, `labelDot`, `shimmer`, `shimmerSpeed` | Grid density (target 30px, 26px under 640px wide, adjusted by up to ±6% to even out the margins), dot sizes, idle pulse |
| Cursor | `influence`, `magnify`, `repel`, `hoverRadius` | How far the cursor reaches and how much dots grow and move |
| Ripple | `ripple`, `rippleSpeed`, `rippleLife` | Strength, speed and duration of the click wave |
| Labels | `labelEvery`, `labelHold`, `maxOpen`, `morphMs`, `hoverLinger` | Timing of automatic labels and of the morph |
| Fade | `fadeStart`, `fadeMin`, `fadeMax` | Where and how strongly dots fade toward the top (only with `fade`) |

The position, color and drift of each gradient blob is set in the `blobs` array, right below the settings.

### Props

| Prop | Default | Effect |
|---|---|---|
| `gradient` | `true` | Draws the animated gradient and grain. When `false`, set the background with `className`. |
| `dotColor` | `"background"` | Palette variable the dots are drawn with. |
| `fade` | `false` | Dots fade in from the top. |
| `labels` | none | Label texts and positions, `x` and `y` from 0 to 1. Each snaps to the nearest grid point. |
| `settings` | none | Overrides for any value in `dotFieldDefaults`. |

## Variants

### Gradient dot field

Also called "dot field over gradient". Cream dots on the animated blue / periwinkle / coral gradient, with grain and labels.

- **Used in:** the home page hero ([src/components/hero-visual.tsx](../src/components/hero-visual.tsx)).
- **Labels:** the GoatAI capabilities, defined in `capabilities` in [src/lib/content.ts](../src/lib/content.ts).
- **Code:** `<DotField labels={capabilities} />`, all other props at their defaults.

### Faded dot field

Brand-blue dots on a flat dark background (`--ink`). Dots fade in from the top, so the upper part of the section stays almost empty and the content sits on a calm area. No gradient, no grain, no labels.

- **Used in:** the "Ask the goat anything" section ([src/components/ask-section.tsx](../src/components/ask-section.tsx)), on the home and contact pages.
- **Code:** `<DotField gradient={false} dotColor="brand" fade className="bg-foreground …" />`

## Do / Don't

- Do take every color from the palette in `colors.css`, never a hard-coded value.
- Do keep labels short (one to three words): an open pill must fit inside the field on mobile.

_More rules to be defined as the variants evolve._
