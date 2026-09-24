import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, Sparkles, X } from "lucide-react";
import { useLanguage } from "../i18n";
import LanguageSwitcher from "../components/LanguageSwitcher";

function navClass(isActive: boolean) {
  return isActive
    ? "text-sm font-medium text-cyan-300"
    : "text-sm font-medium text-slate-300 transition hover:text-white";
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t, content } = useLanguage();

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-slate-950 shadow-lg shadow-cyan-500/20">
            <Sparkles className="h-5 w-5" />
          </div>

          <div>
            <div className="text-base font-semibold tracking-tight">
              {t("header.brand")}
            </div>
            <div className="text-xs text-slate-400">
              {t("header.tagline")}
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {content.nav.map((item) => (
            <NavLink
              key={item.id}
              to={item.href}
              className={({ isActive }) => navClass(isActive)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher variant="desktop" />

          <Link
            to="/contact"
            className="rounded-full border border-white/10 px-5 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/10 hover:text-white"
          >
            {t("header.signIn")}
          </Link>

          <Link
            to="/contact"
            className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
          >
            {t("header.requestDemo")}
          </Link>
        </div>

        <button
          className="rounded-xl p-2 text-slate-200 hover:bg-white/10 lg:hidden"
          onClick={() => setMobileOpen((value) => !value)}
          aria-label={t("header.menuToggle")}
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/10 bg-slate-950 px-5 py-4 lg:hidden">
          <div className="flex flex-col gap-4">
            {content.nav.map((item) => (
              <NavLink
                key={item.id}
                to={item.href}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) => navClass(isActive)}
              >
                {item.label}
              </NavLink>
            ))}

            <LanguageSwitcher variant="mobile" />

            <Link
              to="/contact"
              onClick={() => setMobileOpen(false)}
              className="rounded-full bg-white px-5 py-3 text-center text-sm font-semibold text-slate-950"
            >
              {t("header.requestDemo")}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
