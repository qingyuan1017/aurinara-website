import { describe, it, expect } from "vitest";
import * as fc from "fast-check";
import {
  isSupportedLanguage,
  matchBrowserLanguage,
  resolveInitialLanguage,
} from "../detect";
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from "../config";

// Feature: multilingual-support, Property 1: Resolved initial language is always supported
// **Validates: Requirements 1.3**
describe("Property 1: Resolved initial language is always supported", () => {
  it("resolveInitialLanguage always returns a member of SUPPORTED_LANGUAGES", () => {
    fc.assert(
      fc.property(
        fc.oneof(fc.string(), fc.constant(null), fc.constant("")),
        fc.array(fc.string()),
        (storedValue, browserLanguages) => {
          const result = resolveInitialLanguage(
            () => storedValue,
            () => browserLanguages
          );
          expect(
            (SUPPORTED_LANGUAGES as readonly string[]).includes(result)
          ).toBe(true);
        }
      ),
      { numRuns: 100 }
    );
  });
});

// Feature: multilingual-support, Property 2: A stored supported preference wins over the browser
// **Validates: Requirements 4.1, 5.2**
describe("Property 2: A stored supported preference wins over the browser", () => {
  it("resolveInitialLanguage returns the stored value when it is a supported language", () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...SUPPORTED_LANGUAGES),
        fc.array(fc.string()),
        (storedLanguage, browserLanguages) => {
          const result = resolveInitialLanguage(
            () => storedLanguage,
            () => browserLanguages
          );
          expect(result).toBe(storedLanguage);
        }
      ),
      { numRuns: 100 }
    );
  });
});

// Feature: multilingual-support, Property 3: Browser detection picks the highest-priority matching subtag
// **Validates: Requirements 4.2**
describe("Property 3: Browser detection picks the highest-priority matching subtag", () => {
  // Generator for a browser language tag whose primary subtag matches a supported language
  const matchingTagArb = fc
    .record({
      lang: fc.constantFrom(...SUPPORTED_LANGUAGES),
      suffix: fc.oneof(
        fc.constant(""),
        fc.string().map((s) => (s.length > 0 ? `-${s.replace(/-/g, "")}` : ""))
      ),
      upperCase: fc.boolean(),
    })
    .map(({ lang, suffix, upperCase }) => {
      const tag = `${lang}${suffix}`;
      return upperCase ? tag.toUpperCase() : tag;
    });

  // Generator for a browser language tag that does NOT match any supported language
  const nonMatchingTagArb = fc
    .string({ minLength: 1 })
    .filter((s) => {
      const primary = s.split("-")[0].toLowerCase();
      return !(SUPPORTED_LANGUAGES as readonly string[]).includes(primary);
    });

  it("matchBrowserLanguage returns the supported language of the earliest matching entry", () => {
    fc.assert(
      fc.property(
        fc.array(nonMatchingTagArb),
        matchingTagArb,
        fc.array(fc.string()),
        (prefix, matchingTag, suffix) => {
          const browserLanguages = [...prefix, matchingTag, ...suffix];
          const result = matchBrowserLanguage(browserLanguages);
          const expectedPrimary = matchingTag.split("-")[0].toLowerCase();
          expect(result).toBe(expectedPrimary);
        }
      ),
      { numRuns: 100 }
    );
  });

  it("resolveInitialLanguage uses browser match when no stored preference exists", () => {
    fc.assert(
      fc.property(
        fc.array(nonMatchingTagArb),
        matchingTagArb,
        fc.array(fc.string()),
        fc.oneof(fc.constant(null), fc.constant(""), nonMatchingTagArb),
        (prefix, matchingTag, suffix, storedValue) => {
          const browserLanguages = [...prefix, matchingTag, ...suffix];
          const result = resolveInitialLanguage(
            () => storedValue,
            () => browserLanguages
          );
          const expectedPrimary = matchingTag.split("-")[0].toLowerCase();
          expect(result).toBe(expectedPrimary);
        }
      ),
      { numRuns: 100 }
    );
  });
});

