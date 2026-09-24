import {
  createContext,
  useState,
  useLayoutEffect,
  useMemo,
  type ReactNode,
} from 'react';

import {
  STORAGE_KEY,
  SUPPORTED_LANGUAGES,
  DEFAULT_LANGUAGE,
  type Language,
} from './config';
import type {
  LanguageContextValue,
  LanguageWarning,
  TranslationKey,
} from './types';
import { resolveInitialLanguage, isSupportedLanguage } from './detect';
import { translate, translations } from './store';
import { buildSiteContent } from './content';

export const LanguageContext = createContext<LanguageContextValue | null>(null);

interface LanguageProviderProps {
  children: ReactNode;
}

export default function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(() =>
    resolveInitialLanguage(
      () => {
        try {
          return localStorage.getItem(STORAGE_KEY);
        } catch {
          return null;
        }
      },
      () => {
        try {
          return navigator.languages;
        } catch {
          return [];
        }
      }
    )
  );

  const [warning, setWarning] = useState<LanguageWarning>(null);

  function setLanguage(requested: string): void {
    if (!isSupportedLanguage(requested)) {
      setWarning({ kind: 'unsupported', requested });
      return;
    }

    if (requested === language) {
      return;
    }

    setLanguageState(requested);

    try {
      localStorage.setItem(STORAGE_KEY, requested);
      setWarning(null);
    } catch {
      setWarning({ kind: 'not-persisted', language: requested });
    }
  }

  useLayoutEffect(() => {
    const validLang = (SUPPORTED_LANGUAGES as readonly string[]).includes(language)
      ? language
      : DEFAULT_LANGUAGE;
    document.documentElement.lang = validLang;
  }, [language]);

  const t = (key: TranslationKey): string => translate(translations, language, key);

  const content = useMemo(() => buildSiteContent(language), [language]);

  const contextValue: LanguageContextValue = {
    language,
    setLanguage,
    t,
    content,
    warning,
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}
