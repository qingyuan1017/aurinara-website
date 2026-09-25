import SectionHeader from "../components/SectionHeader";
import Reveal from "../components/Reveal";
import { useLanguage } from "../i18n";

export default function Trust() {
  const { t, content } = useLanguage();

  return (
    <>
      <section className="px-5 pt-20 pb-16 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionHeader
              eyebrow={t("trustPage.header.eyebrow")}
              title={t("trustPage.header.title")}
              description={t("trustPage.header.description")}
            />
          </Reveal>

          <div className="mt-14 grid gap-x-12 gap-y-12 md:grid-cols-3">
            {content.trustItems.map((item, i) => {
              const Icon = item.icon;

              return (
                <Reveal key={item.id} delay={i * 0.1}>
                  <div className="border-t border-teal-900/15 pt-5">
                    <Icon className="h-7 w-7 text-sage-600" strokeWidth={1.5} />

                    <h3 className="font-display mt-4 text-xl text-teal-900">
                      {item.title}
                    </h3>

                    <p className="mt-2 leading-7 text-teal-900/70">{item.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-teal-900/10 px-5 py-20 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-x-16 gap-y-10 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal className="border-l-2 border-gold-400 pl-6">
            <div className="text-sm italic text-sage-600">
              {t("trustPage.governance.eyebrow")}
            </div>

            <h2 className="font-display mt-3 text-4xl leading-[1.1] text-teal-900">
              {t("trustPage.governance.title")}
            </h2>

            <p className="mt-5 leading-8 text-teal-900/70">
              {t("trustPage.governance.description")}
            </p>
          </Reveal>

          <ul className="grid gap-x-10 gap-y-4 sm:grid-cols-2">
            {[1, 2, 3, 4, 5, 6].map((n, i) => (
              <li key={n}>
                <Reveal delay={(i % 2) * 0.08} y={12} className="flex gap-3 text-teal-900/80">
                  <span className="mt-3 h-px w-4 shrink-0 bg-sage-500" aria-hidden />
                  <span className="leading-7">{t(`trustPage.governance.item${n}`)}</span>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
