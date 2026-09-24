import type { Language } from "./config";
import type { SiteContent } from "./content";

export type TranslationKey = string;

export type TranslationStore = Record<Language, Record<TranslationKey, string>>;

export type LanguageWarning =
  | null
  | { kind: "unsupported"; requested: string }
  | { kind: "not-persisted"; language: Language };

export interface LanguageContextValue {
  language: Language;
  setLanguage: (requested: string) => void;
  t: (key: TranslationKey) => string;
  content: SiteContent;
  warning: LanguageWarning;
}
