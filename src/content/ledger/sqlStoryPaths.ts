import { sqlLedger } from "@/content/ledger/sql";

/**
 * Shared getStaticPaths for SQL story detail routes (EN and JA).
 * Both locale routes import this so path logic lives once.
 */
export function sqlStoryStaticPaths() {
  return sqlLedger
    .filter((u) => u.story?.enabled === "live")
    .map((ledger) => ({
      params: { slug: ledger.slug },
      props: { ledger },
    }));
}
