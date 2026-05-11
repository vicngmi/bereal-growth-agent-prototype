"use client";

import { useMemo, useState } from "react";
import { experimentBacklog, kpis, segments, type Kpi } from "../lib/data";
import { runAgent } from "../lib/agent";

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
  const [question, setQuestion] = useState("Where should we scale acquisition next?");
  const answer = useMemo(() => runAgent(question), [question]);
  const prompts = [
    "Where should we scale acquisition next?",
    "Why is Android weaker?",
    "What is blocking D7 retention?",
    "What should we test next?"
  ];

  return (
    <main className="container">
      <section className="hero">
        <div className="card hero-copy">
          <div className="eyebrow">Candidate prototype / illustrative data only</div>
          <h1>BeReal Growth Agent</h1>
          <p className="lede">
            A lightweight operating layer on top of the dashboard: read loop health, network quality, and acquisition quality, then turn signal into one weekly decision.
          </p>
          <div className="note">
            Sample data only. This is not connected to BeReal systems. It is a deterministic front-end prototype based on the same dashboard logic as the Excel workbook.
          </div>
        </div>

        <div className="card agent">
          <div>
            <div className="eyebrow">Agent prompt</div>
            <div className="agent-title">Ask the dashboard what to do next</div>
          </div>
          <div className="input-row">
            <input value={question} onChange={(event) => setQuestion(event.target.value)} aria-label="Question for growth agent" />
            <button onClick={() => setQuestion(question.trim() || prompts[0])}>Run</button>
          </div>
          <div className="chips">
            {prompts.map((prompt) => <button className="chip" key={prompt} onClick={() => setQuestion(prompt)}>{prompt}</button>)}
          </div>
          <div className="answer">
            <div className="eyebrow">Recommendation</div>
            <h2>{answer.headline}</h2>
            <p>{answer.diagnosis}</p>
            <ul>{answer.evidence.map((item) => <li key={item}>{item}</li>)}</ul>
            <p><strong>Next move:</strong> {answer.recommendation}</p>
            <p><strong>Experiment:</strong> {answer.experiment} · <strong>Confidence:</strong> {answer.confidence}</p>
          </div>
        </div>
      </section>

      <h2 className="section-title">Executive dashboard snapshot</h2>
      <section className="grid">
        {kpis.map((kpi) => (
          <div className="card kpi" key={kpi.label}>
            <div className="label">{kpi.label}</div>
            <div className="value">{formatKpi(kpi)}</div>
            <div className="target">Target: {formatTarget(kpi)}</div>
            <span className={signalClass(kpi.signal)}>{kpi.signal}</span>
            <p>{kpi.interpretation}</p>
          </div>
        ))}
      </section>

      <h2 className="section-title">Segments the agent is reading</h2>
      <div className="card table-wrap">
        <table>
          <thead>
            <tr>
              <th>Segment</th><th>Platform</th><th>Installs</th><th>Activation</th><th>D7</th><th>Active friends</th><th>Paid-equivalent CAC</th><th>Quality</th>
            </tr>
          </thead>
          <tbody>
            {segments.map((segment) => (
              <tr key={segment.name}>
                <td>{segment.name}</td>
                <td>{segment.platform}</td>
                <td>{segment.installs.toLocaleString()}</td>
                <td>{(segment.activation * 100).toFixed(1)}%</td>
                <td>{(segment.d7 * 100).toFixed(1)}%</td>
                <td>{segment.activeFriends.toFixed(1)}</td>
                <td>${segment.paidEquivalentCac.toFixed(2)}</td>
                <td>{segment.qualityScore.toFixed(1)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="section-title">Experiment backlog</h2>
      <section className="grid">
        {experimentBacklog.map((experiment) => (
          <div className="card kpi" key={experiment.title}>
            <div className="label">{experiment.segment}</div>
            <h3>{experiment.title}</h3>
            <p><strong>Trigger:</strong> {experiment.trigger}</p>
            <p><strong>Metric:</strong> {experiment.primaryMetric}</p>
            <p><strong>Decision rule:</strong> {experiment.decisionRule}</p>
          </div>
        ))}
      </section>

      <div className="footer">
        Built as a Vercel-ready mock prototype. Data is illustrative and mirrors the Excel workbook logic: loop health to network density to acquisition quality to experiment decision.
      </div>
    </main>
  );
}
