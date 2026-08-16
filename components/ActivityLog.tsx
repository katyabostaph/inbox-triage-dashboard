import { GlassCard } from "@/components/GlassCard";
import { formatDate } from "@/lib/format";
import type { ActivityDay } from "@/lib/types";

export function ActivityLog({ days }: { days: ActivityDay[] }) {
  return (
    <section aria-label="Daily activity log" className="pb-4">
      <div className="mb-3">
        <h2 className="text-lg font-semibold tracking-tight text-white">
          Activity log
        </h2>
        <p className="mt-1 text-sm text-white/40">
          What moved, and what we learned. Source:{" "}
          <code className="text-accent/80">data/activity-log.json</code>
        </p>
      </div>
      <div className="space-y-3">
        {days.map((day) => (
          <GlassCard key={day.date} className="p-4 sm:p-5">
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-accent/80">
              {formatDate(day.date)}
            </p>
            <div className="mt-4 grid gap-5 md:grid-cols-2">
              <LogColumn title="Agent actions" items={day.agentActions} />
              <LogColumn title="User decisions" items={day.userDecisions} />
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}

function LogColumn({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="text-sm font-medium text-white/70">{title}</h3>
      <ul className="mt-2 space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-2 text-sm leading-6 text-white/55">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent/70" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
