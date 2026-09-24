import { CheckCircle2 } from "lucide-react";
import ButtonLink from "../components/ButtonLink";
import SectionHeader from "../components/SectionHeader";
import { useLanguage } from "../i18n";

export default function Solutions() {
  const { t, content } = useLanguage();

  return (
    <>
      <section className="px-5 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow={t("solutions.header.eyebrow")}
            title={t("solutions.header.title")}
            description={t("solutions.header.description")}
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {content.solutions.map((solution) => (
              <div
                key={solution.id}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
              >
                <div className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
                  {solution.eyebrow}
                </div>

                <h3 className="text-2xl font-semibold tracking-tight">
                  {solution.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-300">
                  {solution.description}
                </p>

                <div className="mt-6 grid gap-3">
                  {solution.points.map((point) => (
                    <div key={point} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" />
                      <span className="text-sm text-slate-200">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-slate-900/70 p-8 lg:p-12">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <div className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
                {t("solutions.useCases.eyebrow")}
              </div>

              <h2 className="text-4xl font-semibold tracking-tight">
                {t("solutions.useCases.title")}
              </h2>

              <p className="mt-5 leading-8 text-slate-300">
                {t("solutions.useCases.description")}
              </p>

              <div className="mt-8">
                <ButtonLink to="/contact">{t("solutions.useCases.button")}</ButtonLink>
              </div>
            </div>

            <div className="grid gap-4">
              {[1, 2, 3, 4].map((n) => (
                <div
                  key={n}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"
                >
                  <h3 className="text-lg font-semibold">
                    {t(`solutions.useCases.card${n}.title`)}
                  </h3>
                  <p className="mt-2 leading-7 text-slate-300">
                    {t(`solutions.useCases.card${n}.text`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
