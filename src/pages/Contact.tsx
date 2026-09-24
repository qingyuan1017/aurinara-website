import { Mail, MapPin, MessageSquare, Phone } from "lucide-react";
import { useLanguage } from "../i18n";

export default function Contact() {
  const { t } = useLanguage();

  const contactInfoItems = [
    { icon: Mail, titleKey: "contact.info.email.title" as const, textKey: "contact.info.email.text" as const },
    { icon: Phone, titleKey: "contact.info.phone.title" as const, textKey: "contact.info.phone.text" as const },
    { icon: MapPin, titleKey: "contact.info.location.title" as const, textKey: "contact.info.location.text" as const },
    { icon: MessageSquare, titleKey: "contact.info.bestFit.title" as const, textKey: "contact.info.bestFit.text" as const },
  ];

  return (
    <>
      <section className="px-5 py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
              {t("contact.header.eyebrow")}
            </div>

            <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl">
              {t("contact.header.title")}
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              {t("contact.header.description")}
            </p>

            <div className="mt-10 grid gap-4">
              {contactInfoItems.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.titleKey}
                    className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cyan-300 text-slate-950">
                      <Icon className="h-5 w-5" />
                    </div>

                    <div>
                      <div className="font-semibold">{t(item.titleKey)}</div>
                      <div className="mt-1 text-sm text-slate-300">
                        {t(item.textKey)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-6 lg:p-8">
            <form className="grid gap-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">
                  {t("contact.form.nameLabel")}
                </label>
                <input
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300"
                  placeholder={t("contact.form.namePlaceholder")}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">
                  {t("contact.form.emailLabel")}
                </label>
                <input
                  type="email"
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300"
                  placeholder={t("contact.form.emailPlaceholder")}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">
                  {t("contact.form.orgLabel")}
                </label>
                <input
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300"
                  placeholder={t("contact.form.orgPlaceholder")}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">
                  {t("contact.form.interestLabel")}
                </label>
                <select className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-cyan-300">
                  <option>{t("contact.form.interest.sdtm")}</option>
                  <option>{t("contact.form.interest.adam")}</option>
                  <option>{t("contact.form.interest.tlf")}</option>
                  <option>{t("contact.form.interest.sap")}</option>
                  <option>{t("contact.form.interest.platform")}</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">
                  {t("contact.form.messageLabel")}
                </label>
                <textarea
                  rows={6}
                  className="w-full resize-none rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300"
                  placeholder={t("contact.form.messagePlaceholder")}
                />
              </div>

              <button
                type="button"
                className="rounded-full bg-cyan-300 px-7 py-3 font-semibold text-slate-950 transition hover:bg-cyan-200"
              >
                {t("contact.form.submit")}
              </button>

              <p className="text-xs leading-6 text-slate-500">
                {t("contact.form.disclaimer")}
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
