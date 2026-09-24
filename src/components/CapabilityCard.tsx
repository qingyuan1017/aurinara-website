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
    <div className="h-full rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-xl shadow-slate-950/20">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-slate-950">
        <Icon className="h-6 w-6" />
      </div>

      <h3 className="text-xl font-semibold tracking-tight">{title}</h3>

      <p className="mt-3 leading-7 text-slate-300">{text}</p>
    </div>
  );
}