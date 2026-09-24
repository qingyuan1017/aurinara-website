import { motion } from "framer-motion";
import { CheckCircle2, ShieldCheck, Zap } from "lucide-react";

import ButtonLink from "../components/ButtonLink";
import CapabilityCard from "../components/CapabilityCard";
import MetricCard from "../components/MetricCard";
import SectionHeader from "../components/SectionHeader";
import { useLanguage } from "../i18n";

export default function Home() {
  const { t, content } = useLanguage();

  const consoleRows = [
    { nameKey: "home.console.row1.name", statusKey: "home.console.row1.status", width: "w-[92%]", color: "bg-cyan-300" },
    { nameKey: "home.console.row2.name", statusKey: "home.console.row2.status", width: "w-[84%]", color: "bg-indigo-300" },
    { nameKey: "home.console.row3.name", statusKey: "home.console.row3.status", width: "w-[88%]", color: "bg-emerald-300" },
    { nameKey: "home.console.row4.name", statusKey: "home.console.row4.status", width: "w-[78%]", color: "bg-amber-300" },
    { nameKey: "home.console.row5.name", statusKey: "home.console.row5.status", width: "w-[72%]", color: "bg-pink-300" },
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
      <section className="relative overflow-hidden px-5 py-20 sm:py-28 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-cyan-100 shadow-xl shadow-cyan-950/20">
              <Zap className="h-4 w-4 text-cyan-300" />
              {t("home.hero.badge")}
            </div>

            <h1 className="max-w-5xl text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
              {t("home.hero.title")}
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">
              {t("home.hero.body")}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink to="/platform">{t("home.hero.buttonPrimary")}</ButtonLink>
              <ButtonLink to="/solutions" variant="secondary">
                {t("home.hero.buttonSecondary")}
              </ButtonLink>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {content.metrics.map((metric) => (
                <MetricCard
                  key={metric.label}
                  value={metric.value}
                  label={metric.label}
                />
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="relative rounded-[2rem] border border-white/10 bg-white/[0.06] p-3 shadow-2xl shadow-cyan-950/30 backdrop-blur">
              <div className="rounded-[1.5rem] border border-white/10 bg-slate-900/90 p-5">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-slate-200">
                      {t("home.console.title")}
                    </div>
                    <div className="text-xs text-slate-500">
                      {t("home.console.subtitle")}
                    </div>
                  </div>

                  <div className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
                    {t("home.console.validated")}
                  </div>
                </div>

                <div className="grid gap-3">
                  {consoleRows.map((row) => (
                    <div
                      key={row.nameKey}
                      className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                    >
                      <div className="mb-3 flex items-center justify-between text-sm">
                        <span className="text-slate-200">{t(row.nameKey)}</span>
                        <span className="text-slate-500">{t(row.statusKey)}</span>
                      </div>

                      <div className="h-2 overflow-hidden rounded-full bg-white/10">
                        <div
                          className={`h-full rounded-full ${row.width} ${row.color}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4">
                  <div className="mb-2 flex items-center gap-2 text-sm font-medium text-cyan-100">
                    <ShieldCheck className="h-4 w-4" />
                    {t("home.traceability.title")}
                  </div>

                  <p className="text-sm leading-6 text-slate-300">
                    {t("home.traceability.text")}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow={t("home.platform.eyebrow")}
            title={t("home.platform.title")}
            description={t("home.platform.description")}
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
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-white/[0.05] p-6 lg:p-10">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <SectionHeader
              eyebrow={t("home.workflow.eyebrow")}
              title={t("home.workflow.title")}
              description={t("home.workflow.description")}
            />

            <div className="grid gap-4">
              {content.workflowSteps.map((step, index) => (
                <div
                  key={step.id}
                  className="flex gap-4 rounded-2xl border border-white/10 bg-slate-950/50 p-4"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cyan-300 text-sm font-bold text-slate-950">
                    {index + 1}
                  </div>

                  <div>
                    <div className="font-medium text-white">{step.title}</div>
                    <div className="mt-1 text-sm text-slate-400">
                      {step.text}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {workflowChipKeys.map((key) => (
              <div
                key={key}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-300"
              >
                <CheckCircle2 className="h-4 w-4 text-cyan-300" />
                {t(key)}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-cyan-300/20 bg-cyan-300/10 p-8 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                {t("home.cta.title")}
              </h2>

              <p className="mt-5 max-w-3xl leading-8 text-slate-300">
                {t("home.cta.body")}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <ButtonLink to="/contact">{t("home.cta.buttonPrimary")}</ButtonLink>
              <ButtonLink to="/platform" variant="secondary">
                {t("home.cta.buttonSecondary")}
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
