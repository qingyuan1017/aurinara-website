import { useContext } from 'react';
import { LanguageContext } from './LanguageProvider';
import type { LanguageContextValue } from './types';

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (context === null) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
