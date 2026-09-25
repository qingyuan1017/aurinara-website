import ButtonLink from "../components/ButtonLink";
import SectionHeader from "../components/SectionHeader";
import Reveal from "../components/Reveal";
import { useLanguage } from "../i18n";

export default function Solutions() {
  const { t, content } = useLanguage();

  return (
    <>
      <section className="px-5 pt-20 pb-16 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionHeader
              eyebrow={t("solutions.header.eyebrow")}
              title={t("solutions.header.title")}
              description={t("solutions.header.description")}
            />
          </Reveal>

          <div className="mt-16 space-y-16">
            {content.solutions.map((solution, index) => (
              <Reveal
                key={solution.id}
                className="grid gap-x-12 gap-y-6 border-t border-teal-900/15 pt-8 lg:grid-cols-[0.8fr_1.2fr]"
              >
                <div>
                  <div className="font-display text-sm text-gold-500">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div className="mt-3 text-xs uppercase tracking-[0.16em] text-sage-600">
                    {solution.eyebrow}
                  </div>
                  <h3 className="font-display mt-2 text-2xl leading-tight text-teal-900">
                    {solution.title}
                  </h3>
                  <p className="mt-4 leading-7 text-teal-900/70">
                    {solution.description}
                  </p>
                </div>

                <ul className="grid gap-y-3 sm:grid-cols-2 sm:gap-x-8">
                  {solution.points.map((point) => (
                    <li key={point} className="flex gap-3 text-sm leading-6 text-teal-900/80">
                      <span className="mt-2.5 h-px w-4 shrink-0 bg-sage-500" aria-hidden />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-teal-900/10 px-5 py-20 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-x-16 gap-y-10 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <div className="flex items-center gap-3 text-sm text-sage-600">
              <span className="h-px w-8 bg-sage-500/60" aria-hidden />
              <span className="italic">{t("solutions.useCases.eyebrow")}</span>
            </div>

            <h2 className="font-display mt-4 text-4xl leading-[1.1] text-teal-900">
              {t("solutions.useCases.title")}
            </h2>

            <p className="mt-5 leading-8 text-teal-900/70">
              {t("solutions.useCases.description")}
            </p>

            <div className="mt-8">
              <ButtonLink to="/contact">{t("solutions.useCases.button")}</ButtonLink>
            </div>
          </Reveal>

          <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {[1, 2, 3, 4].map((n, i) => (
              <Reveal key={n} delay={(i % 2) * 0.08}>
                <div className="border-t border-teal-900/15 pt-5">
                  <h3 className="font-display text-lg text-teal-900">
                    {t(`solutions.useCases.card${n}.title`)}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-teal-900/70">
                    {t(`solutions.useCases.card${n}.text`)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
