# Implementation Plan: Multilingual Support

## Overview

Add English (`en`) and Simplified Chinese (`zh`) bilingual support to the Aurinara website using a custom lightweight i18n layer built on React context. The implementation installs a test framework (Vitest + fast-check), creates the i18n module (`src/i18n/`), refactors all components to consume translations via context, and adds a `LanguageSwitcher` control to the Header. Routes remain language-independent; language state lives above the router and persists to localStorage.

## Tasks

- [x] 1. Install dependencies and configure test infrastructure
  - [x] 1.1 Install Vitest, Testing Library, jsdom, and fast-check
    - Add `vitest`, `@testing-library/react`, `@testing-library/user-event`, `@testing-library/jest-dom`, `jsdom`, and `fast-check` as dev dependencies
    - Add a `"test"` script to `package.json` (`vitest --run`)
    - Create `vitest.config.ts` with jsdom environment and React plugin
    - Create `src/test/setup.ts` importing `@testing-library/jest-dom`
    - _Requirements: N/A (infrastructure)_

- [x] 2. Create i18n core types and configuration
  - [x] 2.1 Create `src/i18n/types.ts` and `src/i18n/config.ts`
    - Define `Language` type from `SUPPORTED_LANGUAGES` tuple (`["en", "zh"] as const`)
    - Export `DEFAULT_LANGUAGE`, `STORAGE_KEY`, and `SUPPORTED_LANGUAGES`
    - Define `TranslationKey`, `TranslationStore`, `LanguageWarning`, and `LanguageContextValue` types
    - _Requirements: 1.1, 1.2_

  - [x] 2.2 Implement `src/i18n/detect.ts` — pure language detection functions
    - Implement `isSupportedLanguage(value): value is Language`
    - Implement `normalizeStoredPreference(raw): Language | null`
    - Implement `matchBrowserLanguage(browserLanguages): Language | null` with case-insensitive primary subtag matching
    - Implement `resolveInitialLanguage(readStored, readBrowser): Language` with full detection chain (stored → browser → default)
    - _Requirements: 1.1, 1.3, 1.4, 4.1, 4.2, 4.3, 4.4, 4.5_

  - [x] 2.3 Write property tests for detection functions (Properties 1–4, 6, 13)
    - **Property 1: Resolved initial language is always supported**
    - **Property 2: A stored supported preference wins over the browser**
    - **Property 3: Browser detection picks the highest-priority matching subtag**
    - **Property 4: With no resolvable preference, resolution returns the default**
    - **Property 6: Language validation accepts exactly the supported set**
    - **Property 13: Initial language resolution is independent of the route path**
    - **Validates: Requirements 1.1, 1.3, 1.4, 4.1, 4.2, 4.3, 4.4, 5.2, 5.3, 7.3, 7.4**

  - [x] 2.4 Implement `src/i18n/store.ts` — translation lookup and `translate` function
    - Implement `translate(store, language, key): string` with active → default → key fallback chain
    - _Requirements: 2.5, 2.6_

  - [x] 2.5 Write property test for translation fallback (Property 5)
    - **Property 5: Translation lookup follows the active → default → key fallback chain**
    - **Validates: Requirements 2.5, 2.6, 3.8**

- [x] 3. Checkpoint — Core logic tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 4. Build the translation store and structured content
  - [x] 4.1 Create English translations in `src/i18n/store.ts`
    - Add all English strings using dotted key convention (`nav.platform`, `header.signIn`, `home.hero.title`, `contact.form.nameLabel`, etc.)
    - Cover layout (Header, Footer), all pages (Home, Platform, Solutions, Workflow, Trust, Contact), and Contact form labels/placeholders/options
    - _Requirements: 2.1, 2.2, 2.3, 2.4_

  - [x] 4.2 Create Chinese translations in `src/i18n/store.ts`
    - Mirror all English keys with Simplified Chinese translations
    - Ensure every key in the `en` map has a corresponding `zh` entry
    - _Requirements: 2.1, 2.2, 2.3, 2.4_

  - [x] 4.3 Create `src/i18n/content.ts` — structured site content builder
    - Define language-independent skeleton arrays (icons, ids, hrefs) for navItems, capabilities, metrics, workflowSteps, solutions, trustItems, deliverables
    - Implement `buildSiteContent(language): SiteContent` that merges skeletons with translated strings via the `translate` function
    - Export `SiteContent` type
    - _Requirements: 2.3_

  - [x] 4.4 Write property test for structured content (Property 11)
    - **Property 11: Structured site content is fully resolved and shape-stable across languages**
    - **Validates: Requirements 2.3**

