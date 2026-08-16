import activityLog from "@/data/activity-log.json";
import type { ActivityDay, Kpis, Sender } from "./types";

// Sender rows stay empty until Inbox Triage delivers whole-inbox per-sender totals.
// Do not put seed/demo senders here — the dashboard treats these as real.
export const senders: Sender[] = [];

// Live snapshot from inbox-dashboard/data.js (Inbox Triage, 2026-08-15 10:44pm PT).
// Storage is a rule of thumb, not Gmail quota: 197,762 threads × 40 KB.
export const kpis: Kpis = {
  totalThreadsInInbox: 197762,
  taggedSoFar: 53997,
  deletedLifetime: 0,
  deletedInTrash: 0,
  storageEstimateBytes: 8_100_000_000,
};

export const activity: ActivityDay[] = activityLog as ActivityDay[];

export function getSender(id: string): Sender | undefined {
  return senders.find((sender) => sender.id === id);
}

export function rankedSenders(): Sender[] {
  return [...senders].sort((a, b) => b.totalCount - a.totalCount);
}
