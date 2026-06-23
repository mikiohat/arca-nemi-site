# Forji Tasks

## Consultation: public route names & display labels for the SQL learning structure

Recommendation and reasoning only — nothing implemented.

### TL;DR recommendation

Keep the IA **topic-first**, and make the section word **identical** across URL,
label, and breadcrumb. Rename the public sections:

- narrative: `episode` → **`stories`** / label **"Stories"**
- hands-on: `playground` → **`lab`** / label **"Lab"**

```text
/topics/sql                  → "SQL"            (topic hub)
/topics/sql/stories          → "Stories"        (narrative index)
/topics/sql/stories/<slug>   → "<Story Title>"  (one story)
/topics/sql/lab              → "Lab"            (hands-on index)
/topics/sql/lab/<slug>       → "<Exercise>"     (one exercise)
```

Same shape scales cleanly: `/topics/python/stories`, `/topics/python/lab`, etc.

---

### 1. Should public URLs and display labels use the same words?

**Yes — this is the most important rule here.** The whole concern (URL says
`episode`, UI says "Stories") is a vocabulary split. One word per concept, used in
the URL segment, the nav label, the page title, and the breadcrumb, removes ambiguity
for both visitors and maintainers. Divergent words are the main thing to avoid.

### 2. `episode/playground` or rename to `stories/lab`?

**Rename to `stories` / `lab`.**

- "Episode" carries a serialized-TV connotation and reads awkwardly as "SQL Episode".
  "Stories" is warmer, matches narrative content, and pluralizes naturally as a
  collection label.
- "Lab" is shorter and clearer than "Playground" for structured, hands-on practice;
  "Playground" leans toward unstructured free play. "SQL Lab" / "Python Lab" read
  well and stay short in nav and breadcrumbs.
- Both are plain, non-cute words — they describe the experience without gimmick,
  satisfying the "no cute labels that hurt clarity" goal.

So: narrative **Option B** (stories/Stories), hands-on **Option B** (lab/Lab).

### 3. Best URL structure

```text
/topics/<topic>/<section>/<slug>
```

- **Topic-first** — visitors arrive topic-first, so the topic stays the primary axis.
- **Lowercase, hyphenated slugs.**
- **Section words:** `stories` (plural — it's a collection) and `lab` (singular — it's
  a place, not a countable collection). Keep each word's number fixed and never mix
  `story`/`stories`.
- Index pages live at the section root (`/topics/sql/stories`), individual items one
  level down. This avoids a 4th option (Option C `story`) that would force the awkward
  singular label "Story" on a list page.

### 4. Breadcrumbs

Each crumb maps 1:1 to a URL segment and uses the **same word** as the label:

```text
Topics  ›  SQL  ›  Stories  ›  Even an AI Wants to Fall in Love
Topics  ›  SQL  ›  Lab      ›  SELECT basics
```

`Topics → /topics`, `SQL → /topics/sql`, `Stories → /topics/sql/stories`, leaf = item
title (not linked). No word changes between the URL and the trail.

### 5. Should internal names like `EpisodeRenderer` stay?

**They can stay short-term, but I recommend aligning them in a dedicated follow-up.**

- Nothing *functionally* breaks if the code keeps `Episode*` while URLs say `stories` —
  internal names are not user-visible.
- But keeping `episode` in code while the public IA says `stories` just relocates the
  exact inconsistency you're removing — from the URL/UI seam to the
  maintainer/code seam. Over time that costs onboarding clarity.
- Pragmatic path: **do the public rename first** (routes, labels, breadcrumbs, nav,
  topic config), ship it, then rename internals (`EpisodeRenderer → StoryRenderer`,
  `episodes/` content dir, `sqlEpisodeRegistry`) as a separate, low-risk refactor. If
  internals are left as-is for now, add a one-line note that `episode == story` so the
  mapping is explicit.

### 6. Migration risks to watch

- **External URLs / SEO:** `/topics/sql/episode/*` and `/topics/sql/playground/*` may
  be bookmarked or indexed. Add **301 redirects** old → new (`episode→stories`,
  `playground→lab`) via Astro redirects so links and search ranking survive.
- **Internal link breakage:** ~18 files reference `episode`, ~13 reference
  `playground` (e.g. `Header.astro`, `FloatingSwitcher.astro`, `LedgerIndex.astro`,
  `consts/topics.ts`, `content/ledger/sql.ts`, `format.ts`, `index.astro`,
  `ja/index.astro`). All section links must change together or nav breaks.
- **Slug/route generation:** content dirs `src/content/scripts/sql/episodes/` and
  `.../playground/`, plus `sqlEpisodeRegistry.ts` and `utils/format.ts`, may feed
  slugs. Confirm whether folder names drive URLs before renaming folders.
- **Data-shape fields:** `content/ledger/sql.ts` and `types.ts` use `episode`-named
  fields/keys; renaming the concept may ripple into types.
- **Sitemap & canonicals:** regenerate sitemap; check for any hardcoded canonical URLs.
- **Pluralization bugs:** lock `stories` (plural) and `lab` (singular) everywhere;
  a stray `story`/`labs` will 404.
- **Decide once:** finalize names now to avoid a second rename and another round of
  redirects/churn later.

### 7. Recommended final naming scheme

| Concept        | URL segment | Display label | Breadcrumb | Suggested code term |
| -------------- | ----------- | ------------- | ---------- | ------------------- |
| Topic          | `sql`       | `SQL`         | `SQL`      | topic               |
| Narrative      | `stories`   | `Stories`     | `Stories`  | `Story` / `StoryRenderer` |
| Narrative item | `<slug>`    | story title   | title      | story               |
| Hands-on       | `lab`       | `Lab`         | `Lab`      | `Lab`               |
| Hands-on item  | `<slug>`    | exercise name | name       | exercise            |

```text
/topics/sql/stories
/topics/sql/stories/<slug>
/topics/sql/lab
/topics/sql/lab/<slug>
```

**Why this fits the priorities**

- *Clarity for visitors:* warm, plain words; the URL always matches what's on screen.
- *URL/UI consistency:* one word per concept across URL, label, and breadcrumb.
- *Simple implementation:* same `/topics/<topic>/<section>/<slug>` pattern everywhere;
  only the two section words change.
- *Future topics:* `python/stories`, `python/lab` need no new rules.
- *Avoids churn:* names chosen to be final, with 301s so the one move is the last move.