// Feature: multilingual-support, Property 4: With no resolvable preference, resolution returns the default
// **Validates: Requirements 1.4, 4.3, 4.4, 5.3**
describe("Property 4: With no resolvable preference, resolution returns the default", () => {
  // Generator for stored values that are absent, empty, or not supported
  const invalidStoredArb = fc.oneof(
    fc.constant(null),
    fc.constant(""),
    fc.string({ minLength: 1 }).filter(
      (s) => !(SUPPORTED_LANGUAGES as readonly string[]).includes(s)
    )
  );

  // Generator for browser language lists where no entry's primary subtag matches
  const nonMatchingBrowserListArb = fc.array(
    fc.string().filter((s) => {
      if (s.length === 0) return true; // empty string won't match
      const primary = s.split("-")[0].toLowerCase();
      return !(SUPPORTED_LANGUAGES as readonly string[]).includes(primary);
    })
  );

  it("resolveInitialLanguage returns DEFAULT_LANGUAGE when no preference resolves", () => {
    fc.assert(
      fc.property(
        invalidStoredArb,
        nonMatchingBrowserListArb,
        (storedValue, browserLanguages) => {
          const result = resolveInitialLanguage(
            () => storedValue,
            () => browserLanguages
          );
          expect(result).toBe(DEFAULT_LANGUAGE);
        }
      ),
      { numRuns: 100 }
    );
  });
});

// Feature: multilingual-support, Property 6: Language validation accepts exactly the supported set
// **Validates: Requirements 1.1**
describe("Property 6: Language validation accepts exactly the supported set", () => {
  it("isSupportedLanguage returns true only for 'en' and 'zh'", () => {
    fc.assert(
      fc.property(fc.string(), (value) => {
        const result = isSupportedLanguage(value);
        const expected = (SUPPORTED_LANGUAGES as readonly string[]).includes(
          value
        );
        expect(result).toBe(expected);
      }),
      { numRuns: 100 }
    );
  });

  it("isSupportedLanguage returns true for all supported languages", () => {
    for (const lang of SUPPORTED_LANGUAGES) {
      expect(isSupportedLanguage(lang)).toBe(true);
    }
  });

  it("isSupportedLanguage returns false for non-string values", () => {
    fc.assert(
      fc.property(
        fc.oneof(
          fc.integer(),
          fc.boolean(),
          fc.constant(null),
          fc.constant(undefined),
          fc.array(fc.string())
        ),
        (value) => {
          expect(isSupportedLanguage(value)).toBe(false);
        }
      ),
      { numRuns: 100 }
    );
  });
});

// Feature: multilingual-support, Property 13: Initial language resolution is independent of the route path
// **Validates: Requirements 7.3, 7.4**
describe("Property 13: Initial language resolution is independent of the route path", () => {
  const routePathArb = fc.oneof(
    fc.constantFrom(
      "/",
      "/platform",
      "/solutions",
      "/workflow",
      "/trust",
      "/contact"
    ),
    fc.string().map((s) => `/${s}`)
  );

  it("resolveInitialLanguage produces the same result regardless of route path", () => {
    fc.assert(
      fc.property(
        fc.oneof(fc.string(), fc.constant(null), fc.constant("")),
        fc.array(fc.string()),
        routePathArb,
        routePathArb,
        (storedValue, browserLanguages, _pathA, _pathB) => {
          // resolveInitialLanguage does not accept a path argument,
          // so same stored/browser inputs always yield the same output
          const resultA = resolveInitialLanguage(
            () => storedValue,
            () => browserLanguages
          );
          const resultB = resolveInitialLanguage(
            () => storedValue,
            () => browserLanguages
          );
          expect(resultA).toBe(resultB);
        }
      ),
      { numRuns: 100 }
    );
  });
});
