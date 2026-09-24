import CapabilityCard from "../components/CapabilityCard";
import SectionHeader from "../components/SectionHeader";
import { useLanguage } from "../i18n";

export default function Platform() {
  const { t, content } = useLanguage();

  return (
    <>
      <section className="px-5 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow={t("platform.capabilities.eyebrow")}
            title={t("platform.capabilities.title")}
            description={t("platform.capabilities.description")}
          />

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {content.capabilities.map((item) => (
              <CapabilityCard
                key={item.id}
                icon={item.icon}
                title={item.title}
                text={item.text}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow={t("platform.deliverables.eyebrow")}
            title={t("platform.deliverables.title")}
            description={t("platform.deliverables.description")}
          />

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {content.deliverables.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.id}
                  className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
                >
                  <Icon className="mb-5 h-8 w-8 text-cyan-300" />

                  <h3 className="text-xl font-semibold">{item.title}</h3>

                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-white/[0.05] p-8 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
                {t("platform.architecture.eyebrow")}
              </div>

              <h2 className="text-4xl font-semibold tracking-tight">
                {t("platform.architecture.title")}
              </h2>

              <p className="mt-5 leading-8 text-slate-300">
                {t("platform.architecture.description")}
              </p>
            </div>

            <div className="grid gap-4">
              {[
                t("platform.architecture.layer1"),
                t("platform.architecture.layer2"),
                t("platform.architecture.layer3"),
                t("platform.architecture.layer4"),
              ].map((item, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-white/10 bg-slate-950/60 p-5"
                >
                  <div className="mb-2 text-sm text-cyan-300">
                    Layer {index + 1}
                  </div>
                  <div className="text-lg font-semibold">{item}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
