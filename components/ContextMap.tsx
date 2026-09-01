import Image from "next/image";

const signals = [
  { id: "01", label: "BUILD", detail: "AI systems", className: "map-node node-build" },
  { id: "02", label: "RESEARCH", detail: "Computational biology", className: "map-node node-research" },
  { id: "03", label: "OPEN SOURCE", detail: "Developer tooling", className: "map-node node-open" },
  { id: "04", label: "EXPLAIN", detail: "Technical storytelling", className: "map-node node-explain" },
] as const;

export function ContextMap() {
  return (
    <figure className="context-map" aria-label="A map of Chandan Pandey's current areas of work">
      <div className="map-toolbar">
        <span>CONTEXT MAP / LIVE INDEX</span>
        <span className="map-state"><i /> 04 SIGNALS</span>
      </div>

      <div className="map-canvas">
        <svg className="map-lines" viewBox="0 0 600 600" aria-hidden="true" preserveAspectRatio="none">
          <path d="M300 300 L108 115" />
          <path d="M300 300 L493 118" />
          <path d="M300 300 L112 484" />
          <path d="M300 300 L492 486" />
          <circle cx="300" cy="300" r="173" />
          <circle cx="300" cy="300" r="232" />
        </svg>

        <div className="map-person">
          <div className="map-portrait">
            <Image
              src="https://avatars.githubusercontent.com/u/126047460?v=4"
              alt="Chandan Pandey"
              fill
              priority
              sizes="170px"
            />
          </div>
          <strong>CHANDAN<br />PANDEY</strong>
          <span>AI ENGINEER / BUILDER</span>
        </div>

        {signals.map((signal) => (
          <div className={signal.className} key={signal.id}>
            <span>{signal.id}</span>
            <strong>{signal.label}</strong>
            <small>{signal.detail}</small>
          </div>
        ))}

        <span className="map-coordinate coordinate-a">CTX / 01</span>
        <span className="map-coordinate coordinate-b">CTX / 02</span>
      </div>

      <figcaption>
        One identity, multiple working modes. The site connects the evidence instead of flattening it into a skills list.
      </figcaption>
    </figure>
  );
}