- [x] 5. Implement LanguageProvider and useLanguage hook
  - [x] 5.1 Create `src/i18n/LanguageProvider.tsx`
    - Create React context with `LanguageContextValue`
    - Implement synchronous `useState` lazy initializer calling `resolveInitialLanguage` (localStorage read wrapped in try/catch, `navigator.languages` read)
    - Implement `setLanguage` logic: validate supported, no-op if same, update state, persist with try/catch, set warning on failure
    - Use `useLayoutEffect` to sync `document.documentElement.lang` on language change
    - _Requirements: 1.3, 1.4, 1.5, 3.5, 3.6, 4.1, 4.5, 4.6, 5.1, 5.4, 6.1, 6.2, 6.3, 6.4_

  - [x] 5.2 Create `src/i18n/useLanguage.ts` hook
    - Export `useLanguage()` returning `{ language, setLanguage, t, content, warning }` from context
    - Throw a descriptive error if used outside LanguageProvider
    - _Requirements: 1.3_

  - [x] 5.3 Create `src/i18n/index.ts` barrel export
    - Re-export `LanguageProvider`, `useLanguage`, types, and config constants
    - _Requirements: N/A (module organization)_

  - [x] 5.4 Write property tests for setLanguage logic (Properties 7–10)
    - **Property 7: Selecting a different supported language sets and persists it**
    - **Property 8: Selecting the current language is a no-op (idempotence)**
    - **Property 9: Requesting an unsupported language retains the current language and warns**
    - **Property 10: A persistence failure still applies the language for the session and warns**
    - **Validates: Requirements 1.5, 3.5, 3.6, 5.1, 5.4**

  - [x] 5.5 Write property test for lang-attribute mapping (Property 12)
    - **Property 12: Language-to-`lang`-attribute mapping is safe**
    - **Validates: Requirements 6.3, 6.4**

- [x] 6. Checkpoint — Provider and property tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 7. Wire LanguageProvider into the application root
  - [x] 7.1 Update `src/main.tsx` to wrap `BrowserRouter` with `LanguageProvider`
    - Import and wrap so LanguageProvider is above BrowserRouter (language state survives all navigation)
    - _Requirements: 4.6, 7.2_

- [x] 8. Create LanguageSwitcher component
  - [x] 8.1 Implement `src/components/LanguageSwitcher.tsx`
    - Accept `variant: "desktop" | "mobile"` prop
    - Render one button per Supported_Language with labels "EN" / "中文"
    - Mark the active option with `aria-current="true"` and a visual non-color cue (font-weight/border)
    - Call `setLanguage` on click; selecting the active language is a no-op
    - Style with Tailwind CSS consistent with existing Header design
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6_

  - [x] 8.2 Write unit tests for LanguageSwitcher
    - Test that both language options render with correct labels
    - Test `aria-current="true"` on active option
    - Test clicking inactive option calls `setLanguage`
    - Test clicking active option does not trigger a language change
    - _Requirements: 3.1, 3.3, 3.4, 3.5, 3.6_

- [x] 9. Refactor layout components to use i18n
  - [x] 9.1 Refactor `src/layout/Header.tsx`
    - Replace hardcoded nav labels, "Sign in", "Request demo", brand tagline, and aria-label with `t(...)` calls via `useLanguage()`
    - Use `content.nav` for navigation items
    - Mount `<LanguageSwitcher variant="desktop" />` in the desktop nav cluster
    - Mount `<LanguageSwitcher variant="mobile" />` in the mobile menu
    - _Requirements: 2.1, 3.1, 3.2_

  - [x] 9.2 Refactor `src/layout/Footer.tsx`
    - Replace hardcoded copyright, link labels, and footer text with `t(...)` calls
    - _Requirements: 2.1_

