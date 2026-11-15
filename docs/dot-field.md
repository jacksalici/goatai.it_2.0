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
| Depth fade | `depthKnee`, `depthKneeOpacity`, `depthSharpFrom`, `depthBlur` | Opacity ramp and progressive blur (only with `fade="depth"`) |

The position, color and drift of each gradient blob is set in the `blobs` array, right below the settings.

### Props

| Prop | Default | Effect |
|---|---|---|
| `gradient` | `true` | Draws the animated gradient and grain. When `false`, set the background with `className`. |
| `dotColor` | `"background"` | Palette variable the dots are drawn with. |
| `fade` | `false` | `true`: dots fade in from the top. `"depth"`: they also blur toward the top (see Depth dot field). |
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

- **Used in:** nowhere at the moment (the "Ask" section is trying the Depth dot field).
- **Code:** `<DotField gradient={false} dotColor="brand" fade className="bg-foreground …" />`

### Depth dot field

_Experimental._ A more refined Faded dot field: the dots also go out of focus toward the top, like a shallow depth of field. Same colors and background as the Faded dot field. Both effects depend only on the height, and each is tuned by its own settings (see Settings).

- **Opacity.** A vertical mask that multiplies the dot opacity: it grows from invisible at the top edge to full at the bottom edge in two linear segments. Up to a knee (`depthKnee`) it climbs slowly to a low opacity (`depthKneeOpacity`), then it climbs steeply to full. The top stays faint and most of the growth happens lower down, like an ease-in. The last row sits one spacing above the edge, so it is just under full.
- **Blur.** A progressive gaussian blur: dots are sharp near the bottom, up to a set height (`depthSharpFrom`), then the blur grows linearly to its maximum at the top (`depthBlur`, a Figma/CSS-style radius expressed as a fraction of the spacing, so it scales with the grid). The blur zone must overlap the visible part of the opacity ramp: if it only covers rows that are nearly invisible, it cannot be seen. The blur spreads a dot without changing its total opacity; overlapping halos stack as layers of the same color.
- **How it is drawn.** Each blurred row uses pre-rendered sprites (one per row and dot size), made once per resize, so the animation cost is the same as the Faded dot field. The blur scales with the dot when it grows under the cursor.
- **Used in:** the "Ask the goat anything" section ([src/components/ask-section.tsx](../src/components/ask-section.tsx)), on the home and contact pages.
- **Code:** `<DotField gradient={false} dotColor="brand" fade="depth" className="bg-foreground …" />`

## Do / Don't

- Do take every color from the palette in `colors.css`, never a hard-coded value.
- Do keep labels short (one to three words): an open pill must fit inside the field on mobile.
- Do give any semi-transparent element placed over the field (buttons, chips, messages) a backdrop blur, so the dots behind it turn into a soft texture and never compete with the text. Even when the text is already readable, keep it as a rule. Keep the blur close to the dot size and the fill light: a blur much larger than the dots spreads them until they vanish, and the element looks like a solid fill instead of glass. When matching a Figma design, its blur value is about twice the CSS `blur()` value.

_More rules to be defined as the variants evolve._
