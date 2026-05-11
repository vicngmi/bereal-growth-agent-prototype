"use client";

import { useState } from "react";
import { kpis, type Kpi } from "../lib/data";

function formatKpi(kpi: Kpi) {
  if (kpi.format === "percent") return `${(kpi.current * 100).toFixed(1)}%`;
  if (kpi.format === "currency") return `$${kpi.current.toFixed(2)}`;
  return kpi.current.toFixed(1);
}

function formatTarget(kpi: Kpi) {
  if (kpi.format === "percent") return `${(kpi.target * 100).toFixed(1)}%`;
  if (kpi.format === "currency") return `$${kpi.target.toFixed(2)}`;
  return kpi.target.toFixed(1);
}

function signalClass(signal: string) {
  if (signal.includes("On") || signal.includes("Efficient")) return "signal good";
  if (signal.includes("Needs")) return "signal warn";
  return "signal bad";
}

export default function Page() {
  const sheetRows = [
    { layer: "Core Loop Health", metric: "% posting per day", current: "23.7%", target: "24.0%", status: "Watch", decision: "If 2+ loop metrics are below target for 2 weeks, pause scaling and fix loop first." },
    { layer: "Core Loop Health", metric: "Notification->Post CR", current: "38.0%", target: "37.0%", status: "Good", decision: "Healthy. Keep monitoring by platform and cohort." },
    { layer: "Core Loop Health", metric: "Avg interactions per post", current: "3.1", target: "2.8", status: "Good", decision: "Healthy. Continue loop quality experiments." },
    { layer: "Core Loop Health", metric: "Extended loop completion", current: "30.8%", target: "29.0%", status: "Good", decision: "Watch for abrupt cohort-level declines." },
    { layer: "Network Quality", metric: "Avg active connections / user", current: "3.68", target: "4.0", status: "Watch", decision: "Increase dense-cluster seeding before paid expansion." },
    { layer: "Network Quality", metric: "% users with 3-5 active friends", current: "50.8%", target: "55.0%", status: "Watch", decision: "Trigger onboarding + connector seeding experiments." },
    { layer: "Network Quality", metric: "Retention by friend count", current: "0-2 << 3+", target: "Gap narrows", status: "Fix", decision: "Priority: close D7 gap between 0-2 and 3+ friend cohorts." },
    { layer: "Network Quality", metric: "Cluster density", current: "Mixed", target: "Stable/Up", status: "Watch", decision: "If density stays high but posting falls, investigate local behavior." },
    { layer: "Acquisition Quality", metric: "Activation rate (add friends + post)", current: "47.0%", target: "45.0%", status: "Good", decision: "Scale only sources where post-activation quality stays strong." },
    { layer: "Acquisition Quality", metric: "Time to activation", current: "18-31h", target: "<24h", status: "Watch", decision: "Reduce activation time in weak cohorts before scaling spend." },
    { layer: "Acquisition Quality", metric: "Retention by source", current: "Divergent", target: "Converging up", status: "Watch", decision: "Cut low-quality sources even if CPI looks efficient." },
    { layer: "Acquisition Quality", metric: "% entering meaningful context", current: "34-62%", target: ">50%", status: "Fix", decision: "Retarget to real-world clusters and context-first invites." }
  ];
  const [selectedRowIndex, setSelectedRowIndex] = useState(0);
  const selectedRow = sheetRows[selectedRowIndex];

  const coreLoop = kpis.slice(0, 3);
  const network = kpis.slice(3, 5);
  const acquisition = kpis.slice(5, 6);

  return (
    <main className="container">
      <section className="hero">
        <div className="card hero-copy">
          <div className="eyebrow">Candidate prototype / illustrative data only</div>
          <h1>BeReal Growth Dashboard</h1>
          <p className="lede">
            Built around three layers only: core loop health, network quality, and acquisition quality.
          </p>
          <div className="principles">
            <span>Are users participating?</span>
            <span>Are they connected to the right people?</span>
            <span>Are we acquiring more users like them?</span>
          </div>
          <div className="note">
            Sample data only. This is not connected to BeReal systems.
          </div>
        </div>
      </section>

      <h2 className="section-title">Core Loop Health</h2>
      <section className="grid">
        {coreLoop.map((kpi) => (
          <div className="card kpi" key={kpi.label}>
            <div className="label">{kpi.label}</div>
            <div className="value">{formatKpi(kpi)}</div>
            <div className="target">Target: {formatTarget(kpi)}</div>
            <span className={signalClass(kpi.signal)}>{kpi.signal}</span>
            <p>{kpi.interpretation}</p>
          </div>
        ))}
      </section>

      <h2 className="section-title">Network Quality</h2>
      <section className="grid">
        {network.map((kpi) => (
          <div className="card kpi" key={kpi.label}>
            <div className="label">{kpi.label}</div>
            <div className="value">{formatKpi(kpi)}</div>
            <div className="target">Target: {formatTarget(kpi)}</div>
            <span className={signalClass(kpi.signal)}>{kpi.signal}</span>
            <p>{kpi.interpretation}</p>
          </div>
        ))}
        <div className="card kpi">
          <div className="label">Retention by friend count</div>
          <h3>0-2 friends vs 3+ friends</h3>
          <p>Use this split as the main retention diagnostic for network density.</p>
        </div>
      </section>

      <h2 className="section-title">Acquisition Quality + Funnel</h2>
      <section className="grid">
        {acquisition.map((kpi) => (
          <div className="card kpi" key={kpi.label}>
            <div className="label">{kpi.label}</div>
            <div className="value">{formatKpi(kpi)}</div>
            <div className="target">Target: {formatTarget(kpi)}</div>
            <span className={signalClass(kpi.signal)}>{kpi.signal}</span>
            <p>{kpi.interpretation}</p>
          </div>
        ))}
        <div className="card kpi">
          <div className="label">Simple funnel</div>
          <p><strong>Install to add friends to first post to D1 to D7</strong></p>
          <p>Scale only the sources where users reach D7 with meaningful network context.</p>
        </div>
      </section>

      <h2 className="section-title">System Actions</h2>
      <div className="card table-wrap">
        <table>
          <thead>
            <tr>
              <th>Signal</th><th>Likely issue</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Users with fewer than 3 active friends show lower retention</td>
              <td>Weak network formation</td>
              <td>Run onboarding + connector seeding experiment</td>
            </tr>
            <tr>
              <td>Cluster density high but posting drops</td>
              <td>Habit/context mismatch</td>
              <td>Investigate local behavior and test contextual prompts</td>
            </tr>
            <tr>
              <td>Cheap installs but weak D7</td>
              <td>Low acquisition quality</td>
              <td>Pause scale, fix activation path, then retest</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="section-title">Interactive Sheet View</h2>
      <div className="card agent">
        <div className="eyebrow">Click a row to simulate agent selection</div>
        <div className="table-wrap">
          <table className="sheet-grid">
            <thead>
              <tr>
                <th>Layer</th><th>Metric</th><th>Current</th><th>Target</th><th>Status</th>
              </tr>
            </thead>
            <tbody>
              {sheetRows.map((row, index) => (
                <tr
                  key={`${row.layer}-${row.metric}`}
                  className={index === selectedRowIndex ? "row-selected" : ""}
                  onClick={() => setSelectedRowIndex(index)}
                >
                  <td>{row.layer}</td>
                  <td>{row.metric}</td>
                  <td>{row.current}</td>
                  <td>{row.target}</td>
                  <td>{row.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="answer">
          <h2>Selected Range: Row {selectedRowIndex + 1}</h2>
          <p><strong>Layer:</strong> {selectedRow.layer}</p>
          <p><strong>Metric:</strong> {selectedRow.metric}</p>
          <p><strong>Decision logic:</strong> {selectedRow.decision}</p>
        </div>
      </div>

      <div className="footer">
        This web version mirrors the Excel structure exactly: Executive summary, Core Loop Health, Network Quality, Acquisition + Funnel, and System Actions.
      </div>
    </main>
  );
}
