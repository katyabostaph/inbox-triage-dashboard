import { KpiCard } from "@/components/KpiCard";
import { formatCount, formatStorage } from "@/lib/format";
import type { Kpis } from "@/lib/types";

export function KpiGrid({ kpis }: { kpis: Kpis }) {
  return (
    <section aria-label="Inbox snapshot">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <KpiCard
          label="Inbox threads"
          value={formatCount(kpis.totalThreadsInInbox)}
          hint="Still in the account"
        />
        <KpiCard
          label="Tagged so far"
          value={formatCount(kpis.taggedSoFar)}
          hint="First-pass only"
          accent
        />
        <KpiCard
          label="Deleted"
          value={formatCount(kpis.deletedLifetime)}
          hint={`${formatCount(kpis.deletedInTrash)} in trash now`}
        />
        <KpiCard
          label="Storage"
          value={formatStorage(kpis.storageEstimateBytes)}
          hint="Account-level, approx"
        />
      </div>
    </section>
  );
}
