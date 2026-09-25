import { motion } from "framer-motion";
import SectionHeader from "../components/SectionHeader";
import Reveal from "../components/Reveal";
import { useLanguage } from "../i18n";

export default function Workflow() {
  const { t, content } = useLanguage();

  return (
    <>
      <section className="px-5 pt-20 pb-16 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionHeader
              eyebrow={t("workflowPage.header.eyebrow")}
              title={t("workflowPage.header.title")}
              description={t("workflowPage.header.description")}
            />
          </Reveal>

          {/* Vertical timeline */}
          <ol className="mt-16 max-w-3xl">
            {content.workflowSteps.map((step, index) => (
              <li key={step.id} className="relative flex gap-8 pb-10 last:pb-0">
                {/* connecting line draws itself in */}
                {index < content.workflowSteps.length - 1 && (
                  <motion.span
                    className="absolute left-[1.4rem] top-12 bottom-0 w-px origin-top bg-teal-900/15"
                    aria-hidden
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5, delay: 0.15 + index * 0.1 }}
                  />
                )}

                <motion.span
                  className="font-display relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-teal-900/15 bg-[#f7f4ec] text-lg text-teal-800"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.4, delay: index * 0.1, ease: "backOut" }}
                >
                  {index + 1}
                </motion.span>

                <Reveal delay={index * 0.1} y={12} className="pt-1">
                  <h3 className="font-display text-2xl leading-tight text-teal-900">
                    {step.title}
                  </h3>
                  <p className="mt-2 leading-7 text-teal-900/70">{step.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-teal-900/10 px-5 py-20 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-x-16 gap-y-10 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal className="border-l-2 border-gold-400 pl-6">
            <div className="text-sm italic text-sage-600">
              {t("workflowPage.validation.eyebrow")}
            </div>

            <h2 className="font-display mt-3 text-4xl leading-[1.1] text-teal-900">
              {t("workflowPage.validation.title")}
            </h2>

            <p className="mt-5 leading-8 text-teal-900/70">
              {t("workflowPage.validation.description")}
            </p>
          </Reveal>

          <ul className="grid gap-x-10 gap-y-4 sm:grid-cols-2">
            {[1, 2, 3, 4, 5, 6].map((n, i) => (
              <li key={n}>
                <Reveal delay={(i % 2) * 0.08} y={12} className="flex gap-3 text-teal-900/80">
                  <span className="mt-3 h-px w-4 shrink-0 bg-sage-500" aria-hidden />
                  <span className="leading-7">{t(`workflowPage.validation.item${n}`)}</span>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
