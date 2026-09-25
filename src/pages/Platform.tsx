import CapabilityCard from "../components/CapabilityCard";
import SectionHeader from "../components/SectionHeader";
import Reveal from "../components/Reveal";
import { useLanguage } from "../i18n";

export default function Platform() {
  const { t, content } = useLanguage();

  return (
    <>
      <section className="px-5 pt-20 pb-16 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionHeader
              eyebrow={t("platform.capabilities.eyebrow")}
              title={t("platform.capabilities.title")}
              description={t("platform.capabilities.description")}
            />
          </Reveal>

          <div className="mt-14 grid gap-x-12 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {content.capabilities.map((item, i) => (
              <Reveal key={item.id} delay={(i % 3) * 0.08}>
                <CapabilityCard
                  icon={item.icon}
                  title={item.title}
                  text={item.text}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-teal-900/10 px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionHeader
              eyebrow={t("platform.deliverables.eyebrow")}
              title={t("platform.deliverables.title")}
              description={t("platform.deliverables.description")}
            />
          </Reveal>

          <div className="mt-14 grid gap-x-12 gap-y-12 md:grid-cols-2 lg:grid-cols-4">
            {content.deliverables.map((item, i) => {
              const Icon = item.icon;

              return (
                <Reveal key={item.id} delay={(i % 4) * 0.08}>
                  <div className="border-t border-teal-900/15 pt-5">
                    <Icon className="h-7 w-7 text-sage-600" strokeWidth={1.5} />

                    <h3 className="font-display mt-4 text-lg text-teal-900">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-7 text-teal-900/70">
                      {item.text}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-teal-900/10 px-5 py-20 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-x-16 gap-y-10 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <div className="flex items-center gap-3 text-sm text-sage-600">
              <span className="h-px w-8 bg-sage-500/60" aria-hidden />
              <span className="italic">{t("platform.architecture.eyebrow")}</span>
            </div>

            <h2 className="font-display mt-4 text-4xl leading-[1.1] text-teal-900">
              {t("platform.architecture.title")}
            </h2>

            <p className="mt-5 leading-8 text-teal-900/70">
              {t("platform.architecture.description")}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <ol className="divide-y divide-teal-900/10 border-t border-teal-900/10">
              {[
                t("platform.architecture.layer1"),
                t("platform.architecture.layer2"),
                t("platform.architecture.layer3"),
                t("platform.architecture.layer4"),
              ].map((item, index) => (
                <li key={index} className="flex items-baseline gap-6 py-5">
                  <span className="font-display text-sm text-gold-500">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-lg text-teal-900">{item}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>
    </>
  );
}
