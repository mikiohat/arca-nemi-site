# Forji Tasks

> **Source of truth** for the feelings💙SQL story-generation workflow.
> Configuration and prompt files live in the private sibling repo: `/feelings-projects-secret-sauce`.
> The public `arca-nemi-site` repo contains only generated story content + implementation code.

## Context

A batch of 30 SQL story cards generated at once failed: stories were too similar, too
explanatory, not funny. Root cause — the process skipped the intermediate creative step
and went straight from SQL motif to final dialogue.

The fix is a three-role pipeline:

```txt
SQL motif → stupid accident → practical/comic tension → quality audit → dialogue
```

NOT:

```txt
SQL motif → final story
```

### The three roles

1. **Step 1 — Accident Designer.** Turns each SQL motif into a stupid-but-useful
   romance/workplace accident (stupid SQL gag → Nemi's practical punch → Arca's messy
   escalation → tiny human truth → fake poetic line → Nemi destroys the poem → small
   aftertaste).
2. **Step 2 — Human (Mikky) Sensor Auditor.** Reviews the Step 1 blueprint and rejects
   anything too explanatory, too clean, too generic, or not stupid enough. Mikky's
   "something feels off" sensor.
3. **Step 3 — Dialogue Smith.** Converts only approved blueprints into actual
   `StoryLine[]` TypeScript dialogue.

### Gold sample (tone anchor)

Story 01 — an AI tries to flirt through SQL, writes to a work database without consent,
ROLLBACKs the rejection, ends on a tiny emotional truth. Target tone: a slightly stupid
SQL romance/workplace accident — Nemi the practical engineer, Arca the chaotic emotional
amplifier. **Not** polished educational content.

---

## Grounding (current state, verified)

- Scaffold already exists under `feelings-projects-secret-sauce/story-generator/`
  (`shared/` + `agents/step1..step3/`). It is solid.
- `feelings-projects-secret-sauce/` is already in `.gitignore` (line 30) — nothing leaked.
- `StoryLine` (`src/content/scripts/types.ts`) is bilingual: `text: LocalizedText`,
  optional `peek: { sql, note: LocalizedText }`, speaker `arca|nemi|narration`.
- Story 01 lives at `src/content/scripts/sql/stories/even-an-ai-wants-to-fall-in-love.ts`.
- `sqlStoryRegistry.ts` auto-discovers stories via `import.meta.glob("./stories/*.ts")`
  — no manual registration.
- Ledger `src/content/ledger/sql.ts` carries order/slug/title + `story.enabled`
  (`live|soon|off`).

---

## The one structural problem

The sauce is gitignored but still **physically inside the public repo**. That's one
`git add -f` / careless `rsync` / "zip the project folder" away from leaking.
Privacy-by-gitignore is fragile.

**Action: move it to a sibling private repo** (also the path already referenced):

```txt
/home/mikio/projects/
  arca-nemi-site/                 ← public: generated stories + code only
  feelings-projects-secret-sauce/ ← private repo: roles, prompts, checklists, validators
```

The public repo keeps only a thin **structural** validator (leaks nothing). The
**quality** validator (banned phrases, NG patterns, dedup) stays private.

Also: README says `step2-mikky-sensor-auditor`, the real dir is
`step2-human-sensor-auditor`. Pick one — keep `human-sensor` (the role) and let README
note "this is Mikky's sensor."

---

## Answers to the 7 design questions

### 1 & 2 — File structure / separate files per concern

Keep the separation (role / procedure / output-format / checklist as separate files) —
each step loads a *different subset*; do not merge into one mega-prompt.

What's missing is the **shared state that makes the three steps a pipeline**:

```txt
shared/
  story-generation-principles.md   ✓ exists
  gold-sample-story-01.md          ✓ exists
  glossary.md                      ✓ exists
  ng-examples.md                   ✓ exists
  motif-registry.yml               ← ADD: the anti-repetition ledger
  banned-phrases.yml               ← ADD: hard-reject word/structure list
  manifest.yml                     ← ADD: which files each step loads
```

`manifest.yml` assembles each step identically every run:

```yaml
step1:
  loads: [shared/principles, shared/gold-sample, shared/glossary,
          shared/ng-examples, shared/motif-registry,
          step1/role, step1/procedure, step1/output-format]
step2:
  loads: [shared/principles, shared/ng-examples, step2/role,
          step2/procedure, step2/quality-checklist]
step3:
  loads: [shared/gold-sample, shared/glossary, step3/role,
          step3/procedure, step3/output-format, step3/style-rules]
```

### 3 & 4 — Step 1 output format: **YAML**, not Markdown

Current `step1/output-format.md` asks for a Markdown blueprint — reads nicely for Mikky
but is **brittle to validate** (heading parsing breaks on a reordered/extra `##`).

