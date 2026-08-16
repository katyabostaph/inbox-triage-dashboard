import type { InstructionTemplate, Sender } from "./types";

export const DEFAULT_INSTRUCTION =
  "Stage for deletion (marketing only – keep any real reservation/confirmation emails)";

export const INSTRUCTION_TEMPLATES: InstructionTemplate[] = [
  {
    id: "stage-marketing",
    label: "Stage marketing",
    text: DEFAULT_INSTRUCTION,
  },
  {
    id: "unsubscribe",
    label: "Unsubscribe",
    text: "Unsubscribe where safe, then stage remaining marketing mail",
  },
  {
    id: "classify",
    label: "Classify only",
    text: "Classify only — do not delete. Flag anything that looks transactional",
  },
];

export function buildCommand(instruction: string, senders: Sender[]): string {
  const heading = instruction.trim() || DEFAULT_INSTRUCTION;
  if (senders.length === 0) {
    return `${heading}:`;
  }

  return `${heading}:\n${senders.map((sender) => `- ${sender.domain}`).join("\n")}`;
}
