# Forji Tasks

## Assessment: bilingual (EN/JA) site architecture

Opinion only — nothing implemented.

### Current state (grounding)

- No Astro `i18n` config.
- `/ja` is hand-written duplicates (`src/pages/ja/index.astro`, `ja/about.astro`) — and
  already drifting (JA home has its own stale demo cards).
- `BaseLayout` sets `<html lang>` (default `en`) and a self-canonical, but **no hreflang**.
- Header builds `/ja` paths by string-prefix.
- `StoryLine` is single-language (`text` / `peek`).

### 1. Are `/ja/...` routes appropriate?

**Yes.** Subdirectory localization (`/` = EN, `/ja/` = JA) is the standard, SEO-friendly
choice and is exactly what Astro's built-in i18n routing produces. Subdomain / ccTLD
would be heavier with no benefit now.

Recommended config:

```js
i18n: { defaultLocale: "en", locales: ["en", "ja"], routing: { prefixDefaultLocale: false } }
```

`prefixDefaultLocale: false` keeps EN at the normal routes and JA under `/ja` — matching
the preference — and gives URL helpers (`getRelativeLocaleUrl`) and sitemap hreflang for
free. The config is the enabler; it does NOT by itself prevent duplication (see #2).

### 2. How to avoid duplicating page logic

The current `/ja/*` pages are the anti-pattern. Fix with two moves:

- **Shared data + a `localize` helper.** `LedgerUnit` / `TOPICS` already carry `*Ja`
  fields. Centralize selection: `localize(unit, "title", lang)` →
  `lang === "ja" ? unit.titleJa ?? unit.title : unit.title` (always falls back to EN).
  One dataset, no copies.
- **Shared view components, thin route wrappers.** Put each page body in a component that
  takes `lang` (`StoryView`, `StoriesIndexView`, …). Route files become 2–3 lines: the EN
  route at `/topics/sql/stories/[slug].astro` and a JA route at
  `/ja/topics/sql/stories/[slug].astro` both render `<StoryView lang=… />`. Logic lives
  once.
- For UI chrome (breadcrumb labels, "Go back", "Stories"/"Lab"), add a small string
  dictionary `t(key, lang)` instead of inlining English.

Alternative: a `[locale]`-aware `getStaticPaths` emitting both locales from one template.
Either works; shared-component + thin-wrapper is easiest to reason about here.

### 3. Story content structure for bilingual rendering

Make `StoryLine` bilingual (single file per story, mirroring the card template). Do NOT
split into `<slug>.en.ts` / `<slug>.ja.ts` (re-introduces drift):

```ts
type StoryLine = {
  speaker; emotion?;
  text: { en: string; ja: string };
  peek?: { sql: string; note: { en: string; ja: string } };
};
```

The renderer picks `text[lang]` and **composes** the peek at render time
(`sql` + blank line + `note[lang]`). Bonus: the content file stays clean structured data
instead of pre-joined strings, and maps 1:1 to the card template's `line.en/.ja` +
`peek.note.en/.ja`.

⚠️ This is a code change, not just content. Touch points: `StoryLine` (types.ts),
`StoryRenderer.astro`, and `ConversationBubble.astro` (peek is currently a prebuilt
string — it would take `sql` + `note` and compose).

### 4. Simplest implementation path (phased)

1. **Foundation:** add i18n config; add `localize()` + a `t()` UI dictionary; add
   hreflang/canonical alternates to `BaseLayout` (see #5).
2. **One vertical slice:** convert **Stories** end-to-end as the reference pattern —
   bilingual `StoryLine`, `StoryView` component, EN route + thin `/ja` wrapper. Prove it
   on one path before spreading.
3. **Replicate:** apply to `/topics`, `/topics/sql`, lab; fold the hand-written
   `ja/index` / `ja/about` into shared components so they stop drifting.
4. **Switcher:** keep the Header path mapping but use `getRelativeLocaleUrl` for
   correctness on nested routes.

Don't boil the ocean — slice #2 is the real decision point; everything else repeats it.

### 5. SEO (canonical / hreflang)

- **hreflang is the main gap** (currently absent). Add to `<head>`:
  `alternate hreflang="en"`, `hreflang="ja"`, and `hreflang="x-default"` (→ EN). Pass the
  counterpart URL via a layout prop or derive it from the locale config.
- **canonical:** keep self-referential per locale (each page canonicals to itself, not
  across languages) — current behavior is fine.
- **`<html lang>`** already wired via the `lang` prop — ensure JA routes pass `lang="ja"`.
- **Sitemap:** configure `@astrojs/sitemap`'s `i18n` option to emit localized alternates.
- **Keep slugs identical across locales** (same slug, `/ja` prefix — don't translate
  slugs). hreflang mapping becomes mechanical (`jaUrl = "/ja" + enPath`), which is what the
  Header already assumes.

### Verdict

`/ja` subdirectory + Astro i18n config + **shared data/components with a `localize`/`t`
layer** + **bilingual `StoryLine`** is the right architecture: it satisfies all the stated
preferences, and the only real code work is (a) the bilingual `StoryLine` / peek-compose
change and (b) hreflang in the layout. Biggest risk to avoid: hand-written per-locale
pages — retire the existing `/ja` duplicates as part of this.
