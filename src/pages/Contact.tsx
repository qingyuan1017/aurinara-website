import { Mail, MapPin, MessageSquare, Phone } from "lucide-react";
import Reveal from "../components/Reveal";
import BrandGraphic from "../components/BrandGraphic";
import { useLanguage } from "../i18n";

export default function Contact() {
  const { t } = useLanguage();

  const contactInfoItems = [
    { icon: Mail, titleKey: "contact.info.email.title" as const, textKey: "contact.info.email.text" as const },
    { icon: Phone, titleKey: "contact.info.phone.title" as const, textKey: "contact.info.phone.text" as const },
    { icon: MapPin, titleKey: "contact.info.location.title" as const, textKey: "contact.info.location.text" as const },
    { icon: MessageSquare, titleKey: "contact.info.bestFit.title" as const, textKey: "contact.info.bestFit.text" as const },
  ];

  const field =
    "w-full border-0 border-b border-teal-900/20 bg-transparent px-0 py-2 text-teal-900 outline-none transition placeholder:text-teal-900/30 focus:border-teal-700";
  const labelClass =
    "mb-1 block text-xs uppercase tracking-[0.14em] text-teal-900/55";

  return (
    <section className="relative overflow-hidden px-5 pt-20 pb-24 lg:px-8">
      <BrandGraphic className="pointer-events-none absolute right-4 top-10 hidden h-32 w-32 opacity-70 lg:block" />

      <div className="relative mx-auto grid max-w-6xl gap-x-16 gap-y-14 lg:grid-cols-[0.95fr_1.05fr]">
        <Reveal>
          <div className="flex items-center gap-3 text-sm text-sage-600">
            <span className="h-px w-8 bg-sage-500/60" aria-hidden />
            <span className="italic">{t("contact.header.eyebrow")}</span>
          </div>

          <h1 className="font-display mt-5 text-5xl leading-[1.05] text-teal-900 sm:text-6xl">
            {t("contact.header.title")}
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-teal-900/70">
            {t("contact.header.description")}
          </p>

          <dl className="mt-12 divide-y divide-teal-900/10 border-t border-teal-900/10">
            {contactInfoItems.map((item) => {
              const Icon = item.icon;

              return (
                <div key={item.titleKey} className="flex gap-4 py-4">
                  <Icon className="mt-0.5 h-5 w-5 shrink-0 text-sage-600" strokeWidth={1.5} />
                  <div>
                    <dt className="font-medium text-teal-900">{t(item.titleKey)}</dt>
                    <dd className="mt-0.5 text-sm text-teal-900/65">{t(item.textKey)}</dd>
                  </div>
                </div>
              );
            })}
          </dl>
        </Reveal>

        <Reveal delay={0.1} className="lg:pt-2">
          <form className="grid gap-7">
            <div>
              <label className={labelClass}>{t("contact.form.nameLabel")}</label>
              <input className={field} placeholder={t("contact.form.namePlaceholder")} />
            </div>

            <div>
              <label className={labelClass}>{t("contact.form.emailLabel")}</label>
              <input type="email" className={field} placeholder={t("contact.form.emailPlaceholder")} />
            </div>

            <div>
              <label className={labelClass}>{t("contact.form.orgLabel")}</label>
              <input className={field} placeholder={t("contact.form.orgPlaceholder")} />
            </div>

            <div>
              <label className={labelClass}>{t("contact.form.interestLabel")}</label>
              <select className={field}>
                <option>{t("contact.form.interest.sdtm")}</option>
                <option>{t("contact.form.interest.adam")}</option>
                <option>{t("contact.form.interest.tlf")}</option>
                <option>{t("contact.form.interest.sap")}</option>
                <option>{t("contact.form.interest.platform")}</option>
              </select>
            </div>

            <div>
              <label className={labelClass}>{t("contact.form.messageLabel")}</label>
              <textarea
                rows={5}
                className={`${field} resize-none`}
                placeholder={t("contact.form.messagePlaceholder")}
              />
            </div>

            <button
              type="button"
              className="mt-2 justify-self-start rounded-md bg-teal-800 px-6 py-3 font-medium text-canvas transition hover:bg-teal-900"
            >
              {t("contact.form.submit")}
            </button>

            <p className="text-xs leading-6 text-teal-900/45">
              {t("contact.form.disclaimer")}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
