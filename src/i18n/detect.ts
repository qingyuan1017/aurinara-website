import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE, type Language } from "./config";

/**
 * True iff value is exactly one of SUPPORTED_LANGUAGES (case-sensitive).
 */
export function isSupportedLanguage(value: unknown): value is Language {
  return (
    typeof value === "string" &&
    (SUPPORTED_LANGUAGES as readonly string[]).includes(value)
  );
}

/**
 * Validate a persisted preference.
 * Returns the Language if raw is a supported value, else null.
 */
export function normalizeStoredPreference(raw: string | null): Language | null {
  if (raw === null || raw === "") {
    return null;
  }
  return isSupportedLanguage(raw) ? raw : null;
}

/**
 * Given an ordered browser language list (navigator.languages),
 * return the first entry whose primary subtag (case-insensitive) matches a
 * Supported_Language, else null.
 *
 * Examples: "en-US" → "en", "ZH-Hans-CN" → "zh"
 */
export function matchBrowserLanguage(
  browserLanguages: readonly string[]
): Language | null {
  for (const tag of browserLanguages) {
    const primarySubtag = tag.split("-")[0].toLowerCase();
    const match = SUPPORTED_LANGUAGES.find((lang) => lang === primarySubtag);
    if (match) {
      return match;
    }
  }
  return null;
}

/**
 * Full resolution per Requirement 4: stored preference → browser match → default.
 *
 * `readStored` and `readBrowser` are injected so the function stays pure/testable.
 * resolveInitialLanguage never throws: callers pass readers wrapped so that
 * a thrown storage access yields null.
 */
export function resolveInitialLanguage(
  readStored: () => string | null,
  readBrowser: () => readonly string[]
): Language {
  // Step 1: Try stored preference
  const stored = normalizeStoredPreference(readStored());
  if (stored !== null) {
    return stored;
  }

  // Step 2: Try browser language matching
  const browserMatch = matchBrowserLanguage(readBrowser());
  if (browserMatch !== null) {
    return browserMatch;
  }

  // Step 3: Fall back to default
  return DEFAULT_LANGUAGE;
}
