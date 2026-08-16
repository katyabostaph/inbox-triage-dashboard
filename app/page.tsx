import { ActivityLog } from "@/components/ActivityLog";
import { KpiGrid } from "@/components/KpiGrid";
import { SenderList } from "@/components/SenderList";
import { activity, kpis, rankedSenders } from "@/lib/data";

export default function Home() {
  return (
    <div className="space-y-8">
      <h1 className="sr-only">Inbox triage dashboard</h1>
      <KpiGrid kpis={kpis} />
      <SenderList senders={rankedSenders()} />
      <ActivityLog days={activity} />
    </div>
  );
}
