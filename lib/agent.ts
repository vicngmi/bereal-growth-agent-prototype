import { kpis, segments, experimentBacklog, type Segment } from "./data";

export type AgentResponse = {
  headline: string;
  diagnosis: string;
  evidence: string[];
  recommendation: string;
  experiment: string;
  watchMetric: string;
  successThreshold: string;
  readoutWindow: string;
  confidence: "High" | "Medium" | "Low";
};

const pct = (n: number) => `${Math.round(n * 1000) / 10}%`;
const money = (n: number) => `$${n.toFixed(2)}`;

function weakestSegment(): Segment {
  return [...segments].sort((a, b) => a.qualityScore - b.qualityScore)[0];
}

function bestSegment(): Segment {
  return [...segments].sort((a, b) => b.qualityScore - a.qualityScore)[0];
}

export function runAgent(question: string): AgentResponse {
  const q = question.toLowerCase();
  const weak = weakestSegment();
  const best = bestSegment();

  if (q.includes("scale") || q.includes("budget") || q.includes("source")) {
    return {
      headline: `Scale ${best.name}, but keep it cluster-led rather than broad UA.`,
      diagnosis: "The strongest acquisition signal is not install volume. It is retained, connected users with enough active friends to create product value.",
      evidence: [
        `${best.name} has the top quality score (${best.qualityScore}).`,
        `D7 retention is ${pct(best.d7)} and paid-equivalent CAC is ${money(best.paidEquivalentCac)}.`,
        `K-factor is ${best.kFactor}, so paid cohorts are creating extra organic reach.`
      ],
      recommendation: "Increase budget gradually, add a referral mechanic inside the same real-world communities, and monitor whether active-friend density remains stable as spend grows.",
      experiment: experimentBacklog[2].title,
      watchMetric: "D7 retained users per $",
      successThreshold: "+12% retained users per $ with stable CAC",
      readoutWindow: "14 days",
      confidence: "High"
    };
  }

  if (q.includes("android") || q.includes("activation") || q.includes("onboarding")) {
    const android = segments.filter((s) => s.platform === "Android").sort((a, b) => a.qualityScore - b.qualityScore)[0];
    return {
      headline: `Android needs a density/onboarding fix before broad scaling.`,
      diagnosis: "The issue looks less like CAC and more like weak network formation before the first meaningful loop.",
      evidence: [
        `${android.name} has activation of ${pct(android.activation)} and D7 retention of ${pct(android.d7)}.`,
        `Active friends per user is ${android.activeFriends}, below the dashboard target of 4.0.`,
        "Cheap installs are not useful if users do not find active friends quickly."
      ],
      recommendation: "Pause broad Android scaling, simplify contact import, and seed local connectors in the affected communities.",
      experiment: experimentBacklog[0].title,
      watchMetric: "% with >=3 active friends",
      successThreshold: "+5pp in target cohorts with flat uninstall rate",
      readoutWindow: "10 days",
      confidence: "Medium"
    };
  }

  if (q.includes("retention") || q.includes("d7") || q.includes("habit")) {
    return {
      headline: "D7 is close to target, but network density is the likely constraint.",
      diagnosis: "The dashboard suggests that habit formation depends on whether users enter a dense active graph, not just whether they installed or opened once.",
      evidence: [
        `Overall D7 retention is ${pct(kpis[2].current)} vs target ${pct(kpis[2].target)}.`,
        `Avg active friends is ${kpis[3].current} vs target ${kpis[3].target}.`,
        `${weak.name} has only ${weak.activeFriends} active friends and quality score ${weak.qualityScore}.`
      ],
      recommendation: "Treat retention as a graph problem: seed clusters, track active friends, then improve prompts after density exists.",
      experiment: experimentBacklog[0].title,
      watchMetric: "D7 retention",
      successThreshold: "+3pp D7 without uninstall increase",
      readoutWindow: "14 days",
      confidence: "High"
    };
  }

  return {
    headline: "The next growth decision should start with network quality, not install volume.",
    diagnosis: "For a BeReal-style product, acquisition only works when new users quickly become embedded in active real-world networks.",
    evidence: [
      `Activation is ${pct(kpis[0].current)}, but first-post rate is still below target at ${pct(kpis[1].current)}.`,
      `Only ${pct(kpis[4].current)} of users have at least 3 active friends.`,
      `Best paid-equivalent CAC is healthy, so the constraint is quality and density, not just cost.`
    ],
    recommendation: "Scale the best communities while fixing sparse cohorts with friend suggestions, connector seeding, and community-specific first post prompts.",
    experiment: experimentBacklog[1].title,
    watchMetric: "First post rate",
    successThreshold: "+5pp first-post rate in low-performing cohorts",
    readoutWindow: "7 days",
    confidence: "High"
  };
}
