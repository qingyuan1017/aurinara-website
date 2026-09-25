type MetricCardProps = {
  value: string;
  label: string;
};

export default function MetricCard({ value, label }: MetricCardProps) {
  return (
    <div className="border-t border-teal-900/15 pt-3">
      <div className="font-display text-3xl text-teal-900">{value}</div>
      <div className="mt-1 text-xs leading-5 text-teal-900/55">{label}</div>
    </div>
  );
}
