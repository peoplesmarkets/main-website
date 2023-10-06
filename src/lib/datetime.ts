export function secondsToLocaleDateTime(
  seconds?: number,
  locale?: string
): string {
  return seconds ? new Date(seconds * 1000).toLocaleString(locale) : "";
}

export function secondsToLocaleDate(seconds?: number, locale?: string): string {
  if (seconds) {
    return new Date(seconds * 1000).toLocaleDateString(locale);
  } else {
    return "";
  }
}
