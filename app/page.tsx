"use client";

import { useMemo, useState } from "react";

type Row = {
  layer: "Core Loop Health" | "Network Quality" | "Acquisition Quality";
  metric: string;
  current: string;
  target: string;
  status: "Good" | "Watch" | "Fix";
  why: string;
  action: string;
};

const rows: Row[] = [
  {
    layer: "Core Loop Health",
    metric: "% users posting per day",
    current: "23.7%",
    target: "24.0%",
    status: "Watch",
    why: "Habit formation is close to threshold but not stable.",
    action: "Do not scale paid until loop metrics are back above target for 2 weeks."
  },
  {
    layer: "Core Loop Health",
    metric: "Notification -> post CR",
    current: "38.0%",
    target: "37.0%",
    status: "Good",
    why: "Prompt-response behavior is healthy.",
    action: "Maintain current notification timing; monitor by cohort."
  },
  {
    layer: "Core Loop Health",
    metric: "Extended loop completion (post-view-react)",
    current: "30.8%",
    target: "29.0%",
    status: "Good",
    why: "Users are completing the full social loop.",
    action: "Keep loop completion above threshold while improving weaker cohorts."
  },
  {
    layer: "Network Quality",
    metric: "% users with 3-5 active friends",
    current: "50.8%",
    target: "55.0%",
    status: "Fix",
    why: "Too many users remain under-connected, hurting retention.",
    action: "Trigger onboarding + connector seeding in weak cohorts immediately."
  },
  {
    layer: "Network Quality",
    metric: "Retention by friend count (0-2 vs 3+)",
    current: "Large gap",
    target: "Gap narrowing",
    status: "Fix",
    why: "Network density is the primary retention driver.",
    action: "Prioritize experiments that move users from 0-2 to 3+ active friends."
  },
  {
    layer: "Network Quality",
    metric: "Cluster density",
    current: "Mixed",
    target: "Stable/Up",
    status: "Watch",
    why: "Some clusters are dense, others remain sparse.",
    action: "Investigate cohorts where density is high but posting is falling."
  },
  {
    layer: "Acquisition Quality",
    metric: "Activation rate (add friends + post)",
    current: "47.0%",
    target: "45.0%",
    status: "Good",
    why: "Topline activation is healthy.",
    action: "Scale only sources that also preserve D7 and network quality."
  },
  {
    layer: "Acquisition Quality",
    metric: "Time to activation",
    current: "18-31h",
    target: "<24h",
    status: "Watch",
    why: "Slow cohorts dilute downstream retention quality.",
    action: "Reduce activation latency before increasing spend in weak channels."
  },
  {
    layer: "Acquisition Quality",
    metric: "% entering meaningful context",
    current: "34-62%",
    target: ">50%",
    status: "Fix",
    why: "Low-context cohorts fail to compound.",
    action: "Retarget toward real-world clusters; cut low-context paid traffic."
  }
];

export default function Page() {
  const [selected, setSelected] = useState(0);
  const row = rows[selected];

  const summary = useMemo(() => {
    const fixes = rows.filter((r) => r.status === "Fix");
    const watches = rows.filter((r) => r.status === "Watch");
    return {
      participating: "Watch",
      connected: fixes.some((r) => r.layer === "Network Quality") ? "Fix" : "Watch",
      acquiring: rows.some((r) => r.layer === "Acquisition Quality" && r.status === "Fix") ? "Fix" : "Watch",
      biggestRisk: fixes[0],
      biggestOpportunity: watches[0]
    };
  }, []);

  return (
    <main className="container">
      <section className="hero ceo-hero">
        <div className="card hero-copy">
          <div className="eyebrow">BeReal Growth Command Center (Sample Data)</div>
          <h1>Growth Dashboard</h1>
          <p className="lede">
            Core loop health. Network quality. Acquisition quality. One page, one weekly decision.
          </p>
        </div>
      </section>

      <section className="grid">
        <div className="card kpi">
          <div className="label">Are users participating?</div>
          <div className="value">{summary.participating}</div>
          <p>Loop is near threshold. Do not aggressively scale yet.</p>
        </div>
        <div className="card kpi">
          <div className="label">Are they connected to the right people?</div>
          <div className="value">{summary.connected}</div>
          <p>Network density is the main retention constraint right now.</p>
        </div>
        <div className="card kpi">
          <div className="label">Are we acquiring more users like them?</div>
          <div className="value">{summary.acquiring}</div>
          <p>Scale only high-context, retained cohorts.</p>
        </div>
      </section>

      <section className="grid">
        <div className="card kpi">
          <div className="label">Biggest risk this week</div>
          <h3>{summary.biggestRisk.metric}</h3>
          <p>{summary.biggestRisk.why}</p>
        </div>
        <div className="card kpi">
          <div className="label">Biggest opportunity this week</div>
          <h3>{summary.biggestOpportunity.metric}</h3>
          <p>{summary.biggestOpportunity.why}</p>
        </div>
        <div className="card kpi">
          <div className="label">Recommended CEO decision</div>
          <h3>Fix network quality before paid scale expansion.</h3>
          <p>Move users into denser clusters first, then increase spend.</p>
        </div>
      </section>

      <h2 className="section-title">Interactive Metric Table</h2>
      <div className="card table-wrap">
        <table className="sheet-grid">
          <thead>
            <tr>
              <th>Layer</th><th>Metric</th><th>Current</th><th>Target</th><th>Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={`${r.layer}-${r.metric}`} className={i === selected ? "row-selected" : ""} onClick={() => setSelected(i)}>
                <td>{r.layer}</td>
                <td>{r.metric}</td>
                <td>{r.current}</td>
                <td>{r.target}</td>
                <td>{r.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="section-title">Selected Metric Decision Logic</h2>
      <div className="card agent">
        <div className="eyebrow">Selected row: {selected + 1}</div>
        <div className="answer">
          <h2>{row.metric}</h2>
          <p><strong>Why it matters:</strong> {row.why}</p>
          <p><strong>Action now:</strong> {row.action}</p>
        </div>
      </div>

      <div className="footer">
        Sample data only. This is a case-study prototype showing decision logic, not live BeReal internal data.
      </div>
    </main>
  );
}
