// scripts/validate-story.ts
// L2 — public dialogue validator. Structural only: it knows the *shape* of a
// story, never the private quality rules (banned phrases, NG patterns, dedup).
// Those stay in the private sauce repo's L1 validator. This file leaks nothing.
//
// Runs after Step 3 against the real StoryLine[]. Green => safe to flip the
// ledger's story.enabled from "soon" to "live".

import type { StoryLine } from "@/content/scripts/types";

const SPEAKERS = ["arca", "nemi", "narration"];

export function validateStory(slug: string, lines: StoryLine[]): string[] {
  const errs: string[] = [];

  if (lines.length < 6) errs.push("too short to be a scene");

  for (const [i, l] of lines.entries()) {
    if (!SPEAKERS.includes(l.speaker)) errs.push(`line ${i}: bad speaker "${l.speaker}"`);
    if (!l.text?.en?.trim() || !l.text?.ja?.trim())
      errs.push(`line ${i}: missing en/ja`); // LocalizedText parity
    if (l.peek && (!l.peek.sql?.trim() || !l.peek.note?.en?.trim()))
      errs.push(`line ${i}: broken peek`);
  }

  const peeks = lines.filter((l) => l.peek).length;
  if (peeks > 4) errs.push("too many peeks — peek is a window, not a class");

  const lens = lines.map((l) => l.text?.en?.length ?? 0);
  if (lens.length > 0 && Math.max(...lens) - Math.min(...lens) < 30)
    errs.push("monotone rhythm — lines are all the same length");

  return errs.map((e) => `[${slug}] ${e}`);
}
