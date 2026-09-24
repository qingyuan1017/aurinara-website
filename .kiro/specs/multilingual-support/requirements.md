# Requirements Document

## Introduction

The Aurinara website currently presents all user-facing content in English only, with strings hardcoded across `src/data/siteData.tsx`, page components in `src/pages/`, and layout components (`Header`, `Footer`, `SiteLayout`). This feature adds multilingual support for English and Simplified Chinese so visitors can read the entire site in their preferred language.

The feature introduces a language switching control in the site header, full translation coverage of all user-facing text, an initial language selection based on the visitor's browser preference, persistence of the visitor's explicit choice across sessions, and synchronization of the document language metadata. URL routes remain language-independent; the active language is held in application state and restored from persisted preference rather than encoded in the URL path.

## Glossary

- **Site**: The Aurinara React single-page application served to website visitors.
- **Language_Provider**: The application module responsible for holding the active language, exposing translation lookups, and notifying components of language changes.
- **Language_Switcher**: The user interface control, rendered in the Header, that allows a visitor to select between English and Chinese.
- **Translation_Store**: The structured collection of translation entries that maps a translation key plus a language to a localized string.
- **Active_Language**: The language currently used to render all user-facing content. One of the Supported_Languages.
- **Supported_Languages**: The set of languages the Site supports, namely English (`en`) and Simplified Chinese (`zh`).
- **Default_Language**: English (`en`), used when no other language can be determined.
- **Preference_Store**: The browser persistence mechanism (`localStorage`) used to remember the visitor's explicitly selected language across sessions.
- **Browser_Language**: The visitor's preferred language as reported by the browser (e.g., `navigator.language` / `navigator.languages`).
- **Translation_Key**: A stable identifier used to look up a localized string in the Translation_Store, independent of any language.

## Requirements

### Requirement 1: Supported Languages

**User Story:** As a visitor, I want the Site to offer English and Chinese, so that I can read content in a language I understand.

#### Acceptance Criteria

1. THE Site SHALL support exactly two Supported_Languages: English (`en`) and Simplified Chinese (`zh`), and SHALL reject any other language identifier as unsupported.
2. THE Site SHALL designate English (`en`) as the Default_Language.
3. THE Language_Provider SHALL expose the Active_Language as exactly one value drawn from the Supported_Languages set at all times, including during initial load before any user selection.
4. WHEN the Language_Provider initializes and no resolvable language preference exists, THE Language_Provider SHALL set the Active_Language to the Default_Language (`en`).
5. IF a request sets the Active_Language to a value not contained in the Supported_Languages set, THEN THE Language_Provider SHALL retain the current Active_Language, set the Active_Language to the Default_Language (`en`) when no current valid value exists, and surface an indication that the requested language is unsupported.

### Requirement 2: Translation Coverage

**User Story:** As a visitor, I want all visible text translated, so that the entire Site reads consistently in my chosen language.

#### Acceptance Criteria

1. THE Site SHALL render all user-facing text from the layout components (Header, Footer) in the Active_Language, with zero user-facing strings displayed in any language other than the Active_Language.
2. THE Site SHALL render all user-facing text from every page (Home, Platform, Solutions, Workflow, Trust, Contact) in the Active_Language, with zero user-facing strings displayed in any language other than the Active_Language.
3. THE Site SHALL render all user-facing text sourced from `siteData` (navigation labels, capabilities, metrics, workflow steps, solutions, trust items, deliverables) in the Active_Language, with zero user-facing strings displayed in any language other than the Active_Language.
4. THE Site SHALL render all Contact form labels, placeholders, select options, and button text in the Active_Language, with zero user-facing strings displayed in any language other than the Active_Language.
5. IF a Translation_Key has no entry for the Active_Language but has an entry for the Default_Language, THEN THE Language_Provider SHALL return the Default_Language string for that Translation_Key.
6. IF a Translation_Key has no entry for the Active_Language and no entry for the Default_Language, THEN THE Language_Provider SHALL return the Translation_Key string unchanged.
7. WHEN the Active_Language changes, THE Site SHALL re-render every user-facing text element listed in criteria 1 through 4 in the new Active_Language within 1 second, with no element retaining the previous language.

### Requirement 3: Language Switching Control

**User Story:** As a visitor, I want a visible control to switch languages, so that I can change the Site language at any time.

#### Acceptance Criteria

1. THE Language_Switcher SHALL be displayed in the Header on viewports that show the desktop navigation.
2. THE Language_Switcher SHALL be displayed in the mobile menu on viewports that show the mobile navigation.
3. THE Language_Switcher SHALL display one selectable option for each of the Supported_Languages.
4. THE Language_Switcher SHALL render the option corresponding to the Active_Language in a visually distinct state that differs from the non-active options and is conveyed by at least one non-color cue.
5. WHEN a visitor selects an option from the Language_Switcher whose language differs from the current Active_Language, THE Language_Provider SHALL set the Active_Language to the selected language.
6. WHEN a visitor selects the option corresponding to the current Active_Language, THE Language_Provider SHALL retain the current Active_Language and leave the displayed text unchanged.
7. WHEN the Active_Language changes, THE Site SHALL re-render all user-facing text in the new Active_Language within 1 second and without a full page reload.
8. IF a Translation_Key has no entry for the Active_Language when text is rendered, THEN THE Site SHALL display the text for that Translation_Key in the Default_Language.

