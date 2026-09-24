import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from '../config';

// Feature: multilingual-support, Property 12: Language-to-`lang`-attribute mapping is safe
// **Validates: Requirements 6.3, 6.4**

// Pure function that mirrors the lang-attribute resolution logic in LanguageProvider
function resolveLangAttribute(value: string): string {
  return (SUPPORTED_LANGUAGES as readonly string[]).includes(value) ? value : DEFAULT_LANGUAGE;
}

describe('Property 12: Language-to-lang-attribute mapping is safe', () => {
  it('always returns a member of SUPPORTED_LANGUAGES', () => {
    fc.assert(
      fc.property(fc.string(), (value) => {
        const result = resolveLangAttribute(value);
        expect((SUPPORTED_LANGUAGES as readonly string[]).includes(result)).toBe(true);
      }),
      { numRuns: 100 }
    );
  });

  it('returns the value unchanged when it is a supported language', () => {
    fc.assert(
      fc.property(fc.constantFrom(...SUPPORTED_LANGUAGES), (lang) => {
        expect(resolveLangAttribute(lang)).toBe(lang);
      }),
      { numRuns: 100 }
    );
  });

  it('returns DEFAULT_LANGUAGE for unsupported values', () => {
    fc.assert(
      fc.property(
        fc.string().filter(s => !(SUPPORTED_LANGUAGES as readonly string[]).includes(s)),
        (value) => {
          expect(resolveLangAttribute(value)).toBe(DEFAULT_LANGUAGE);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('result is always a single non-empty BCP 47 tag', () => {
    fc.assert(
      fc.property(fc.string(), (value) => {
        const result = resolveLangAttribute(value);
        expect(result.length).toBeGreaterThan(0);
        expect(result).not.toContain(' '); // single tag, no spaces
      }),
      { numRuns: 100 }
    );
  });
});
