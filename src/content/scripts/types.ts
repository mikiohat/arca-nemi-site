// インターフェース・型定義ファイル

export type StoryLine = {
  speaker: "arca" | "nemi" | "narration";
  emotion?: "normal" | "happy" | "anger" | "sad" | "joy";
  text: string;
  peek?: string;
};
