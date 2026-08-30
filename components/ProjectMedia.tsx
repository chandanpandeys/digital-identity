const mediaBySlug: Record<string, { title: string; note: string; href: string; src: string; alt: string; kind: "image" | "terminal" }[]> = {
  bytetoken: [
    {
      title: "Public project chart",
      note: "Published in the ByteToken repository alongside the benchmark and implementation.",
      href: "https://github.com/chandanpandeys/bytetoken/blob/main/assets/chart.png",
      src: "https://raw.githubusercontent.com/chandanpandeys/bytetoken/main/assets/chart.png",
      alt: "ByteToken benchmark chart from the public repository",
      kind: "image",
    },
    {
      title: "Repository identity artwork",
      note: "The project's own public banner, used here as provenance-backed project media rather than a recreated mockup.",
      href: "https://github.com/chandanpandeys/bytetoken/blob/main/assets/banner.png",
      src: "https://raw.githubusercontent.com/chandanpandeys/bytetoken/main/assets/banner.png",
      alt: "ByteToken banner from the public repository",
      kind: "image",
    },
  ],
  inferbench: [
    {
      title: "Generated CLI session",
      note: "Rich-generated terminal capture committed in the InferBench repository. This is the project's own CLI artifact, not a portfolio reconstruction.",
      href: "https://github.com/chandanpandeys/inferbench/blob/main/demo.svg",
      src: "https://raw.githubusercontent.com/chandanpandeys/inferbench/main/demo.svg",
      alt: "InferBench terminal output generated from the public CLI",
      kind: "terminal",
    },
  ],
  dekhosuno: [
    {
      title: "System architecture",
      note: "Architecture graphic published with the DekhoSuno source repository.",
      href: "https://github.com/chandanpandeys/DekhoSuno/blob/main/assets/images/architecture.png",
      src: "https://raw.githubusercontent.com/chandanpandeys/DekhoSuno/main/assets/images/architecture.png",
      alt: "DekhoSuno system architecture from the public repository",
      kind: "image",
    },
    {
      title: "Interaction flow",
      note: "Public project flowchart showing how the accessibility system is organized.",
      href: "https://github.com/chandanpandeys/DekhoSuno/blob/main/assets/images/flowchart.png",
      src: "https://raw.githubusercontent.com/chandanpandeys/DekhoSuno/main/assets/images/flowchart.png",
      alt: "DekhoSuno flowchart from the public repository",
      kind: "image",
    },
    {
      title: "Technology map",
      note: "Tech-stack visual committed with the app source.",
      href: "https://github.com/chandanpandeys/DekhoSuno/blob/main/assets/images/tech_stack.png",
      src: "https://raw.githubusercontent.com/chandanpandeys/DekhoSuno/main/assets/images/tech_stack.png",
      alt: "DekhoSuno technology stack graphic from the public repository",
      kind: "image",
    },
  ],
};

export default function ProjectMedia({ slug }: { slug: string }) {
  const items = mediaBySlug[slug] ?? [];
  if (!items.length) return null;

  return (
    <section className="project-media-section" aria-labelledby={`${slug}-media-title`}>
      <div className="architecture-heading">
        <div>
          <p className="eyebrow">04B / REAL ARTIFACTS</p>
          <h2 id={`${slug}-media-title`}>Media from the project itself</h2>
        </div>
        <p>Every frame below resolves to a file already published in the source repository.</p>
      </div>
      <div className={`project-media-grid ${items.length === 1 ? "single" : ""}`}>
        {items.map((item) => (
          <figure className={`project-media-card ${item.kind}`} key={item.src}>
            <a href={item.href} target="_blank" rel="noopener noreferrer" aria-label={`Open source artifact: ${item.title}`}>
              <div className="project-media-frame">
                <img src={item.src} alt={item.alt} loading="lazy" decoding="async" />
              </div>
              <figcaption>
                <div><span>PUBLIC ARTIFACT</span><strong>{item.title}</strong></div>
                <p>{item.note}</p>
                <i aria-hidden="true">↗</i>
              </figcaption>
            </a>
          </figure>
        ))}
      </div>
    </section>
  );
}
