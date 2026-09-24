import { DEFAULT_LANGUAGE, type Language } from './config';
import type { TranslationKey, TranslationStore } from './types';

/**
 * Resolve a key in the active language with fallback chain:
 * active -> default -> key (returned unchanged).
 */
export function translate(
  store: TranslationStore,
  language: Language,
  key: TranslationKey
): string {
  // 1. Try active language
  const activeValue = store[language]?.[key];
  if (activeValue !== undefined) {
    return activeValue;
  }

  // 2. Try default language
  const defaultValue = store[DEFAULT_LANGUAGE]?.[key];
  if (defaultValue !== undefined) {
    return defaultValue;
  }

  // 3. Return key unchanged
  return key;
}

export const translations: TranslationStore = {
  en: {
    // Header
    "header.brand": "Aurinara Clinical AI",
    "header.tagline": "Study automation platform",
    "header.signIn": "Sign in",
    "header.requestDemo": "Request demo",
    "header.menuToggle": "Toggle mobile menu",

    // Navigation
    "nav.platform": "Platform",
    "nav.solutions": "Solutions",
    "nav.workflow": "Workflow",
    "nav.trust": "Trust",
    "nav.contact": "Contact",

    // Footer
    "footer.copyright": "© 2026 Aurinara Clinical AI. All rights reserved.",
    "footer.security": "Security",
    "footer.platform": "Platform",
    "footer.contact": "Contact",

    // Home — Hero
    "home.hero.badge": "AI-native automation for clinical study delivery",
    "home.hero.title": "Turn protocols into SDTM, ADaM, TLFs, and SAPs with traceable intelligence.",
    "home.hero.body": "Aurinara Clinical AI helps biostatistics and statistical programming teams transform clinical documents, raw data structures, and standards into structured, auditable deliverables across the study lifecycle.",
    "home.hero.buttonPrimary": "See the platform",
    "home.hero.buttonSecondary": "Explore use cases",

    // Home — Console
    "home.console.title": "Study Automation Console",
    "home.console.subtitle": "Protocol → Standards → Deliverables",
    "home.console.validated": "Validated",
    "home.console.row1.name": "Protocol parsing",
    "home.console.row1.status": "92% complete",
    "home.console.row2.name": "Endpoint ontology",
    "home.console.row2.status": "Ready",
    "home.console.row3.name": "SDTM mapping",
    "home.console.row3.status": "38 domains",
    "home.console.row4.name": "ADaM derivations",
    "home.console.row4.status": "12 datasets",
    "home.console.row5.name": "SAP sections",
    "home.console.row5.status": "18 generated",

    // Home — Traceability
    "home.traceability.title": "Traceability check passed",
    "home.traceability.text": "Every generated SAP paragraph links to protocol evidence, ontology entities, decision rules, and reviewer comments.",

    // Home — Platform section
    "home.platform.eyebrow": "Platform",
    "home.platform.title": "One intelligence layer for clinical data and statistical deliverables.",
    "home.platform.description": "Replace disconnected drafting, mapping spreadsheets, and manual QC with a structured automation platform that understands clinical trial semantics.",

    // Home — Workflow section
    "home.workflow.eyebrow": "Workflow",
    "home.workflow.title": "A governed pipeline, not a black box.",
    "home.workflow.description": "Every automation step produces structured data, validation results, and transparent rationale.",
    "home.workflow.chip1": "Protocol evidence",
    "home.workflow.chip2": "Ontology entities",
    "home.workflow.chip3": "Decision rules",
    "home.workflow.chip4": "Generated outputs",
    "home.workflow.chip5": "QC findings",

    // Home — CTA section
    "home.cta.title": "Modernize clinical automation without sacrificing control.",
    "home.cta.body": "Bring protocol parsing, SDTM mapping, ADaM derivation planning, TLF generation, SAP drafting, and QC into one transparent platform.",
    "home.cta.buttonPrimary": "Request demo",
    "home.cta.buttonSecondary": "View platform",

    // Capabilities
    "capability.protocolIntelligence.title": "Protocol Intelligence",
    "capability.protocolIntelligence.text": "Parse protocols into structured clinical, statistical, and regulatory metadata with traceable evidence back to source sections.",
    "capability.clinicalKnowledgeGraph.title": "Clinical Knowledge Graph",
    "capability.clinicalKnowledgeGraph.text": "Connect endpoints, estimands, populations, SDTM domains, ADaM datasets, TLF shells, and SAP decisions in one reusable semantic layer.",
    "capability.reasoningEngine.title": "Reasoning Engine",
    "capability.reasoningEngine.text": "Blend deterministic rules with LLM-assisted interpretation so automation remains explainable, reproducible, and reviewer-ready.",
    "capability.sdtmAdamMapping.title": "SDTM & ADaM Mapping",
    "capability.sdtmAdamMapping.text": "Generate auditable mapping specifications from raw data structures, controlled terminology, derivation logic, and study context.",
    "capability.tlfAutomation.title": "TLF Automation",
    "capability.tlfAutomation.text": "Accelerate table, listing, and figure planning from endpoints, analysis populations, visit windows, and statistical methods.",
    "capability.sapGenerationQc.title": "SAP Generation & QC",
    "capability.sapGenerationQc.text": "Produce structured SAP sections with cross-section consistency checks, provenance, and human-in-the-loop review workflows.",

    // Metrics
    "metric.automationLayers.value": "4",
    "metric.automationLayers.label": "automation layers",
    "metric.traceableDecisions.value": "100%",
    "metric.traceableDecisions.label": "traceable decisions",
    "metric.draftAcceleration.value": "Weeks→Days",
    "metric.draftAcceleration.label": "draft acceleration",
    "metric.reviewWorkflow.value": "GxP-ready",
    "metric.reviewWorkflow.label": "review workflow",

    // Workflow steps
    "workflow.step1.title": "Ingest study source materials",
    "workflow.step1.text": "Load protocol, CRF, raw data structure, shells, SAP template, controlled terminology, and sponsor standards.",
    "workflow.step2.title": "Extract structured clinical metadata",
    "workflow.step2.text": "Identify trial design, objectives, endpoints, estimands, visits, populations, interventions, and analysis windows.",
    "workflow.step3.title": "Standardize through ontology",
    "workflow.step3.text": "Normalize extracted entities into reusable clinical and statistical concepts connected through a knowledge graph.",
    "workflow.step4.title": "Generate study deliverables",
    "workflow.step4.text": "Create SDTM mapping, ADaM design, TLF plan, SAP sections, derivation logic, and review-ready specifications.",
    "workflow.step5.title": "Validate and review",
    "workflow.step5.text": "Run consistency checks, traceability checks, completeness checks, and human-in-the-loop review before finalization.",

    // Solutions
    "solution.statisticalProgramming.eyebrow": "For Statistical Programming",
    "solution.statisticalProgramming.title": "From raw data to defensible SDTM and ADaM pipelines",
    "solution.statisticalProgramming.description": "Give programmers a structured starting point for mapping, derivations, controlled terminology, and programming-ready specifications.",
    "solution.statisticalProgramming.point1": "Raw dataset profiling",
    "solution.statisticalProgramming.point2": "SDTM domain inference",
    "solution.statisticalProgramming.point3": "Variable-level mapping",
    "solution.statisticalProgramming.point4": "Controlled terminology matching",
    "solution.statisticalProgramming.point5": "ADaM dataset planning",
    "solution.statisticalProgramming.point6": "R/SAS-ready derivation logic",
    "solution.biostatistics.eyebrow": "For Biostatistics",
    "solution.biostatistics.title": "Structured SAP generation driven by protocol evidence",
    "solution.biostatistics.description": "Transform protocol language into analysis decisions, estimand alignment, endpoint strategy, and reviewer-ready SAP content.",
    "solution.biostatistics.point1": "Endpoint standardization",
    "solution.biostatistics.point2": "Estimand alignment",
    "solution.biostatistics.point3": "Statistical method selection",
    "solution.biostatistics.point4": "Multiplicity strategy",
    "solution.biostatistics.point5": "Missing data handling",
    "solution.biostatistics.point6": "Sensitivity analysis planning",
    "solution.clinicalOperations.eyebrow": "For Clinical Operations",
    "solution.clinicalOperations.title": "A transparent automation layer across study documents",
    "solution.clinicalOperations.description": "Use the same structured study intelligence across protocol amendments, standards governance, and cross-functional review.",
    "solution.clinicalOperations.point1": "Protocol metadata extraction",
    "solution.clinicalOperations.point2": "Amendment impact analysis",
    "solution.clinicalOperations.point3": "Reusable study standards",
    "solution.clinicalOperations.point4": "Cross-document consistency",
    "solution.clinicalOperations.point5": "Review workflow support",
    "solution.clinicalOperations.point6": "Evidence-backed outputs",

    // Trust items
    "trust.inspectionReady.title": "Inspection-ready traceability",
    "trust.inspectionReady.text": "Link every generated output to source evidence, structured metadata, rule decisions, and human review history.",
    "trust.enterpriseControls.title": "Enterprise controls",
    "trust.enterpriseControls.text": "Support project isolation, role-based access, secure deployment patterns, audit trails, and controlled review workflows.",
    "trust.reusableStandards.title": "Reusable standards",
    "trust.reusableStandards.text": "Promote consistency across studies, programs, sponsors, therapeutic areas, and delivery teams.",

    // Deliverables
    "deliverable.sdtmMapping.title": "SDTM Mapping",
    "deliverable.sdtmMapping.text": "Domain and variable-level mappings with rules, terminology, justifications, and source linkage.",
    "deliverable.adamDesign.title": "ADaM Design",
    "deliverable.adamDesign.text": "Dataset planning, derivation structure, population flags, analysis windows, and endpoint-ready variables.",
    "deliverable.tlfPlanning.title": "TLF Planning",
    "deliverable.tlfPlanning.text": "Table shells, endpoint linkage, population logic, visit windows, and statistical method alignment.",
    "deliverable.sapGeneration.title": "SAP Generation",
    "deliverable.sapGeneration.text": "Structured SAP sections backed by protocol metadata, ontology entities, and decision logic.",

    // Platform page
    "platform.capabilities.eyebrow": "Platform",
    "platform.capabilities.title": "A structured automation platform for clinical study delivery.",
    "platform.capabilities.description": "Aurinara Clinical AI connects protocol understanding, clinical ontology, standards mapping, statistical reasoning, document generation, and validation into one transparent workflow.",
    "platform.deliverables.eyebrow": "Deliverables",
    "platform.deliverables.title": "Generate connected outputs instead of isolated files.",
    "platform.deliverables.description": "Each deliverable is backed by the same structured metadata, which helps reduce inconsistencies across SDTM, ADaM, TLFs, and SAP sections.",
    "platform.architecture.eyebrow": "Architecture",
    "platform.architecture.title": "Designed around evidence, rules, ontology, and human review.",
    "platform.architecture.description": "The platform does not simply ask an LLM to write documents. It creates structured intermediate artifacts, applies deterministic logic, uses AI where interpretation is needed, and preserves traceability for review.",
    "platform.architecture.layer1": "Protocol intelligence layer",
    "platform.architecture.layer2": "Clinical/statistical ontology",
    "platform.architecture.layer3": "Decision and reasoning engine",
    "platform.architecture.layer4": "Generation and QC layer",

    // Solutions page
    "solutions.header.eyebrow": "Solutions",
    "solutions.header.title": "Built for the teams responsible for study quality.",
    "solutions.header.description": "Support statistical programming, biostatistics, clinical operations, and cross-functional review with one connected automation framework.",
    "solutions.useCases.eyebrow": "Use Cases",
    "solutions.useCases.title": "Start with one workflow. Expand across the study lifecycle.",
    "solutions.useCases.description": "Teams can start with SDTM mapping or SAP generation first, then gradually connect ADaM design, TLF planning, QC, and standards governance.",
    "solutions.useCases.button": "Discuss your use case",
    "solutions.useCases.card1.title": "SDTM Mapping Co-Pilot",
    "solutions.useCases.card1.text": "Infer domain and variable mappings from raw data structures, source metadata, standards, and protocol context.",
    "solutions.useCases.card2.title": "SAP Generation Assistant",
    "solutions.useCases.card2.text": "Generate structured SAP sections from endpoints, estimands, populations, analysis methods, and sponsor templates.",
    "solutions.useCases.card3.title": "ADaM & TLF Planning",
    "solutions.useCases.card3.text": "Align analysis datasets and outputs with endpoint strategy, visit windows, analysis populations, and statistical methods.",
    "solutions.useCases.card4.title": "Protocol Amendment Impact",
    "solutions.useCases.card4.text": "Identify which metadata, mappings, outputs, and SAP sections may need regeneration after protocol changes.",

    // Workflow page
    "workflowPage.header.eyebrow": "Workflow",
    "workflowPage.header.title": "From protocol documents to controlled clinical deliverables.",
    "workflowPage.header.description": "The workflow is designed to preserve structure, evidence, validation state, and human decisions from the first extraction through final output.",
    "workflowPage.validation.eyebrow": "Validation",
    "workflowPage.validation.title": "QC is built into the pipeline, not added after generation.",
    "workflowPage.validation.description": "Each output can be checked against source evidence, internal standards, controlled terminology, statistical rules, and cross-document consistency expectations.",
    "workflowPage.validation.item1": "Schema validation",
    "workflowPage.validation.item2": "Protocol evidence linkage",
    "workflowPage.validation.item3": "Endpoint-to-estimand consistency",
    "workflowPage.validation.item4": "Population and visit-window consistency",
    "workflowPage.validation.item5": "SDTM/ADaM/TLF/SAP cross-checks",
    "workflowPage.validation.item6": "Human review and override history",

    // Trust page
    "trustPage.header.eyebrow": "Trust",
    "trustPage.header.title": "Designed for regulated clinical work.",
    "trustPage.header.description": "The platform is built around transparency, traceability, controlled review, and enterprise deployment patterns suitable for clinical study teams.",
    "trustPage.governance.eyebrow": "Governance",
    "trustPage.governance.title": "Keep AI assistance within a controlled operating model.",
    "trustPage.governance.description": "Aurinara Clinical AI separates interpretation, rules, generation, validation, and approval so teams can use automation without losing accountability.",
    "trustPage.governance.item1": "LLM outputs constrained by structured schemas",
    "trustPage.governance.item2": "Deterministic rules for core statistical decisions",
    "trustPage.governance.item3": "Reviewer approval before final deliverables",
    "trustPage.governance.item4": "Audit trail for generated and edited outputs",
    "trustPage.governance.item5": "Source-level provenance for generated text",
    "trustPage.governance.item6": "Project-level isolation and access control",

    // Contact page
    "contact.header.eyebrow": "Contact",
    "contact.header.title": "Let's discuss clinical automation for your study workflow.",
    "contact.header.description": "Share your focus area, whether it is SDTM mapping, ADaM planning, TLF automation, SAP generation, protocol parsing, or an integrated study intelligence platform.",
    "contact.info.email.title": "Email",
    "contact.info.email.text": "sales@aurinara.com",
    "contact.info.phone.title": "Phone",
    "contact.info.phone.text": "+1 (404) 834-6410",
    "contact.info.location.title": "Location",
    "contact.info.location.text": "New York / New Jersey, United States",
    "contact.info.bestFit.title": "Best fit",
    "contact.info.bestFit.text": "Biostatistics, statistical programming, clinical data science, and AI automation teams.",
    "contact.form.nameLabel": "Name",
    "contact.form.namePlaceholder": "Your name",
    "contact.form.emailLabel": "Work email",
    "contact.form.emailPlaceholder": "you@company.com",
    "contact.form.orgLabel": "Organization",
    "contact.form.orgPlaceholder": "Company name",
    "contact.form.interestLabel": "Area of interest",
    "contact.form.interest.sdtm": "SDTM mapping automation",
    "contact.form.interest.adam": "ADaM generation planning",
    "contact.form.interest.tlf": "TLF automation",
    "contact.form.interest.sap": "SAP generation",
    "contact.form.interest.platform": "End-to-end platform",
    "contact.form.messageLabel": "Message",
    "contact.form.messagePlaceholder": "Tell us about your workflow, study type, or automation needs.",
    "contact.form.submit": "Request demo",
    "contact.form.disclaimer": "This form is front-end only for now. Later you can connect it to AWS SES, API Gateway + Lambda, FastAPI, HubSpot, or another CRM.",
  },
  zh: {
    // Header
    "header.brand": "Aurinara 临床AI",
    "header.tagline": "研究自动化平台",
    "header.signIn": "登录",
    "header.requestDemo": "预约演示",
    "header.menuToggle": "切换移动菜单",

    // Navigation
    "nav.platform": "平台",
    "nav.solutions": "解决方案",
    "nav.workflow": "工作流程",
    "nav.trust": "信任",
    "nav.contact": "联系我们",

    // Footer
    "footer.copyright": "© 2026 Aurinara Clinical AI 版权所有。",
    "footer.security": "安全",
    "footer.platform": "平台",
    "footer.contact": "联系我们",

    // Home — Hero
    "home.hero.badge": "AI原生临床研究交付自动化",
    "home.hero.title": "通过可追溯的智能将方案转化为SDTM、ADaM、TLF和SAP。",
    "home.hero.body": "Aurinara临床AI帮助生物统计和统计编程团队将临床文档、原始数据结构和标准转化为贯穿研究生命周期的结构化、可审计的交付物。",
    "home.hero.buttonPrimary": "查看平台",
    "home.hero.buttonSecondary": "探索应用场景",

    // Home — Console
    "home.console.title": "研究自动化控制台",
    "home.console.subtitle": "方案 → 标准 → 交付物",
    "home.console.validated": "已验证",
    "home.console.row1.name": "方案解析",
    "home.console.row1.status": "完成92%",
    "home.console.row2.name": "终点本体",
    "home.console.row2.status": "就绪",
    "home.console.row3.name": "SDTM映射",
    "home.console.row3.status": "38个域",
    "home.console.row4.name": "ADaM衍生",
    "home.console.row4.status": "12个数据集",
    "home.console.row5.name": "SAP章节",
    "home.console.row5.status": "已生成18个",

    // Home — Traceability
    "home.traceability.title": "可追溯性检查通过",
    "home.traceability.text": "每个生成的SAP段落都链接到方案证据、本体实体、决策规则和审查评论。",

    // Home — Platform section
    "home.platform.eyebrow": "平台",
    "home.platform.title": "临床数据和统计交付物的统一智能层。",
    "home.platform.description": "用理解临床试验语义的结构化自动化平台取代分散的起草、映射电子表格和手动质控。",

    // Home — Workflow section
    "home.workflow.eyebrow": "工作流程",
    "home.workflow.title": "受治理的流水线，而非黑盒。",
    "home.workflow.description": "每个自动化步骤都产出结构化数据、验证结果和透明的决策依据。",
    "home.workflow.chip1": "方案证据",
    "home.workflow.chip2": "本体实体",
    "home.workflow.chip3": "决策规则",
    "home.workflow.chip4": "生成产出",
    "home.workflow.chip5": "质控发现",

    // Home — CTA section
    "home.cta.title": "在不牺牲控制力的前提下实现临床自动化现代化。",
    "home.cta.body": "将方案解析、SDTM映射、ADaM衍生规划、TLF生成、SAP起草和质控整合到一个透明平台中。",
    "home.cta.buttonPrimary": "预约演示",
    "home.cta.buttonSecondary": "查看平台",

    // Capabilities
    "capability.protocolIntelligence.title": "方案智能",
    "capability.protocolIntelligence.text": "将方案解析为结构化的临床、统计和法规元数据，并可追溯到源文档章节。",
    "capability.clinicalKnowledgeGraph.title": "临床知识图谱",
    "capability.clinicalKnowledgeGraph.text": "在一个可复用的语义层中连接终点、估量、人群、SDTM域、ADaM数据集、TLF模板和SAP决策。",
    "capability.reasoningEngine.title": "推理引擎",
    "capability.reasoningEngine.text": "将确定性规则与LLM辅助解释相融合，使自动化保持可解释性、可复现性和可审查性。",
    "capability.sdtmAdamMapping.title": "SDTM与ADaM映射",
    "capability.sdtmAdamMapping.text": "从原始数据结构、受控术语、衍生逻辑和研究背景生成可审计的映射规范。",
    "capability.tlfAutomation.title": "TLF自动化",
    "capability.tlfAutomation.text": "从终点、分析人群、访视窗口和统计方法加速表格、列表和图形的规划。",
    "capability.sapGenerationQc.title": "SAP生成与质控",
    "capability.sapGenerationQc.text": "生成结构化SAP章节，包含跨章节一致性检查、来源追溯和人机协作审查工作流。",

    // Metrics
    "metric.automationLayers.value": "4",
    "metric.automationLayers.label": "自动化层",
    "metric.traceableDecisions.value": "100%",
    "metric.traceableDecisions.label": "可追溯决策",
    "metric.draftAcceleration.value": "数周→数天",
    "metric.draftAcceleration.label": "草稿加速",
    "metric.reviewWorkflow.value": "GxP就绪",
    "metric.reviewWorkflow.label": "审查工作流",

    // Workflow steps
    "workflow.step1.title": "导入研究源材料",
    "workflow.step1.text": "加载方案、CRF、原始数据结构、模板、SAP模板、受控术语和申办方标准。",
    "workflow.step2.title": "提取结构化临床元数据",
    "workflow.step2.text": "识别试验设计、目标、终点、估量、访视、人群、干预措施和分析窗口。",
    "workflow.step3.title": "通过本体进行标准化",
    "workflow.step3.text": "将提取的实体规范化为通过知识图谱连接的可复用临床和统计概念。",
    "workflow.step4.title": "生成研究交付物",
    "workflow.step4.text": "创建SDTM映射、ADaM设计、TLF计划、SAP章节、衍生逻辑和审查就绪规范。",
    "workflow.step5.title": "验证与审查",
    "workflow.step5.text": "在最终确定前运行一致性检查、可追溯性检查、完整性检查和人机协作审查。",

    // Solutions
    "solution.statisticalProgramming.eyebrow": "面向统计编程",
    "solution.statisticalProgramming.title": "从原始数据到可靠的SDTM和ADaM流水线",
    "solution.statisticalProgramming.description": "为编程人员提供映射、衍生、受控术语和编程就绪规范的结构化起点。",
    "solution.statisticalProgramming.point1": "原始数据集分析",
    "solution.statisticalProgramming.point2": "SDTM域推断",
    "solution.statisticalProgramming.point3": "变量级映射",
    "solution.statisticalProgramming.point4": "受控术语匹配",
    "solution.statisticalProgramming.point5": "ADaM数据集规划",
    "solution.statisticalProgramming.point6": "R/SAS就绪衍生逻辑",
    "solution.biostatistics.eyebrow": "面向生物统计",
    "solution.biostatistics.title": "由方案证据驱动的结构化SAP生成",
    "solution.biostatistics.description": "将方案语言转化为分析决策、估量对齐、终点策略和审查就绪的SAP内容。",
    "solution.biostatistics.point1": "终点标准化",
    "solution.biostatistics.point2": "估量对齐",
    "solution.biostatistics.point3": "统计方法选择",
    "solution.biostatistics.point4": "多重性策略",
    "solution.biostatistics.point5": "缺失数据处理",
    "solution.biostatistics.point6": "敏感性分析规划",
    "solution.clinicalOperations.eyebrow": "面向临床运营",
    "solution.clinicalOperations.title": "跨研究文档的透明自动化层",
    "solution.clinicalOperations.description": "在方案修正、标准治理和跨职能审查中使用相同的结构化研究智能。",
    "solution.clinicalOperations.point1": "方案元数据提取",
    "solution.clinicalOperations.point2": "修正案影响分析",
    "solution.clinicalOperations.point3": "可复用研究标准",
    "solution.clinicalOperations.point4": "跨文档一致性",
    "solution.clinicalOperations.point5": "审查工作流支持",
    "solution.clinicalOperations.point6": "证据支持的产出",

    // Trust items
    "trust.inspectionReady.title": "检查就绪的可追溯性",
    "trust.inspectionReady.text": "将每个生成的产出链接到源证据、结构化元数据、规则决策和人工审查历史。",
    "trust.enterpriseControls.title": "企业级控制",
    "trust.enterpriseControls.text": "支持项目隔离、基于角色的访问控制、安全部署模式、审计追踪和受控审查工作流。",
    "trust.reusableStandards.title": "可复用标准",
    "trust.reusableStandards.text": "在研究、项目、申办方、治疗领域和交付团队之间促进一致性。",

    // Deliverables
    "deliverable.sdtmMapping.title": "SDTM映射",
    "deliverable.sdtmMapping.text": "包含规则、术语、论证和源链接的域级和变量级映射。",
    "deliverable.adamDesign.title": "ADaM设计",
    "deliverable.adamDesign.text": "数据集规划、衍生结构、人群标志、分析窗口和终点就绪变量。",
    "deliverable.tlfPlanning.title": "TLF规划",
    "deliverable.tlfPlanning.text": "表格模板、终点链接、人群逻辑、访视窗口和统计方法对齐。",
    "deliverable.sapGeneration.title": "SAP生成",
    "deliverable.sapGeneration.text": "由方案元数据、本体实体和决策逻辑支持的结构化SAP章节。",

    // Platform page
    "platform.capabilities.eyebrow": "平台",
    "platform.capabilities.title": "面向临床研究交付的结构化自动化平台。",
    "platform.capabilities.description": "Aurinara临床AI将方案理解、临床本体、标准映射、统计推理、文档生成和验证整合为一个透明的工作流。",
    "platform.deliverables.eyebrow": "交付物",
    "platform.deliverables.title": "生成关联的产出，而非孤立的文件。",
    "platform.deliverables.description": "每个交付物都由相同的结构化元数据支持，有助于减少SDTM、ADaM、TLF和SAP章节之间的不一致性。",
    "platform.architecture.eyebrow": "架构",
    "platform.architecture.title": "围绕证据、规则、本体和人工审查设计。",
    "platform.architecture.description": "平台不只是让LLM编写文档。它创建结构化的中间产物，应用确定性逻辑，在需要解释的地方使用AI，并保留可追溯性以供审查。",
    "platform.architecture.layer1": "方案智能层",
    "platform.architecture.layer2": "临床/统计本体",
    "platform.architecture.layer3": "决策与推理引擎",
    "platform.architecture.layer4": "生成与质控层",

    // Solutions page
    "solutions.header.eyebrow": "解决方案",
    "solutions.header.title": "为负责研究质量的团队而建。",
    "solutions.header.description": "用一个连接的自动化框架支持统计编程、生物统计、临床运营和跨职能审查。",
    "solutions.useCases.eyebrow": "应用场景",
    "solutions.useCases.title": "从一个工作流开始，扩展到整个研究生命周期。",
    "solutions.useCases.description": "团队可以先从SDTM映射或SAP生成开始，然后逐步连接ADaM设计、TLF规划、质控和标准治理。",
    "solutions.useCases.button": "讨论您的应用场景",
    "solutions.useCases.card1.title": "SDTM映射助手",
    "solutions.useCases.card1.text": "从原始数据结构、源元数据、标准和方案背景推断域和变量映射。",
    "solutions.useCases.card2.title": "SAP生成助手",
    "solutions.useCases.card2.text": "从终点、估量、人群、分析方法和申办方模板生成结构化SAP章节。",
    "solutions.useCases.card3.title": "ADaM与TLF规划",
    "solutions.useCases.card3.text": "将分析数据集和产出与终点策略、访视窗口、分析人群和统计方法对齐。",
    "solutions.useCases.card4.title": "方案修正影响",
    "solutions.useCases.card4.text": "识别在方案变更后哪些元数据、映射、产出和SAP章节可能需要重新生成。",

    // Workflow page
    "workflowPage.header.eyebrow": "工作流程",
    "workflowPage.header.title": "从方案文档到受控的临床交付物。",
    "workflowPage.header.description": "工作流旨在从首次提取到最终产出的全过程中保留结构、证据、验证状态和人工决策。",
    "workflowPage.validation.eyebrow": "验证",
    "workflowPage.validation.title": "质控内建于流水线中，而非在生成后添加。",
    "workflowPage.validation.description": "每个产出都可以对照源证据、内部标准、受控术语、统计规则和跨文档一致性期望进行检查。",
    "workflowPage.validation.item1": "模式验证",
    "workflowPage.validation.item2": "方案证据链接",
    "workflowPage.validation.item3": "终点到估量一致性",
    "workflowPage.validation.item4": "人群与访视窗口一致性",
    "workflowPage.validation.item5": "SDTM/ADaM/TLF/SAP交叉检查",
    "workflowPage.validation.item6": "人工审查和覆盖历史",

    // Trust page
    "trustPage.header.eyebrow": "信任",
    "trustPage.header.title": "为受监管的临床工作设计。",
    "trustPage.header.description": "平台围绕透明度、可追溯性、受控审查和适合临床研究团队的企业部署模式构建。",
    "trustPage.governance.eyebrow": "治理",
    "trustPage.governance.title": "将AI辅助保持在受控的运营模式中。",
    "trustPage.governance.description": "Aurinara临床AI将解释、规则、生成、验证和审批分离，使团队在不失去问责制的情况下使用自动化。",
    "trustPage.governance.item1": "LLM输出受结构化模式约束",
    "trustPage.governance.item2": "核心统计决策使用确定性规则",
    "trustPage.governance.item3": "最终交付物需审查员批准",
    "trustPage.governance.item4": "已生成和已编辑产出的审计追踪",
    "trustPage.governance.item5": "生成文本的源级来源追溯",
    "trustPage.governance.item6": "项目级隔离和访问控制",

    // Contact page
    "contact.header.eyebrow": "联系我们",
    "contact.header.title": "让我们讨论适合您研究工作流的临床自动化。",
    "contact.header.description": "分享您的关注领域，无论是SDTM映射、ADaM规划、TLF自动化、SAP生成、方案解析，还是集成的研究智能平台。",
    "contact.info.email.title": "电子邮件",
    "contact.info.email.text": "sales@aurinara.com",
    "contact.info.phone.title": "电话",
    "contact.info.phone.text": "+1 (404) 834-6410",
    "contact.info.location.title": "地点",
    "contact.info.location.text": "美国纽约/新泽西",
    "contact.info.bestFit.title": "最佳适用",
    "contact.info.bestFit.text": "生物统计、统计编程、临床数据科学和AI自动化团队。",
    "contact.form.nameLabel": "姓名",
    "contact.form.namePlaceholder": "您的姓名",
    "contact.form.emailLabel": "工作邮箱",
    "contact.form.emailPlaceholder": "you@company.com",
    "contact.form.orgLabel": "组织",
    "contact.form.orgPlaceholder": "公司名称",
    "contact.form.interestLabel": "关注领域",
    "contact.form.interest.sdtm": "SDTM映射自动化",
    "contact.form.interest.adam": "ADaM生成规划",
    "contact.form.interest.tlf": "TLF自动化",
    "contact.form.interest.sap": "SAP生成",
    "contact.form.interest.platform": "端到端平台",
    "contact.form.messageLabel": "留言",
    "contact.form.messagePlaceholder": "告诉我们您的工作流、研究类型或自动化需求。",
    "contact.form.submit": "预约演示",
    "contact.form.disclaimer": "此表单目前仅为前端展示。后续可连接AWS SES、API Gateway + Lambda、FastAPI、HubSpot或其他CRM。",
  },
};
