const mediaBySlug: Record<
  string,
  {
    title: string;
    note: string;
    href: string;
    src: string;
    alt: string;
    kind: "image" | "terminal";
  }[]
> = {
  bytetoken: [
    {
      title: "Published Playground comparison",
      note: "One published example, with payload-dependent results. DirectID counts local token IDs and requires an API that accepts token IDs; it is not text transport. Compression is a separate comparison.",
      href: "https://github.com/chandanpandeys/bytetoken/blob/main/docs/media/02_measured_transport_comparison.png",
      src: "/media/bytetoken-comparison.png",
      alt: "ByteToken Playground: Base64 2,144 tokens, Standard15bit 1,692, Shared13bit 1,952; separate DirectID experiment 1,493 token IDs",
      kind: "image",
    },
  ],
  benchwolf: [
    {
      title: "Illustrative CLI output",
      note: "Illustrative terminal output published in the repository. This is not a measured benchmark result.",
      href: "https://github.com/chandanpandeys/benchwolf/blob/main/assets/demo.svg",
      src: "https://raw.githubusercontent.com/chandanpandeys/benchwolf/main/assets/demo.svg",
      alt: "BenchWolf terminal output generated from the public CLI",
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
    <section
      className="project-media-section"
      aria-labelledby={`${slug}-media-title`}
    >
      <div className="architecture-heading">
        <div>
          <p className="eyebrow">04B / REAL ARTIFACTS</p>
          <h2 id={`${slug}-media-title`}>Media from the project itself</h2>
        </div>
        <p>
          Every frame below resolves to a file already published in the source
          repository.
        </p>
      </div>
      <div
        className={`project-media-grid ${items.length === 1 ? "single" : ""}`}
      >
        {items.map((item) => (
          <figure className={`project-media-card ${item.kind}`} key={item.src}>
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open source artifact: ${item.title}`}
            >
              <div className="project-media-frame">
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <figcaption>
                <div>
                  <span>PUBLIC ARTIFACT</span>
                  <strong>{item.title}</strong>
                </div>
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
