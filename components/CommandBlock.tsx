"use client";

import { useState } from "react";
import { cx } from "@/lib/cx";

export function CommandBlock({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(command);
    } catch {
      const area = document.createElement("textarea");
      area.value = command;
      area.setAttribute("readonly", "");
      area.style.position = "absolute";
      area.style.left = "-9999px";
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      document.body.removeChild(area);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-black/40">
      <div className="flex items-center justify-between gap-3 border-b border-white/8 px-3 py-2">
        <p className="text-[11px] uppercase tracking-[0.14em] text-white/35">
          Agent command
        </p>
        <button
          type="button"
          onClick={copy}
          className={cx(
            "min-h-10 rounded-lg px-3 text-sm font-semibold transition-colors",
            copied
              ? "bg-white/10 text-white"
              : "bg-accent text-[#041418] hover:bg-accent/90",
          )}
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="max-h-40 overflow-auto px-3 py-3 font-mono text-[13px] leading-6 whitespace-pre-wrap text-accent/90">
        {command}
      </pre>
    </div>
  );
}
