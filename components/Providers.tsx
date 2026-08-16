"use client";

import { ReadyQueueProvider } from "@/lib/ready-queue";

export function Providers({ children }: { children: React.ReactNode }) {
  return <ReadyQueueProvider>{children}</ReadyQueueProvider>;
}
