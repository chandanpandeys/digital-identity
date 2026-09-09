import Link from "next/link";
import {
  ArrowUpRight,
  GithubLogo,
  LinkedinLogo,
  InstagramLogo,
  YoutubeLogo,
  ArrowRight,
} from "@phosphor-icons/react/dist/ssr";
import { site } from "@/lib/profile";
import { projects, type Project } from "@/lib/projects";
export function SocialLinks() {
  return (
    <div className="studio-socials" aria-label="Chandan's public profiles">
      {[
        [site.links.linkedin, "LinkedIn", LinkedinLogo],
        [site.links.instagram, "Instagram", InstagramLogo],
        [site.links.youtube, "YouTube", YoutubeLogo],
        [site.links.github, "GitHub", GithubLogo],
      ].map(([href, label, Icon]) => {
        const Mark = Icon as typeof GithubLogo;
        return (
          <a
            key={String(label)}
            href={String(href)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Mark size={21} />
            <span>{String(label)}</span>
            <ArrowUpRight size={15} />
          </a>
        );
      })}
    </div>
  );
}
export function ProjectCard({
  project,
  index = 0,
}: {
  project: Project;
  index?: number;
}) {
  const images: Record<string, string> = {
    bytetoken:
      "/media/bytetoken-comparison.png",
    benchwolf:
      "https://raw.githubusercontent.com/chandanpandeys/benchwolf/main/assets/demo.svg",
    dekhosuno:
      "https://raw.githubusercontent.com/chandanpandeys/DekhoSuno/main/assets/images/architecture.png",
  };
  return (
    <article className={"studio-project project-" + project.slug}>
      <Link
        href={"/work/" + project.slug}
        className="project-image-link"
        aria-label={"Explore " + project.name}
      >
        {images[project.slug] ? (
          <img
            src={images[project.slug]}
            alt={project.name + " — published repository artifact"}
            loading="lazy"
          />
        ) : (
          <div className="project-type-cover">
            <span>{project.category}</span>
            <strong>{project.name}</strong>
            <p>{project.strapline}</p>
            <span className="cover-status">
              {project.role === "Research contributor"
                ? "CONTRIBUTED RESEARCH"
                : (project.stage ?? "PUBLIC EXPERIMENT")}
            </span>
          </div>
        )}
        <span className="project-open">
          <ArrowUpRight size={24} />
        </span>
      </Link>
      <div className="project-caption">
        <span className="micro">
          {String(index + 1).padStart(2, "0")} / {project.category}
        </span>
        <h3>
          <Link href={"/work/" + project.slug}>{project.name}</Link>
        </h3>
        <p>{project.strapline}</p>
        <div className="project-flags">
          <span>{project.role ?? "Independent experiment"}</span>
          <span>
            {project.status === "public"
              ? "Public source"
              : "First-party record"}
          </span>
        </div>
      </div>
    </article>
  );
}
export function ProjectGrid({ slugs }: { slugs: string[] }) {
  return (
    <div className="studio-project-grid">
      {slugs.map((slug, i) => {
        const p = projects.find((p) => p.slug === slug);
        return p ? <ProjectCard key={slug} project={p} index={i} /> : null;
      })}
    </div>
  );
}
export function SectionHeading({
  number,
  title,
  note,
  href,
  label,
}: {
  number: string;
  title: string;
  note?: string;
  href?: string;
  label?: string;
}) {
  return (
    <div className="studio-section-heading">
      <div>
        <span className="micro">{number}</span>
        <h2>{title}</h2>
        {note && <p>{note}</p>}
      </div>
      {href && (
        <Link href={href} className="text-link">
          {label ?? "Explore"} <ArrowUpRight size={20} />
        </Link>
      )}
    </div>
  );
}
export function ContactBand({
  intent = "complete",
}: {
  intent?: "ai" | "content" | "complete";
}) {
  return (
    <section className="studio-shell studio-contact" id="contact">
      <p className="micro">LET’S MAKE SOMETHING USEFUL</p>
      <h2>
        {intent === "content"
          ? "A good story starts with understanding."
          : "Have a difficult problem?"}
        <br />
        <span>Let’s talk.</span>
      </h2>
      <div className="studio-actions">
        <a
          className="studio-button primary"
          href={
            "mailto:" +
            site.contact.email +
            "?subject=" +
            encodeURIComponent(
              intent === "content"
                ? "Content opportunity"
                : intent === "ai"
                  ? "AI engineering opportunity"
                  : "Let’s work together",
            )
          }
        >
          Email Chandan <ArrowUpRight size={18} />
        </a>
        <a
          className="studio-button"
          href={site.links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
        >
          Connect on LinkedIn <ArrowUpRight size={18} />
        </a>
      </div>
      <a
        className="contact-phone"
        href={"tel:" + site.contact.phone.replace(/[^+\d]/g, "")}
      >
        {site.contact.phone}
      </a>
    </section>
  );
}
export function StudioFooter() {
  return (
    <footer className="studio-shell studio-footer">
      <div>
        <strong>Chandan Pandey</strong>
        <p>Build. Research. Explain. Repeat.</p>
      </div>
      <div>
        <Link href="/resume">Resumes</Link>
        <Link href="/credentials">Credentials</Link>
        <Link href="/timeline">Timeline</Link>
        <Link href="/lab">Lab</Link>
        <Link href="/ask">
          Ask <ArrowRight size={14} />
        </Link>
      </div>
      <small>© {new Date().getFullYear()} · India</small>
    </footer>
  );
}
