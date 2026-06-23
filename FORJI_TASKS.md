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

---

## Follow-up consultation: hover highlight and back-side scroll/button layout

### Context

After reviewing the current UI, we want your opinion before implementing the next refinement.

There are two points:

1. The flip button hover state is still too subtle.
2. The back-side flip button overlaps the text when the back-side text area scrolls.

Please inspect the current `ConversationBubble.astro` structure and propose the cleanest implementation.

Do not implement yet.

### 1. Flip button hover highlight

The current hover effect is too quiet.

Please propose a stronger hover highlight for the circular flip button.

Direction:

- Keep it quiet and polished.
- Do not make it flashy.
- Make the circular background and border color easier to notice on hover.
- The icon may become slightly brighter, but the main change should be the circle around it.
- The button should clearly feel interactive when hovered.

### 2. Back-side flip button overlapping text

This is a design and structure concern.

On the back side, the text can scroll. The flip button currently overlaps the text.

We do not want to place the flip button at the end of the scroll content, because users might not see it unless they scroll. That would make them feel trapped or unsure how to return.

We also do not want to move the button to the top, because it looks less elegant.

Preferred direction:

- Keep the back-side flip button fixed at the bottom-left or bottom-right of the card.
- Do not make the button part of the scrollable text content.
- Make only the back-side text area scroll if needed.
- Add enough bottom padding to the scrollable text area so the text does not hide behind the button.
- If helpful, add a subtle bottom fade/gradient behind the fixed button area.
- Keep the button always visible and clickable.

Possible structure:

```text
flip-back
├─ peek-back-portrait   background / watermark layer
├─ peek-back-scroll     scrollable text only
└─ flip-btn--back       fixed layer, always visible
```

### Forji's proposal (response)

#### Current structure (back face)

```text
.flip-back              ← overflow-x:hidden; overflow-y:auto  (THIS is the scroller)
├─ .peek-back-portrait  ← absolute watermark, z-index:0
└─ .cb-body
   ├─ .peek-back-text   ← the text
   └─ .flip-btn--back   ← position:absolute, bottom-corner, z-index:3
```

**Why the button overlaps / drifts on scroll:** the scroll lives on `.flip-back`,
and the button is `position: absolute` *inside that same scroll container*.
Absolutely-positioned children scroll **with** their scroll container's content — so
as the text scrolls up, the button rides up with it and lands on top of the text. It
only looks fixed when there is nothing to scroll. The proposed structure is the right
fix.

#### 1. Flip button hover highlight

Make the **circle** the main signal: raise the fill, switch the border to the accent
color, tighten the glow into a clear ring. Icon brightens via the existing accent
color. No scale/animation, no neon.

```css
.flip-btn:hover {
  color: var(--fp-accent);
  background: rgba(99, 102, 241, 0.28);   /* was 0.16 — clearly filled */
  border-color: var(--fp-accent);          /* was soft border — now reads as active */
  box-shadow:
    0 0 0 3px rgba(99, 102, 241, 0.18),    /* quiet accent ring */
    0 4px 14px rgba(99, 102, 241, 0.30);
}
```

#### 2. Back-side button overlapping scrollable text

Needs a small structural change (CSS-only cannot fix it cleanly — the button must be
a sibling *outside* the scroller). Adopt the proposed layout:

```text
.flip-back              ← position:relative; overflow:hidden  (NO scroll, clips corners)
├─ .peek-back-portrait  ← absolute watermark, z-index:0
├─ .peek-back-scroll    ← the ONLY scroller: overflow-y:auto; flex:1; min-height:0; z-index:1
│  └─ .peek-back-text
└─ .flip-btn--back      ← absolute sibling, bottom-corner, z-index:3  → truly fixed
```

Markup change (back face only — replace the back's `.cb-body` with a dedicated
scroller, move the button out as a sibling):

```astro
<div class={`flip-face flip-back${isRight ? " is-front-right" : ""}`}>
  {avatarSrc && (<img ... class="peek-back-portrait" .../>)}
  <div class="peek-back-scroll">
    <p class="peek-back-text">{peek}</p>
  </div>
  <button class="flip-btn flip-btn--back" aria-label="Back to dialogue"> ... </button>
</div>
```

Supporting CSS:

```css
.flip-back { overflow: hidden; }            /* stop the face itself from scrolling */

.peek-back-scroll {
  flex: 1;
  min-width: 0;
  min-height: 0;                            /* required so it can actually scroll */
  width: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 2.4rem;                   /* clear the fixed button (2.6rem on mobile) */
  position: relative;
  z-index: 1;
}

/* subtle bottom fade behind the fixed button so text dissolves, not clips */
.flip-back::after {
  content: "";
  position: absolute;
  left: 0; right: 0; bottom: 0;
  height: 2.6rem;
  background: linear-gradient(to top, var(--fp-background-shadow), transparent);
  pointer-events: none;
  z-index: 2;                               /* above text, below the button (z-index:3) */
}
```

#### Risks / tradeoffs

- Small structural change to the back face (not CSS-only), but localized; front face
  and the flip animation are untouched.
- The `::after` fade uses `var(--fp-background-shadow)`; since the back background is
  a layered gradient, the fade is an approximation — worth a visual check.
- `.flip-back` reverts to `overflow: hidden`; scrolling moves to the inner element, so
  rounded-corner clipping is preserved and the watermark won't spill.
- `min-height: 0` on the scroller is required for it to scroll inside the flex column.

#### CSS-only or restructure?

Point 1 (hover) is pure CSS. Point 2 needs the minimal structural split above (one
wrapper + moving the button to a sibling). Everything stays inside
`ConversationBubble.astro`, no JS changes, animation preserved.
