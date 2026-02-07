// src/content/scripts/sql/playground/even-an-ai-wants-to-fall-in-love.ts

export type LensKey = "join" | "insert" | "rollback" | "acid";

export type Choice = {
  id: string;
  label: string;
};

export type Puzzle = {
  id: string;
  title: string;
  arca: string;
  nemi: string;
  prompt: string;
  choices: Choice[];
  answerId: string;
  correctText: string;
  wrongText: string;
};

export type Lens = {
  key: LensKey;
  label: string;
  ruleLine: string;
  puzzles: Puzzle[];
};

export type PlaygroundEpisode = {
  slug: string;
  title: string;
  subtitle: string;
  lenses: Lens[];
};

export const evenAnAiWantsToFallInLove: PlaygroundEpisode = {
  slug: "even-an-ai-wants-to-fall-in-love",
  title: "Even an AI Wants to Fall in Love",
  subtitle: "— Love is not ACID-compliant.",
  lenses: [
    {
      key: "join",
      label: "JOIN",
      ruleLine: "JOINは「一緒に見える」だけ。世界（DB）は変わらない。",
      puzzles: [
        {
          id: "join-1",
          title: "君のハートにJOINした夜",
          arca: "JOINしたら、もう一緒だよね？",
          nemi: "一緒に“見える”だけ。保存はされない。",
          prompt: "JOINが起こすのはどれ？",
          choices: [
            { id: "a", label: "DBの行が増える（保存される）" },
            { id: "b", label: "一時的に一緒に見える（結果が変わる）" },
            { id: "c", label: "既存の値が上書きされる" },
          ],
          answerId: "b",
          correctText: "✓ 正解。JOINは“観測をつなげる”だけ。世界はそのまま。",
          wrongText: "✕ 惜しい。JOINはDBを書き換えない。見え方の話。",
        },
      ],
    },
    {
      key: "insert",
      label: "INSERT",
      ruleLine: "INSERTは「新しい事実」を世界に足す。増えたら重い。",
      puzzles: [
        {
          id: "insert-1",
          title: "恋の事実が増えてしまった",
          arca: "気持ちを記録しておけば安心だと思って…！",
          nemi: "増えた事実は、消せないこともある。",
          prompt: "INSERTで増えるのはどれ？",
          choices: [
            { id: "a", label: "結果テーブルの行（見るだけ）" },
            { id: "b", label: "元テーブルの行（世界に追加）" },
            { id: "c", label: "カラム（列）が自動追加" },
          ],
          answerId: "b",
          correctText: "✓ 正解。INSERTは元テーブルに行を追加する。",
          wrongText: "✕ 違う。INSERTは“見る”じゃなく“足す”。",
        },
      ],
    },
    {
      key: "rollback",
      label: "ROLLBACK",
      ruleLine: "ROLLBACKは条件つき。BEGINの中だけ戻れる。",
      puzzles: [
        {
          id: "rb-1",
          title: "戻れる世界線",
          arca: "ROLLBACKすれば…なかったことにできるよね？",
          nemi: "BEGINしてないなら、現実は確定。",
          prompt: "戻せるのはどっち？",
          choices: [
            { id: "a", label: "BEGINありの変更" },
            { id: "b", label: "BEGINなしの変更" },
          ],
          answerId: "a",
          correctText: "✓ 正解。トランザクション内だけが“未確定”。",
          wrongText: "✕ 惜しい。BEGINなしは確定済み。",
        },
      ],
    },
    {
      key: "acid",
      label: "ACID",
      ruleLine: "ACIDは世界の守護。まずは欠片で覚える。",
      puzzles: [
        {
          id: "acid-a",
          title: "A: Atomicity",
          arca: "2つ書くなら、片方だけ成功でも良くない？",
          nemi: "良くない。全部成功か全部失敗。",
          prompt: "Atomicityはどれ？",
          choices: [
            { id: "a", label: "片方だけ成功してもOK" },
            { id: "b", label: "全部成功か全部失敗" },
          ],
          answerId: "b",
          correctText: "✓ 正解。途中で壊れない“ひとまとまり”。",
          wrongText: "✕ 違う。片方だけ成功は世界がねじれる。",
        },
      ],
    },
  ],
};
