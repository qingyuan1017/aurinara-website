type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  centered?: boolean;
};

export default function SectionHeader({
  eyebrow,
  title,
  description,
  centered = false,
}: SectionHeaderProps) {
  return (
    <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <div
        className={`flex items-center gap-3 text-sm text-sage-600 ${
          centered ? "justify-center" : ""
        }`}
      >
        <span className="h-px w-8 bg-sage-500/60" aria-hidden />
        <span className="italic">{eyebrow}</span>
      </div>

      <h2 className="font-display mt-4 text-4xl leading-[1.1] text-teal-900 sm:text-[2.75rem]">
        {title}
      </h2>

      {description && (
        <p className="mt-4 text-lg leading-8 text-teal-900/70">{description}</p>
      )}
    </div>
  );
}
