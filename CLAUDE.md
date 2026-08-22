# arca-nemi-site

Project-specific instructions for the `arca-nemi-site` repository.

Global Forji behavior, communication, scope control, and the `🐗💨` rule are defined in `~/.claude/CLAUDE.md`. Do not duplicate them here.

## Project

`arca-nemi-site` is a static Astro website for **feelings 💙 projects**.

Current stack:

- Astro
- TypeScript
- MDX
- static generation
- English and Japanese
- shared global CSS

Preserve the static architecture unless Mikky explicitly decides otherwise.

Do not introduce a server runtime, authentication, database, or other backend infrastructure merely for implementation convenience.

## Commands

Use the repository's existing npm scripts:

```bash
npm run dev
npm run build
npm run preview
```

Before considering an implementation complete, run:

```bash
npm run build
```

Do not invent additional required checks that are not configured in the repository.

## Internationalization

English is the default locale and is **not prefixed**.

Japanese lives under:

```text
/ja
```

Astro i18n configuration and `src/i18n/` implement this convention.

When adding or changing localized content:

- preserve EN as the default unprefixed route
- preserve JA under `/ja`
- use the existing i18n helpers rather than creating parallel localization logic
- preserve the existing English fallback behavior
- keep EN and JA route structures semantically aligned

Do not introduce a second i18n convention beside the existing one.

## Information Architecture

The site is topic-first.

Current SQL routes use:

```text
/topics/sql/
/topics/sql/stories/
/topics/sql/stories/[slug]
/topics/sql/lab/
/topics/sql/lab/[slug]
```

Stories and Lab belong inside their topic. Do not flatten them into top-level routes merely to simplify implementation.

URL structure is part of the site's information architecture, not just a filesystem convenience.

Before changing routing or navigation structure, read:

```text
docs/ia_routing_rationale.md
```

That document records important design reasoning, but some names in it may lag behind the implementation.

When documentation and current code disagree about an implementation detail:

1. inspect the current code
2. treat the current implementation as the factual current state
3. preserve the documented design intent where it still applies
4. explicitly call out the mismatch before changing architecture

Do not silently revive obsolete route names.

## Stories and Lab

The current public concepts are:

- **Stories**: narrative and conversational exploration
- **Lab**: interactive or observational experience

Use the current `stories` and `lab` naming in new implementation.

Do not reintroduce the older `episode` or `playground` route names unless Mikky explicitly decides to change the IA again.

## Content and Ledger

Topic content is organized under:

```text
src/content/
```

For SQL, the ledger is:

```text
src/content/ledger/sql.ts
```

The ledger is the Single Source of Truth for the SQL topic's units and publication state.

It defines information such as:

- order
- slug
- title
- localized title
- description
- tags
- Story state
- Lab state

Do not duplicate ledger-owned metadata elsewhere when it can be derived from the ledger.

Use stable slugs and existing content structures when connecting pages, Stories, and Lab content.

## Components and Pages

Follow the existing Astro organization:

```text
src/components/
src/layouts/
src/pages/
src/content/
src/i18n/
src/styles/
src/utils/
```

Prefer existing shared components and helpers before introducing a parallel abstraction.

Keep route files thin when shared rendering or data logic already exists elsewhere.

Do not move components or restructure directories solely for aesthetic cleanup.

## Styling

Shared site styling and design tokens live in:

```text
src/styles/global.css
```

Reuse existing CSS custom properties and shared classes before adding one-off values.

The existing design system includes shared tokens for:

- backgrounds
- accent
- text and muted text
- borders
- cards
- typography

Preserve the visual system rather than creating isolated local design systems inside components.

When changing visible UI, inspect the actual rendered result rather than judging only from source code.

## Security

The current site is intentionally fully static.

Before making a change that affects security assumptions, read:

```text
docs/security.md
```

Preserve the current client-side safety conventions unless there is a deliberate reason to change them:

- do not execute user-provided code as application code
- do not use `eval()` or `new Function()`
- avoid raw HTML injection
- preserve Astro's normal escaped interpolation
- preserve relevant security headers in `public/_headers`

If a future feature introduces user input, server-side behavior, authentication, storage, or a database, treat that as an architectural change rather than a routine feature addition.

## Project Policy

Project-wide brand, asset, deployment, and security principles are documented in:

```text
docs/feelings-project.policy.yml
```

Consult that file when a change affects:

- brand or world consistency
- metadata or discoverability
- public assets
- deployment
- security architecture

Do not duplicate the full policy in this file.

## Source of Truth

For implementation details, prefer evidence in this order:

1. current repository code and configuration
2. current project-specific source files
3. project documentation and rationale
4. historical task notes

Documentation should explain intent, but stale documentation must not override current code silently.

If an important document and the implementation disagree, report the mismatch instead of guessing which one Mikky intended.
