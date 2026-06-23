import type { StoryLine } from "@/content/scripts/types";

// stories 配下の *.ts を全部 “遅延import可能な形” で集める
// ※ eager:false がデフォルトなので、まとめてロードされない
const storyModules = import.meta.glob<{ lines: StoryLine[] }>(
  "./stories/*.ts",
);

/**
 * SQL Story lines を slug から取得する（無ければ null）
 * - slug は ledger(sql.ts) の slug をそのまま渡す想定
 * - ファイル名規約: ./stories/${slug}.ts
 * - 台帳（ledger/sql.ts）と物理的なファイル（./stories）との橋渡し
 */
export async function getSqlStoryLines(
  slug: string,
): Promise<StoryLine[] | null> {
  const key = `./stories/${slug}.ts`;
  const loader = storyModules[key];

  if (!loader) return null;

  try {
    const mod = await loader();
    return mod.lines ?? null;
  } catch {
    // import失敗（ビルド/型/構文エラー等）は null に倒す（観測不能＝未生成）
    return null;
  }
}
