export const formatStoryNumber = (
  order: number,
  locale: "en" | "ja" = "en",
) => {
  const padded = String(order).padStart(2, "0");

  if (locale === "ja") {
    return `第${padded}話`;
  }

  return `Story ${padded}`;
};

export const formatLabNumber = (order: number, locale: "en" | "ja" = "en") => {
  const padded = String(order).padStart(2, "0");

  if (locale === "ja") {
    return `第${padded}回`;
  }

  return `Lab ${padded}`;
};
