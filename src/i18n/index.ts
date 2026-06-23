// Minimal bilingual (EN/JA) helpers.
// EN is the default unprefixed locale; JA lives under /ja.

export type Locale = "en" | "ja";

export type LocalizedText = { en: string; ja: string };

/**
 * Pick a localized field from an object that uses the `field` / `fieldJa`
 * convention (e.g. ledger `title` / `titleJa`). Always falls back to EN.
 */
export function localize(
  obj: Record<string, any> | undefined | null,
  field: string,
  lang: Locale,
): string {
  if (!obj) return "";
  if (lang === "ja") {
    const ja = obj[`${field}Ja`];
    if (typeof ja === "string" && ja.trim() !== "") return ja;
  }
  const base = obj[field];
  return typeof base === "string" ? base : "";
}

/** Pick a value from an { en, ja } pair, falling back to EN. */
export function pickLang(value: LocalizedText, lang: Locale): string {
  return (lang === "ja" ? value.ja : value.en) || value.en;
}

/** Prefix a route with the locale segment (EN unprefixed, JA under /ja). */
export function localizedPath(path: string, lang: Locale): string {
  if (lang !== "ja") return path;
  return path === "/" ? "/ja" : `/ja${path}`;
}

/** UI label dictionary. */
const UI = {
  en: {
    home: "Home",
    topics: "Topics",
    stories: "Stories",
    lab: "Lab",
    story: "Story",
    storyForming: "This story is still forming in the night sky. 🌙",
  },
  ja: {
    home: "ホーム",
    topics: "トピック",
    stories: "ストーリー",
    lab: "ラボ",
    story: "ストーリー",
    storyForming: "この物語は、まだ夜空で形になりかけている。🌙",
  },
} as const;

export type UIKey = keyof (typeof UI)["en"];

/** Translate a UI label key, falling back to EN. */
export function t(key: UIKey, lang: Locale): string {
  return UI[lang]?.[key] ?? UI.en[key];
}
