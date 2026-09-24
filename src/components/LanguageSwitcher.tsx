import { SUPPORTED_LANGUAGES, type Language } from '../i18n/config';
import { useLanguage } from '../i18n/useLanguage';

const LANGUAGE_LABELS: Record<Language, string> = {
  en: "EN",
  zh: "中文",
};

interface LanguageSwitcherProps {
  variant: "desktop" | "mobile";
}

export default function LanguageSwitcher({ variant }: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage();

  return (
    <div className={variant === "desktop" ? "flex items-center gap-1" : "flex items-center gap-2"}>
      {SUPPORTED_LANGUAGES.map((lang) => {
        const isActive = lang === language;
        return (
          <button
            key={lang}
            onClick={() => setLanguage(lang)}
            aria-current={isActive ? "true" : undefined}
            className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
              isActive
                ? "border border-cyan-300 bg-cyan-300/10 font-bold text-cyan-300"
                : "border border-transparent text-slate-400 hover:text-white hover:bg-white/10"
            }`}
          >
            {LANGUAGE_LABELS[lang]}
          </button>
        );
      })}
    </div>
  );
}