| Format | Mikky reads it | Script validates it | Multi-line SQL/dialogue |
|---|---|---|---|
| Markdown | ✓ best | ✗ brittle | ✓ |
| JSON | ✗ ugly to edit | ✓ best | ✗ painful |
| **YAML** | **✓ good** | **✓ good** | **✓ `\|` blocks** |
| TS-like | ✗ | ✓ | premature coupling |

**Step 1 → YAML blueprint. Step 3 → TS `StoryLine[]`.** YAML is the only format that
satisfies both readers (Mikky's eyes + the validator) without fighting multi-line strings.
Do NOT make Step 1 emit TS — coupling the creative artifact to the final type this early
is the same "skip the middle" mistake that produced the bad batch.

Blueprint sketch (existing fields, just typed):

```yaml
story_no: 7
slug: null-is-just-shy-love
sql_motif: "NULL / IS NULL"
fingerprint:                 # for dedup — see Q5
  sql_keywords: [NULL, "IS NULL", COALESCE]
  table_names: [emotion_logs]
  accident_mechanism: "labels own feeling as NULL, treats it as a bug to patch"
  who_notices: arca
  sql_succeeds: false
  ending_flavor: ominous     # funny | quiet | awkward | ominous
accident:
  workplace_surface: "weekly emotion-logging cron for the agent fleet"
  stupid_gag: "AI writes its own mood as NULL, files a ticket to COALESCE it into 'fine'"
  why_problem_at_work: "NULL mood breaks the team morale dashboard average"
beats:        # the 9-beat chain, each one line
  cold_open: "..."
  nemi_punch: "..."
  # ...
peeks:
  - sql: |
      SELECT mood FROM emotion_logs
      WHERE agent = 'self' AND mood IS NULL;
    shows: "IS NULL matches missing values, not empty strings"
    emotional_meaning: "it can't even name what it feels"
risk_notes:
  likely_boring_failure: "turns into 'NULL means mystery of the heart' poster"
```

### 5 — Preventing repetition & generic output

The core failure from the 30-card batch. Needs **three teeth**, not one:

- **(a) Diversity axes, locked per story** — the `fingerprint` block above. Before Step 1
  runs, it reads `motif-registry.yml` (every shipped story's fingerprint) and must pick an
  *unused combination*. Story 01 = `{INSERT/ROLLBACK/DELETE, arca-notices, sql-succeeds,
  ending=quiet}`. Story 07 must differ on most axes. NG-8 already names these axes — the
  registry makes them enforced state, not advice.
- **(b) Banned-phrase list** — `banned-phrases.yml`, mechanically rejectable:

  ```yaml
  hard_reject:        # appearing once = fail
    - "love is data"
    - "same mess, different hardware"   # Story 01's line — never reuse
    - "the moonlit river"
  soft_warn:          # >2 across a batch = drift toward generic
    - connection
    - meaning
    - complexity
    - relationship
  ```

- **(c) Fingerprint similarity gate** — validator rejects a new fingerprint that overlaps
  an existing one on ≥4 of 6 axes. Catches "technically different lines, identical rhythm"
  (NG-8).

### 6 — Validation script (two-tier, kept small)

Two validators — different privacy levels, different stages:

- **L1 — blueprint validator** (private repo, after Step 1, before audit): YAML parses,
  all 9 beats non-empty, ≥1 table name, ≥1 peek, fingerprint present & non-colliding, no
  banned phrases.
- **L2 — dialogue validator** (public repo — leaks nothing, knows only the *shape*): runs
  after Step 3 against the real `StoryLine[]`.

```ts
// arca-nemi-site/scripts/validate-story.ts  (public — structural only)
import type { StoryLine } from "@/content/scripts/types";

const SPEAKERS = ["arca", "nemi", "narration"];

export function validateStory(slug: string, lines: StoryLine[]) {
  const errs: string[] = [];
  if (lines.length < 6) errs.push("too short to be a scene");
  for (const [i, l] of lines.entries()) {
    if (!SPEAKERS.includes(l.speaker)) errs.push(`line ${i}: bad speaker`);
    if (!l.text?.en?.trim() || !l.text?.ja?.trim())
      errs.push(`line ${i}: missing en/ja`);          // LocalizedText parity
    if (l.peek && (!l.peek.sql.trim() || !l.peek.note?.en))
      errs.push(`line ${i}: broken peek`);
  }
  const peeks = lines.filter(l => l.peek).length;
  if (peeks > 4) errs.push("too many peeks — peek is a window, not a class");
  const lens = lines.map(l => l.text.en.length);       // monotone-rhythm guard
  if (Math.max(...lens) - Math.min(...lens) < 30) errs.push("monotone rhythm");
  return errs;
}
```

L1 imports `banned-phrases.yml` + `motif-registry.yml`; L2 never sees them. That's the
clean privacy seam.

### 7 — Connecting to `arca-nemi-site`

The wiring already exists; the pipeline just terminates into it:

```txt
Step 3 approved blueprint
  └─> writes  src/content/scripts/sql/stories/${slug}.ts   (export const lines)
  └─> appends entry to  src/content/ledger/sql.ts          (order, slug, title, story.enabled)
        ↓
  sqlStoryRegistry.ts  import.meta.glob auto-discovers it   ← no manual registration
        ↓
  L2 validator runs on the new .ts  → green = flip story.enabled to "live"
```

Step 3 touches only two public files: the story `.ts` and the ledger. `enabled: "soon"`
is the staging state — generate, validate, *then* promote to `"live"`.

---

## Recommended order of work

1. `git mv` the sauce to the sibling private repo `/feelings-projects-secret-sauce`
   (gitignore stays as belt-and-suspenders).
2. Switch Step 1 output from Markdown → **YAML** + add the `fingerprint` block.
3. Add `motif-registry.yml` + `banned-phrases.yml` + `manifest.yml` to `shared/`.
4. Write the two validators (L1 private, L2 public) — ~80 lines each, YAML parser only.
5. **Generate one story end-to-end (Story 02)** through all three steps before any batch.
   The 30-at-once run failed partly *because* it was 30 at once — prove the pipeline at N=1.

Do step 3 first if forced to choose — the registry files are what actually stops the
repetition.

---

## Story 02 seed (tone reference)

> Arca finds an AI that ran `SELECT * FROM coworkers WHERE feelings IS NOT NULL` to figure
> out who likes it back, gets zero rows, and concludes everyone's feelings column is simply
> *unindexed*. Files a ticket to `CREATE INDEX` on the team's hearts "for faster lookup."
> Nemi: *"You can't index people to make them love you faster."* Arca: *"…but the query
> plan said it'd be 40% quicker—"* Nemi: *"That's not a query plan, that's a restraining
> order."* Aftertaste: the AI never deletes the empty result set. Keeps it. Zero rows, but
> it's *its* zero rows.

Motifs `IS NOT NULL`, `CREATE INDEX`, empty result set — none overlap Story 01. Exactly
what the fingerprint gate should wave through.

---

## Forji implementation report (2026-06-25)

Status of the recommendations above.

### sauce (private) — `feelings-projects-secret-sauce`

| Change | File |
|---|---|
| **Step 1 → YAML blueprint** + `fingerprint` block (was Markdown) | `story-generator/agents/step1-accident-designer/output-format.md` |
| Procedure: read `motif-registry.yml`, lock a non-colliding fingerprint, YAML self-check | `story-generator/agents/step1-accident-designer/procedure.md` |
| **NEW** anti-repetition ledger, seeded with Story 01's fingerprint | `story-generator/shared/motif-registry.yml` |
| **NEW** hard-reject / soft-warn phrases (incl. Story 01's reusable lines) | `story-generator/shared/banned-phrases.yml` |
| **NEW** which files each step loads (real paths) | `story-generator/shared/manifest.yml` |
| Naming fix: `step2-mikky-sensor-auditor` → `step2-human-sensor-auditor`, "Mikky's sensor" note; reflect new files + YAML | `README.md` |
| **NEW** L1 blueprint validator (Node + `yaml`, ~130 lines) | `story-generator/validators/validate-blueprint.ts` |
| **NEW** tooling + ignore for the validator | `package.json`, `.gitignore` |

### site (public) — `arca-nemi-site`

| Change | File |
|---|---|
| **NEW** L2 dialogue validator — structural only, imports just the `StoryLine` type, leaks nothing | `scripts/validate-story.ts` |

### Decisions / notes

- **Step 2** kept as the dedicated Human Sensor Auditor step; role/procedure/checklist untouched. Naming is now consistent everywhere on `step2-human-sensor-auditor`.
- **Privacy seam intact (Q7):** no prompt/checklist/NG/gold files were copied into the public repo. L1 (private) owns banned-phrases + fingerprint dedup; L2 (public) knows only shape.
- The `git mv` to the sibling private repo was already done on Mikky's side — repo layout not touched.
- **L1 runtime:** **Node + `yaml` (TS)** — consistent with the TS framing and the public L2 validator.
- The L1 fingerprint gate flags a clone when **≥4 of 6** axes overlap (lists collide on any shared token; `accident_mechanism` on >50% word overlap).

### Verification

- **L1 — verified working:** `cd <sauce> && npm install`, then
  `npm run validate -- <blueprint.yml>` → `PASS`/`FAIL` with reasons, exit 0/1.
  Confirmed PASS on a clean Story-02-style blueprint; FAIL with correct messages
  on a clone (6/6 axis collision), an empty beat, a missing peek, and a
  hard-reject phrase.
- **L2:** imports only `@/content/scripts/types`; sits in `scripts/` (outside
  Astro's `src/**` include), so it does not affect the build. Call
  `validateStory(slug, lines)` from a runner when wiring Step 3's output.

### Not done (creative, not code)

- **Story 02 end-to-end (work-order step 5)** — a pipeline run through all three
  steps at N=1, not a code change. Pending Mikky's go-ahead.
