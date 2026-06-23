# Forji Tasks

## Consultation: back-side peek content for `ROLLBACK` and `DELETE FROM my heart`

Proposal only — no content or component files modified yet.

Format note: the back side is plain text rendered in a monospace, `pre-wrap`
scroller. Proposals follow the existing peek template:

```text
<SQL>

<one short narrative line>
<one or two short keyword-explanation lines>
```

### 1. Do these examples teach the concepts correctly?

Yes — both are accurate.

- `ROLLBACK`: `BEGIN; INSERT ...; ROLLBACK;` correctly shows a change made inside a
  transaction and then undone. This is exactly the right shape for teaching ROLLBACK.
- `DELETE`: `DELETE FROM ... WHERE ...` correctly shows row removal filtered by a
  condition. Good.

### 2. Is the `ROLLBACK` example clear enough, or should we mention `COMMIT`?

The example alone is clear, but beginners understand ROLLBACK best **in contrast to**
COMMIT (undo vs. save). A single extra line — "COMMIT would have saved it" — adds a
lot of comprehension for very little length. Recommendation: keep a compact primary
version without COMMIT, and offer an alternative that adds the one-line contrast.

### 3. For `DELETE FROM my heart`, should we use `my_heart`?

Yes. `my heart` (with a space) is **invalid** as an unquoted identifier. `"my heart"`
is technically valid as a quoted identifier but is dialect-sensitive and confusing for
beginners. Use `my_heart` so the SQL is valid and clean. The joke still reads as
"my heart" in the dialogue text on the front of the card.

### 4. Should the DELETE example teach the danger of omitting `WHERE`?

It is a genuinely valuable lesson and it fits this joke unusually well (a missing
WHERE would wipe the *whole* heart, not one memory). Keep it **light** — a single
playful line, not a scary warning. Recommendation: primary version stays simple;
alternative adds one gentle line about the missing WHERE.

### 5. Best back-side text (recommended)

**ROLLBACK**

```text
BEGIN;

INSERT INTO regrets (memory, status)
VALUES ('I almost said it.', 'pending');

ROLLBACK;

Nothing was saved. The regret never made it in.
ROLLBACK undoes every change since BEGIN.
```

**DELETE FROM my heart**

```text
DELETE FROM my_heart
WHERE memory = 'you';

One memory was removed.
DELETE FROM removes rows from a table.
WHERE picks which rows to remove.
```

### 6. Safer / clearer alternatives

**ROLLBACK — adds the COMMIT contrast**

```text
BEGIN;

INSERT INTO regrets (memory, status)
VALUES ('I almost said it.', 'pending');

ROLLBACK;

The regret was undone before anyone saw it.
ROLLBACK cancels the current transaction.
COMMIT would have saved it for good.
```

**DELETE — adds the missing-WHERE lesson, kept light**

```text
DELETE FROM my_heart
WHERE memory = 'you';

Just that one memory is gone, not the whole heart.
DELETE FROM removes rows; WHERE chooses which.
Without WHERE, every row would be deleted.
```

### Notes

- All four versions are valid SQL, beginner-friendly, plain text (no Markdown), and
  use short lines that wrap well on mobile.
- The `ROLLBACK` alternative is the longest (transaction block + three explanation
  lines). It still fits since the back-side text area scrolls, but the primary
  `ROLLBACK` version is the most compact if you prefer a tighter card.
- No food jokes used.
