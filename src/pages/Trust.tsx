import { CheckCircle2 } from "lucide-react";
import SectionHeader from "../components/SectionHeader";
import { useLanguage } from "../i18n";

export default function Trust() {
  const { t, content } = useLanguage();

  return (
    <>
      <section className="px-5 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow={t("trustPage.header.eyebrow")}
            title={t("trustPage.header.title")}
            description={t("trustPage.header.description")}
          />

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {content.trustItems.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.id}
                  className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
                >
                  <Icon className="mb-5 h-8 w-8 text-cyan-300" />

                  <h3 className="text-xl font-semibold">{item.title}</h3>

                  <p className="mt-3 leading-7 text-slate-300">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-white/[0.05] p-8 lg:p-12">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <div className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
                {t("trustPage.governance.eyebrow")}
              </div>

              <h2 className="text-4xl font-semibold tracking-tight">
                {t("trustPage.governance.title")}
              </h2>

              <p className="mt-5 leading-8 text-slate-300">
                {t("trustPage.governance.description")}
              </p>
            </div>

            <div className="grid gap-3">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div
                  key={n}
                  className="flex items-start gap-3 rounded-2xl border border-white/10 bg-slate-950/50 p-4"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" />
                  <span className="text-slate-200">{t(`trustPage.governance.item${n}`)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
