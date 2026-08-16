import { GlassCard } from "@/components/GlassCard";
import { SenderRow } from "@/components/SenderRow";
import type { Sender } from "@/lib/types";

export function SenderList({ senders }: { senders: Sender[] }) {
  return (
    <section aria-label="Senders by volume">
      <div className="mb-3 flex items-end justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-white">
            Category / sender
          </h2>
          <p className="mt-1 text-sm text-white/40">
            Ranked by inbox volume. Check a row to mark it Ready.
          </p>
        </div>
        <p className="hidden text-xs uppercase tracking-[0.14em] text-white/30 sm:block">
          {senders.length} senders
        </p>
      </div>
      <GlassCard>
        <div className="hidden grid-cols-[56px_minmax(0,1fr)_88px] border-b border-white/8 px-0 py-2 text-[11px] uppercase tracking-[0.14em] text-white/30 sm:grid">
          <span className="sr-only">Ready</span>
          <span className="col-start-2">Sender</span>
          <span className="pr-8 text-right">Storage</span>
        </div>
        {senders.map((sender) => (
          <SenderRow key={sender.id} sender={sender} />
        ))}
      </GlassCard>
    </section>
  );
}
