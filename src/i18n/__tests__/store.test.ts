import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { translate } from '../store';
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES, type Language } from '../config';
import type { TranslationStore } from '../types';

// Feature: multilingual-support, Property 5: Translation lookup follows the active → default → key fallback chain

describe('translate — Property 5: Translation lookup follows the active → default → key fallback chain', () => {
  /**
   * Validates: Requirements 2.5, 2.6, 3.8
   *
   * For all translation stores, active languages, and keys:
   * 1. If the key exists in the active language map, translate returns that value
   * 2. If the key doesn't exist in the active language but exists in the default language (en),
   *    translate returns the default language value
   * 3. If the key doesn't exist in either, translate returns the key unchanged
   */

  const arbLanguage = fc.constantFrom(...SUPPORTED_LANGUAGES);

  // Use keys that won't collide with Object.prototype properties
  const arbKey = fc.string({ minLength: 1, maxLength: 50 }).filter(
    (k) => !(k in Object.prototype)
  );
  const arbValue = fc.string({ minLength: 1, maxLength: 100 });

  // Generator for translation maps that only contain own string properties
  const arbTranslationMap = fc.dictionary(arbKey, arbValue);

  // Generator for a TranslationStore with arbitrary entries
  const arbStore: fc.Arbitrary<TranslationStore> = fc.record({
    en: arbTranslationMap,
    zh: arbTranslationMap,
  }) as fc.Arbitrary<TranslationStore>;

  it('returns the active language value when the key exists in the active language', () => {
    fc.assert(
      fc.property(
        arbStore,
        arbLanguage,
        arbKey,
        arbValue,
        (baseStore, language, key, value) => {
          // Ensure the key exists in the active language
          const store: TranslationStore = {
            ...baseStore,
            [language]: { ...baseStore[language], [key]: value },
          };
          const result = translate(store, language, key);
          expect(result).toBe(value);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('returns the default language value when the key is missing from the active language but exists in the default', () => {
    fc.assert(
      fc.property(
        arbStore,
        arbKey,
        arbValue,
        (baseStore, key, defaultValue) => {
          // Use a non-default language as active so we can test fallback to default
          const activeLanguage: Language = 'zh';

          // Remove the key from the active language, add it to default
          const activeMap = { ...baseStore[activeLanguage] };
          delete activeMap[key];

          const store: TranslationStore = {
            ...baseStore,
            [activeLanguage]: activeMap,
            [DEFAULT_LANGUAGE]: { ...baseStore[DEFAULT_LANGUAGE], [key]: defaultValue },
          };

          const result = translate(store, activeLanguage, key);
          expect(result).toBe(defaultValue);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('returns the key unchanged when it is missing from both active and default languages', () => {
    fc.assert(
      fc.property(
        arbStore,
        arbLanguage,
        arbKey,
        (baseStore, language, key) => {
          // Remove the key from both active language and default language
          const activeMap = { ...baseStore[language] };
          delete activeMap[key];
          const defaultMap = { ...baseStore[DEFAULT_LANGUAGE] };
          delete defaultMap[key];

          const store: TranslationStore = {
            ...baseStore,
            [language]: activeMap,
            [DEFAULT_LANGUAGE]: defaultMap,
          };

          const result = translate(store, language, key);
          expect(result).toBe(key);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('follows the full fallback chain: active → default → key for any store, language, and key', () => {
    fc.assert(
      fc.property(
        arbStore,
        arbLanguage,
        arbKey,
        (store, language, key) => {
          const result = translate(store, language, key);

          const activeValue = store[language]?.[key];
          const defaultValue = store[DEFAULT_LANGUAGE]?.[key];

          if (activeValue !== undefined) {
            // Branch 1: key exists in active language
            expect(result).toBe(activeValue);
          } else if (defaultValue !== undefined) {
            // Branch 2: key exists in default language only
            expect(result).toBe(defaultValue);
          } else {
            // Branch 3: key exists in neither
            expect(result).toBe(key);
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});
