# BeReal Growth Agent Prototype

This is a Vercel-ready mock prototype that turns the growth dashboard into a simple agentic operating layer.

It is **not connected to BeReal internal data**. It uses illustrative sample data from the Excel workbook to show how the dashboard logic could become a weekly growth decision system.

## What it shows

- Core loop health: activation, first post rate, D7 retention
- Network quality: active friends and density signals
- Acquisition quality: quality score, K-factor and paid-equivalent CAC
- Agent output: diagnosis, evidence, recommended experiment and decision rule
- Deterministic outputs from local sample data (no external API calls)

## Local setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Deploy to Vercel

### Option 1: Vercel dashboard

1. Create a new GitHub repo.
2. Push this folder to GitHub.
3. In Vercel, choose **Add New Project**.
4. Import the GitHub repo.
5. Keep the defaults and click **Deploy**.

### Option 2: Vercel CLI

```bash
npm install -g vercel
vercel login
vercel
```

## Positioning note

Suggested wording if sharing this as an extra link:

> I also included a small mock “growth agent” prototype. It is not a live system and does not use BeReal internal data; it simply shows how I would evolve the dashboard into an operating layer that detects weak signals, explains the likely issue and proposes the next experiment.

## Workbook

The checked Excel workbook is included in `/docs/bereal_growth_dashboard_victor_stepanov_verified.xlsx`.
