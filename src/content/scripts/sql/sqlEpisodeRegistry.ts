import type { EpisodeLine } from "@/content/scripts/types";

// episodes 配下の *.ts を全部 “遅延import可能な形” で集める
// ※ eager:false がデフォルトなので、まとめてロードされない
const episodeModules = import.meta.glob<{ lines: EpisodeLine[] }>(
  "./episodes/*.ts",
);

/**
 * SQL Episode lines を slug から取得する（無ければ null）
 * - slug は ledger(sql.ts) の slug をそのまま渡す想定
 * - ファイル名規約: ./episodes/${slug}.ts
 * - 台帳（ledger/sql.ts）と物理的なファイル（./episodes）との橋渡し
 */
export async function getSqlEpisodeLines(
  slug: string,
): Promise<EpisodeLine[] | null> {
  const key = `./episodes/${slug}.ts`;
  const loader = episodeModules[key];

  if (!loader) return null;

  try {
    const mod = await loader();
    return mod.lines ?? null;
  } catch {
    // import失敗（ビルド/型/構文エラー等）は null に倒す（観測不能＝未生成）
    return null;
  }
}
