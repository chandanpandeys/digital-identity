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
  category?: string;
  previewImage?: string;
  downloadUrl?: string;
};

export const credentials: Credential[] = [
  {
    slug: "google-student-ambassador",
    title: "Google Student Ambassador Program",
    issuer: "Google Gemini / Communique",
    period: "Certificate dated 31 Dec 2025",
    issued: "31 Dec 2025",
    category: "Participation certificate",
    evidence: "FIRST-PARTY CERTIFICATE",
    summary: "Recognizes Chandan Pandey of Shri Lal Bahadur Shastri Degree College, Gonda, for active participation, collaboration and contribution to the Google Student Ambassador Program.",
    publicUrl: "https://drive.google.com/file/d/19xQ39xgENP01t4l19BStVFP_IkWYnxvg/view",
    previewImage: "/certificates/google-ambassador.png",
    downloadUrl: "/certificates/google-ambassador.pdf",
  },
  {
    slug: "iit-bombay-campus-ambassador",
    title: "Campus Ambassador Program",
    issuer: "Entrepreneurship Cell, IIT Bombay",
    period: "2025–2026 program · completion notified 5 Feb 2026",
    category: "Completion letter",
    evidence: "FIRST-PARTY CERTIFICATE",
    summary: "The original letter confirms successful completion of the Campus Ambassador Program and contributions to E-Cell, IIT Bombay. The document itself is undated; the completion notification arrived on 5 February 2026.",
    publicUrl: "https://drive.google.com/file/d/1MCv_-w6WmDCpZm_zNPQ6C1MAA4XL_NMu/view",
    previewImage: "/certificates/iit-bombay-ambassador.png",
    downloadUrl: "/certificates/iit-bombay-ambassador.pdf",
  },
  {
    slug: "nec-2025",
    title: "National Entrepreneurship Challenge 2025",
    issuer: "E-Cell, IIT Bombay",
    period: "2025 · Basic Track",
    category: "Team participation and ranking",
    evidence: "FIRST-PARTY CERTIFICATE",
    summary: "The certificate names Chandan Pandey and recognizes his team's Rank 153 in the NEC 2025 Basic Track, a six-month competition to develop entrepreneurship cells. This is a team result, not an individual national rank.",
    publicUrl: "https://drive.google.com/file/d/1BFDNPoCRQnveau3nrGNhbbpm4AlC4XPx/view",
    previewImage: "/certificates/nec-2025.png",
    downloadUrl: "/certificates/nec-2025.pdf",
  },
  {
    slug: "internshala-student-partner-webinar",
    title: "ISP First Trainings Contest Webinar",
    issuer: "Internshala Student Partner Team",
    period: "Certified 1 Mar 2024",
    issued: "1 Mar 2024",
    category: "Participation certificate",
    evidence: "FIRST-PARTY CERTIFICATE",
    summary: "Certificate of participation in the ISP First Trainings Contest Webinar. It documents webinar participation, not completion of an internship or the entire Student Partner program.",
    publicUrl: "https://drive.google.com/file/d/10_53lJsDFpFxS1PHtiodA-68-SQN7x0z/view",
  },
  {
    slug: "skillsbuild-edunet-artificial-intelligence",
    publicUrl:
      "https://drive.google.com/file/d/1V2ZLrNg2fnQOh4pz3qqgk77L3q3htHg3/view",
    title: "Edunet — Artificial Intelligence",
    issuer: "SkillsBuild / Your Learning Builder",
    period: "Completed 19 Jul 2025",
    issued: "19 Jul 2025",
    evidence: "FIRST-PARTY CERTIFICATE",
    summary:
      "Completion certificate issued to Chandan Pandey for the Edunet–Artificial Intelligence learning plan in the SkillsBuild learning system.",
  },
  {
    slug: "techvidya-artificial-intelligence",
    publicUrl:
      "https://drive.google.com/file/d/1Mzxutr9v5h61cI76UX-AARhSDdry-_iY/view",
    title: "Artificial Intelligence",
    issuer: "TechVidya Career Private Limited",
    period: "09 Sep 2024 — 20 Dec 2024",
    issued: "23 Dec 2024",
    grade: "A",
    credentialId: "TCP-0924-0013",
    evidence: "FIRST-PARTY CERTIFICATE",
    summary:
      "Artificial Intelligence program completed at TechVidya Career Private Limited. The issued certificate records grade A for the program period.",
  },
];
