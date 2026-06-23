# Forji Tasks

## Review: story card template v3 (`story_card/story-card-template.md`)

Opinion only — nothing implemented.

### Overall assessment

Strong — this revision resolves the blockers from the last review. It now speaks the
code's vocabulary and reads as a true source of truth.

**Fixed since last review**

- `enabled` is now `live` / `soon` (with an explicit "Allowed publish states:
  live / soon / off" list) — matches `PublishState`. The boolean blocker is gone. ✅
- `Lines` is now explicitly **variable-length** ("add as many lines as the scene
  needs; a peek can be attached to any line"), with without-peek / with-peek / final
  examples instead of a fixed 1–5 schema. ✅
- `JP Title` added; `Description` / `JP Description` added — the ledger entry
  (`title` / `titleJa` / `description` / `descriptionJa`) can now be filled with no
  guessing. ✅
- Allowed **speakers** (`arca | nemi | narration`) and **emotions**
  (`normal | happy | anger | sad | joy`) are listed inline — invalid values can't slip
  into `StoryLine`. ✅
- **Peek format** is now specified (sql + note, joined as SQL block → blank line →
  note lines). Deterministic conversion. ✅

### Remaining concerns

1. **Bilingual fields exceed what the renderer consumes today (decision needed).**
   Lines now carry `line.en` / `line.ja`, and peek notes carry `note.en` / `note.ja`.
   Good future-proofing — but the current code is single-language: `StoryLine` has one
   `text` and one `peek` string, the `[slug]` route renders one locale, and there is no
   JA story route. So today an author's `ja` text has nowhere to render.
   - If EN-only for now: fine — converter just uses `.en`; keep `.ja` as a parked draft.
   - If JA stories are wanted soon: that's a code change first (StoryLine carries both
     languages + a locale switch + a JA route), not just a content task. Worth deciding
     before authoring 30 cards in two languages.

2. **`- ## Field:` markdown still present (cosmetic).** In Arc role, Character engine,
   Episode shape, and the peek `note` (`- ## en:` / `- ## ja:`), a bullet wraps an `##`
   that isn't a real heading — it renders as literal "## en:" text and is awkward to
   parse. Plain `- Field:` / `- en:` would be cleaner. Not a blocker.

### Minor / optional

- `route` and `data file` are derivable from `slug`
  (`/topics/sql/stories/<slug>` and `src/content/scripts/sql/stories/<slug>.ts`) — keep
  them explicit or note they're derived.
- Ledger also has optional `summary` / `summaryJa`; not currently used by the index, so
  not needed in the card.

### Ready as source of truth?

**Yes — ready to use.** The blockers are resolved and a card now converts to
`stories/<slug>.ts` + a `sqlLedger` entry mechanically. The only thing to settle before
scaling to 30 is concern #1: confirm **EN-only for now** (use `.en`, park `.ja`), or
schedule the bilingual rendering work in code first. The `## ` cleanup is polish.
