import type { LucideIcon } from "lucide-react";

type CapabilityCardProps = {
  icon: LucideIcon;
  title: string;
  text: string;
};

export default function CapabilityCard({
  icon: Icon,
  title,
  text,
}: CapabilityCardProps) {
  return (
    <div className="group h-full border-t border-teal-900/15 pt-5">
      <Icon className="h-6 w-6 text-sage-600 transition group-hover:text-teal-800" strokeWidth={1.5} />

      <h3 className="font-display mt-4 text-xl text-teal-900">{title}</h3>

      <p className="mt-2 leading-7 text-teal-900/70">{text}</p>
    </div>
  );
}