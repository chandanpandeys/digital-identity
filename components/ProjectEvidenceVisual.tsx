type BenchmarkRow = {
  label: string;
  base64: number;
  byteToken: number;
  compressed: number;
};

const byteTokenRows: BenchmarkRow[] = [
  { label: "JSON API", base64: 18574, byteToken: 11919, compressed: 728 },
  { label: "CSV analytics", base64: 24524, byteToken: 14924, compressed: 885 },
  { label: "Docker log", base64: 9996, byteToken: 6456, compressed: 509 },
  { label: "Random 5 KB", base64: 4535, byteToken: 2797, compressed: 2854 },
];

function TokenBar({ value, max, kind }: { value: number; max: number; kind: "base" | "raw" | "compressed" }) {
  const width = Math.max(5, (value / max) * 100);
  return (
    <div className="token-bar-track" aria-label={`${value.toLocaleString()} tokens`}>
      <span className={`token-bar ${kind}`} style={{ width: `${width}%` }} />
      <b>{value.toLocaleString()}</b>
    </div>
  );
}

function ByteTokenVisual() {
  const max = Math.max(...byteTokenRows.map((row) => row.base64));
  return (
    <div className="evidence-canvas benchmark-canvas">
      <div className="evidence-canvas-head">
        <div><span>BT / BENCHMARK VIEW</span><strong>Token cost by transport strategy</strong></div>
        <small>o200k_base · lower is better</small>
      </div>
      <div className="benchmark-legend" aria-hidden="true">
        <span><i className="base" />Base64</span>
        <span><i className="raw" />ByteToken-15</span>
        <span><i className="compressed" />LZMA + ByteToken</span>
      </div>
      <div className="benchmark-rows">
        {byteTokenRows.map((row) => (
          <article key={row.label}>
            <header><strong>{row.label}</strong><span>{row.label === "Random 5 KB" ? "INCOMPRESSIBLE CONTROL" : "STRUCTURED / COMPRESSIBLE"}</span></header>
            <div className="benchmark-bars">
              <TokenBar value={row.base64} max={max} kind="base" />
              <TokenBar value={row.byteToken} max={max} kind="raw" />
              <TokenBar value={row.compressed} max={max} kind="compressed" />
            </div>
          </article>
        ))}
      </div>
      <footer>
        <span>INTERPRETATION</span>
        <p>Raw ByteToken reduces the Base64 token count across all four examples. The 90%+ structured-data results come from compression <em>plus</em> ByteToken; the random-binary control shows why those effects must be separated.</p>
      </footer>
    </div>
  );
}

function InferBenchVisual() {
  const channels = [
    ["SPEED", "tok/s · prompt tok/s · TTFT", "runtime"],
    ["MEMORY", "peak RAM · footprint · pressure", "fit"],
    ["POWER", "watts · tok/s/W · mJ/token", "telemetry"],
    ["QUALITY", "mini-MMLU · mini-HumanEval", "optional eval"],
  ];
  return (
    <div className="evidence-canvas inferbench-canvas">
      <div className="evidence-canvas-head dark-head">
        <div><span>IB / DECISION PIPELINE</span><strong>Can it run? Then: is it worth running?</strong></div>
        <small>local inference / edge AI</small>
      </div>
      <div className="preflight-strip">
        <div><span>01</span><strong>DETECT HARDWARE</strong><small>CPU · GPU/NPU · RAM · disk · bandwidth</small></div>
        <i>→</i>
        <div><span>02</span><strong>MODEL FIT</strong><small>easy · good · tight · no fit</small></div>
        <i>→</i>
        <div><span>03</span><strong>BENCHMARK</strong><small>only after a model is selected</small></div>
      </div>
      <div className="instrument-grid">
        {channels.map(([name, detail, mode], index) => (
          <article key={name}>
            <header><span>0{index + 1}</span><small>{mode}</small></header>
            <strong>{name}</strong>
            <p>{detail}</p>
            <div className="instrument-line"><i style={{ width: `${58 + index * 9}%` }} /></div>
          </article>
        ))}
      </div>
      <div className="decision-output">
        <span>OUTPUT</span>
        <strong>report / compare / history / export / Edge Score</strong>
        <small>Preflight is designed to work without downloading model weights.</small>
      </div>
    </div>
  );
}

function EpitopePredVisual() {
  const stages = [
    ["01", "INPUT", "sequence + strategy"],
    ["02", "API", "validation + job create"],
    ["03", "QUEUE", "Celery / Redis"],
    ["04", "TOOLS", "immunoinformatics pipeline"],
    ["05", "RANK", "features + scoring"],
    ["06", "RESULT", "tables + artifacts"],
  ];
  return (
    <div className="evidence-canvas epitope-canvas">
      <div className="evidence-canvas-head">
        <div><span>EP / ASYNC RESEARCH SYSTEM</span><strong>Long-running computation without a long-running HTTP request</strong></div>
        <small>documented / first-party</small>
      </div>
      <div className="job-lane">
        {stages.map(([index, name, detail], position) => (
          <article key={name}>
            <span>{index}</span><strong>{name}</strong><small>{detail}</small>
            {position < stages.length - 1 && <i aria-hidden="true">→</i>}
          </article>
        ))}
      </div>
      <div className="worker-board">
        <div><span>WEB / API</span><strong>submit → job id → poll status</strong></div>
        <div><span>ASYNC WORKERS</span><strong>queued scientific stages execute independently</strong></div>
        <div><span>EVIDENCE STATE</span><strong>architecture documented; public artifact still pending</strong></div>
      </div>
    </div>
  );
}

export default function ProjectEvidenceVisual({ slug }: { slug: string }) {
  if (slug === "bytetoken") return <ByteTokenVisual />;
  if (slug === "inferbench") return <InferBenchVisual />;
  if (slug === "epitopepred") return <EpitopePredVisual />;
  return null;
}
