import { Link } from "react-router-dom";
import { useLanguage } from "../i18n";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="mt-px border-t border-teal-900/10 px-5 py-10 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="font-display text-2xl text-teal-900">Aurinara</div>
          <div className="mt-2 text-sm text-teal-900/50">{t("footer.copyright")}</div>
        </div>

        <div className="flex gap-8 text-sm text-teal-900/70">
          <Link to="/trust" className="underline-offset-4 hover:text-teal-900 hover:underline">
            {t("footer.security")}
          </Link>
          <Link to="/platform" className="underline-offset-4 hover:text-teal-900 hover:underline">
            {t("footer.platform")}
          </Link>
          <Link to="/contact" className="underline-offset-4 hover:text-teal-900 hover:underline">
            {t("footer.contact")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
