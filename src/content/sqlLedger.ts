// src/content/sqlLedger.ts
// Ledger of observable SQL worlds
// Single Source of Truth for Episodes & Playground

import { SERIES } from "@/consts/series";

export const sqlLedger = [
  {
    series: SERIES.FEELINGS_SQL,

    slug: "even-an-ai-wants-to-fall-in-love",
    order: 1,

    title: "Even an AI Wants to Fall in Love",
    titleJa: "AIだって恋したい",

    description:
      "A FEELINGS 💙 SQL episode. Through an AI’s love-struck (bug?) log, you’ll become able to actually use INSERT, JOIN, ROLLBACK, DELETE, and ACID properties.",
    descriptionJa:
      "FEELINGS 💙 SQLのエピソード。恋（バグ？）に悩むAIのログから、INSERT、JOIN、ROLLBACK、DELETE、ACID特性を実際に使えるようになる。",
    tags: ["SQL", "INSERT", "JOIN", "ROLLBACK", "DELETE", "ACID"],

    episode: {
      enabled: "live",

      subtitle: "— Love is not ACID-compliant.",
      subtitleJa: "— 恋はACID特性どおりじゃない。",

      contentRef: "feelings-sql/even-an-ai-wants-to-fall-in-love",
    },

    playground: {
      enabled: "wip",
    },
  },

  {
    series: SERIES.FEELINGS_SQL,

    slug: "even-an-ai-wants-to-fall-in-love",
    order: 2,

    title: "Even an AI Wants to Fall in Love",
    titleJa: "AIだって恋したい",

    description:
      "FEELINGS 💙 SQL, Episode 2. Through an AI’s love-struck (bug?) log, we encounter INSERT, JOIN, ROLLBACK, DELETE, and ACID properties.",
    descriptionJa:
      "FEELINGS 💙 SQL 第2話。恋（バグ？）に悩むAIのログから、INSERT、JOIN、ROLLBACK、DELETE、ACID特性に触れる。",

    tags: ["SQL", "INSERT", "JOIN", "ROLLBACK", "DELETE", "ACID"],

    episode: {
      enabled: "live",

      subtitle: "— Love is not ACID-compliant.",
      subtitleJa: "— 恋はACID特性どおりじゃない。",

      contentRef: "feelings-sql/even-an-ai-wants-to-fall-in-love",
    },

    playground: {
      enabled: "wip",
    },
  },
];
