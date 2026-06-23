# Forji Tasks

## Task: Propose refinements for the Episode peek flip-card UI

### Context

The previous task improved the peek flip-card back panel in:

`src/components/talk/ConversationBubble.astro`

The peek flip card is used on:

`/topics/sql/episode/peek-test`

The current direction is good, but we want your implementation proposal before applying the next changes.

### Desired refinements

#### 1. Back-side flip button position

The back side should feel like the reverse side of the same card.

The back-side flip button should appear on the opposite side from the character image on the front side.

Rules:

- If the front character image is on the right, the back-side flip button should be fixed at the bottom-left.
- If the front character image is on the left, the back-side flip button should be fixed at the bottom-right.

Example:

- Arca's front image is on the right, so Arca's back-side flip button should be on the left.
- Nemi's front image is on the left, so Nemi's back-side flip button should be on the right.

#### 2. Back-side character image position

The subtle back-side character image should also appear on the opposite side from the front character image.

Rules:

- If the front character image is on the right, place the back-side character image on the left.
- If the front character image is on the left, place the back-side character image on the right.

Keep the existing back-side visual treatment:

- horizontally flipped
- grayscale
- low opacity
- subtle embossed feel if possible

#### 3. Mobile bug: duplicate flip buttons

On mobile, the back side currently shows flip buttons on both the left and right edges.

Please propose a fix so only one flip button is visible on the back side.

For Arca, since the front image is on the right, only the left-side back button should appear.

The hidden or inactive button should not be visible or clickable.

#### 4. Mobile bug: clipped back-side text

On mobile, the back-side text does not fully fit inside the panel.

Please propose a fix so all back-side text can be read.

Possible directions:

- responsive spacing and padding
- reducing layout pressure from the avatar
- allowing the back-side text area to scroll if needed
- keeping `white-space: pre-wrap`
- preventing the flip button from overlapping the text

### Design notes

- The back side should feel like a reversed version of the front side.
- Keep the design quiet, polished, and consistent with the current dark episode UI.
- Do not make the flip button visually loud.
- Preserve the current flip animation if possible.
- Avoid making the card feel unstable.

### Request

Please do not implement yet.

First, inspect the current `ConversationBubble.astro` implementation and propose your approach.

Please answer with:

1. What you think is causing the duplicate mobile flip buttons.
2. What you think is causing the mobile text clipping.
3. How you would determine the front character side and place the back-side button/avatar on the opposite side.
4. The CSS or structure changes you recommend.
5. Any risks or tradeoffs.
6. Whether you think this should be solved with CSS only, or whether the component structure should be adjusted.

---

## Forji's proposal (response)

Build status before proposing: **clean** — 15 pages built, no errors; `peek-test`
page generated successfully.

### 1. Cause of duplicate flip buttons on mobile

The markup has only **one** back button (`ConversationBubble.astro:113`), so this is
a rendering artifact, not duplication.

The flip uses `transform-style: preserve-3d` + `backface-visibility: hidden`. On
mobile WebKit this combination is unreliable and the 3D context **flattens**. When
it does:

- the front face stops being hidden → the **front** button (`.flip-btn` at
  `right: 0.6rem`) stays visible;
- the back face's `rotateY(180deg)` collapses to a 2D mirror, so the **back** button
  — also at `right: 0.6rem` — appears mirrored on the **left**.

Result: one button on each edge. It worsens once the back button is intentionally
moved to the opposite side.

### 2. Cause of mobile text clipping

`.flip-back` is `position: absolute; inset: 0`, so its height is **locked to the
front face's height**. On narrow screens the monospace SQL wraps to more lines than
the short front dialogue, exceeding that fixed height — and `.flip-back { overflow:
hidden }` clips the surplus. The 52px avatar floor contributes slightly; the dominant
factor is back-text wrapping.

### 3. Determining front side & placing back elements opposite

No JS needed — the side is known statically via `isRight = speaker === "arca"`.
Thread it onto the **back face** as a modifier class and let CSS mirror both back
elements:

```astro
<div class={`flip-face flip-back${isRight ? " is-front-right" : ""}`}>
```

- Default (Nemi, front image left) → back button + portrait on the **right** (current).
- `.is-front-right` (Arca) → override both to the **left**.

### 4. Recommended changes (all in `ConversationBubble.astro`)

**a. Opposite-side placement** (only markup change — one conditional class):

```css
.flip-back.is-front-right .flip-btn--back     { right: auto; left: 0.6rem; }
.flip-back.is-front-right .peek-back-portrait { right: auto; left: 0; } /* keeps scaleX(-1) */
```

**b. Single visible/active button — independent of `backface-visibility`:**

```css
.flip-front,
.flip-back { transition: opacity 0s linear 210ms; } /* swap at the 420ms rotate midpoint */
.flip-inner:not(.is-flipped) .flip-back  { opacity: 0; pointer-events: none; }
.flip-inner.is-flipped       .flip-front { opacity: 0; pointer-events: none; }
```

**c. Text clipping:**

```css
.flip-back { overflow-y: auto; -webkit-overflow-scrolling: touch; }

@media (max-width: 720px) {
  .peek-back-text { font-size: 0.82rem; line-height: 1.65; }
  .flip-back { padding-bottom: 2.6rem; }
}
```

### 5. Risks / tradeoffs

- The `210ms` swap is coupled to the `420ms` rotate — must stay in sync if the
  duration changes; will be commented.
- Back button and portrait share the same corner by design; button `z-index: 3`
  keeps it above the faint portrait.
- `overflow-y: auto` may show a scrollbar on long peeks (acceptable; stylable).
- `backdrop-filter: blur` degrades gracefully where unsupported.

### 6. CSS-only or restructure?

**Almost entirely CSS**, plus **one** conditional class (`is-front-right`) on the
back face. No restructuring, no JS changes, flip animation preserved. The current
structure is sound — no rework recommended.
