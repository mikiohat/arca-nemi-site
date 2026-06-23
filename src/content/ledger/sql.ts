// src/content/ledger/sql.ts
// Single Source of Truth for the SQL topic ledger (Stories + Lab)

export type PublishState = "live" | "soon" | "off";

export type LedgerUnit = {
  order: number;
  slug: string;

  title: string;
  titleJa?: string;

  /** 一覧用（短文） */
  summary?: string;
  summaryJa?: string;

  /** Ledger詳細用（Story / Lab 共通） */
  description?: string;
  descriptionJa?: string;

  tags?: string[];

  story: {
    enabled: PublishState;
    subtitle?: string;
    subtitleJa?: string;
    // contentRef?: string;
  };

  lab: {
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
      "SQL Lesson 1. Through an AI’s love-struck (bug?) log, you’ll become able to actually use INSERT, ROLLBACK, and DELETE.",
    descriptionJa:
      "SQL学習第1回。恋（バグ？）に悩むAIのログから、INSERT、ROLLBACK、DELETEを実際に使えるようになる。",

    tags: ["SQL", "INSERT", "ROLLBACK", "DELETE"],

    story: {
      enabled: "live",
      subtitle: "— Love Was Inserted Without Permission.",
      subtitleJa: "— 恋は勝手にINSERT",
    },

    lab: {
      enabled: "soon",
    },
  },
];
