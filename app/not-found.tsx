import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-16 text-center">
      <p className="text-[11px] uppercase tracking-[0.16em] text-accent">404</p>
      <h1 className="mt-3 text-2xl font-semibold text-white">Sender not found</h1>
      <p className="mt-2 text-sm text-white/45">
        That domain is not in the current tagged set.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex min-h-12 items-center rounded-xl bg-accent px-4 text-sm font-semibold text-[#041418]"
      >
        Back to dashboard
      </Link>
    </div>
  );
}
