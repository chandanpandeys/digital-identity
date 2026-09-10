import { projects } from "./projects";
import { credentials } from "./credentials";
import { springboardCourses } from "./springboard";
import { site } from "./profile";
export type EvidenceNode = {
  id: string;
  title: string;
  answer: string;
  tags: string[];
  strength: "INSPECTABLE" | "PUBLIC PROFILE" | "FIRST-PARTY";
  links: { label: string; href: string }[];
};
export const evidencePrompts = [
  "What AI systems has Chandan built?",
  "What did he contribute to EpitopePred?",
  "Show me his content and teaching",
  "What certificates can I open?",
  "What is he working on now?",
  "How can I contact him?",
] as const;
export const evidenceNodes: EvidenceNode[] = [
  ...projects.map((p) => ({
    id: p.slug,
    title: p.name,
    answer:
      p.summary +
      " " +
      p.work.join(" ") +
      " " +
      (p.sourceNote ?? "") +
      " Status: " +
      (p.stage ??
        (p.status === "public"
          ? "Public source; experimental work."
          : "First-party documented contribution.")),
    tags: [
      p.slug,
      p.name.toLowerCase(),
      p.category.toLowerCase(),
      ...p.stack.map((s) => s.toLowerCase()),
      p.role === "Research contributor" ? "research" : "project",
    ],
    strength:
      p.status === "public"
        ? ("INSPECTABLE" as const)
        : ("FIRST-PARTY" as const),
    links: [
      { label: p.name + " story", href: "/work/" + p.slug },
      ...(p.github ? [{ label: "Public source", href: p.github }] : []),
      ...(p.demo ? [{ label: "Open project", href: p.demo }] : []),
    ],
  })),
  {
    id: "research",
    title: "AI research at Amity",
    answer:
      "Chandan worked on applied AI/ML around cancer genomics, neoantigen prediction, immunogenicity and computational vaccine workflows at Amity University during 2025–2026. He contributed engineering and integration work to EpitopePred; he is not its owner. Exact tenure months and independently reproducible research benchmarks are not in the public record here.",
    tags: [
      "research",
      "amity",
      "biology",
      "cancer",
      "neoantigen",
      "experience",
      "tenure",
    ],
    strength: "FIRST-PARTY",
    links: [
      { label: "Research contribution", href: "/work/epitopepred" },
      { label: "Career record", href: "/timeline" },
    ],
  },
  {
    id: "content",
    title: "AI content and technical communication",
    answer:
      "Chandan is AI Content Lead at YAAS from August 2026 according to his career record. The role covers AI research, scripting, narrative development and content workflows. Public samples are on Instagram @justchandan__, LinkedIn @chandanpandeys and Chanakya Education Centre on YouTube. These channels demonstrate technical storytelling and educational content.",
    tags: [
      "content",
      "yaas",
      "communication",
      "creator",
      "script",
      "storytelling",
      "social",
      "instagram",
      "linkedin",
      "youtube",
      "hire",
      "fit",
    ],
    strength: "FIRST-PARTY",
    links: [
      { label: "Content portfolio and videos", href: "/content" },
      { label: "Instagram", href: site.links.instagram },
      { label: "LinkedIn", href: site.links.linkedin },
    ],
  },
  {
    id: "notansun",
    title: "Notansun Zone and teaching",
    answer:
      "Chandan founded Notansun Zone and taught Python through workshops and a 10-day learning challenge. First-party workshop material documents Python basics, functions, modules, a Rock Paper Scissors exercise, text-to-speech, learning resources and participation certificates. He reports teaching students across India. The educational YouTube channel Chanakya Education Centre contains science and exam-preparation lessons.",
    tags: [
      "notansun",
      "zone",
      "teaching",
      "workshop",
      "education",
      "mentor",
      "students",
      "python",
      "youtube",
      "challenge",
    ],
    strength: "FIRST-PARTY",
    links: [
      {
        label: "Teaching story and original videos",
        href: "/content#teaching",
      },
      {
        label: "Notansun profile",
        href: "https://www.instagram.com/notansunzone/",
      },
    ],
  },
  {
    id: "metrics",
    title: "Public channel numbers",
    answer:
      "On 8 September 2026 the public Instagram profile @justchandan__ showed 80 followers. Chanakya Education Centre showed 197 YouTube subscribers and 25 videos. These are dated snapshots, not live reach or engagement analytics.",
    tags: [
      "followers",
      "numbers",
      "metrics",
      "views",
      "reach",
      "impressions",
      "analytics",
      "subscribers",
      "performance",
      "endorsement",
    ],
    strength: "PUBLIC PROFILE",
    links: [
      { label: "Channel snapshots", href: "/content#reels" },
      { label: "YouTube channel", href: site.links.youtube },
      { label: "Instagram", href: site.links.instagram },
    ],
  },
  {
    id: "credentials",
    title: "Certificates you can inspect",
    answer:
      credentials
        .map(
          (c) =>
            c.title +
            " — " +
            c.issuer +
            ". " +
            c.period +
            ". " +
            (c.grade ? "Grade " + c.grade + ". " : ""),
        )
        .join(" ") +
      "These original documents cover course completion, ambassador participation, an ambassador completion letter and a team competition result.",
    tags: [
      "certificates",
      "certificate",
      "credentials",
      "award",
      "academic",
      "grade",
      "techvidya",
      "skillsbuild",
      "edunet",
      "training",
    ],
    strength: "FIRST-PARTY",
    links: [
      { label: "Certificate gallery", href: "/credentials" },
      ...credentials
        .filter((c) => c.publicUrl)
        .map((c) => ({ label: c.issuer, href: c.publicUrl! })),
    ],
  },
  {
    id: "infosys-learning",
    title: "Infosys Springboard learning certificates",
    answer: "Chandan holds 19 Infosys Springboard course certifications covering AI, data science, generative models, development practices and communication: " + springboardCourses.map((c) => c.title).join("; ") + ". Explore the course collection on the credentials page.",
    tags: ["infosys", "springboard", "certificate", "learning", "generative", "prompt"],
    strength: "FIRST-PARTY",
    links: [{ label: "Infosys learning records and issuer course links", href: "/credentials#infosys" }],
  },
  {
    id: "ambassador-credentials",
    title: "Campus leadership and ambassador certificates",
    answer: "Chandan's Google Student Ambassador Program certificate is a participation certificate dated 31 December 2025, bearing Google Gemini and Communique branding. His E-Cell, IIT Bombay letter confirms successful completion of the Campus Ambassador Program for the 2025–2026 program. A separate NEC 2025 certificate recognizes his team's Rank 153 in the Basic Track. That is a team result, not an individual national rank. An Internshala Student Partner Team certificate dated 1 March 2024 documents webinar participation, not internship completion.",
    tags: ["ambassador", "campus", "google", "gemini", "bombay", "nec", "leadership", "internshala"],
    strength: "FIRST-PARTY",
    links: credentials.slice(0,4).map((c) => ({label: c.title, href: c.publicUrl!})),
  },
  {
    id: "contact",
    title: "Work with Chandan",
    answer:
      "Chandan is based in India and works across AI engineering, research and technical content. Contact him at " +
      site.contact.email +
      " or " +
      site.contact.phone +
      ". Use the AI engineering resume for engineering roles, research resume for applied ML roles, and content resume for technical communication. Current availability and compensation should be confirmed directly.",
    tags: [
      "contact",
      "email",
      "phone",
      "hire",
      "hiring",
      "resume",
      "cv",
      "role",
      "fit",
      "availability",
      "salary",
    ],
    strength: "FIRST-PARTY",
    links: [
      { label: "Experience and resumes", href: "/resume" },
      { label: "Email Chandan", href: "mailto:" + site.contact.email },
      { label: "LinkedIn", href: site.links.linkedin },
    ],
  },
  {
    id: "public",
    title: "Public work and current experiments",
    answer:
      "The project collection includes ByteToken, OfferClaw, BenchWolf (previously InferBench), Portable AI Memory, DekhoSuno and OneClickAllResultsBot. They are independent experiments with public source. EpitopePred is contributed research work documented from a first-party account. Supporting repositories and earlier experiments are in the Lab.",
    tags: [
      "public",
      "github",
      "projects",
      "systems",
      "built",
      "now",
      "current",
      "working",
      "infrastructure",
      "engineer",
      "ai",
      "source",
      "inspectable",
    ],
    strength: "INSPECTABLE",
    links: [
      { label: "Project stories", href: "/work" },
      { label: "Earlier experiments", href: "/lab" },
      { label: "GitHub", href: site.links.github },
    ],
  },
];
