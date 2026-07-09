import type { LucideIcon } from "lucide-react";

type StatCardProps = {
  label: string;
  value: string | number;
  icon: LucideIcon;
  tone?: "blue" | "green" | "gold";
};

const tones = {
  blue: "bg-ocean/10 text-ocean",
  green: "bg-emerald-100 text-emerald-700",
  gold: "bg-amber-100 text-amber-700"
};

export default function StatCard({ label, value, icon: Icon, tone = "blue" }: StatCardProps) {
  return (
    <div className="rounded-lg bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-500">{label}</p>
          <p className="mt-2 text-3xl font-black text-ink">{value}</p>
        </div>
        <div className={`grid h-12 w-12 place-items-center rounded-lg ${tones[tone]}`}>
          <Icon size={22} />
        </div>
      </div>
    </div>
  );
}
