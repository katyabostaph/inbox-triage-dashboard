"use client";

import Link from "next/link";
import { GlassCard } from "@/components/GlassCard";
import { cx } from "@/lib/cx";
import { formatCount, formatDate, formatStorage } from "@/lib/format";
import { useReadyQueue } from "@/lib/ready-queue";
import type { Sender } from "@/lib/types";

export function SenderDetail({ sender }: { sender: Sender }) {
  const { isReady, setReady } = useReadyQueue();
  const ready = isReady(sender.id);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <Link
            href="/"
            className="inline-flex min-h-11 items-center text-sm text-accent"
          >
            ← All senders
          </Link>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white">
            {sender.domain}
          </h1>
          <p className="mt-1 text-sm text-white/40">{sender.displayName}</p>
        </div>
        <button
          type="button"
          onClick={() => setReady(sender.id, !ready)}
          className={cx(
            "min-h-12 shrink-0 rounded-xl px-4 text-sm font-semibold",
            ready
              ? "border border-accent/40 bg-accent/15 text-accent"
              : "bg-accent text-[#041418]",
          )}
        >
          {ready ? "Ready" : "Mark Ready"}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Metric label="Tagged" value={formatCount(sender.taggedCount)} accent />
        <Metric label="Total in inbox" value={formatCount(sender.totalCount)} />
        <Metric
          label="Storage"
          value={formatStorage(sender.storageEstimateBytes)}
          hint="approx"
        />
      </div>

      <GlassCard className="grid gap-4 p-4 sm:grid-cols-2 sm:p-5">
        <Meta label="Oldest email" value={formatDate(sender.oldestEmailDate)} />
        <Meta
          label="Never opened"
          value={
            sender.neverOpenedCount === null
              ? "n/a"
              : formatCount(sender.neverOpenedCount)
          }
        />
        {sender.commandHint ? (
          <Meta label="Keep in mind" value={sender.commandHint} wide />
        ) : null}
      </GlassCard>
    </div>
  );
}

function Metric({
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
    <GlassCard className="min-h-[8.5rem] px-5 py-5">
      <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/45">
        {label}
      </p>
      <p
        className={cx(
          "mt-3 font-mono text-4xl font-semibold tracking-tight tabular-nums",
          accent ? "text-accent" : "text-white",
        )}
      >
        {value}
      </p>
      {hint ? <p className="mt-2 text-xs text-white/40">{hint}</p> : null}
    </GlassCard>
  );
}

function Meta({
  label,
  value,
  wide = false,
}: {
  label: string;
  value: string;
  wide?: boolean;
}) {
  return (
    <div className={wide ? "sm:col-span-2" : undefined}>
      <p className="text-[11px] uppercase tracking-[0.14em] text-white/35">{label}</p>
      <p className="mt-1 text-base text-white/80">{value}</p>
    </div>
  );
}