### Requirement 4: Initial Language Detection

**User Story:** As a first-time visitor, I want the Site to open in my browser's language when possible, so that I see understandable content immediately.

#### Acceptance Criteria

1. WHEN the Site loads AND the Preference_Store contains a previously selected language that is one of the Supported_Languages, THE Language_Provider SHALL set the Active_Language to the persisted language.
2. WHEN the Site loads AND the Preference_Store contains no previously selected language AND the Browser_Language list contains at least one entry whose primary language subtag matches a Supported_Language using case-insensitive comparison (for example, "en-US" matches the Supported_Language "en"), THE Language_Provider SHALL set the Active_Language to the Supported_Language that matches the highest-priority such entry in the Browser_Language list.
3. WHEN the Site loads AND the Preference_Store contains no previously selected language AND no entry in the Browser_Language list matches any Supported_Language, THE Language_Provider SHALL set the Active_Language to the Default_Language.
4. IF the Preference_Store contains a stored value that is empty, null, or is not one of the Supported_Languages, THEN THE Language_Provider SHALL set the Active_Language to the Default_Language.
5. IF the Preference_Store cannot be read, THEN THE Language_Provider SHALL set the Active_Language to the Default_Language and SHALL continue loading the Site without displaying a blocking error.
6. WHEN the Site loads, THE Language_Provider SHALL set the Active_Language before the initial Site content is rendered and within 100 milliseconds of load start, such that no untranslated or wrong-language content is displayed to the visitor.

### Requirement 5: Language Persistence

**User Story:** As a returning visitor, I want the Site to remember my language choice, so that I do not need to reselect it on every visit.

#### Acceptance Criteria

1. WHEN a visitor selects a language that is a member of Supported_Languages from the Language_Switcher, THE Language_Provider SHALL store the selected language identifier in the Preference_Store within 1 second of the selection event.
2. WHEN the Site loads in a session after a language was stored AND the value retrieved from the Preference_Store is a member of Supported_Languages, THE Language_Provider SHALL set the Active_Language to the stored language.
3. IF the Site loads AND the value retrieved from the Preference_Store is absent, empty, or not a member of Supported_Languages, THEN THE Language_Provider SHALL set the Active_Language to the Default_Language.
4. IF writing to the Preference_Store fails, THEN THE Language_Provider SHALL retain the selected language as the Active_Language for the current session without blocking the language change, and SHALL surface an indication that the preference was not persisted.

### Requirement 6: Document Language Metadata

**User Story:** As a visitor using assistive technology or translation tooling, I want the document language to reflect the displayed content, so that tooling behaves correctly.

#### Acceptance Criteria

1. WHEN the Site finishes loading, THE Site SHALL set the document root `lang` attribute to the language code of the Active_Language, formatted as a BCP 47 language tag drawn from Supported_Languages.
2. WHEN the Active_Language changes, THE Site SHALL update the document root `lang` attribute to the BCP 47 language code of the new Active_Language within 500 milliseconds of the change.
3. IF the Active_Language cannot be determined or its code is not a member of Supported_Languages when the document root `lang` attribute is set, THEN THE Site SHALL set the document root `lang` attribute to the BCP 47 language code of the Default_Language.
4. WHEN the Site sets or updates the document root `lang` attribute, THE Site SHALL ensure exactly one `lang` attribute is present on the document root element containing a single non-empty BCP 47 language tag.

### Requirement 7: Routing Behavior

**User Story:** As a visitor, I want the Site language to stay consistent as I navigate, so that switching pages does not reset my language.

#### Acceptance Criteria

1. THE Site SHALL serve identical route paths (`/`, `/platform`, `/solutions`, `/workflow`, `/trust`, `/contact`) for every value in Supported_Languages, such that no route path varies with the Active_Language.
2. WHEN a visitor navigates from one route to another route, THE Language_Provider SHALL set the Active_Language on the destination route to the same value held before navigation, with no intermediate reset to the Default_Language.
3. WHEN a visitor navigates directly to any route path by URL entry, THE Language_Provider SHALL set the Active_Language to the value held in the Preference_Store, or to the Default_Language when the Preference_Store holds no value.
4. WHEN a visitor reloads a route or uses browser back or forward navigation, THE Language_Provider SHALL set the Active_Language to the value held in the Preference_Store, or to the Default_Language when the Preference_Store holds no value.
5. IF a visitor navigates to a route path not in the defined set (`/`, `/platform`, `/solutions`, `/workflow`, `/trust`, `/contact`), THEN THE Language_Provider SHALL retain the current Active_Language without resetting it to the Default_Language.
