function BenchWolfVisual() {
  const channels = [
    ["SPEED", "tok/s · prompt tok/s · TTFT", "runtime"],
    ["MEMORY", "system-wide RAM · pressure", "fit"],
    ["POWER", "watts · tok/s/W · mJ/token", "telemetry"],
    ["QUALITY", "mini-MMLU · mini-HumanEval", "optional eval"],
  ];
  return (
    <div className="evidence-canvas benchwolf-canvas">
      <div className="evidence-canvas-head dark-head">
        <div>
          <span>BW / DECISION PIPELINE</span>
          <strong>Can it run? Then: is it worth running?</strong>
        </div>
        <small>local inference / edge AI</small>
      </div>
      <div className="preflight-strip">
        <div>
          <span>01</span>
          <strong>DETECT HARDWARE</strong>
          <small>CPU · GPU/NPU · RAM · disk · bandwidth</small>
        </div>
        <i>→</i>
        <div>
          <span>02</span>
          <strong>MODEL FIT</strong>
          <small>easy · good · tight · no fit</small>
        </div>
        <i>→</i>
        <div>
          <span>03</span>
          <strong>BENCHMARK</strong>
          <small>only after a model is selected</small>
        </div>
      </div>
      <div className="instrument-grid">
        {channels.map(([name, detail, mode], index) => (
          <article key={name}>
            <header>
              <span>0{index + 1}</span>
              <small>{mode}</small>
            </header>
            <strong>{name}</strong>
            <p>{detail}</p>
            <div className="instrument-line">
              <i style={{ width: `${58 + index * 9}%` }} />
            </div>
          </article>
        ))}
      </div>
      <div className="decision-output">
        <span>OUTPUT</span>
        <strong>report / compare / history / export / Edge Score</strong>
        <small>
          Preflight is designed to work without downloading model weights.
        </small>
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
        <div>
          <span>EP / ASYNC RESEARCH SYSTEM</span>
          <strong>
            Long-running computation without a long-running HTTP request
          </strong>
        </div>
        <small>documented / first-party</small>
      </div>
      <div className="job-lane">
        {stages.map(([index, name, detail], position) => (
          <article key={name}>
            <span>{index}</span>
            <strong>{name}</strong>
            <small>{detail}</small>
            {position < stages.length - 1 && <i aria-hidden="true">→</i>}
          </article>
        ))}
      </div>
      <div className="worker-board">
        <div>
          <span>WEB / API</span>
          <strong>submit → job id → poll status</strong>
        </div>
        <div>
          <span>ASYNC WORKERS</span>
          <strong>queued scientific stages execute independently</strong>
        </div>
        <div>
          <span>EVIDENCE STATE</span>
          <strong>
            architecture documented; public artifact still pending
          </strong>
        </div>
      </div>
    </div>
  );
}

export default function ProjectEvidenceVisual({ slug }: { slug: string }) {
  if (slug === "benchwolf") return <BenchWolfVisual />;
  if (slug === "epitopepred") return <EpitopePredVisual />;
  return null;
}
