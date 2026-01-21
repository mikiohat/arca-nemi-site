# Information Architecture & Routing Rationale

This document cleans up the current IA (Information Architecture) of **arca-nemi.dev** and records the design reasoning behind the routing decisions, especially **why we do NOT use **``.

---

## 1. Core Concept

arca-nemi.dev is not a conventional tutorial site.

It is:

- a **topic-driven learning space**
- a **story + observation system**
- a site where _meaning_ matters more than _instruction_

Therefore, **URL structure itself is part of the message**.

---

## 2. Top-Level Structure (IA)

```
/
└── topics/
    ├── sql/
    │   ├── episode/
    │   │   └── [slug]
    │   └── playground/
    │       └── [slug]
    ├── python/
    │   ├── episode/
    │   └── playground/
    └── doad/
    │   ├── episode/
    │   └── playground/
    ...
```

### Key Idea

- **Topics are first-class citizens**
- Episodes and Playgrounds are _expressions inside a topic_
- The same structure repeats across topics

This repetition is intentional.

---

## 3. Why NOT `/episodes/[slug]`

From an implementation and operational standpoint, the following structure would be more efficient:

```
/episodes/[slug]
```

However, we intentionally avoid it.

### Reason 1: URL Must Carry Meaning

An episode slug alone does not answer:

- _Episode of what?_
- SQL?
- Python?
- DOAD?

With:

```
/topics/sql/episode/even-an-ai-wants-to-fall-in-love
```

The context is explicit:

- This is an **SQL episode**
- Part of a larger topic
- Positioned inside a learning constellation

The URL itself teaches orientation.

---

### Reason 2: Information Architecture > Implementation Convenience

In Astro, folder structure defines URLs.

That means:

- Folder decisions are **IA decisions**
- Not just implementation shortcuts

Using `/episodes/[slug]` would flatten the IA and remove visible structure.

arca-nemi.dev prioritizes **semantic structure over minimal routing**.

---

### Reason 3: Topic Clustering (SEO & Cognitive)

The site follows a **topic cluster model**:

- Topic page = semantic hub
- Episodes = narrative exploration
- Playground = observational verification

Keeping `/topics/{topic}/...`:

- Strengthens semantic grouping
- Improves search understanding
- Matches how humans mentally organize knowledge

---

### Reason 4: One Engine, Many Topics

Although the implementation uses a shared `[slug].astro` engine internally, **the URL must still reflect topic boundaries**.

The page is reusable. The meaning is not.

---

## 4. Ledger as Single Source of Truth

Each topic has a ledger (e.g. `ledger/sql.ts`) that defines:

- slug
- order
- publish state
- episode / playground availability

The ledger answers:

> _What exists?_

Scripts answer:

> _What can be observed?_

Routing simply connects the two.

---

## 5. Episodes vs Playgrounds

### Episode

- Carries **questions**
- Carries **emotion and narrative context**
- Does not teach explicitly

### Playground

- Carries **observation**
- Shows how the world changes
- No correctness judgement

Both are siblings. Neither is subordinate.

---

## 6. Design Principle (Summary)

- URLs express meaning, not convenience
- Topics are never implicit
- Episodes are never floating
- Structure is part of learning

> The site does not just _contain_ knowledge. It _positions_ the reader inside it.

---

## 7. Short Design Memo (for Future Me)

We did not choose `/episodes/[slug]` because:

- It hides topic context
- It weakens IA
- It reduces semantic clarity

We chose `/topics/{topic}/episode/{slug}` because:

- Meaning matters
- Orientation matters
- Learning is contextual

This decision is intentional. Do not optimize it away lightly.
