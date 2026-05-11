export type Kpi = {
  label: string;
  current: number;
  target: number;
  format: "percent" | "number" | "currency";
  signal: string;
  interpretation: string;
};

export type Segment = {
  name: string;
  platform: "iOS" | "Android";
  source: string;
  community: string;
  installs: number;
  activation: number;
  firstPost: number;
  d7: number;
  activeFriends: number;
  kFactor: number;
  cac: number;
  paidEquivalentCac: number;
  qualityScore: number;
};

export const kpis: Kpi[] = [
  {
    label: "Activation rate",
    current: 0.47,
    target: 0.45,
    format: "percent",
    signal: "On track",
    interpretation: "New users are entering the loop, but this should be checked by platform and source."
  },
  {
    label: "First post rate",
    current: 0.764,
    target: 0.78,
    format: "percent",
    signal: "Needs work",
    interpretation: "Activated users still need a better nudge from friend graph to first post."
  },
  {
    label: "D7 retention",
    current: 0.237,
    target: 0.24,
    format: "percent",
    signal: "Needs work",
    interpretation: "Habit formation is close to target but uneven across communities."
  },
  {
    label: "Avg active friends",
    current: 3.68,
    target: 4.0,
    format: "number",
    signal: "Needs density",
    interpretation: "Network density is the leading indicator for BeReal-like product value."
  },
  {
    label: "% with ≥3 active friends",
    current: 0.508,
    target: 0.55,
    format: "percent",
    signal: "Needs density",
    interpretation: "Too many users are under-connected, so scaling raw installs would be risky."
  },
  {
    label: "Paid-equivalent CAC",
    current: 2.42,
    target: 4.0,
    format: "currency",
    signal: "Efficient",
    interpretation: "Virality-adjusted acquisition economics are healthy in the best cohorts."
  }
];

export const segments: Segment[] = [
  { name: "Campus ambassadors iOS", platform: "iOS", source: "Campus ambassadors", community: "Universities", installs: 9200, activation: 0.565, firstPost: 0.788, d7: 0.317, activeFriends: 4.9, kFactor: 0.7, cac: 3.46, paidEquivalentCac: 2.04, qualityScore: 56.0 },
  { name: "Offline events iOS", platform: "iOS", source: "Offline events", community: "Photography meetups", installs: 5100, activation: 0.588, firstPost: 0.8, d7: 0.34, activeFriends: 4.5, kFactor: 0.65, cac: 4.0, paidEquivalentCac: 2.42, qualityScore: 57.3 },
  { name: "Meta clusters iOS", platform: "iOS", source: "Meta interest clusters", community: "Book clubs", installs: 21000, activation: 0.471, firstPost: 0.798, d7: 0.343, activeFriends: 5.2, kFactor: 0.48, cac: 4.24, paidEquivalentCac: 2.87, qualityScore: 51.6 },
  { name: "TikTok creators Android", platform: "Android", source: "TikTok creators", community: "Student life", installs: 30000, activation: 0.40, firstPost: 0.704, d7: 0.204, activeFriends: 2.8, kFactor: 0.55, cac: 3.33, paidEquivalentCac: 2.15, qualityScore: 43.1 },
  { name: "Meta clusters Android", platform: "Android", source: "Meta interest clusters", community: "Music festivals", installs: 27000, activation: 0.315, firstPost: 0.612, d7: 0.176, activeFriends: 2.4, kFactor: 0.42, cac: 4.24, paidEquivalentCac: 2.98, qualityScore: 35.8 },
  { name: "Offline events Android", platform: "Android", source: "Offline events", community: "Sports fans", installs: 7300, activation: 0.356, firstPost: 0.692, d7: 0.246, activeFriends: 3.1, kFactor: 0.45, cac: 4.23, paidEquivalentCac: 2.92, qualityScore: 41.7 }
];

export const experimentBacklog = [
  {
    title: "Local friend suggestion + seed connectors",
    segment: "Sparse Android communities",
    trigger: "% with ≥3 active friends below 40%",
    primaryMetric: "% with ≥3 active friends",
    guardrail: "Uninstall rate",
    owner: "Growth PM",
    expectedImpact: "+4–6pp D7 retention",
    decisionRule: "Ship if D7 improves by 3pp without higher uninstall rate"
  },
  {
    title: "Community-specific first BeReal prompt",
    segment: "High install / low first post cohorts",
    trigger: "First post rate below 60–65%",
    primaryMetric: "First post rate",
    guardrail: "Push opt-out",
    owner: "Activation PM",
    expectedImpact: "+5–8pp first-post rate",
    decisionRule: "Scale if first-post improves by 5pp"
  },
  {
    title: "Increase budget + referral loop for campus/offline",
    segment: "High-quality iOS clusters",
    trigger: "Quality score >55 and paid-equivalent CAC below target",
    primaryMetric: "D7 retained users per $",
    guardrail: "CAC",
    owner: "Paid UA",
    expectedImpact: "+15–20% retained users",
    decisionRule: "Scale while quality score stays stable"
  }
];
