# Forji Tasks

## Peek feature — overview

The peek page (`/topics/sql/episode/peek-test`) is driven by three files:

| File | Role |
|------|------|
| `src/content/scripts/sql/episodes/peek-test.ts` | The **text / content** — dialogue lines + `peek:` strings |
| `src/components/talk/ConversationBubble.astro` | The **interface** — flip-card UI, button, styles, animation |
| `src/components/episode/EpisodeRenderer.astro` | Wires lines → bubbles |

### How peek works

Any line with a `peek:` field renders as a flip card. The front shows the
dialogue plus a circular "flip" button; clicking it rotates the card 180° to
reveal the `peek` text (monospace, the SQL explanation) on the back.

### Notes on current content

- Only **one** line has a peek (Arca's `INSERT` joke).
- The peek string uses **full-width spaces (`　`)** as separators instead of
  line breaks. Since `.peek-back-text` is `white-space: pre-wrap`, real `\n`
  would render as separate lines — useful to know if restructuring it.

### Where to edit

- **Peek text** → `src/content/scripts/sql/episodes/peek-test.ts`
- **Peek interface** (button, flip animation, layout, colors, fonts) →
  `src/components/talk/ConversationBubble.astro`
