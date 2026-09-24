import { Link } from "react-router-dom";
import { useLanguage } from "../i18n";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-white/10 px-5 py-8 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
        <div>{t("footer.copyright")}</div>

        <div className="flex gap-5">
          <Link to="/trust" className="hover:text-white">
            {t("footer.security")}
          </Link>
          <Link to="/platform" className="hover:text-white">
            {t("footer.platform")}
          </Link>
          <Link to="/contact" className="hover:text-white">
            {t("footer.contact")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
