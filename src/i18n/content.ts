import {
  BrainCircuit,
  DatabaseZap,
  FileCheck2,
  GitBranch,
  Layers3,
  LineChart,
  LockKeyhole,
  Network,
  ShieldCheck,
  Table2,
  type LucideIcon,
} from "lucide-react";

import type { Language } from "./config";
import { translate, translations } from "./store";

export interface SiteContent {
  nav: { id: string; href: string; label: string }[];
  capabilities: { id: string; icon: LucideIcon; title: string; text: string }[];
  metrics: { value: string; label: string }[];
  workflowSteps: { id: string; title: string; text: string }[];
  solutions: {
    id: string;
    eyebrow: string;
    title: string;
    description: string;
    points: string[];
  }[];
  trustItems: { id: string; icon: LucideIcon; title: string; text: string }[];
  deliverables: { id: string; icon: LucideIcon; title: string; text: string }[];
}

// ─── Skeletons (language-independent) ────────────────────────────────────────

const navSkeleton = [
  { id: "platform", href: "/platform" },
  { id: "solutions", href: "/solutions" },
  { id: "workflow", href: "/workflow" },
  { id: "trust", href: "/trust" },
  { id: "contact", href: "/contact" },
];

const capabilitySkeleton = [
  { id: "protocolIntelligence", icon: BrainCircuit },
  { id: "clinicalKnowledgeGraph", icon: Network },
  { id: "reasoningEngine", icon: GitBranch },
  { id: "sdtmAdamMapping", icon: Table2 },
  { id: "tlfAutomation", icon: LineChart },
  { id: "sapGenerationQc", icon: FileCheck2 },
];

const metricSkeleton = [
  { id: "automationLayers" },
  { id: "traceableDecisions" },
  { id: "draftAcceleration" },
  { id: "reviewWorkflow" },
];

const workflowStepSkeleton = [
  { id: "step1" },
  { id: "step2" },
  { id: "step3" },
  { id: "step4" },
  { id: "step5" },
];

const solutionSkeleton = [
  { id: "statisticalProgramming", pointCount: 6 },
  { id: "biostatistics", pointCount: 6 },
  { id: "clinicalOperations", pointCount: 6 },
];

const trustItemSkeleton = [
  { id: "inspectionReady", icon: ShieldCheck },
  { id: "enterpriseControls", icon: LockKeyhole },
  { id: "reusableStandards", icon: Layers3 },
];

const deliverableSkeleton = [
  { id: "sdtmMapping", icon: DatabaseZap },
  { id: "adamDesign", icon: Table2 },
  { id: "tlfPlanning", icon: LineChart },
  { id: "sapGeneration", icon: FileCheck2 },
];

// ─── Builder ─────────────────────────────────────────────────────────────────

export function buildSiteContent(language: Language): SiteContent {
  return {
    nav: navSkeleton.map((item) => ({
      id: item.id,
      href: item.href,
      label: translate(translations, language, `nav.${item.id}`),
    })),

    capabilities: capabilitySkeleton.map((item) => ({
      id: item.id,
      icon: item.icon,
      title: translate(
        translations,
        language,
        `capability.${item.id}.title`
      ),
      text: translate(translations, language, `capability.${item.id}.text`),
    })),

    metrics: metricSkeleton.map((item) => ({
      value: translate(translations, language, `metric.${item.id}.value`),
      label: translate(translations, language, `metric.${item.id}.label`),
    })),

    workflowSteps: workflowStepSkeleton.map((item) => ({
      id: item.id,
      title: translate(translations, language, `workflow.${item.id}.title`),
      text: translate(translations, language, `workflow.${item.id}.text`),
    })),

    solutions: solutionSkeleton.map((item) => ({
      id: item.id,
      eyebrow: translate(
        translations,
        language,
        `solution.${item.id}.eyebrow`
      ),
      title: translate(translations, language, `solution.${item.id}.title`),
      description: translate(
        translations,
        language,
        `solution.${item.id}.description`
      ),
      points: Array.from({ length: item.pointCount }, (_, i) =>
        translate(
          translations,
          language,
          `solution.${item.id}.point${i + 1}`
        )
      ),
    })),

    trustItems: trustItemSkeleton.map((item) => ({
      id: item.id,
      icon: item.icon,
      title: translate(translations, language, `trust.${item.id}.title`),
      text: translate(translations, language, `trust.${item.id}.text`),
    })),

    deliverables: deliverableSkeleton.map((item) => ({
      id: item.id,
      icon: item.icon,
      title: translate(
        translations,
        language,
        `deliverable.${item.id}.title`
      ),
      text: translate(translations, language, `deliverable.${item.id}.text`),
    })),
  };
}
