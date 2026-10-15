"use client";

import { useState } from "react";
import { CommandBlock } from "@/components/CommandBlock";
import { buildCommand, INSTRUCTION_TEMPLATES } from "@/lib/command";
import { cx } from "@/lib/cx";
import { useReadyQueue } from "@/lib/ready-queue";

export function ReadyQueue() {
  const { readySenders, instruction, setInstruction, toggleReady, clearReady } =
    useReadyQueue();
  const [editing, setEditing] = useState(false);
  const command = buildCommand(instruction, readySenders);

  return (
    <section
      aria-label="Ready queue"
      className="safe-x border-t border-white/10 bg-[#0A0A0B]/80 py-3 backdrop-blur-xl"
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom, 0px))" }}
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-2 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <h2 className="text-sm font-semibold text-white">Ready Queue</h2>
            <p className="truncate text-xs text-white/40">
              {readySenders.length === 0
                ? "Mark senders Ready to generate a command"
                : `${readySenders.length} sender${readySenders.length === 1 ? "" : "s"} staged`}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-1">
            {readySenders.length > 0 ? (
              <button
                type="button"
                onClick={clearReady}
                className="min-h-10 rounded-lg px-3 text-sm text-white/50 hover:text-white"
              >
                Clear
              </button>
            ) : null}
            <button
              type="button"
              onClick={() => setEditing((open) => !open)}
              aria-expanded={editing}
              className="min-h-10 rounded-lg px-3 text-sm text-accent"
            >
              {editing ? "Hide" : "Edit"}
            </button>
          </div>
        </div>

        {readySenders.length > 0 ? (
          <div className="mb-2 flex flex-wrap gap-2">
            {readySenders.map((sender) => (
              <button
                key={sender.id}
                type="button"
                onClick={() => toggleReady(sender.id)}
                className="min-h-9 rounded-full border border-accent/30 bg-accent/10 px-3 text-xs text-accent"
              >
                {sender.domain} ×
              </button>
            ))}
          </div>
        ) : null}

        {editing ? (
          <>
            <div className="mb-2 flex flex-wrap gap-2">
              {INSTRUCTION_TEMPLATES.map((template) => {
                const active = instruction === template.text;
                return (
                  <button
                    key={template.id}
                    type="button"
                    onClick={() => setInstruction(template.text)}
                    className={cx(
                      "min-h-10 rounded-full border px-3 text-xs font-medium",
                      active
                        ? "border-accent/50 bg-accent/15 text-accent"
                        : "border-white/10 bg-white/4 text-white/55",
                    )}
                  >
                    {template.label}
                  </button>
                );
              })}
            </div>
            <label className="mb-2 block">
              <span className="sr-only">Command instruction</span>
              <textarea
                value={instruction}
                onChange={(event) => setInstruction(event.target.value)}
                rows={2}
                className="w-full resize-none rounded-xl border border-white/10 bg-white/4 px-3 py-2 text-sm text-white outline-none focus:border-accent/50"
              />
            </label>
          </>
        ) : null}

        <CommandBlock command={command} />
      </div>
    </section>
  );
}
