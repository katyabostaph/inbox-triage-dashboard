import { GlassCard } from "@/components/GlassCard";
import { cx } from "@/lib/cx";

export function KpiCard({
  label,
  value,
  hint,
  accent = false,
}: {
  label: string;
  value: string;
  hint?: string;
  accent?: boolean;
}) {
  return (
    <GlassCard className="min-h-[7.5rem] px-4 py-4 sm:px-5 sm:py-5">
      <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/45">
        {label}
      </p>
      <p
        className={cx(
          "mt-2 font-mono text-3xl font-semibold tracking-tight tabular-nums sm:text-4xl",
          accent ? "text-accent" : "text-white",
        )}
      >
        {value}
      </p>
      {hint ? <p className="mt-2 text-xs text-white/40">{hint}</p> : null}
    </GlassCard>
  );
}
