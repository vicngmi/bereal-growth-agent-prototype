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
  const scenarios = [
    {
      id: "friends",
      label: "Low 3+ active friends",
      signal: "% users with 3+ active friends drops below target",
      diagnosis: "New users are not entering dense enough social graphs.",
      action: "Run onboarding + connector seeding experiment in weak cohorts.",
      metric: "% users with 3+ active friends",
      success: "+5pp without uninstall increase"
    },
    {
      id: "cluster",
      label: "Dense cluster, posting down",
      signal: "Cluster density is high but posting per day drops",
      diagnosis: "Network exists, but participation habit is weakening.",
      action: "Run contextual prompt/theme experiment and investigate local behavior.",
      metric: "% posting per day",
      success: "+4pp posting rate in 2 weeks"
    },
    {
      id: "ua",
      label: "Cheap installs, weak D7",
      signal: "CPI looks efficient but D7 retention is weak",
      diagnosis: "Acquisition is bringing isolated or low-intent users.",
      action: "Pause scale in weak sources; retarget to real-world clusters.",
      metric: "D7 retention by source",
      success: "D7 above threshold before budget increase"
    }
  ];
  const [selectedId, setSelectedId] = useState(scenarios[0].id);
  const selected = scenarios.find((s) => s.id === selectedId) || scenarios[0];

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

      <h2 className="section-title">Agent Simulator</h2>
      <div className="card agent">
        <div className="eyebrow">Interactive example</div>
        <div className="chips">
          {scenarios.map((scenario) => (
            <button
              className="chip"
              key={scenario.id}
              onClick={() => setSelectedId(scenario.id)}
            >
              {scenario.label}
            </button>
          ))}
        </div>
        <div className="answer">
          <h2>{selected.label}</h2>
          <p><strong>Signal:</strong> {selected.signal}</p>
          <p><strong>Diagnosis:</strong> {selected.diagnosis}</p>
          <p><strong>Action:</strong> {selected.action}</p>
          <p><strong>Watch metric:</strong> {selected.metric}</p>
          <p><strong>Success rule:</strong> {selected.success}</p>
        </div>
      </div>

      <div className="footer">
        This web version mirrors the Excel structure exactly: Executive summary, Core Loop Health, Network Quality, Acquisition + Funnel, and System Actions.
      </div>
    </main>
  );
}
