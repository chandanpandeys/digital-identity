export type Credential = {
  slug: string;
  title: string;
  issuer: string;
  period: string;
  issued?: string;
  grade?: string;
  credentialId?: string;
  evidence: "FIRST-PARTY CERTIFICATE" | "PUBLIC RECORD";
  summary: string;
  publicUrl?: string;
};

export const credentials: Credential[] = [
  {
    slug: "skillsbuild-edunet-artificial-intelligence",
    title: "Edunet — Artificial Intelligence",
    issuer: "SkillsBuild / Your Learning Builder",
    period: "Completed 19 Jul 2025",
    issued: "19 Jul 2025",
    evidence: "FIRST-PARTY CERTIFICATE",
    summary: "Completion certificate issued to Chandan Pandey for the Edunet–Artificial Intelligence learning plan in the SkillsBuild learning system.",
  },
  {
    slug: "techvidya-artificial-intelligence",
    title: "Artificial Intelligence",
    issuer: "TechVidya Career Private Limited",
    period: "09 Sep 2024 — 20 Dec 2024",
    issued: "23 Dec 2024",
    grade: "A",
    credentialId: "TCP-0924-0013",
    evidence: "FIRST-PARTY CERTIFICATE",
    summary: "Artificial Intelligence program completed at TechVidya Career Private Limited. The issued certificate records grade A for the program period.",
  },
];
