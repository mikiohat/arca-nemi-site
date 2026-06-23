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
