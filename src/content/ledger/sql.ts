// src/content/ledger/sql.ts
// Single Source of Truth for the SQL topic ledger (Episodes + Playground)

export type PublishState = "live" | "soon" | "off";

export type LedgerUnit = {
  order: number;
  slug: string;

  title: string;
  titleJa?: string;

  /** 一覧用（短文） */
  summary?: string;
  summaryJa?: string;

  /** Ledger詳細用（Episode / Playground 共通） */
  description?: string;
  descriptionJa?: string;

  tags?: string[];

  episode: {
    enabled: PublishState;
    subtitle?: string;
    subtitleJa?: string;
    // contentRef?: string;
  };

  playground: {
    enabled: PublishState;
  };
};

export const sqlLedger: LedgerUnit[] = [
  {
    order: 1,
    slug: "even-an-ai-wants-to-fall-in-love",

    title: "Even an AI Wants to Fall in Love",
    titleJa: "AIだって恋したい",

    description:
      "SQL Lesson 1. Through an AI’s love-struck (bug?) log, you’ll become able to actually use INSERT, JOIN, ROLLBACK, DELETE, and ACID properties.",
    descriptionJa:
      "SQL学習第1回。恋（バグ？）に悩むAIのログから、INSERT、JOIN、ROLLBACK、DELETE、ACID特性を実際に使えるようになる。",

    tags: ["SQL", "INSERT", "JOIN", "ROLLBACK", "DELETE", "ACID"],

    episode: {
      enabled: "live",
      subtitle: "— Love is not ACID-compliant.",
      subtitleJa: "— 恋はACID特性どおりじゃない。",
    },

    playground: {
      enabled: "live",
    },
  },

  {
    order: 2,
    slug: "peek-test",

    title: "Peek Test",
    titleJa: "Peekテスト",

    description: "Temporary episode for validating the peek feature.",
    descriptionJa: "Peek機能の検証用テストエピソード。",

    tags: ["SQL", "TEST"],

    episode: {
      enabled: "live",
      subtitle: "— peek feature validation.",
      subtitleJa: "— peek機能テスト。",
    },

    playground: {
      enabled: "off",
    },
  },

  {
    order: 3,
    slug: "02-tbd",

    title: "TBD",
    titleJa: "準備中",

    description:
      "The next chapter in the SQL ledger. Details will unfold as the story and experiments take shape.",
    descriptionJa:
      "SQL Ledgerの次章。物語と実験が形になり次第、詳細が明らかになる。",

    tags: ["SQL", "TEST", "TEST"],

    episode: {
      enabled: "live",
      subtitle: "— test.",
      subtitleJa: "— test",
    },

    playground: {
      enabled: "off",
    },
  },
];
