import { describe, it, expect, beforeEach, vi } from 'vitest';
import * as fc from 'fast-check';
import { render, act } from '@testing-library/react';
import LanguageProvider from '../LanguageProvider';
import { useLanguage } from '../useLanguage';
import { SUPPORTED_LANGUAGES, STORAGE_KEY } from '../config';
import type { LanguageContextValue } from '../types';

// Helper consumer that exposes context to the test
function TestConsumer({ onRender }: { onRender: (ctx: LanguageContextValue) => void }) {
  const ctx = useLanguage();
  onRender(ctx);
  return null;
}

// Arbitrary for a supported language
const supportedLanguageArb = fc.constantFrom(...SUPPORTED_LANGUAGES);

// Arbitrary for strings that are NOT supported languages
const unsupportedLanguageArb = fc.string({ minLength: 1 }).filter(
  (s) => !(SUPPORTED_LANGUAGES as readonly string[]).includes(s)
);

describe('LanguageProvider setLanguage properties', () => {
  let mockGetItem: ReturnType<typeof vi.fn>;
  let mockSetItem: ReturnType<typeof vi.fn>;
  let mockRemoveItem: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockGetItem = vi.fn();
    mockSetItem = vi.fn();
    mockRemoveItem = vi.fn();

    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: mockGetItem,
        setItem: mockSetItem,
        removeItem: mockRemoveItem,
      },
      writable: true,
      configurable: true,
    });

    Object.defineProperty(window.navigator, 'languages', {
      value: ['en-US'],
      writable: true,
      configurable: true,
    });

    // Reset document lang
    document.documentElement.lang = '';
  });

  // Feature: multilingual-support, Property 7: Selecting a different supported language sets and persists it
  // **Validates: Requirements 1.5, 3.5, 5.1**
  describe('Property 7: Selecting a different supported language sets and persists it', () => {
    it('for all pairs (current, target) where target !== current, language updates and persists', () => {
      fc.assert(
        fc.property(
          supportedLanguageArb,
          supportedLanguageArb,
          (current, target) => {
            // Only test pairs where current != target
            fc.pre(current !== target);

            mockGetItem.mockReturnValue(current);
            mockSetItem.mockReset();

            let captured: LanguageContextValue | null = null;

            render(
              <LanguageProvider>
                <TestConsumer onRender={(ctx) => { captured = ctx; }} />
              </LanguageProvider>
            );

            // Verify initial language is current
            expect(captured!.language).toBe(current);

            // Call setLanguage with target
            act(() => {
              captured!.setLanguage(target);
            });

            // Assert language becomes target
            expect(captured!.language).toBe(target);

            // Assert localStorage.setItem was called with (STORAGE_KEY, target)
            expect(mockSetItem).toHaveBeenCalledWith(STORAGE_KEY, target);
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  // Feature: multilingual-support, Property 8: Selecting the current language is a no-op (idempotence)
  // **Validates: Requirements 3.6**
  describe('Property 8: Selecting the current language is a no-op (idempotence)', () => {
    it('for all current in SUPPORTED_LANGUAGES, setLanguage(current) is a no-op', () => {
      fc.assert(
        fc.property(
          supportedLanguageArb,
          (current) => {
            mockGetItem.mockReturnValue(current);
            mockSetItem.mockReset();

            let captured: LanguageContextValue | null = null;
            let renderCount = 0;

            render(
              <LanguageProvider>
                <TestConsumer onRender={(ctx) => { captured = ctx; renderCount++; }} />
              </LanguageProvider>
            );

            const renderCountBefore = renderCount;

            // Call setLanguage with the same language
            act(() => {
              captured!.setLanguage(current);
            });

            // Assert language stays current
            expect(captured!.language).toBe(current);

            // Assert no warning is set
            expect(captured!.warning).toBeNull();

            // Assert no re-render (render count should not increase beyond what act might trigger)
            expect(renderCount).toBe(renderCountBefore);
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  // Feature: multilingual-support, Property 9: Requesting an unsupported language retains the current language and warns
  // **Validates: Requirements 1.5**
  describe('Property 9: Requesting an unsupported language retains the current language and warns', () => {
    it('for all current in SUPPORTED_LANGUAGES and all unsupported requested strings, language stays and warning is set', () => {
      fc.assert(
        fc.property(
          supportedLanguageArb,
          unsupportedLanguageArb,
          (current, requested) => {
            mockGetItem.mockReturnValue(current);
            mockSetItem.mockReset();

            let captured: LanguageContextValue | null = null;

            render(
              <LanguageProvider>
                <TestConsumer onRender={(ctx) => { captured = ctx; }} />
              </LanguageProvider>
            );

            // Call setLanguage with unsupported value
            act(() => {
              captured!.setLanguage(requested);
            });

            // Assert language stays current
            expect(captured!.language).toBe(current);

            // Assert warning is { kind: "unsupported", requested }
            expect(captured!.warning).toEqual({ kind: 'unsupported', requested });
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  // Feature: multilingual-support, Property 10: A persistence failure still applies the language for the session and warns
  // **Validates: Requirements 5.4**
  describe('Property 10: A persistence failure still applies the language for the session and warns', () => {
    it('for all target in SUPPORTED_LANGUAGES differing from current, when localStorage.setItem throws, language is applied and warning is set', () => {
      fc.assert(
        fc.property(
          supportedLanguageArb,
          supportedLanguageArb,
          (current, target) => {
            // Only test pairs where current != target
            fc.pre(current !== target);

            mockGetItem.mockReturnValue(current);
            mockSetItem.mockReset();
            mockSetItem.mockImplementation(() => {
              throw new Error('Storage quota exceeded');
            });

            let captured: LanguageContextValue | null = null;

            render(
              <LanguageProvider>
                <TestConsumer onRender={(ctx) => { captured = ctx; }} />
              </LanguageProvider>
            );

            // Call setLanguage with target
            act(() => {
              captured!.setLanguage(target);
            });

            // Assert language becomes target (still applied for session)
            expect(captured!.language).toBe(target);

            // Assert warning is { kind: "not-persisted", language: target }
            expect(captured!.warning).toEqual({ kind: 'not-persisted', language: target });
          }
        ),
        { numRuns: 100 }
      );
    });
  });
});
