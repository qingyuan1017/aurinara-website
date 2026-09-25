import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ShieldCheck } from "lucide-react";

import ButtonLink from "../components/ButtonLink";
import CapabilityCard from "../components/CapabilityCard";
import MetricCard from "../components/MetricCard";
import SectionHeader from "../components/SectionHeader";
import Reveal from "../components/Reveal";
import BrandGraphic from "../components/BrandGraphic";
import { useLanguage } from "../i18n";

export default function Home() {
  const { t, content } = useLanguage();

  const consoleRows = [
    { nameKey: "home.console.row1.name", statusKey: "home.console.row1.status", fill: "92%", color: "bg-teal-600" },
    { nameKey: "home.console.row2.name", statusKey: "home.console.row2.status", fill: "84%", color: "bg-sage-500" },
    { nameKey: "home.console.row3.name", statusKey: "home.console.row3.status", fill: "88%", color: "bg-teal-400" },
    { nameKey: "home.console.row4.name", statusKey: "home.console.row4.status", fill: "78%", color: "bg-gold-400" },
    { nameKey: "home.console.row5.name", statusKey: "home.console.row5.status", fill: "72%", color: "bg-sage-400" },
  ];

  const workflowChipKeys = [
    "home.workflow.chip1",
    "home.workflow.chip2",
    "home.workflow.chip3",
    "home.workflow.chip4",
    "home.workflow.chip5",
  ] as const;

  return (
    <>
      {/* Hero — asymmetric, editorial */}
      <section className="relative overflow-hidden px-5 pt-16 pb-20 sm:pt-24 lg:px-8">
        <div className="mx-auto grid max-w-6xl items-end gap-x-12 gap-y-14 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 text-sm text-sage-600">
              <span className="h-px w-8 bg-sage-500/60" aria-hidden />
              <span className="italic">{t("home.hero.badge")}</span>
            </div>

            <h1 className="font-display mt-6 text-[2.75rem] leading-[1.05] text-teal-900 sm:text-6xl lg:text-[4.25rem]">
              {t("home.hero.title")}
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-teal-900/70">
              {t("home.hero.body")}
            </p>

            <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-8">
              <ButtonLink to="/platform">{t("home.hero.buttonPrimary")}</ButtonLink>
              <ButtonLink to="/solutions" variant="secondary">
                {t("home.hero.buttonSecondary")}
              </ButtonLink>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative lg:rotate-[0.6deg]"
          >
            {/* on-brand animated motif peeking behind the console */}
            <BrandGraphic className="pointer-events-none absolute -top-16 -right-6 hidden h-40 w-40 opacity-90 sm:block lg:-top-20 lg:-right-10 lg:h-48 lg:w-48" />

            <div className="relative border border-teal-900/15 bg-white shadow-[8px_8px_0_0_rgba(13,46,56,0.06)]">
              <div className="flex items-center justify-between border-b border-teal-900/10 px-5 py-4">
                <div>
                  <div className="text-sm font-medium text-teal-900">
                    {t("home.console.title")}
                  </div>
                  <div className="text-xs text-teal-900/50">
                    {t("home.console.subtitle")}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-sage-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-sage-500" aria-hidden />
                  {t("home.console.validated")}
                </div>
              </div>

              <div className="grid gap-4 px-5 py-5">
                {consoleRows.map((row, i) => (
                  <div key={row.nameKey}>
                    <div className="mb-2 flex items-baseline justify-between text-sm">
                      <span className="text-teal-900">{t(row.nameKey)}</span>
                      <span className="text-xs text-teal-900/45">{t(row.statusKey)}</span>
                    </div>

                    <div className="h-1.5 overflow-hidden rounded-full bg-teal-900/10">
                      <motion.div
                        className={`h-full rounded-full ${row.color}`}
                        initial={{ width: 0 }}
                        animate={{ width: row.fill }}
                        transition={{
                          duration: 0.9,
                          delay: 0.5 + i * 0.12,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-start gap-3 border-t border-teal-900/10 bg-teal-50/50 px-5 py-4">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-teal-700" strokeWidth={1.5} />
                <div>
                  <div className="text-sm font-medium text-teal-800">
                    {t("home.traceability.title")}
                  </div>
                  <p className="mt-1 text-sm leading-6 text-teal-900/65">
                    {t("home.traceability.text")}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Metrics as a hairline-divided row, not boxed cards */}
        <div className="mx-auto mt-16 grid max-w-6xl grid-cols-2 gap-x-10 gap-y-8 sm:grid-cols-4">
          {content.metrics.map((metric) => (
            <MetricCard key={metric.label} value={metric.value} label={metric.label} />
          ))}
        </div>
      </section>

      {/* Capabilities — editorial index */}
      <section className="border-t border-teal-900/10 px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionHeader
              eyebrow={t("home.platform.eyebrow")}
              title={t("home.platform.title")}
              description={t("home.platform.description")}
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

      {/* Workflow */}
      <section className="border-t border-teal-900/10 px-5 py-20 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-x-16 gap-y-12 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <SectionHeader
              eyebrow={t("home.workflow.eyebrow")}
              title={t("home.workflow.title")}
              description={t("home.workflow.description")}
            />
          </Reveal>

          <Reveal delay={0.1}>
            <ol className="divide-y divide-teal-900/10 border-t border-teal-900/10">
              {content.workflowSteps.map((step, index) => (
                <li key={step.id} className="flex gap-6 py-5">
                  <span className="font-display text-2xl leading-none text-gold-500">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <div className="font-medium text-teal-900">{step.title}</div>
                    <div className="mt-1 text-sm leading-6 text-teal-900/60">
                      {step.text}
                    </div>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-teal-900/60">
              {workflowChipKeys.map((key, i) => (
                <span key={key} className="inline-flex items-center gap-2">
                  {i > 0 && <span className="text-teal-900/25" aria-hidden>&middot;</span>}
                  {t(key)}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA — full-bleed teal band */}
      <section className="relative overflow-hidden bg-teal-900 px-5 py-20 text-canvas lg:px-8">
        {/* faint gold "sun" accent, gently breathing */}
        <motion.div
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold-400/15 blur-2xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <Reveal>
            <h2 className="font-display max-w-2xl text-4xl leading-[1.1] sm:text-5xl">
              {t("home.cta.title")}
            </h2>
            <p className="mt-5 max-w-2xl leading-8 text-canvas/75">
              {t("home.cta.body")}
            </p>
          </Reveal>

          <div className="flex flex-col items-start gap-4 sm:flex-row lg:flex-col lg:items-end">
            <Link
              to="/contact"
              className="rounded-md bg-gold-400 px-6 py-3 font-medium text-teal-900 transition hover:bg-gold-300"
            >
              {t("home.cta.buttonPrimary")}
            </Link>
            <Link
              to="/platform"
              className="group inline-flex items-center gap-2 font-medium text-canvas/80 transition hover:text-canvas"
            >
              <span className="border-b border-canvas/30 pb-0.5 transition group-hover:border-canvas">
                {t("home.cta.buttonSecondary")}
              </span>
              <span aria-hidden className="transition group-hover:translate-x-0.5">
                &rarr;
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
