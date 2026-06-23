# Forji Tasks

## Review: updated story card template (`story_card/story-card-template.md`)

Opinion only — nothing implemented.

### 1. Overall assessment

Big step up; the revisions address most prior feedback.

- **Build metadata** block now exists with `route` / `data file` / `topic` / `series` —
  exactly the bridge that was missing.
- **Episode shape (Setup / Turn / Resolution)** is the right call — better than the old
  発端/incident①/葛藤/incident②/解決. A short conversational card shouldn't carry two
  key-incidents; three beats fit the format and won't feel formulaic across 30.
- **Peek is now correctly nested under a specific `Line`** (Line 3, Line 5) with
  `sql` + `note` — matches how the code works (peek is an attribute of a line, not a
  standalone beat). Fixed.
- **Per-line `emotion`** with `normal` default is usable as-is.
- **Design notes** (why this exists / keep simple / what not to explain yet) is a smart
  add for arc continuity.
- File rename to `story-card-template.md` is clearer.

Close to ready, but a few concrete mismatches with the live code remain.

### 2. Implementation concerns

1. **`enabled` type is wrong (blocker).** Template uses `story.enabled: true` /
   `lab.enabled: false` (boolean). The code's `PublishState` is
   `"live" | "soon" | "off"` — not boolean. As written it won't typecheck. Should be
   `story.enabled: live`, `lab.enabled: soon`.
2. **`Lines` looks capped at 6.** Numbered Line 1–5 + Final line, but shipped Story 01 is
   ~11 lines. Authors may read this as a fixed schema. It needs to read explicitly as
   variable-length (add as many lines as the scene needs; peek on any line with SQL).
3. **Missing JP title.** Ledger has `titleJa` (e.g. "AIだって恋したい"), but Metadata only
   has Title + JP Subtitle. Add `JP Title:` or it has to be invented.
4. **Peek join convention unstated.** `sql:` + `note:` are separate here, but in the
   content file `peek` is a single string rendered as: SQL block → blank line → note
   lines. State the join rule so every card converts deterministically (and confirm
   `note` may be multiple short lines).
5. **`emotion` / `speaker` allowed values not listed.** To avoid invalid values reaching
   `StoryLine`, list them inline: speaker = `arca | nemi | narration`;
   emotion = `normal | happy | anger | sad | joy`.

### 3. Suggested improvements

- Fix `enabled` to `live | soon | off`.
- Mark `Lines` as variable count; keep Line 1/3/Final as examples, not a fixed schema.
- Add `JP Title:` (and optionally `description` / `descriptionJa` — used for the page
  `<meta>`; can default from Subtitle if you'd rather not write them).
- The `- ## Field:` pattern inside Arc role / Character engine / Episode shape mixes a
  bullet with an H2 — renders oddly and is awkward to parse. Make them plain
  `- Field:`. Cosmetic, but it hurts the "structure clear" goal.
- One line stating the peek-string format (SQL, blank line, note).

### 4. Ready as source of truth?

**Almost — ready after two small fixes:** (a) `enabled` → `live/soon/off`, and (b) make
`Lines` explicitly variable-length. With those plus the `JP Title` field, a card converts
to `stories/<slug>.ts` + a `sqlLedger` entry mechanically, with no guessing. The
remaining items (markdown `## ` cleanup, peek-format note, value lists) are polish, not
blockers.

Net: structure and intent are right; it just needs to speak the code's exact vocabulary
(`PublishState`, variable lines, `titleJa`) to be a true source of truth.

Next action (pick one): apply these fixes to the template, or leave it to you. Nothing
touched yet.
