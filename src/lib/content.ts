import enContent from "../content/data/content.en.json";
import ukContent from "../content/data/content.uk.json";
import type { Locale, SiteContent } from "../types/content";

const STORAGE_PREFIX = "about-me-content";

const defaultContent: Record<Locale, SiteContent> = {
  en: enContent as SiteContent,
  uk: ukContent as SiteContent,
};

export function getDefaultContent(locale: Locale): SiteContent {
  return structuredClone(defaultContent[locale]);
}

export function getStoredContent(locale: Locale): SiteContent {
  if (typeof window === "undefined") {
    return getDefaultContent(locale);
  }

  const raw = window.localStorage.getItem(`${STORAGE_PREFIX}-${locale}`);
  if (!raw) {
    return getDefaultContent(locale);
  }

  try {
    return JSON.parse(raw) as SiteContent;
  } catch {
    return getDefaultContent(locale);
  }
}

export function saveContent(locale: Locale, content: SiteContent) {
  window.localStorage.setItem(
    `${STORAGE_PREFIX}-${locale}`,
    JSON.stringify(content, null, 2),
  );
}

export function resetContent(locale: Locale) {
  window.localStorage.removeItem(`${STORAGE_PREFIX}-${locale}`);
}
