import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useLanguage } from "../i18n";
import LanguageSwitcher from "../components/LanguageSwitcher";
import logo from "../assets/logo.png";

function navClass(isActive: boolean) {
  return isActive
    ? "text-sm text-teal-900 underline decoration-gold-400 decoration-2 underline-offset-8"
    : "text-sm text-teal-900/70 underline-offset-8 transition hover:text-teal-900 hover:underline hover:decoration-teal-900/20";
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t, content } = useLanguage();

  return (
    <header className="sticky top-0 z-40 border-b border-teal-900/10 bg-[#f7f4ec]/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Aurinara" className="h-11 w-auto sm:h-12" />

          <div>
            <div className="font-display text-lg leading-none text-teal-900">
              {t("header.brand")}
            </div>
            <div className="mt-1 text-[0.7rem] uppercase tracking-[0.18em] text-teal-900/45">
              {t("header.tagline")}
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
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
            className="text-sm text-teal-900/70 transition hover:text-teal-900"
          >
            {t("header.signIn")}
          </Link>

          <Link
            to="/contact"
            className="rounded-md bg-teal-800 px-5 py-2 text-sm font-medium text-[#fbfaf6] transition hover:bg-teal-900"
          >
            {t("header.requestDemo")}
          </Link>
        </div>

        <button
          className="rounded-md p-2 text-teal-800 hover:bg-teal-900/5 lg:hidden"
          onClick={() => setMobileOpen((value) => !value)}
          aria-label={t("header.menuToggle")}
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-teal-900/10 bg-[#f7f4ec] px-5 py-4 lg:hidden">
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
              className="rounded-md bg-teal-800 px-5 py-3 text-center text-sm font-medium text-[#fbfaf6]"
            >
              {t("header.requestDemo")}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
