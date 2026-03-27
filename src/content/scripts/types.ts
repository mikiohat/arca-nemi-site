// インターフェース・型定義ファイル

// export type EpisodeLine = {
//   speaker: "arca" | "nemi" | "narration";
//   emotion?: "normal" | "happy" | "anger" | "sad" | "joy";
//   text: string;
// };

export type EpisodeLine = {
  speaker: "arca" | "nemi" | "narration";
  emotion?: "normal" | "happy" | "anger" | "sad" | "joy";
  text: string;
  peek?: string;
};
