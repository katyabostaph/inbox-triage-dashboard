export type Kpis = {
  totalThreadsInInbox: number;
  taggedSoFar: number;
  deletedLifetime: number;
  deletedInTrash: number;
  storageEstimateBytes: number;
};

export type Sender = {
  id: string;
  domain: string;
  displayName: string;
  taggedCount: number;
  totalCount: number;
  storageEstimateBytes: number;
  oldestEmailDate: string;
  neverOpenedCount: number | null;
  commandHint?: string;
};

export type ActivityDay = {
  date: string;
  agentActions: string[];
  userDecisions: string[];
};

export type InstructionTemplate = {
  id: string;
  label: string;
  text: string;
};
