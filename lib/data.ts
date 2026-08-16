import activityLog from "@/data/activity-log.json";
import type { ActivityDay, Kpis, Sender } from "./types";

// Sender rows stay empty until a named from:domain is counted for real.
// Do not put seed/demo senders here — the dashboard treats these as real.
export const senders: Sender[] = [];

// Live Gmail list_labels via Inbox Triage, Sat Aug 15 ~11:34pm PT.
// Storage is a rule of thumb, not Gmail quota: 197,767 threads × 40 KB.
export const kpis: Kpis = {
  totalThreadsInInbox: 197767,
  taggedSoFar: 54029,
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