- [x] 10. Refactor page components to use i18n
  - [x] 10.1 Refactor `src/pages/Home.tsx`
    - Replace all hardcoded text (hero title, body, console rows, section headers, capability cards, metrics) with `t(...)` and `content` lookups
    - _Requirements: 2.2, 2.3_

  - [x] 10.2 Refactor `src/pages/Platform.tsx`
    - Replace all hardcoded text with `t(...)` and `content` lookups
    - _Requirements: 2.2, 2.3_

  - [x] 10.3 Refactor `src/pages/Solutions.tsx`
    - Replace all hardcoded text including use-case cards and bullet points with `t(...)` and `content` lookups
    - _Requirements: 2.2, 2.3_

  - [x] 10.4 Refactor `src/pages/Workflow.tsx`
    - Replace all hardcoded text including step lists with `t(...)` and `content` lookups
    - _Requirements: 2.2, 2.3_

  - [x] 10.5 Refactor `src/pages/Trust.tsx`
    - Replace all hardcoded text including trust items and deliverables with `t(...)` and `content` lookups
    - _Requirements: 2.2, 2.3_

  - [x] 10.6 Refactor `src/pages/Contact.tsx`
    - Replace all form labels, placeholders, select options, button text, and disclaimer with `t(...)` calls
    - _Requirements: 2.2, 2.4_

- [x] 11. Remove legacy siteData exports and clean up imports
  - [x] 11.1 Remove or deprecate `src/data/siteData.tsx`
    - Delete or empty the file once all consumers use `useLanguage().content`
    - Update any remaining imports across components
    - _Requirements: 2.3_

- [x] 12. Checkpoint — Full application renders in both languages
  - Ensure all tests pass, ask the user if questions arise.

- [x] 13. Write integration and component tests
  - [x] 13.1 Write component tests for Header and Footer in both languages
    - Render Header in `en` and `zh`, assert correct language strings appear
    - Render Footer in `en` and `zh`, assert correct language strings appear
    - Assert LanguageSwitcher presence in both desktop and mobile variants
    - _Requirements: 2.1, 3.1, 3.2_

  - [x] 13.2 Write component tests for page rendering in both languages
    - Render each page (Home, Platform, Solutions, Workflow, Trust, Contact) in `en` and `zh`
    - Assert language-appropriate strings appear and other-language distinctive strings are absent
    - _Requirements: 2.2, 2.3, 2.4_

  - [x] 13.3 Write integration tests for language switching and persistence
    - Test re-render on language change: switch language, assert all text updates without full reload
    - Test document `lang` attribute updates on language change
    - Test initial synchronous resolution (first render reflects stored preference)
    - Test persistence write and read across simulated sessions
    - _Requirements: 2.7, 3.7, 4.6, 5.1, 5.2, 6.1, 6.2_

  - [x] 13.4 Write routing integration tests
    - Test language persists across route navigation
    - Test language persists on unknown route redirect
    - Test route paths are identical for both languages
    - _Requirements: 7.1, 7.2, 7.5_

- [x] 14. Final checkpoint — All tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties from the design document (Properties 1–13)
- Unit tests validate specific examples and edge cases
- The design specifies TypeScript throughout; all implementation uses TypeScript
- No i18n library is used — this is a lightweight custom context solution
- The `src/data/siteData.tsx` file is replaced by `src/i18n/content.ts` and `src/i18n/store.ts`

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1"] },
    { "id": 1, "tasks": ["2.1", "2.2"] },
    { "id": 2, "tasks": ["2.3", "2.4"] },
    { "id": 3, "tasks": ["2.5", "4.1", "4.2"] },
    { "id": 4, "tasks": ["4.3", "5.1"] },
    { "id": 5, "tasks": ["4.4", "5.2", "5.3"] },
    { "id": 6, "tasks": ["5.4", "5.5", "7.1"] },
    { "id": 7, "tasks": ["8.1"] },
    { "id": 8, "tasks": ["8.2", "9.1", "9.2"] },
    { "id": 9, "tasks": ["10.1", "10.2", "10.3", "10.4", "10.5", "10.6"] },
    { "id": 10, "tasks": ["11.1"] },
    { "id": 11, "tasks": ["13.1", "13.2", "13.3", "13.4"] }
  ]
}
```
