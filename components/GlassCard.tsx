import { cx } from "@/lib/cx";

export function GlassCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cx(
        "rounded-2xl border border-white/10 bg-white/5 shadow-[0_0_0_1px_rgba(0,240,255,0.04)] backdrop-blur-xl",
        className,
      )}
    >
      {children}
    </div>
  );
}
