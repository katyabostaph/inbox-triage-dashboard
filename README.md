# Inbox Triage Dashboard

Progress and control surface for a tagged Gmail inbox. v1 is visibility plus copy-paste commands — no closed-loop automation.

## What it does

- Top-level KPI cards: inbox size, tagged so far, deleted, rough storage
- Sender list ranked by volume, with tagged vs total and a Ready checkbox
- Full-screen sender detail (three dominant metrics)
- Sticky Ready Queue that generates a command like:

```text
Stage for deletion (marketing only – keep any real reservation/confirmation emails):
- booking.com
- kayak.com
- hotels.com
```

- Daily activity log (agent actions + user decisions)

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Update the data

Replace the seed in `lib/data.ts` (the `data.js` equivalent) and the daily notes in:

- `data/activity-log.json` — what the dashboard reads
- `data/activity-log.md` — the versionable twin

Totals and storage estimates are labeled **approx**. They need a deeper Gmail pass later.

## Deploy to Vercel

Import this folder as a Next.js project, or from the repo root:

```bash
npx vercel
```

No extra backend or env vars are required for v1.

## Out of scope (v1)

- Button → agent executes
- Perfect storage accounting
- Automatic classification without confirmation
