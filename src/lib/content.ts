import enContent from "../content/data/content.en.json";
import uaContent from "../content/data/content.uk.json";
import type { Locale, SiteContent } from "../types/content";

const STORAGE_PREFIX = "about-me-content-v2";
const STORAGE_VERSION = 2;

const defaultContent: Record<Locale, SiteContent> = {
  en: enContent as SiteContent,
  ua: uaContent as SiteContent,
};

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function mergeWithDefaults<T>(defaults: T, incoming: unknown): T {
  if (Array.isArray(defaults)) {
    return (Array.isArray(incoming) ? incoming : defaults) as T;
  }

  if (isPlainObject(defaults)) {
    const source = isPlainObject(incoming) ? incoming : {};
    const mergedEntries = Object.entries(defaults).map(([key, value]) => [
      key,
      mergeWithDefaults(value, source[key]),
    ]);

    return Object.fromEntries(mergedEntries) as T;
  }

  return (incoming ?? defaults) as T;
}

function getStorageKeys(locale: Locale): string[] {
  if (locale === "ua") {
    return [`${STORAGE_PREFIX}-ua`, `${STORAGE_PREFIX}-uk`];
  }

  return [`${STORAGE_PREFIX}-${locale}`];
}

function getLegacyStorageKeys(locale: Locale): string[] {
  if (locale === "ua") {
    return ["about-me-content-ua", "about-me-content-uk"];
  }

  return [`about-me-content-${locale}`];
}

export function getDefaultContent(locale: Locale): SiteContent {
  return structuredClone(defaultContent[locale]);
}

export function getStoredContent(locale: Locale): SiteContent {
  if (typeof window === "undefined") {
    return getDefaultContent(locale);
  }

  const raw = getStorageKeys(locale)
    .map((key) => window.localStorage.getItem(key))
    .find(Boolean);

  try {
    if (!raw) {
      return getDefaultContent(locale);
    }

    const parsed = JSON.parse(raw) as unknown;

    if (isPlainObject(parsed) && parsed.version === STORAGE_VERSION && "content" in parsed) {
      return mergeWithDefaults(getDefaultContent(locale), parsed.content);
    }

    return getDefaultContent(locale);
  } catch {
    return getDefaultContent(locale);
  }
}

export function saveContent(locale: Locale, content: SiteContent) {
  if (locale === "ua") {
    window.localStorage.removeItem(`${STORAGE_PREFIX}-uk`);
  }

  window.localStorage.setItem(
    `${STORAGE_PREFIX}-${locale}`,
    JSON.stringify(
      {
        version: STORAGE_VERSION,
        content: mergeWithDefaults(getDefaultContent(locale), content),
      },
      null,
      2,
    ),
  );
}

export function resetContent(locale: Locale) {
  getStorageKeys(locale).forEach((key) => window.localStorage.removeItem(key));
  getLegacyStorageKeys(locale).forEach((key) => window.localStorage.removeItem(key));
}
