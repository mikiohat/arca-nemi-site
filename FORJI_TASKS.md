# Forji Tasks

## Task: Improve the Episode peek flip-card UI

### Current context

The peek flip card is used on:

`/topics/sql/episode/peek-test`

The main related files are:

| File                                            | Role                                            |
| ----------------------------------------------- | ----------------------------------------------- |
| `src/content/scripts/sql/episodes/peek-test.ts` | Peek text content                               |
| `src/components/talk/ConversationBubble.astro`  | Flip-card UI, button, layout, styles, animation |
| `src/components/episode/EpisodeRenderer.astro`  | Connects episode lines to bubbles               |

The current peek content already uses real line breaks and looks like this:

```sql
INSERT INTO heart_links (sender_ai, receiver_ai, message)
VALUES ('Lovestruck AI', 'Beloved AI', 'I wanna JOIN your heart');

The lovestruck AI added a new heart-link request to the database.
INSERT INTO adds one new row to a table.
```

### Goal

Improve the visual design and usability of the back side of the peek flip card.

This is a design and UI refinement task, not a content rewrite task.

### Requirements

1. Make the circular flip button easier to notice, but do not make it visually loud.
2. Keep the flip button fixed at the bottom-right of the panel.
3. Prevent the flip button from disappearing, moving, or being pushed away when the text becomes long.
4. On the back side, show the character image as a subtle back-side visual:

   * horizontally flipped
   * grayscale
   * low opacity
   * slightly embossed if possible
5. Make the back-side text easier to read:

   * slightly larger font size
   * better line height
   * better spacing
   * enough bottom padding so the text does not overlap the flip button

### Design direction

The flip button should feel like a small glass-like control.

Good direction:

* subtle circular background
* soft border
* muted glow
* clear hover and focus states
* polished but quiet

Avoid:

* bright neon
* oversized button
* distracting animation
* layout changes that make the card feel unstable

### Implementation notes

In `src/components/talk/ConversationBubble.astro`:

* Set the card face or bubble container to `position: relative`.
* Position the flip button with `position: absolute`.
* Place it near the bottom-right corner.
* Give it a higher `z-index` than the text and avatar.
* Add enough `padding-bottom` to the card face so long text does not overlap the button.
* Keep the button in the same visual position on both the front and back sides.

For the back-side character image:

* Reuse the existing character image if possible.
* Apply a back-side style only when the card is flipped/back side is shown.
* Use CSS similar to:

  * `transform: scaleX(-1);`
  * `filter: grayscale(1) contrast(...) brightness(...);`
  * `opacity: 0.18` to `0.28`
* Keep it subtle. The SQL text should remain the main focus.

For the back-side text:

* Increase font size slightly.
* Improve line height.
* Keep `white-space: pre-wrap` so the line breaks from `peek-test.ts` continue to render correctly.
* Do not convert the peek text to Markdown unless absolutely necessary.

### Acceptance checklist

* The flip button is always visible.
* The flip button stays at the bottom-right of the panel.
* Long peek text does not hide or push away the button.
* The back-side text is easier to read than before.
* The back-side character image feels visually distinct from the front side.
* The overall design still matches the dark polished episode UI.
