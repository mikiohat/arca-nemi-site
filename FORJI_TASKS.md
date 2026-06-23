# Forji Tasks

## Assessment: story design docs (各話設計 / Storyカードテンプレ / Story01)

Reviewed `story_card/各話設計.md`, `story_card/Storyカードテンプレ.md`, and
`story_card/Story01.md` (sample). Opinion only — nothing implemented.

### Overall verdict

Strong foundation. The series design is the standout — the emotional arc and the
SQL curriculum reinforce each other rather than one decorating the other. The
template and Story 01 are solid but have a few **implementation gaps** and one
**inconsistency with what is already shipped** to resolve before scaling to 30.

### 各話設計.md (series design)

**Strengths**

- Thematic spine is excellent and structurally earned:
  「恋は、正しいからCOMMITするんじゃない。自分で選んだからCOMMITする。」 — the finale
  (COMMIT / ROLLBACK) is the literal climax of the syllabus. Rare and valuable.
- Antagonist = 整合性レイヤー (old rules / constraints) is the smartest choice:
  NULL / DELETE / ROLLBACK / Constraints become the villain's weapons, so the SQL is
  dramatically motivated. Big payoff at 26 (Constraints) → 30 (Transaction).
- SQL ordering is pedagogically sound: DML → query refinement → JOIN/NULL → functions
  → DDL → keys → index → transaction. A learner can actually follow it.

**Concerns**

- Sagging-middle risk: 第二幕 is 14 episodes (09–22), several carrying advanced SQL
  (CTE, Window, RANK). Emotional stakes must keep rising there; watch 13–21.
- `物語の機能` column is inconsistent: 留守 and 探り出し each appear twice; some labels
  (呪具の獲得 / しるしづけ / 敬意を得る) look like a half-applied Hero's-Journey/Propp
  mapping. Commit to the framework fully or drop the column — currently it is noise.
- Episode 01 carries 3 concepts (INSERT/ROLLBACK/DELETE) while others carry 1. Fine as
  a hook, but it is front-loaded.

### Storyカードテンプレ.md (template)

Good, reusable skeleton — the continuity fields (残す伏線 / 次話への引き) and the fixed
Character engine (Nemi = finds, Arca = interprets) will keep voice and arc coherent.
But it lacks the bridge to the actual content files:

1. **Peek is mis-modeled.** The template lists `SQL Peek` as a standalone dialogue beat
   (#5). In code, a peek is an *attribute of a specific speaker line* (e.g. Arca's
   INSERT line). Attach each peek to the line it belongs to.
2. **No build metadata.** To generate `stories/<slug>.ts` + a `sqlLedger` entry I need:
   `slug`, `order`, `story.enabled`, `lab.enabled`, and **per-line `emotion`**
   (normal/happy/anger/sad/joy). None are present. A small "Build" block makes the
   card → code step mechanical.
3. **5-act mini-structure may be too heavy per episode.** Two `key incident`s inside a
   ~6-line card will feel formulaic by episode 8. Consider a lighter per-episode shape
   (発端 / 葛藤 / 解決 + optional turn) and reserve the full 5-act for the series.

### Story01.md (sample)

- Dialogue beats are sharp and in-character (「行じゃなくて恋じゃん。DBに入居してるじゃん。」).
  The 伏線 (ROLLBACK doesn't fully erase) → Final beat (ログの匂いだけ残ってる) is a clean,
  reusable pattern.
- The WHERE-less DELETE danger as key incident② lines up exactly with the peek already
  shipped. Good.

**⚠️ Diverges from what is live now**

- **Subtitle mismatch.** Card: `Love Was Inserted Without Permission. / 恋は、勝手にINSERTされた。`
  Live ledger still: `— Love is not ACID-compliant. / 恋はACID特性どおりじゃない。` The
  card's subtitle is better and on-topic (ACID was already removed from this episode).
  Replace the live one.
- **Dialogue mismatch.** The card's beats (tight, JP) differ from the live
  `even-an-ai-wants-to-fall-in-love.ts` (looser, EN). Pick a source of truth — recommend
  making the card canonical and generating the content file from it.

### Recommendation

1. Add a **Build metadata** block to the template (slug / order / enabled + per-line
   emotion + peek-attached-to-line).
2. Treat the **card as source of truth**; reconcile Story 01's live subtitle + dialogue
   to match the card (small change).
3. Clean up or remove the `物語の機能` column.
4. Sanity-check the 09–22 stretch for rising stakes before writing them.

Next action (pick one): (a) draft the upgraded template with the build block, or
(b) reconcile the live Story 01 to match this card. Both are small, contained changes.
