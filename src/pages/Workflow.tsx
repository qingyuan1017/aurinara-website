import { ArrowRight, CheckCircle2 } from "lucide-react";
import SectionHeader from "../components/SectionHeader";
import { useLanguage } from "../i18n";

export default function Workflow() {
  const { t, content } = useLanguage();

  return (
    <>
      <section className="px-5 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow={t("workflowPage.header.eyebrow")}
            title={t("workflowPage.header.title")}
            description={t("workflowPage.header.description")}
          />

          <div className="mt-14 grid gap-5">
            {content.workflowSteps.map((step, index) => (
              <div
                key={step.id}
                className="grid gap-5 rounded-3xl border border-white/10 bg-white/[0.04] p-6 lg:grid-cols-[auto_1fr_auto] lg:items-center"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-300 text-lg font-bold text-slate-950">
                  {index + 1}
                </div>

                <div>
                  <h3 className="text-2xl font-semibold tracking-tight">
                    {step.title}
                  </h3>
                  <p className="mt-2 leading-7 text-slate-300">{step.text}</p>
                </div>

                {index < content.workflowSteps.length - 1 && (
                  <ArrowRight className="hidden h-6 w-6 text-slate-500 lg:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-cyan-300/20 bg-cyan-300/10 p-8 lg:p-12">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <div className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
                {t("workflowPage.validation.eyebrow")}
              </div>

              <h2 className="text-4xl font-semibold tracking-tight">
                {t("workflowPage.validation.title")}
              </h2>

              <p className="mt-5 leading-8 text-slate-300">
                {t("workflowPage.validation.description")}
              </p>
            </div>

            <div className="grid gap-3">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div
                  key={n}
                  className="flex items-start gap-3 rounded-2xl border border-white/10 bg-slate-950/50 p-4"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" />
                  <span className="text-slate-200">{t(`workflowPage.validation.item${n}`)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
