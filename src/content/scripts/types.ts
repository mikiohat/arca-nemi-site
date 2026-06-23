// インターフェース・型定義ファイル

import type { LocalizedText } from "@/i18n";

export type Speaker = "arca" | "nemi" | "narration";
export type Emotion = "normal" | "happy" | "anger" | "sad" | "joy";

export type StoryPeek = {
  /** SQL code shown on the back of the flip card. */
  sql: string;
  /** Short explanation lines, per locale. */
  note: LocalizedText;
};

export type StoryLine = {
  speaker: Speaker;
  emotion?: Emotion;
  /** Dialogue text, per locale (EN active, JA parked until JA routes ship). */
  text: LocalizedText;
  peek?: StoryPeek;
};
