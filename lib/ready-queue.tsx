"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { DEFAULT_INSTRUCTION } from "./command";
import { senders } from "./data";
import type { Sender } from "./types";

const STORAGE_KEY = "inbox-triage-ready-queue-v1";

type ReadyQueueState = {
  ids: string[];
  instruction: string;
};

type ReadyQueueContextValue = ReadyQueueState & {
  readySenders: Sender[];
  hydrated: boolean;
  isReady: (id: string) => boolean;
  toggleReady: (id: string) => void;
  setReady: (id: string, ready: boolean) => void;
  clearReady: () => void;
  setInstruction: (instruction: string) => void;
};

const ReadyQueueContext = createContext<ReadyQueueContextValue | null>(null);

export function ReadyQueueProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);
  const [instruction, setInstructionState] = useState(DEFAULT_INSTRUCTION);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<ReadyQueueState>;
        if (Array.isArray(parsed.ids)) {
          setIds(parsed.ids.filter((id): id is string => typeof id === "string"));
        }
        if (typeof parsed.instruction === "string" && parsed.instruction.trim()) {
          setInstructionState(parsed.instruction);
        }
      }
    } catch {
      // Keep the default empty queue if storage is missing or corrupt.
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ids, instruction } satisfies ReadyQueueState),
    );
  }, [hydrated, ids, instruction]);

  const toggleReady = useCallback((id: string) => {
    setIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  }, []);

  const setReady = useCallback((id: string, ready: boolean) => {
    setIds((current) => {
      const has = current.includes(id);
      if (ready && !has) return [...current, id];
      if (!ready && has) return current.filter((item) => item !== id);
      return current;
    });
  }, []);

  const clearReady = useCallback(() => setIds([]), []);

  const setInstruction = useCallback((next: string) => {
    setInstructionState(next);
  }, []);

  const isReady = useCallback(
    (id: string) => hydrated && ids.includes(id),
    [hydrated, ids],
  );

  const readySenders = useMemo(() => {
    if (!hydrated) return [];
    return ids
      .map((id) => senders.find((sender) => sender.id === id))
      .filter((sender): sender is Sender => Boolean(sender));
  }, [hydrated, ids]);

  const value = useMemo(
    () => ({
      ids,
      instruction,
      readySenders,
      hydrated,
      isReady,
      toggleReady,
      setReady,
      clearReady,
      setInstruction,
    }),
    [
      ids,
      instruction,
      readySenders,
      hydrated,
      isReady,
      toggleReady,
      setReady,
      clearReady,
      setInstruction,
    ],
  );

  return <ReadyQueueContext.Provider value={value}>{children}</ReadyQueueContext.Provider>;
}

export function useReadyQueue() {
  const context = useContext(ReadyQueueContext);
  if (!context) {
    throw new Error("useReadyQueue must be used within ReadyQueueProvider");
  }
  return context;
}
