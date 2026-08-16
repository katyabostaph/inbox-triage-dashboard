"use client";

import Link from "next/link";
import { cx } from "@/lib/cx";
import { formatCount, formatStorage, taggedShare } from "@/lib/format";
import { useReadyQueue } from "@/lib/ready-queue";
import type { Sender } from "@/lib/types";

export function SenderRow({ sender }: { sender: Sender }) {
  const { isReady, toggleReady } = useReadyQueue();
  const ready = isReady(sender.id);
  const share = taggedShare(sender.taggedCount, sender.totalCount);

  return (
    <div
      className={cx(
        "flex items-stretch gap-2 border-b border-white/8 last:border-b-0",
        ready && "bg-accent/5",
      )}
    >
      <button
        type="button"
        onClick={() => toggleReady(sender.id)}
        aria-pressed={ready}
        aria-label={ready ? `Unmark ${sender.domain} ready` : `Mark ${sender.domain} ready`}
        className="flex min-h-14 min-w-14 shrink-0 items-center justify-center"
      >
        <span
          className={cx(
            "flex h-6 w-6 items-center justify-center rounded-md border transition-colors",
            ready
              ? "border-accent bg-accent text-[#041418]"
              : "border-white/25 bg-white/4 text-transparent",
          )}
        >
          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true">
            <path
              d="M3.5 8.2 6.4 11l6.1-6.4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      <Link
        href={`/senders/${sender.id}`}
        className="flex min-h-14 min-w-0 flex-1 items-center gap-3 py-3 pr-4"
      >
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="truncate font-medium text-white">{sender.domain}</p>
            {ready ? (
              <span className="rounded-full border border-accent/40 bg-accent/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent">
                Ready
              </span>
            ) : null}
          </div>
          <p className="mt-1 text-xs text-white/40">
            {formatCount(sender.taggedCount)} tagged
            <span className="text-white/25"> / </span>
            {formatCount(sender.totalCount)} in inbox
          </p>
          <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/8">
            <div
              className="h-full rounded-full bg-accent/80"
              style={{ width: `${share}%` }}
            />
          </div>
        </div>
        <div className="hidden shrink-0 text-right sm:block">
          <p className="font-mono text-sm tabular-nums text-white/80">
            {formatStorage(sender.storageEstimateBytes)}
          </p>
          <p className="mt-1 text-[11px] text-white/35">approx</p>
        </div>
        <span className="text-white/25" aria-hidden="true">
          ›
        </span>
      </Link>
    </div>
  );
}
